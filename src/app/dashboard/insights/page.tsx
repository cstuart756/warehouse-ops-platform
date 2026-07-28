"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InsightsDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [workflowInsights, setWorkflowInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/analytics/insights");
      const json = await res.json();
      setData(json.steps ?? []);
      setWorkflowInsights(json.workflowInsights ?? []);
    } catch (error) {
      console.error("Failed to load insights:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="p-6">Loading insights...</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-white">
            Operational Insights
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Monitor the health of active playbooks and highlight where interventions can keep throughput steady.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/ml"
            className="rounded-lg border border-cyan-200/50 bg-slate-900/30 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-slate-800/80"
          >
            ML Insights
          </Link>
          <Link
            href="/dashboard/forecast"
            className="rounded-lg border border-cyan-200/50 bg-slate-900/30 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-slate-800/80"
          >
            Forecast
          </Link>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-cyan-200/20 bg-slate-900/50 p-4">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Live signals</div>
          <div className="mt-3 text-3xl font-semibold text-white">{data.length}</div>
          <p className="mt-2 text-sm text-slate-400">Active workflow observations currently surfaced.</p>
        </div>
        <div className="rounded-2xl border border-amber-300/20 bg-slate-900/50 p-4">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Watchlist</div>
          <div className="mt-3 text-3xl font-semibold text-white">{data.filter((step) => step.anomalies.length > 0).length}</div>
          <p className="mt-2 text-sm text-slate-400">Steps with issues that need immediate attention.</p>
        </div>
        <div className="rounded-2xl border border-green-400/20 bg-slate-900/50 p-4">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-green-300">Recommendations</div>
          <div className="mt-3 text-3xl font-semibold text-white">{data.reduce((sum, step) => sum + step.recommendations.length, 0)}</div>
          <p className="mt-2 text-sm text-slate-400">Suggested actions generated for the team.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Workflow health summary</h2>
          <span className="text-sm text-slate-400">Operational snapshot</span>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {workflowInsights.map((workflow) => (
            <div key={workflow.workflowId} className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{workflow.workflowTitle}</h3>
                <span className="text-sm text-cyan-300">{workflow.averageCompletion}% complete</span>
              </div>
              <div className="mt-3 text-sm text-slate-400">
                {workflow.completedTasks} completed • {workflow.inProgressTasks} in progress • {workflow.totalTasks} total
              </div>
              {workflow.mostCommonIssue && (
                <div className="mt-3 rounded-xl border border-amber-400/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
                  Most common issue: {workflow.mostCommonIssue}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-6">
            <p className="text-slate-300">No anomalies detected. All steps performing normally.</p>
          </div>
        ) : (
          data.map((step) => (
            <div key={step.stepId} className="rounded-2xl border border-slate-700/70 bg-slate-900/50 p-6">
              <h2 className="font-[var(--font-heading)] text-xl font-semibold text-white">
                {step.workflow} → {step.stepTitle}
              </h2>

              {step.anomalies.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold text-red-400">⚠️ Anomalies:</h3>
                  <ul className="space-y-1">
                    {step.anomalies.map((a: string, i: number) => (
                      <li key={i} className="text-red-300">
                        • {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step.recommendations.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold text-cyan-400">💡 Recommendations:</h3>
                  <ul className="space-y-1">
                    {step.recommendations.map((r: string, i: number) => (
                      <li key={i} className="text-cyan-300">
                        • {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {step.anomalies.length === 0 && step.recommendations.length === 0 && (
                <p className="mt-4 text-slate-400">No anomalies or recommendations.</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
