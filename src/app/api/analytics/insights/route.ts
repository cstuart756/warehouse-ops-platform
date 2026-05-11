import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

function detectAnomalies(stepStats: any) {
  const anomalies: string[] = [];
  const { dropOffRate, avgTime, baselineTime, escalationRate } = stepStats;
  if (dropOffRate > 40) anomalies.push("High drop-off rate detected");
  if (baselineTime && avgTime > baselineTime * 1.5) anomalies.push("Step execution time increasing abnormally");
  if (escalationRate > 20) anomalies.push("High escalation frequency");
  return anomalies;
}

function generateRecommendations(stepStats: any, anomalies: string[]) {
  const recommendations: string[] = [];
  if (anomalies.includes("High drop-off rate detected")) {
    recommendations.push("Simplify step instructions or add clearer video guidance");
    recommendations.push("Break step into smaller sub-steps");
  }
  if (anomalies.includes("Step execution time increasing abnormally")) {
    recommendations.push("Reduce cognitive load (too many actions in one step)");
    recommendations.push("Add visual aids or checklist format");
  }
  if (anomalies.includes("High escalation frequency")) {
    recommendations.push("Clarify error handling procedures");
    recommendations.push("Add proactive validation messages");
  }
  return recommendations;
}

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
