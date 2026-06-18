# HANDOFF — PROJETO 60 MINUTOS · v3
**Cole este documento no início do novo chat para continuidade total.**
Data: 18/06/2026 · Conversa anterior: rodadas de refinamento do v0 (código já gerado e em produção)

---

## QUEM / O QUÊ

Erickson = GM da 60 Minutos Escape Game (4 unidades: Píer 21, ParkShopping, Taguatinga — Brasília; Santa Úrsula — Ribeirão Preto, fundada em **2016**, "10 anos de história") e dev do projeto via Barbera Solutions. Projeto: substituir o site Wix por ecossistema Next.js 14 completo. Metodologia SDD. Erickson usa áudio transcrito, português informal, pede feedback honesto e direto sempre, e está monitorando custo do v0 de perto (já gastou bastante do plano $30/mês) — **priorizar resolver tudo em conversa antes de gerar prompt, mandar só prompts cirúrgicos prontos pra colar**.

## ONDE ESTAMOS AGORA

Saímos do v0.dev de prototipagem pura — **já existe código real gerado** (Next.js, componentes em `/components`, dados em `/data/rooms.ts`), publicado em `home-do-escape-game.vercel.app`. Várias rodadas de ajuste cirúrgico já passaram. Estamos na fase de polimento fino da home antes de avançar para páginas novas (`/salas` dedicada e `/ranking`, ainda não criadas).

⚠️ Este chat chegou ao limite de imagens (84/100) — migração por isso, não por fim de etapa. Há ajustes EM ANDAMENTO que não foram confirmados como resolvidos (ver pendências).

## DECISÕES DE DESIGN FECHADAS (não reabrir)

Todas as decisões da v2 continuam válidas (tese anti-terror, grande inversão, cores Void/Blood/Gold com dourado ~6% máx, tipografia Anton+Montserrat, SEO híbrido, etc.) — **ver PRD v1.3 para o documento completo**. Adições desta fase:

- **Sem travessão de pausa dramática em copy** (regra nova no PRD §4.1.1) — trocar por ponto/dois-pontos. Já corrigido em ~13 pontos do site nesta rodada.
- **Vitrine home (8 salas) ≠ catálogo completo.** Botão "Ver todas as 16 salas" hoje é âncora vazia (`href="#salas"`) — vai virar navegação real para página `/salas` dedicada (não criada ainda). Mesma lógica para "Ver ranking completo" do Kings (`href="#ranking"`, também vazio) → futura `/ranking`.
- **Cryptex (countdown do hero) foi REMOVIDO.** Decisão de simplificar; Erickson vai pensar em substituto depois. Hero hoje deve estar só com a foto de fundo, sem elemento circular sobreposto.
- **Kings of the Escape reestruturado:** virou carrossel por LOJA (não mais 3 cards fixos). Leque de cards varia de tamanho conforme nº de salas da loja (Píer 21 e ParkShopping = 7, Santa Úrsula = 6, Taguatinga = 2). Autoplay 6s + pausa 10s ao interagir. Card "sem recordista" para salas sem dado no mês. Hover-to-front restaurado (cards saem da rotação e vêm pra frente ao passar mouse). Dados são FICTÍCIOS por enquanto, fiéis à matriz real de sala-por-loja (ver spec).
- **Prime mantém paleta Void/Blood/Gold** (testamos referência colorida tipo SaaS — rejeitada por fugir da identidade aprovada pelos sócios). Ganho visual vem dos 3 ÍCONES REAIS dos planos (joias fornecidas por Erickson, fundo preto removido via chroma key) — já entregues como PNG transparente para upload direto.
- **WhatsApp flutuante:** central única (Erickson vai montar depois, número placeholder por ora). Comportamento esperado: ícone circular que expande com pílula "Fala com a gente" por alguns segundos e RECOLHE — **ainda não está funcionando direito, ver pendências**.
- **Logo animada (cadeado abrindo no hover):** ✅ resolvida com sucesso usando a peça VETORIAL REAL extraída do arquivo `.ai` de Erickson (não recriada) — ver seção própria abaixo.
- **Slogan da marca identificado:** "Sempre há uma saída" — Erickson confirmou que tem relação direta com a história/identidade da marca. Ainda não decidido onde aplicar no site (sugestões dadas: logo/footer, sub-linha do hero, tela de vitória do jogo, página Quem Somos). Pendente de decisão final de onde usar.
- **Guia de identidade visual resumido criado** (`guia_identidade_visual_60min.md`) — documento separado do PRD, em linguagem não-técnica, para uso em peças de Instagram/redes sociais. Cobre cores com proporção, regra do dourado como tempero, tipografia, regra "moldura clara + conteúdo com personalidade", o que evitar, e elementos de marca reaproveitáveis.

## LOGO ANIMADA — CASO RESOLVIDO (referência técnica)

