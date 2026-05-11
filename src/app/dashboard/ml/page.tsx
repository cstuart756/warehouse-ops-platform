"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MLInsights() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/analytics/ml-insights");
      setData(await res.json());
    } catch (error) {
      console.error("Failed to load ML insights:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="p-6">Loading ML insights...</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-white">
          ML-Based Anomaly Detection
        </h1>
        <div className="flex gap-3">
          <Link
            href="/dashboard/insights"
            className="rounded-lg border border-cyan-200/50 bg-slate-900/30 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-slate-800/80"
          >
            Rule-Based
          </Link>
          <Link
            href="/dashboard/forecast"
            className="rounded-lg border border-cyan-200/50 bg-slate-900/30 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-slate-800/80"
          >
            Forecast
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((d) => (
          <div key={d.stepId} className="glass-card rounded-2xl p-6">
            <h2 className="font-[var(--font-heading)] text-xl font-semibold text-white">
              {d.workflow} → {d.step}
            </h2>

            {d.anomalies.length === 0 ? (
              <p className="mt-3 text-green-400">✓ Normal behaviour detected</p>
            ) : (
              <ul className="mt-3 space-y-1">
                {d.anomalies.map((a: string, i: number) => (
                  <li key={i} className="text-red-300">
                    ⚠️ {a}
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-4 text-sm text-slate-400">
              Z-Score Drop: <span className="text-cyan-300">{d.scores.dropZ.toFixed(2)}</span> | Z-Score Time:{" "}
              <span className="text-cyan-300">{d.scores.timeZ.toFixed(2)}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
