"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Step {
  id: string
  title: string
  objective?: string | null
  content: string
  order: number
  videoUrl?: string | null
  expectedMinutes: number
  warnings: string[]
  completionChecks: string[]
  requiresVideo: boolean
  requiresConfirmation: boolean
  requiresSupervisorSignOff: boolean
}

interface Workflow {
  id: string
  code: string
  title: string
  description?: string | null
  department: string
  difficulty: string
  estimatedMinutes: number
  passMark: number
  steps: Step[]
}

export default function TrainingPage() {
  const params = useParams()
  const workflowId = params.id as string
  const [workflow, setWorkflow] = useState<Workflow | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/workflows?id=${workflowId}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        // Guard: if the API returns an array, we got a bad id
        if (Array.isArray(data)) {
          setWorkflow(null)
          return
        }
        setWorkflow(data)
      } catch (err) {
        console.error('Failed to load workflow:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [workflowId])

  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-8 text-center text-slate-300">
          Loading training...
        </div>
      </div>
    )
  }

  if (!workflow) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-8 text-center">
          <h1 className="text-xl font-semibold text-white mb-2">Workflow not found</h1>
          <Link href="/training" className="text-cyan-300 hover:underline">
            ← Back to training library
          </Link>
        </div>
      </div>
    )
  }

  const steps = workflow.steps ?? []

  // -------------------------------------------------------------------
  // No steps
  // -------------------------------------------------------------------
  if (!steps.length) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-6">
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-white mb-4">
            {workflow.title}
          </h1>
          <p className="text-slate-300">This training workflow has no steps yet.</p>
          <Link
            href="/training"
            className="mt-4 inline-block text-cyan-300 hover:underline"
          >
            ← Back to training library
          </Link>
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------------
  // Completed screen
  // -------------------------------------------------------------------
  if (completed) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="glass-card rounded-2xl p-10 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-white mb-3">
            Module complete
          </h1>
          <p className="text-slate-300 mb-2">
            You&apos;ve finished <strong className="text-white">{workflow.title}</strong>.
          </p>
          <p className="text-slate-400 text-sm mb-8">
            {workflow.code} · {steps.length} steps · Est. {workflow.estimatedMinutes} min
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/training"
              className="rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-200 transition"
            >
              Back to library
            </Link>
            <button
              onClick={() => {
                setCurrentStep(0)
                setCompleted(false)
              }}
              className="rounded-lg border border-slate-600 bg-slate-900/40 px-5 py-3 font-semibold text-slate-100 hover:bg-slate-800/80 transition"
            >
              Review again
            </button>
          </div>

          {workflow.passMark && (
            <p className="mt-8 text-xs text-slate-500">
              Assessment unlocks in a future update. Required pass mark: {workflow.passMark}%.
            </p>
          )}
        </div>
      </div>
    )
  }

  // -------------------------------------------------------------------
  // Playing
  // -------------------------------------------------------------------
  const safeStepIndex = Math.min(currentStep, steps.length - 1)
  const step = steps[safeStepIndex]
  const isLastStep = safeStepIndex === steps.length - 1
  const progress = ((safeStepIndex + 1) / steps.length) * 100

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300 mb-2">
              {workflow.code} · {workflow.department}
            </div>
            <h1 className="font-[var(--font-heading)] text-2xl md:text-3xl font-semibold text-white">
              {workflow.title}
            </h1>
          </div>
          <Link
            href="/training"
            className="text-sm text-slate-400 hover:text-cyan-300 whitespace-nowrap"
          >
            ← Library
          </Link>
        </div>

        {/* Progress bar */}
        <div className="mt-5">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            <span>Step {safeStepIndex + 1} of {steps.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-cyan-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <h2 className="font-[var(--font-heading)] text-2xl font-semibold text-white mb-3">
          {step.title}
        </h2>

        {step.objective && (
          <p className="text-cyan-200 text-sm mb-6 italic">
            Objective: {step.objective}
          </p>
        )}

        {/* Video */}
        {step.videoUrl && (
          <div className="mb-6 rounded-xl overflow-hidden border border-slate-700/60">
            <iframe
              src={step.videoUrl}
              width="100%"
              height="360"
              className="block"
              allowFullScreen
            />
          </div>
        )}

        {/* Main content */}
        <div className="rounded-xl bg-slate-900/50 border border-slate-800 p-5 mb-6">
          <p className="text-slate-200 whitespace-pre-line leading-relaxed">
            {step.content}
          </p>
        </div>

        {/* Warnings */}
        {step.warnings && step.warnings.length > 0 && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4 mb-6">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
              <div>
                {step.warnings.map((w, i) => (
                  <p key={i} className="text-red-200 text-sm font-medium">
                    {w}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Completion checks */}
        {step.completionChecks && step.completionChecks.length > 0 && (
          <div className="rounded-xl border border-slate-700/70 bg-slate-900/40 p-5 mb-6">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300 mb-3">
              Completion check
            </div>
            <ul className="space-y-2">
              {step.completionChecks.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-200 text-sm">
                  <span className="text-cyan-400 mt-0.5">☐</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            {step.requiresSupervisorSignOff && (
              <p className="mt-3 text-xs text-amber-300">
                Supervisor sign-off required
              </p>
            )}
          </div>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-6">
          <span>Est. {step.expectedMinutes} min</span>
          {step.requiresVideo && <span>· Video required</span>}
          {step.requiresConfirmation && <span>· Confirmation required</span>}
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(0, safeStepIndex - 1))}
            disabled={safeStepIndex === 0}
            className="rounded-lg border border-slate-600 bg-slate-900/40 px-5 py-3 font-semibold text-slate-100 hover:bg-slate-800/80 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {!isLastStep ? (
            <button
              onClick={() => setCurrentStep(safeStepIndex + 1)}
              className="rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-200 transition"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => setCompleted(true)}
              className="rounded-lg bg-green-500 px-5 py-3 font-semibold text-white hover:bg-green-400 transition"
            >
              Complete training ✓
            </button>
          )}
        </div>
      </div>
    </div>
  )
}