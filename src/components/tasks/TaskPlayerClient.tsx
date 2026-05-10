"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

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
    loadTask()
  }, [id])

  const workflow = task?.workflow
  const activeStepIndex = task?.currentStep ?? 0
  const steps = workflow?.steps ?? []
  const currentStep = steps[activeStepIndex]
  const currentProgress = task?.progress?.find((entry: any) => entry.stepId === currentStep?.id) ?? null
  const completedSteps = task?.progress?.filter((entry: any) => entry.completed).length ?? 0
  const percentComplete = useMemo(() => {
    if (!steps.length) return 0
    return Math.round((completedSteps / steps.length) * 100)
  }, [completedSteps, steps.length])
  const isComplete = task?.status === 'COMPLETED' || activeStepIndex >= steps.length
  const nextLabel = isComplete ? 'Finished' : activeStepIndex === steps.length - 1 ? 'Complete Task' : 'Next step'

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

  if (loading) return <div>Loading...</div>
  if (!task || !workflow) return <div>Task not found.</div>

  if (!steps.length) {
    return (
      <div>
        <h1 className="text-2xl font-semibold mb-4">Task: {task.id}</h1>
        <div className="p-4 border rounded bg-white text-gray-700">
          This workflow has no steps yet.
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Task: {task.id}</h1>
          <p className="text-sm text-gray-600">Workflow: {workflow.title}</p>
        </div>
        <div className="text-right text-sm text-gray-600">
          <div className="font-medium text-gray-900">{percentComplete}% complete</div>
          <div>Step {Math.min(activeStepIndex + 1, steps.length)} of {steps.length}</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="rounded border bg-white p-4 space-y-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Progress</div>
            <div className="mt-2 h-2 rounded bg-gray-200">
              <div className="h-2 rounded bg-blue-600 transition-all" style={{ width: `${percentComplete}%` }} />
            </div>
          </div>

          <div className="rounded bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
            Read the step, perform the action, and tick the confirmation box before moving on.
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Steps</div>
            <ol className="mt-3 space-y-2 text-sm">
              {steps.map((step: any, index: number) => {
                const done = task.progress?.some((entry: any) => entry.stepId === step.id && entry.completed)
                const current = index === activeStepIndex && !isComplete

                return (
                  <li
                    key={step.id}
                    className={`rounded border px-3 py-2 ${current ? 'border-blue-300 bg-blue-50' : 'border-gray-200 bg-white'}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium text-gray-900">{index + 1}. {step.title}</div>
                        <div className="text-xs text-gray-500">{done ? 'Completed' : current ? 'Current step' : 'Pending'}</div>
                      </div>
                      <div className={`text-xs font-semibold ${done ? 'text-green-700' : current ? 'text-blue-700' : 'text-gray-400'}`}>
                        {done ? 'Done' : current ? 'Now' : 'Next'}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <button onClick={() => router.push('/tasks')} className="w-full px-3 py-2 bg-gray-200 rounded">
            Back to tasks
          </button>
        </aside>

        <section className="rounded border bg-white p-4 space-y-4">
          {currentStep ? (
            <>
              <div>
                <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Current step</div>
                <div className="mt-1 text-2xl font-semibold">{currentStep.title}</div>
                <div className="mt-2 text-sm text-gray-600">{currentStep.content}</div>
              </div>

              {currentStep.videoUrl && (
                <div className="overflow-hidden rounded border bg-gray-50">
                  <iframe
                    src={currentStep.videoUrl}
                    title={currentStep.title}
                    className="w-full min-h-[320px]"
                  />
                </div>
              )}

              <div className="rounded border bg-gray-50 p-3 text-sm text-gray-700">
                Current step status: <span className="font-medium">{currentProgress?.completed ? 'Completed' : 'In progress'}</span>
              </div>

              <label className="flex items-start gap-3 rounded border p-3 text-sm">
                <input
                  type="checkbox"
                  checked={stepAcknowledged}
                  onChange={event => setStepAcknowledged(event.target.checked)}
                  className="mt-1"
                />
                <span>I have completed this step and I am ready to continue.</span>
              </label>
            </>
          ) : isComplete ? (
            <div className="rounded border border-green-200 bg-green-50 p-4 text-sm text-green-900">
              This task is complete. You can return to the task list or review the workflow steps.
            </div>
          ) : (
            <div className="text-sm text-gray-700">No current step is available yet.</div>
          )}

          <div className="flex gap-2">
            <button
              onClick={nextStep}
              disabled={!stepAcknowledged || submitting || isComplete}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isComplete ? 'Finished' : submitting ? 'Saving...' : nextLabel}
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
