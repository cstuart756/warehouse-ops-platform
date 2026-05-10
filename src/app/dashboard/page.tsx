"use client"

import React from 'react'
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs'

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function DashboardPage() {
  if (!publishableKey) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <p className="text-sm text-gray-600">
          Clerk is not configured in this environment yet, so authentication controls are hidden.
        </p>
      </div>
    )
  }

  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <div>Loading...</div>

  return (
    <div>
      {!isSignedIn ? (
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Dashboard (protected)</h2>
          <p className="mb-4">Please sign in to access your dashboard.</p>
          <SignInButton />
        </div>
      ) : (
        <div className="p-6 bg-white rounded shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <SignOutButton />
          </div>
          <p>Welcome, {user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress}</p>
        </div>
      )}
    </div>
  )
}
