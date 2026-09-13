"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "80%", label: "Scam detection precision", sub: "on real freelancer scam reports" },
  { value: "4.2s", label: "Average response time", sub: "from paste to full risk report" },
  { value: "5", label: "Independent AI agents", sub: "each with isolated error handling" },
  { value: "0-100", label: "Fraud risk score", sub: "with full reasoning, not a black box" },
];

export default function Stats() {
  return (
    <section id="results" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2 className="text-3xl font-bold text-[#14161f] sm:text-4xl">Tested, not just built</h2>
        <p className="mt-3 text-[#6b7280]">
          Verified against real-world freelancer scam reports before this was ever called done.
        </p>
      </motion.div>

      <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl border border-[#e6e7ee] bg-white p-6 text-center shadow-sm"
          >
            <div className="bg-gradient-to-r from-[#5b52f0] to-[#059669] bg-clip-text text-3xl font-extrabold text-transparent">
              {s.value}
            </div>
            <div className="mt-2 text-sm font-semibold text-[#14161f]">{s.label}</div>
            <div className="mt-1 text-xs text-[#9096a5]">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
