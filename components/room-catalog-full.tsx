"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  GENRES,
  rooms,
  roomHasTag,
  TAGS,
  UNIT_LABELS,
  UNITS,
  type RoomGenre,
  type RoomTag,
} from "@/data/rooms"
import { matchesBase, roomsByGenreOrder } from "@/lib/room-filters"
import { Eyebrow, SectionTitle } from "@/components/section-heading"
import { RoomCardResponsive } from "@/components/room-card-responsive"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const PLAYER_OPTIONS = [
  { value: "all", label: "Nº de jogadores" },
  { value: "2", label: "2+ jogadores" },
  { value: "4", label: "4+ jogadores" },
  { value: "6", label: "6+ jogadores" },
]

export function RoomCatalogFull() {
  const router = useRouter()
  const params = useSearchParams()

  // Estado inicial vindo da URL (gênero/unidade/dificuldade); tags e jogadores só local
  const [genres, setGenres] = useState<RoomGenre[]>(
    () => (params.get("genero")?.split(",").filter(Boolean) ?? []) as RoomGenre[],
  )
  const [unit, setUnit] = useState<string>(() => params.get("unidade") ?? "all")
  const [difficulty] = useState<number | null>(() =>
    params.get("dificuldade") ? Number(params.get("dificuldade")) : null,
  )
  const [tags, setTags] = useState<RoomTag[]>([])
  const [players, setPlayers] = useState<string>("all")

  /** Reflete gênero/unidade/dificuldade na URL sem empilhar histórico nem rolar */
  function syncUrl(next: {
    genres?: RoomGenre[]
    unit?: string
    difficulty?: number | null
  }) {
    const g = next.genres ?? genres
    const u = next.unit ?? unit
    const d = next.difficulty ?? difficulty
    const sp = new URLSearchParams()
    if (g.length) sp.set("genero", g.join(","))
    if (u !== "all") sp.set("unidade", u)
    if (d != null) sp.set("dificuldade", String(d))
    const qs = sp.toString()
    router.replace(qs ? `/salas?${qs}` : "/salas", { scroll: false })
  }

  function toggleGenre(g: RoomGenre) {
    const nextGenres = genres.includes(g)
      ? genres.filter((x) => x !== g)
      : [...genres, g]
    setGenres(nextGenres)
    syncUrl({ genres: nextGenres })
  }
  function toggleTag(t: RoomTag) {
    setTags((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )
  }
  function changeUnit(u: string | null) {
    const next = u ?? "all"
    setUnit(next)
    syncUrl({ unit: next })
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
            matchesBase(r, [], tags, players, difficulty) &&
            (unit === "all" || r.units.includes(unit)),
        ).length,
      )
    }
    return map
  }, [tags, players, unit, difficulty])

  const tagCounts = useMemo(() => {
    const map = new Map<RoomTag, number>()
    for (const t of TAGS) {
      map.set(
        t,
        rooms.filter(
          (r) =>
            roomHasTag(r, t) &&
            matchesBase(r, genres, [], players, difficulty) &&
            (unit === "all" || r.units.includes(unit)),
        ).length,
      )
    }
    return map
  }, [genres, players, unit, difficulty])

  const unitCounts = useMemo(() => {
    const map = new Map<string, number>()
    for (const u of UNITS) {
      map.set(
        u,
        rooms.filter(
          (r) =>
            r.units.includes(u) &&
            matchesBase(r, genres, tags, players, difficulty),
        ).length,
      )
    }
    return map
  }, [genres, tags, players, difficulty])

  const result = useMemo(() => {
    const base = roomsByGenreOrder().filter((r) =>
      matchesBase(r, genres, tags, players, difficulty),
    )
    const primary =
      unit === "all" ? base : base.filter((r) => r.units.includes(unit))

    // Nunca-zero: se a unidade filtra tudo, sugerir as mesmas salas em outras unidades
    const suggestions =
      unit !== "all" && primary.length === 0
        ? base.filter((r) => !r.units.includes(unit))
        : []

    return { primary, suggestions }
  }, [genres, tags, unit, players, difficulty])

  return (
    <section className="bg-[var(--color-cream)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <Eyebrow>Catálogo completo</Eyebrow>
          <SectionTitle className="text-[var(--color-void)]">
            {"TODAS AS *16 SALAS*"}
          </SectionTitle>
        </div>

        {/* Filtros — linha 1: gêneros + dropdowns */}
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
                  <span
                    className={
                      active ? "text-white/70" : "text-[var(--color-void)]/40"
                    }
                  >
                    ({genreCounts.get(g) ?? 0})
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex gap-2">
            <Select value={unit} onValueChange={changeUnit}>
              <SelectTrigger className="h-10 w-[185px] rounded-full border-[var(--color-void)]/15 bg-white text-[12px] font-semibold text-[var(--color-void)]">
                <span className="truncate">
                  {unit === "all"
                    ? "Todas as unidades"
                    : UNIT_LABELS[unit] ?? unit}
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

            <Select value={players} onValueChange={(v) => setPlayers(v ?? "all")}>
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
                {t} <span className="opacity-60">({tagCounts.get(t) ?? 0})</span>
              </button>
            )
          })}
        </div>

        {/* Grid de cards — todas as salas, 2 col desde a base */}
        {result.primary.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {result.primary.map((room) => (
              <RoomCardResponsive key={room.slug} room={room} />
            ))}
          </div>
        ) : result.suggestions.length > 0 ? (
          <div className="mt-10">
            <p className="text-[14px] leading-relaxed text-[var(--color-void)]/70">
              Não temos essa combinação em{" "}
              <span className="font-bold text-[var(--color-void)]">
                {UNIT_LABELS[unit] ?? unit}
              </span>
              . Estas salas te esperam em outras unidades:
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {result.suggestions.map((room) => (
                <RoomCardResponsive key={room.slug} room={room} highlightUnit />
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-10 text-center text-[var(--color-void)]/60">
            Ajuste os filtros para ver mais aventuras.
          </p>
        )}
      </div>
    </section>
  )
}
