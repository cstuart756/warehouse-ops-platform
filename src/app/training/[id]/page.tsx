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

export default function TrainingPage() {
  const params = useParams()
  const workflowId = params.id as string
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/workflows?id=${workflowId}`)
        const data = await res.json()
        setWorkflow(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [workflowId])

  if (loading) return <div className="p-6">Loading training...</div>
  if (!workflow) return <div className="p-6">Workflow not found</div>

  const step = workflow.steps[currentStep]
  const isLastStep = currentStep === workflow.steps.length - 1

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{workflow.title}</h1>
      <div className="mb-6 w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-blue-600 h-2 rounded transition-all"
          style={{ width: `${((currentStep + 1) / workflow.steps.length) * 100}%` }}
        />
      </div>

      {step && (
        <div className="bg-white rounded shadow p-8">
          <div className="text-sm text-gray-600 mb-4">
            Step {currentStep + 1} of {workflow.steps.length}
          </div>

          <h2 className="text-2xl font-semibold mb-4">{step.title}</h2>

          {step.videoUrl && (
            <div className="mb-6">
              <iframe
                src={step.videoUrl}
                width="100%"
                height="300"
                className="rounded"
                allowFullScreen
              />
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded mb-6">
            <p className="text-lg">{step.content}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="px-6 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Back
            </button>

            {!isLastStep ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-2 bg-blue-600 text-white rounded"
              >
                Next
              </button>
            ) : (
              <button className="px-6 py-2 bg-green-600 text-white rounded">
                Complete Training
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
