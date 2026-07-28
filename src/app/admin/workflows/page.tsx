"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Workflow {
  id: string
  title: string
  description?: string
  steps: any[]
}

export default function AdminWorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/workflows')
        const data = await res.json()
        setWorkflows(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete workflow?')) return
    try {
      await fetch('/api/workflows/crud', {
        method: 'DELETE',
        body: JSON.stringify({ id })
      })
      setWorkflows(workflows.filter(w => w.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-12 animate-pulse rounded-2xl bg-slate-900/60" />
        <div className="h-28 animate-pulse rounded-2xl bg-slate-900/60" />
        <div className="h-28 animate-pulse rounded-2xl bg-slate-900/60" />
      </div>
    )
  }

  const totalSteps = workflows.reduce((sum, workflow) => sum + (workflow.steps?.length ?? 0), 0)
  const averageSteps = workflows.length ? Math.round(totalSteps / workflows.length) : 0

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-cyan-200/20 bg-slate-900/50 p-6 shadow-lg shadow-cyan-500/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Workflow administration</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Design and manage the operating playbooks</h1>
            <p className="mt-2 text-sm text-slate-300">Create reusable workflows, add the supporting steps, and keep operational guidance up to date.</p>
          </div>
          <button
            onClick={() => router.push('/admin/workflows/new')}
            className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            + New workflow
          </button>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-cyan-200/20 bg-slate-900/50 p-4">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Playbooks</div>
          <div className="mt-3 text-3xl font-semibold text-white">{workflows.length}</div>
          <p className="mt-2 text-sm text-slate-400">Reusable operating workflows currently available.</p>
        </div>
        <div className="rounded-2xl border border-amber-300/20 bg-slate-900/50 p-4">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Total steps</div>
          <div className="mt-3 text-3xl font-semibold text-white">{totalSteps}</div>
          <p className="mt-2 text-sm text-slate-400">Instructional steps across the current playbooks.</p>
        </div>
        <div className="rounded-2xl border border-green-400/20 bg-slate-900/50 p-4">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-green-300">Average size</div>
          <div className="mt-3 text-3xl font-semibold text-white">{averageSteps}</div>
          <p className="mt-2 text-sm text-slate-400">Average step count per workflow.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {workflows.map(w => (
          <div key={w.id} className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <h2 className="font-semibold text-white">{w.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{w.description || 'No description provided yet.'}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                    {w.steps?.length ?? 0} steps
                  </span>
                  <span className="rounded-full border border-slate-600/70 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {w.steps?.length ? 'Ready to use' : 'Needs steps'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/workflows/${w.id}`} className="rounded-lg border border-slate-600/70 bg-slate-800/70 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
