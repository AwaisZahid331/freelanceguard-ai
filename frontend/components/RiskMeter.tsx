"use client";

type Props = {
  score: number;
  level: string;
};

const levelStyle: Record<string, { ring: string; text: string; bg: string }> = {
  LOW: { ring: "#059669", text: "#059669", bg: "#ecfdf5" },
  MEDIUM: { ring: "#d97706", text: "#b45309", bg: "#fffbeb" },
  HIGH: { ring: "#ea580c", text: "#c2410c", bg: "#fff7ed" },
  CRITICAL: { ring: "#dc2626", text: "#dc2626", bg: "#fef2f2" },
};

export default function RiskMeter({ score, level }: Props) {
  const style = levelStyle[level] ?? { ring: "#5b52f0", text: "#5b52f0", bg: "#efeeff" };
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-40 w-40">
        <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#f0f1f6" strokeWidth="10" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={style.ring}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: style.text }}>
            {score}
          </span>
          <span className="text-xs text-[#9096a5]">/ 100</span>
        </div>
      </div>
      <span
        className="rounded-full px-4 py-1 text-sm font-semibold tracking-wide"
        style={{ backgroundColor: style.bg, color: style.text }}
      >
        {level} RISK
      </span>
    </div>
  );
}
