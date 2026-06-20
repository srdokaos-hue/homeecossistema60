# PRD — Ecossistema Digital 60 Minutos Escape Game
**Versão:** 1.1  
**Data:** 10 de junho de 2026  
**Desenvolvedor:** Henrique Miranda da Silva Moura (MEI — CNPJ 65.153.056/0001-21)  
**Cliente:** 60 Minutos Escape Game (CNPJ 50.251.054/0001-06)  
**Contrato:** Nº 001/2026 — R$ 14.000,00  
**Prazo:** 6 meses  

---

## 1. VISÃO GERAL

Substituição completa da plataforma Wix por um ecossistema digital proprietário — migrando tudo que já existe e adicionando os módulos que vão transformar a operação. Desenvolvido com IA utilizando metodologia SDD (Spec Driven Development), entregando em 6 meses o que uma agência levaria 12 a 18 meses.

### 1.1 Objetivos principais
- Eliminar dependência do Wix e suas limitações
- Criar experiência imersiva que tire o estereótipo de "site de terror"
- Automatizar operação — reservas, confirmações, NF, CRM
- Construir base de dados própria com 114k+ contatos migrados e limpos
- Integrar todos os sistemas numa plataforma única

### 1.2 Contexto do negócio
- 4 unidades: Píer 21 (BSB), ParkShopping (BSB), Taguatinga Shopping (BSB), Santa Úrsula (Ribeirão Preto-SP)
- 20+ salas em 4 unidades
- Base atual: 114.430 contatos, 52.260 assinantes de e-mail ativos
- Público: todas as idades — famílias, crianças, corporativo, casais
- Problema de percepção: clientes acham que é só sala de terror — o site precisa corrigir isso

---

## 2. TECH STACK

```
Framework:     Next.js 14 (App Router) + TypeScript
Banco:         PostgreSQL via Neon (serverless)
ORM:           Prisma
Auth:          NextAuth.js v5
UI:            shadcn/ui + Tailwind CSS
Animações:     Framer Motion
Gráficos:      Recharts
Validação:     Zod + React Hook Form
Cache:         TanStack Query
Pagamento:     Stone Online API (cartão) + Inter PIX (gratuito)
Financeiro:    API Omie — 4 instâncias (uma por loja)
WhatsApp:      Z-API — 1 número central + DataCrazy
E-mail:        Resend + domínio @60minutosescape.com (Google Workspace)
Upload:        Uploadthing
Deploy:        Vercel Pro
IA CRM:        Claude API (Anthropic)
```

### 2.1 Custos de infraestrutura mensais
- Vercel Pro: ~R$ 100/mês
- Neon Database: ~R$ 100/mês
- Claude AI: ~R$ 110/mês
- Z-API WhatsApp: ~R$ 150/mês
- **Total estimado: ~R$ 460/mês** (repassado com comprovante, sem markup)

---

## 3. METODOLOGIA DE DESENVOLVIMENTO

### 3.1 Etapas do projeto

**Etapa 0 — Briefing + Layout (Semanas 1–2)**
- Coleta de referências visuais
- Definição de identidade visual (paleta, tipografia, espaçamentos)
- Wireframes das telas principais
- Protótipo visual no v0.dev
- Aprovação antes de qualquer código

**Etapa 1 — Desenvolvimento (Meses 1–6)**
- Fase 1: Site + Reservas + Painel + Telão (Meses 1–2)
- Fase 2: Lobby + CRM + Automações + Omie (Meses 3–4)
- Fase 3: Gamificação + Conta do Jogador + IA (Meses 5–6)

**Etapa 2 — Testes e Revisões (ao longo de cada fase)**
- Até 2 rodadas de revisão por fase sem custo
- Testes em dispositivos reais (BrowserStack)
- Lighthouse score acima de 90 em todas as páginas principais

**Etapa 3 — Lançamento (Mês 6)**
- Migração do domínio
- Treinamento da equipe
- Documentação de uso

### 3.2 Workflow SDD (Spec Driven Development)

Baseado nas referências: Gabriel Mark (escopo e design), Débora Folloni (SDD), Enzo Barbatto (Anti-AI-Slop).

**Fase 1 — Pesquisa + PRD**
- Pesquisar base de código e documentações externas
- Gerar prd.md
- Rodar /clear

**Fase 2 — Spec**
- Ler prd.md com contexto limpo
- Gerar spec.md com path exato de cada arquivo
- Rodar /clear

**Fase 3 — Implementação**
- Implementar arquivo por arquivo baseado na spec
- Nunca criar código sem autorização expressa
- Parar e perguntar a cada subetapa

### 3.3 Skills do Claude Code obrigatórias
- **Super Powers** — modo sênior, planeja antes de codar
- **GSD** — evita context rot com subagentes
- **frontend-design** — anti-AI-slop
- **/review e /ultrareview** — auditoria antes de cada deploy

### 3.4 Regras do CLAUDE.md
- `never hardcode style variables`
- `always import from the global CSS file`
- Responder sempre em português brasileiro
- Animações de scroll: reencodar vídeos com FFmpeg (cada frame = keyframe)

---

## 4. DESIGN E FRONTEND

### 4.1 Princípios Anti-AI-Slop
- Proibido: gradientes roxos genéricos, fundo branco padrão, fontes Inter/Roboto/Arial
- Obrigatório: direção estética ousada, tipografia marcante, quebras de grid, assimetria
- O site deve parecer premium e imersivo — não genérico de IA

#### 4.1.1 Anti-AI-Slop em copy: o travessão de pausa dramática
Assim como certos padrões visuais denunciam "feito por IA", certos padrões de escrita também denunciam — o mais comum é o travessão como pausa dramática (" — algo") no meio da frase, tique recorrente de textos gerados por LLM. Identificado em produção em 13 pontos do site na fase v0 (hero, três passos, party/analysis, promo bar, footer, kings, catálogo).

**Regra:** revisar todo copy novo (e o existente, periodicamente) trocando o travessão dramático por pontuação que soe naturalmente escrita por humano — ponto final, dois-pontos quando introduz explicação, ponto e vírgula, ou reestruturação em duas frases curtas.

**Exceção — uso correto que NÃO deve ser removido:** travessão como separador de nome/local ou nome/contexto (ex.: "Píer 21 — Asa Sul, Brasília", "A Casa do Will — Píer 21"). Esse uso é factual, não dramático, e é prática editorial legítima.

**Teste rápido:** se o travessão pode ser substituído por ". " ou ": " sem perder informação, ele era dramático e deve ser trocado. Se remove-lo perde a separação entre dois dados distintos (nome + localização), ele é legítimo e fica.

### 4.2 Identidade Visual — Etapa 0 (aprovada)

**Documento completo:** `60Minutos_Identidade_Visual_v1.pdf`

#### 4.2.1 A tese central
O maior inimigo de conversão não é o concorrente — é a percepção errada. Clientes acham que escape game é "coisa de terror" e não vêm. Das 16 salas, apenas 4 são classificadas 12 anos. A maioria absoluta é livre para todas as idades. O site novo tem missão antes de vender: **ensinar o que é escape game e provar que é pra todo mundo.**

#### 4.2.2 A grande inversão (princípio estrutural)
O site atual está invertido: fundo escuro no site-mãe parece terror; página individual da sala é clara e sem emoção — zero imersão onde deveria ter máximo.

