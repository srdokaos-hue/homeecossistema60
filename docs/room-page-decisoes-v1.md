# Decisões da página individual da sala (/salas/[slug]) — v1

Sessão de planejamento feita fora do Claude Code. Layout aprovado pra Ilha dos Piratas (primeira sala, vira template estrutural pras outras 15). Ler antes de tocar em qualquer coisa relacionada a `/salas/[slug]`.

## Status
Rota `/salas/[slug]` **ainda não existe no código**. Este documento descreve o layout aprovado em mockup (HTML estático), a ser implementado do zero como página React/Next.js real.

## Layout geral (desktop) — de cima pra baixo
1. Link "← Salas" voltando pro catálogo
2. **Hero banner** full-width (~340px altura): imagem de fundo cobrindo a área toda; tags (Pra família / Não assusta / Livre) sobrepostas no canto superior esquerdo; gênero + título (Anton, ~38px) + subtítulo no rodapé esquerdo com gradiente escuro por trás; ícone de play (▶, vermelho) no rodapé direito — **sem** ícone de câmera (galeria já tem seção própria, não precisa de atalho no hero)
3. **Fileira de stats** (3 colunas iguais): Duração, Jogadores (com nota "mín. X obrigatório" abaixo, em vermelho), Dificuldade (reaproveita o `DifficultyMeter` existente)
   - ⚠️ NÃO incluir "Unidades" como 4ª stat — já é redundante com o seletor de unidade da sidebar
4. **Galeria do Ambiente**: grid 4 colunas, placeholder até ter fotos reais. Separada do vídeo (vídeo fica só no ícone ▶ do hero, não duplica aqui)
5. **A História**: texto da sinopse (placeholder até ter conteúdo real por sala)
6. **Ranking do Mês**: tabela com posição/equipe/tempo do mês corrente (reseta mensalmente). Ao lado do título, mostra o recorde de todos os tempos: **nome ainda não confirmado pelo Erickson** — sugestão "Recorde Absoluto" (mais claro) ou "Recorde Lendário" (mais GG/RPG, combina com Kings of the Escape). Decidir antes de implementar o rótulo.
7. **Avaliações**: 3 cards lado a lado (desktop) / empilhados (mobile), placeholder até ter avaliações reais
8. Link "Ver regulamento do jogo" (regras da própria sala/jogo, não política geral do site)
9. **Você Também Pode Curtir**: 3 cards no estilo rico (mesmo card da home desktop) com salas relacionadas, preço "a partir de R$84,90 por pessoa" como padrão pra todas (não inventar preço específico por sala sem confirmação)

## Sidebar de reserva (desktop, sticky)
- Seletor de unidade (pílulas clicáveis) **só aparece se a sala tiver mais de 1 unidade**. Se for unidade única, mostra o nome da unidade como texto estático (não-clicável), sem pílula de escolha — local ainda precisa aparecer na página, só não como seletor interativo.
- Preço muda dinamicamente conforme a unidade selecionada (rooms com preço diferente por unidade — ex: Ilha dos Piratas é R$84,90 no ParkShopping e R$99,90 na Santa Úrsula). Nunca mostrar preço único fixo se as unidades têm valores diferentes.
- Texto "Mínimo de X pessoas · máximo Y" explícito (não só o range "3-6" sem contexto)
- Badges de status (✅ Melhor preço garantido / 🔥 Alta demanda hoje): confirmar com Erickson se são dado real/dinâmico ou só copy de marketing fixo — muda o trabalho técnico
- Grade de horários: por enquanto ilustrativa (sem reserva online ainda implementada)
- Botão "Reservar Agora →": fluxo de **reserva real do site**, não WhatsApp. WhatsApp continua existindo na página (mesmo componente flutuante do resto do site) só pra dúvida/suporte, função separada do CTA de reserva.
- Selos de confiança (Pagamento Seguro / Cancelamento Grátis): confirmar se são políticas reais antes de publicar

## Selo especial no hero (Cativeiro "A Mais Jogada", Chronnos "2 Jogos em 1")
Fica no canto **superior direito** do hero, espelhando as tags que ficam no canto superior esquerdo. Só aparece nas 2 salas que têm selo; as outras 14 não mostram nada nesse canto.

## Mobile — diferenças do desktop
- Sidebar de reserva vira **barra fixa no rodapé da tela** (preço + botão "Reservar Agora" sempre visíveis), em vez de sidebar lateral — padrão comum em apps de reserva (Airbnb, OpenTable)
- Seletor de unidade (quando aplicável) migra pra dentro do fluxo de conteúdo, logo abaixo do hero — e atualiza a barra fixa do rodapé ao trocar
- Avaliações empilham em coluna única (não 3 lado a lado)
- Seção "Você Também Pode Curtir" usa o **card enxuto do catálogo** (grid 2 colunas, sem título sobreposto, 4 tags nos cantos) — mesmo componente já aprovado pra `/salas` e pra home mobile. Não criar um terceiro tipo de card.

## Coisas testadas e descartadas nessa sessão (não tentar de novo sem repensar a causa)
- **Atmosfera genérica em CSS puro** (raios de sol via conic-gradient, partículas flutuantes, silhuetas SVG desenhadas à mão): testada em 2 intensidades (sutil e forte), reprovada nas duas — ficou com "cara de programador", não de arte de verdade. Pendente: abordagem baseada em assets de imagem reais (ver próxima seção), não CSS improvisado.
- **Transição de loading "Redline"** (linha vermelha se desenhando + tela rasgando ao meio): tecnicamente funcionou, mas teve bug de execução (texto "\n" vazando, timing). Ideia em si não foi descartada por ser ruim, foi removida junto no rollback geral — pode valer retomar isolada depois.

## Direção atual em andamento: tema visual "Ilha dos Piratas"
Decidido seguir um caminho diferente do CSS puro: usar **assets de imagem reais** (background.webp, hero-poster.webp, coin-01/02.png, straw-hat.png, rope-divider.png, golden-particles.png) em `public/rooms/ilha-dos-piratas/`, com cards em glass-morphism (fundo translúcido + blur + borda dourada sutil), elementos decorativos posicionados em camadas com baixa opacidade controlada. Prompt de implementação já preparado separadamente — ver conversa mais recente. Enquanto os assets não existem, página usa fallback em gradiente escuro (não pode quebrar por falta de imagem).

Ícone de chapéu de palha deve ser **genérico** (sem faixa vermelha característica), por causa da regra já estabelecida de não usar elementos visuais de franquia licenciada em elemento estrutural do site.
