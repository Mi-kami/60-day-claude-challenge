# Day 04 | Chain-of-Thought Prompting | ABTalks 60-Day Claude AI Mastery Challenge

**Challenge:** ABTalks 60-Day Claude AI Mastery Challenge
**Phase:** Phase 1 — Foundation & Prompt Engineering
**Date:** June 4, 2026
**Participant:** Olofin Deborah (Temi) — Data Scientist | ML Engineer | AI Engineer in Progress

---

## Task Overview

**Technique:** Chain-of-Thought (CoT) Prompting
**Task:** Use a structured CoT prompt to generate a personalized, one-page AI Engineer career roadmap — export-ready and shareable on LinkedIn.

Chain-of-Thought prompting instructs a model to reason through a problem step by step before producing an output, rather than jumping directly to a conclusion. By defining the reasoning path explicitly, you improve output quality, reduce hallucinations, and get responses that are structured, grounded, and contextually accurate.

---

## The Prompt Structure Used

The CoT prompt followed this pattern:

```
You are an Elite AI Career Strategist.

Before creating the roadmap, ask ONLY these 4 questions:
  Q1 — Current situation
  Q2 — Current skills
  Q3 — Target goal
  Q4 — Target timeline

After collecting all answers:
Think step by step.
1. Analyze current position
2. Identify strengths
3. Identify skill gaps
4. Identify the fastest path to the goal
5. Recommend learning priorities
6. Recommend projects
7. Recommend networking strategy
8. Create milestones

Finally generate a visually structured ONE-PAGE roadmap.
```

The numbered reasoning chain before the output is what makes this a Chain-of-Thought prompt. The model is told *how* to think, not just *what* to produce.

---

## My Inputs (Answers to the 4 Questions)

| Question | My Answer |
|---|---|
| Current situation | Career Starter — began journey November 2025, not yet employed |
| Current skills | Python, Pandas, NumPy, Scikit-learn, TensorFlow, Keras, XGBoost, Prophet, NLTK, SQLite, Docker, MLflow, CI/CD |
| Target goal | AI Engineer |
| Timeline | 6 months (December 2026) |

---

## Generated Roadmap

The output was a fully designed, one-page A4 PDF roadmap covering:

- **Current Position** — Career Starter, 7 months in, 9 completed projects + 1 building in public
- **Target Goal** — AI Engineer (Full-Stack AI System Builder)
- **Timeline** — 6 months, target December 2026
- **Skill Gap Analysis** — Current ML stack vs. AI Engineering gaps (LLM APIs, RAG, Vector DBs, LangChain/LangGraph, FastAPI, Cloud AI)
- **Recommended Learning Plan** — 4-phase table (M1-2 through M5-6)
- **Suggested Projects** — Including upgrading the Crypto AI Intelligence System with an LLM reasoning layer
- **Networking Strategy** — LinkedIn content via ABTalks, GitHub portfolio, targeting AI-first companies
- **Monthly Milestones** — June 2026 through December 2026
- **Immediate Next Actions** — 4 concrete steps for the current week

> 📎 See attached: `temi_ai_engineer_roadmap.pdf`

---

## Screenshots

> **Screenshot 1:** The generated one-page roadmap PDF
> **Screenshot 2:** The CoT prompt structure used (the reasoning chain section)
> **Screenshot 3:** The 4-question intake flow and my inputs

*Add screenshots to this folder and update the links above.*

---

## Key Learnings

### Chain-of-Thought Prompting is Direction, Not Just Instructions

Before this task, I had been doing something close to CoT intuitively — giving Claude context and some structure before asking for an answer. But I was not doing it *properly*.

The difference is significant.

A standard prompt says: *"Build me a roadmap."*
A CoT prompt says: *"Before building the roadmap, think through these 8 steps in this exact order."*

When you give Claude a numbered reasoning chain, you are not just asking for an output — you are controlling the direction of thought. The model works through each step, and each step constrains and informs the next one. By the time it produces the final output, it has already done the analytical groundwork.

The practical impact:
- **Less hallucination** — because each reasoning step is grounded in the previous one
- **More relevant output** — because the model builds context before it builds the answer
- **Predictable structure** — because the output reflects the shape of the reasoning chain

This maps directly to how AI agents work. An agent's reasoning loop is essentially a Chain-of-Thought prompt made autonomous — each node in the loop is a step in the chain. Understanding CoT prompting at this level is foundational to building anything more complex.

### What This Means for My Work

For my Crypto AI Intelligence System, I can wrap the signal analysis layer in a CoT prompt that forces Claude to reason through market context, sentiment data, and risk factors before producing a recommendation. The output quality will be higher and more trustworthy than a direct prompt.

---

## Capsule Hub Observations

> *Note: I did not actively use Capsule Hub for this specific task, so this section reflects my understanding of the feature rather than hands-on observations.*

**What Capsule Hub appears to do:**
Capsule Hub allows you to store blocks of repeated information — context, system instructions, project details — as reusable capsules. Instead of pasting the same background information into every new chat, you store it once and call it in when needed.

**Why this is directly relevant to my workflow:**

One of the most time-consuming parts of working on my Crypto AI Intelligence System is migrating context between sessions. Every time I start a new chat, I have to re-introduce the project, the architecture, the current state, and the open questions. I currently solve this by generating context handoff documents — which works, but it adds overhead every single time.

Capsule Hub would solve this cleanly. I could store a project context capsule for the Crypto AI system once and call it into any new chat without rebuilding it manually. The same would apply to my personal prompt style preferences, stack details, and challenge context.

This is a feature I intend to use properly going forward, particularly for multi-session project work.

---

## Immediate Next Actions (from the Roadmap)

1. Complete ABTalks Day 1 and Day 2 deliverables and publish to LinkedIn
2. Add a Claude API reasoning module to the Crypto AI Intelligence System
3. Set up LangChain + Chroma locally and build a first RAG prototype on crypto data
4. Create a GitHub "AI-Engineer-Portfolio" repo and commit existing projects with clean READMEs

---

*Generated using Chain-of-Thought Reasoning | ABTalks 60-Day Claude AI Mastery Challenge*
