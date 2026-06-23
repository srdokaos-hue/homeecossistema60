export type RoomGenre = "Aventura" | "Investigação" | "Suspense"
export type RoomAge = "Livre" | "12 anos"
export type RoomTag = "Pra família" | "Não assusta" | "Populares" | "12+"

export interface Room {
  slug: string
  name: string
  tagline: string
  genre: RoomGenre
  age: RoomAge
  minPlayers: number
  maxPlayers: number
  units: string[]
  /** preço a partir de, por pessoa */
  priceFrom: number
  /** imagem do pôster */
  poster: string
  /** pôster LIMPO (sem título) p/ os cards quando existir. Fallback: `poster`. */
  posterClean?: string
  /** object-position customizado do pôster no card (padrão: "top") */
  posterPosition?: string
  /** dificuldade 1–5 (cadeados) */
  difficulty: number
  /** funciona de verdade com crianças (validado pelo GM) */
  family: boolean
  /** tem sustos sonoros/de ambiente (apenas salas 12+ que assustam) */
  scares: boolean
  /** entre as 7 salas mais jogadas */
  popular: boolean
  /** card especial: dois jogos em um (apenas Projeto Chronnos) */
  dualGame?: boolean
  /** badge "A MAIS JOGADA" — apenas Cativeiro */
  topPlayed?: boolean
  /** destacado na vitrine inicial "Todas" */
  featured?: boolean
}

export const GENRES: ("Todas" | RoomGenre)[] = [
  "Todas",
  "Aventura",
  "Investigação",
  "Suspense",
]

export const TAGS: RoomTag[] = ["Pra família", "Não assusta", "Populares", "12+"]

export const UNITS = [
  "Píer 21",
  "ParkShopping",
  "Taguatinga",
  "Santa Úrsula",
] as const

/** rótulos especiais por unidade (ex.: Taguatinga é loja Pocket) */
export const UNIT_LABELS: Record<string, string> = {
  "Píer 21": "Píer 21",
  ParkShopping: "ParkShopping",
  Taguatinga: "Taguatinga · Pocket",
  "Santa Úrsula": "Santa Úrsula",
}

