# 60 MINUTOS — SPEC DO CATÁLOGO/FILTROS + DECISÕES DA RODADA 1 (v0)
Data: 12/06/2026 · Status: aprovado em conversa Erickson × Claude · Alimenta: PRD v1.3 + prompts v0

---

## PARTE 1 — SPEC DO FILTRO DO CATÁLOGO

### Princípios (em ordem de prioridade)
1. **Sala primeiro.** Pesquisa com clientes: unânime — escolhem a sala/tema antes da unidade. O filtro lidera por tema; unidade é refinamento. Valida a arquitetura room-first do PRD.
2. **Nunca zero, nunca sumir.** Nenhuma combinação retorna tela vazia. Combinação sem resultado mostra: mensagem honesta + cards da mesma busca em outras unidades, com badge de unidade em destaque ("Não temos Infantil no Píer 21 — mas o Escape Story te espera em Taguatinga").
3. **Contadores em tudo.** Toda opção de filtro exibe a contagem: "Investigação (4)", "ParkShopping (7)". O usuário sabe o que vai encontrar antes de clicar.
4. **Multi-select combinável** em tema e tags. Unidade e nº de jogadores são single-select.
5. **Formato: pills/chips no topo** (desktop e mobile) + dropdowns compactos para Unidade e Nº de jogadores. **SEM sidebar** (catálogo de 16 itens não justifica; sidebar rouba largura dos pôsteres). No mobile, filtros avançados em bottom sheet.
6. **Grid alinhado à esquerda, cards de largura fixa.** Linhas incompletas se completam com as sugestões de outras unidades (regra 2) — nunca sobra "linha órfã".

### Estrutura de filtros
- **Tema** (multi): Aventura · Investigação · Suspense — *Infantil deixa de ser categoria; Escape Story migra pra Aventura + tags*
- **Unidade** (single): Todas · Píer 21 · ParkShopping · Taguatinga (Pocket) · Santa Úrsula
- **Dificuldade** (multi): escala visual de cadeados 🔒 1–5
- **Nº de jogadores** (single): dropdown
- **Tags-atalho** (multi, linha curta abaixo dos filtros): `Pra família` · `Não assusta` · `Populares` · `12+`

### Sistema de tags — definições
- **Não assusta** = ZERO sustos sonoros. Binária e literal.
- **Tem sustos** (nas 4 salas 12+ que assustam) sempre com microcopy: *"Sustos sonoros e de ambiente. Ninguém te persegue, ninguém te toca."*
- **Regra global (não é tag):** nenhuma sala tem atores/personagens no dia a dia; personagens só em eventos especiais, sempre avisado antes da reserva. Comunicar em: FAQ + seção Como Funciona + páginas das salas que assustam.
- **Clima/atmosfera** não vira tag — é trabalho do pôster, sinopse e página imersiva da sala (grande inversão).
- **Pra família**: salas que funcionam de verdade com crianças (validado pelo GM, não derivado da classificação Livre).
- **Populares**: 7 salas (lista abaixo). Tag filtrável; badge visual destacado SÓ no Cativeiro.
- **Novidade**: nenhuma sala no momento. Tag existe no sistema como toggle de admin (CMS) para futuras salas. ⚠️ Pôster do Chronnos tem selo "Nova Sala" estampado — marketing deve remover na próxima revisão da arte.
- **Universos/franquias** (One Piece, HP, Star Wars...): NÃO viram tag filtrável (exposição jurídica em elemento estrutural). Filtro usa temas genéricos; referências seguem onde sempre estiveram — arte e texto da sala.

### Badges exclusivos (nunca mais de um tipo por card além das tags)
- **"A MAIS JOGADA"** → só Cativeiro (a mais difícil E a mais popular — "entram acorrentados")
- **"2 JOGOS EM 1"** (split vermelho/azul) → só Projeto Chronnos

