import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

// GET all workflows or GET single workflow by ID
export async function GET(req: Request, { params }: { params: { id?: string } }) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
      const workflow = await prisma.workflow.findUnique({
        where: { id },
        include: { steps: { orderBy: { order: 'asc' } } }
      })
      return NextResponse.json(workflow)
    }

    const workflows = await prisma.workflow.findMany({
      include: { steps: true },
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(workflows)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// POST create workflow
export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const workflow = await prisma.workflow.create({
      data: {
        title: body.title,
        description: body.description
      },
      include: { steps: true }
    })
    return NextResponse.json(workflow, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// PUT update workflow
export async function PUT(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const workflow = await prisma.workflow.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description
      },
      include: { steps: true }
    })
    return NextResponse.json(workflow)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// DELETE workflow
export async function DELETE(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    await prisma.workflow.delete({ where: { id: body.id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
