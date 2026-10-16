import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { requireSuperAdmin } from '../../../../lib/current-user'

function sanitizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

// Generate a unique-looking code when the admin form doesn't provide one.
// Format: WF-<SLUG>-<SUFFIX>  e.g.  WF-RECEIVE-STOCK-4A2F
function generateWorkflowCode(title: string): string {
  const slug = title
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 20)
  const suffix = Date.now().toString(36).toUpperCase().slice(-4)
  return `WF-${slug || 'WORKFLOW'}-${suffix}`
}

// GET all workflows or GET single workflow by ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
      const workflow = await prisma.workflow.findUnique({
        where: { id },
        include: {
          steps: { orderBy: { order: 'asc' } },
          assessmentQuestions: { orderBy: { order: 'asc' } },
        },
      })
      return NextResponse.json(workflow)
    }

    const workflows = await prisma.workflow.findMany({
      include: { steps: { orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(workflows)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// POST create workflow
export async function POST(req: Request) {
  try {
    if (!(await requireSuperAdmin())) {
      return NextResponse.json({ error: 'Super admin access required' }, { status: 403 })
    }

    const body = await req.json()
    const title = sanitizeText(body.title)
    if (!title) {
      return NextResponse.json({ error: 'Workflow title is required.' }, { status: 400 })
    }

    const code = sanitizeText(body.code) || generateWorkflowCode(title)

    const workflow = await prisma.workflow.create({
      data: {
        code,
        title,
        description: sanitizeText(body.description) || null,
      },
      include: { steps: true },
    })
    return NextResponse.json(workflow, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// PUT update workflow
export async function PUT(req: Request) {
  try {
    if (!(await requireSuperAdmin())) {
      return NextResponse.json({ error: 'Super admin access required' }, { status: 403 })
    }

    const body = await req.json()
    const title = sanitizeText(body.title)
    if (!title) {
      return NextResponse.json({ error: 'Workflow title is required.' }, { status: 400 })
    }

    const updateData: {
      title: string
      description: string | null
      code?: string
    } = {
      title,
      description: sanitizeText(body.description) || null,
    }

    // Only update code if explicitly provided
    const newCode = sanitizeText(body.code)
    if (newCode) updateData.code = newCode

    const workflow = await prisma.workflow.update({
      where: { id: body.id },
      data: updateData,
      include: { steps: true },
    })
    return NextResponse.json(workflow)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// DELETE workflow
export async function DELETE(req: Request) {
  try {
    if (!(await requireSuperAdmin())) {
      return NextResponse.json({ error: 'Super admin access required' }, { status: 403 })
    }

    const body = await req.json()
    await prisma.workflow.delete({ where: { id: body.id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}