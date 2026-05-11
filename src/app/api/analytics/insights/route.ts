import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { detectAnomalies } from "@/lib/anomaly";
import { generateRecommendations } from "@/lib/recommendations";

export async function GET() {
  try {
    const steps = await prisma.step.findMany({
      include: {
        progress: true,
        workflow: true,
      },
    });

    const results = steps.map((step) => {
      const started = step.progress.length;
      const completed = step.progress.filter((p) => p.completed).length;

      const dropOffRate =
        started === 0 ? 0 : ((started - completed) / started) * 100;

      const avgTime =
        step.progress
          .filter((p) => p.completed)
          .reduce((acc, p) => {
            if (!p.completedAt) return acc;
            return (
              acc +
              (new Date(p.completedAt).getTime() -
                new Date(p.startedAt).getTime())
            );
          }, 0) / (completed || 1);

      const baselineTime = avgTime * 0.8;
      const escalationRate = 0;

      const stepStats = {
        dropOffRate,
        avgTime,
        baselineTime,
        escalationRate,
      };

      const anomalies = detectAnomalies(stepStats);
      const recommendations = generateRecommendations(stepStats, anomalies);

      return {
        stepId: step.id,
        stepTitle: step.title,
        workflow: step.workflow.title,
        anomalies,
        recommendations,
      };
    });

    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
