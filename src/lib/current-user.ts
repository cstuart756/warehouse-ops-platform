import { currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'

export async function getOrCreateCurrentUser() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? `${clerkUser.id}@clerk.local`
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || clerkUser.username || null

  return prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    update: {
      email,
      name
    },
    create: {
      clerkId: clerkUser.id,
      email,
      name
    }
  })
}
