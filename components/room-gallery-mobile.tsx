"use client"

import { useRef, useState } from "react"

/**
 * Galeria do ambiente no MOBILE: carrossel horizontal com scroll-snap + dots.
 * Placeholder até as fotos reais (mesmo critério da grade desktop). O dot ativo
 * acompanha o scroll. Some no desktop (lá vale a grade 4 colunas).
 * Sem animação automática → nada a fazer por prefers-reduced-motion.
 */
export function RoomGalleryMobile({ count = 4 }: { count?: number }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  function onScroll() {
    const el = trackRef.current
    if (!el) return
    const i = Math.round(el.scrollLeft / el.clientWidth)
    if (i !== active) setActive(i)
  }

  return (
    <div className="lg:hidden">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex aspect-[4/3] w-full shrink-0 snap-center items-center justify-center rounded-lg border border-dashed border-[var(--color-blood)]/40 bg-white/[0.02] text-[var(--color-ash)]/40"
            aria-hidden="true"
          >
            <span className="text-[11px] uppercase tracking-wide">Foto {i + 1}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex justify-center gap-1.5" aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i === active
                ? "w-5 bg-[var(--color-gold)]"
                : "w-1.5 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