**A inversão correta:**
- **Site-mãe (home, catálogo, institucional):** luminoso e épico — moldura clara que deixa as artes das salas brilharem. Impressão geral = aventura, nunca medo.
- **Página individual da sala:** imersiva e atmosférica — fundo escurece, aura da sala assume, áudio opcional. Aqui mora a emoção.

#### 4.2.3 Sistema de cores
| Token | Hex | Papel | Uso |
|---|---|---|---|
| Void | `#0A0A0A` | Base — o palco | Fundo site-mãe, seções escuras |
| Blood | `#E11C24` | Marca — ação | Botões CTA, destaques, logo |
| White | `#FFFFFF` | Respiro — clareza | Texto, seções luminosas |
| Gold | `#D4AF37` | Épico — conquista | Heros, Kings, Prime, conquistas |

**Regra do ouro (literal): tempero, não prato.** Proporção sugerida no site-mãe: Preto 50% / Branco 30% / Vermelho 14% / Dourado 6%. Dourado demais vira cassino; dourado no lugar certo vira tesouro. Aparece somente em: heros principais, Kings of the Escape, Escape Prime, cards colecionáveis, conquistas de nível.

**Função narrativa do dourado:** é a cor da medalha, do troféu, do nível conquistado — conversa diretamente com toda a camada de gamificação. Não é decoração: é o fio que liga visual e jogo.

#### 4.2.4 Tipografia
Sistema de duas fontes com papéis distintos:

- **Display (títulos, heros, nome de sala):** fonte condensada de alto impacto — candidatas: Anton, Archivo Black. Decisão final no protótipo via comparação lado a lado.
- **Corpo (parágrafos, UI, metadados):** Montserrat — mantém continuidade da marca, legível e neutro onde precisa ser neutro.

**Regra:** display entrega a emoção nos títulos (faz "VIVA A AVENTURA" parecer cartaz de cinema). Montserrat fica no corpo. Nunca inverter.

#### 4.2.5 Sistema de atmosfera por sala
As artes das salas são o maior ativo visual da marca — qualidade de cartaz de cinema. O sistema deixa cada uma respirar seu universo, sobre moldura sempre luminosa.

| Clima | Salas | Paleta dominante |
|---|---|---|
| Aventura / Épico | Ilha dos Piratas, Santo Graal, Anel do Poder, Orbe Mágico, Scape Wars | Ouro, âmbar, luz quente |
| Investigação / Ação | Hora Zero, Museu dos Mistérios, Projeto Chronnos, Pandemia K-13 | Azul, aço, néon frio |
| Infantil / Leve | Escape Story, Museu dos Mistérios | Cores vivas, céu claro |
| Suspense / Terror | Cativeiro, Matadouro, FNAF, Ameaça Zumbi, Mundo Invertido (2 fases) | Preto, vermelho profundo |

**Regra da moldura:** card sombrio é como capa de filme de terror numa prateleira iluminada — a capa é dark, a prateleira é clara. O estereótipo só volta se o fundo todo for escuro.

**Atmosfera com peso controlado** (meta <2s em 4G):
- Camadas leves em vez de vídeo de fundo: arte hero tratada + 2–3 elementos animados em CSS/SVG
- Áudio opt-in: botão discreto "ativar atmosfera" — não toca automático (mobile bloqueia, incomoda em ambiente de trabalho). Preferência salva na conta do usuário — quem ativa uma vez não precisa ativar de novo.
- Referência interna validada: Kelvin (Arquivo 60) já usava som ambiente de chuva + efeitos visuais sutis com resultado aprovado pelo público — este sistema é a versão digital e escalável dessa abordagem.
- Transição de entrada na página da sala: animação teatral rápida ao clicar no card — leve por natureza, alto impacto emocional

#### 4.2.7 Cartazes das salas com IA (asset de produção — pré-Sprint 1)
Os cartazes atuais foram feitos manualmente. A aprovação dos donos é refazê-los com IA para um resultado mais elaborado e épico, condizente com o novo padrão visual.

**Fluxo de produção (duas opções em cascata):**
1. **Tentativa interna primeiro:** testar ferramentas de IA generativa de imagem (candidatas a avaliar: Midjourney, Ideogram, Flux Dev/Pro, Adobe Firefly). Se o resultado atingir o nível visual desejado pelos donos, usar.
2. **Se não ficar no nível:** passar para o time de marketing executar com suas ferramentas e processo.

**Atenção técnica:** IAs de imagem erram acentos e ortografia quando geram muito texto. Regra obrigatória: textos como sinopse, tagline e nome da sala **nunca** devem ser gerados junto com a imagem — inserir em pós-produção (Photoshop, Canva, Figma) para garantir ortografia correta.

**Prazo:** cartazes finalizados antes do Sprint 1 — são os assets centrais dos cards do catálogo.

**Pendência:** definir qual ferramenta de IA usar e testar com 2–3 salas antes de comprometer com todas as 16. Ver item na tabela de pendências.

#### 4.2.8 Fotos temáticas com IA (asset de conteúdo — Kings + Perfil)
Inspirado no estilo Kadroom, que realizava ensaios fotográficos com pessoas fantasiadas dentro das salas temáticas.

**Adaptação para o 60 Minutos:**
1. Marketing fotografa a equipe real dentro do cenário real após a sessão (sem fantasia física necessária)
2. IA de edição de imagem aplica transformação temática: figurino da época/universo da sala sobre as pessoas reais, sem alterar o cenário físico
3. Resultado: foto real da equipe com "você vestido de pirata na Ilha dos Piratas" ou "com armadura no Santo Graal"

**Impacto no sistema:**
- **Kings of the Escape:** foto do ranking vira épica, não só grupo sorrindo na porta
- **Perfil do jogador:** card colecionável digital e histórico de salas ficam muito mais ricos visualmente
- **Compartilhamento:** imagem de resultado pra story fica incomparavelmente mais atrativa — marketing orgânico natural

**Fluxo de produção (duas opções em cascata):**
1. **Tentativa interna primeiro:** marketing faz as fotos reais → equipe de desenvolvimento testa aplicar transformação com IA (ferramentas candidatas: Runway, Kling, Pika, ou APIs de inpainting). Se ficar no nível, integrar no fluxo pós-sessão.
2. **Se não ficar no nível:** marketing assume o processo completo de transformação, entrega as fotos já tratadas para o sistema fazer upload.

**Pendência:** definir ferramenta de transformação e testar com uma sala antes de escalar. Ver item na tabela de pendências.

#### 4.2.6 Anatomia do card de sala
- Arte do pôster como protagonista (não foto do cenário)
- Badge de classificação etária muda de tom conforme clima (dourado para "Livre", vermelho escuro para "12 anos")
- Metadados: tempo, jogadores, gênero
- CTA "Reservar" sempre visível
- Preço dinâmico por unidade (R$84,90 BSB / R$99,90 SSU)

#### 4.2.7 O que está fechado vs. a decidir no protótipo
**Fechado (não reabre):**
- Estratégia: aventura por padrão, terror contido, sala-primeiro, hero educativo
- A grande inversão: site-mãe luminoso / página de sala imersiva
- Papéis de cada cor no sistema
- Sistema de duas fontes (display + Montserrat)
- Cinco climas de atmosfera por gênero

