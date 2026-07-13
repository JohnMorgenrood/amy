export function WatermarkOverlay({ compact = false }: { compact?: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 select-none overflow-hidden">
      <div className="absolute inset-[-25%] grid rotate-[-24deg] grid-cols-2 content-around gap-x-8 opacity-[0.16]">
        {Array.from({ length: compact ? 6 : 10 }).map((_, index) => (
          <span key={index} className="whitespace-nowrap text-center text-[9px] font-medium uppercase tracking-[0.24em] text-white drop-shadow-sm sm:text-[11px]">
            AMY MUP · AMYMUP.SHOP
          </span>
        ))}
      </div>
      <div className="absolute bottom-3 right-3 border border-white/20 bg-black/35 px-2.5 py-1 text-[8px] uppercase tracking-[0.2em] text-white/75 backdrop-blur-sm">
        © Amy Morgenrood
      </div>
    </div>
  )
}
