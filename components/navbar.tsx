"use client"

import { useEffect, useState } from "react"
import { Menu, ShoppingCart, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Salas", href: "#salas" },
  { label: "Faça sua Festa", href: "#festas" },
  { label: "Escape Prime", href: "#prime" },
  { label: "Para Empresas", href: "#empresas" },
  { label: "Loja", href: "#loja" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "FAQ", href: "#faq" },
]

function Logo() {
  return (
    <a href="#inicio" className="flex items-center gap-2.5">
      <img
        src="/logo.png"
        alt="60 Minutos Escape Game"
        className="size-10 shrink-0 object-contain"
      />
      <span className="hidden font-sans text-[12px] font-bold uppercase leading-tight tracking-[0.04em] text-white sm:block">
        60 Minutos
        <br />
        Escape Game
      </span>
    </a>
  )
}

function CartButton() {
  return (
    <button
      type="button"
      aria-label="Carrinho de compras, 0 itens"
      className="relative flex size-11 items-center justify-center rounded-full text-[var(--color-ash)] transition-colors hover:text-[var(--color-gold)]"
    >
      <ShoppingCart className="size-5" />
      <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[var(--color-blood)] text-[9px] font-bold text-white">
        0
      </span>
    </button>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const close = () => setMobileOpen(false)

  // trava o scroll do body enquanto o drawer está aberto
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[rgba(212,175,55,0.18)] bg-[rgba(10,10,10,0.97)] backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Links centrais — desktop */}
        <ul className="hidden items-center gap-5 xl:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-ash)] transition-colors hover:text-[var(--color-gold)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Ações à direita */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <CartButton />
          <button
            type="button"
            className="hidden h-11 items-center rounded-full px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:text-[var(--color-gold)] lg:flex"
          >
            Entrar
          </button>
          <a
            href="#salas"
            className="hidden h-11 items-center rounded-full bg-[var(--color-blood)] px-5 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--color-blood-dark)] lg:flex"
          >
            Reservar Agora
          </a>
          {/* hambúrguer some no mobile (<lg) — lá a navegação é a bottom nav.
              Continua no tablet (lg–xl); no desktop (xl) viram os links centrais. */}
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen(true)}
            className="hidden size-11 items-center justify-center rounded-full text-white lg:flex xl:hidden"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </nav>
      </header>

      {/* ===== Navegação mobile: off-canvas pela direita (fora do header pra
          escapar do stacking context dele e ficar acima do banner) ===== */}
      {/* overlay escuro — fecha ao tocar */}
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[90] hidden bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 lg:block xl:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      {/* drawer lateral */}
      <aside
        id="mobile-drawer"
        aria-label="Menu de navegação"
        aria-hidden={!mobileOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-[100] hidden w-[85%] max-w-sm flex-col border-l border-[rgba(212,175,55,0.18)] bg-[var(--color-void)] shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-transform duration-300 will-change-transform lg:flex xl:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[rgba(212,175,55,0.18)] px-4">
          <Logo />
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={close}
            className="flex size-11 items-center justify-center rounded-full text-white transition-colors hover:text-[var(--color-gold)]"
          >
            <X className="size-6" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-5 py-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className="block rounded-lg px-2 py-2.5 font-display text-[22px] leading-tight text-white transition-colors hover:text-[var(--color-gold)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 flex-col gap-2.5 border-t border-[rgba(212,175,55,0.18)] p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          <a
            href="#salas"
            onClick={close}
            className="flex h-12 items-center justify-center rounded-full bg-[var(--color-blood)] text-sm font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--color-blood-dark)]"
          >
            Reservar Agora
          </a>
          <button
            type="button"
            onClick={close}
            className="flex h-11 items-center justify-center rounded-full border border-white/20 text-[13px] font-bold uppercase tracking-[0.06em] text-[var(--color-ash)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            Entrar
          </button>
        </div>
      </aside>
    </>
  )
}
