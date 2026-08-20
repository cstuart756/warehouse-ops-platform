import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { requireSuperAdmin } from '../../../lib/current-user'

export async function GET() {
  const workflows = await prisma.workflow.findMany({ include: { steps: true } })
  return NextResponse.json(workflows)
}

export async function POST(req: Request) {
  if (!await requireSuperAdmin()) {
    return NextResponse.json({ error: 'Super admin access required' }, { status: 403 })
  }

  const body = await req.json()
  const created = await prisma.workflow.create({ data: body })
  return NextResponse.json(created)
}