export const rooms: Room[] = [
  {
    slug: "ilha-dos-piratas",
    name: "Ilha dos Piratas",
    tagline: "O Tesouro de Gol D. Roger",
    genre: "Aventura",
    age: "Livre",
    minPlayers: 3,
    maxPlayers: 6,
    units: ["ParkShopping", "Santa Úrsula"],
    priceFrom: 84.9,
    poster: "/posters/ilha-dos-piratas.webp",
    difficulty: 3,
    family: true,
    scares: false,
    popular: false,
    featured: true,
  },
  {
    slug: "profecia-orbe-magico",
    name: "A Profecia do Orbe Mágico",
    tagline: "Desvende o segredo do Ministério da Magia",
    genre: "Aventura",
    age: "Livre",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["ParkShopping", "Santa Úrsula"],
    priceFrom: 84.9,
    poster: "/posters/orbe-magico.webp",
    difficulty: 3,
    family: true,
    scares: false,
    popular: true,
    featured: true,
  },
  {
    slug: "busca-santo-graal",
    name: "A Busca pelo Santo Graal",
    tagline: "O início da maldição",
    genre: "Aventura",
    age: "Livre",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["Píer 21", "Santa Úrsula"],
    priceFrom: 84.9,
    poster: "/posters/santo-graal.webp",
    difficulty: 3,
    family: true,
    scares: false,
    popular: false,
    featured: true,
  },
  {
    slug: "anel-do-poder",
    name: "O Anel do Poder",
    tagline: "O Mago Cinzento os convoca",
    genre: "Aventura",
    age: "Livre",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["ParkShopping"],
    priceFrom: 84.9,
    poster: "/posters/anel-do-poder.webp",
    difficulty: 4,
    family: true,
    scares: false,
    popular: false,
    featured: true,
  },
  {
    slug: "scape-wars",
    name: "Scape Wars",
    tagline: "O resgate da lendária Millenium",
    genre: "Aventura",
    age: "Livre",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["ParkShopping"],
    priceFrom: 84.9,
    poster: "/posters/scape-wars.webp",
    difficulty: 3,
    family: true,
    scares: false,
    popular: false,
    featured: true,
  },
  {
    slug: "operacao-hora-zero",
    name: "Operação Hora Zero",
    tagline: "O inimigo tem muitas faces",
    genre: "Investigação",
    age: "Livre",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["Píer 21", "Santa Úrsula"],
    priceFrom: 84.9,
    poster: "/posters/hora-zero.webp",
    difficulty: 3,
    family: true,
    scares: false,
    popular: true,
    featured: true,
  },
  {
    slug: "pandemia-k13",
    name: "Pandemia K-13",
    tagline: "O mundo precisa de um herói",
    genre: "Investigação",
    age: "Livre",
    minPlayers: 3,
    maxPlayers: 8,
    units: ["Píer 21"],
    priceFrom: 84.9,
    poster: "/posters/pandemia-k13.webp",
    difficulty: 4,
    family: true,
    scares: false,
    popular: false,
  },
  {
    slug: "museu-dos-misterios",
    name: "Museu dos Mistérios",
    tagline: "Tudo por um biscoito",
    genre: "Investigação",
    age: "Livre",
    minPlayers: 2,
    maxPlayers: 6,
    units: ["Taguatinga"],
    priceFrom: 84.9,
    poster: "/posters/museu-misterios.webp",
    difficulty: 3,
    family: true,
    scares: false,
    popular: true,
    featured: true,
  },
  {
    slug: "projeto-chronnos",
    name: "Projeto Chronnos",
    tagline: "Um novo Paradoxo Temporal",
    genre: "Investigação",
    age: "Livre",
    minPlayers: 3,
    maxPlayers: 6,
    units: ["Píer 21"],
    priceFrom: 84.9,
    poster: "/posters/projeto-chronnos.webp",
    difficulty: 4,
    family: false,
    scares: false,
    popular: false,
    dualGame: true,
  },
  {
    slug: "escape-story",
    name: "Escape Story",
    tagline: "Resgate ao Xerife",
    genre: "Aventura",
    age: "Livre",
    minPlayers: 2,
    maxPlayers: 6,
    units: ["Taguatinga"],
    priceFrom: 84.9,
    poster: "/posters/escape-story.webp",
    difficulty: 3,
    family: true,
    scares: false,
    popular: false,
    featured: true,
  },
  {
    slug: "casa-do-will",
    name: "A Casa do Will",
    tagline: "A busca pelo garoto desaparecido",
    genre: "Suspense",
    age: "Livre",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["Píer 21"],
    priceFrom: 84.9,
    poster: "/posters/casa-do-will.webp",
    posterPosition: "center 15%",
    difficulty: 3,
    family: true,
    scares: false,
    popular: true,
  },
  {
    slug: "devorador-de-mentes",
    name: "O Devorador de Mentes",
    tagline: "A ameaça do Mind Flayer",
    genre: "Suspense",
    age: "Livre",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["Píer 21"],
    priceFrom: 84.9,
    poster: "/posters/devorador-mentes.webp",
    posterPosition: "top",
    difficulty: 4,
    family: false,
    scares: false,
    popular: false,
  },
  {
    slug: "cativeiro",
    name: "Cativeiro",
    tagline: "O Esfolador de Santa Bárbara",
    genre: "Suspense",
    age: "12 anos",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["Píer 21", "Santa Úrsula"],
    priceFrom: 84.9,
    poster: "/posters/cativeiro.webp",
    posterPosition: "bottom",
    difficulty: 5,
    family: false,
    scares: true,
    popular: true,
    topPlayed: true,
  },
  {
    slug: "matadouro",
    name: "Matadouro",
    tagline: "Ele sempre esteve observando",
    genre: "Suspense",
    age: "12 anos",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["ParkShopping"],
    priceFrom: 84.9,
    poster: "/posters/matadouro.webp",
    difficulty: 5,
    family: false,
    scares: true,
    popular: false,
  },
  {
    slug: "fnaf",
    name: "FNAF",
    tagline: "Última Noite com Freddy",
    genre: "Suspense",
    age: "12 anos",
    minPlayers: 2,
    maxPlayers: 6,
    units: ["ParkShopping", "Santa Úrsula"],
    priceFrom: 84.9,
    poster: "/posters/fnaf.webp",
    difficulty: 4,
    family: false,
    scares: true,
    popular: true,
  },
  {
    slug: "ameaca-zumbi",
    name: "A Ameaça Zumbi",
    tagline: "O perigo está em todo lugar",
    genre: "Suspense",
    age: "12 anos",
    minPlayers: 4,
    maxPlayers: 8,
    units: ["ParkShopping"],
    priceFrom: 84.9,
    poster: "/posters/ameaca-zumbi.webp",
    difficulty: 4,
    family: false,
    scares: false,
    popular: true,
  },
]

