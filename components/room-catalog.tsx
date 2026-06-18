"use client"

import { useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import {
  GENRES,
  HOME_SHOWCASE_ORDER,
  rooms,
  roomHasTag,
  TAGS,
  UNIT_LABELS,
  UNITS,
  type Room,
  type RoomGenre,
  type RoomTag,
} from "@/data/rooms"
import { Eyebrow, SectionTitle } from "@/components/section-heading"
import { RoomCard } from "@/components/room-card"
import { cn } from "@/lib/utils"

const SHOWCASE_LIMIT = 8

const PLAYER_OPTIONS = [
  { value: "all", label: "Nº de jogadores" },
  { value: "2", label: "2+ jogadores" },
  { value: "4", label: "4+ jogadores" },
  { value: "6", label: "6+ jogadores" },
]

/** aplica gênero + tags + jogadores (tudo exceto unidade) */
function matchesBase(
  room: Room,
  genres: RoomGenre[],
  tags: RoomTag[],
  players: string,
) {
  if (genres.length > 0 && !genres.includes(room.genre)) return false
  if (tags.length > 0 && !tags.every((t) => roomHasTag(room, t))) return false
  if (players !== "all" && room.maxPlayers < Number(players)) return false
  return true
}

export function RoomCatalog() {
  const [genres, setGenres] = useState<RoomGenre[]>([])
  const [tags, setTags] = useState<RoomTag[]>([])
  const [unit, setUnit] = useState<string>("all")
  const [players, setPlayers] = useState<string>("all")

  function toggleGenre(g: RoomGenre) {
    setGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    )
  }
  function toggleTag(t: RoomTag) {
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )
  }

  // Contadores: respeitam os demais filtros ativos, ignorando a própria dimensão
  const genreCounts = useMemo(() => {
    const map = new Map<RoomGenre, number>()
    for (const g of ["Aventura", "Investigação", "Suspense"] as RoomGenre[]) {
      map.set(
        g,
        rooms.filter(
          (r) =>
            r.genre === g &&
            matchesBase(r, [], tags, players) &&
            (unit === "all" || r.units.includes(unit)),
        ).length,
      )
    }
    return map
  }, [tags, players, unit])

  const tagCounts = useMemo(() => {
    const map = new Map<RoomTag, number>()
    for (const t of TAGS) {
      map.set(
        t,
        rooms.filter(
          (r) =>
            roomHasTag(r, t) &&
            matchesBase(r, genres, [], players) &&
            (unit === "all" || r.units.includes(unit)),
        ).length,
      )
    }
    return map
  }, [genres, players, unit])

  const unitCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const u of UNITS) {
      map.set(
        u,
        rooms.filter(
          (r) => r.units.includes(u) && matchesBase(r, genres, tags, players),
        ).length,
      )
    }
    return map
  }, [genres, tags, players])

  const result = useMemo(() => {
    const hasAnyFilter =
      genres.length > 0 || tags.length > 0 || unit !== "all" || players !== "all"

    // Vitrine curada quando nenhum filtro ativo
    if (!hasAnyFilter) {
      const ordered = HOME_SHOWCASE_ORDER.map((slug) =>
        rooms.find((r) => r.slug === slug),
      ).filter(Boolean) as Room[]
      return { primary: ordered.slice(0, SHOWCASE_LIMIT), suggestions: [] as Room[] }
    }

    const base = rooms.filter((r) => matchesBase(r, genres, tags, players))
    const primary =
      unit === "all" ? base : base.filter((r) => r.units.includes(unit))

    // Regra nunca-zero: se a unidade filtra tudo, sugerir as mesmas salas em outras unidades
    const suggestions =
      unit !== "all" && primary.length === 0
        ? base.filter((r) => !r.units.includes(unit))
        : []

    return { primary, suggestions }
  }, [genres, tags, unit, players])

  return (
    <section id="salas" className="bg-[var(--color-cream)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <Eyebrow>Escolha sua aventura</Eyebrow>
          <SectionTitle className="text-[var(--color-void)]">
            {"AS *SALAS* TE ESPERAM"}
          </SectionTitle>
        </div>

        {/* Filtros — linha 1: temas + dropdowns */}
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 no-scrollbar">
            {(GENRES.filter((g) => g !== "Todas") as RoomGenre[]).map((g) => {
              const active = genres.includes(g)
              return (
                <button
                  key={g}
                  type="button"
                  onClick={() => toggleGenre(g)}
                  aria-pressed={active}
                  className={cn(
                    "h-10 shrink-0 rounded-full px-4 text-[12px] font-bold uppercase tracking-[0.06em] transition-colors",
                    active
                      ? "bg-[var(--color-blood)] text-white"
                      : "bg-[var(--color-void)]/5 text-[var(--color-void)]/70 hover:bg-[var(--color-void)]/10",
                  )}
                >
                  {g}{" "}
                  <span className={active ? "text-white/70" : "text-[var(--color-void)]/40"}>
                    ({genreCounts.get(g) ?? 0})
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex gap-2">
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger className="h-10 w-[185px] rounded-full border-[var(--color-void)]/15 bg-white text-[12px] font-semibold text-[var(--color-void)]">
                <span className="truncate">
                  {unit === "all" ? "Todas as unidades" : UNIT_LABELS[unit] ?? unit}
                </span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as unidades</SelectItem>
                {UNITS.map((u) => (
                  <SelectItem key={u} value={u}>
                    {UNIT_LABELS[u] ?? u} ({unitCounts.get(u) ?? 0})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={players} onValueChange={setPlayers}>
              <SelectTrigger className="h-10 w-[160px] rounded-full border-[var(--color-void)]/15 bg-white text-[12px] font-semibold text-[var(--color-void)]">
                <span className="truncate">
                  {PLAYER_OPTIONS.find((p) => p.value === players)?.label}
                </span>
              </SelectTrigger>
              <SelectContent>
                {PLAYER_OPTIONS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Filtros — linha 2: tags-atalho */}
        <div className="-mx-1 mt-3 flex flex-wrap gap-2 px-1">
          {TAGS.map((t) => {
            const active = tags.includes(t)
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                aria-pressed={active}
                className={cn(
                  "h-8 rounded-full border px-3 text-[11px] font-semibold uppercase tracking-[0.04em] transition-colors",
                  active
                    ? "border-[var(--color-gold)] bg-[rgba(212,175,55,0.16)] text-[#7a5e10]"
                    : "border-[var(--color-void)]/15 text-[var(--color-void)]/55 hover:border-[var(--color-void)]/30",
                )}
              >
                {t}{" "}
                <span className="opacity-60">({tagCounts.get(t) ?? 0})</span>
              </button>
            )
          })}
        </div>

        {/* Grid de cards */}
        {result.primary.length > 0 ? (
          <div className="mt-10 flex gap-4 overflow-x-auto pb-4 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {result.primary.slice(0, SHOWCASE_LIMIT).map((room) => (
              <div
                key={room.slug}
                className="w-[78%] shrink-0 sm:w-auto"
              >
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        ) : result.suggestions.length > 0 ? (
          // Nunca-zero: mensagem honesta + sugestões de outras unidades
          <div className="mt-10">
            <p className="text-[14px] leading-relaxed text-[var(--color-void)]/70">
              Não temos essa combinação em{" "}
              <span className="font-bold text-[var(--color-void)]">
                {UNIT_LABELS[unit] ?? unit}
              </span>
              . Estas salas te esperam em outras unidades:
            </p>
            <div className="mt-6 flex gap-4 overflow-x-auto pb-4 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
              {result.suggestions.slice(0, SHOWCASE_LIMIT).map((room) => (
                <div key={room.slug} className="w-[78%] shrink-0 sm:w-auto">
                  <RoomCard room={room} highlightUnit />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-10 text-center text-[var(--color-void)]/60">
            Ajuste os filtros para ver mais aventuras.
          </p>
        )}

        {/* CTA ver todas */}
        <div className="mt-10 flex justify-center">
          <a
            href="#salas"
            className="flex h-12 items-center gap-2 rounded-full border-[1.5px] border-[var(--color-void)] px-6 text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--color-void)] transition-colors hover:bg-[var(--color-void)] hover:text-[var(--color-cream)]"
          >
            Ver todas as 16 salas
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
