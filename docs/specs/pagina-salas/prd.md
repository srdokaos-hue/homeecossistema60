# ETAPA 1 — Pesquisa: Página /salas (catálogo completo)

Saída da fase de Pesquisa do SDD. Documenta o que JÁ existe no código, o que reaproveitar, o que criar e as questões em aberto pra ETAPA 2 (Spec). **Não contém código de implementação** — é o levantamento.

Fontes cruzadas: `docs/salas-page-decisoes-v1.md` (autoritativo p/ esta rodada), `docs/prd_v1_3.md` (§6, §30A), `docs/spec_filtro_decisoes_v1.md`, `docs/metodologia_desenvolvimento.md`.

---

## 1. Objetivo e escopo

Criar a rota `/salas` = catálogo completo das **16 salas** com o filtro existente, sem limite de 8. Card visual **novo e separado** do da home.

**Fora de escopo nesta rodada (decisão explícita no doc de decisões):**
- Página individual `/salas/[slug]` — fica pra próxima sessão. Os cards linkam pra ela mesmo sem existir (link quebrado aceito conscientemente).
- Atmosfera de fundo / ícones flutuantes — ⏸️ aguardando assets finais do Erickson. NÃO implementar.
- Filtro de dificuldade na UI — fora; só a estrutura de URL é preparada.
- Rotas `/salas/[sala]/[unidade]`, `/unidades/...` — não nesta rodada.

---

## 2. Inventário do código existente (verificado em 19/06/2026)

### `data/rooms.ts` — modelo de dados (COMPLETO, nada novo necessário)
- `interface Room`: `slug, name, tagline, genre, age, minPlayers, maxPlayers, units[], priceFrom, poster, posterPosition?, difficulty, family, scares, popular, dualGame?, topPlayed?, featured?`.
- 16 salas no array `rooms`. Confere com a tese (4 são `age: "12 anos"`: cativeiro, matadouro, fnaf, ameaca-zumbi).
- `GENRES = ["Todas","Aventura","Investigação","Suspense"]`.
- `TAGS = ["Pra família","Não assusta","Populares","12+"]`.
- `UNITS = ["Píer 21","ParkShopping","Taguatinga","Santa Úrsula"]` (nomes de exibição, **não slugs**).
- `UNIT_LABELS`: mapa nome→rótulo (ex: Taguatinga → "Taguatinga · Pocket").
- `HOME_SHOWCASE_ORDER`: 8 slugs curados — EXCLUSIVO da vitrine da home, **não usar na /salas**.
- `roomHasTag(room, tag)`: resolve tag → campo booleano (family/scares/popular/age).
- ⚠️ **Não há campo nem slug de unidade** (`pier-21`, etc.). Só será necessário nas rotas de unidade (fora desta rodada).
- ⚠️ **Não há ordenação por gênero pronta**; `escape-story` (Aventura) está fisicamente entre as de Investigação no array (linha ~213).

### `components/room-catalog.tsx` — filtro da HOME (a referência a reaproveitar)
- `"use client"`, estado 100% local via `useState`: `genres[], tags[], unit, players`. **Zero sync com URL.**
- `matchesBase(room, genres, tags, players)`: aplica gênero + tags + jogadores (NÃO aplica unidade, NÃO aplica dificuldade).
- Contadores reativos: `genreCounts`, `tagCounts`, `unitCounts` (cada um ignora a própria dimensão — bom UX, manter).
- `result` (useMemo):
  - **Sem filtro** → usa `HOME_SHOWCASE_ORDER.slice(0,8)` (curadoria da home).
  - **Com filtro** → `matchesBase` + filtro de unidade.
  - **Regra nunca-zero**: se unidade filtra e zera, sugere as mesmas salas em outras unidades (`base.filter(!includes(unit))`).