/** Slugs em ordem para a vitrine inicial do filtro "Todas" (aventura colorida primeiro) */
export const HOME_SHOWCASE_ORDER = [
  "ilha-dos-piratas",
  "profecia-orbe-magico",
  "busca-santo-graal",
  "scape-wars",
  "museu-dos-misterios",
  "escape-story",
  "operacao-hora-zero",
  "anel-do-poder",
]

/** true se a sala satisfaz a tag dada */
export function roomHasTag(room: Room, tag: RoomTag): boolean {
  switch (tag) {
    case "Pra família":
      return room.family
    case "Não assusta":
      return !room.scares
    case "Populares":
      return room.popular
    case "12+":
      return room.age === "12 anos"
  }
}

/** salas com cartaz LIMPO (sem título/slogan) em /posters/clean/[slug].webp */
const CLEAN_POSTER_SLUGS = new Set<string>([
  "ilha-dos-piratas",
  "profecia-orbe-magico",
  "busca-santo-graal",
  "anel-do-poder",
  "projeto-chronnos",
  "operacao-hora-zero",
  "pandemia-k13",
  "museu-dos-misterios",
  "casa-do-will",
  "devorador-de-mentes",
  "cativeiro",
  "fnaf",
  "ameaca-zumbi",
])

/**
 * Imagem do hero da sala no mobile: usa o cartaz LIMPO (sem título embutido)
 * quando existir, pra não duplicar/cortar o título com o título HTML. NÃO é o
 * background temático da página. Fallback: o pôster normal.
 */
export function heroCleanImage(room: Room): string {
  return CLEAN_POSTER_SLUGS.has(room.slug)
    ? `/posters/clean/${room.slug}.webp`
    : room.poster
}

/** afinidade temática entre gêneros (pra recomendação da página da sala) */
const GENRE_AFFINITY: Record<RoomGenre, RoomGenre[]> = {
  Aventura: ["Aventura", "Investigação"],
  Investigação: ["Investigação", "Aventura", "Suspense"],
  Suspense: ["Suspense", "Investigação"],
}

/**
 * Salas recomendadas pra "Você Também Pode Curtir", por relevância:
 *   1º tema/categoria (mesmo gênero > gênero afim)
 *   2º mesma unidade
 *   3º populares (desempate/preenchimento)
 * Nunca inclui a própria sala. Ordena por pontuação e completa com as demais.
 */
export function recommendRooms(current: Room, limit = 8): Room[] {
  const affine = new Set(GENRE_AFFINITY[current.genre] ?? [current.genre])
  return rooms
    .filter((r) => r.slug !== current.slug)
    .map((r) => {
      let score = 0
      if (r.genre === current.genre) score += 5
      else if (affine.has(r.genre)) score += 3
      if (r.units.some((u) => current.units.includes(u))) score += 2
      if (r.popular) score += 1
      if (r.featured) score += 0.5
      return { r, score }
    })
    .sort((a, b) => b.score - a.score)
    .map((s) => s.r)
    .slice(0, Math.max(limit, 0))
}
