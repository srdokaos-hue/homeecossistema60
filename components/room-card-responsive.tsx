import type { Room } from "@/data/rooms"
import { RoomCard } from "@/components/room-card"
import { RoomCardCatalog } from "@/components/room-card-catalog"

/**
 * Alterna o card por breakpoint (não por página):
 * - < sm (640px): card enxuto (RoomCardCatalog) — mobile
 * - ≥ sm: card rico de hoje (RoomCard) — desktop, sem mudança
 *
 * Os dois ficam no DOM; o oculto vira `display:none` (não ocupa célula do grid
 * e o Image lazy não carrega enquanto invisível). Usado pela home e pela /salas.
 */
export function RoomCardResponsive({
  room,
  highlightUnit,
}: {
  room: Room
  highlightUnit?: boolean
}) {
  return (
    <>
      <div className="h-full sm:hidden">
        <RoomCardCatalog room={room} highlightUnit={highlightUnit} />
      </div>
      <div className="hidden h-full sm:block">
        <RoomCard room={room} highlightUnit={highlightUnit} />
      </div>
    </>
  )
}