**A decidir no protótipo (v0.dev):**
- Fonte de display final — opções lado a lado na mesma tela
- Tom exato do dourado (fosco vs. metálico) e valores hex finais
- Telas navegáveis: home, catálogo, página de sala

### 4.3 Estrutura e ordem da home (UX validado por pesquisa)

Baseado em dados do Nielsen Norman Group, Baymard Institute e Forrester 2024–2025:

**Problema identificado:** o site atual coloca 3 seções antes do catálogo. Usuários com intenção de compra (maioria do tráfego, confirmado pelos dados do Search Console) abandonam antes de ver o produto.

**Dados que embasam a ordem:**
- NN/g: 57% do tempo de visualização acontece acima da dobra. Usuários scrollam só se o que está acima for promissor.
- Baymard 2025: CTAs colocados depois de reviews verificados convertem 33% melhor do que antes de depoimentos.
- Baymard 2024: páginas com 1–3 sinais de confiança convertem 23% melhor do que com nenhum — e 8% pior com 7 ou mais.

**Ordem obrigatória da home:**
1. Nav (sticky)
2. Hero — impacto visual + o que é escape game + CTA "ver salas"
3. Catálogo — produto em segundo lugar (retém tráfego com intenção)
4. Como funciona — 3 passos (educa quem ainda tem dúvida, invisível pra quem já sabe)
5. Prova social — depoimentos reais + nota Google + número de jogadores (prepara terreno para o upgrade)
6. Escape Prime — venda do upgrade depois da validação
7. Kings of the Escape — retenção e gamificação
8. Festas / Empresas — conversão secundária
9. Footer

**Lógica:** mostra o produto → educa → valida com prova social → vende o upgrade. Nunca o contrário.

### 4.4 Hero section imersiva
- Countdown animado regressivo de 60→0 como elemento central do hero — comunica "60 minutos" e urgência sem precisar explicar o conceito
- Animação controlada por scroll na hero
- Vídeo gerado com IA (Nano Banana 2 + Cling 3) via Higgsfield
- Cada sala pode ter sua própria animação de entrada
- FFmpeg keyframe encoding obrigatório para scroll suave

### 4.5 Mobile First
- Desenvolvido primeiro para mobile, depois desktop
- Meta: abaixo de 2 segundos no carregamento inicial em 4G
- Botões mínimo 48px de altura (fonte: NN/g — tap targets menores causam 38% dos erros em formulários mobile)
- Máximo 3 taps entre escolher sala e confirmar reserva
- Suporte a Apple Pay e Google Pay
- Teclado numérico em campos de telefone, @ em campos de e-mail
- Sem hover obrigatório
- Testes: BrowserStack (iOS Safari, Android Chrome, Samsung Internet)

### 4.6 Performance de imagens (regra permanente)
Toda imagem que entra no site (pôsteres, fotos, recortes, banners) deve ser **a mais leve possível mantendo o máximo de qualidade visual** — nunca subir o arquivo cru/gigante direto na pasta. Vale especialmente porque o `next.config.mjs` está com `images.unoptimized: true`: o Next **não** comprime nada em runtime, o arquivo vai inteiro pro navegador. Logo a otimização é manual e obrigatória antes de commitar.

Convenção adotada (validada em 19/06/2026 na troca dos pôsteres):
- **Formato:** WebP para arte fotográfica/render (pôsteres, fotos). PNG só quando precisar de transparência real; SVG para ícones/vetores.
- **Dimensão:** redimensionar pro tamanho de uso + folga de retina. Pôsteres = **máx. 1200px** de largura (cards exibem ~340px; 1200 cobre retina e a futura página da sala). Nunca subir 4000px+ pra exibir em card.
- **Qualidade:** começar em **q80** e subir só se aparecer artefato visível — o teto é "o máximo de qualidade que não pese". Não usar q100.
- **Meta de peso:** pôster de card na casa dos **~150–250 KB**. Referência real: a leva de 16 caiu de ~33 MB → ~3 MB (−92%) sem perda perceptível.
- **Ferramenta no projeto:** `ffmpeg` (libwebp) — `ffmpeg -i in.png -vf "scale='min(1200,iw)':-1" -c:v libwebp -quality 80 out.webp`. (sharp/magick não instalados.)
- Ao trocar uma arte, **converter + apagar o arquivo antigo + atualizar o caminho** em `data/rooms.ts` (ou onde for referenciada). Sem deixar `.png` órfão.

---

## 5. FLUXO DO CLIENTE

### 5.1 Catálogo de salas
- **Sala primeiro, unidade depois** — cliente escolhe a aventura, não o endereço
- Cards visuais com **filtros múltiplos combináveis:** gênero + idade + número de jogadores + unidade
- Salas agrupadas por tema/gênero (não por unidade) como padrão
- Sagas identificadas: cliente vê sequência e progressão
  - Saga do Esfolador: Cativeiro → Matadouro (Cabana descontinuada — histórico preservado)
  - Saga Santo Graal: Santo Graal 1 → Santo Graal 2
- Quando sala existe em múltiplas unidades: sistema mostra disponibilidade em cada uma
- **Sugestão automática de unidade alternativa** quando primeira opção está lotada

### 5.1.1 Vitrine da home vs. catálogo completo (decisão arquitetural)
A home **não** é o catálogo completo — são duas telas com papéis diferentes:
- **Vitrine na home (`#salas`):** 8 cards curados (`HOME_SHOWCASE_ORDER`), sem filtro de unidade ativo por padrão. Função: provar variedade de universos e converter o indeciso a explorar. Não deve crescer/expandir inline — misturar "convencer" com "decidir" pesa a experiência da home.
- **Página dedicada `/salas`:** catálogo completo das 16, com os mesmos filtros (gênero, tags, unidade, jogadores) e a regra nunca-zero, sem limite de exibição. É o destino do CTA "Ver todas as 16 salas" — hoje esse botão é uma âncora vazia (`href="#salas"`) e precisa ser corrigido para navegação real.
- **Por que página dedicada e não expansão inline:** (1) SEO — cada filtro/sala precisa de URL própria e indexável, conforme arquitetura híbrida da seção 30A; (2) estado compartilhável — um link com filtro aplicado (ex. "Suspense + Píer 21") deve ser copiável e reabrir no mesmo recorte; (3) a home compete por atenção entre convencer (hero, prova social) e decidir (comparar 16 opções) — são modos mentais diferentes que não devem disputar o mesmo scroll.
- **Implementação:** a lógica de filtro já existente em `room-catalog.tsx` (fase v0) deve ser extraída para a rota `/salas`, reaproveitada — não recriada do zero — no Sprint 1.

### 5.2 Fluxo de reserva
```
Catálogo (escolhe sala) 
→ Unidades disponíveis com horários 
→ Data + horário + nº de jogadores 
→ Checkout (PIX Inter ou cartão Stone) 
→ Ingressos por QR code no e-mail + WhatsApp 
→ Lobby (convite do grupo) 
→ Check-in por QR na loja
```

