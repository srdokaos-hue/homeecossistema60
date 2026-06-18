"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

type PromoVariant = "vermelho" | "creme" | "dourado"

interface PromoMessage {
  text: string
  textMobile?: string
  link?: string
  variant: PromoVariant
}

// Estrutura pronta pra receber mensagens de um CMS (array de {texto, link, variante}).
const MESSAGES: PromoMessage[] = [
  {
    text: "Ingresso grátis para o aniversariante do mês. Confira o regulamento",
    textMobile: "Ingresso grátis pro aniversariante do mês",
    variant: "vermelho",
  },
  {
    text: "12 das nossas 16 salas não têm susto nenhum. Aventura pra todo mundo",
    textMobile: "12 de 16 salas não têm susto nenhum",
    variant: "dourado",
  },
  {
    text: "Escape Prime: jogue mais, pague menos a partir de R$ 39,90 o ingresso",
    textMobile: "Escape Prime a partir de R$ 39,90/ingresso",
    variant: "creme",
  },
]

const VARIANTS: Record<PromoVariant, string> = {
  vermelho: "bg-[var(--color-blood)] text-white",
  creme: "bg-[var(--color-cream)] text-[var(--color-void)]",
  dourado: "bg-[var(--color-gold)] text-[#3a2e08]",
}

const ROTATE_MS = 7000

export function PromoBar() {
  const [open, setOpen] = useState(true)
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches || MESSAGES.length <= 1) return

    const id = setInterval(() => {
      // fade out → troca → fade in
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % MESSAGES.length)
        setVisible(true)
      }, 350)
    }, ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  if (!open) return null

  const msg = MESSAGES[index]

  return (
    <div className={`relative z-50 transition-colors duration-500 ${VARIANTS[msg.variant]}`}>
      <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-center px-10 py-2 text-center">
        <p
          className={`text-[11px] font-bold uppercase tracking-[0.08em] transition-opacity duration-300 sm:text-xs ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="hidden sm:inline">{msg.text}</span>
          <span className="sm:hidden">{msg.textMobile ?? msg.text}</span>
        </p>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar aviso"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