### Matriz definitiva das 16 salas
| # | Sala | Tema | Idade | 🔒 | Família | Crianças | Sustos? | Popular | Unidades |
|---|------|------|-------|----|---------|----------|---------|---------|----------|
| 01 | Ilha dos Piratas | Aventura | Livre | 3 | ✓ | ✓ | Não | — | ParkShopping · Santa Úrsula |
| 02 | Orbe Mágico | Aventura | Livre | 3 | ✓ | ✓ | Não | ✓ | ParkShopping · Santa Úrsula |
| 03 | Santo Graal | Aventura | Livre | 3 | ✓ | ✓ | Não | — | Píer 21 · Santa Úrsula |
| 04 | Anel do Poder | Aventura | Livre | 4 | ✓ | — | Não | — | ParkShopping |
| 05 | Scape Wars | Aventura | Livre | 3 | ✓ | ✓ | Não | — | ParkShopping |
| 06 | Hora Zero | Investigação | Livre | 3 | ✓ | ✓ | Não | ✓ | Píer 21 · Santa Úrsula |
| 07 | Pandemia K-13 | Investigação | Livre | 4 | ✓ | — | Não | — | Píer 21 |
| 08 | Museu dos Mistérios | Investigação | Livre | 3 | ✓ | ✓ | Não | ✓ | Taguatinga |
| 09 | Projeto Chronnos | Investigação | Livre | 4 | — | — | Não | — | Píer 21 |
| 10 | Escape Story | Aventura* | Livre | 3 | ✓ | ✓✓ | Não | — | Taguatinga |
| 11 | A Casa do Will | Suspense | Livre | 3 | ✓ | ✓ | Não (clima leve) | ✓ | Píer 21 |
| 12 | Devorador de Mentes | Suspense | Livre | 4 | — | — | Não (clima forte) | — | Píer 21 |
| 13 | Cativeiro | Suspense | 12+ | 5 | — | — | SIM | ✓ TOP | Píer 21 · Santa Úrsula |
| 14 | Matadouro | Suspense | 12+ | 5 | — | — | SIM (terror) | — | ParkShopping |
| 15 | FNAF | Suspense | 12+ | 4 | — | — | SIM | ✓ | ParkShopping · Santa Úrsula |
| 16 | Ameaça Zumbi | Suspense | 12+ | 4 | — | — | (cenário tenso, sem tag) | ✓ | ParkShopping |

*Escape Story migra de Infantil → Aventura. Nota: "muito bom pra crianças mas nostálgico pra adultos (Toy Story)".

**Dado estratégico:** "Não assusta" cobre 12 de 16 salas → copy candidata: "12 das nossas 16 salas não têm susto nenhum."

### Conceito Pocket vs Master
- Taguatinga = **Loja Pocket** (2 salas, formato deliberado). Demais = lojas Master.
- Aparece: rótulo no filtro de unidade, identidade na página da unidade, e a grade do filtro Taguatinga completa com sugestões das lojas master vizinhas.

---

## PARTE 2 — DECISÕES DA RODADA 1 (avaliação do v0 + feedback Erickson)

