"use client"

import { useEffect, useState } from "react"
import { WHATSAPP_MESSAGE as MESSAGE, whatsappHref } from "@/lib/whatsapp"

export function WhatsappButton() {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let hideTimer: number | undefined

    // Exibe a pílula e agenda o recolhimento após ~4,5s
    const reveal = () => {
      setExpanded(true)
      window.clearTimeout(hideTimer)
      hideTimer = window.setTimeout(() => setExpanded(false), 4500)
    }

    // Mostra logo ao carregar
    const showTimer = window.setTimeout(reveal, 600)

    // ...ou no primeiro scroll, o que vier primeiro
    const onFirstScroll = () => reveal()
    window.addEventListener("scroll", onFirstScroll, { once: true, passive: true })

    return () => {
      window.clearTimeout(showTimer)
      window.clearTimeout(hideTimer)
      window.removeEventListener("scroll", onFirstScroll)
    }
  }, [])

  const href = whatsappHref(MESSAGE)
  const showPill = expanded || hovered

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fala com a gente no WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="whatsapp-fab fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-4 z-[60] flex items-center rounded-full bg-[#25D366] py-2 pl-2 pr-2 text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:brightness-105 md:bottom-6 md:right-6"
    >
      <span
        className={`overflow-hidden whitespace-nowrap text-[14px] font-bold transition-all duration-300 ${
          showPill ? "max-w-[160px] pl-2 pr-2 opacity-100" : "max-w-0 pl-0 pr-0 opacity-0"
        }`}
      >
        Fala com a gente
      </span>
      <span className="flex aspect-square size-11 shrink-0 items-center justify-center md:size-12">
        <svg
          viewBox="0 0 24 24"
          className="block size-7 shrink-0"
          width="28"
          height="28"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </span>
    </a>
  )
}
