import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { requireSuperAdmin } from '../../../lib/current-user'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  // Single workflow by ID — used by the training player
  if (id) {
    const workflow = await prisma.workflow.findUnique({
      where: { id },
      include: {
        steps: { orderBy: { order: 'asc' } },
        assessmentQuestions: { orderBy: { order: 'asc' } },
      },
    })
    if (!workflow) {
      return NextResponse.json({ error: 'Workflow not found' }, { status: 404 })
    }
    return NextResponse.json(workflow)
  }

  // List all workflows — used by the training library and admin panel
  const workflows = await prisma.workflow.findMany({
    include: {
      steps: { orderBy: { order: 'asc' } },
    },
    orderBy: { title: 'asc' },
  })
  return NextResponse.json(workflows)
}

export async function POST(req: Request) {
  if (!(await requireSuperAdmin())) {
    return NextResponse.json({ error: 'Super admin access required' }, { status: 403 })
  }

  const body = await req.json()
  const created = await prisma.workflow.create({ data: body })
  return NextResponse.json(created)
}