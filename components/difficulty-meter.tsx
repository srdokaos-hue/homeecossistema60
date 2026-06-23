import { cn } from "@/lib/utils"

/**
 * Cadeado inline (não o ícone do lucide, que em tamanho pequeno parecia uma
 * pessoa). Aro/arco superior bem visível + corpo com recorte do furo do arco
 * (fill-rule evenodd) → lê como cadeado em qualquer tamanho. currentColor.
 */
function PadlockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
      />
    </svg>
  )
}

/** Medidor de dificuldade: escala visual de cadeados 1–5, preenchidos no acento. */
export function DifficultyMeter({
  level,
  className,
}: {
  level: number
  className?: string
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Dificuldade ${level} de 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <PadlockIcon
          key={i}
          className={cn(
            "size-3",
            i < level ? "text-[var(--color-gold)]" : "text-[var(--color-ash)]/30",
          )}
        />
      ))}
    </div>
  )
}
