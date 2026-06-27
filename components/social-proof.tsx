"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { Maximize, Pause, Play, Star, Volume2, VolumeX } from "lucide-react"
import { Eyebrow, SectionTitle } from "@/components/section-heading"
import { LazyVideo, type LazyVideoHandle } from "@/components/lazy-video"
import { cn } from "@/lib/utils"

const TESTIMONIALS = [
  {
    quote:
      "Meu filho largou o celular por uma hora inteira. Saímos de lá conversando sobre a sala o caminho todo.",
    name: "Marcelo A.",
    detail: "A Casa do Will — Píer 21",
  },
  {
    quote:
      "Eu e minha filha nos reconectamos ali dentro. Melhor presente que já dei pra ela.",
    name: "Patrícia R.",
    detail: "Museu dos Mistérios — Taguatinga",
  },
  {
    quote:
      "Fizemos o team building da empresa aqui. Você descobre mais sobre sua equipe em 60 minutos do que em meses de reunião.",
    name: "Carolina V.",
    detail: "Operação Hora Zero — ParkShopping",
  },
]

const NUMBERS = [
  { value: "114K+", label: "Jogadores" },
  { value: "4.8★", label: "No Google" },
  { value: "10 Anos", label: "De História" },
]

// poster carrega de cara; o vídeo (a ser fornecido pelo Erickson) só baixa no play
const VIDEO_POSTER = "/social/gameplay-banner.png"
const VIDEO_SRC = "/social/depoimentos.mp4"

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 de 5 estrelas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="size-3.5 fill-[var(--color-gold)] text-[var(--color-gold)]"
        />
      ))}
    </div>
  )
}

/* ===== MOBILE (<lg): faixa de stats + depoimentos com vídeo (2 estados) ===== */

