import {
  rooms,
  roomHasTag,
  type Room,
  type RoomGenre,
  type RoomTag,
} from "@/data/rooms"

/** ordem fixa de gênero p/ o catálogo: Aventura → Investigação → Suspense */
export const GENRE_ORDER: RoomGenre[] = ["Aventura", "Investigação", "Suspense"]

/**
 * Aplica gênero + tags + jogadores + (opcional) dificuldade.
 * NÃO aplica unidade (tratada à parte pela regra nunca-zero).
 * `difficulty` ausente/null = sem efeito → preserva o comportamento da home.
 */
export function matchesBase(
  room: Room,
  genres: RoomGenre[],
  tags: RoomTag[],
  players: string,
  difficulty?: number | null,
) {
  if (genres.length > 0 && !genres.includes(room.genre)) return false
  if (tags.length > 0 && !tags.every((t) => roomHasTag(room, t))) return false
  if (players !== "all" && room.maxPlayers < Number(players)) return false
  if (difficulty != null && room.difficulty !== difficulty) return false
  return true
}

/** 16 salas ordenadas por GENRE_ORDER, mantendo a ordem do array dentro de cada gênero */
export function roomsByGenreOrder(): Room[] {
  return GENRE_ORDER.flatMap((g) => rooms.filter((r) => r.genre === g))
}
