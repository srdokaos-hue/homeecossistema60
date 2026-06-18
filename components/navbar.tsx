"use client"

import { useState } from "react"
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

  return (
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
            className="hidden h-11 items-center rounded-full px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:text-[var(--color-gold)] sm:flex"
          >
            Entrar
          </button>
          <a
            href="#salas"
            className="hidden h-11 items-center rounded-full bg-[var(--color-blood)] px-5 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[var(--color-blood-dark)] sm:flex"
          >
            Reservar Agora
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="flex size-11 items-center justify-center rounded-full text-white xl:hidden"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </nav>

      {/* Drawer mobile fullscreen */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-[var(--color-void)] transition-opacity duration-300 xl:hidden",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-16 items-center justify-between border-b border-[rgba(212,175,55,0.18)] px-4 sm:px-6">
          <Logo />
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
            className="flex size-11 items-center justify-center rounded-full text-white"
          >
            <X className="size-6" />
          </button>
        </div>
        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 font-display text-2xl text-white transition-colors hover:text-[var(--color-gold)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-3 border-t border-[rgba(212,175,55,0.18)] p-6">
          <a
            href="#salas"
            onClick={() => setMobileOpen(false)}
            className="flex h-12 items-center justify-center rounded-full bg-[var(--color-blood)] text-sm font-bold uppercase tracking-[0.06em] text-white"
          >
            Reservar Agora
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-12 items-center justify-center rounded-full border-[1.5px] border-[var(--color-gold)] text-sm font-bold uppercase tracking-[0.06em] text-[var(--color-gold)]"
          >
            Entrar
          </button>
        </div>
      </div>
    </header>
  )
}