1. **Copy do hero SEM negação.** Sai "Não é terror — é aventura pra todo mundo". Entra a lista de universos provando variedade. Direção: "Piratas, magia, investigação, suspense. 16 histórias, uma missão: escapar em 60 minutos."
2. **Cadeado-countdown** substitui o anel SVG: cadeado antigo de combinação, rodinhas numéricas girando 60:00 → 59:59 → ... CSS/SVG leve, loop, prefers-reduced-motion = estático em 60:00.
3. **Promo bar:** mensagens em rotação (banner blindness), 2–3 variantes FIXAS de cor por tipo de promo (vermelho / claro / dourado), transição suave 6–8s. Admin escolhe promos ativas → módulo CMS no PRD.
4. **10 ANOS de história** (fundação 2016). Corrigir hero stats, trust signals, footer ("desde 2016"). Site gerado dizia 8 — ERRADO.
5. **Prova social = vídeo full-width** de depoimentos reais (frases icônicas: pai do filho que largou o celular, pai e filha reconectados). Poster-first, lazy, mudo por padrão, legendas queimadas, botão de áudio. Trust signals (114k+ · 4.8★ · 10 ANOS) permanecem abaixo. Mata os recortes apechain do briefing v1.1.
6. **Vídeo educativo (Como Funciona):** novo conceito de marketing — mostrar TODOS os públicos jogando (crianças, famílias, adolescentes, adultos, colegas de trabalho). Produção: Erickson + gerente de marketing. Slot continua igual.
7. **Seção 3 passos:** adicionar definição clara do que É escape game (uma frase antes dos passos) + ornamentos temáticos sutis (cadeado, chave, lupa) respeitando protagonista único.
8. **Prime ornamentado:** pins oficiais Ouro/Platina/Elite do zip (banners/), Elite fisicamente mais alto que os vizinhos (é o mais vendido), seção mais rica.
9. **Party/Analysis com pesos diferentes:** Party (ticket R$6–11k) vira seção própria com força; Analysis secundário logo abaixo com linguagem corporativa.
10. **Kings vai pro FINAL da página** (última seção antes do footer), em leque (fan spread) com os cards reais do zip, + CTA de conversão ali.
11. **SEM scroll-snap.** O problema era altura mal calibrada das seções → corrigir com respiro e min-height, não sequestrar o scroll.
12. **Badges de idade dos cards:** conferir se refletem a matriz (4 salas 12+); home mostra os 8 livres/coloridos por tese — correto.

---

## PARTE 3 — DELTAS PARA O PRD v1.3
- §Catálogo: substituir spec de filtros pela Parte 1 deste doc (estrutura, tags, regras nunca-zero/contadores/multi-select, matriz das 16 salas)
- §CMS: novo módulo Promo Bar (admin gerencia mensagens, tipo→cor, ordem, ativação)
- §CMS: tag "Novidade" como toggle de admin por sala
- §Conteúdo: regra global "sem atores no dia a dia" (FAQ + Como Funciona + páginas de sala)
- §Dados: fundação 2016 → "10 anos" em todas as superfícies
- §Unidades: conceito Pocket (Taguatinga) vs Master
- §Backlog/oportunidades: "Edição com atores" como produto premium sazonal (Halloween etc.)
- §Pendências: selo "Nova Sala" no pôster do Chronnos → remover (marketing)
- Prova social: substituir recortes apechain por vídeo de depoimentos (specs item 5 acima)

---

## PARTE 4 — PROMPTS CIRÚRGICOS v2 (Mini/Pro, UM por vez, esperar render entre cada)

**P0 — Assets oficiais (PRIMEIRO de todos):**
> Anexar os 8 pôsteres oficiais das salas da home (01_ilha_dos_piratas, 02_orbe_magico, 03_santo_graal, 05_scape_wars, 08_museu_misterios, 10_escape_story, 06_hora_zero, 04_anel_do_poder) e pedir:
> "Substitua as imagens geradas dos 8 cards de sala pelas artes oficiais anexadas, na ordem: Ilha dos Piratas, Orbe Mágico, Santo Graal, Scape Wars, Museu dos Mistérios, Escape Story, Hora Zero, Anel do Poder. As imagens devem preencher o card com object-cover sem distorcer, proporção vertical de pôster preservada."
> Se o v0 limitar anexos por mensagem, dividir em 2 lotes de 4. Os pôsteres têm o título estampado na arte — se o card duplicar o título por cima da imagem, pedir pra manter o título do card apenas na faixa de informações abaixo do pôster.

**P1 — Hero (copy + respiro + dados):**
> No hero: substitua o parágrafo "Trancados num cenário real... Não é terror — é aventura pra todo mundo." por: "Trancados num cenário real, você e sua equipe resolvem enigmas e desafiam o relógio. Piratas, magia, investigação, suspense — 16 histórias, uma missão: escapar em 60 minutos." Aumente o respiro vertical entre o badge de localização, a headline, o parágrafo e os CTAs (mínimo 24px entre blocos). Corrija o stat "8 ANOS" para "10 ANOS" (de história).