### 5.3 Regra de mínimo de jogadores
- Informativa — não bloqueia a reserva
- Aparece em 7 pontos: página da sala, checkout, e-mail de confirmação, lobby, página de voucher, resgate de voucher, FAQ
- Regra atual: mínimo de jogadores definido por sala (ex: mínimo 4)

---

## 6. SISTEMA DE LOBBY

### 6.1 Funcionamento
- Líder faz a reserva pagando o primeiro ingresso
- Recebe link exclusivo da sessão pra compartilhar
- Cada convidado entra no lobby e escolhe como pagar

### 6.2 Opções de pagamento no lobby
- **Líder paga todos:** compra X ingressos, cada convidado recebe código único — entra sem pagar
- **Cada um paga o seu:** convidados entram em status "pendente" e pagam no lobby
- **Pagar na loja:** convidado marca "pagarei na loja" — entra sem pagar online
- Lembrete automático 24h antes para pendentes via WhatsApp

### 6.3 Funcionalidades do lobby
- Chat em tempo real entre membros
- Avatar com foto + insígnias de cada jogador clicáveis
- Perfil do amigo visível ao clicar — histórico, conquistas, nível
- Timer countdown da sessão
- Instruções do jogo
- Status de cada participante (confirmado, pendente, pagar na loja)

### 6.4 Menores de idade
- Responsável adiciona criança pelo nome — sem conta própria necessária
- Termo de responsabilidade assinado digitalmente no lobby
- Aviso informativo: mínimo de 12 anos ou responsável presente
- Check-in na loja: recepção já vê quem assinou e quem não assinou

---

## 7. SISTEMA DE CONTAS E PERFIS

### 7.1 Conta adulto
- Login obrigatório pra reservar
- Google OAuth como método principal
- CPF obrigatório no cadastro
- E-mail como identificador secundário

### 7.2 Conta infantil (perfil dependente)
- Criado pelo responsável no lobby ou na conta
- Vinculado ao e-mail + conta do responsável
- Só nome necessário — sem e-mail ou CPF próprio
- Acumula conquistas, histórico e nível normalmente
- Responsável vê histórico completo do dependente
- Responsável gera link temporário (7 dias) pra compartilhar perfil da criança
- LGPD: dados de menor tratados com cuidado extra
- **Transferência:** quando criança crescer, pai desvincula e histórico migra pra conta própria dela

### 7.3 Perfil do jogador
- Nível atual (Recruta → Detetive → Mestre → Perito → Gênio → Lenda)
- Histórico de salas jogadas
- Conquistas e insígnias
- Cards colecionáveis desbloqueados
- Ingressos Prime disponíveis (carteira digital)
- Kings of the Escape — rankings e recordes
- Resultados compartilháveis (imagem pra story + link público)

---

## 8. SISTEMA DE PAGAMENTOS

### 8.1 Gateways
- **PIX:** Inter (gratuito — 0% de taxa)
- **Cartão crédito/débito:** Stone Online API
- **Stripe:** deferido — só quando existir produto recorrente real

### 8.2 Taxas Stone
- PIX: 0,75% (mas usamos Inter — grátis)
- Débito: 1,29%
- Crédito à vista: 3,59%
- Crédito parcelado: 5,41%+ (até 18x)

### 8.3 Escape Prime — pagamento
- À vista ou parcelado com juros na loja (via Meep)
- Parcelamento online: decisão pendente dos donos

---

## 9. SISTEMA DE INGRESSOS

### 9.1 Tipos
- **Ingresso avulso:** QR code único no corpo do e-mail
- **Voucher presente:** PDF anexo visual e presenteável — comprador recebe e encaminha pra quem quiser; opção de envio direto com data agendada
- **Ingressos Prime:** carteira digital na conta — QR gerado na hora do uso

### 9.2 Regras dos vouchers
- Ingresso individual — não sessão fechada
- Regra de mínimo de jogadores se aplica
- Regra informada em 7 pontos de contato
- Validade e número de série único por ingresso
- Resgatável no site ou na loja

### 9.3 Check-in
- Recepção escaneia QR do ingresso
- Ingresso baixado automaticamente do saldo
- Sistema mostra: quem assinou termo, quem é Prime, se há card pra entregar

---

## 10. LOJA ONLINE

### 10.1 Produtos
- Ingressos avulsos
- Vouchers presente
- Produtos físicos (camisetas, canecas, etc.)
- Experiências

### 10.2 Checkout unificado
- Mesmo checkout da reserva — um carrinho só
- Stone + Inter PIX
- Cliente pode comprar voucher e reservar sala na mesma compra

---

## 11. ESCAPE PRIME

### 11.1 Planos
| Plano | Ingressos | Pessoas | Valor unitário | Total |
|---|---|---|---|---|
| Ouro | 3 | 1 pessoa | R$ 69,90 | R$ 209,70 |
| Platina | 10 | até 2 pessoas | R$ 59,90 | R$ 599,00 |
| Elite | 24 | até 4 pessoas | R$ 39,90 | R$ 957,60 |

### 11.2 Benefícios
- Ingressos digitais com QR (carteira digital)
- Painel de Conquistas (níveis gamificados)
- 1 foto digital por sala jogada
- Card colecionável físico com QR — escaneia e desbloqueia versão digital no perfil
- Acesso antecipado a salas novas
- Eventos e sorteios exclusivos
- Validade: 12 meses

### 11.3 Fluxo de venda na loja
```
Recepcionista busca cliente no sistema 
→ Seleciona plano Prime 
→ Cliente paga na Meep 
→ Sistema gera ingressos digitais automaticamente 
→ WhatsApp + e-mail com carteira digital na hora
```

### 11.4 Painel admin Prime
- Membros ativos por plano
- Ingressos usados e restantes
- Data de vencimento
- Alerta automático 30 dias antes do vencimento → WhatsApp pro cliente renovar

### 11.5 Cards colecionáveis
- Físico entregue na recepção após a sessão (recepcionista vê aviso no sistema)
- QR code atrás do card → escaneia → desbloqueia versão digital no perfil
- Visual tipo Pokémon card no perfil
- Cards bloqueados aparecem como silhueta — incentiva colecionar todos
- PDFs dos cards a serem convertidos em PNG: **pendência — Erickson envia os arquivos**

---

## 12. KINGS OF THE ESCAPE

### 12.1 Dois rankings por sala
**Ranking do Mês:**
- Reseta automaticamente no dia 1 de cada mês
- Mostra líder atual em tempo real — pode ser superado
- Status: "Líderes atuais — podem ser superados até fim do mês"
- No final do mês: líder vira Kings oficial automaticamente

**Ranking Histórico (All Time):**
- Nunca reseta
- Galeria de todos os campeões mensais de todos os tempos
- Busca por nome para qualquer jogador encontrar sua equipe

### 12.2 Fluxo de registro
```
Grupo escapa 
→ Fotógrafo faz upload da foto (celular ou computador) 
→ Tempo registrado automaticamente 
→ Sistema compara com líder atual do mês 
→ Se menor tempo: assume liderança em tempo real no site
→ Grupo anterior recebe WhatsApp: "Vocês foram superados! Voltem e batam o recorde"
```

### 12.3 Papel do fotógrafo
- Usuário com permissão só de upload de foto
- Upload via celular (na hora) ou computador (depois)
- Foto vinculada automaticamente à sessão pelo horário

