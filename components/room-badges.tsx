import type { Room } from "@/data/rooms"

/** Selo de faixa etária: dourado sólido (Livre) ou coral translúcido (12 anos). */
export function AgeBadge({ age }: { age: Room["age"] }) {
  if (age === "Livre") {
    return (
      <span className="rounded-full bg-[var(--color-gold)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-gold-ink)]">
        Livre
      </span>
    )
  }
  return (
    <span className="rounded-full border border-[rgba(225,28,36,0.5)] bg-[rgba(10,10,10,0.7)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-coral)] backdrop-blur-sm">
      12 Anos
    </span>
  )
}

/** Badge "2 Jogos em 1" — exclusivo do Projeto Chronnos (gradiente vermelho→azul). */
export function DualGameBadge() {
  return (
    <span
      className="flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.06em] text-white"
      style={{
        background:
          "linear-gradient(110deg, var(--color-blood) 0%, var(--color-blood) 48%, var(--color-dual-blue) 52%, var(--color-dual-blue) 100%)",
      }}
    >
      2 Jogos em 1
    </span>
  )
}

/** Badge "A Mais Jogada" — exclusivo do Cativeiro. */
export function TopPlayedBadge() {
  return (
    <span className="rounded-full bg-[var(--color-gold)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-gold-ink)] shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
      A Mais Jogada
    </span>
  )
}
