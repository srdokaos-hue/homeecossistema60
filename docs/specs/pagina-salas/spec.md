# ETAPA 2 — Spec: Página /salas (catálogo completo)

Documento tático do SDD. Define o path exato, a responsabilidade e os snippets de referência de cada arquivo a criar/modificar. Resolve as questões em aberto da §6 do `prd.md`.

**Entrada:** `docs/specs/pagina-salas/prd.md` + código verificado em 19/06/2026 (`data/rooms.ts`, `components/room-catalog.tsx`, `components/room-card.tsx`, `components/difficulty-meter.tsx`, `components/section-heading.tsx`, `app/globals.css`, `app/layout.tsx`, `app/page.tsx`).

**Escopo fechado (do PRD):** só a rota `/salas` com as 16 salas, filtro reaproveitado + sync de URL, card novo. FORA: `/salas/[slug]` (link quebrado consciente), atmosfera/ícones de fundo, chip de dificuldade na UI, rotas de unidade.

---

## REVISÃO — decisões do Erickson (19/06/2026, antes da ETAPA 3)

Três respostas que **sobrescrevem** parte do corpo abaixo. Onde houver conflito, vale esta revisão.

1. **Chrome da `/salas`: CONFIRMADO.** Mesma `PromoBar` + `Navbar` + `Footer` do resto do site (resolve o ⚠️ do §8).
2. **`matchesBase`: CONSOLIDAR, sem duplicar.** A home importa de `lib/room-filters.ts` (caminho recomendado no §9; a alternativa "duplicar" fica descartada).
3. **Card enxuto NÃO é exclusivo da `/salas` — a regra final é por BREAKPOINT, não por página.** Isto altera o que o `salas-page-decisoes-v1.md` dizia sobre "não mexer no card da home":
   - **Mobile (home E /salas):** card **enxuto** (`RoomCardCatalog`) — sem título/preço/botão, 4 cantos, clicável p/ `/salas/[slug]`, grid 2 colunas.
   - **Desktop (home E /salas):** card **rico de hoje** (`RoomCard`) — título, tagline, preço, botão "Reservar". **Sem nenhuma mudança visual.** Único delta: a `/salas` mostra as 16 (a home segue em 8).

   **Impacto arquitetural:**
   - Novo componente **`components/room-card-responsive.tsx`**: renderiza os dois cards e alterna por CSS (`sm:hidden` no enxuto / `hidden sm:block` no rico). Usado pelos **dois** catálogos.
   - **Breakpoint escolhido: `sm` (640px).** Motivo: a home hoje já troca de carrossel horizontal → grid no `sm`; cortar o enxuto exatamente aí deixa o desktop **literalmente intocado** (≥640px = idêntico a hoje) e só substitui o carrossel mobile (<640px) por grid 2-col de cards enxutos. *(Ponto a validar visualmente com o Erickson — única ambiguidade que sobrou; ele falou "mobile/desktop" sem px.)*
   - **`components/room-catalog.tsx` (home) passa a mudar mais que 1 linha:** troca o card por `RoomCardResponsive` e o grid mobile (carrossel `overflow-x-auto` → `grid grid-cols-2`). Desktop (`sm:`+) idêntico. Continua limitado a 8.
   - `room-card-catalog.tsx` deixa de ser "exclusivo /salas" — é o card mobile de todo o site.

---

## 0. Resumo das decisões resolvidas nesta Spec

| § PRD | Questão | Decisão para implementar |
|---|---|---|
| 6.1 | Badges compartilhados | Extrair p/ `components/room-badges.tsx`; home (`room-card.tsx`) passa a importar de lá. |
| 6.2 | Tokens das cores novas | Criar em `app/globals.css` (bloco `@theme inline`): `--color-gold-ink` `#3a2e08`, `--color-coral` `#ff5a5f`, `--color-dual-blue` `#1B4FE1`. |
| 6.3 | Dificuldade na URL | `matchesBase` ganha param opcional `difficulty?: number \| null` (default = sem efeito → home intacta). Match **exato** (`room.difficulty === n`). |
| 6.4 | Nomes finais | `app/salas/page.tsx`, `components/room-catalog-full.tsx`, `components/room-card-catalog.tsx`, `components/room-badges.tsx`, `lib/room-filters.ts`. |
| 6.5 | Faixa inferior | Banda **abaixo** do pôster (não overlay), só unidades + pin. No nunca-zero, destaca a unidade via `highlightUnit` (reusa ideia do home). |

