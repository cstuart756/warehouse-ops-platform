import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { buildFeatures } from "@/lib/prediction/features";
import { predictFailure } from "@/lib/prediction/failure";
import { optimiseWorkflow } from "@/lib/optimization/engine";

export async function GET() {
  try {
    const steps = await prisma.step.findMany({
      include: { progress: true, workflow: true },
    });

    return NextResponse.json(
      steps.map((step) => {
        const features = buildFeatures(step);
        const risk = predictFailure(features);

        return {
          stepId: step.id,
          step: step.title,
          workflow: step.workflow.title,
          risk,
          suggestions: optimiseWorkflow(step, risk),
        };
      })
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
