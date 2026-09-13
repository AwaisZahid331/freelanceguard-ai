type Step = {
  label: string;
  note: string;
  done: boolean;
};

type Props = {
  steps: Step[];
};

export default function AgentTimeline({ steps }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, i) => (
        <div key={i} className="flex items-start gap-3">
          <div
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
              step.done ? "bg-[#059669] text-white" : "bg-[#f0f1f6] text-[#9096a5]"
            }`}
          >
            {step.done ? "✓" : i + 1}
          </div>
          <div>
            <p className="text-sm font-semibold text-[#14161f]">{step.label}</p>
            <p className="text-xs text-[#6b7280]">{step.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
