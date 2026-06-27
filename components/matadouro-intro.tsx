"use client"

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

/**
 * Micro-intro imersiva da sala Matadouro. Premium e curta (~3,2s), NÃO é trailer
 * nem jumpscare. Roda UMA vez por sessão (sessionStorage); refresh/voltar não
 * repete. Botão "Pular" sempre visível. Respeita prefers-reduced-motion (só um
 * fade). Áudio é best-effort (autoplay pode ser bloqueado): se falhar, a parte
 * visual segue e a navegação nunca trava.
 */
const KEY = "matadouro-intro-seen"
const A = "/rooms/matadouro/intro"

export function MatadouroIntro() {
  const [show, setShow] = useState(false)
  const [reduce, setReduce] = useState(false)
  // 0 = preto · 1 = texto · 2 = cena acende (flicker) · 3 = estável
  const [stage, setStage] = useState(0)
  const [closing, setClosing] = useState(false)

  const timers = useRef<number[]>([])
  const audios = useRef<HTMLAudioElement[]>([])

  const cleanup = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
    audios.current.forEach((a) => {
      try {
        a.pause()
      } catch {}
    })
  }, [])

  const finish = useCallback(() => {
    cleanup()
    setClosing(true)
    window.setTimeout(() => setShow(false), 650)
  }, [cleanup])

  useEffect(() => {
    if (typeof window === "undefined") return
    let seen = false
    try {
      seen = !!sessionStorage.getItem(KEY)
    } catch {}
    if (seen) return
    try {
      sessionStorage.setItem(KEY, "1")
    } catch {}

    const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    setReduce(prefersReduce)
    setShow(true)

    const at = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms))
    }
    const sound = (file: string, volume: number, stopAfter?: number) => {
      try {
        const a = new Audio(`${A}/${file}`)
        a.volume = volume
        a.preload = "auto"
        audios.current.push(a)
        a.play().catch(() => {})
        if (stopAfter) {
          timers.current.push(
            window.setTimeout(() => {
              try {
                a.pause()
              } catch {}
            }, stopAfter),
          )
        }
      } catch {}
    }

    if (prefersReduce) {
      // movimento reduzido: sem flicker/sons, só um fade simples da cena
      setStage(3)
      at(finish, 1500)
      return cleanup
    }

    at(() => setStage(1), 300) // "Você ouviu isso?"
    at(() => sound("door.mp3", 0.85), 600) // porta destrancando
    at(() => sound("chain.mp3", 0.7), 1100) // trecho curto da corrente
    at(() => {
      setStage(2) // lâmpada/cenário acendem em flicker
      sound("flicker.mp3", 0.5, 750) // estalo elétrico (trecho curto)
    }, 1400)
    at(() => setStage(3), 2000) // estabiliza
    at(finish, 2600) // fade pra página real (~2,6s→3,25s)

    return cleanup
  }, [cleanup, finish])

  if (!show) return null

  const sceneVisible = stage >= 2
  // estilo da cena: flicker no fluxo normal; opacidade simples no reduce
  const sceneStyle: CSSProperties = reduce
    ? { opacity: stage >= 3 ? 1 : 0, transition: "opacity 700ms ease" }
    : sceneVisible
      ? { animation: "matadouro-intro-flicker 600ms ease-out forwards" }
      : { opacity: 0 }

  return (
    <div
      role="dialog"
      aria-label="Introdução da sala Matadouro"
      className={cn(
        "fixed inset-0 z-[200] overflow-hidden bg-black transition-opacity duration-[650ms] ease-in-out",
        closing && "pointer-events-none opacity-0",
      )}
    >
      {/* CENA: cela do Matadouro (bg) + lâmpada que acende */}
      <div className="absolute inset-0" style={sceneStyle}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${A}/intro-background.webp`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full select-none object-cover"
          draggable={false}
        />
        {/* brilho da lâmpada (screen, atrás do asset) */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[6%] h-[42%] w-[70%] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(50% 45% at 50% 38%, rgba(255,190,120,0.45), rgba(255,160,80,0.12) 45%, transparent 70%)",
            mixBlendMode: "screen",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${A}/lamp.webp`}
          alt=""
          aria-hidden="true"
          className="absolute left-1/2 top-[2%] w-[60%] max-w-[360px] -translate-x-1/2 select-none sm:w-[40%]"
          draggable={false}
        />
        {/* vinheta pra leitura/clima */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 35%, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      {/* TEXTO discreto */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-6"
        style={{
          opacity: stage === 1 ? 1 : 0,
          transition: "opacity 500ms ease",
        }}
      >
        <p className="text-center font-display text-[22px] tracking-[0.04em] text-white/85 sm:text-[28px]">
          Você ouviu isso?
        </p>
      </div>

      {/* PULAR — sempre visível */}
      <button
        type="button"
        onClick={finish}
        className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-white/90 backdrop-blur-sm transition-colors hover:bg-black/70"
        style={{ top: "calc(1rem + env(safe-area-inset-top))" }}
      >
        Pular
      </button>
    </div>
  )
}
