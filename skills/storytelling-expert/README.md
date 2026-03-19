# 📖 Storytelling Expert

Transforma ideias, apresentações, discursos de vendas ou dados em histórias altamente engajadoras e persuasivas utilizando frameworks de narrativa de elite.

## 🎯 Objetivo

Ajudar usuários a comunicar suas mensagens com máximo impacto psicológico e emocional, aplicando automaticamente o framework de storytelling ideal para cada situação.

## 🚀 Como Usar

### Instalação

Se você já clonou o repositório `claude-superskills`, basta navegar até o diretório e executar:

```bash
npx claude-superskills install --local skills/storytelling-expert
```

Ou adicione manualmente ao seu arquivo de configuração do CLI.

### Comandos de Exemplo

```bash
copilot> crie uma narrativa para: lançamento de produto B2B
copilot> melhore essa história: [colar texto]
copilot> pitch de vendas: software de gestão para pequenas empresas
copilot> discurso motivacional: equipe desmotivada após fusão
```

## 🧠 Frameworks Suportados

O skill analisa seu pedido e seleciona automaticamente um destes 8 frameworks:

1.  **StoryBrand Method** (Foco no cliente como herói)
2.  **Golden Circle** (Começa com o Porquê)
3.  **South Park Framework** (Conectivos de causalidade)
4.  **Pixar Formula** (Estrutura clássica de animação)
5.  **Challenger Sale** (Vendas complexas e ensino)
6.  **Minto Pyramid Principle** (Comunicação executiva direta)
7.  **Hero's Journey** (Jornada do Herói / Monomito)
8.  **In Medias Res** (Começa no meio da ação)

## 📝 Exemplo de Saída

**Input:** "Preciso convencer meu chefe a investir em IA."

**Skill (Aplica Minto Pyramid):**

**CONCLUSÃO PRINCIPAL:**
Devemos investir R$ 50k em ferramentas de IA agora para economizar R$ 200k anuais em automação.

**ARGUMENTO 1:**
Nossa equipe gasta 30% do tempo em tarefas repetitivas que a IA resolve em segundos.

**ARGUMENTO 2:**
Nossos concorrentes já adotaram e estão entregando projetos 2x mais rápido.

**PRÓXIMOS PASSOS:**
Aprovar o piloto de 3 meses com a ferramenta X.

---

**Licença:** MIT

---

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Context Analysis → Framework Selection → Narrative Draft → Persuasion Pass) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.1.0 |
| Author | Eric Andrade |
| Created | 2026-02-22 |
| Updated | 2026-03-19 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | content |
| Tags | storytelling, narrative, presentations, speeches, frameworks |
| Risk | safe |
