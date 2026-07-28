"use client"

import React from 'react'
import Link from 'next/link'
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs'

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function DashboardPage() {
  if (!publishableKey) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Dashboard</h2>
        <p className="text-sm text-slate-400">
          Clerk is not configured in this environment yet, so authentication controls are hidden.
        </p>
      </div>
    )
  }

  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return <div className="p-6 text-white">Loading...</div>

  return (
    <div className="space-y-8 p-6">
      {!isSignedIn ? (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Dashboard (Protected)</h2>
          <p className="mb-4 text-slate-300">Please sign in to access your dashboard.</p>
          <SignInButton />
        </div>
      ) : (
        <>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-white">Dashboard</h2>
                <p className="mt-1 text-slate-400">
                  Welcome, {user?.firstName ?? user?.emailAddresses?.[0]?.emailAddress}
                </p>
              </div>
              <SignOutButton />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-[var(--font-heading)] text-2xl font-semibold text-white">
              Intelligent Operations System
            </h3>
            <p className="text-slate-300">
              Monitor, analyze, and optimize your warehouse operations with AI-driven insights.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Role-based access</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">Operator</span>
              <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">Supervisor</span>
              <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-green-200">Admin</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">Each role now has clearer entry points for day-to-day execution, supervision, and playbook administration.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/dashboard/insights"
              className="glass-card group rounded-2xl p-6 transition hover:border-cyan-300/50"
            >
              <h4 className="font-[var(--font-heading)] text-lg font-semibold text-white">
                Operational Insights
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                Rule-based anomaly detection and automatic recommendations for step improvements.
              </p>
              <p className="mt-4 text-xs text-cyan-400">→ View Insights</p>
            </Link>

            <Link
              href="/dashboard/ml"
              className="glass-card group rounded-2xl p-6 transition hover:border-cyan-300/50"
            >
              <h4 className="font-[var(--font-heading)] text-lg font-semibold text-white">
                ML Anomaly Detection
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                Statistical analysis using Z-scores to detect behavioral deviations.
              </p>
              <p className="mt-4 text-xs text-cyan-400">→ View ML Analysis</p>
            </Link>

            <Link
              href="/dashboard/forecast"
              className="glass-card group rounded-2xl p-6 transition hover:border-cyan-300/50"
            >
              <h4 className="font-[var(--font-heading)] text-lg font-semibold text-white">
                Predictive Forecast
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                Predict workflow failure risks before they impact operations.
              </p>
              <p className="mt-4 text-xs text-cyan-400">→ View Forecast</p>
            </Link>

            <Link
              href="/dashboard/optimisation"
              className="glass-card group rounded-2xl p-6 transition hover:border-cyan-300/50"
            >
              <h4 className="font-[var(--font-heading)] text-lg font-semibold text-white">
                Auto-Optimisation
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                Get AI-generated improvement suggestions for risky or inefficient steps.
              </p>
              <p className="mt-4 text-xs text-cyan-400">→ View Suggestions</p>
            </Link>

            <Link
              href="/dashboard/ai"
              className="glass-card group rounded-2xl p-6 transition hover:border-cyan-300/50"
            >
              <h4 className="font-[var(--font-heading)] text-lg font-semibold text-white">
                AI Supervisor
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                Ask questions and get real-time operational insights from the AI assistant.
              </p>
              <p className="mt-4 text-xs text-cyan-400">→ Ask AI</p>
            </Link>

            <Link
              href="/tasks"
              className="glass-card group rounded-2xl p-6 transition hover:border-cyan-300/50"
            >
              <h4 className="font-[var(--font-heading)] text-lg font-semibold text-white">
                Tasks
              </h4>
              <p className="mt-2 text-sm text-slate-400">
                Execute guided workflows and track progress in real time.
              </p>
              <p className="mt-4 text-xs text-cyan-400">→ Go to Tasks</p>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
