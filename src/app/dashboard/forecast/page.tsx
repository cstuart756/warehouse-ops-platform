"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ForecastDashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/analytics/forecast");
      setData(await res.json());
    } catch (error) {
      console.error("Failed to load forecast:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (loading) return <div className="p-6">Loading forecast...</div>;

  const highRisk = data.filter((d) => d.riskScore > 70);
  const moderateRisk = data.filter((d) => d.riskScore > 40 && d.riskScore <= 70);
  const stable = data.filter((d) => d.riskScore <= 40);

  return (
    <div className="space-y-6 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-white">
          Predictive Failure Forecast
        </h1>
        <div className="flex gap-3">
          <Link
            href="/dashboard/insights"
            className="rounded-lg border border-cyan-200/50 bg-slate-900/30 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-slate-800/80"
          >
            Insights
          </Link>
          <Link
            href="/dashboard/optimisation"
            className="rounded-lg border border-cyan-200/50 bg-slate-900/30 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-slate-800/80"
          >
            Optimisation
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="glass-card rounded-2xl p-4">
          <p className="text-sm text-slate-400">High Risk</p>
          <p className="mt-2 text-3xl font-bold text-red-400">{highRisk.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-sm text-slate-400">Moderate Risk</p>
          <p className="mt-2 text-3xl font-bold text-yellow-400">{moderateRisk.length}</p>
        </div>
        <div className="glass-card rounded-2xl p-4">
          <p className="text-sm text-slate-400">Stable</p>
          <p className="mt-2 text-3xl font-bold text-green-400">{stable.length}</p>
        </div>
      </div>

      <div className="space-y-4">
        {highRisk.length > 0 && (
          <div>
            <h2 className="font-semibold text-red-400">🔴 High Risk Steps</h2>
            <div className="mt-2 space-y-2">
              {highRisk.map((d) => (
                <div key={d.stepId} className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">
                        {d.workflow} → {d.step}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{d.prediction}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="h-3 w-32 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="h-full bg-red-600"
                          style={{ width: `${d.riskScore}%` }}
                        />
                      </div>
                      <p className="text-sm font-semibold text-red-400">
                        {d.riskScore}/100
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {moderateRisk.length > 0 && (
          <div>
            <h2 className="font-semibold text-yellow-400">🟡 Moderate Risk Steps</h2>
            <div className="mt-2 space-y-2">
              {moderateRisk.map((d) => (
                <div key={d.stepId} className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">
                        {d.workflow} → {d.step}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{d.prediction}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="h-3 w-32 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: `${d.riskScore}%` }}
                        />
                      </div>
                      <p className="text-sm font-semibold text-yellow-400">
                        {d.riskScore}/100
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {stable.length > 0 && (
          <div>
            <h2 className="font-semibold text-green-400">🟢 Stable Steps</h2>
            <div className="mt-2 space-y-2">
              {stable.map((d) => (
                <div key={d.stepId} className="glass-card rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">
                        {d.workflow} → {d.step}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">{d.prediction}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="h-3 w-32 overflow-hidden rounded-full bg-slate-700">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${d.riskScore}%` }}
                        />
                      </div>
                      <p className="text-sm font-semibold text-green-400">
                        {d.riskScore}/100
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
