"use client";

import { useState } from "react";
import RiskMeter from "@/components/RiskMeter";
import FlagCard from "@/components/FlagCard";
import AgentTimeline from "@/components/AgentTimeline";
import Navbar from "@/components/landing/Navbar";
import type { AnalyzeResult } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const PIPELINE_PREVIEW = [
  { icon: "📧", label: "Email Agent", desc: "Verifies deliverability & risk" },
  { icon: "🚫", label: "Blacklist Agent", desc: "Checks community scam reports" },
  { icon: "📄", label: "Contract Agent", desc: "Gemini scans for red flags" },
  { icon: "🎯", label: "Risk Scoring Agent", desc: "Combines signals into a score" },
  { icon: "🚨", label: "Alert Agent", desc: "Notifies Slack if risk is high" },
];

export default function AnalyzePage() {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [contractText, setContractText] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_name: clientName,
          client_email: clientEmail,
          linkedin_url: linkedinUrl,
          contract_text: contractText || null,
        }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: AnalyzeResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-12">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#14161f]">
            Analyze a Client
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#6b7280]">
            Paste a client&apos;s details and let the 5-agent pipeline catch a scam before it
            costs you.
          </p>
        </header>

        {!result && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <form
              onSubmit={handleAnalyze}
              className="flex flex-col gap-4 rounded-2xl border border-[#e6e7ee] bg-white p-6 shadow-sm lg:col-span-3"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#6b7280]">Client Name</label>
                <input
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="rounded-lg border border-[#e6e7ee] bg-white px-3 py-2 text-sm text-[#14161f] outline-none transition focus:border-[#5b52f0] focus:ring-2 focus:ring-[#5b52f022]"
                  placeholder="John Smith"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#6b7280]">Client Email</label>
                <input
                  required
                  type="email"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="rounded-lg border border-[#e6e7ee] bg-white px-3 py-2 text-sm text-[#14161f] outline-none transition focus:border-[#5b52f0] focus:ring-2 focus:ring-[#5b52f022]"
                  placeholder="client@example.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#6b7280]">
                  LinkedIn URL (optional)
                </label>
                <input
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  className="rounded-lg border border-[#e6e7ee] bg-white px-3 py-2 text-sm text-[#14161f] outline-none transition focus:border-[#5b52f0] focus:ring-2 focus:ring-[#5b52f022]"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#6b7280]">
                  Contract Text (optional)
                </label>
                <textarea
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  rows={5}
                  className="resize-none rounded-lg border border-[#e6e7ee] bg-white px-3 py-2 text-sm text-[#14161f] outline-none transition focus:border-[#5b52f0] focus:ring-2 focus:ring-[#5b52f022]"
                  placeholder="Paste the contract or scope of work here..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-xl bg-[#5b52f0] py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#4a41e0] disabled:opacity-50"
              >
                {loading ? "Agents working..." : "Analyze Client"}
              </button>

              {loading && (
                <div className="flex justify-center pt-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e6e7ee] border-t-[#5b52f0]" />
                </div>
              )}

              {error && <p className="text-center text-sm text-[#dc2626]">{error}</p>}
            </form>

            <aside className="flex flex-col gap-3 rounded-2xl border border-[#e6e7ee] bg-[#f6f7fb] p-6 lg:col-span-2">
              <h2 className="text-sm font-semibold text-[#14161f]">What happens next</h2>
              <p className="mb-2 text-xs text-[#6b7280]">
                Your input runs through 5 agents, one after another:
              </p>
              {PIPELINE_PREVIEW.map((step) => (
                <div
                  key={step.label}
                  className="flex items-center gap-3 rounded-xl border border-[#e6e7ee] bg-white p-3"
                >
                  <span className="text-lg">{step.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-[#14161f]">{step.label}</p>
                    <p className="text-[11px] text-[#9096a5]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        )}

        {result && (
          <div className="mx-auto flex max-w-2xl flex-col gap-6">
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#e6e7ee] bg-white p-6 shadow-sm">
              <RiskMeter score={result.risk_score} level={result.risk_level} />
              <p className="text-center text-sm text-[#6b7280]">{result.risk_reasoning}</p>
            </div>

            <section className="rounded-2xl border border-[#e6e7ee] bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-sm font-semibold text-[#14161f]">Agent Timeline</h2>
              <AgentTimeline
                steps={[
                  { label: "Email Check", note: result.email_check_note, done: true },
                  { label: "Blacklist Check", note: result.blacklist_note, done: true },
                  { label: "Contract Analysis", note: result.contract_summary, done: true },
                  {
                    label: "Risk Scoring",
                    note: `${result.risk_score}/100 — ${result.risk_level}`,
                    done: true,
                  },
                  { label: "Alert", note: result.alert_note ?? "No alert sent", done: true },
                ]}
              />
            </section>

            {result.contract_flags.length > 0 && (
              <section className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold text-[#14161f]">Red Flags</h2>
                {result.contract_flags.map((flag, i) => (
                  <FlagCard key={i} flag={flag} />
                ))}
              </section>
            )}

            <button
              onClick={reset}
              className="w-full rounded-xl border border-[#e6e7ee] py-3 text-sm font-semibold text-[#14161f] transition hover:bg-[#f6f7fb]"
            >
              Analyze Another Client
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
