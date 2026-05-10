"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Workflow {
  id: string
  title: string
  description?: string
  steps: any[]
}

export default function AdminWorkflowsPage() {
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/workflows')
        const data = await res.json()
        setWorkflows(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleDelete(id: string) {
    if (!confirm('Delete workflow?')) return
    try {
      await fetch('/api/workflows/crud', {
        method: 'DELETE',
        body: JSON.stringify({ id })
      })
      setWorkflows(workflows.filter(w => w.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin: Workflows</h1>

      <button
        onClick={() => router.push('/admin/workflows/new')}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
      >
        + New Workflow
      </button>

      <div className="grid gap-4">
        {workflows.map(w => (
          <div key={w.id} className="p-4 bg-white rounded shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{w.title}</h2>
                <p className="text-sm text-gray-600">{w.description}</p>
                <p className="text-xs text-gray-500 mt-1">{w.steps?.length ?? 0} steps</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/workflows/${w.id}`} className="bg-gray-200 px-3 py-1 rounded text-sm">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
