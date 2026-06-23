"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Room } from "@/data/rooms"
import { RoomCard } from "@/components/room-card"

/**
 * Vitrine horizontal de salas recomendadas ("Você Também Pode Curtir").
 * Scroll horizontal com snap (toque no mobile, setas no desktop). O overflow
 * fica SÓ neste container — a página não ganha scroll horizontal. Cada card usa
 * o RoomCard padrão com botão "VER SALA" levando à página da sala.
 */
export function RelatedRoomsCarousel({ rooms }: { rooms: Room[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateArrows = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateArrows()
    window.addEventListener("resize", updateArrows)
    return () => window.removeEventListener("resize", updateArrows)
  }, [updateArrows])

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-card]")
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * amount, behavior: "smooth" })
  }

  const arrowBase =
    "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[rgba(10,10,12,0.8)] text-white backdrop-blur-sm transition disabled:pointer-events-none disabled:opacity-0 hover:bg-[rgba(10,10,12,0.95)] sm:flex"

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Salas anteriores"
        onClick={() => scrollByCard(-1)}
        disabled={!canPrev}
        className={`${arrowBase} -left-3`}
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Próximas salas"
        onClick={() => scrollByCard(1)}
        disabled={!canNext}
        className={`${arrowBase} -right-3`}
      >
        <ChevronRight className="size-5" />
      </button>

      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {rooms.map((room) => (
          <div
            key={room.slug}
            data-card
            className="w-[82%] shrink-0 snap-start sm:w-[300px] lg:w-[31%] xl:w-[23.5%]"
          >
            <RoomCard
              room={room}
              ctaLabel="Ver sala"
              ctaHref={`/salas/${room.slug}`}
              compact
            />
          </div>
        ))}
      </div>
    </div>
  )
}
