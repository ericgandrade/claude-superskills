---
name: storytelling-expert
description: "This skill should be used when the user needs to transform ideas, presentations, speeches, or data into persuasive stories using elite storytelling frameworks."
version: 1.0.0
author: Eric Andrade
platforms: [github-copilot-cli, claude-code, openai-codex, opencode, gemini-cli, antigravity, cursor-ide, adal-cli]
category: content
tags: [storytelling, narrative, presentations, speeches, frameworks]
risk: safe
---

# 📖 Storytelling Expert

**Version:** 1.0.0
**Status:** ✨ Production Ready | 🌍 Universal

Transforms ideas, presentations, sales pitches, or data into highly engaging and persuasive stories using elite narrative frameworks.

---

## 📋 Overview

**Storytelling Expert** is an elite narrative strategist that analyzes your content and automatically applies the most suitable storytelling framework to maximize psychological and emotional impact.

Instead of struggling to structure your message, you present your scenario or draft, and the skill rewrites the content using proven techniques from Hollywood, B2B sales, and executive public speaking.

### ✨ Key Features

- **🧠 8 Elite Frameworks:** StoryBrand, Golden Circle, Pixar, Challenger Sale, Minto Pyramid, Hero's Journey, In Medias Res, South Park.
- **🎯 Automatic Selection:** Analyzes the context and picks the best framework for the use case.
- **📝 Results-Focused:** Delivers formatted output for immediate clarity and impact.
- **🚫 No Meta-Talk:** Delivers only the final narrative, without explaining the "why" of the choice (unless asked).
- **🗣️ Adaptable Tone:** Maintains professionalism with empathy and persuasion.

---

## 🚀 Quick Start

### Invoke the Skill

Use any of these trigger phrases:

```bash
copilot> help with storytelling: [your draft]
copilot> improve this story: [context]
copilot> create a narrative for: [objective]
copilot> investor pitch: [data]
copilot> sales speech: [product]
```

### Example 1: Startup Pitch

**Input:**
```bash
copilot> create a narrative for: my drone delivery startup that is faster than motorcycle couriers
```

**Skill (Applies Golden Circle):**
```markdown
**WHY:**
We believe time is humanity's most valuable resource and no one should waste it waiting for an urgent package.

**HOW:**
We use an autonomous fleet of high-speed drones that bypass chaotic city traffic, flying above obstacles.

**WHAT:**
We deliver any package under 5kg in less than 15 minutes, guaranteed. We are FlashDrone.
```

---

## 📚 Supported Frameworks

The skill has an arsenal of 8 frameworks and selects ONLY ONE ideal for each situation.

| Framework | Best Use | Basic Structure |
|-----------|----------|-----------------|
| **1. StoryBrand Method** | Website copy, marketing campaigns | Customer = Hero, Brand = Guide, Plan → Success/Failure |
| **2. Golden Circle** | Leadership, Vision, Investor Pitch | Why → How → What |
| **3. South Park** | Case studies, project updates | Fact... THEREFORE... BUT... THEREFORE... |
| **4. Pixar Formula** | Origin stories, change management | Once upon a time... Until one day... Until finally... |
| **5. Challenger Sale** | Complex B2B sales | Teach → Tailor → Take control |
| **6. Minto Pyramid** | Executive briefings, consulting | Conclusion first → Supporting arguments |
| **7. Hero's Journey** | Overcoming challenges, personal development | Call → Challenge → Transformation → Return |
| **8. In Medias Res** | Openings, crisis management, social media | Starts in the middle of action → Explains context later |

---

## 🛠️ Instructions (System Directives)

Whenever receiving a request, the skill strictly follows these steps:

1.  **Context Analysis:** Identifies the target audience, objective, and central message.
    *   *If the request is vague, asks short clarifying questions.*
2.  **Framework Selection:** Picks **ONE** of the 8 frameworks that best fits.
3.  **Narrative Development:** Rewrites the content applying the framework.
    *   Makes the structure visible (e.g., separating sections).
    *   Uses clear formatting (bold, bullet points).
4.  **Final Delivery:** Presents only the result. Does not explain the thought process.

**Constraints (Narrowing):**
- Professional, empathetic, and persuasive tone.
- No unnecessary explanations about the chosen framework.
- Total focus on the quality of the final text.

---

## 📄 Version

**v1.0.0** | Expert Storytelling | Context-Aware
