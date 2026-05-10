"use client"

import { useEffect, useState } from 'react'

type Step = { id: string; title: string; order: number }

export default function WorkflowsPage() {
  const [workflows, setWorkflows] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/workflows')
      const json = await res.json()
      setWorkflows(json)
    }
    load()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Workflows</h1>

      <div className="space-y-4">
        {workflows.map((w) => (
          <div key={w.id} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold">{w.title}</h2>
            <p className="text-sm text-gray-600">{w.description}</p>
            <div className="mt-2 text-xs text-gray-500">{w.steps?.length ?? 0} steps</div>
          </div>
        ))}

        {workflows.length === 0 && <div className="text-gray-500">No workflows yet.</div>}
      </div>
    </div>
  )
}