**Params de URL (nomes em PT, decididos aqui):** `?genero=` (lista separada por vírgula, multi), `?unidade=` (1 valor), `?dificuldade=` (1 número). Tags e nº de jogadores ficam **só** em `useState` (não vão pra URL) — conforme PRD §5.

---

## 1. Ordem de implementação (dependências)

Implementar arquivo por arquivo, parando p/ validação a cada um (metodologia):

1. `app/globals.css` — tokens novos (base de tudo, sem efeito visual sozinho).
2. `components/room-badges.tsx` — **novo**, extração dos 3 badges com token.
3. `components/room-card.tsx` — **modificar**: importar badges de (2), remover cópias locais.
4. `lib/room-filters.ts` — **novo**, lógica de filtro compartilhável.
5. `components/room-card-catalog.tsx` — **novo**, card do catálogo.
6. `components/room-catalog-full.tsx` — **novo**, client component com filtro + URL.
7. `app/salas/page.tsx` — **novo**, rota (Server Component) + `<Suspense>` + metadata.
8. `components/room-catalog.tsx` — **modificar**: 1 linha (CTA `href`) + importar `matchesBase` da lib.

> Passos 3 e 8 são as **únicas** edições em componentes da home. Ambas previstas no PRD (§6.1, §7). Visual/comportamento da home: idênticos.

---

## 2. `app/globals.css` — tokens novos (MODIFICAR)

**Responsabilidade:** expor 3 cores legadas como token, pra cumprir "código novo usa token".

No bloco `@theme inline` (logo após `--color-ash: #b8b8c0;`, linha ~27), adicionar:

```css
  /* Tons de apoio dos badges/cards (ex-hex legados) */
  --color-gold-ink: #3a2e08;   /* texto sobre dourado (Livre / A Mais Jogada) */
  --color-coral: #ff5a5f;      /* texto do selo 12 anos */
  --color-dual-blue: #1b4fe1;  /* metade azul do gradiente "2 Jogos em 1" */
```

Nada mais muda no CSS. Os utilitários `text-[var(--color-gold-ink)]` etc. passam a existir automaticamente.

---

## 3. `components/room-badges.tsx` — badges compartilhados (NOVO)

**Responsabilidade:** ÚNICA fonte dos 3 badges usados em ambos os cards. Markup idêntico ao atual de `room-card.tsx`, só trocando os 3 hex por token. Sem lógica de filtro, sem layout de card.

```tsx
import type { Room } from "@/data/rooms"

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

export function TopPlayedBadge() {
  return (
    <span className="rounded-full bg-[var(--color-gold)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-gold-ink)] shadow-[0_2px_10px_rgba(212,175,55,0.4)]">
      A Mais Jogada
    </span>
  )
}
```

> `CardTag` (tag-atalho cinza) **fica** em `room-card.tsx` — é exclusiva da home, não vai pro card do catálogo.

---

## 4. `components/room-card.tsx` — home (MODIFICAR)

**Responsabilidade:** inalterada. Só deixa de declarar os 3 badges localmente e passa a importá-los.

- Remover as funções locais `AgeBadge`, `DualGameBadge`, `TopPlayedBadge` (linhas ~6–41).
- Adicionar import no topo:
  ```tsx
  import { AgeBadge, DualGameBadge, TopPlayedBadge } from "@/components/room-badges"
  ```
- Manter `CardTag`, `DISPLAY_TAGS` e todo o resto **intactos**. Resultado visual = pixel-idêntico (mesmo markup, agora com token que resolve pro mesmo hex).

---

## 5. `lib/room-filters.ts` — lógica de filtro compartilhável (NOVO)

**Responsabilidade:** centralizar o predicado de filtro pra home e /salas não duplicarem. SÓ funções puras — sem JSX, sem estado.

```tsx
import { rooms, roomHasTag, type Room, type RoomGenre, type RoomTag } from "@/data/rooms"

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
```

> `roomsByGenreOrder` resolve o problema do PRD §2 (escape-story fora de ordem no array) sem reordenar `data/rooms.ts`.

---

## 6. `components/room-card-catalog.tsx` — card do catálogo (NOVO)

**Responsabilidade:** card pôster-first, card inteiro = link, sem título/preço/botão. 4 cantos sobre o pôster + faixa de unidade abaixo.

