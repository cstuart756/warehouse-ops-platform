"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Step {
  id: string
  title: string
  content: string
  order: number
  videoUrl?: string
}

interface Workflow {
  id: string
  title: string
  description?: string
  steps: Step[]
}

export default function EditWorkflowPage() {
  const params = useParams()
  const workflowId = params.id as string
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [workflowTitle, setWorkflowTitle] = useState('')
  const [workflowDescription, setWorkflowDescription] = useState('')
  const [stepTitle, setStepTitle] = useState('')
  const [stepContent, setStepContent] = useState('')
  const [stepVideoUrl, setStepVideoUrl] = useState('')
  const [editingStepId, setEditingStepId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const [editingContent, setEditingContent] = useState('')
  const [editingVideoUrl, setEditingVideoUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [savingWorkflow, setSavingWorkflow] = useState(false)
  const [savingStep, setSavingStep] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/workflows?id=${workflowId}`)
        const data = await res.json()
        setWorkflow(data)
        setWorkflowTitle(data.title)
        setWorkflowDescription(data.description || '')
      } catch (err) {
        console.error(err)
        setError('Unable to load workflow at the moment.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [workflowId])

  function resetStepForm() {
    setStepTitle('')
    setStepContent('')
    setStepVideoUrl('')
    setEditingStepId(null)
    setEditingTitle('')
    setEditingContent('')
    setEditingVideoUrl('')
  }

  function startEditingStep(step: Step) {
    setEditingStepId(step.id)
    setEditingTitle(step.title)
    setEditingContent(step.content)
    setEditingVideoUrl(step.videoUrl || '')
    setError(null)
  }

  async function handleUpdateWorkflow(e: React.FormEvent) {
    e.preventDefault()
    if (!workflow) return

    try {
      setSavingWorkflow(true)
      setError(null)
      const res = await fetch('/api/workflows/crud', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: workflowId, title: workflowTitle, description: workflowDescription })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to save workflow.')
      setWorkflow(data)
      setWorkflowTitle(data.title)
      setWorkflowDescription(data.description || '')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Unable to save workflow.')
    } finally {
      setSavingWorkflow(false)
    }
  }

  async function handleAddStep(e: React.FormEvent) {
    e.preventDefault()
    if (!workflow) return

    const trimmedTitle = stepTitle.trim()
    const trimmedContent = stepContent.trim()
    if (!trimmedTitle || !trimmedContent) {
      setError('Step title and instructions are required.')
      return
    }

    try {
      setSavingStep(true)
      setError(null)
      const res = await fetch('/api/steps/crud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: trimmedTitle,
          content: trimmedContent,
          videoUrl: stepVideoUrl.trim(),
          order: workflow.steps.length + 1,
          workflowId
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to add step.')
      setWorkflow({ ...workflow, steps: [...workflow.steps, data] })
      setStepTitle('')
      setStepContent('')
      setStepVideoUrl('')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Unable to add step.')
    } finally {
      setSavingStep(false)
    }
  }

  async function handleSaveStep(e: React.FormEvent) {
    e.preventDefault()
    if (!workflow || !editingStepId) return

    const trimmedTitle = editingTitle.trim()
    const trimmedContent = editingContent.trim()
    if (!trimmedTitle || !trimmedContent) {
      setError('Step title and instructions are required.')
      return
    }

    try {
      setSavingStep(true)
      setError(null)
      const res = await fetch('/api/steps/crud', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingStepId,
          title: trimmedTitle,
          content: trimmedContent,
          videoUrl: editingVideoUrl.trim(),
          order: workflow.steps.find((step) => step.id === editingStepId)?.order ?? 1
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to update step.')
      setWorkflow({
        ...workflow,
        steps: workflow.steps.map((step) => step.id === editingStepId ? data : step)
      })
      resetStepForm()
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Unable to update step.')
    } finally {
      setSavingStep(false)
    }
  }

  async function handleMoveStep(stepId: string, direction: 'up' | 'down') {
    if (!workflow) return

    const orderedSteps = [...workflow.steps].sort((a, b) => a.order - b.order)
    const index = orderedSteps.findIndex((step) => step.id === stepId)
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (index < 0 || targetIndex < 0 || targetIndex >= orderedSteps.length) return

    const nextSteps = [...orderedSteps]
    const [movedStep] = nextSteps.splice(index, 1)
    nextSteps.splice(targetIndex, 0, movedStep)
    const reorderedSteps = nextSteps.map((step, idx) => ({ ...step, order: idx + 1 }))

    try {
      setError(null)
      await Promise.all(reorderedSteps.map((step) => fetch('/api/steps/crud', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: step.id,
          title: step.title,
          content: step.content,
          videoUrl: step.videoUrl || '',
          order: step.order
        })
      })))
      setWorkflow({ ...workflow, steps: reorderedSteps })
    } catch (err) {
      console.error(err)
      setError('Unable to reorder steps.')
    }
  }

  async function handleDeleteStep(stepId: string) {
    if (!confirm('Delete this step?')) return
    if (!workflow) return

    try {
      const res = await fetch('/api/steps/crud', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: stepId })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to delete step.')
      setWorkflow({
        ...workflow,
        steps: workflow.steps.filter((step) => step.id !== stepId)
      })
      if (editingStepId === stepId) resetStepForm()
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Unable to delete step.')
    }
  }

  if (loading) return <div className="rounded-3xl border border-slate-700/70 bg-slate-900/50 p-8 text-slate-300">Loading workflow…</div>
  if (!workflow) return <div className="rounded-3xl border border-slate-700/70 bg-slate-900/50 p-8 text-slate-300">Workflow not found.</div>

  const sortedSteps = [...workflow.steps].sort((a, b) => a.order - b.order)

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-700/70 bg-slate-900/50 p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Workflow editor</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Refine the playbook</h1>
        <p className="mt-2 text-sm text-slate-400">Keep the workflow title, description, and step sequence aligned with the way your team actually operates.</p>

        {error ? <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</div> : null}

        <form onSubmit={handleUpdateWorkflow} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">Workflow title *</label>
            <input
              type="text"
              value={workflowTitle}
              onChange={(e) => setWorkflowTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-200">Description</label>
            <textarea
              value={workflowDescription}
              onChange={(e) => setWorkflowDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={savingWorkflow}
            className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingWorkflow ? 'Saving…' : 'Save workflow'}
          </button>
        </form>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-700/70 bg-slate-900/50 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Step sequence</h2>
              <p className="text-sm text-slate-400">Reorder, edit, and remove steps as the process changes.</p>
            </div>
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">{sortedSteps.length} steps</span>
          </div>

          <div className="space-y-3">
            {sortedSteps.map((step, idx) => (
              <div key={step.id} className="rounded-2xl border border-slate-700/70 bg-slate-950/50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Step {idx + 1}</span>
                      <span className="text-xs text-slate-500">{step.order}</span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{step.content}</p>
                    {step.videoUrl ? <p className="mt-2 text-xs font-medium text-cyan-300">📹 {step.videoUrl}</p> : null}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => startEditingStep(step)} className="rounded-lg border border-slate-600 px-2.5 py-1 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-cyan-200">Edit</button>
                    <button type="button" onClick={() => handleMoveStep(step.id, 'up')} disabled={idx === 0} className="rounded-lg border border-slate-600 px-2.5 py-1 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-40">↑</button>
                    <button type="button" onClick={() => handleMoveStep(step.id, 'down')} disabled={idx === sortedSteps.length - 1} className="rounded-lg border border-slate-600 px-2.5 py-1 text-xs font-medium text-slate-200 hover:border-cyan-400 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-40">↓</button>
                    <button type="button" onClick={() => handleDeleteStep(step.id)} className="rounded-lg border border-rose-500/40 px-2.5 py-1 text-xs font-medium text-rose-200 hover:bg-rose-500/10">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-700/70 bg-slate-900/50 p-6">
          <h2 className="text-xl font-semibold text-white">{editingStepId ? 'Edit step' : 'Add a step'}</h2>
          <p className="mt-1 text-sm text-slate-400">{editingStepId ? 'Update the current instruction block.' : 'Add the next operational handoff to the playbook.'}</p>

          <form onSubmit={editingStepId ? handleSaveStep : handleAddStep} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-200">Step title *</label>
              <input
                type="text"
                value={editingStepId ? editingTitle : stepTitle}
                onChange={(e) => editingStepId ? setEditingTitle(e.target.value) : setStepTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-200">Instructions *</label>
              <textarea
                value={editingStepId ? editingContent : stepContent}
                onChange={(e) => editingStepId ? setEditingContent(e.target.value) : setStepContent(e.target.value)}
                className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-slate-200">Video URL (optional)</label>
              <input
                type="text"
                value={editingStepId ? editingVideoUrl : stepVideoUrl}
                onChange={(e) => editingStepId ? setEditingVideoUrl(e.target.value) : setStepVideoUrl(e.target.value)}
                placeholder="https://youtube.com/embed/..."
                className="w-full rounded-xl border border-slate-700/70 bg-slate-950/60 px-3 py-2 text-slate-100 outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={savingStep}
                className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingStep ? 'Saving…' : editingStepId ? 'Save step' : 'Add step'}
              </button>
              {editingStepId ? (
                <button type="button" onClick={resetStepForm} className="rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-200">
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
