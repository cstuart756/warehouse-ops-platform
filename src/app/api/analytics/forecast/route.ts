import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

function buildFeatures(step: any) {
  const started = step.progress.length;
  const completed = step.progress.filter((p: any) => p.completed).length;
  const volume = started;
  const dropOffRate = started === 0 ? 0 : ((started - completed) / started) * 100;
  const avgTime = step.progress.filter((p: any) => p.completed).reduce((sum: number, p: any) => {
    if (!p.completedAt) return sum;
    return sum + (new Date(p.completedAt).getTime() - new Date(p.startedAt).getTime());
  }, 0) / (completed || 1);
  return { volume, dropOffRate, avgTime };
}

function predictFailure(features: any) {
  let riskScore = 0;
  if (features.dropOffRate > 50) riskScore += features.dropOffRate * 0.6;
  if (features.avgTime > 300) riskScore += 20;
  if (features.avgTime > 600) riskScore += 20;
  if (features.volume < 5 && features.dropOffRate > 30) riskScore += 15;
  riskScore = Math.min(100, Math.max(0, riskScore));
  let prediction = "Stable";
  if (riskScore > 70) prediction = "HIGH RISK: Likely to fail soon";
  else if (riskScore > 40) prediction = "MODERATE RISK: Monitor closely";
  else prediction = "STABLE: Normal behaviour";
  return { riskScore, prediction };
}

export async function GET() {
  try {
    const steps = await prisma.step.findMany({
      include: {
        progress: true,
        workflow: true,
      },
    });

    return NextResponse.json(
      steps.map((step) => {
        const features = buildFeatures(step);
        const { riskScore, prediction } = predictFailure(features);

        return {
          stepId: step.id,
          workflow: step.workflow.title,
          step: step.title,
          riskScore,
          features,
          prediction,
        };
      })
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