**P2 — Cadeado countdown:**
> No hero, substitua o círculo de countdown por um cadeado de combinação antigo estilizado (SVG/CSS, sem imagens pesadas): corpo de cadeado dourado com rodinhas numéricas mecânicas exibindo MM:SS começando em 60:00 e descendo (59:59, 59:58...) com animação de rolagem vertical suave em cada dígito, 1s por tick. Ao chegar em 00:00, dígitos piscam vermelho 2s e reinicia em 60:00. prefers-reduced-motion: estático em 60:00. O cadeado é decorativo e icônico — não um relógio real.

**P3 — Promo bar:**
> A barra de promoção do topo deve rotacionar entre 2–3 mensagens diferentes (transição fade/slide suave a cada 7s). Cada mensagem tem uma variante fixa de cor: vermelho com texto branco, creme com texto preto, dourado com texto preto. Estrutura preparada pra receber mensagens de um CMS (array de {texto, link, variante}).

**P4 — Catálogo/filtros (o maior — pode dividir em 2 se o diff ficar grande):**
> Reestruture os filtros do catálogo: linha 1 = pills multi-select de Tema (Aventura, Investigação, Suspense — remover Infantil) cada uma com contador "(N)"; dropdown de Unidade (com contador por opção; Taguatinga rotulada "Taguatinga · Pocket") e dropdown Nº de jogadores. Linha 2 = tags-atalho multi-select menores: "Pra família", "Não assusta", "Populares", "12+", também com contadores. Nos cards: adicionar medidor de dificuldade com ícones de cadeado (escala 1–5, preenchidos em dourado) e até 2 tags pequenas. Badge dourado "A MAIS JOGADA" apenas no card do Cativeiro. Regra de resultado vazio: nunca mostrar grade vazia — exibir mensagem "Não temos [filtro] no [unidade] — mas te esperamos em [outra unidade]:" seguida dos cards correspondentes de outras unidades com o badge da unidade em destaque. Grid sempre alinhado à esquerda com cards de largura fixa. [+ colar a matriz da Parte 1 como dados]

**P5 — 3 passos:**
> Na seção "Três passos pra viver a aventura": adicione antes dos passos um parágrafo curto definindo o que é escape game: "Escape game é um jogo de imersão ao vivo: sua equipe é trancada numa sala cenográfica e precisa resolver enigmas pra escapar antes do tempo acabar. Sem atores te perseguindo — o desafio é o enigma, não o susto." Adicione ornamentos temáticos sutis em SVG (cadeado, chave, lupa) como elementos decorativos de fundo nos cards dos passos, opacidade máxima 8%, sem competir com o texto.

**P6 — Prova social (estrutura de vídeo, imagem por enquanto):**
> Na seção "Quem escapou não esquece": remova todas as fotos flutuantes laterais. Transforme o fundo da seção num banner full-width com a imagem que vou anexar (object-cover, overlay escuro 75%), estruturado como slot de vídeo: componente preparado pra receber um vídeo em autoplay mudo + botão de áudio no futuro, mas por enquanto renderizando apenas a imagem estática. Os 3 depoimentos em texto ficam sobrepostos na metade inferior. Trust signals embaixo mantidos, corrigindo "8 ANOS" → "10 ANOS".
> *(anexar IMG_1964.JPG ou outra foto forte de gameplay/)*

**P7 — Prime ornamentado:**
> Na seção Escape Prime: o card Elite deve ficar visivelmente mais alto que Ouro e Platina (translateY negativo + escala 1.05), criando silhueta de pódio com Elite no centro elevado. Adicionar slots de imagem circular no topo de cada card pros pins oficiais dos planos (substituirei as imagens). Enriquecer o fundo da seção com o pattern de símbolos em 4% de opacidade e um glow dourado radial sutil atrás do card Elite.
> *(anexar os 3 pins de banners/ neste prompt)*

