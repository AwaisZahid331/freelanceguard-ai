"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: "📧",
    title: "Email Agent",
    desc: "Verifies the client's email is real, deliverable and low-risk via AbstractAPI.",
    color: "#5b52f0",
    soft: "#efeeff",
  },
  {
    icon: "🚫",
    title: "Blacklist Agent",
    desc: "Checks a community-reported blacklist of known scam clients in Google Sheets.",
    color: "#d97706",
    soft: "#fffbeb",
  },
  {
    icon: "📄",
    title: "Contract Agent",
    desc: "Gemini reads the contract for vague scope, missing payment terms and IP grabs.",
    color: "#059669",
    soft: "#ecfdf5",
  },
  {
    icon: "🎯",
    title: "Risk Scoring Agent",
    desc: "Aggregates every signal into one 0-100 fraud risk score with clear reasoning.",
    color: "#b45309",
    soft: "#fffbeb",
  },
  {
    icon: "🚨",
    title: "Alert Agent",
    desc: "Fires an instant Slack alert the moment a client crosses the risk threshold.",
    color: "#dc2626",
    soft: "#fef2f2",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold text-[#14161f] sm:text-4xl">
          Five agents. One verdict.
        </h2>
        <p className="mt-3 text-[#6b7280]">
          Every client you paste runs through the same pipeline — sequential, auditable, and
          built to degrade gracefully instead of crashing.
        </p>
      </motion.div>

      <div className="relative mt-16 grid grid-cols-1 gap-6 md:grid-cols-5">
        <div className="absolute left-0 right-0 top-8 hidden h-px bg-[#e6e7ee] md:block" />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative flex flex-col items-center rounded-2xl border border-[#e6e7ee] bg-white p-5 text-center shadow-sm transition hover:shadow-md"
          >
            <div
              className="mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl"
              style={{ backgroundColor: step.soft }}
            >
              {step.icon}
            </div>
            <span className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-[#9096a5]">
              Step {i + 1}
            </span>
            <h3 className="mb-2 text-sm font-semibold text-[#14161f]">{step.title}</h3>
            <p className="text-xs leading-relaxed text-[#6b7280]">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
