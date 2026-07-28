import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { getTaskProgressMetrics } from "../../../../lib/task-progress";
import { summariseWorkflowInsights } from "../../../../lib/workflow-insights";

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
    const [steps, tasks, workflows] = await Promise.all([
      prisma.step.findMany({
        include: {
          progress: true,
          workflow: true,
        },
      }),
      prisma.task.findMany({
        select: {
          id: true,
          status: true,
          workflowId: true,
        },
      }),
      prisma.workflow.findMany({
        select: {
          id: true,
          title: true,
        },
      }),
    ])

    const workflowInsights = summariseWorkflowInsights(tasks, workflows)

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

      const metrics = getTaskProgressMetrics({
        currentStep: step.progress.filter((p) => p.completed).length,
        totalSteps: 1,
        completedSteps: step.progress.filter((p) => p.completed).length,
      })

      return {
        stepId: step.id,
        stepTitle: step.title,
        workflow: step.workflow.title,
        anomalies,
        recommendations,
        progress: metrics,
      };
    });

    return NextResponse.json({
      steps: results,
      workflowInsights,
    });
  } catch (error) {
    console.error("Error in /api/analytics/insights:", error);
    return NextResponse.json(
      { error: "Failed to fetch insights", details: String(error) },
      { status: 500 }
    );
  }
}
