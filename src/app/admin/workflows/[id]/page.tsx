"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

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
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [stepTitle, setStepTitle] = useState('')
  const [stepContent, setStepContent] = useState('')
  const [stepVideoUrl, setStepVideoUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/workflows?id=${workflowId}`)
        const data = await res.json()
        setWorkflow(data)
        setTitle(data.title)
        setDescription(data.description || '')
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [workflowId])

  async function handleUpdateWorkflow(e: React.FormEvent) {
    e.preventDefault()
    try {
      const res = await fetch('/api/workflows/crud', {
        method: 'PUT',
        body: JSON.stringify({ id: workflowId, title, description })
      })
      const data = await res.json()
      setWorkflow(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleAddStep(e: React.FormEvent) {
    e.preventDefault()
    if (!workflow) return
    try {
      const res = await fetch('/api/steps/crud', {
        method: 'POST',
        body: JSON.stringify({
          title: stepTitle,
          content: stepContent,
          videoUrl: stepVideoUrl,
          order: workflow.steps.length + 1,
          workflowId
        })
      })
      const newStep = await res.json()
      setWorkflow({ ...workflow, steps: [...workflow.steps, newStep] })
      setStepTitle('')
      setStepContent('')
      setStepVideoUrl('')
    } catch (err) {
      console.error(err)
    }
  }

  async function handleDeleteStep(stepId: string) {
    if (!confirm('Delete step?')) return
    if (!workflow) return
    try {
      await fetch('/api/steps/crud', {
        method: 'DELETE',
        body: JSON.stringify({ id: stepId })
      })
      setWorkflow({
        ...workflow,
        steps: workflow.steps.filter(s => s.id !== stepId)
      })
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!workflow) return <div>Not found</div>

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Workflow details */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Edit Workflow</h1>

        <form onSubmit={handleUpdateWorkflow} className="space-y-4 mb-8 p-4 bg-white rounded">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Save Workflow
          </button>
        </form>
      </div>

      {/* Steps */}
      <div>
        <h2 className="text-xl font-bold mb-4">Steps ({workflow.steps.length})</h2>

        <div className="space-y-2 mb-6">
          {workflow.steps.map((step, idx) => (
            <div key={step.id} className="p-3 bg-gray-100 rounded">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-sm">Step {step.order}: {step.title}</div>
                  <div className="text-xs text-gray-600 mt-1">{step.content.substring(0, 60)}...</div>
                  {step.videoUrl && <div className="text-xs text-blue-600 mt-1">📹 {step.videoUrl}</div>}
                </div>
                <button
                  onClick={() => handleDeleteStep(step.id)}
                  className="text-red-500 text-sm ml-2"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <h3 className="font-semibold mb-2">Add Step</h3>
        <form onSubmit={handleAddStep} className="space-y-3 p-4 bg-white rounded">
          <div>
            <label className="block text-xs font-medium mb-1">Step Title *</label>
            <input
              type="text"
              value={stepTitle}
              onChange={(e) => setStepTitle(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Instructions *</label>
            <textarea
              value={stepContent}
              onChange={(e) => setStepContent(e.target.value)}
              className="w-full border rounded px-2 py-1 text-sm"
              rows={2}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1">Video URL (optional)</label>
            <input
              type="text"
              value={stepVideoUrl}
              onChange={(e) => setStepVideoUrl(e.target.value)}
              placeholder="https://youtube.com/embed/..."
              className="w-full border rounded px-2 py-1 text-sm"
            />
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-1 rounded text-sm">
            Add Step
          </button>
        </form>
      </div>
    </div>
  )
}
