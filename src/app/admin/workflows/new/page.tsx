"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewWorkflowPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/workflows/crud', {
        method: 'POST',
        body: JSON.stringify({ title, description })
      })
      const data = await res.json()
      router.push(`/admin/workflows/${data.id}`)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-slate-700/70 bg-slate-900/50 p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">New workflow</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Create a playbook for the team</h1>
        <p className="mt-2 text-sm text-slate-400">Start with the workflow essentials, then add the operational steps that guide the team through each handoff.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">Workflow title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-0"
            placeholder="e.g. Receiving inspection"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none ring-0"
            rows={4}
            placeholder="Describe the purpose and expected outcome of this workflow."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create workflow'}
        </button>
      </form>
    </div>
  )
}
