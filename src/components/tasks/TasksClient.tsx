"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

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
    <div>
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
      <section className="mb-6">
        <h2 className="font-medium">Start a Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {workflows.map(workflow => (
            <div key={workflow.id} className="p-4 border rounded">
              <div className="font-semibold">{workflow.title}</div>
              <div className="text-sm text-gray-600">{workflow.description}</div>
              <button onClick={() => startTask(workflow.id)} className="mt-2 px-3 py-1 bg-blue-600 text-white rounded">
                Start
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-medium">Active Tasks</h2>
          {loading && <span className="text-sm text-gray-500">Loading...</span>}
        </div>
        <ul className="mt-3 space-y-2">
          {tasks.map(task => {
            const totalSteps = task.workflow?.steps?.length ?? 0
            const completedSteps = task.progress?.filter((progress: any) => progress.completed).length ?? 0
            const percent = totalSteps ? Math.round((completedSteps / totalSteps) * 100) : 0

            return (
              <li key={task.id} className="p-3 border rounded flex justify-between items-center">
                <div>
                  <div className="font-semibold">{task.workflow?.title ?? 'Untitled workflow'}</div>
                  <div className="text-sm text-gray-600">
                    Status: {task.status} • Step: {Math.min(task.currentStep + 1, totalSteps || task.currentStep + 1)} of {totalSteps || '0'}
                  </div>
                  <div className="text-sm text-gray-500">Progress: {percent}%</div>
                </div>
                <div>
                  <Link href={`/tasks/${task.id}`} className="px-3 py-1 bg-green-600 text-white rounded">
                    Open
                  </Link>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
