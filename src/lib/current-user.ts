import { auth, clerkClient } from '@clerk/nextjs/server'
import { prisma } from './prisma'

const SUPER_ADMIN = 'SUPER_ADMIN'

function configuredSuperAdminEmails() {
  return (process.env.SUPER_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

export function isSuperAdmin(user: { role?: string } | null | undefined) {
  return user?.role === SUPER_ADMIN
}

export async function getOrCreateCurrentUser() {
  const { userId } = await auth()
  if (!userId) return null

  const clerk = await clerkClient()
  const clerkUser = await clerk.users.getUser(userId)

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? `${clerkUser.id}@clerk.local`
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') || clerkUser.username || null
  const isConfiguredSuperAdmin = configuredSuperAdminEmails().includes(email.toLowerCase())

  return prisma.user.upsert({
    where: { clerkId: clerkUser.id },
    update: {
      email,
      name,
      ...(isConfiguredSuperAdmin ? { role: SUPER_ADMIN } : {})
    },
    create: {
      clerkId: clerkUser.id,
      email,
      name,
      role: isConfiguredSuperAdmin ? SUPER_ADMIN : 'WORKER'
    }
  })
}

export async function requireSuperAdmin() {
  const user = await getOrCreateCurrentUser()
  if (!isSuperAdmin(user)) {
    return null
  }
  return user
}
