"use client"

import type { ReactNode } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { cn } from "@/lib/utils"

/** Envolve uma seção com o efeito fade-up sutil ao entrar no viewport. */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={cn("reveal", visible && "is-visible", className)}>
      {children}
    </div>
  )
}
