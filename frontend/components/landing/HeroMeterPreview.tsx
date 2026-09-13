"use client";

import { motion } from "framer-motion";

export default function HeroMeterPreview() {
  const circumference = 2 * Math.PI * 54;
  const score = 87;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-sm rounded-3xl border border-[#e6e7ee] bg-white p-6 shadow-[0_20px_60px_-25px_rgba(20,22,31,0.25)]"
    >
      <div className="flex items-center justify-between text-xs text-[#6b7280]">
        <span>Client: John Smith</span>
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#059669]" />
          Live analysis
        </span>
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="relative h-36 w-36">
          <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#f0f1f6" strokeWidth="10" />
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#dc2626"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              whileInView={{ strokeDashoffset: offset }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-[#dc2626]">{score}</span>
            <span className="text-[10px] text-[#6b7280]">/ 100</span>
          </div>
        </div>
        <span className="rounded-full bg-[#fef2f2] px-3 py-1 text-xs font-semibold text-[#dc2626]">
          🔴 CRITICAL RISK
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {[
          { label: "Email Check", status: "Unverified", ok: false },
          { label: "Blacklist Check", status: "3 reports found", ok: false },
          { label: "Contract Analysis", status: "2 red flags", ok: false },
        ].map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9 + i * 0.15, duration: 0.4 }}
            className="flex items-center justify-between rounded-lg bg-[#f6f7fb] px-3 py-2 text-xs"
          >
            <span className="text-[#14161f]">{row.label}</span>
            <span className="font-medium text-[#dc2626]">{row.status}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
