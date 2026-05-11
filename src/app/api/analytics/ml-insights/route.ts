import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

function mean(values: number[]): number {
  return values.length === 0 ? 0 : values.reduce((a, b) => a + b, 0) / values.length;
}

function stddev(values: number[]): number {
  if (values.length === 0) return 0;
  const m = mean(values);
  const variance = values.reduce((sum, val) => sum + (val - m) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}

function zScore(value: number, population: number[]): number {
  const m = mean(population);
  const sd = stddev(population);
  return sd === 0 ? 0 : (value - m) / sd;
}

function detectStepAnomaly(current: any, history: any[]) {
  const dropOffHistory = history.map((h) => h.dropOffRate);
  const timeHistory = history.map((h) => h.avgTime);
  const dropZ = zScore(current.dropOffRate, dropOffHistory);
  const timeZ = zScore(current.avgTime, timeHistory);
  const anomalies: string[] = [];
  if (Math.abs(dropZ) > 2) anomalies.push(`Drop-off rate anomaly (Z=${dropZ.toFixed(2)})`);
  if (Math.abs(timeZ) > 2) anomalies.push(`Execution time anomaly (Z=${timeZ.toFixed(2)})`);
  return { anomalies, scores: { dropZ, timeZ } };
}

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
