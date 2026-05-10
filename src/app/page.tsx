import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Warehouse Ops Platform</h1>
        <nav className="flex gap-6">
          <Link href="/training" className="text-blue-600">Training Library</Link>
          <Link href="/admin/workflows" className="text-blue-600">Admin</Link>
          <Link href="/dashboard" className="text-blue-600">Dashboard</Link>
        </nav>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">📚 Training</h2>
          <p className="text-sm text-gray-600 mb-4">Start a guided workflow tutorial with video and step-by-step instructions.</p>
          <Link href="/training" className="text-blue-600 text-sm">Browse trainings →</Link>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">⚙️ Admin</h2>
          <p className="text-sm text-gray-600 mb-4">Create workflows, add steps, and upload training videos (admin only).</p>
          <Link href="/admin/workflows" className="text-blue-600 text-sm">Go to admin →</Link>
        </div>

        <div className="p-6 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">📊 Dashboard</h2>
          <p className="text-sm text-gray-600 mb-4">View task progress and analytics (requires sign-in).</p>
          <Link href="/dashboard" className="text-blue-600 text-sm">Go to dashboard →</Link>
        </div>
      </section>
    </div>
  )
}
