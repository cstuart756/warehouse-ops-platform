"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!question.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/ai/supervisor", {
        method: "POST",
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Error contacting AI assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-[var(--font-heading)] text-3xl font-semibold text-white">
          AI Supervisor Assistant
        </h1>
        <div className="flex gap-3">
          <Link
            href="/dashboard/forecast"
            className="rounded-lg border border-cyan-200/50 bg-slate-900/30 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-slate-800/80"
          >
            Forecast
          </Link>
          <Link
            href="/dashboard/optimisation"
            className="rounded-lg border border-cyan-200/50 bg-slate-900/30 px-4 py-2 font-semibold text-cyan-100 transition hover:bg-slate-800/80"
          >
            Optimise
          </Link>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-6">
        <p className="mb-4 text-slate-300">
          Ask questions about your warehouse operations, and the AI assistant will provide insights based on live data.
        </p>

        <textarea
          className="glass-card w-full rounded-xl px-4 py-3 text-white placeholder-slate-400"
          rows={4}
          placeholder="Example: Why are users stuck on receiving workflow?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
        />

        <button
          className="mt-4 rounded-lg bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 disabled:opacity-50"
          onClick={ask}
          disabled={loading || !question.trim()}
        >
          {loading ? "Asking..." : "Ask AI"}
        </button>
      </div>

      {answer && (
        <div className="glass-card rounded-2xl p-6">
          <h3 className="mb-4 font-semibold text-cyan-300">AI Response:</h3>
          <p className="whitespace-pre-wrap text-slate-300">{answer}</p>
        </div>
      )}
    </div>
  );
}