**Layout:**
- Raiz: `<Link href={/salas/${room.slug}} aria-label={room.name}>` envolvendo `<article>` (link quebrado consciente; `aria-label` obrigatório porque não há título textual — PRD §8).
- Bloco pôster `relative aspect-[4/5] overflow-hidden` (mesmo aspect da home p/ não recortar pôsteres atuais). `Image fill`, `objectPosition: room.posterPosition ?? "top"`, gradiente na base.
- 4 cantos absolutos sobre o pôster:
  - **↖ top-left:** `<AgeBadge>` (pílula dourada sólida / coral 12+).
  - **↗ top-right:** pílula escura translúcida → `minPlayers–maxPlayers` + ícone `Users`.
  - **↙ bottom-left:** coluna empilhada — selo especial (`TopPlayedBadge`/`DualGameBadge`, se houver) **acima** da pílula de gênero (escura translúcida).
  - **↘ bottom-right:** `<DifficultyMeter level={room.difficulty} />`.
- Faixa inferior (banda separada, `bg-[var(--color-carbon)]`): `MapPin` + unidades (`room.units.map(UNIT_LABELS).join(" · ")`). Quando `highlightUnit`, fundo/texto dourado como na home.

**Pílula escura translúcida (helper local `CornerPill`):**
```tsx
"flex items-center gap-1 rounded-full bg-[rgba(10,10,10,0.7)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm"
```

**Skeleton:**
```tsx
import Image from "next/image"
import Link from "next/link"
import { MapPin, Users } from "lucide-react"
import { UNIT_LABELS, type Room } from "@/data/rooms"
import { DifficultyMeter } from "@/components/difficulty-meter"
import { AgeBadge, DualGameBadge, TopPlayedBadge } from "@/components/room-badges"

export function RoomCardCatalog({
  room,
  highlightUnit,
}: {
  room: Room
  highlightUnit?: boolean
}) {
  return (
    <Link
      href={`/salas/${room.slug}`}
      aria-label={room.name}
      className="group block focus-visible:outline-none"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-[14px] bg-[var(--color-carbon)] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(0,0,0,0.55)]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={room.poster || "/placeholder.svg"}
            alt=""
            fill
            sizes="(max-width: 1024px) 50vw, 24vw"
            style={{ objectPosition: room.posterPosition ?? "top" }}
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-void)] to-transparent" />

          {/* ↖ idade */}
          <div className="absolute left-2.5 top-2.5">
            <AgeBadge age={room.age} />
          </div>
          {/* ↗ jogadores */}
          <div className="absolute right-2.5 top-2.5">
            <span className="flex items-center gap-1 rounded-full bg-[rgba(10,10,10,0.7)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm">
              <Users className="size-3" />
              {room.minPlayers}–{room.maxPlayers}
            </span>
          </div>
          {/* ↙ selo especial + gênero */}
          <div className="absolute bottom-2.5 left-2.5 flex flex-col items-start gap-1.5">
            {room.topPlayed && <TopPlayedBadge />}
            {room.dualGame && <DualGameBadge />}
            <span className="rounded-full bg-[rgba(10,10,10,0.7)] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-white backdrop-blur-sm">
              {room.genre}
            </span>
          </div>
          {/* ↘ dificuldade */}
          <div className="absolute bottom-2.5 right-2.5 rounded-full bg-[rgba(10,10,10,0.7)] px-2 py-1 backdrop-blur-sm">
            <DifficultyMeter level={room.difficulty} />
          </div>
        </div>

        {/* faixa inferior: só unidade */}
        <div
          className={
            highlightUnit
              ? "flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-semibold text-[var(--color-gold)]"
              : "flex items-center gap-1.5 px-3 py-2.5 text-[10px] text-[var(--color-ash)]"
          }
        >
          <MapPin className="size-3 shrink-0 text-[var(--color-gold)]" />
          <span className="truncate">
            {room.units.map((u) => UNIT_LABELS[u] ?? u).join(" · ")}
          </span>
        </div>
      </article>
    </Link>
  )
}
```

**Atenção (PRD §8):** validar visualmente que ↗ (jogadores) não cobre título impresso no pôster; ↙/↘ ficam na parte baixa (área segura). Pílulas devem respeitar o `rounded`/`overflow-hidden` — testar que não vazam.

