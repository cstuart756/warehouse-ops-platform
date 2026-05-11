"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InsightsDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/analytics/insights");
      const json = await res.json();
      setData(json);
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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-white">
          Operational Insights
        </h1>
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

      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="glass-card rounded-2xl p-6">
            <p className="text-slate-300">No anomalies detected. All steps performing normally.</p>
          </div>
        ) : (
          data.map((step) => (
            <div key={step.stepId} className="glass-card rounded-2xl p-6">
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