- Render: eyebrow + título, linha de filtros (chips de gênero + selects unidade/jogadores), linha de tags, grid, CTA.
- Grid atual: mobile = scroll horizontal (`flex` + `w-[78%]`), `sm:grid-cols-2`, `lg:grid-cols-4`, fatiado em `SHOWCASE_LIMIT` (8).
- Usa `<RoomCard>` (card da home).
- CTA final "Ver todas as 16 salas" → `href="#salas"` (**âncora quebrada**; deve virar `/salas`).
- `section id="salas"` com `bg-cream`.

### `components/room-card.tsx` — card da HOME (NÃO TOCAR)
- Layout vertical: pôster `aspect-[4/5]` no topo + bloco de conteúdo com nome, tagline, tags, metadados, unidade, **preço** e **botão "Reservar"**.
- Badges canto sup. esquerdo: `AgeBadge`, `DualGameBadge` (gradiente vermelho→azul `#1B4FE1`), `TopPlayedBadge` ("A Mais Jogada", dourado).
- ⚠️ Esses 3 badges + `CardTag` são **funções internas, não exportadas**. Hex sem token: `#3a2e08` (texto dourado escuro), `#ff5a5f` (coral 12+), `#1B4FE1` (azul dual).
- Prop `highlightUnit` (usada pelas sugestões nunca-zero).
- `posterPosition` aplicado via `style={{ objectPosition }}`.

### `components/difficulty-meter.tsx` — REUSAR como está
- `<DifficultyMeter level={1..5} className? />` — 5 cadeados (lucide `Lock`), preenchidos em dourado por token. Acessível (`role="img"`). Serve direto pro canto ↘ do card novo.

### Outros
- `components/section-heading.tsx`: `Eyebrow`, `SectionTitle` (reusar p/ cabeçalho da página).
- `lib/utils.ts`: `cn()`.
- `components/ui/select.tsx`: shadcn Select (reusar nos dropdowns).
- `app/`: só `page.tsx` (home), `layout.tsx`, `globals.css`. **Não há nenhuma subrota ainda** — `/salas` é a primeira.

---

## 3. O que REAPROVEITAR (não recriar)
- `data/rooms.ts` inteiro: `rooms`, `matchesBase` (extrair p/ módulo compartilhável), `roomHasTag`, contadores, lógica nunca-zero.
- `DifficultyMeter` (canto ↘).
- `Eyebrow` / `SectionTitle`, `Select` shadcn, `cn`.
- Visual dos badges de idade / dual / "A Mais Jogada" (ver decisão de extração na §6).

## 4. O que CRIAR novo
1. **`app/salas/page.tsx`** — Server Component da rota; `generateMetadata()` (title/description únicos, §30A.3); renderiza o catálogo.
2. **`components/room-catalog-full.tsx`** (nome a confirmar) — Client Component: filtro reaproveitado + **sync de URL** (gênero/unidade/dificuldade) + sem limite + ordenação por gênero. NÃO mexe no `room-catalog.tsx` da home.
3. **`components/room-card-catalog.tsx`** (nome a confirmar) — card novo com 4 cantos sobre o pôster, sem título/preço/botão, card inteiro clicável p/ `/salas/[slug]`.
4. Possível **`lib/room-filters.ts`** — extrair `matchesBase`/contadores/nunca-zero pra compartilhar entre home e /salas sem duplicar (decisão na §6).

## 5. Decisões do doc → implicação técnica
| Decisão (salas-page-decisoes-v1) | Implicação |
|---|---|
| Sem limite de 8 | Remover `.slice(0, SHOWCASE_LIMIT)`; mostrar até 16. |
| Sem filtro → ordem `Aventura→Investigação→Suspense` | Sort estável por índice de gênero; dentro do gênero, ordem do array. NÃO usar `HOME_SHOWCASE_ORDER`. |
| Nada pré-selecionado | Estado inicial vazio; mas ler da URL na montagem (gênero/unidade/dificuldade). |
| URL só p/ gênero, unidade, dificuldade | `useSearchParams`/`useRouter` p/ essas 3; tags e jogadores ficam só em `useState`. |
| Card 2 colunas desde 375px | Grid `grid-cols-2` desde a base, `lg:grid-cols-4` — sem scroll horizontal mobile (≠ home). |
| 4 cantos: ↖ idade, ↗ jogadores, ↙ gênero, ↘ dificuldade | Overlays absolutos sobre o pôster; ↗↙↘ = pílula escura translúcida; ↖ = pílula dourada sólida. |
| Selo especial acima da tag de gênero (↙) | Empilhar `TopPlayed`/`Dual` acima do gênero no canto inferior esq. (confirmado: ↖ tampa título de alguns pôsteres). |
| Faixa inferior só unidade + pin | Sem preço, sem jogadores/gênero (viraram cantos). |
| Sem "Reservar"; card todo clicável | `<Link href="/salas/[slug]">` no card inteiro. |
| Nunca-zero usa o card NOVO | Sugestões renderizam `room-card-catalog`, não o da home. |

