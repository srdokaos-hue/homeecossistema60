"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type TouchEvent } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Crown,
  HelpCircle,
  Lock,
  MapPin,
  Share2,
  Trophy,
} from "lucide-react"
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

/* ---------------------------------------------------------------------------
   MOBILE — cover-flow (apenas < sm). Estado próprio, isolado do desktop.
--------------------------------------------------------------------------- */

function shareRecord(record: RecordEntry) {
  if (typeof navigator === "undefined" || !navigator.share) return
  const text = record.team
    ? `${record.team} é recorde em ${record.room}: ${record.time}. Bora superar?`
    : `${record.room} ainda não tem recorde este mês. Seja a primeira equipe!`
  navigator.share({ title: "Kings of the Escape · 60 Minutos", text }).catch(() => {})
}

/** Card central do cover-flow (campeã em destaque). Vizinhos usam só a foto. */
function MobileCard({
  record,
  photo,
  active,
}: {
  record: RecordEntry
  photo: string
  active: boolean
}) {
  const poster = ROOM_POSTERS[record.room] ?? "/placeholder.svg"
  const isEmpty = !record.team

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden rounded-[18px] border bg-[#0b0b0d] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)]",
        isEmpty
          ? "border-dashed border-[rgba(212,175,55,0.55)]"
          : "border-[rgba(212,175,55,0.28)]",
      )}
    >
      <Image
        src={isEmpty ? poster : photo}
        alt={isEmpty ? `Sala ${record.room}` : `Equipe ${record.team}`}
        fill
        sizes="78vw"
        className={cn(
          "object-cover object-top",
          isEmpty && "brightness-[0.35] grayscale-[0.4]",
        )}
      />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[var(--color-void)] via-[var(--color-void)]/70 to-transparent" />

      {/* Conteúdo rico só no card ativo (vizinhos ficam desfocados) */}
      {active && !isEmpty && (
        <>
          {/* Bandeira de posição */}
          <div className="absolute left-0 top-5 z-10 flex items-center gap-1 rounded-r-full bg-[var(--color-gold)] py-1 pl-3 pr-4 shadow-[0_6px_16px_-4px_rgba(212,175,55,0.6)]">
            <Crown className="size-3.5 text-[var(--color-gold-ink)]" />
            <span className="font-display text-[15px] leading-none text-[var(--color-gold-ink)]">
              1º
            </span>
          </div>

          {/* Compartilhar */}
          <button
            type="button"
            onClick={() => shareRecord(record)}
            aria-label="Compartilhar recorde"
            className="absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] bg-[var(--color-void)]/60 text-[var(--color-gold)] backdrop-blur transition-colors hover:bg-[rgba(212,175,55,0.15)]"
          >
            <Share2 className="size-4" />
          </button>

          {/* Bloco inferior */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-5">
            <span className="mb-1 flex w-fit items-center gap-1.5 rounded-full bg-[rgba(212,175,55,0.15)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-gold)]">
              <Crown className="size-3" /> Campeãs do mês
            </span>
            <span className="w-fit -rotate-1 bg-[var(--color-gold)] px-2 py-0.5 font-display text-[22px] leading-tight text-[var(--color-gold-ink)]">
              {record.team}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ash)]">
              <Lock className="size-3.5 text-[var(--color-gold)]" /> {record.room}
            </span>
            <div className="mt-1 flex items-end gap-2">
              <span className="pb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-ash)]">
                Tempo
              </span>
              <span className="flex items-center gap-1.5 font-display text-[40px] leading-none text-white">
                <Clock className="size-6 text-[var(--color-gold)]" />
                {record.time}
              </span>
            </div>
          </div>
        </>
      )}

      {/* Card vazio em destaque: ninguém conquistou a coroa */}
      {active && isEmpty && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="flex size-16 items-center justify-center rounded-full border-2 border-[rgba(212,175,55,0.55)] bg-[var(--color-void)]/70 shadow-[0_0_24px_-4px_rgba(212,175,55,0.5)]">
            <HelpCircle className="size-8 text-[var(--color-gold)]" />
          </span>
          <span className="font-display text-[20px] leading-tight text-[var(--color-cream)] text-balance">
            Ninguém conquistou a coroa este mês
          </span>
          <span className="text-[13px] leading-snug text-[var(--color-ash)] text-balance">
            Seja a primeira equipe desta sala.
          </span>
          <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--color-gold)]">
            {record.room}
          </span>
          <a
            href="#salas"
            className="mt-1 flex h-11 items-center gap-2 rounded-full bg-[var(--color-blood)] px-6 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--color-blood-dark)]"
          >
            Reservar
            <ArrowRight className="size-4" />
          </a>
        </div>
      )}
    </div>
  )
}

