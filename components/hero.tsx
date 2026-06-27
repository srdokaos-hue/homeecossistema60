"use client"

import Image from "next/image"
import { Search } from "lucide-react"

const STATS = [
  { value: "16", label: "Aventuras" },
  { value: "4", label: "Unidades" },
  { value: "10 Anos", label: "De História" },
]

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[var(--color-void)]"
    >
      {/* Camada 1: frame estático do hero (LCP). Vídeo real plugado depois via fade-in. */}
      <div className="absolute inset-0">
        <Image
          src="/hero/hero-frame.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Camada 2: overlay escuro 70-80% para contraste AA */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 40%, rgba(10,10,10,0.66) 0%, rgba(10,10,10,0.88) 70%, rgba(10,10,10,0.97) 100%)",
        }}
      />

      {/* Camada 3: pattern de símbolos a 3% */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(/pattern-symbols.png)",
          backgroundSize: "320px",
        }}
        aria-hidden="true"
      />

      {/* Camada 4: glows sutis */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "var(--color-blood)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 size-96 rounded-full opacity-[0.1] blur-3xl"
        style={{ background: "var(--color-gold)" }}
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {/* Coluna esquerda */}
        <div className="flex flex-col items-start gap-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,175,55,0.4)] bg-[rgba(212,175,55,0.06)] px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-[var(--color-gold)]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--color-gold)] sm:text-[11px]">
              Brasília e Ribeirão Preto · 4 Unidades · 16 Aventuras
            </span>
          </span>

          <h1 className="font-display text-[40px] leading-[0.92] tracking-[-1px] text-white md:text-[64px] lg:text-[72px] lg:tracking-[-2px]">
            Você tem
            <br />
            <span className="text-[var(--color-blood)]">60 Minutos</span>
            <br />
            Pra escapar.
          </h1>

          <p className="max-w-[480px] text-[15px] leading-relaxed text-[var(--color-ash)]">
            Trancados num cenário real, você e sua equipe resolvem enigmas e
            desafiam o relógio.{" "}
            {/* trecho extra só no tablet/desktop (sm+); no mobile o hero respira */}
            <span className="hidden font-semibold text-white sm:inline">
              Piratas, magia, investigação, suspense. São 16 histórias, uma só
              missão: escapar em 60 minutos.
            </span>
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#salas"
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-blood)] px-6 text-[13px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--color-blood-dark)]"
            >
              <Search className="size-4" />
              Ver as salas
            </a>
            <a
              href="#como-funciona"
              className="flex h-12 items-center justify-center rounded-full border-[1.5px] border-[var(--color-gold)] px-6 text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--color-gold)] transition-colors hover:bg-[rgba(212,175,55,0.08)]"
            >
              Como funciona?
            </a>
          </div>

          <dl className="mt-1 flex flex-wrap gap-x-8 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[28px] leading-none text-[var(--color-gold)]">
                  {stat.value}
                </dd>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--color-ash)]">
                  {stat.label}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