**P8 — Party/Analysis:**
> Separe Escape Party e Escape Analysis: Party vira seção própria com layout hero interno — foto grande, título "ESCAPE PARTY", subtítulo "Aniversário épico. A festa que ninguém esquece — escape game + salão + buffet.", CTA vermelho grande "MONTE SUA FESTA". Abaixo dela, Analysis como card horizontal mais discreto com linguagem corporativa e CTA outline "PARA EMPRESAS".

**P9 — Kings no final + leque:**
> Mova a seção Kings of the Escape para ser a última antes do footer. Disponha os 3 cards de recorde em leque (fan spread): rotações -8°/0°/+8°, sobrepostos, central à frente e maior, hover eleva o card. Adicione abaixo do CTA "Ver ranking completo" um CTA secundário de conversão: "Quer seu nome aqui? Reserve sua sala".
> *(anexar 3 cards de kings_records/ neste prompt)*

**P10 — Ritmo das seções:**
> Ajuste o ritmo vertical da página: cada seção com padding vertical mínimo de 96px (desktop) / 64px (mobile) e min-height suficiente pra fechar visualmente seu conteúdo, evitando cortes de conteúdo no fold. NÃO usar scroll-snap.

**P11 — Footer:**
> No footer: adicionar "Desde 2016 — 10 anos criando aventuras reais." na descrição da marca (substituindo "8 anos"). Rotular Taguatinga Shopping como "Loja Pocket" na lista de unidades.

### Pendências que seguem abertas (fora do v0)
- ✅ CNPJ Taguatinga CONFIRMADO: 59.859.820/0001-86 (o do rodapé do site antigo; ignorar Moove Alfa das pastas)
- [ERICKSON] Vídeo hero primeira pessoa (editar, sem terror, 6-10s, ~1-2MB)
- [ERICKSON+MKT] Vídeos (hero 1ª pessoa, educativo todos-os-públicos, depoimentos) serão produzidos DEPOIS — no v0 e no Sprint 1, todos os slots de vídeo usam IMAGEM ESTÁTICA placeholder com a estrutura pronta pra receber o vídeo no site final
- [MKT] Remover selo "Nova Sala" do pôster do Chronnos
- [FUTURO] Cartazes verticais: Hora Zero, K13, Museu
- [PRD] Aplicar deltas da Parte 3 → PRD v1.3

---

## PARTE 5 — RODADA 2 (pós-deploy do código, ajustes de UI + assets)

### Decisões desta rodada
1. **Prime — paleta mantida.** Referência colorida (laranja/turquesa/vermelho) era genérica de SaaS; mantém Void/Blood/Gold já aprovado pelos sócios. Ganho visual vem dos ÍCONES REAIS por plano (joias fornecidas por Erickson), não de mudança de paleta.
2. **Ícones do Prime processados:** 3 imagens (`icon-ouro.png`, `icon-platina.png`, `icon-elite.png`) com fundo preto removido via chroma key, exportadas em PNG transparente — prontas para upload direto no v0 (substituição de asset, sem prompt elaborado).
3. **Cryptex removido por ora** — Erickson decidiu simplificar; volta a decisão de elemento de countdown definitivo para depois.
4. **Vitrine home (8) ≠ catálogo completo.** Decisão arquitetural registrada no PRD §5.1.1: home mantém vitrine curada de 8, "Ver todas as 16 salas" passa a navegar para página dedicada `/salas` (hoje é âncora vazia `href="#salas"`, bug a corrigir). Motivos: SEO por URL, estado de filtro compartilhável, e separação entre "convencer" (home) e "decidir" (catálogo completo). Lógica de filtro de `room-catalog.tsx` deve ser reaproveitada na nova rota no Sprint 1.
5. **WhatsApp flutuante:** central única de atendimento (Erickson vai providenciar o número/sistema depois — sem menu de seleção de loja por enquanto). Comportamento: bolha com ícone + pílula de texto "Fala com a gente" que aparece com delay (~1-2s ou no primeiro scroll) e depois recolhe para ícone sozinho.
6. **Cards de sala — object-position do pôster:** títulos estampados na arte estavam sendo cortados pelo `object-cover` padrão (topo). Corrigir para ancorar no topo da imagem em todos os 16 cards; sinalizar individualmente qualquer pôster que não couber bem mesmo após o ajuste (candidatos: os 5 em proporção 4:5 — K13, Museu, Escape Story, Cativeiro, FNAF).
7. **Kings of the Escape:** mantém os 3 cards em leque na home (não foi alterado para "1 card hero" — Erickson não confirmou essa virada de chave; pendente revisitar se a sensação de "exclusão" dos recordistas fora do top 3 persistir).

