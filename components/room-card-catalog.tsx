import Image from "next/image"
import Link from "next/link"
import { MapPin, Users } from "lucide-react"
import { UNIT_LABELS, type Room } from "@/data/rooms"
import { DifficultyMeter } from "@/components/difficulty-meter"
import { AgeBadge, DualGameBadge, TopPlayedBadge } from "@/components/room-badges"

/**
 * Card enxuto do catálogo: pôster protagonista, 4 cantos sobre a arte,
 * faixa só com a unidade. Card inteiro é link p/ a página da sala.
 * Usado no MOBILE da home e da /salas (ver room-card-responsive).
 */
export function RoomCardCatalog({
  room,
  highlightUnit,
}: {
  room: Room
  /** quando vem de sugestão "nunca-zero", destaca a unidade onde a sala existe */
  highlightUnit?: boolean
}) {
  return (
    <Link
      href={`/salas/${room.slug}`}
      aria-label={room.name}
      className="group block h-full"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-[14px] bg-[var(--color-carbon)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)]">
        {/* Pôster + cantos */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={room.poster || "/placeholder.svg"}
            alt=""
            fill
            sizes="(max-width: 640px) 50vw, 24vw"
            style={{ objectPosition: room.posterPosition ?? "top" }}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-void)] to-transparent" />

          {/* ↖ idade */}
          <div className="absolute left-2.5 top-2.5">
            <AgeBadge age={room.age} />
          </div>

          {/* ↗ jogadores */}
          <div className="absolute right-2.5 top-2.5">
            <span className="flex items-center gap-1 rounded-full bg-[rgba(10,10,10,0.7)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm">
              <Users className="size-3" />
              {room.minPlayers}–{room.maxPlayers}
            </span>
          </div>

          {/* ↙ selo especial + gênero */}
          <div className="absolute bottom-2.5 left-2.5 flex flex-col items-start gap-1.5">
            {room.topPlayed && <TopPlayedBadge />}
            {room.dualGame && <DualGameBadge />}
            <span className="rounded-full bg-[rgba(10,10,10,0.7)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm">
              {room.genre}
            </span>
          </div>

          {/* ↘ dificuldade */}
          <div className="absolute bottom-2.5 right-2.5 rounded-full bg-[rgba(10,10,10,0.7)] px-2 py-1 backdrop-blur-sm">
            <DifficultyMeter level={room.difficulty} />
          </div>
        </div>

        {/* Faixa inferior: só unidade */}
        <div
          className={
            highlightUnit
              ? "flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-semibold text-[var(--color-gold)]"
              : "flex items-center gap-1.5 px-3 py-2.5 text-[10px] text-[var(--color-ash)]"
          }
        >
          <MapPin className="size-3 shrink-0 text-[var(--color-gold)]" />
          <span className="truncate">
            {room.units.map((u) => UNIT_LABELS[u] ?? u).join(" · ")}
          </span>
        </div>
      </article>
    </Link>
  )
}
