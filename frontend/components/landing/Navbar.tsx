"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-[#e6e7ee] bg-white/80 backdrop-blur-lg"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2 text-base font-bold text-[#14161f]">
          <span className="text-xl">🛡️</span>
          Freelance<span className="text-[#5b52f0]">Guard</span>
        </Link>
        <div className="flex items-center gap-6">
          <a
            href="#how-it-works"
            className="hidden text-sm text-[#6b7280] transition hover:text-[#14161f] sm:inline"
          >
            How it works
          </a>
          <a
            href="#results"
            className="hidden text-sm text-[#6b7280] transition hover:text-[#14161f] sm:inline"
          >
            Results
          </a>
          <Link
            href="/analyze"
            className="rounded-full bg-[#5b52f0] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#4a41e0]"
          >
            Live Demo
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
