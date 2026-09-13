type Props = {
  flag: string;
};

export default function FlagCard({ flag }: Props) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#fecaca] bg-[#fef2f2] p-3">
      <span className="mt-0.5 text-[#dc2626]">⚠</span>
      <p className="text-sm text-[#14161f]">{flag}</p>
    </div>
  );
}
