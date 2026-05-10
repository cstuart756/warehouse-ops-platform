import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { getOrCreateCurrentUser } from '../../../../lib/current-user'

export async function GET() {
  const user = await getOrCreateCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
    include: {
      workflow: { include: { steps: { orderBy: { order: 'asc' } } } },
      progress: { include: { step: true }, orderBy: { startedAt: 'asc' } }
    },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(tasks)
}

export async function POST(request: Request) {
  const user = await getOrCreateCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { workflowId } = body
  if (!workflowId) return NextResponse.json({ error: 'workflowId required' }, { status: 400 })

  const workflow = await prisma.workflow.findUnique({
    where: { id: workflowId },
    include: { steps: { orderBy: { order: 'asc' } } }
  })

  if (!workflow) return NextResponse.json({ error: 'Workflow not found' }, { status: 404 })

  const task = await prisma.task.create({
    data: {
      workflowId,
      userId: user.id,
      status: workflow.steps.length ? 'IN_PROGRESS' : 'COMPLETED',
      currentStep: 0
    }
  })

  if (workflow.steps[0]) {
    await prisma.progress.create({
      data: {
        taskId: task.id,
        stepId: workflow.steps[0].id
      }
    })
  }

  const createdTask = await prisma.task.findUnique({
    where: { id: task.id },
    include: {
      workflow: { include: { steps: { orderBy: { order: 'asc' } } } },
      progress: { include: { step: true }, orderBy: { startedAt: 'asc' } }
    }
  })

  return NextResponse.json(createdTask)
}

export async function PUT(request: Request) {
  const user = await getOrCreateCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id } = body
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const task = await prisma.task.findFirst({
    where: { id, userId: user.id },
    include: {
      workflow: { include: { steps: { orderBy: { order: 'asc' } } } },
      progress: true
    }
  })

  if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })

  const activeStep = task.workflow.steps[task.currentStep]
  const nextIndex = task.currentStep + 1
  const nextStep = task.workflow.steps[nextIndex]

  if (activeStep) {
    const currentProgress = task.progress.find(progress => progress.stepId === activeStep.id)
    if (currentProgress) {
      await prisma.progress.update({
        where: { id: currentProgress.id },
        data: { completed: true, completedAt: new Date() }
      })
    } else {
      await prisma.progress.create({
        data: {
          taskId: task.id,
          stepId: activeStep.id,
          completed: true,
          completedAt: new Date()
        }
      })
    }
  }

  if (nextStep) {
    const nextProgress = task.progress.find(progress => progress.stepId === nextStep.id)
    if (!nextProgress) {
      await prisma.progress.create({
        data: {
          taskId: task.id,
          stepId: nextStep.id
        }
      })
    }
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      currentStep: nextIndex,
      status: nextStep ? 'IN_PROGRESS' : 'COMPLETED'
    },
    include: {
      workflow: { include: { steps: { orderBy: { order: 'asc' } } } },
      progress: { include: { step: true }, orderBy: { startedAt: 'asc' } }
    }
  })

  return NextResponse.json(updatedTask)
}

export async function DELETE(request: Request) {
  const user = await getOrCreateCurrentUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { id } = body
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const task = await prisma.task.findFirst({ where: { id, userId: user.id } })
  if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 })

  await prisma.task.delete({ where: { id: task.id } })
  return NextResponse.json({ ok: true })
}