function StatsStrip() {
  // Part C: fluxo normal, sem position absolute (era o que colidia com o card).
  return (
    <div className="border-t border-[rgba(212,175,55,0.12)] bg-[var(--color-carbon)] px-4 pt-8 lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 overflow-hidden rounded-[14px] border border-[rgba(212,175,55,0.14)]">
        {NUMBERS.map((n, i) => (
          <div
            key={n.label}
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-5",
              i > 0 && "border-l border-[rgba(212,175,55,0.14)]",
            )}
          >
            <span className="font-display text-[26px] leading-none text-[var(--color-gold)]">
              {n.value}
            </span>
            <span className="text-center text-[9.5px] font-bold uppercase tracking-[0.1em] text-[var(--color-ash)]">
              {n.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = () => {
    const el = trackRef.current
    if (!el) return
    setActive(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {TESTIMONIALS.map((t) => (
          <figure
            key={t.name}
            className="w-full shrink-0 snap-center rounded-[14px] border border-[rgba(212,175,55,0.18)] bg-[var(--color-void)]/70 p-4 backdrop-blur-md"
          >
            <Stars />
            <blockquote className="mt-2 text-[13px] italic leading-relaxed text-white">
              {`"${t.quote}"`}
            </blockquote>
            <figcaption className="mt-3 flex flex-col">
              <span className="text-[12px] font-bold text-white">{t.name}</span>
              <span className="text-[11px] text-[var(--color-ash)]">{t.detail}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      {/* dots — acompanham a quantidade real de reviews */}
      <div className="mt-3 flex justify-center gap-1.5">
        {TESTIMONIALS.map((t, i) => (
          <span
            key={t.name}
            aria-hidden="true"
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === active ? "w-4 bg-[var(--color-gold)]" : "w-1.5 bg-white/30",
            )}
          />
        ))}
      </div>
    </div>
  )
}

function ControlButton({
  onClick,
  icon: Icon,
  label,
}: {
  onClick: () => void
  icon: typeof Pause
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex flex-col items-center gap-1 rounded-xl border border-white/20 bg-black/45 px-4 py-2 text-white backdrop-blur-md transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
    >
      <Icon className="size-5" />
      <span className="text-[10px] font-bold uppercase tracking-[0.08em]">{label}</span>
    </button>
  )
}

function MobileTestimonials() {
  const videoRef = useRef<LazyVideoHandle>(null)
  const [playing, setPlaying] = useState(false)

  const startPlaying = () => {
    setPlaying(true)
    videoRef.current?.setMuted(false)
    videoRef.current?.play()
  }
  // Pausar OU mutar => volta ao ESTADO 1 (blur volta, reviews reaparecem)
  const returnToRest = () => {
    setPlaying(false)
    videoRef.current?.pause()
    videoRef.current?.setMuted(true)
  }

  return (
    <section className="border-y border-[rgba(212,175,55,0.12)] bg-[var(--color-carbon)] py-8 lg:hidden">
      <div className="relative mx-4 min-h-[580px] overflow-hidden rounded-[18px] border border-[rgba(212,175,55,0.16)]">
        <LazyVideo
          ref={videoRef}
          posterSrc={VIDEO_POSTER}
          videoSrc={VIDEO_SRC}
          className="absolute inset-0"
          onEnded={returnToRest}
          onError={returnToRest}
        />

        {/* ESTADO 1: overlay blur + escurecimento (some quando toca) */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 bg-[var(--color-void)]/80 backdrop-blur-md transition-opacity duration-500",
            playing ? "pointer-events-none opacity-0" : "opacity-100",
          )}
        />

        {/* ESTADO 1: conteúdo em fluxo (top/centro/baixo) — sem sobreposição */}
        <div className="relative z-10 flex min-h-[580px] flex-col justify-between gap-5 p-5">
          <div
            className={cn(
              "text-center transition-opacity duration-500",
              playing && "pointer-events-none opacity-0",
            )}
          >
            <Eyebrow center>O que diz quem jogou</Eyebrow>
            <div className="mt-2">
              <SectionTitle>{"QUEM *ESCAPOU* NÃO ESQUECE"}</SectionTitle>
            </div>
          </div>

          <div
            className={cn(
              "flex flex-col items-center gap-2 transition-opacity duration-500",
              playing && "pointer-events-none opacity-0",
            )}
          >
            {/* botão play sofisticado: pequeno, contorno fino, blur, halo pulsante */}
            <button
              type="button"
              onClick={startPlaying}
              aria-label="Assistir aos depoimentos em vídeo"
              className="relative flex size-[52px] items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <span
                aria-hidden="true"
                className="soft-pulse absolute inset-0 rounded-full border border-white/30"
              />
              <Play className="size-5 translate-x-0.5 fill-white" />
            </button>
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/80">
              Ver depoimentos
            </span>
          </div>

          <div
            className={cn(
              "transition-opacity duration-500",
              playing && "pointer-events-none opacity-0",
            )}
          >
            <ReviewsCarousel />
          </div>
        </div>

        {/* ESTADO 2: controles centralizados no rodapé */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-20 flex items-center justify-center gap-3 p-4 transition-opacity duration-500",
            playing ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          <ControlButton onClick={returnToRest} icon={Pause} label="Pausar" />
          <ControlButton onClick={returnToRest} icon={Volume2} label="Mutar" />
          <ControlButton
            onClick={() => videoRef.current?.requestFullscreen()}
            icon={Maximize}
            label="Tela cheia"
          />
        </div>
      </div>
    </section>
  )
}

/* ===== DESKTOP (lg+): markup atual, inalterado ===== */

function DesktopSocialProof() {
  const [muted, setMuted] = useState(true)

  return (
    <section className="relative hidden overflow-hidden border-y border-[rgba(212,175,55,0.12)] bg-[var(--color-carbon)] lg:block">
      <div className="relative">
        <div className="relative aspect-[16/10] w-full sm:aspect-[21/9] lg:aspect-[21/8]">
          <Image
            src="/social/gameplay-banner.png"
            alt="Equipe jogando uma sala de escape, comemorando juntos"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-[var(--color-void)]/75" />

          <div className="absolute inset-0 flex flex-col">
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-4 px-4 pt-8 text-center sm:px-6 lg:px-8">
              <Eyebrow center>O que diz quem jogou</Eyebrow>
              <SectionTitle>{"QUEM *ESCAPOU* NÃO ESQUECE"}</SectionTitle>
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-blood)] text-white soft-pulse">
                <Play className="size-6 translate-x-0.5 fill-white" />
              </div>
            </div>

            <div className="mx-auto grid w-full max-w-7xl gap-4 px-4 pb-8 sm:px-6 md:grid-cols-3 lg:px-8">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.name}
                  className="flex flex-col gap-3 rounded-[14px] border border-[rgba(212,175,55,0.18)] bg-[var(--color-void)]/70 p-5 backdrop-blur-md"
                >
                  <Stars />
                  <blockquote className="flex-1 text-[13px] italic leading-relaxed text-white">
                    {`"${t.quote}"`}
                  </blockquote>
                  <figcaption className="flex flex-col">
                    <span className="text-[12px] font-bold text-white">{t.name}</span>
                    <span className="text-[11px] text-[var(--color-ash)]">{t.detail}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? "Ativar áudio do vídeo" : "Silenciar vídeo"}
            className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-[rgba(212,175,55,0.3)] bg-[var(--color-void)]/60 text-white backdrop-blur-sm transition-colors hover:text-[var(--color-gold)]"
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-3xl grid-cols-3 overflow-hidden rounded-[14px] border border-[rgba(212,175,55,0.14)]">
          {NUMBERS.map((n, i) => (
            <div
              key={n.label}
              className={`flex flex-col items-center gap-1 px-3 py-6 ${
                i > 0 ? "border-l border-[rgba(212,175,55,0.14)]" : ""
              }`}
            >
              <span className="font-display text-[28px] leading-none text-[var(--color-gold)] sm:text-[36px]">
                {n.value}
              </span>
              <span className="text-center text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-ash)]">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SocialProof() {
  return (
    <>
      {/* MOBILE: faixa de stats (Part C) antes dos depoimentos (Part B) */}
      <StatsStrip />
      <MobileTestimonials />
      {/* DESKTOP: inalterado */}
      <DesktopSocialProof />
    </>
  )
}
