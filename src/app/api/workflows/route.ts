import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'

export async function GET() {
  const workflows = await prisma.workflow.findMany({ include: { steps: true } })
  return NextResponse.json(workflows)
}

export async function POST(req: Request) {
  const body = await req.json()
  const created = await prisma.workflow.create({ data: body })
  return NextResponse.json(created)
}
