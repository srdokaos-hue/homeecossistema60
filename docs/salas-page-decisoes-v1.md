# Decisões da página /salas — v1

Sessão de planejamento feita fora do Claude Code (chat de decisões de produto/design). Este documento é o "handoff" de tudo que foi travado e ainda não está implementado. Ler antes de tocar em qualquer coisa relacionada a `/salas`.

## Escopo desta rodada
Só a página de **catálogo** (`/salas`, lista com filtro, todas as 16 salas). A página individual da sala (`/salas/[slug]`) **fica pra próxima sessão** — ainda não existe, e os cards do catálogo vão linkar pra lá mesmo sem ela existir ainda (link quebrado aceito conscientemente por enquanto).

## Filtro
- Reaproveita a lógica de `components/room-catalog.tsx` como já está (gênero, unidade, jogadores, tags, regra nunca-zero). **Não adiciona** dimensão de dificuldade como filtro de UI por agora, mesmo o spec original prevendo isso — foi decisão consciente de não priorizar.
- Remove o limite de exibição (hoje fixo em 8 / `SHOWCASE_LIMIT`) — mostra todas as salas que baterem com o filtro, até 16.
- **Sem filtro ativo**: ordena por tema, agrupado `Aventura → Investigação → Suspense` (não usa o `HOME_SHOWCASE_ORDER` curado da home, que é exclusivo da vitrine de 8). Nenhum filtro vem pré-marcado/pré-selecionado.
- **Filtro na URL**: só para 3 dimensões — gênero, unidade, dificuldade (mesmo a dificuldade não sendo filtro de UI ainda, já deixar a estrutura de URL preparada pra quando entrar). Tags (família, não assusta, populares, 12+) e jogadores ficam só em estado local (`useState`), **não vão pra URL** — são mais voláteis (tag "Novidade" é toggle de admin via CMS conforme `spec_filtro_decisoes_v1.md`), enquanto gênero/unidade/dificuldade são taxonomia fixa e batem com as páginas de categoria que o PRD já cita como oportunidade futura (`/salas/aventura`, `/unidades/[unidade]`).
- **Colunas do grid**: mantém os breakpoints atuais (2 colunas tablet pequeno, 4 no desktop) — só tira o slice de 8, mostra tudo.

## Card novo — só pra essa página, NÃO mexe no card da home
Componente novo e separado do `RoomCard` atual (que continua intocado, usado só na vitrine da home). Grid 2 colunas desde mobile (375px+).

- **Sem título sobreposto** — a arte do pôster já tem o nome da sala estampado, repetir é redundante e arrisca cortar em nomes longos.
- **4 cantos com tag, sobre a própria imagem do pôster**:
  - Superior esquerdo: idade (`Livre` / `12+`) — pílula sólida dourada (igual já é hoje no `AgeBadge`)
  - Superior direito: jogadores — ícone de pessoa + range numérico (ex: "2–6"), pílula escura translúcida
  - Inferior esquerdo: gênero (texto curto, ex: "Aventura"), pílula escura translúcida
  - Inferior direito: dificuldade — cadeados 1–5, reaproveitando o `DifficultyMeter` existente, dentro de pílula escura translúcida
- **Selo especial** (só Cativeiro "A Mais Jogada" e Projeto Chronnos "2 Jogos em 1"): empilhado **acima** da tag de gênero, no mesmo canto inferior esquerdo. Não aparece nos outros 14 cards. Reaproveita o gradiente diagonal vermelho/azul que o `DualGameBadge` atual já usa.
  - ⚠️ Testado e confirmado: NÃO empilhar selo embaixo do badge de idade (canto superior esquerdo) — o título de alguns pôsteres (ex: Projeto Chronnos) fica bem no topo da arte e um selo ali tampa o nome. O canto inferior esquerdo é seguro porque a parte de baixo do pôster nunca tem título.
- **Faixa inferior** (gradiente escuro, já existente): só local/unidade, com ícone de pin. Sem preço, sem jogadores/gênero ali (isso virou tag de canto).
- **Sem botão "Reservar"** — o card inteiro é clicável, leva pra `/salas/[slug]`.
- Regra nunca-zero reaproveitada (mesma lógica de sugestão entre unidades já existente), mas o resultado sugerido também deve usar esse card novo, não o card antigo da home.

## Atmosfera de fundo / ícones flutuantes — ⏸️ PENDENTE, NÃO IMPLEMENTAR AINDA
Conceito aprovado, mas **aguardando assets finais do Erickson** antes de qualquer código.

- Ideia descartada: atmosfera modulada por zona de tema (dourado→sombrio conforme rola). Motivo do descarte: filtro pode embaralhar a ordem dos cards (ex: só "Suspense" filtrado), quebrando a lógica de zona fixa por posição de scroll.
- Direção aprovada: **poucos** ícones genéricos do universo escape (não ligados a franquia nem a sala específica) soltos nas margens do catálogo inteiro, baixa opacidade (~10–16%), flutuando bem devagar (translateY leve, ciclo ~8–9s), posição fixa independente de filtro/scroll.
- Fonte dos ícones: reaproveitar o pattern de marca já existente (`Fachada_pattern`), não criar ilustração nova do zero. Candidatos já testados em mockup: "60" com cadeado (marca), chave, lupa, labirinto, baú — outros disponíveis no pattern: machado, lâmpada-engrenagem, caveira, cérebro, dados.
- Posicionamento: nas margens/gutters, fora da área ocupada pelos cards (testado e confirmado que ícone atrás de card fica escondido, e posição mal calculada pode cortar pelo `overflow`).
- **Aguardando**: Erickson vai gerar os PNGs finais com fundo transparente dos ícones escolhidos e enviar em sessão futura. Só implementar quando os assets estiverem prontos — não usar os recortes de teste feitos no chat de planejamento, esses eram só pra validar o conceito.
