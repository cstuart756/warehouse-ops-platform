"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getTaskProgressMetrics } from '../../lib/task-progress'

export default function TasksClient() {
  const [tasks, setTasks] = useState<any[]>([])
  const [workflows, setWorkflows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  async function loadData() {
    setLoading(true)
    const [taskResponse, workflowResponse] = await Promise.all([
      fetch('/api/tasks/crud'),
      fetch('/api/workflows')
    ])
    const taskData = await taskResponse.json()
    const workflowData = await workflowResponse.json()
    setTasks(taskData)
    setWorkflows(workflowData)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  async function startTask(workflowId: string) {
    const response = await fetch('/api/tasks/crud', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workflowId })
    })

    if (!response.ok) return
    await loadData()
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-cyan-200/20 bg-slate-900/50 p-6 shadow-lg shadow-cyan-500/10">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Task execution</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Pick up a workflow and move it forward</h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300">
              Start a guided operation, follow each step in sequence, and keep progress visible for the next shift.
            </p>
          </div>
          <div className="rounded-2xl border border-cyan-200/20 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
            {loading ? 'Loading your active work...' : `${tasks.length} active task${tasks.length === 1 ? '' : 's'}`}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Start a task</h2>
          <span className="text-sm text-slate-400">Choose a workflow to begin</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {workflows.map(workflow => (
            <div key={workflow.id} className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
              <div className="font-semibold text-white">{workflow.title}</div>
              <div className="mt-2 text-sm text-slate-400">{workflow.description}</div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-cyan-300">{workflow.steps?.length ?? 0} steps</span>
                <button onClick={() => startTask(workflow.id)} className="rounded-lg bg-cyan-300 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
                  Start workflow
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Active tasks</h2>
          {loading && <span className="text-sm text-slate-400">Loading...</span>}
        </div>
        <div className="space-y-3">
          {tasks.map(task => {
            const totalSteps = task.workflow?.steps?.length ?? 0
            const completedSteps = task.progress?.filter((progress: any) => progress.completed).length ?? 0
            const metrics = getTaskProgressMetrics({
              currentStep: task.currentStep,
              totalSteps,
              completedSteps,
            })

            return (
              <div key={task.id} className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <div className="font-semibold text-white">{task.workflow?.title ?? 'Untitled workflow'}</div>
                    <div className="mt-1 text-sm text-slate-400">
                      Status: {task.status} • Step {metrics.currentStepNumber} of {totalSteps || '0'}
                    </div>
                    <div className="mt-3 h-2 w-full max-w-xl rounded-full bg-slate-800">
                      <div className="h-2 rounded-full bg-cyan-400 transition-all" style={{ width: `${metrics.percentComplete}%` }} />
                    </div>
                    <div className="mt-2 text-sm text-slate-400">Progress: {metrics.percentComplete}% complete</div>
                  </div>
                  <Link href={`/tasks/${task.id}`} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500">
                    Open task
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
