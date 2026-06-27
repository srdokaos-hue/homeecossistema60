"use client"

import { useState, type ComponentType } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileMoreSheet } from "@/components/mobile-more-sheet"

/* Ícones inline (sem dependência), traço currentColor. */
type IconProps = { className?: string }
const sv = (className?: string) => ({
  className,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
})

function IconHome({ className }: IconProps) {
  return (
    <svg {...sv(className)}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  )
}
function IconKey({ className }: IconProps) {
  return (
    <svg {...sv(className)}>
      <circle cx="8" cy="8" r="4.2" />
      <path d="m11 11 8 8" />
      <path d="m16.5 16.5 2-2" />
      <path d="m19 19 1.8-1.8" />
    </svg>
  )
}
function IconCrown({ className }: IconProps) {
  return (
    <svg {...sv(className)}>
      <path d="M3 7.5 6.5 15h11L21 7.5l-4.5 3.5L12 5 7.5 11 3 7.5Z" />
      <path d="M6 18.5h12" />
    </svg>
  )
}
function IconConfetti({ className }: IconProps) {
  return (
    <svg {...sv(className)}>
      <path d="m4 20 5-13 8 8-13 5Z" />
      <path d="M14 4.5c.8.6.9 1.7.3 2.6M18.5 9c1-.2 2 .3 2.4 1.2M14.5 11l1-1M19 5l.5-.5M11.5 4l.3-.8" />
    </svg>
  )
}
function IconMore({ className }: IconProps) {
  return (
    <svg {...sv(className)}>
      <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  )
}

type NavLink = {
  key: string
  label: string
  href: string
  Icon: ComponentType<IconProps>
  isActive?: (pathname: string) => boolean
}

const LINKS: NavLink[] = [
  { key: "inicio", label: "Início", href: "/", Icon: IconHome, isActive: (p) => p === "/" },
  { key: "salas", label: "Salas", href: "/salas", Icon: IconKey, isActive: (p) => p.startsWith("/salas") },
  { key: "recordes", label: "Recordes", href: "/#kings", Icon: IconCrown },
  { key: "festas", label: "Festas", href: "/#escape-party", Icon: IconConfetti },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const [sheetOpen, setSheetOpen] = useState(false)

  const itemClass = (active: boolean) =>
    cn(
      "relative flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.04em] transition-colors",
      active ? "text-[var(--color-gold)]" : "text-[var(--color-ash)]",
    )

  return (
    <>
      <nav
        aria-label="Navegação principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[rgba(10,10,12,0.92)] backdrop-blur-md lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex h-[3.75rem] max-w-md items-stretch">
          {LINKS.map((link) => {
            const active = link.isActive?.(pathname) ?? false
            return (
              <Link key={link.key} href={link.href} className={itemClass(active)}>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 h-0.5 w-8 rounded-full bg-[var(--color-gold)]"
                  />
                )}
                <link.Icon className="size-[22px]" />
                <span>{link.label}</span>
              </Link>
            )
          })}
          {/* "Mais" abre o bottom sheet (não navega) */}
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
            aria-controls="mobile-more-sheet"
            className={itemClass(sheetOpen)}
          >
            {sheetOpen && (
              <span
                aria-hidden="true"
                className="absolute top-0 h-0.5 w-8 rounded-full bg-[var(--color-gold)]"
              />
            )}
            <IconMore className="size-[22px]" />
            <span>Mais</span>
          </button>
        </div>
      </nav>

      <div id="mobile-more-sheet">
        <MobileMoreSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
      </div>
    </>
  )
}