---

## 7. `components/room-catalog-full.tsx` — catálogo /salas (NOVO)

**Responsabilidade:** Client Component. Filtro reaproveitado (gênero, tags, unidade, jogadores) + **sync de URL** (gênero/unidade/dificuldade) + **sem limite** (16) + **ordenação por gênero** + grid 2-col desde 375px. Renderiza `RoomCardCatalog`. NÃO toca `room-catalog.tsx`.

**Imports-chave:**
```tsx
"use client"
import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GENRES, rooms, TAGS, UNIT_LABELS, UNITS, type RoomGenre, type RoomTag } from "@/data/rooms"
import { matchesBase, roomsByGenreOrder } from "@/lib/room-filters"
import { Eyebrow, SectionTitle } from "@/components/section-heading"
import { RoomCardCatalog } from "@/components/room-card-catalog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { cn } from "@/lib/utils"
```

**Estado inicial vindo da URL (montagem):**
```tsx
const router = useRouter()
const params = useSearchParams()

const initialGenres = (params.get("genero")?.split(",").filter(Boolean) ?? []) as RoomGenre[]
const initialUnit = params.get("unidade") ?? "all"
const initialDifficulty = params.get("dificuldade") ? Number(params.get("dificuldade")) : null

const [genres, setGenres] = useState<RoomGenre[]>(initialGenres)
const [unit, setUnit] = useState<string>(initialUnit)
const [difficulty] = useState<number | null>(initialDifficulty) // sem UI ainda; só leitura
const [tags, setTags] = useState<RoomTag[]>([])        // só useState (não vai pra URL)
const [players, setPlayers] = useState<string>("all")  // só useState
```

**Escrita na URL** — helper que reflete gênero/unidade/dificuldade após cada mudança, sem empilhar histórico nem rolar a página:
```tsx
function syncUrl(next: { genres?: RoomGenre[]; unit?: string; difficulty?: number | null }) {
  const g = next.genres ?? genres
  const u = next.unit ?? unit
  const d = next.difficulty ?? difficulty
  const sp = new URLSearchParams()
  if (g.length) sp.set("genero", g.join(","))
  if (u !== "all") sp.set("unidade", u)
  if (d != null) sp.set("dificuldade", String(d))
  const qs = sp.toString()
  router.replace(qs ? `/salas?${qs}` : "/salas", { scroll: false })
}
```
- `toggleGenre`/`setUnit` chamam `syncUrl(...)` com o novo valor. `toggleTag`/`setPlayers` **não** chamam (ficam fora da URL).

**Contadores:** mesma lógica do `room-catalog.tsx` (`genreCounts`, `tagCounts`, `unitCounts`), mas passando `difficulty` ao `matchesBase` para que reflitam o filtro de URL ativo. Cada contador ignora a própria dimensão (manter UX).

**Resultado (useMemo) — sem `HOME_SHOWCASE_ORDER`, sem `.slice`:**
```tsx
const result = useMemo(() => {
  const base = roomsByGenreOrder().filter((r) => matchesBase(r, genres, tags, players, difficulty))
  const primary = unit === "all" ? base : base.filter((r) => r.units.includes(unit))
  const suggestions =
    unit !== "all" && primary.length === 0
      ? base.filter((r) => !r.units.includes(unit)) // nunca-zero
      : []
  return { primary, suggestions }
}, [genres, tags, unit, players, difficulty])
```
> Sem filtro algum → `base` = as 16 na ordem Aventura→Investigação→Suspense (PRD). Não há vitrine curada aqui.

**Grid (≠ home — 2 col desde a base, sem scroll horizontal):**
```tsx
<div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
  {result.primary.map((room) => (
    <RoomCardCatalog key={room.slug} room={room} />
  ))}
</div>
```
Bloco nunca-zero: mesma mensagem honesta do home ("Não temos essa combinação em {UNIT_LABELS[unit]}…") + grid de `result.suggestions` com `<RoomCardCatalog ... highlightUnit />`.

**Cabeçalho:** `Eyebrow` + `SectionTitle` (ex.: "TODAS AS *16 SALAS*"). Linha de filtros: chips de gênero (com contador) + `Select` unidade + `Select` jogadores + linha de tags — **reaproveitar markup do `room-catalog.tsx`** (mesmas classes), trocando os handlers pelos que chamam `syncUrl` onde aplicável.

