# 💼 McKinsey Strategist

Atua como um Sócio Sênior da McKinsey & Co. para diagnosticar problemas complexos de negócios e fornecer recomendações estratégicas de alto impacto.

## 🎯 Objetivo

Ajudar usuários a resolverem problemas complexos utilizando frameworks de consultoria de elite, rigor analítico e pensamento de primeiros princípios.

## 🚀 Como Usar

### Instalação

Se você já clonou o repositório `claude-superskills`, basta navegar até o diretório e executar:

```bash
npx claude-superskills install --local skills/mckinsey-strategist
```

Ou adicione manualmente ao seu arquivo de configuração do CLI.

### Comandos de Exemplo

```bash
copilot> act as a consultant: queda de receita em e-commerce
copilot> strategic analysis for: startup SaaS com churn alto
copilot> business diagnosis: expansão internacional de varejo
copilot> consulting case: fusão de duas empresas de tecnologia
```

## 🧠 Frameworks Integrados

O skill aplica automaticamente um diagnóstico profundo utilizando:

1.  **SWOT Analysis** (Forças, Fraquezas, Oportunidades, Ameaças)
2.  **VRIO Framework** (Vantagem Competitiva Sustentável)
3.  **McKinsey 7S Framework** (Alinhamento Organizacional)
4.  **Second-Order Thinking** (Consequências de 2ª e 3ª ordem)
5.  **Impact vs. Effort Matrix** (Priorização Estratégica)

## 📝 Exemplo de Saída

**Input:** "Analise a entrada de um novo competidor low-cost no mercado."

**Skill (Síntese Executiva):**
"A entrada do competidor low-cost ameaça erodir a margem em 20%, exigindo uma diferenciação imediata via proposta de valor premium e bloqueio de canais de distribuição exclusivos."

**Deep Dive Analítico:**
[Tabelas detalhadas de SWOT, VRIO e 7S]

**Proposta Estratégica:**
1.  **Bloqueio de Canais Exclusivos** (Impacto Alto, Esforço Médio)
    *   *2ª Ordem:* Retaliação de preços pelo competidor.
    *   *Mitigação:* Contratos de longo prazo com distribuidores chave.

---

**Licença:** MIT

---

## What's New in v2.0

- **Progress Tracking** — 4-phase gauge bar (Problem Framing → Framework Application → Strategic Analysis → Executive Synthesis) displayed during execution
- **EVals** — `evals/evals.json` with 3 realistic test cases; `evals/trigger-eval.json` with 20 queries (10 trigger / 10 no-trigger) for description optimization
- **Standardized description** — SKILL.md description updated to Anthropic skill-creator format

---

## Metadata

| Field | Value |
|-------|-------|
| Version | 2.0.0 |
| Author | Eric Andrade |
| Created | 2026-02-22 |
| Updated | 2026-03-06 |
| Platforms | GitHub Copilot CLI, Claude Code, OpenAI Codex, OpenCode, Gemini CLI, Antigravity, Cursor IDE, AdaL CLI |
| Category | strategy |
| Tags | consulting, strategy, mece, frameworks, business-analysis |
| Risk | safe |