Processo (relevante se for refazer animação parecida em outro elemento):
1. Arquivo `.ai` é PDF por dentro — abrir com PyMuPDF (`fitz`), não precisa Illustrator.
2. **Erro cometido na 1ª tentativa:** recriar a argola do cadeado desenhando um SVG do zero por aproximação visual. Erickson rejeitou corretamente — "ficou totalmente diferente do logo original".
3. **Solução correta:** extrair a peça vetorial REAL via `page.get_drawings()`, identificar o path exato do cadeado (cor de fill única, bbox específica), reconstruir em canvas isolado a partir dos pontos/bezier originais (não da renderização rasterizada, que continha linhas de guia do Illustrator inseparáveis por simples crop).
4. Separar argola/corpo por análise de perfil de largura (`row_widths`) — o "ombro" onde a argola se funde ao corpo aparece como salto brusco de largura.
5. Animação: `transform` como ATRIBUTO SVG ou dentro de `<g>` com `translate(pivot) rotate() translate(-pivot)` funciona universalmente. `transform-origin` em CSS `style` teve comportamento inconsistente nos testes estáticos (cairosvg) — recomendado testar a versão final direto em navegador real antes de aprovar.
6. Arquivo final: `logo_60_cadeado_REAL_animado.svg` — SVG com 3 camadas embutidas em base64 (fundo, argola, corpo), animação CSS de hover (argola abre ~35°). Erickson aprovou o resultado. Pediu também uma versão "fecha com descida e retorno elástico" — **decidiu fazer essa parte no After Effects e enviar depois**, não prosseguir por aqui.
7. Sombra diagonal da logo é preto puro (`#000`) por design original — não é bug de extração (confundiu numa comparação sobre fundo claro; sobre fundo escuro/preto do navbar real, funde perfeitamente).
8. Import no v0 deve ser SVG inline no JSX (não `<img src>`), senão o CSS interno da animação não funciona.

## CÓDIGO — ESTRUTURA ATUAL (do zip baixado nesta fase)

Repo Next.js com: `components/{hero,navbar,room-card,room-catalog,prime-plans,kings-of-escape,party-business,how-it-works,social-proof,promo-bar,footer,difficulty-meter,cryptex-countdown(removido),reveal}.tsx`, `data/rooms.ts`, `app/{page.tsx,layout.tsx,globals.css}`. Link do v0: `https://v0.app/chat/home-do-escape-game-bMoD0yIDnK7`. Deploy: `https://home-do-escape-game.vercel.app/`.

Assets já no projeto: `/public/posters/` (16 pôsteres com nomes em kebab-case), `/public/prime/` (pins + ícones novos), `/public/kings/` (placeholders team-1/2/3.png).

## PENDÊNCIAS ABERTAS — EM ORDEM DE PRIORIDADE

1. **[EM ANDAMENTO] Botão WhatsApp** — já tentamos corrigir 2x (formato oval→circular ok; lógica de expandir-e-recolher pedida mas Erickson não confirmou se já funciona). PRÓXIMO PASSO no novo chat: perguntar estado atual; se ainda travado aberto, reescrever prompt em termos técnicos explícitos (`useState` + `setTimeout`), não pedir "corrija a lógica" de novo.
2. **[EM ANDAMENTO] Cativeiro** — Erickson está recriando o pôster (de novo) por conta própria; vai subir direto no v0 quando pronto. Não precisa de prompt.
3. **[NÃO CONFIRMADO] Rodada de 4 ajustes** (espaçamento do hero, campo `posterPosition` por sala nos dados, aplicar em Cativeiro/Casa do Will/Devorador) — prompt foi entregue, Erickson não confirmou execução nem resultado.
4. **[FUTURO] Página `/salas` dedicada** — reaproveitar lógica de filtro de `room-catalog.tsx`. Maior prompt da fila, rodar isolado.
5. **[FUTURO] Página `/ranking` completa** — para onde "Ver ranking completo" do Kings deve apontar; resolve definitivamente a queixa de recordista "não aparecer".
6. **[ERICKSON] Vídeos** (hero 1ª pessoa, educativo todos-os-públicos, depoimentos da prova social) — todos os slots usam imagem estática por ora, estrutura pronta pra receber vídeo depois.
7. **[ERICKSON] Decidir onde aplicar o slogan "Sempre há uma saída"**.
8. **[FUTURO] Cartazes verticais 2:3 via IA** para K13, Museu, FNAF (Cativeiro está sendo refeito agora).
9. **[PRD] Aplicar todos os deltas já registrados em `spec_filtro_decisoes_v1.md`** ao PRD principal (parcialmente já feito na v1.3).

## ARQUIVOS PRA TER EM MÃOS NO NOVO CHAT

1. Este handoff
2. `prd_v1_3.md` — PRD completo atualizado
3. `spec_filtro_decisoes_v1.md` — spec do filtro + decisões de rodadas + prompts já usados (histórico)
4. `cartazes_definitivos_16.zip` — pôsteres oficiais com slugs padronizados
5. `logo_60_cadeado_REAL_animado.svg` — logo animada aprovada
6. `guia_identidade_visual_60min.md` — guia de marca para peças sociais
7. Link do v0 e link do deploy (acima) — se possível, screenshot atual do estado do site

## COMO RETOMAR

No novo chat, cole este handoff e diga em que ponto está. Pontos mais provavelmente em aberto: confirmar se o WhatsApp já recolhe certo, trazer print do Cativeiro novo pra eu processar/validar, ou avançar para a página `/salas`. Continuar regra de ouro: fechar decisão em conversa ANTES de gerar prompt pro v0, prompts sempre cirúrgicos e, quando possível, agrupados para economizar gerações.
