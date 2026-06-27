"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Crown, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Eyebrow, SectionTitle } from "@/components/section-heading"

const MONTH_LABEL = "Junho/2026"

/** mapeia nome da sala -> pôster (para os cards neutros sem recordista) */
const ROOM_POSTERS: Record<string, string> = {
  "Hora Zero": "/posters/hora-zero.png",
  "Pandemia K-13": "/posters/pandemia-k13.png",
  "Projeto Chronnos": "/posters/projeto-chronnos.png",
  "A Casa do Will": "/posters/casa-do-will.png",
  "Devorador de Mentes": "/posters/devorador-mentes.png",
  Cativeiro: "/posters/cativeiro.png",
  "Santo Graal": "/posters/santo-graal.png",
  "Orbe Mágico": "/posters/orbe-magico.png",
  "Anel do Poder": "/posters/anel-do-poder.png",
  "Scape Wars": "/posters/scape-wars.png",
  Matadouro: "/posters/matadouro.png",
  FNAF: "/posters/fnaf.png",
  "Ameaça Zumbi": "/posters/ameaca-zumbi.png",
  "Ilha dos Piratas": "/posters/ilha-dos-piratas.png",
  "Museu dos Mistérios": "/posters/museu-misterios.png",
  "Escape Story": "/posters/escape-story.png",
}

const TEAM_PHOTOS = ["/kings/team-1.png", "/kings/team-2.png", "/kings/team-3.png"]

interface RecordEntry {
  room: string
  team: string | null
  time: string | null
}

interface Store {
  name: string
  records: RecordEntry[]
}

const STORES: Store[] = [
  {
    name: "Píer 21",
    records: [
      { room: "Hora Zero", team: "Os Federais", time: "28:14" },
      { room: "Pandemia K-13", team: "Antídoto Final", time: "31:40" },
      { room: "Projeto Chronnos", team: "Paradoxo Zero", time: "39:02" },
      { room: "A Casa do Will", team: "Clube da Bicicleta", time: "26:55" },
      { room: "Devorador de Mentes", team: "Mente Coletiva", time: "36:13" },
      { room: "Cativeiro", team: "N.S. Lágrimas", time: "34:58" },
      { room: "Santo Graal", team: null, time: null },
    ],
  },
  {
    name: "ParkShopping",
    records: [
      { room: "Orbe Mágico", team: "Filhos de Merlin", time: "27:48" },
      { room: "Anel do Poder", team: "A Sociedade", time: "33:21" },
      { room: "Scape Wars", team: "Rebeldes BSB", time: "30:10" },
      { room: "Matadouro", team: "Sobreviventes 13", time: "22:45" },
      { room: "FNAF", team: "Última Noite", time: "19:58" },
      { room: "Ameaça Zumbi", team: "Os Imunes", time: "24:32" },
      { room: "Ilha dos Piratas", team: "Os Fugitivos", time: "38:00" },
    ],
  },
  {
    name: "Taguatinga",
    records: [
      { room: "Museu dos Mistérios", team: "Scooby Gang BSB", time: "35:17" },
      { room: "Escape Story", team: "Heróis de Lata", time: "40:05" },
    ],
  },
  {
    name: "Santa Úrsula",
    records: [
      { room: "Ilha dos Piratas", team: "Piratas do Norte", time: "37:22" },
      { room: "Orbe Mágico", team: "Bruxos de RP", time: "29:50" },
      { room: "Santo Graal", team: "A Última Cruzada", time: "31:15" },
      { room: "Hora Zero", team: "Unidade Tática", time: "27:30" },
      { room: "Cativeiro", team: "Os Resistentes", time: "33:40" },
      { room: "FNAF", team: null, time: null },
    ],
  },
]