### Assets prontos para upload direto no v0 (sem prompt elaborado — só "use esta imagem em X")
- Logo oficial (`LOGO_2025...png`) → navbar + footer
- `icon-ouro.png`, `icon-platina.png`, `icon-elite.png` → ícones dos planos Prime
- 16 pôsteres (`assets_para_upload.zip`) → cards de sala (já enviados e aplicados nesta rodada)

### Prompts cirúrgicos pendentes desta rodada (consolidar em 1 envio)
**P-R2.1 — Analysis no layout do Party:**
> Aplique ao card "Escape Analysis" exatamente o mesmo layout estrutural usado no card "Escape Party" (foto de fundo full-bleed, eyebrow, título grande, descrição, CTA), mantendo o texto atual do Analysis. Ambos os cards devem ter a mesma altura e estrutura visual, diferindo apenas em conteúdo e cor do CTA (Analysis mantém o outline dourado/contorno, Party mantém o botão vermelho preenchido).

**P-R2.2 — Texto sobre reserva nos 3 passos:**
> Na seção "Três passos pra viver a aventura", adicione informação sobre como reservar (ex.: complementar o passo 1 "Escolha a missão" ou adicionar uma linha de apoio) deixando claro que a reserva é feita pelo site, com data e horário escolhidos pelo cliente. [Erickson: confirmar o texto exato desejado antes de rodar]

**P-R2.3 — Remover cryptex:**
> No hero, substitua o componente de countdown (cryptex) por um elemento mais simples: mantenha apenas o texto/número "60" de forma estática e elegante, sem animação de countdown, até decidirmos um substituto definitivo.

**P-R2.4 — Botão flutuante WhatsApp:**
> Adicione um botão flutuante fixo no canto inferior direito (todas as páginas), com ícone do WhatsApp sobre fundo verde circular. Ao carregar a página (ou no primeiro scroll), exiba por alguns segundos uma pílula de texto ao lado do ícone com "Fala com a gente", recolhendo depois para mostrar apenas o ícone. Ao clicar, abrir link wa.me com número a definir (usar placeholder por enquanto). Botão deve ficar acima de outros elementos fixos (não conflitar com cookie banner, se houver).

**P-R2.5 — Corrigir object-position dos pôsteres:**
> Nos cards de sala, ajuste `object-position` da imagem do pôster para o topo (ou ~`50% 15%`) em todos os 16 cards, preservando o título estampado na arte que hoje está sendo cortado pelo enquadramento padrão. Sinalize qualquer pôster onde o ajuste não for suficiente.

**P-R2.6 — Página /salas (maior desta rodada — considerar prompt separado):**
> Crie uma nova rota `/salas` que reaproveita a lógica de filtros já existente em `room-catalog.tsx` (gênero, tags, unidade, jogadores, regra nunca-zero), exibindo as 16 salas completas sem limite de exibição. Corrija o link "Ver todas as 16 salas" na home (atualmente `href="#salas"`) para navegar a `/salas` via Next.js Link.

### Pendência aberta
- Confirmar com Erickson se mantém Kings com 3 cards em leque ou migra para "1 card hero + CTA pro ranking completo" (discussão iniciada, não fechada).
