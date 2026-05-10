import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { auth } from '@clerk/nextjs/server'

// POST create step
export async function POST(req: Request) {
  try {
    const session = await auth()
    const userId = session?.userId
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const step = await prisma.step.create({
      data: {
        title: body.title,
        content: body.content,
        videoUrl: body.videoUrl,
        order: body.order,
        workflowId: body.workflowId
      }
    })
    return NextResponse.json(step, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// PUT update step
export async function PUT(req: Request) {
  try {
    const session = await auth()
    const userId = session?.userId
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const step = await prisma.step.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        videoUrl: body.videoUrl,
        order: body.order
      }
    })
    return NextResponse.json(step)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}

// DELETE step
export async function DELETE(req: Request) {
  try {
    const session = await auth()
    const userId = session?.userId
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    await prisma.step.delete({ where: { id: body.id } })
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
