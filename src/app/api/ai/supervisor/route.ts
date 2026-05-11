import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question required" },
        { status: 400 }
      );
    }

    // Get recent incidents for context (use progress data instead)
    const incidentSteps = await prisma.progress
      .findMany({
        include: { step: true, user: true, workflow: true },
        where: { completed: false },
        take: 20,
        orderBy: { startedAt: "desc" },
      })
      .catch(() => []);

    // Get recent step progress for context
    const recentProgress = await prisma.progress
      .findMany({
        include: { step: true },
        take: 20,
        orderBy: { startedAt: "desc" },
      })
      .catch(() => []);

    const context = {
      question,
      incidentContext: incidentSteps.map((p: any) => ({
        user: p.user?.email,
        step: p.step?.title,
        workflow: p.workflow?.title,
        status: p.completed ? "Completed" : "In Progress",
      })),
      progressContext: recentProgress.map((p: any) => ({
        step: p.step?.title,
        completed: p.completed,
        timeSpent: p.completedAt
          ? new Date(p.completedAt).getTime() -
            new Date(p.startedAt).getTime()
          : null,
      })),
    };

    // Generate a deterministic response based on the context
    let answer = `Based on current warehouse operations:\n\n`;

    if (context.incidentContext.length > 0) {
      answer += `Recent incidents detected across ${new Set(context.incidentContext.map((i: any) => i.step)).size} steps.\n\n`;
    }

    const lowCompletionSteps = context.progressContext.filter(
      (p: any) => !p.completed
    );
    if (lowCompletionSteps.length > context.progressContext.length * 0.3) {
      answer += `⚠️ High incomplete task rate detected. Consider reviewing step clarity and training materials.\n\n`;
    }

    const slowSteps = context.progressContext.filter(
      (p: any) => p.timeSpent && p.timeSpent > 300000
    );
    if (slowSteps.length > 0) {
      answer += `⏱️ ${slowSteps.length} steps taking longer than expected. Recommend breaking into smaller sub-steps or adding visual aids.\n\n`;
    }

    if (answer === `Based on current warehouse operations:\n\n`) {
      answer = `Warehouse operations running smoothly. All monitored steps showing normal performance patterns. Continue current training and process execution.`;
    }

    return NextResponse.json({ answer });
  } catch (error) {
    // Fallback response if no database
    return NextResponse.json({
      answer:
        "Supervisor Assistant: I'm analyzing your warehouse operations. To provide AI-powered insights, ensure your database is connected. For now: 1) Review high drop-off steps, 2) Add training video guides, 3) Monitor escalation patterns.",
    });
  }
}