### 12.4 Compartilhamento
- Resultado salvo no perfil do jogador
- Botão "Compartilhar" → gera imagem pronta pra story com visual do 60 Minutos
- Botão "Copiar link" → link público do resultado

### 12.5 Sagas vinculadas
- Admin marca sala como pertencente a uma saga e define ordem
- Sala desativada sai do catálogo mas histórico preservado
- Automação de recomendação: quem jogou sala X da saga recebe indicação da próxima

---

## 13. GAMIFICAÇÃO E CONQUISTAS

### 13.1 Painel de Conquistas — níveis
| Nível | Salas escapadas |
|---|---|
| Recruta | 1 sala |
| Detetive | 2 salas |
| Mestre | 3 salas |
| Perito | 6 salas |
| Gênio | 9 salas |
| Lenda | 12 salas |

- Nível calculado automaticamente
- Notificação WhatsApp ao subir de nível
- Badge do nível no perfil com progressão visual

### 13.2 Outras conquistas
- "Voltou pra mesma sala" — Try Again
- "Zero dicas usadas"
- "Primeiro escape"
- Salas da saga completa

---

## 14. CRM

### 14.1 Dados registrados automaticamente
- Sala jogada + resultado (escapou/não escapou)
- Tempo de conclusão
- Unidade frequentada
- Data e horário de cada visita
- Nível atual e conquistas
- Ingressos Prime — plano, uso, validade
- Canal de aquisição (campo preenchido pelo cliente no cadastro)
- Histórico de compras

### 14.2 Filtros de segmentação
- Sala jogada (escapou / não escapou)
- Saga (jogou sala X da série Y)
- "Voltou pra mesma sala" (Try Again)
- Data da última visita
- Data do cadastro
- Mês de aniversário
- Canal de aquisição (Instagram, indicação, Facebook, Google, etc.)
- O que comprou (ingresso, voucher, produto, Prime)
- Unidade frequentada
- Frequência de visitas
- Valor gasto
- Clientes VIP, recorrentes, inativos

### 14.3 Segmentos salvos
- Admin salva segmentos favoritos pra reusar
- Segmentos por sala gerados automaticamente (ex: "Escapou Cativeiro")
- Filtros combinados em tempo real

### 14.4 Requisitos de performance
- Paginação em tudo (50 registros por página)
- Índices no banco para campos mais filtrados
- Queries assíncronas — tela não trava
- Cache de segmentos salvos com atualização periódica

### 14.5 Migração da base Wix
- Exportar todos os CSVs do Wix
- Limpeza cirúrgica: remover duplicatas, lixo de teste, contatos sem histórico real
- Priorizar: quem tem etiqueta de sala ou checkin registrado
- Normalizar nomes de salas e unificar etiquetas duplicadas
- Importar base limpa antes do lançamento da Fase 2
- **Decisão:** migrar só quem tem histórico real de jogo (~20-30k de 114k total)

---

## 15. AUTOMAÇÕES

### 15.1 Fixas — só edita o texto
- Reserva confirmada → WhatsApp + e-mail imediato
- 24h antes → WhatsApp + e-mail lembrete com link do lobby
- 1h antes → WhatsApp lembrete final
- Sessão termina → WhatsApp + e-mail agradecimento + pedido de avaliação + link Google Review
- Cliente não compareceu → e-mail oferecendo remarcação
- Cancelamento confirmado → WhatsApp + e-mail
- Checkout abandonado → WhatsApp com link pra retomar

### 15.2 Configuráveis — equipe edita e cria novas
- Aniversário → editam texto e oferta (padrão: ingresso grátis com mínimo 4 pessoas)
- Cliente inativo → criam quantas quiserem com tempo customizável
- Nova sala lançada → escolhem segmento e disparam quando quiserem
- Voucher vencendo → editam prazo e mensagem

### 15.3 Painel de automações
- Blocos visuais — fixos e configuráveis
- Fixos: só edita o texto
- Configuráveis: edita tudo — tempo, texto, segmentação — e cria novos do mesmo tipo

---

## 16. E-MAIL

### 16.1 Plataforma
- Resend com domínio @60minutosescape.com verificado via Google Workspace DNS

### 16.2 Tipos de e-mail
- **Transacionais:** confirmação, lembretes, pós-sessão, cancelamento, Prime, voucher
- **Campanhas:** editor visual com blocos (imagem, texto, botão, divisor)

### 16.3 Editor de campanhas
- Blocos visuais editáveis
- Preview antes de enviar
- IA como assistente opcional pra gerar/melhorar textos
- Filtro de base ou segmento antes de enviar
- Histórico com métricas (taxa de abertura, cliques)

### 16.4 Formato dos ingressos
- Ingresso avulso: QR no corpo do e-mail
- Voucher presente: PDF anexo presenteável (opção de envio direto com data agendada)
- Ingressos Prime: carteira digital na conta — QR gerado na hora do uso

---

## 17. WHATSAPP

### 17.1 Arquitetura
- 1 número central do 60 Minutos
- 1 API Z-API
- DataCrazy distribui pro atendente da loja certa
- Bot de roteamento: 1 pergunta, 4 botões (Píer 21, ParkShopping, Taguatinga, Santa Úrsula)
- Após escolha: cai direto pro atendente humano daquela recepção

### 17.2 Vantagens
- Todas as automações saem do mesmo número
- Cliente reconhece o contato e pode salvar na agenda
- Histórico centralizado no DataCrazy

---

## 18. INTEGRAÇÃO OMIE

### 18.1 Arquitetura
- 4 instâncias Omie — uma por loja
- Credenciais: App Key + App Secret de cada instância (**pendência — coletar antes da Fase 2**)
- NFS-e para reservas (serviço)
- NF-e para loja (produto)

### 18.2 Fluxo
- Venda online → nosso sistema envia dados pro Omie → NF emitida automaticamente
- Venda física (Meep) → Meep integra com Omie automaticamente (já funciona hoje)

### 18.3 Dashboard financeiro
- Dados puxados dos 4 Omies via API
- Visão consolidada de todas as unidades + filtro por unidade

---

## 19. INTEGRAÇÃO MEEP

### 19.1 Situação atual
- Meep processa pagamento na maquininha
- Integra automaticamente com Omie
- Não cadastra o cliente — venda fica solta sem vínculo

### 19.2 Decisão pendente
- **Ligar pra Meep: (31) 3172-0750**
- Perguntar se tem API com webhook pra integração externa
- 3 abordagens possíveis:
  - A) Webhook automático da Meep pro nosso sistema (melhor)
  - B) Código da venda vinculado manualmente pela recepção
  - C) Recepcionista pede CPF antes de processar
- **Decisão só após conversa com a Meep**

---

## 20. INTEGRAÇÃO ARQUIVO 60 (Comunidade)

### 20.1 Contexto
- Arquivo 60 = comunidade gamificada dos clientes (Base44)
- Sistema separado com XP, conquistas, rankings, desafios, eventos
- Integração via API — bases separadas, sincronização por e-mail/CPF

### 20.2 Nosso sistema expõe
```
GET /api/cliente/{cpf_ou_email}/historico
Retorna: nível, salas escapadas, conquistas, ingressos Prime
```

