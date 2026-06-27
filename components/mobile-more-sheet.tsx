"use client"

import { useEffect } from "react"
import Link from "next/link"
import {
  Building2,
  Crown,
  FileText,
  Gem,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"
import { whatsappHref } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

type SheetItem = {
  label: string
  href: string
  icon: LucideIcon
  external?: boolean
  /** destino ainda não existe (href="#") — registrado em PENDÊNCIAS */
  pending?: boolean
}

// Ordem: o que já tem destino real primeiro, pendências depois.
const ITEMS: SheetItem[] = [
  { label: "Empresas", href: "/#escape-analysis", icon: Building2 },
  { label: "Escape Prime", href: "/#escape-prime", icon: Gem },
  { label: "Recordes", href: "/#kings", icon: Crown },
  { label: "Contato", href: whatsappHref(), icon: MessageCircle, external: true },
  { label: "Quem Somos", href: "#", icon: Users, pending: true },
  { label: "Loja", href: "#", icon: ShoppingBag, pending: true },
  { label: "FAQ", href: "#", icon: HelpCircle, pending: true },
  { label: "Regulamentos", href: "#", icon: FileText, pending: true },
  { label: "Política de Privacidade", href: "#", icon: ShieldCheck, pending: true },
]

export function MobileMoreSheet({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  // trava scroll do body + fecha no Esc enquanto aberto
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open, onClose])

  return (
    <div className="lg:hidden" aria-hidden={!open}>
      {/* backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[110] bg-black/65 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      {/* painel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mais navegação"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[120] max-h-[82vh] overflow-y-auto rounded-t-2xl border-t border-white/10 bg-[rgba(12,12,14,0.98)] backdrop-blur-md transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          open ? "translate-y-0" : "translate-y-full",
        )}
        style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      >
        {/* handle + header */}
        <div className="sticky top-0 bg-[rgba(12,12,14,0.98)] px-5 pt-3">
          <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-white/15" aria-hidden="true" />
          <div className="flex items-center justify-between pb-3">
            <h2 className="font-display text-[20px] text-white">Mais</h2>
            <button
              type="button"
              aria-label="Fechar"
              onClick={onClose}
              className="flex size-9 items-center justify-center rounded-full text-[var(--color-ash)] transition-colors hover:text-[var(--color-gold)]"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        <ul className="px-3 pb-2">
          {ITEMS.map((item) => {
            const Icon = item.icon
            const inner = (
              <>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-[var(--color-gold)]">
                  <Icon className="size-[18px]" />
                </span>
                <span className="text-[14px] font-semibold text-[var(--color-cream)]">
                  {item.label}
                </span>
              </>
            )
            const cls =
              "flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.04]"
            return (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className={cls}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link href={item.href} onClick={onClose} className={cls}>
                    {inner}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