## 6. Decisões resolvidas (Erickson, 19/06/2026) — entram na Spec
1. **Badges compartilhados — RESOLVIDO: extrair + tokenizar.** Mover `AgeBadge`/`DualGameBadge`/`TopPlayedBadge` de `room-card.tsx` para `components/room-badges.tsx` (mesmo markup, só realocar) e reusar nos dois cards. O `room-card.tsx` da home passa a importar de lá — visual idêntico, sem duplicação.
2. **Tokens das cores novas — RESOLVIDO: criar agora no `globals.css`.** `--color-gold-ink` (#3a2e08), `--color-coral` / coral 12+ (#ff5a5f), `--color-dual-blue` (#1B4FE1). Os badges extraídos e o card novo passam a usar token; cumpre a regra "código novo usa token". (Nomes dos tokens a confirmar na Spec.)
3. **Dificuldade na URL — RESOLVIDO: já aplica o filtro.** Se vier `?dificuldade=N`, a lista é filtrada mesmo sem UI de dificuldade. Implica adicionar dificuldade ao predicado de filtro (`matchesBase` ou wrapper) e ler/escrever na URL junto com gênero e unidade. Sem chip de UI ainda — só efeito via URL.
4. **Nomes finais** dos componentes/arquivos novos — definir na Spec (propostas: `app/salas/page.tsx`, `components/room-catalog-full.tsx`, `components/room-card-catalog.tsx`, `components/room-badges.tsx`, talvez `lib/room-filters.ts`).
5. **Faixa inferior:** definir na Spec — provável: mostra as unidades da sala (como hoje); no nunca-zero, destaca a unidade onde existe (reusar ideia do `highlightUnit`).

## 7. Mudança correlata — CONFIRMADA nesta rodada (Erickson, 19/06/2026)
- `room-catalog.tsx` (home) linha ~271: trocar `href="#salas"` → `href="/salas"` no CTA "Ver todas as 16 salas". Entra junto com a entrega da `/salas`.

## 8. Riscos / atenção
- **Posições dos cantos vs. arte do pôster:** alguns pôsteres têm título no topo; ↖ idade é seguro, mas validar visualmente que ↗ jogadores não cobre elemento importante. Parte baixa do pôster é segura (por isso selo+gênero vão em ↙).
- **`overflow-hidden` do card:** overlays absolutos precisam respeitar o `rounded`/recorte; testar que pílulas não vazam.
- **Pôsteres placeholder** (CLAUDE.md): `ameaca-zumbi`, `hora-zero`, `matadouro`, `museu-misterios`, `escape-story` podem ser versões antigas. Não substituir; só não estranhar se a composição do card ficar diferente nessas.
- **Link quebrado consciente:** cards apontam p/ `/salas/[slug]` inexistente → 404 ao clicar até a próxima rodada. Aceito pelo Erickson.
- **Acessibilidade:** card clicável inteiro precisa de `aria-label` (nome da sala) já que não há título textual visível.

---

**Próximo passo:** rodar `/clear` e iniciar ETAPA 2 (Spec) colando este `prd.md` → gerar `docs/specs/pagina-salas/spec.md` com paths exatos e responsabilidade de cada arquivo, resolvendo as questões da §6.
