import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="section-glow -mx-6 overflow-hidden rounded-3xl border border-cyan-200/10 bg-slate-950/70 px-6 py-10 md:px-8 md:py-14">
      <section className="hero-noise relative mx-auto max-w-6xl rounded-3xl border border-cyan-200/10 px-5 py-10 md:px-10 md:py-14">
        <div className="pointer-events-none absolute -left-16 top-10 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-6 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />

        <header className="stagger-fade mb-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 inline-block rounded-full border border-cyan-200/30 bg-cyan-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-100">
              Operational Execution System
            </p>
            <h1 className="font-[var(--font-heading)] text-4xl font-semibold leading-tight md:text-6xl">
              <span className="headline-gradient">Train anyone.</span>{' '}
              Run warehouse operations flawlessly.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Step-by-step guided workflows that eliminate errors, speed up onboarding,
              and keep every shift moving with confidence.
            </p>
          </div>
          <div className="stagger-fade delay-1 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            <Link
              href="/tasks"
              className="rounded-xl bg-cyan-300 px-6 py-3 text-center font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200"
            >
              Start Demo
            </Link>
            <Link
              href="/admin/workflows"
              className="rounded-xl border border-cyan-200/50 bg-slate-900/40 px-6 py-3 text-center font-semibold text-cyan-100 transition hover:bg-cyan-400/10"
            >
              Build Workflow
            </Link>
          </div>
        </header>

        <section className="stagger-fade delay-1 mb-14 grid gap-4 md:grid-cols-3">
          <div className="glass-card soft-float rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Error Rate</p>
            <p className="mt-2 text-3xl font-bold text-white">-40%</p>
            <p className="mt-2 text-sm text-slate-300">Cut mistakes by replacing memory-dependent work with guided execution.</p>
          </div>
          <div className="glass-card soft-float rounded-2xl p-5" style={{ animationDelay: '1.5s' }}>
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Training Speed</p>
            <p className="mt-2 text-3xl font-bold text-white">2x Faster</p>
            <p className="mt-2 text-sm text-slate-300">New hires learn in context instead of depending on paper SOPs.</p>
          </div>
          <div className="glass-card soft-float rounded-2xl p-5" style={{ animationDelay: '3s' }}>
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">Compliance</p>
            <p className="mt-2 text-3xl font-bold text-white">100% Visibility</p>
            <p className="mt-2 text-sm text-slate-300">Track completion and exceptions instantly across every workflow step.</p>
          </div>
        </section>

        <section className="stagger-fade delay-2 glass-card mb-14 overflow-hidden rounded-3xl">
          <Image
            src="/images/flowforge-before-after.svg"
            alt="Before and after comparison of warehouse operations with guided workflows"
            width={1600}
            height={900}
            className="h-auto w-full"
            priority
          />
        </section>

        <section className="stagger-fade delay-2 mb-14 grid gap-6 lg:grid-cols-2">
          <article className="glass-card rounded-3xl p-6">
            <h2 className="font-[var(--font-heading)] mb-3 text-2xl font-semibold text-white">Interactive Demo</h2>
            <p className="mb-6 text-slate-300 leading-relaxed">
              Let users complete a guided task in under a minute and feel how FlowForge reduces uncertainty on the floor.
            </p>
            <Image
              src="/images/warehouseguidedworkflows.png"
              alt="Guided workflow task demo preview"
              width={1200}
              height={700}
              className="h-auto w-full rounded-2xl border border-slate-700/60"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/tasks" className="rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-200">
                Try Demo
              </Link>
              <Link href="/training" className="rounded-lg border border-slate-500/70 bg-slate-900/30 px-4 py-2 font-semibold text-slate-100 transition hover:bg-slate-800/80">
                Browse Training
              </Link>
            </div>
          </article>

          <article className="glass-card rounded-3xl p-6">
            <h2 className="font-[var(--font-heading)] mb-3 text-2xl font-semibold text-white">Role-Based Experience</h2>
            <p className="mb-6 text-slate-300 leading-relaxed">
              Picker execution, supervisor visibility, and admin control are aligned in one operational flow.
            </p>
            <Image
              src="/images/warehousegeneraterole.png"
              alt="Role-based warehouse dashboard interface"
              width={1200}
              height={700}
              className="h-auto w-full rounded-2xl border border-slate-700/60"
            />
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-200">
                Open Dashboard
              </Link>
              <Link href="/admin/workflows" className="rounded-lg border border-slate-500/70 bg-slate-900/30 px-4 py-2 font-semibold text-slate-100 transition hover:bg-slate-800/80">
                Manage Workflows
              </Link>
            </div>
          </article>
        </section>

        <section className="stagger-fade delay-3 mb-14 grid gap-6 lg:grid-cols-2">
          <article className="glass-card rounded-3xl p-4">
            <Image
              src="/images/flowforge-architecture.svg"
              alt="FlowForge architecture connecting office systems and warehouse execution"
              width={1400}
              height={820}
              className="h-auto w-full rounded-2xl"
            />
          </article>
          <article className="glass-card rounded-3xl p-4">
            <Image
              src="/images/flowforge-analytics.svg"
              alt="Analytics view showing completion, error reduction, and training speed"
              width={1400}
              height={800}
              className="h-auto w-full rounded-2xl"
            />
          </article>
        </section>

        <section className="stagger-fade delay-3 glass-card mb-14 overflow-hidden rounded-3xl p-4">
          <Image
            src="/images/flowforge-funnel-map.svg"
            alt="FlowForge conversion funnel map from hero to conversion"
            width={1600}
            height={900}
            className="h-auto w-full rounded-2xl"
          />
        </section>

        <section className="stagger-fade delay-3 mb-2 grid gap-6 rounded-3xl border border-cyan-200/35 bg-gradient-to-br from-cyan-500/14 to-sky-400/5 p-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-white md:text-4xl">Start using FlowForge today</h2>
            <p className="mt-3 max-w-2xl text-slate-200 leading-relaxed">
              Give your team the clarity to execute correctly on every step, every shift,
              with measurable improvements in speed and quality.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/tasks" className="rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200">
                Start Demo
              </Link>
              <Link href="/sign-up" className="rounded-lg border border-cyan-200/60 bg-slate-900/25 px-5 py-3 font-semibold text-cyan-50 transition hover:bg-cyan-300/10">
                Create Account
              </Link>
              <Link href="/dashboard" className="rounded-lg border border-cyan-200/60 bg-slate-900/25 px-5 py-3 font-semibold text-cyan-50 transition hover:bg-cyan-300/10">
                View Metrics
              </Link>
            </div>
          </div>
          <div className="glass-card overflow-hidden rounded-2xl p-2">
            <Image
              src="/images/flowforge-email-capture.svg"
              alt="Email capture prompt to save demo progress"
              width={1200}
              height={700}
              className="h-auto w-full rounded-xl"
            />
          </div>
        </section>
      </section>
    </main>
  )
}
