export default function GlowBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute left-[-10%] top-[-15%] h-[500px] w-[500px] animate-[float1_20s_ease-in-out_infinite] rounded-full bg-[#5b52f0] opacity-[0.06] blur-[120px]" />
      <div className="absolute right-[-12%] top-[10%] h-[550px] w-[550px] animate-[float2_24s_ease-in-out_infinite] rounded-full bg-[#059669] opacity-[0.05] blur-[130px]" />
      <div className="absolute bottom-[-15%] left-[15%] h-[450px] w-[450px] animate-[float1_22s_ease-in-out_infinite_reverse] rounded-full bg-[#f59e0b] opacity-[0.05] blur-[130px]" />
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 60px) scale(1.1); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, 40px) scale(1.15); }
        }
      `}</style>
    </div>
  );
}
