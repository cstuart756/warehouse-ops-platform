"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OptimisationDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/analytics/optimise");
      setData(await res.json());
    } catch (error) {
      console.error("Failed to load optimisation:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="p-6">Loading optimisation suggestions...</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-white">
          Workflow Auto-Optimisation
        </h1>
        <Link
          href="/dashboard/forecast"
          className="rounded-lg border border-cyan-200/50 bg-slate-900/30 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-slate-800/80"
        >
          Forecast
        </Link>
      </div>

      <div className="space-y-4">
        {data.map((d, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-[var(--font-heading)] text-xl font-semibold text-white">
                {d.workflow} → {d.step}
              </h2>
              <div className="rounded-lg bg-slate-800/50 px-3 py-1">
                <p className="text-sm font-semibold text-slate-300">
                  Risk: <span className="text-cyan-300">{d.risk}/100</span>
                </p>
              </div>
            </div>

            {d.suggestions.length > 0 ? (
              <ul className="space-y-2">
                {d.suggestions.map((s: string, idx: number) => (
                  <li key={idx} className="flex gap-3 text-slate-300">
                    <span className="text-cyan-400">💡</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-400">No optimisations needed for this step.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
