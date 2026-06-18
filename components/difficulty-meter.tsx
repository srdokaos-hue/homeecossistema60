import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

/** Medidor de dificuldade: escala visual de cadeados 1–5, preenchidos em dourado. */
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
        <Lock
          key={i}
          className={cn(
            "size-3",
            i < level
              ? "fill-[var(--color-gold)] text-[var(--color-gold)]"
              : "text-[var(--color-ash)]/30",
          )}
        />
      ))}
    </div>
  )
}