function RecordCard({
  record,
  photo,
}: {
  record: RecordEntry
  photo: string
}) {
  const poster = ROOM_POSTERS[record.room] ?? "/placeholder.svg"
  const isEmpty = !record.team

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[16px] border bg-[#0b0b0d] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)]",
        isEmpty
          ? "border-dashed border-[rgba(212,175,55,0.55)] shadow-[0_0_34px_-6px_rgba(212,175,55,0.35)]"
          : "border-[rgba(212,175,55,0.2)]",
      )}
    >
      {!isEmpty && (
        <Crown className="absolute right-3 top-3 z-10 size-6 text-[var(--color-gold)] drop-shadow" />
      )}

      <div className="relative aspect-[4/5]">
        <Image
          src={isEmpty ? poster : photo}
          alt={isEmpty ? `Sala ${record.room}` : `Equipe ${record.team}`}
          fill
          sizes="(max-width: 1024px) 70vw, 22vw"
          className={cn("object-cover object-top", isEmpty && "brightness-[0.3] grayscale-[0.5]")}
        />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--color-void)] via-[var(--color-void)]/70 to-transparent" />

        {isEmpty ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-5 text-center">
            <span className="flex size-16 items-center justify-center rounded-full border-2 border-[rgba(212,175,55,0.55)] bg-[var(--color-void)]/70 shadow-[0_0_24px_-4px_rgba(212,175,55,0.5)]">
              <HelpCircle className="size-8 text-[var(--color-gold)]" />
            </span>
            <span className="text-[13px] font-semibold leading-snug text-[var(--color-cream)] text-balance">
              Ainda sem recordista este mês. Seja o primeiro a entrar no ranking.
            </span>
            <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-gold)]">
              {record.room}
            </span>
          </div>
        ) : (
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5">
            <span className="w-fit -rotate-1 bg-[var(--color-gold)] px-2 py-0.5 font-display text-[17px] leading-tight text-[#3a2e08]">
              {record.team}
            </span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ash)]">
              {record.room}
            </span>
            <span className="flex items-center gap-1.5 font-display text-[40px] leading-none text-white">
              <Clock className="size-6 text-[var(--color-gold)]" />
              {record.time}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function KingsOfEscape() {
  const [storeIndex, setStoreIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const store = STORES[storeIndex]
  const count = store.records.length

  // autoplay: troca a cada 6s, pausado durante interação manual
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setStoreIndex((i) => (i + 1) % STORES.length)
    }, 6000)
    return () => clearInterval(id)
  }, [paused])

  useEffect(() => {
    return () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current)
    }
  }, [])

  // reseta o hover ao trocar de loja
  useEffect(() => {
    setHovered(null)
  }, [storeIndex])

  function go(dir: number) {
    setStoreIndex((i) => (i + dir + STORES.length) % STORES.length)
    setPaused(true)
    if (pauseTimer.current) clearTimeout(pauseTimer.current)
    pauseTimer.current = setTimeout(() => setPaused(false), 10000)
  }

  const center = (count - 1) / 2
  const step = count > 5 ? 132 : count > 2 ? 168 : 140

  return (
    <section
      id="ranking"
      className="border-t border-[rgba(212,175,55,0.2)] bg-[var(--color-carbon)] py-12 md:py-16"
    >
      {/* âncora de navegação (bottom nav mobile "Recordes") */}
      <span id="kings" aria-hidden="true" className="block scroll-mt-24" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Texto centralizado */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Eyebrow center>Ranking mensal</Eyebrow>
          <SectionTitle>{"KINGS OF THE *ESCAPE*"}</SectionTitle>
          <p className="max-w-md text-[14px] leading-relaxed text-[var(--color-ash)]">
            As equipes mais rápidas do mês ganham a coroa. O ranking reseta todo
            mês. A disputa nunca para.
          </p>
        </div>

        {/* Leque (fan spread) — uma loja por vez, desktop/tablet.
            As setas ficam fixas em relação a este container (largura constante),
            independente de quantos cards o leque atual tiver. */}
        <div className="relative mx-auto mt-6 hidden min-h-[320px] w-full max-w-5xl items-center justify-center sm:flex">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Loja anterior"
            className="absolute left-0 top-1/2 z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] bg-[var(--color-carbon)]/80 text-[var(--color-gold)] backdrop-blur transition-colors hover:bg-[rgba(212,175,55,0.1)]"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div key={storeIndex} className="fan-in relative h-[320px] w-full">
            {store.records.map((record, i) => {
              const offset = i - center
              const isHovered = hovered === i
              const rotate = isHovered ? 0 : offset * 4.5
              const dip = isHovered ? -12 : Math.abs(offset) * 12
              const scale = isHovered ? 1.12 : Math.abs(offset) < 0.5 ? 1.06 : 1
              const zIndex = isHovered ? 50 : Math.round(20 - Math.abs(offset))
              return (
                <div
                  key={`${record.room}-${i}`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                  className="absolute left-1/2 top-1/2 w-[180px] cursor-pointer transition-transform duration-300 ease-out"
                  style={{
                    zIndex,
                    transform: `translate(-50%, -50%) translateX(${offset * step}px) translateY(${dip}px) rotate(${rotate}deg) scale(${scale})`,
                  }}
                >
                  <RecordCard record={record} photo={TEAM_PHOTOS[i % TEAM_PHOTOS.length]} />
                </div>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima loja"
            className="absolute right-0 top-1/2 z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] bg-[var(--color-carbon)]/80 text-[var(--color-gold)] backdrop-blur transition-colors hover:bg-[rgba(212,175,55,0.1)]"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Legenda: loja atual + mês de referência */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Loja anterior"
            className="flex size-9 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] text-[var(--color-gold)] transition-colors hover:bg-[rgba(212,175,55,0.1)] sm:hidden"
          >
            <ChevronLeft className="size-4" />
          </button>
          <p className="text-center text-[14px] font-bold uppercase tracking-[0.08em] text-[var(--color-cream)]">
            {store.name}
            <span className="px-1.5 text-[var(--color-gold)]">·</span>
            <span className="text-[var(--color-ash)]">{MONTH_LABEL}</span>
          </p>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Próxima loja"
            className="flex size-9 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] text-[var(--color-gold)] transition-colors hover:bg-[rgba(212,175,55,0.1)] sm:hidden"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        {/* Indicadores de loja */}
        <div className="mt-5 flex items-center justify-center gap-2">
          {STORES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              onClick={() => go(i - storeIndex)}
              aria-label={`Ver ${s.name}`}
              aria-current={i === storeIndex}
              className={cn(
                "h-2 rounded-full transition-all",
                i === storeIndex
                  ? "w-6 bg-[var(--color-gold)]"
                  : "w-2 bg-[rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.6)]",
              )}
            />
          ))}
        </div>

        {/* Mobile: empilhado */}
        <div key={`m-${storeIndex}`} className="fan-in mt-8 grid grid-cols-1 gap-4 sm:hidden">
          {store.records.map((record, i) => (
            <RecordCard
              key={`${record.room}-${i}`}
              record={record}
              photo={TEAM_PHOTOS[i % TEAM_PHOTOS.length]}
            />
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <a
            href="#"
            className="flex h-12 w-fit items-center gap-2 rounded-full bg-[var(--color-blood)] px-6 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--color-blood-dark)]"
          >
            Ver ranking completo
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#salas"
            className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--color-gold)] transition-colors hover:text-white"
          >
            Quer seu nome aqui? Reserve sua sala
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
