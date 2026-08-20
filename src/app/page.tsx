import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="section-glow pb-10 md:pb-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:gap-10">
        <section className="hero-shell">
          <div className="hero-shell__content">
            <div className="stagger-fade max-w-2xl">
              <p className="eyebrow">Operational execution platform</p>
              <h1 className="font-heading mt-5 text-4xl font-semibold leading-[1.04] tracking-tight text-white md:text-6xl lg:text-7xl">
                <span className="headline-gradient">Guide every shift.</span><br />
                Train every operator.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
                Step-by-step workflows, faster onboarding, and live visibility for the teams moving your operation forward.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/tasks" className="button-primary">Start interactive demo <span aria-hidden="true">↗</span></Link>
                <Link href="/admin/workflows" className="button-secondary">Build a workflow</Link>
              </div>
              <p className="hero-note"><span aria-hidden="true">●</span> No credit card required <span aria-hidden="true">●</span> See results in minutes</p>
            </div>
          </div>
          <div className="hero-shell__visual stagger-fade delay-1">
              <Image
                src="/images/41baf219-2083-4480-8963-24aafd2c881a.png"
                alt="FlowForge warehouse operations hero showing guided workflows and live visibility"
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover object-[72%_center]"
                priority
              />
              <div className="hero-shell__shade" />
          </div>
          <div className="hero-metrics">
            <div><strong>40%</strong><span>fewer operational errors</span></div>
            <div><strong>2x</strong><span>faster staff training</span></div>
            <div><strong>100%</strong><span>process visibility</span></div>
          </div>
        </section>

        <section className="stagger-fade delay-2 grid gap-6 lg:grid-cols-2">
          <article className="glass-card flex h-full flex-col rounded-3xl p-6">
            <h2 className="font-[var(--font-heading)] mb-3 text-2xl font-semibold text-white">Interactive Demo</h2>
            <p className="mb-6 leading-relaxed text-slate-300">
              Let users complete a guided task in under a minute and feel how FlowForge reduces uncertainty on the floor.
            </p>
            <div className="mb-5 overflow-hidden rounded-2xl border border-slate-700/60">
              <Image
                src="/images/warehouseguidedworkflows.png"
                alt="Guided workflow task demo preview"
                width={1200}
                height={700}
                className="aspect-[16/10] h-auto w-full object-cover"
              />
            </div>
            <div className="mt-auto flex flex-wrap gap-3">
              <Link href="/tasks" className="rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-200">
                Try Demo
              </Link>
              <Link href="/training" className="rounded-lg border border-slate-500/70 bg-slate-900/30 px-4 py-2 font-semibold text-slate-100 transition hover:bg-slate-800/80">
                Browse Training
              </Link>
            </div>
          </article>

          <article className="glass-card flex h-full flex-col rounded-3xl p-6">
            <h2 className="font-[var(--font-heading)] mb-3 text-2xl font-semibold text-white">Role-Based Experience</h2>
            <p className="mb-6 leading-relaxed text-slate-300">
              Picker execution, supervisor visibility, and admin control are aligned in one operational flow.
            </p>
            <div className="mb-5 overflow-hidden rounded-2xl border border-slate-700/60">
              <Image
                src="/images/warehousegeneraterole.png"
                alt="Role-based warehouse dashboard interface"
                width={1200}
                height={700}
                className="aspect-[16/10] h-auto w-full object-cover"
              />
            </div>
            <div className="mt-auto flex flex-wrap gap-3">
              <Link href="/dashboard" className="rounded-lg bg-cyan-300 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-200">
                Open Dashboard
              </Link>
              <Link href="/admin/workflows" className="rounded-lg border border-slate-500/70 bg-slate-900/30 px-4 py-2 font-semibold text-slate-100 transition hover:bg-slate-800/80">
                Manage Workflows
              </Link>
            </div>
          </article>
        </section>

        <section className="stagger-fade delay-3 grid gap-6 lg:grid-cols-2">
          <article className="glass-card overflow-hidden rounded-3xl p-4">
            <Image
              src="/images/flowforge-architecture.svg"
              alt="FlowForge architecture connecting office systems and warehouse execution"
              width={1400}
              height={820}
              className="aspect-[16/10] h-auto w-full rounded-2xl object-cover"
            />
          </article>
          <article className="glass-card overflow-hidden rounded-3xl p-4">
            <Image
              src="/images/flowforge-analytics.svg"
              alt="Analytics view showing completion, error reduction, and training speed"
              width={1400}
              height={800}
              className="aspect-[16/10] h-auto w-full rounded-2xl object-cover"
            />
          </article>
        </section>

        <section className="stagger-fade delay-3 glass-card overflow-hidden rounded-3xl border border-cyan-200/20 p-4">
          <div className="overflow-hidden rounded-[1.25rem] bg-slate-950/70">
            <Image
              src="/images/flowforge-funnel-map.svg"
              alt="FlowForge conversion funnel map from hero to conversion"
              width={1600}
              height={900}
              className="h-auto w-full rounded-[1.25rem] object-cover"
            />
          </div>
        </section>

        <section className="stagger-fade delay-3 glass-card grid gap-6 rounded-3xl border border-cyan-200/35 bg-gradient-to-br from-cyan-500/14 to-sky-400/5 p-6 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="font-[var(--font-heading)] text-3xl font-semibold text-white md:text-4xl">Start using FlowForge today</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-200">
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
      </div>
    </main>
  )
}
