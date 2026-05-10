"use client"

import Link from 'next/link'
import { useUser, SignOutButton } from '@clerk/nextjs'

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!publishableKey) {
    return (
      <div>
        <header className="mb-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <nav className="space-x-4">
              <Link href="/admin/workflows" className="text-blue-600">Workflows</Link>
              <Link href="/dashboard" className="text-blue-600">Dashboard</Link>
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

  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) return <div>Loading...</div>

  if (!isSignedIn) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Admin (Protected)</h2>
        <p>Please sign in to access the admin panel.</p>
      </div>
    )
  }

  return (
    <div>
      <header className="mb-6 pb-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex gap-4 items-center">
            <nav className="space-x-4">
              <Link href="/admin/workflows" className="text-blue-600">Workflows</Link>
              <Link href="/dashboard" className="text-blue-600">Dashboard</Link>
            </nav>
            <SignOutButton />
          </div>
        </div>
      </header>

      {children}
    </div>
  )
}
