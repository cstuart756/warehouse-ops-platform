import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { buildFeatures } from "@/lib/prediction/features";
import { predictFailure } from "@/lib/prediction/failure";

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
        const riskScore = predictFailure(features);

        return {
          stepId: step.id,
          workflow: step.workflow.title,
          step: step.title,
          riskScore,
          features,
          prediction:
            riskScore > 70
              ? "HIGH FAILURE RISK"
              : riskScore > 40
              ? "MODERATE RISK"
              : "STABLE",
        };
      })
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
