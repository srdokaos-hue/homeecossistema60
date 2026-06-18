"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Volume2, VolumeX, Play } from "lucide-react"
import { Eyebrow, SectionTitle } from "@/components/section-heading"

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

export function SocialProof() {
  // Slot de vídeo: hoje renderiza só a imagem. Estrutura pronta pra <video> mudo + botão de áudio.
  const [muted, setMuted] = useState(true)

  return (
    <section className="relative overflow-hidden border-y border-[rgba(212,175,55,0.12)] bg-[var(--color-carbon)]">
      {/* Banner full-width — slot de vídeo (imagem estática por enquanto) */}
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
          {/* overlay escuro 75% */}
          <div className="absolute inset-0 bg-[var(--color-void)]/75" />

          {/* Conteúdo sobreposto */}
          <div className="absolute inset-0 flex flex-col">
            {/* topo: título + play decorativo */}
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-4 px-4 pt-8 text-center sm:px-6 lg:px-8">
              <Eyebrow center>O que diz quem jogou</Eyebrow>
              <SectionTitle>{"QUEM *ESCAPOU* NÃO ESQUECE"}</SectionTitle>
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--color-blood)] text-white soft-pulse">
                <Play className="size-6 translate-x-0.5 fill-white" />
              </div>
            </div>

            {/* metade inferior: depoimentos sobrepostos */}
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
                    <span className="text-[12px] font-bold text-white">
                      {t.name}
                    </span>
                    <span className="text-[11px] text-[var(--color-ash)]">
                      {t.detail}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* botão de áudio (ativa quando o vídeo real entrar) */}
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

      {/* Placar de números (trust signals) */}
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