function KingsMobile() {
  const [storeIndex, setStoreIndex] = useState(0)
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)

  const store = STORES[storeIndex]
  const records = store.records
  const count = records.length

  function selectStore(i: number) {
    setStoreIndex(i)
    setActive(0)
    setOpen(false)
  }

  function go(dir: number) {
    setActive((a) => Math.min(Math.max(a + dir, 0), count - 1))
  }

  function onTouchStart(e: TouchEvent) {
    touchX.current = e.touches[0].clientX
    touchY.current = e.touches[0].clientY
  }

  function onTouchEnd(e: TouchEvent) {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    const dy = e.changedTouches[0].clientY - (touchY.current ?? 0)
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1)
    }
    touchX.current = null
    touchY.current = null
  }

  return (
    <div className="sm:hidden">
      {/* Dropdown de loja */}
      <div className="relative mx-auto mt-7 w-fit">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.4)] bg-[var(--color-void)]/60 px-5 py-2.5 backdrop-blur transition-colors hover:bg-[rgba(212,175,55,0.08)]"
        >
          <MapPin className="size-4 text-[var(--color-gold)]" />
          <span className="font-display text-[18px] uppercase tracking-wide text-[var(--color-cream)]">
            {store.name}
          </span>
          <ChevronDown
            className={cn(
              "size-4 text-[var(--color-gold)] transition-transform",
              open && "rotate-180",
            )}
          />
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <ul
              role="listbox"
              className="absolute left-1/2 top-full z-50 mt-2 w-60 -translate-x-1/2 overflow-hidden rounded-2xl border border-[rgba(212,175,55,0.25)] bg-[var(--color-carbon)] shadow-[0_24px_60px_-18px_rgba(0,0,0,0.85)]"
            >
              {STORES.map((s, i) => (
                <li key={s.name} role="option" aria-selected={i === storeIndex}>
                  <button
                    type="button"
                    onClick={() => selectStore(i)}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-3 text-left text-[14px] font-semibold uppercase tracking-[0.06em] transition-colors",
                      i === storeIndex
                        ? "bg-[rgba(212,175,55,0.12)] text-[var(--color-gold)]"
                        : "text-[var(--color-cream)] hover:bg-[rgba(212,175,55,0.06)]",
                    )}
                  >
                    {s.name}
                    {i === storeIndex && <Check className="size-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <p className="mt-2 text-center text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ash)]">
        Campeãs de {MONTH_LABEL}
      </p>

      {/* Cover-flow */}
      <div
        className="relative mt-6 h-[430px] w-full overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {records.map((record, i) => {
          const offset = i - active
          const abs = Math.abs(offset)
          const visible = abs <= 1
          const scale = offset === 0 ? 1 : 0.8
          return (
            <div
              key={`${record.room}-${i}`}
              onClick={() => offset !== 0 && setActive(i)}
              aria-hidden={!visible}
              className={cn(
                "absolute left-1/2 top-1/2 w-[74vw] max-w-[310px] transition-[transform,opacity] duration-300 ease-out",
                offset !== 0 && "cursor-pointer blur-[1.5px] brightness-[0.5]",
                !visible && "pointer-events-none",
              )}
              style={{
                zIndex: 20 - abs,
                opacity: visible ? 1 : 0,
                transform: `translate(-50%, -50%) translateX(${offset * 60}%) scale(${scale})`,
              }}
            >
              <MobileCard
                record={record}
                photo={TEAM_PHOTOS[i % TEAM_PHOTOS.length]}
                active={offset === 0}
              />
            </div>
          )
        })}

        {/* Setas circulares douradas */}
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={active === 0}
          aria-label="Recorde anterior"
          className="absolute left-1 top-1/2 z-40 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(212,175,55,0.4)] bg-[var(--color-void)]/70 text-[var(--color-gold)] backdrop-blur transition-opacity disabled:opacity-30"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={active === count - 1}
          aria-label="Próximo recorde"
          className="absolute right-1 top-1/2 z-40 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(212,175,55,0.4)] bg-[var(--color-void)]/70 text-[var(--color-gold)] backdrop-blur transition-opacity disabled:opacity-30"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Dots de paginação (barra alongada marca posição) */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {records.map((record, i) => (
          <button
            key={`${record.room}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver recorde ${i + 1} de ${count}`}
            aria-current={i === active}
            className={cn(
              "h-2 rounded-full transition-all",
              i === active
                ? "w-6 bg-[var(--color-gold)]"
                : "w-2 bg-[rgba(212,175,55,0.3)]",
            )}
          />
        ))}
      </div>

      {/* A coroa pode ser sua */}
      <a
        href="#salas"
        className="mx-auto mt-8 flex w-full max-w-[340px] items-center gap-3 rounded-2xl border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.06)] px-4 py-4 transition-colors hover:bg-[rgba(212,175,55,0.1)]"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[rgba(212,175,55,0.15)] text-[var(--color-gold)]">
          <Trophy className="size-5" />
        </span>
        <span className="flex-1">
          <span className="block font-display text-[16px] leading-tight text-[var(--color-cream)]">
            A COROA PODE SER SUA
          </span>
          <span className="mt-0.5 block text-[12px] leading-snug text-[var(--color-ash)]">
            Reserve sua sala e dispute o topo do ranking.
          </span>
        </span>
        <ChevronRight className="size-5 shrink-0 text-[var(--color-gold)]" />
      </a>
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

        {/* Legenda: loja atual + mês de referência (desktop/tablet) */}
        <div className="mt-8 hidden items-center justify-center gap-3 sm:flex">
          <p className="text-center text-[14px] font-bold uppercase tracking-[0.08em] text-[var(--color-cream)]">
            {store.name}
            <span className="px-1.5 text-[var(--color-gold)]">·</span>
            <span className="text-[var(--color-ash)]">{MONTH_LABEL}</span>
          </p>
        </div>

        {/* Indicadores de loja (desktop/tablet) */}
        <div className="mt-5 hidden items-center justify-center gap-2 sm:flex">
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

        {/* Mobile: cover-flow (loja via dropdown, recordes em carrossel) */}
        <KingsMobile />

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
