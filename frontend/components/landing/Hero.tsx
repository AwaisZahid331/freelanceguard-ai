"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HeroMeterPreview from "./HeroMeterPreview";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-2 md:pb-28 md:pt-24">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#e6e7ee] bg-[#f6f7fb] px-3 py-1 text-xs font-medium text-[#5b52f0]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
          5 AI Agents · Live Fraud Detection
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold leading-tight tracking-tight text-[#14161f] sm:text-5xl"
        >
          Stop losing money to{" "}
          <span className="bg-gradient-to-r from-[#5b52f0] to-[#059669] bg-clip-text text-transparent">
            fake clients
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-lg text-base text-[#6b7280] sm:text-lg"
        >
          FreelanceGuard AI investigates a client&apos;s email, history and contract in
          seconds — a multi-agent pipeline that catches scams before you ever start work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/analyze"
            className="rounded-xl bg-[#5b52f0] px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:bg-[#4a41e0]"
          >
            Try Live Demo →
          </Link>
          <a
            href="#how-it-works"
            className="rounded-xl border border-[#e6e7ee] px-6 py-3 text-center text-sm font-semibold text-[#14161f] transition hover:bg-[#f6f7fb]"
          >
            See how it works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#9096a5]"
        >
          <span>Built with</span>
          {["LangGraph", "Gemini", "FastAPI", "Next.js"].map((t) => (
            <span key={t} className="font-mono text-[#6b7280]">
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <HeroMeterPreview />
    </section>
  );
}
