"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="mx-auto max-w-4xl px-5 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-3xl border border-[#e6e7ee] bg-[#f6f7fb] p-10 text-center sm:p-14"
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#5b52f0] opacity-[0.08] blur-[100px]" />
        <h2 className="text-2xl font-bold text-[#14161f] sm:text-3xl">
          Paste a client. Get the verdict in seconds.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-[#6b7280]">
          No signup, no setup on your end — try the live agent pipeline right now.
        </p>
        <Link
          href="/analyze"
          className="mt-7 inline-block rounded-xl bg-[#5b52f0] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03] hover:bg-[#4a41e0]"
        >
          Launch Live Demo →
        </Link>
      </motion.div>
    </section>
  );
}
