import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { roomHasTag, UNIT_LABELS, type Room, type RoomTag } from "@/data/rooms"
import { DifficultyMeter } from "@/components/difficulty-meter"
import { AgeBadge, DualGameBadge, TopPlayedBadge } from "@/components/room-badges"
import { cn } from "@/lib/utils"

/** até 2 tags-atalho pequenas exibidas no card */
const DISPLAY_TAGS: RoomTag[] = ["Pra família", "Não assusta"]

function CardTag({ label }: { label: string }) {
  return (
    <span className="rounded-md bg-white/8 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-[var(--color-ash)]">
      {label}
    </span>
  )
}

export function RoomCard({
  room,
  highlightUnit,
  ctaLabel = "Reservar",
  ctaHref,
  compact = false,
}: {
  room: Room
  /** quando vem de sugestão "nunca-zero", destaca a unidade onde a sala existe */
  highlightUnit?: boolean
  /** texto do botão (ex.: "Ver sala" na vitrine de recomendações) */
  ctaLabel?: string
  /** se informado, o botão vira link p/ esta rota (ex.: página da sala) */
  ctaHref?: string
  /** versão enxuta (vitrine de recomendações no mobile): esconde tagline,
   *  tags e preço pra encurtar o card */
  compact?: boolean
}) {
  const tags = DISPLAY_TAGS.filter((t) => roomHasTag(room, t)).slice(0, 2)
  // pôster limpo (sem título) quando existir; senão o pôster atual
  const cardImage = room.posterClean || room.poster || "/placeholder.svg"
  const ctaClass =
    "mt-auto flex h-11 w-full items-center justify-center rounded-full bg-[var(--color-blood)] text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--color-blood-dark)]"

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-[var(--color-carbon)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)]">
      {/* Imagem do pôster — protagonista. Na vitrine compacta (mobile) fica mais
          baixa pra encurtar o card; no desktop volta ao 4/5 aprovado. */}
      <div
        className={cn(
          "relative overflow-hidden",
          compact ? "aspect-[16/11] sm:aspect-[4/5]" : "aspect-[4/5]",
        )}
      >
        <Image
          src={cardImage}
          alt={`Pôster da sala ${room.name}`}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 22vw"
          style={{ objectPosition: room.posterPosition ?? "top" }}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {/* gradiente sutil na base */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-void)] to-transparent" />
        {/* badges canto superior esquerdo */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          <AgeBadge age={room.age} />
          {room.dualGame && <DualGameBadge />}
          {room.topPlayed && <TopPlayedBadge />}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[19px] leading-none text-white">
            {room.name}
          </h3>
          <DifficultyMeter level={room.difficulty} className="mt-0.5 shrink-0" />
        </div>

        {/* compact (vitrine mobile): tagline/tags/preço somem só no mobile (<sm),
            no desktop o card segue completo e inalterado */}
        <p
          className={cn(
            "text-[11px] italic leading-snug text-[var(--color-ash)]",
            compact && "hidden sm:block",
          )}
        >
          {room.tagline}
          {room.dualGame && (
            <span className="mt-1 block text-[9px] not-italic">
              Você escolhe o caminho: vermelho ou azul
            </span>
          )}
        </p>

        {tags.length > 0 && (
          <div className={cn("flex flex-wrap gap-1", compact && "hidden sm:flex")}>
            {tags.map((t) => (
              <CardTag key={t} label={t} />
            ))}
          </div>
        )}

        <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ash)]/80">
          60min · {room.minPlayers}–{room.maxPlayers} Jogadores · {room.genre}
        </p>

        <div
          className={
            highlightUnit
              ? "flex items-start gap-1.5 rounded-md bg-[rgba(212,175,55,0.1)] px-2 py-1.5 text-[10px] font-semibold text-[var(--color-gold)]"
              : "flex items-start gap-1.5 text-[10px] text-[var(--color-ash)]"
          }
        >
          <MapPin
            className={
              highlightUnit
                ? "mt-px size-3 shrink-0 text-[var(--color-gold)]"
                : "mt-px size-3 shrink-0 text-[var(--color-gold)]"
            }
          />
          <span>{room.units.map((u) => UNIT_LABELS[u] ?? u).join(" · ")}</span>
        </div>

        <p
          className={cn(
            "text-[10px] text-[var(--color-ash)]",
            compact && "hidden sm:block",
          )}
        >
          a partir de{" "}
          <span className="font-semibold text-white">
            R$ {room.priceFrom.toFixed(2).replace(".", ",")}
          </span>{" "}
          por pessoa
        </p>

        {ctaHref ? (
          <Link href={ctaHref} className={ctaClass}>
            {ctaLabel}
          </Link>
        ) : (
          <button type="button" className={ctaClass}>
            {ctaLabel}
          </button>
        )}
      </div>
    </article>
  )
}
