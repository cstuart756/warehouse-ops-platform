import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import { getOrCreateCurrentUser, isSuperAdmin } from '../../lib/current-user'

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!publishableKey) {
    return (
      <div>
        <header className="mb-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <nav className="space-x-4">
              <Link href="/admin/workflows" className="font-[var(--font-heading)] text-cyan-200 underline decoration-cyan-300/50 underline-offset-4 transition hover:text-cyan-100">Workflows</Link>
              <Link href="/dashboard" className="font-[var(--font-heading)] text-cyan-200 underline decoration-cyan-300/50 underline-offset-4 transition hover:text-cyan-100">Dashboard</Link>
            </nav>
          </div>
        </header>

        <div className="mb-6 rounded border bg-amber-50 p-4 text-sm text-amber-900">
          Clerk is not configured in this environment yet, so sign-out and sign-in state are disabled.
        </div>

        {children}
      </div>
    )
  }

  return <AdminContent>{children}</AdminContent>
}

async function AdminContent({ children }: { children: React.ReactNode }) {
  const user = await getOrCreateCurrentUser()

  if (!user) {
    redirect('/sign-in')
  }

  if (!isSuperAdmin(user)) {
    redirect('/dashboard')
  }

  return (
    <div>
      <header className="mb-6 pb-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex gap-4 items-center">
            <nav className="space-x-4">
              <Link href="/admin/workflows" className="font-[var(--font-heading)] text-cyan-200 underline decoration-cyan-300/50 underline-offset-4 transition hover:text-cyan-100">Workflows</Link>
              <Link href="/dashboard" className="font-[var(--font-heading)] text-cyan-200 underline decoration-cyan-300/50 underline-offset-4 transition hover:text-cyan-100">Dashboard</Link>
            </nav>
            <SignOutButton />
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
