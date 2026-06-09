# Day 07 — My Claude Usage Strategy

> **Challenge:** abtalks 60 Days Claude Challenge
> **Theme:** Prompt Engineering & AI Workflow Optimization
> **Author:** The Midnight Architect (Deborah Olofin)
> **Date:** June 2026

---

## 📌 Overview

This task involved building a **personalized Claude AI usage strategy** — identifying the right model tier and effort level for every type of task in a real daily workflow as a data science trainee and portfolio builder.

The core premise: output quality isn't just about *which* model you use. It's the combination of **model + effort level + task type** that determines how well Claude works for you.

---

## 🎯 Objectives

- Map primary daily activities to the most appropriate Claude model (Haiku / Sonnet / Opus)
- Understand effort levels (Low / Standard / High / Max) and when each is most effective
- Build a reusable reference document for a daily Claude workflow
- Surface and correct the biggest gaps in existing usage habits

---

## 💡 Key Learnings

### 1. Unconscious Competence → Conscious Strategy

Before this task, the pattern was already there — reaching for Sonnet by default, escalating for harder problems, batching lighter tasks — without having a deliberate framework for it. This task surfaced and formalized that intuition into a repeatable system.

### 2. Effort Levels Are Not a Quality Dial

The biggest misconception going in: *High effort = better responses, always.*

In practice, it's more precise than that:

| Effort Level | When to Use | Frequency |
|---|---|---|
| **Low** | Trivial lookups only | Almost never |
| **Standard** | Debugging, writing, code gen, learning | ~70% of tasks |
| **High** | New concepts, tricky bugs, design decisions | ~20% of tasks |
| **Max** | Architecture, synthesis, career strategy | ~5–10% of tasks |

Defaulting to High on everything doesn't improve quality — it wastes latency, dulls your ability to distinguish task complexity, and slows your iteration speed.

### 3. Model Selection Is About Task Type, Not Habit

| Task Category | Best Model | Best Effort |
|---|---|---|
| Quick syntax lookups, definitions | Haiku | Standard |
| Daily coding, debugging, writing, learning | Sonnet | Standard / High |
| ML architecture, research synthesis, career planning | Opus | High |
| Capstone / thesis writing, complex system design | Opus | High |

### 4. The Right Default Is Escalation, Not Prevention

Start every session on **Standard**. If the answer feels shallow or misses the technical nuance — bump to High. That single habit produces noticeably better outputs without sacrificing pace.

---

## 🖼️ Output

**`claude_usage_strategy.png`**
A 1200 × 3840px visual strategy document rendered in Python (Pillow), styled in the Midnight Architect aesthetic.

**Contents:**
- Recommended primary model with rationale
- Full model guide — Haiku, Sonnet, Opus (use cases + what to avoid)
- Effort level breakdown with verdicts for each
- 12-task reference table mapping task type → model + effort
- 6 biggest mistakes to avoid
- Final one-model, one-effort-level recommendation

**`claude_usage_stategy_artfact_ink `**
Link: https://claude.ai/public/artifacts/ae5536fc-6f60-441b-a25f-c346c578c371

---

## 🛠️ Tools & Stack

| Tool | Purpose |
|---|---|
| Claude Sonnet 4.6 | Strategy generation, analysis, reasoning |
| Python · Pillow | PNG rendering, layout, typography |
| Poppins (Google Fonts) | Display headings |
| DejaVu Sans Mono | Monospace labels and badges |
| React JSX | Interactive prototype (tabbed version) |

---

## 📂 Folder Structure

```
day-07-claude-usage-strategy/
├── claude_usage_strategy.png     # Final rendered visual output
├── claude_usage_strategy.jsx     # Interactive React prototype (tabbed)
└── README.md                     # This file
```

---

## 🔗 Challenge Context

Part of the **abtalks 60 Days Claude Challenge** — a public learning initiative documenting daily AI experiments across prompt engineering, data science workflows, and ML tooling.

Personal brand: **The Midnight Architect**
GitHub: [Mi-kami](https://github.com/Mi-kami)

> *"Every single day, the tasks get more interesting."*

---

*The Midnight Architect · June 2026*
