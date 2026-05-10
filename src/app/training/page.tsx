"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Workflow {
  id: string
  title: string
  description?: string
  steps: any[]
}

export default function TrainingLibraryPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/workflows')
      const data = await res.json()
      setWorkflows(data)
    }
    load()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Training Library</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workflows.map(w => (
          <div key={w.id} className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">{w.title}</h2>
            <p className="text-gray-600 text-sm mb-4">{w.description}</p>
            <div className="text-xs text-gray-500 mb-4">{w.steps?.length ?? 0} steps</div>
            <Link href={`/training/${w.id}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded text-sm">
              Start Training
            </Link>
          </div>
        ))}
      </div>

      {workflows.length === 0 && (
        <div className="text-gray-500">No training workflows yet. Ask admin to create one.</div>
      )}
    </div>
  )
}