### 20.3 Fluxo de vinculação
- Cliente cria conta no Arquivo 60
- Sistema verifica na nossa base por e-mail (principal) ou CPF (fallback)
- Se existir: puxa histórico completo e converte em XP no Arquivo 60
- A partir daí: nosso sistema envia webhooks ao Arquivo 60 a cada nova conquista

### 20.4 Requisito técnico
- Sistema construído com arquitetura API-first
- Todos os dados do perfil expostos via endpoints autenticados e documentados
- **Pendência: alinhar formato da API com dev do Arquivo 60 antes da Fase 3**

---

## 21. TABLET INTEGRADO (App de Sala)

### 21.1 Funcionalidades
- Timer em tempo real sincronizado com lobby
- Registro de dicas usadas por sessão
- Vinculação automática: lobby do horário X → sala → tablet
- Dados de enigmas via API do sistema terceirizado (se disponível)
- Conquistas automáticas no perfil: "Enigma 1 em 20 min", "Zero dicas"
- Histórico completo da partida salvo no perfil

### 21.2 Integrações
- Painel do monitor: interface construída do zero
- API de enigmas: solicitada ao sistema terceirizado atual
- Input manual: caso API não seja disponibilizada, monitor registra pelo tablet

---

## 22. PAINEL ADMINISTRATIVO

### 22.1 Sistema de permissões (RBAC)

**Papéis prontos:**
| Papel | Acesso |
|---|---|
| Super Admin | Tudo |
| Gestor de Loja | Operacional — com toggle pra liberar acesso a outras unidades |
| Marketing | CRM, segmentos, automações, campanhas, painel de conteúdo |
| Editor | Só painel de conteúdo |
| Financeiro | Dashboard financeiro e relatórios |
| Recepção | Telão, checkin, reservas do dia |
| Fotógrafo | Só upload de fotos de sessões |

**Permissões customizadas:**
- Super Admin monta perfil marcando módulo por módulo
- Arquitetura extensível — novos papéis sem mexer no sistema

### 22.2 Dashboard — 4 visões modulares

**Donos (estratégico):**
- Faturamento consolidado todas as unidades
- Comparativo entre lojas
- Ticket médio e crescimento mensal
- Salas mais vendidas
- Dados financeiros do Omie integrados
- Acesso mobile otimizado

**Gestor de Loja (operacional):**
- Filtro por unidade (vê todas, foca na sua)
- Reservas e sessões do dia
- Vendas online em tempo real / físicas do dia anterior
- Ocupação por sala
- Clientes confirmados e não comparecidos
- Ingressos Prime usados

**Recepção — Telão (tempo real):**
- Sessões ao vivo com countdown
- Próximas sessões
- Status de chegada dos clientes
- Aviso de card Prime a entregar

**Marketing (comportamento):**
- Origem dos clientes
- Taxa de retorno
- Campanhas e conversão
- Segmentos em crescimento
- Clientes novos vs recorrentes

**Arquitetura:** modular — novas visões adicionadas sem mexer nas existentes.

---

## 23. PAINEL DE CONTEÚDO

### 23.1 4 templates disponíveis
- **Lançamento:** hero imersivo, descrição, contagem regressiva opcional, botão de ação
- **Sala nova:** formulário → sistema cria página, adiciona no catálogo, cria horários no booking automaticamente
- **Landing page de campanha:** hero, benefícios, prova social, ação (formulário, WhatsApp ou booking)
- **Evento:** data, local, descrição, botão de inscrição

### 23.2 Funcionamento
- Admin escolhe template → preenche formulário → página aparece pronta
- Sem editor de blocos no MVP — adicionado como feature futura se necessário
- Design protegido — equipe edita conteúdo, não o layout

---

## 24. ÁREA DE FESTAS E EVENTOS

### 24.1 Escape Party

**Conceito:**
"Não é uma festa. É uma aventura." — Os convidados são os protagonistas, não apenas espectadores. Ninguém apenas assiste — todo mundo entra na história e sai falando dela por muito tempo.

**Números de prova social:**
- +150K jogadores que viveram a experiência
- +1.300 festas realizadas com sucesso
- Avaliação 5,0 ⭐ por famílias reais

**3 pacotes (sem preços no site — tudo via vendedor):**

**Festa Clássica**
- Salão de eventos por 2 horas
- Buffet Clássico
- Decoração Clássica
- Escape Game

**Festa Épica** ⭐ Popular
- Buffet Épico
- Decoração Épica
- Salão de eventos por 3 horas
- Escape Game
- Convite Digital
- Presente para o aniversariante
- Game Master
- Monitoramento ao vivo
- Lembrancinha Photo

**Festa Lendária** — Premium
- Todos os itens da Festa Épica
- Buffet Lendário
- Decoração Lendária
- Garçom
- Lembrancinha com copo personalizado
- Adereço de festa
- Jogos de Tabuleiro
- Karaokê
- ShowTime (Esfolador / Maximus)
- Voucher para o aniversariante

**8 temas de missão disponíveis:**
Magia (Feitiços & Encantos), Investigação (Detetive & Mistério), Terror (Sustos & Coragem), Pirata (Tesouros & Mares), Medieval (Reinos & Dragões), Sci-Fi (Espaço & Futuro), Zumbi (Apocalipse & Fuga), Aventura (Exploração & Ação)

**Como funciona a festa:**
1. Recepção — A chegada mágica (decoração temática)
2. A Missão — Imersão na sala (enigmas e desafios em grupo)
3. Buffet — Pausa deliciosa
4. Parabéns — O momento esperado
5. Memórias — Registros e histórias que ficam para sempre

**Diferenciais pra página:**
- Buffet completo + decoração temática + equipe dedicada + escape game + segurança total + entretenimento — tudo incluso
- Festa dentro de shoppings premium — segurança e conforto
- Sem estresse de organizar — "O Party resolve. Você aproveita."
- Foco em pais: segurança total, praticidade máxima, convidados envolvidos, memória que dura

**Unidades com Escape Party:**
- ParkShopping — DF
- Píer 21 — DF
- Shopping Santa Úrsula — SP
(Taguatinga Shopping não mencionado no material — confirmar)

**Fluxo de contato:**
- Landing page imersiva com os 3 pacotes, temas, diferenciais, depoimentos e números — sem preços
- CTA: "Vamos planejar a festa do seu filho?" — botão WhatsApp direto pro vendedor
- Formulário integrado ao CRM + botão WhatsApp (número específico do vendedor de festas no DataCrazy)
- Lead entra no CRM automaticamente com dados da festa (data, nº de convidados, tema de interesse)
- Vendedor conduz orçamento personalizado e fecha negócio
- Vendedor faz a reserva no sistema pelo cliente quando fechado

### 24.2 Escape Analysis (corporativo — B2B)

**Contexto:**
- Produto B2B focado em desenvolvimento de equipes via gamificação
- +170 mil pessoas impactadas
- Respaldo científico (Dissertação de Mestrado)
- Análise por psicólogos treinados
- Certificação ICSS (Instituto de Certificação dos Profissionais de Seguridade Social)
- Parceiros: UNICEF e centenas de empresas

**4 produtos disponíveis:**

**1. Experiência Pocket** — Sem análise comportamental
- Jogo na sala de escape
- Assistir ao vivo (transmissão de vídeo sem áudio)
- Foto da equipe por jogador
- Sala de conferências (2 horas)