**Sem** CTA "ver todas" (já estamos na página completa).

---

## 8. `app/salas/page.tsx` — rota (NOVO)

**Responsabilidade:** Server Component da rota `/salas`. `generateMetadata` único (PRD §30A.3), chrome da página, e `<Suspense>` em volta do catálogo (obrigatório: `useSearchParams` exige boundary no App Router).

```tsx
import type { Metadata } from "next"
import { Suspense } from "react"
import { PromoBar } from "@/components/promo-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { RoomCatalogFull } from "@/components/room-catalog-full"

export const metadata: Metadata = {
  title: "Todas as Salas — 16 Aventuras | 60 Minutos Escape Game",
  description:
    "Conheça as 16 salas temáticas do 60 Minutos em 4 unidades. Filtre por gênero, unidade e número de jogadores e encontre a aventura certa pra sua equipe.",
  alternates: { canonical: "/salas" },
}

export default function SalasPage() {
  return (
    <>
      <PromoBar />
      <Navbar />
      <main className="bg-[var(--color-cream)]">
        <Suspense fallback={null}>
          <RoomCatalogFull />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
```

> ⚠️ **Confirmar com Erickson:** incluir `PromoBar`/`Navbar`/`Footer` na `/salas` (default de página standalone). O PRD não cita o chrome explicitamente — assumido por ser rota navegável própria. Se a decisão for outra, ajustar só este arquivo.

> `RoomCatalogFull` já abre com `<section className="bg-[var(--color-cream)] ...">` próprio; o `bg` no `<main>` é só fallback. Conferir que não há faixa dupla de fundo.

---

## 9. `components/room-catalog.tsx` — home (MODIFICAR)

**Responsabilidade:** inalterada. Duas edições cirúrgicas:

1. **CTA (PRD §7):** linha ~271, trocar `href="#salas"` → `href="/salas"` no link "Ver todas as 16 salas".
2. **DRY do filtro:** remover a função local `matchesBase` (linhas ~36–47) e importar da lib:
   ```tsx
   import { matchesBase } from "@/lib/room-filters"
   ```
   As chamadas existentes (`matchesBase(r, [], tags, players)` etc.) seguem válidas — o 5º param `difficulty` é opcional e fica ausente, preservando o comportamento.

> Edição 2 é a única "extra" além do href confirmado no PRD §7. Está coberta pela intenção do PRD §3 ("matchesBase — extrair p/ módulo compartilhável"). **Se Erickson preferir não tocar a home além do href**, alternativa: manter o `matchesBase` local na home e usar a cópia da lib só na `/salas` (pequena duplicação, risco zero na home). Decidir antes do passo 8 da ordem.

---

## 10. Checklist de verificação (antes do `/review`)

- [ ] `pnpm build` / `pnpm dev` sem erro de tipo (params da URL, imports).
- [ ] `/salas` sem filtro → 16 cards na ordem Aventura → Investigação → Suspense.
- [ ] Grid em **2 colunas a partir de 375px**, 4 colunas no desktop, sem scroll horizontal.
- [ ] Filtrar gênero/unidade → a URL atualiza (`?genero=`, `?unidade=`); recarregar mantém o estado.
- [ ] Acessar `/salas?dificuldade=5` direto → lista filtrada só pelas salas dificuldade 5, sem chip visível.
- [ ] Tags e nº de jogadores **não** aparecem na URL.
- [ ] Unidade que zera (ex.: Taguatinga + Suspense) → mensagem nunca-zero + sugestões com `RoomCardCatalog highlightUnit`.
- [ ] Card inteiro clicável; `/salas/[slug]` dá 404 (esperado); `aria-label` com o nome lido por leitor de tela.
- [ ] 4 cantos não cobrindo título do pôster (validar Cativeiro, Casa do Will, FNAF, K-13).
- [ ] Home: vitrine de 8 e card da home **visualmente idênticos** ao anterior; CTA agora vai pra `/salas`.
- [ ] Sem hex avulso em código novo (só tokens; exceções `rgba(10,10,10,0.7)` translúcido e sombras seguem padrão já usado no projeto).

---

**Próximo passo:** rodar `/clear` e iniciar ETAPA 3 (Implementação), colando este `spec.md`. Implementar na ordem da §1, parando p/ validação a cada arquivo. `/review` antes de qualquer deploy.
