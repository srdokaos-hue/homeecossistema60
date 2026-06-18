"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Lock, Key, Search as Lupa } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Eyebrow, SectionTitle } from "@/components/section-heading"

const STEPS = [
  {
    n: "1",
    title: "Escolha a missão",
    desc: "16 salas com histórias únicas: piratas, magia, investigação, sci-fi. A maioria é livre pra qualquer idade. Escolha online, no horário que preferir — leva 2 minutos.",
    Ornament: Lupa,
  },
  {
    n: "2",
    title: "Entre no cenário",
    desc: "Você e sua equipe são trancados num ambiente construído pra aquela história. Cenário real, imersão total.",
    Ornament: Key,
  },
  {
    n: "3",
    title: "Resolva e escape",
    desc: "Decifrem enigmas, encontrem pistas e descubram a saída em menos de 60 minutos.",
    Ornament: Lock,
  },
]

export function HowItWorks() {
  const [open, setOpen] = useState(false)

  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-[var(--color-void)] py-16 md:py-24"
    >
      {/* pattern de símbolos a 3% */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url(/pattern-symbols.png)",
          backgroundSize: "320px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <Eyebrow>O que é escape game?</Eyebrow>
          <SectionTitle>{"TRÊS PASSOS PRA *VIVER* A AVENTURA"}</SectionTitle>
          <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-[var(--color-ash)]">
            Escape game é um jogo de imersão ao vivo: sua equipe é trancada numa
            sala cenográfica e precisa resolver enigmas pra escapar antes do
            tempo acabar.{" "}
            <span className="font-semibold text-white">
              Sem atores te perseguindo: o desafio é o enigma, não o susto.
            </span>
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-5">
          {/* Passos */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            {STEPS.map((step) => (
              <div
                key={step.n}
                className="relative flex items-start gap-5 overflow-hidden rounded-[14px] border border-[rgba(212,175,55,0.14)] bg-[var(--color-carbon)] p-5"
              >
                {/* ornamento temático sutil ao fundo (≤8% opacidade) */}
                <step.Ornament
                  className="pointer-events-none absolute -right-2 -top-2 size-24 text-[var(--color-gold)] opacity-[0.06]"
                  aria-hidden="true"
                />
                <span className="relative font-display text-[48px] leading-none text-[var(--color-gold)]/40">
                  {step.n}
                </span>
                <div className="relative flex flex-col gap-1.5 pt-1">
                  <h3 className="font-display text-[20px] leading-none text-white">
                    {step.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[var(--color-ash)]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Vídeo educativo */}
          <div className="flex flex-col gap-3 lg:col-span-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Assistir vídeo: veja como funciona"
              className="group relative aspect-video w-full overflow-hidden rounded-[14px]"
            >
              <Image
                src="/how/team-celebrating.png"
                alt="Pessoas de todas as idades jogando: crianças, famílias, adolescentes e colegas de trabalho"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[var(--color-void)]/40" />
              <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-blood)] text-white soft-pulse">
                <Play className="size-7 translate-x-0.5 fill-white" />
              </span>
            </button>
            <p className="text-[12px] text-[var(--color-ash)]">
              Crianças, famílias, amigos e equipes: todo mundo joga. Veja em 40
              segundos.
            </p>
          </div>
        </div>
      </div>

      {/* Modal lazy: iframe só monta quando aberto */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl border-[rgba(212,175,55,0.18)] bg-[var(--color-carbon)] p-2">
          <DialogTitle className="sr-only">
            Vídeo: como funciona o escape game
          </DialogTitle>
          <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-[var(--color-void)]">
            {open && (
              <p className="text-[13px] uppercase tracking-[0.12em] text-[var(--color-ash)]">
                Vídeo em produção
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