**2. Experiência Plus** — Com análise comportamental de equipe (o mais vendido)
- Jogo na sala de escape
- Análise comportamental da equipe
- Devolutiva das análises por equipe
- Foto da equipe por jogador
- Sala de conferências (2 horas)

**3. Experiência Premium** — Análise individual e em equipe
- Jogo na sala de escape
- Análise comportamental individual e da equipe
- Devolutiva das análises por equipe
- Relatório individual por jogador
- Foto da equipe por jogador
- Sala de conferências (3 horas)

**4. Sala In Company** — Leva o escape pra empresa
- Ambientação e decoração (até 30m²)
- Desenvolvimento lógico e tecnológico
- Personalização de áudios e vídeo
- Montagem e operacionalização
- Ranking de equipes
- Video case completo
- Tempo: 30 min | 8-10 jogadores | Operação: 3 dias | Público: até 600 jogadores
- Itens não incluídos: estrutura física, iluminação, climatização e segurança

**5. Praça do Tempo** — Produto para eventos
- 4 estações interativas e instagramáveis
- 32 jogadores/hora | 15 min por módulo | 2 jogadores por cabine
- Operação: 50m²
- Sistema de recompensas colecionáveis
- Itens não incluídos: energia, iluminação, climatização e segurança

**Lote de ingressos corporativos:**
- Disponível para grupos de 25, 50 e 100+ pessoas
- Valores sob consulta — personalizados por tamanho do grupo e pacote escolhido

**Competências desenvolvidas:**
Trabalho em equipe, comunicação assertiva, visão sistêmica, inteligência emocional, gestão de tempo, criatividade funcional.

**Diferenciais da página B2B:**
- Depoimentos e cases de sucesso
- Logos de parceiros (UNICEF e outros)
- Certificação ICSS em destaque
- Estatísticas: 90% das empresas preferem experiências vivenciais, +170k pessoas impactadas
- Vídeo case disponível

**Fluxo de contato:**
- Landing page B2B robusta com os pacotes e diferenciais — sem preços exibidos
- CTA principal: "Fale com um especialista" — formulário + WhatsApp direto pro vendedor
- Objetivo: o cliente entra em contato, o vendedor qualifica e apresenta proposta personalizada
- Formulário integrado ao CRM + botão WhatsApp (número específico do vendedor corporativo no DataCrazy)
- Lead entra no CRM automaticamente com dados da empresa
- Vendedor conduz orçamento personalizado e fecha negócio
- Vendedor faz a reserva no sistema pelo cliente quando fechado

**Contato comercial:**
- Thyago Dias: +55 61 98437-2140
- CNPJ: 24.743.550/0001-69

---

## 25. SISTEMA DE AVALIAÇÕES

- Só quem jogou pode avaliar (verificação automática)
- Aparecem publicamente na página de cada sala
- Moderação: admin aprova antes de publicar
- Avalia só a sala — experiência geral vai pro Google
- WhatsApp pós-sessão: link pra avaliar a sala no site + link pro Google Review

---

## 26. SISTEMA DE CUPONS

### 26.1 Tipos de desconto
- Percentual (ex: 10% off)
- Valor fixo (ex: R$ 20 de desconto)

### 26.2 Abrangência (admin escolhe na criação)
- Geral — qualquer sala e unidade
- Por sala específica
- Por unidade
- Por tipo de produto

### 26.3 Regras
- Limite de uso: por quantidade OU por data — admin escolhe
- Um cupom por compra — sem acumulação
- Valor mínimo: campo opcional
- Só Super Admin cria cupons

---

## 27. REGRAS DE CANCELAMENTO E REMARCAÇÃO

| Situação | O que acontece |
|---|---|
| Cancela com +24h | Reembolso total |
| Cancela com -24h | Crédito pra próxima reserva |
| Remarca com +24h | Liberado, sem custo |
| Remarca com -24h | Não permitido |
| Máximo de remarcações | 3 por reserva |
| Não apareceu sem cancelar | Perde o valor — sem reembolso e sem crédito |
| Lembrete 48h antes | WhatsApp com botão confirmar ou remarcar |

- Tudo feito pelo próprio cliente no site — sem precisar falar com a loja

---

## 28. LISTA DE INTERESSE (Lançamentos)

- Página de cadastro pra sala nova ou unidade nova
- Objetivo: medir interesse + mandar oferta antecipada
- Clientes Prime: acesso ainda mais antecipado + card colecionável da sala nova
- Aviso por e-mail + WhatsApp quando lançar
- Gerenciado pelo painel de automações do marketing

---

## 29. ENCONTRAR GRUPO

- Botão "Procurar Grupo" no site
- Abre grupo do WhatsApp da comunidade
- Sem complexidade extra no sistema MVP

---

## 30. SEGURANÇA

### 30.1 Camadas implementadas
- **SSL/TLS:** Vercel — automático, nota A+, gratuito
- **Autenticação:** NextAuth.js v5 — JWT com rotação, bcrypt, rate limiting, controle por papéis
- **Banco:** Neon SSL obrigatório + Prisma (queries parametrizadas — proteção nativa contra SQL Injection)
- **Pagamentos:** Stone PCI-DSS — nunca armazena dados de cartão, só tokens + webhooks com HMAC
- **Headers de segurança:** X-Frame-Options, CSP, X-Content-Type-Options, HSTS
- **Variáveis sensíveis:** nunca no GitHub — só na Vercel
- **Zod:** valida toda entrada da API

### 30.2 Proteção contra ataques
| Ataque | Proteção |
|---|---|
| SQL Injection | Prisma |
| XSS | Next.js escapa HTML + CSP |
| CSRF | NextAuth nativo |
| Força bruta | Rate limiting no login |
| Clickjacking | X-Frame-Options |

### 30.3 LGPD
- Política de privacidade e termos de uso publicados
- Consentimento de dados dos jogadores
- Dados de menor de idade tratados com cuidado extra
- Link de compartilhamento de perfil infantil expira em 7 dias

---

## 30A. SISTEMA DE SEO

### 30A.1 Contexto atual (dados Wix — últimos 30 dias até 09/06/2026)
- Impressões no Google: 33.076
- Cliques orgânicos: 1.857
- CTR médio: 5,6%
- Posição média: 6,34 (1ª página)
- Forte em buscas de marca e local (posição 1–2): "escape room park shopping", "escape room pier 21", "escape room brasilia"
- Oportunidade não explorada: buscas de intenção alta sem localidade ("o que fazer em Brasília com amigos", "team building Brasília", "escape room para crianças")

### 30A.2 Arquitetura de URLs (decisão fechada)
Estrutura hierárquica que atende tanto a experiência "sala primeiro" quanto o SEO local por unidade:

```
/salas/[slug-da-sala]                        → Página principal da sala (todas as unidades)
/salas/[slug-da-sala]/[slug-da-unidade]      → Variante da sala na unidade específica
/unidades/[slug-da-unidade]                  → Página da unidade (todas as salas disponíveis)
/unidades/[slug-da-unidade]/[slug-da-sala]   → Intersecção: sala + unidade + calendário + preço local
```

