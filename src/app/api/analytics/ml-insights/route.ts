import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { detectStepAnomaly } from "@/lib/ml/stepAnomaly";

export async function GET() {
  try {
    const steps = await prisma.step.findMany({
      include: { progress: true, workflow: true },
    });

    const historyBaseline = steps.map((s) => {
      const completed = s.progress.filter((p) => p.completed);

      const dropOffRate =
        s.progress.length === 0
          ? 0
          : ((s.progress.length - completed.length) /
              s.progress.length) *
            100;

      const avgTime =
        completed.reduce((acc, p) => {
          if (!p.completedAt) return acc;
          return (
            acc +
            (new Date(p.completedAt).getTime() -
              new Date(p.startedAt).getTime())
          );
        }, 0) / (completed.length || 1);

      return {
        stepId: s.id,
        dropOffRate,
        avgTime,
      };
    });

    return NextResponse.json(
      steps.map((step, i) => {
        const current = historyBaseline[i];

        const ml = detectStepAnomaly(current, historyBaseline);

        return {
          stepId: step.id,
          workflow: step.workflow.title,
          step: step.title,
          ...ml,
        };
      })
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
