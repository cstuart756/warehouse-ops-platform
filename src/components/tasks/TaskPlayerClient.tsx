"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getTaskHistorySummary, getTaskProgressMetrics } from '../../lib/task-progress'

export default function TaskPlayerClient({ id }: { id: string }) {
  const [task, setTask] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [stepAcknowledged, setStepAcknowledged] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  async function loadTask() {
    setLoading(true)
    const response = await fetch('/api/tasks/crud')
    const data = await response.json()
    setTask(data.find((entry: any) => entry.id === id) ?? null)
    setLoading(false)
  }

  useEffect(() => {
    setStepAcknowledged(false)
    loadTask()
  }, [id])

  const workflow = task?.workflow
  const activeStepIndex = task?.currentStep ?? 0
  const steps = workflow?.steps ?? []
  const currentStep = steps[activeStepIndex]
  const currentProgress = task?.progress?.find((entry: any) => entry.stepId === currentStep?.id) ?? null
  const completedSteps = task?.progress?.filter((entry: any) => entry.completed).length ?? 0
  const metrics = useMemo(() => getTaskProgressMetrics({
    currentStep: activeStepIndex,
    totalSteps: steps.length,
    completedSteps,
  }), [activeStepIndex, completedSteps, steps.length])
  const percentComplete = metrics.percentComplete
  const isComplete = metrics.isComplete || task?.status === 'COMPLETED' || activeStepIndex >= steps.length
  const nextLabel = metrics.nextLabel
  const history = useMemo(() => getTaskHistorySummary(task), [task])

  async function nextStep() {
    if (!task || !stepAcknowledged || submitting) return
    setSubmitting(true)
    const response = await fetch('/api/tasks/crud', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: task.id })
    })

    if (!response.ok) {
      setSubmitting(false)
      return
    }

    await loadTask()
    setStepAcknowledged(false)
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-24 animate-pulse rounded-3xl bg-slate-900/60" />
        <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <div className="h-80 animate-pulse rounded-3xl bg-slate-900/60" />
          <div className="h-80 animate-pulse rounded-3xl bg-slate-900/60" />
        </div>
      </div>
    )
  }

  if (!task || !workflow) {
    return (
      <div className="rounded-3xl border border-slate-700/70 bg-slate-900/50 p-6 text-slate-300">
        <h1 className="text-2xl font-semibold text-white">Task not found</h1>
        <p className="mt-2 text-sm">The requested task could not be loaded right now.</p>
      </div>
    )
  }

  if (!steps.length) {
    return (
      <div className="rounded-3xl border border-slate-700/70 bg-slate-900/50 p-6 text-slate-300">
        <h1 className="text-2xl font-semibold text-white">Task: {task.id}</h1>
        <p className="mt-2 text-sm">This workflow has no steps yet, so there is nothing to execute.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-cyan-200/20 bg-slate-900/50 p-6 shadow-lg shadow-cyan-500/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Task execution</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{workflow.title}</h1>
            <p className="mt-2 text-sm text-slate-300">{workflow.description}</p>
          </div>
          <div className="rounded-2xl border border-cyan-200/20 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
            <div className="font-semibold text-white">{percentComplete}% complete</div>
            <div className="mt-1">Step {metrics.currentStepNumber} of {steps.length}</div>
            <div className="mt-1 text-cyan-200">{metrics.statusLabel}</div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-4 rounded-3xl border border-slate-700/70 bg-slate-900/50 p-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">Progress</div>
            <div className="mt-2 h-2 rounded-full bg-slate-800">
              <div className="h-2 rounded-full bg-cyan-400 transition-all" style={{ width: `${percentComplete}%` }} />
            </div>
          </div>

          <div className="rounded-2xl border border-amber-300/20 bg-amber-500/10 p-3 text-sm text-amber-200">
            Read the step carefully, complete the action, and confirm you are ready before moving on.
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">Workflow steps</div>
            <ol className="mt-3 space-y-2 text-sm">
              {steps.map((step: any, index: number) => {
                const done = task.progress?.some((entry: any) => entry.stepId === step.id && entry.completed)
                const current = index === activeStepIndex && !isComplete

                return (
                  <li
                    key={step.id}
                    className={`rounded-2xl border px-3 py-3 ${current ? 'border-cyan-300/40 bg-cyan-400/10' : done ? 'border-green-400/20 bg-green-500/10' : 'border-slate-700/70 bg-slate-950/50'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-white">{index + 1}. {step.title}</div>
                        <div className="mt-1 text-xs text-slate-400">{done ? 'Completed' : current ? 'Current step' : 'Pending'}</div>
                      </div>
                      <div className={`text-xs font-semibold ${done ? 'text-green-300' : current ? 'text-cyan-300' : 'text-slate-500'}`}>
                        {done ? 'Done' : current ? 'Now' : 'Next'}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <button onClick={() => router.push('/tasks')} className="w-full rounded-lg border border-slate-600/70 bg-slate-800/70 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700/70">
            Back to tasks
          </button>
        </aside>

        <section className="space-y-4 rounded-3xl border border-slate-700/70 bg-slate-900/50 p-4">
          {currentStep ? (
            <>
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">Current step</div>
                <div className="mt-1 text-2xl font-semibold text-white">{currentStep.title}</div>
                <div className="mt-2 text-sm leading-6 text-slate-300">{currentStep.content}</div>
              </div>

              {currentStep.videoUrl && (
                <div className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950/70">
                  <iframe
                    src={currentStep.videoUrl}
                    title={currentStep.title}
                    className="min-h-[320px] w-full"
                  />
                </div>
              )}

              <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-3 text-sm text-slate-300">
                Current step status: <span className="font-medium text-white">{currentProgress?.completed ? 'Completed' : 'In progress'}</span>
              </div>

              <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-3 text-sm text-slate-300">
                <div className="font-semibold uppercase tracking-[0.2em] text-slate-500">Audit trail</div>
                <div className="mt-2 text-slate-300">{history.completedCount > 0 ? `${history.completedCount} completed step${history.completedCount === 1 ? '' : 's'}` : 'No completed steps yet'}</div>
                {history.latestEntry ? <div className="mt-1 text-cyan-200">Latest: {history.latestEntry.label}</div> : null}
              </div>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-700/70 bg-slate-950/70 p-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={stepAcknowledged}
                  onChange={event => setStepAcknowledged(event.target.checked)}
                  className="mt-1 accent-cyan-400"
                />
                <span>I have completed this step and I am ready to continue.</span>
              </label>
            </>
          ) : isComplete ? (
            <div className="rounded-2xl border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-200">
              This task is complete. You can return to the task list or review the workflow steps.
            </div>
          ) : (
            <div className="text-sm text-slate-300">No current step is available yet.</div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              onClick={nextStep}
              disabled={!stepAcknowledged || submitting || isComplete}
              className="rounded-lg bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isComplete ? 'Finished' : submitting ? 'Saving...' : nextLabel}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