**Exemplos reais:**
- `/salas/ilha-dos-piratas` — página principal da sala
- `/salas/ilha-dos-piratas/parkshopping` — variante PKS
- `/unidades/parkshopping` — página da unidade
- `/unidades/parkshopping/ilha-dos-piratas` — intersecção com calendário e preço local

**Lógica:** `/salas/[slug]` ranqueia para buscas de experiência. `/unidades/[slug]` ranqueia para buscas locais ("escape room park shopping"). A canonical tag aponta as variantes para a página-mãe da sala — Google entende a hierarquia e indexa os dois níveis.

**Slugs obrigatórios das unidades:**
- `pier-21`
- `parkshopping`
- `taguatinga-shopping`
- `santa-ursula`

### 30A.3 SEO técnico (responsabilidade do código — Sprint 1)
- **Sitemap dinâmico:** gerado automaticamente pelo Next.js — inclui todas as salas, variantes por unidade e páginas institucionais. Submetido ao Google Search Console.
- **robots.txt:** configurado para permitir indexação de todas as rotas públicas e bloquear rotas de admin, API e checkout.
- **Meta tags dinâmicas:** cada página com `<title>` e `<meta description>` únicos gerados via `generateMetadata()` do Next.js. Nenhuma página com meta duplicada.
- **Open Graph:** preview rico no WhatsApp, Instagram e Facebook — título, descrição e imagem da arte da sala para cada página de sala.
- **Structured Data (schema.org):**
  - `LocalBusiness` com endereço, telefone, horário e geo para cada unidade
  - `EntertainmentBusiness` para o site principal
  - `Product` ou `Event` para cada sala (preço, avaliações, disponibilidade)
  - Rich snippets de avaliações visíveis diretamente no resultado do Google
- **Canonical tags:** variantes de unidade apontam para a página-mãe da sala
- **hreflang:** não necessário (site em português apenas)
- **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1 — obrigatório para manter posicionamento orgânico
- **Performance:** <2s em 4G já definido no item 4.5 — alinhado com ranking de Core Web Vitals do Google

### 30A.4 SEO de conteúdo (responsabilidade do copy — antes do Sprint 1)
- Cada sala com H1 único baseado no nome e tagline oficiais
- Sinopse expandida em texto corrido (mínimo 150 palavras) — texto real indexável, não só o pôster
- Página de cada unidade com: nome do shopping, bairro, cidade, CEP e estado explícitos no HTML (não só na imagem)
- Página "O que é Escape Game" reescrita para ranquear em buscas educativas — target: "o que é escape game", "como funciona escape room", "escape game para iniciantes"
- Alt text em todas as imagens das salas com nome da sala e contexto
- **Conteúdo que falta e tem potencial:** páginas de categoria por gênero (ex: `/salas/aventura`, `/salas/investigacao`) — criam landing pages para buscas de intenção específica

### 30A.5 SEO local (fora do escopo do site — responsabilidade operacional)
- 4 fichas separadas no Google Meu Negócio — uma por unidade, cada uma com CNPJ próprio
- Cada ficha com: fotos atualizadas, horários corretos, categoria "Escape room" + "Entretenimento"
- Avaliações do Google respondidas publicamente (positivas e negativas)
- NAP (Nome, Endereço, Telefone) idêntico no site e nas fichas do Google — inconsistência penaliza ranqueamento local
- **Impacto direto:** é o que mantém as posições 1–2 que vocês já têm em buscas locais

### 30A.6 Monitoramento pós-lançamento
- Google Search Console conectado desde o dia do lançamento
- Relatório mensal de: impressões, cliques, CTR, posição média e páginas de entrada
- Meta de CTR para buscas genéricas ("escape room"): subir de 5,6% para 8%+ via melhoria de títulos e descriptions
- Alertas de indexação: qualquer página com erro 404 ou bloqueio no robots.txt notifica imediatamente



| Item | Responsável | Prazo |
|---|---|---|
| App Key + App Secret dos 4 Omies | Erickson | Antes Fase 2 |
| Ligar pra Meep: (31) 3172-0750 | Erickson | Antes Fase 2 |
| Confirmar contato atualizado do vendedor corporativo | Erickson | Antes Fase 1 |
| PDFs dos cards colecionáveis | Erickson | Antes Fase 3 |
| Alinhamento API com dev Arquivo 60 | Erickson | Antes Fase 3 |
| Parcelamento Escape Prime online | Donos decidirem | Antes Fase 3 |
| Credenciais Stone Online | Erickson | Antes Fase 1 |
| Conversa com Meep sobre API | Erickson | Antes Fase 2 |
| Fotos + textos das salas do marketing | Marketing | Antes Fase 1 |
| Criar repositório GitHub + Vercel + Neon | Erickson | Antes Fase 1 |
| Referências visuais pra briefing | Erickson | Etapa 0 ✅ |
| Testar ferramentas de IA pra cartazes (Midjourney, Ideogram, Flux, Firefly) | Erickson / Marketing | Antes Fase 1 |
| Cartazes de todas as 16 salas finalizados com IA ou marketing | Erickson / Marketing | Antes Sprint 1 |
| Fotos reais das equipes dentro dos cenários (base para transformação temática) | Marketing | Antes Sprint 9 |
| Testar ferramenta de transformação temática com IA (Runway, Kling, Pika) | Erickson | Antes Sprint 9 |

---

## 32. ROADMAP — 12 SPRINTS

**Fase 1 (Meses 1–2) — Base da plataforma:**
- Sprint 1: Setup + migração site e salas
- Sprint 2: Sistema de reservas (calendário, bloqueio, limite)
- Sprint 3: Pagamento Stone + Inter + confirmações e-mail + WhatsApp
- Sprint 4: Painel admin + Telão + Painel de conteúdo

**Fase 2 (Meses 3–4) — Inteligência e automação:**
- Sprint 5: Lobby pós-reserva completo
- Sprint 6: CRM com IA + segmentação + migração de base
- Sprint 7: Automações WhatsApp + e-mail + editor de campanhas
- Sprint 8: Integração Omie (4 instâncias) + Meep

**Fase 3 (Meses 5–6) — Diferencial competitivo:**
- Sprint 9: Conta do jogador + perfil + dependentes
- Sprint 10: Kings of the Escape + gamificação + conquistas
- Sprint 11: Escape Prime completo + tablet + Arquivo 60
- Sprint 12: Testes + treinamento + lançamento

---

*Este documento é vivo e será atualizado conforme pendências forem resolvidas e decisões tomadas durante o desenvolvimento.*

---

**Changelog:**
- **v1.2 — 10/06/2026:** Adicionados itens aprovados no feedback dos donos: áudio opt-in com preferência salva na conta + referência interna Arquivo 60 (4.2.6), produção de cartazes com IA em cascata interna/marketing (4.2.7), fotos temáticas com IA estilo Kadroom para Kings e perfil (4.2.8). Tabela de pendências atualizada com 4 novos itens. Briefing visual marcado como concluído (✅).
- **v1.1 — 10/06/2026:** Seção 4 expandida com identidade visual completa da Etapa 0. Adicionada Seção 30A com sistema de SEO completo. Corrigido "Saga do Esfolador". Filtros do catálogo atualizados.
- **v1.0 — 07/06/2026:** Versão inicial.
