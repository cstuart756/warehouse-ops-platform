import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <header className="mb-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 inline-block rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
              Operational Execution System
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              Train anyone. Run warehouse operations flawlessly.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-300 md:text-lg">
              Step-by-step guided workflows that eliminate errors, speed up onboarding,
              and keep every shift moving with confidence.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="/tasks"
              className="rounded-xl bg-cyan-400 px-6 py-3 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Start Demo
            </Link>
            <Link
              href="/admin/workflows"
              className="rounded-xl border border-cyan-300/50 px-6 py-3 text-center font-semibold text-cyan-100 transition hover:bg-cyan-400/10"
            >
              Build Workflow
            </Link>
          </div>
        </header>

        <section className="mb-14 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-3">
          <div>
            <p className="text-sm uppercase tracking-wide text-cyan-300">Error Rate</p>
            <p className="mt-2 text-3xl font-bold text-white">-40%</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-cyan-300">Training Speed</p>
            <p className="mt-2 text-3xl font-bold text-white">2x Faster</p>
          </div>
          <div>
            <p className="text-sm uppercase tracking-wide text-cyan-300">Compliance</p>
            <p className="mt-2 text-3xl font-bold text-white">100% Process Visibility</p>
          </div>
        </section>

        <section className="mb-14 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
          <Image
            src="/images/flowforge-before-after.svg"
            alt="Before and after comparison of warehouse operations with guided workflows"
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="mb-3 text-2xl font-semibold text-white">Interactive Demo</h2>
            <p className="mb-6 text-slate-300">
              Let users complete a guided task in under a minute and feel how FlowForge reduces uncertainty on the floor.
            </p>
            <Image
              src="/images/warehouseguidedworkflows.png"
              alt="Guided workflow task demo preview"
              width={1200}
              height={700}
              className="h-auto w-full rounded-xl border border-slate-700"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/tasks" className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300">
                Try Demo
              </Link>
              <Link href="/training" className="rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-100 transition hover:bg-slate-800">
                Browse Training
              </Link>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="mb-3 text-2xl font-semibold text-white">Role-Based Experience</h2>
            <p className="mb-6 text-slate-300">
              Picker execution, supervisor visibility, and admin control are aligned in one operational flow.
            </p>
            <Image
              src="/images/warehousegeneraterole.png"
              alt="Role-based warehouse dashboard interface"
              width={1200}
              height={700}
              className="h-auto w-full rounded-xl border border-slate-700"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300">
                Open Dashboard
              </Link>
              <Link href="/admin/workflows" className="rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-100 transition hover:bg-slate-800">
                Manage Workflows
              </Link>
            </div>
          </article>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <Image
              src="/images/flowforge-architecture.svg"
              alt="FlowForge architecture connecting office systems and warehouse execution"
              width={1400}
              height={820}
              className="h-auto w-full rounded-xl"
            />
          </article>
          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
            <Image
              src="/images/flowforge-analytics.svg"
              alt="Analytics view showing completion, error reduction, and training speed"
              width={1400}
              height={800}
              className="h-auto w-full rounded-xl"
            />
          </article>
        </section>

        <section className="mb-14 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <Image
            src="/images/flowforge-funnel-map.svg"
            alt="FlowForge conversion funnel map from hero to conversion"
            width={1600}
            height={900}
            className="h-auto w-full rounded-xl"
          />
        </section>

        <section className="mb-10 grid gap-6 rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-3xl font-bold text-white">Start using FlowForge today</h2>
            <p className="mt-3 max-w-2xl text-slate-200">
              Give your team the clarity to execute correctly on every step, every shift,
              with measurable improvements in speed and quality.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/tasks" className="rounded-lg bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                Start Demo
              </Link>
              <Link href="/sign-up" className="rounded-lg border border-cyan-200/60 px-5 py-3 font-semibold text-cyan-50 transition hover:bg-cyan-300/10">
                Create Account
              </Link>
              <Link href="/dashboard" className="rounded-lg border border-cyan-200/60 px-5 py-3 font-semibold text-cyan-50 transition hover:bg-cyan-300/10">
                View Metrics
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-cyan-200/30 bg-slate-900/50 p-2">
            <Image
              src="/images/flowforge-email-capture.svg"
              alt="Email capture prompt to save demo progress"
              width={1200}
              height={700}
              className="h-auto w-full rounded-lg"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
