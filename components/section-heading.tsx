import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Eyebrow: linha dourada + label uppercase pequeno acima do H2 */
export function Eyebrow({
  children,
  center = false,
  className,
}: {
  children: ReactNode
  center?: boolean
  className?: string
}) {
  return (
    <span
      className={cn("eyebrow", center && "eyebrow--center", className)}
    >
      {children}
    </span>
  )
}

/**
 * Título de seção em Anton com uma palavra destacada em vermelho.
 * Passe o texto com a palavra de destaque entre asteriscos: "AS *SALAS* TE ESPERAM"
 */
export function SectionTitle({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  const parts = children.split(/(\*[^*]+\*)/g).filter(Boolean)
  return (
    <h2
      className={cn(
        "font-display text-[30px] leading-[0.95] tracking-tight md:text-[42px]",
        className,
      )}
    >
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="text-[var(--color-blood)]">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </h2>
  )
}
