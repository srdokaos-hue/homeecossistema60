# 60 Minutos Escape Game — contexto do projeto

Site institucional em Next.js 14 substituindo o Wix antigo. GM/dev: Erickson, via Barbera Solutions.
4 unidades: Píer 21, ParkShopping, Taguatinga (Brasília) e Santa Úrsula (Ribeirão Preto). Fundada em 2016 — "10 anos de história".

## Stack
Next.js 14 (App Router) + TypeScript, Tailwind, shadcn/ui. Gerenciador de pacotes: pnpm.
Sem backend nesta fase (site institucional, dados de salas em `data/rooms.ts`).
Deploy: Vercel. Repo: github.com/srdokaos-hue/homeecossistema60.

## Histórico de execução até aqui
O projeto começou prototipado no v0.dev (Vercel) com iteração visual via chat. O código gerado foi migrado para este repo Git porque o plano do v0 ficou sem créditos. A partir de agora a execução de código é por aqui (Claude Code), e um chat separado com Claude (claude.ai) é usado pra decisões de produto/design antes de qualquer prompt de implementação.

## Docs de referência (ler antes de qualquer mudança de design ou conteúdo)
- `/docs/prd_v1_3.md` — PRD completo, decisões de produto e estrutura de páginas
- `/docs/spec_filtro_decisoes_v1.md` — spec do filtro de salas + histórico de decisões/prompts já usados
- `/docs/guia_identidade_visual_60min.md` — guia de marca em linguagem não-técnica, pra peças de redes sociais
- `/docs/handoff_60minutos_v3.md` — handoff da fase mais recente, com pendências em ordem de prioridade
- `/docs/metodologia_desenvolvimento.md` — COMO trabalhamos (SDD, fases, anti-AI-slop). Seguir sempre.

## Metodologia de trabalho (resumo — detalhe em /docs/metodologia_desenvolvimento.md)
Fluxo SDD por feature: ETAPA 1 Pesquisa (`docs/specs/<feature>/prd.md`) → `/clear` → ETAPA 2 Spec (`docs/specs/<feature>/spec.md`) → `/clear` → ETAPA 3 Implementação arquivo por arquivo → `/review` antes do deploy.
- Manter janela de contexto abaixo de 40-50%. O agente não roda `/clear` sozinho: avisa "hora de dar /clear" nas viradas de fase; o gatilho é do Erickson.
- Parar e pedir validação a cada subetapa. Nunca criar arquivo de código nem instalar pacote sem autorização expressa.
- Anti-AI-slop: nada de gradiente roxo/fundo branco, nada de fonte de sistema (Inter/Roboto/Arial). Tipografia marcante (Anton+Montserrat já atende), animação com propósito.
- Cor: usar tokens do `app/globals.css` (utilitários Tailwind `bg-void`, `text-gold`, etc.), nunca hex avulso em código novo. Exceção: verde WhatsApp `#25D366` (marca externa). Migração dos ~12 hex legados fica pra fase de refino.
- `/code-review ultra` (ex-`/ultrareview`) é cobrado e disparado só pelo Erickson — o agente não lança sozinho.

## Regras fechadas — NÃO reabrir sem o Erickson confirmar explicitamente
- Paleta: Void `#0A0A0A`, Blood `#E11C24`, Cream `#F4F2EC`, Gold `#D4AF37` (dourado é tempero: ~6% máx da composição visual, nunca cor dominante)
- Tipografia: Anton (display/títulos) + Montserrat (corpo)
- Tese central da marca: "escape game ≠ terror" — apenas 4 das 16 salas são 12+/assustam; a maioria é aventura/investigação pra todos os públicos
- Copy nunca usa travessão de pausa dramática (—) — trocar por ponto ou dois-pontos (regra PRD §4.1.1)
- "A MAIS JOGADA" é badge exclusivo do Cativeiro
- Cryptex (elemento circular de countdown no hero) foi removido — não reintroduzir sem decisão nova
- Kings of the Escape é carrossel por LOJA (não 3 cards fixos), com leque de tamanho proporcional ao nº de salas por loja: Píer 21 = 7, ParkShopping = 7, Santa Úrsula = 6, Taguatinga = 2
- SEO híbrido (4 rotas, decisão fechada PRD §30A.2): `/salas/[sala]` (sala em todas as unidades) + `/salas/[sala]/[unidade]` (variante numa unidade) + `/unidades/[unidade]` (unidade com todas as salas) + `/unidades/[unidade]/[sala]` (intersecção: + calendário + preço local). Canonical das variantes aponta pra página-mãe da sala. Slugs de unidade: `pier-21`, `parkshopping`, `taguatinga-shopping`, `santa-ursula`
- Vitrine da home mostra 8 salas; catálogo completo (16) é página `/salas` dedicada — ainda não criada
- WhatsApp flutuante: ícone único, número é placeholder ainda (`5500000000000` em `components/whatsapp-button.tsx`)

## Estado conhecido do código (verificado em 18/06/2026)
- `whatsapp-button.tsx` já tem lógica de expandir/recolher implementada (useState + setTimeout, expande no load ou primeiro scroll, recolhe em 4.5s, hover independente). Validar visualmente com `pnpm dev` antes de assumir que está quebrado.
- `posterPosition` (campo em `data/rooms.ts`) já está aplicado em Casa do Will, Devorador de Mentes e Cativeiro.
- Hero já está sem o cryptex, conforme decisão.
- ⚠️ Pôsteres em `/public/posters/`: alguns arquivos têm tamanho muito diferente da versão "definitiva" mais recente do Erickson (`cartazes_definitivos_16.zip`) — especificamente `ameaca-zumbi`, `hora-zero`, `matadouro`, `museu-misterios` e `escape-story` parecem ser versões antigas/placeholder. Cativeiro está sendo refeito pelo Erickson de qualquer forma. NÃO substituir sozinho — perguntar antes, porque pode ser intencional (recorte/otimização) e não desatualização.

## Pendências em ordem de prioridade (ver handoff completo em `/docs/handoff_60minutos_v3.md`)
1. Confirmar visualmente WhatsApp e espaçamento do hero
2. Cativeiro: aguardar pôster novo do Erickson
3. Confirmar resultado da rodada de 4 ajustes (parte já parece aplicada no código)
4. Página `/salas` dedicada — reaproveitar lógica de `room-catalog.tsx`
5. Página `/ranking` completa
6. Vídeos (hero, educativo, depoimentos) — estrutura já pronta para receber, Erickson vai fornecer
7. Decidir onde aplicar o slogan "Sempre há uma saída"
8. Cartazes verticais 2:3 via IA para K13, Museu, FNAF
9. Aplicar deltas do `spec_filtro_decisoes_v1.md` ao PRD principal

## Como trabalhar comigo (Erickson)
- Prefiro feedback direto e honesto, sem rodeio — aponte problemas reais, não só elogie.
- Decisão de design/conteúdo nova não é sua pra tomar sozinho: pergunte antes de mudar algo que não está claramente coberto pelas regras fechadas acima.
- Antes de mudar lógica visual (WhatsApp, animações, carrossel, hero), descreva o que vai mudar e por quê antes de aplicar — não troque "na surdina".
- Uso bastante voz/transcrição pra escrever, então às vezes a mensagem vem corrida ou com erro de transcrição — se algo não fizer sentido, pergunte em vez de assumir.
