"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { UNIT_LABELS, type Room } from "@/data/rooms"
import { cn } from "@/lib/utils"

/** grade ilustrativa — reserva online ainda não implementada */
const TIMES = ["14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]

function brl(v: number) {
  return v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function RoomReserveCard({ room }: { room: Room }) {
  const [unit, setUnit] = useState(room.units[0])
  const multiUnit = room.units.length > 1
  // preço da unidade selecionada (override em `unitPrices`); senão `priceFrom`
  const price = room.unitPrices?.[unit] ?? room.priceFrom
  // acento por sala: Ilha = botão dourado de tesouro; Matadouro = vermelho queimado
  const isPirate = room.slug === "ilha-dos-piratas"
  const isMatadouro = room.slug === "matadouro"
  // glow discreto atrás do CTA (dourado na Ilha, vermelho no Matadouro)
  const ctaGlow = isPirate
    ? "rgba(216,170,53,0.3)"
    : isMatadouro
      ? "rgba(193,43,43,0.3)"
      : null
  // classe do botão por tema
  const ctaClass = isPirate
    ? "btn-gold"
    : isMatadouro
      ? "btn-blood-burnt"
      : "bg-[var(--color-blood)] text-white transition-colors hover:bg-[var(--color-blood-dark)]"

  return (
    <>
      {/* Card completo: só DESKTOP (sticky). No mobile vale o `RoomReserveMobile`
          (seletor inline + barra fixa), pra não duplicar reserva na tela. */}
      <div className="glass-panel hidden rounded-2xl p-5 lg:sticky lg:top-24 lg:block">
        {/* Unidade: pílulas se houver mais de uma; senão texto estático */}
        {multiUnit ? (
          <div className="flex flex-wrap gap-2">
            {room.units.map((u) => {
              const active = u === unit
              return (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnit(u)}
                  aria-pressed={active}
                  className={cn(
                    "flex-1 rounded-full px-3 py-2 text-[12px] font-bold uppercase tracking-[0.04em] transition-colors",
                    active
                      ? "bg-[var(--color-gold)] text-[var(--color-gold-ink)]"
                      : "border border-[rgba(255,215,120,0.25)] text-[var(--color-ash)] hover:border-[var(--color-gold)]",
                  )}
                >
                  {UNIT_LABELS[u] ?? u}
                </button>
              )
            })}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-ash)]">
            <MapPin className="size-4 text-[var(--color-gold)]" />
            {UNIT_LABELS[unit] ?? unit}
          </div>
        )}

        {/* Preço */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="font-display text-[40px] leading-none text-white">
            R$ {brl(price)}
          </span>
          <span className="text-[13px] text-[var(--color-ash)]">/ pessoa</span>
        </div>
        <p className="mt-1.5 text-[12px] font-semibold text-[var(--color-blood)]">
          Mínimo de {room.minPlayers} pessoas · máximo {room.maxPlayers}
        </p>

        {/* Horários (ilustrativos) */}
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-ash)]">
          Horários disponíveis · hoje
        </p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {TIMES.map((t) => (
            <span
              key={t}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 text-center text-[12px] text-[var(--color-ash)]"
            >
              {t}
            </span>
          ))}
        </div>
        <p className="mt-2 text-[10px] text-[var(--color-ash)]/60">
          Grade ilustrativa. Reserva online em breve.
        </p>

        {/* CTA de reserva (fluxo real do site, ainda não implementado) */}
        <div className="relative mt-5">
          {ctaGlow && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-3 inset-y-0 rounded-full blur-xl"
              style={{ background: ctaGlow }}
            />
          )}
          <button
            type="button"
            className={cn(
              "relative flex h-12 w-full items-center justify-center gap-2 rounded-full text-[13px] font-bold uppercase tracking-[0.06em] transition-shadow",
              ctaClass,
            )}
          >
            Reservar Agora →
          </button>
        </div>
        <p className="mt-3 text-center text-[11px] text-[var(--color-ash)]/70">
          <a href="#" className="underline underline-offset-2 hover:text-[var(--color-gold)]">
            Ver regulamento do jogo
          </a>
        </p>
      </div>
      {/* No mobile, a reserva (barra fixa + seletor inline) é o `RoomReserveMobile`. */}
    </>
  )
}
