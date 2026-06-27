"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"
import { UNIT_LABELS, type Room } from "@/data/rooms"
import { cn } from "@/lib/utils"

function brl(v: number) {
  return v.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/**
 * Reserva no MOBILE (some no desktop, lá vale a sidebar sticky `RoomReserveCard`).
 * Um único componente concentra os dois pontos de toque que precisam dividir o
 * mesmo estado de unidade:
 *   1. seletor de unidade INLINE, no fluxo logo abaixo do hero/stats;
 *   2. barra FIXA no rodapé (preço + Reservar), `position: fixed`, então tanto
 *      faz onde fica na árvore — fica visível na base da tela.
 * Trocar a unidade no seletor atualiza o preço da barra (estado local
 * compartilhado, sem context). Unidade única = texto estático, sem seletor.
 */
export function RoomReserveMobile({ room }: { room: Room }) {
  const [unit, setUnit] = useState(room.units[0])
  const multiUnit = room.units.length > 1
  const price = room.unitPrices?.[unit] ?? room.priceFrom

  // acento por sala (igual à sidebar): dourado na Ilha, vermelho no Matadouro
  const isPirate = room.slug === "ilha-dos-piratas"
  const isMatadouro = room.slug === "matadouro"
  const ctaClass = isPirate
    ? "btn-gold"
    : isMatadouro
      ? "btn-blood-burnt"
      : "bg-[var(--color-blood)] text-white transition-colors hover:bg-[var(--color-blood-dark)]"

  return (
    <div className="lg:hidden">
      {/* Seletor de unidade INLINE (só com +1 unidade) */}
      {multiUnit ? (
        <div className="glass-panel rounded-2xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--color-ash)]">
            Escolha a unidade
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
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
        </div>
      ) : (
        <div className="glass-panel flex items-center gap-1.5 rounded-2xl px-4 py-3 text-[13px] font-semibold text-[var(--color-ash)]">
          <MapPin className="size-4 text-[var(--color-gold)]" />
          {UNIT_LABELS[unit] ?? unit}
        </div>
      )}

      {/* Barra FIXA no rodapé — padrão Airbnb/OpenTable. A classe
          `room-reserve-bar` é usada pelo CSS p/ subir a barra acima da bottom
          nav e levantar o WhatsApp. pb com safe-area (notch do iPhone). */}
      <div className="room-reserve-bar fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-white/10 bg-[rgba(12,12,14,0.94)] px-4 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-md">
        <div>
          <div className="font-display text-[22px] leading-none text-white">
            R$ {brl(price)}
          </div>
          <div className="text-[10px] text-[var(--color-ash)]">
            por pessoa · mín. {room.minPlayers}
          </div>
        </div>
        <button
          type="button"
          className={cn(
            "flex h-11 max-w-[58%] flex-1 items-center justify-center rounded-full text-[12px] font-bold uppercase tracking-[0.06em]",
            ctaClass,
          )}
        >
          Reservar Agora
        </button>
      </div>
    </div>
  )
}
