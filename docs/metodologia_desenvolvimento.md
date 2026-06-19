# Metodologia de Desenvolvimento — 60 Minutos Escape Game

Baseada em 3 fontes: Gabriel Mark (escopo e design), Débora Folloni (SDD), Enzo Barbatto (Anti-AI-Slop). Adaptada pro projeto do 60 Minutos.

---

## ETAPA 0 — Briefing Visual (antes de qualquer código)

Referência: Gabriel Mark

1. Coletar referências visuais — sites que você acha bonitos, não precisa ser do mesmo nicho
2. Definir palavras que descrevem a estética desejada (ex: imersivo, premium, aventureiro)
3. Montar identidade visual — paleta de cores, tipografia, espaçamentos
4. Wireframes das telas principais
5. Protótipo visual no v0.dev — ver exatamente como vai ficar antes de codar
6. Aprovação do design antes de avançar pra próxima etapa

---

## ETAPA 1 — Fase de Pesquisa (Spec Driven Development)

Referência: Débora Folloni

No Claude Code, com o PRD em mãos:

1. Pedir pro Claude Code pesquisar a base de código existente (se houver) e documentações externas das tecnologias usadas
2. Buscar padrões de implementação prontos — não reinventar a roda
3. Gerar o arquivo `prd.md` com tudo que foi encontrado relevante
4. **Rodar `/clear`** para limpar a janela de contexto

**Regra de ouro:** nunca deixar a janela de contexto passar de 40-50%. Quanto mais cheia, pior o resultado.

---

## ETAPA 2 — Fase de Spec

Com o contexto limpo:

1. Colar o `prd.md` gerado na etapa anterior
2. Pedir pro Claude Code gerar o `spec.md` — documento tático que define:
   - O path exato de cada arquivo a ser criado ou modificado
   - A responsabilidade exata de cada arquivo (sem misturar lógica)
   - Pseudocódigo ou snippets de referência quando necessário
3. **Rodar `/clear`** novamente

---

## ETAPA 3 — Implementação

Com o contexto totalmente livre:

1. Colar o `spec.md`
2. Implementar arquivo por arquivo, seguindo exatamente o que está na spec
3. Antes de escrever qualquer código, verificar se já não existe um componente similar (evitar repetição)
4. Após cada tela ou fluxo implementado, parar e pedir validação
5. Rodar `/review` ou `/code-review ultra` antes de cada deploy

---

## Regra de Ouro de Interatividade

O Claude Code é um agente autônomo mas deve ser estritamente controlado:

- **Nunca** criar arquivos de código ou instalar pacotes sem autorização expressa
- A cada subetapa, **parar** e perguntar: *"Qual desses caminhos nós vamos seguir agora?"* ou *"Podemos avançar para o próximo passo?"*
- Nenhuma decisão crítica é tomada sozinho pelo agente

---

## Skills no Claude Code

Referência: vídeo "Testei +100 Skills do Claude Code"

| Skill | Função | Status neste projeto |
|---|---|---|
| `/skill-creator` | Criar novas skills sem escrever arquivo manualmente | verificar se instalada |
| **Super Powers** | Força o agente a planejar antes de codar, trabalhar isolado, criar testes | externa — instalar se for usar |
| **GSD** (`npx get-shit-done-cc --claude --global`) | Cria subagentes por tarefa, evita context rot | externa — instalar se for usar |
| `/review` | Caça bugs no código | disponível |
| `/code-review ultra` | Análise completa de lógica, performance e segurança (requer projeto no GitHub) | **disparado pelo Erickson — é cobrado, o agente NÃO lança sozinho.** `/ultrareview` é alias depreciado |
| **frontend-design** | Evita AI Slop — define direção estética antes de codar | externa — instalar se for usar |

---

## Diretrizes Anti-AI-Slop

Referência: Enzo Barbatto

**Proibido:**
- Gradientes roxos genéricos com fundo branco
- Layouts 100% previsíveis
- Fontes padrão de sistema (Inter, Roboto, Arial)

**Obrigatório:**
- Direção estética ousada (minimalista radical, brutalista, ou a definida no briefing)
- Tipografia marcante e única
- Quebras de grid, assimetria
- Fundos texturizados quando fizer sentido
- Animações com propósito (imersão), não decoração vazia

---

## Animações de scroll (hero imersiva)

Referência: vídeo "Antigravity + Nano Banana 2"

1. Gerar imagem do primeiro frame (estado inicial da animação)
2. Gerar imagem do último frame com IA de imagem (Nano Banana 2 ou similar)
3. Gerar vídeo de transição entre as duas imagens (Cling 3 ou similar via Higgsfield)
4. Pedir pro agente implementar como hero controlada por scroll:
   - Vídeo mudo, sem controles visíveis
   - Hero travada na tela até o vídeo terminar
   - Depois disso a página rola normalmente

**Frase obrigatória no prompt:** *"Se o vídeo travar durante o scroll, reencode ele com FFmpeg para que cada frame seja um keyframe."*

---

## Uso do MCP Firecrawl (opcional)

Para extrair branding, fontes, cores e textos de um site existente (ex: o site Wix atual) e alimentar o agente com contexto real durante a migração.

---

## Regras fixas no CLAUDE.md do projeto

```
- Responder sempre em português brasileiro
- never hardcode style variables
- always import from the global CSS file
- Nunca criar código ou instalar pacotes sem autorização expressa
- Sempre perguntar antes de avançar para a próxima subetapa
```

---

## Resumo visual do fluxo completo

```
ETAPA 0 (Briefing Visual)
↓
ETAPA 1 (Pesquisa → prd.md) → /clear
↓
ETAPA 2 (Spec → spec.md) → /clear
↓
ETAPA 3 (Implementação arquivo por arquivo)
↓
/review ou /code-review ultra antes de cada deploy
↓
Deploy na Vercel
```

---

## Adaptações para este projeto (confirmadas com Erickson)

Pontos onde a metodologia genérica foi ajustada à realidade deste repo:

- **Dois níveis de PRD/spec.** Já existe um PRD estratégico grande (`docs/prd_v1_3.md`). Os `prd.md`/`spec.md` por-feature da metodologia (output de pesquisa) ficam em `docs/specs/<feature>/` pra não colidir. Ex: `docs/specs/pagina-salas/prd.md` + `spec.md`.
- **`never hardcode style variables`:** o sistema de tokens já existe em `app/globals.css` (`--color-void`, `--color-blood`, `--color-gold`, etc., expostos como utilitários Tailwind). Código novo usa token/utilitário, nunca hex avulso. A migração dos ~12 hex legados espalhados em componentes fica pra **fase de refino** (decisão de 19/06/2026) — não é refactor mecânico, exige criar/nomear tokens novos (ex: dourado-texto `#3a2e08`, coral 12+ `#ff5a5f`, azul `#1B4FE1`).
- **Exceção à regra de cor:** o verde do WhatsApp (`#25D366` em `components/whatsapp-button.tsx`) é cor de marca externa, não da paleta 60min — fica inline com comentário, não vira token.
- **`/clear` e disciplina de contexto:** o agente não consegue rodar `/clear` em si mesmo. Nas viradas de fase (ETAPA 1→2→3) o agente avisa "hora de dar /clear"; o gatilho é do Erickson.
- **`/code-review ultra`** (ex-`/ultrareview`) é cobrado e disparado só pelo Erickson — o agente não lança sozinho.

---

*Documento complementar ao PRD principal do projeto 60 Minutos Escape Game.*
