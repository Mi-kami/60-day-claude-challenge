# Day 5 — Context Engineering
### ABTalks 60-Day Claude AI Mastery Challenge

---

## Overview

Today's task was about understanding **context engineering** — what happens when you give Claude a bare prompt versus a prompt loaded with relevant context. Same tool, same task, very different outcomes.

The experiment: generate a personalised 30-day learning roadmap using two prompts.

- **Prompt A** — no context, just the task
- **Prompt B** — full context: skills, gaps, goals, learning style, time availability, experience level

---

## Prompt A — Without Context

```
Create a 30-day learning roadmap.

Include:
- Weekly milestones
- Daily tasks
- Resources
- Projects
- Final outcome

Make it practical and beginner-friendly.
```

### What happened

Claude did not have enough information to proceed confidently. Before producing any output, it came back with clarifying questions — asking about goal, experience level, domain, available time, and preferred learning style. I answered, but vaguely. Surface-level context.

What came back was a functional but generic roadmap structured around learning Claude and prompt engineering in general — applicable to literally anyone doing the challenge, regardless of their background. The four weeks covered: Tool Fundamentals, Core Techniques, Advanced Patterns, and Build & Master. Clean structure. Zero personalisation.

**Token note:** The back-and-forth to gather basic context cost multiple rounds of exchange before Claude had enough to generate anything useful. Tokens spent on confusion that full upfront context would have eliminated.

> **📸 Screenshot — Prompt A Output:** *(insert screenshot of the generic roadmap artifact here)*

---

## Prompt B — With Full Context

The full Prompt B included:

- **Current situation:** Junior ML practitioner, 8 months of independent project experience, pre-employment
- **Current skills:** Python (intermediate), Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, TensorFlow, Keras, Supervised/Unsupervised ML, Time Series (Prophet, SARIMA, SARIMAX, XGBoost), MLflow, Docker, Streamlit, Git, basic CI/CD
- **Known gaps explicitly stated:** SQL (not consistently practised), Cloud/AWS (just started, no certifications), CS foundations needing sharpening for technical interviews
- **Goal:** Solid intermediate Data Science / ML Engineer
- **Available time:** 5–6 hours per day
- **Experience level:** Advanced Beginner / Early Junior
- **Preferred learning style:** Projects and reading

### What happened

No clarifying questions. Claude processed everything immediately and generated a fully interactive, colour-coded 30-day roadmap built around exactly where I am — addressing my SQL gap in Week 1, deepening my MLOps stack in Week 2, building real AWS cloud skills in Week 3, and combining everything into a capstone project in Week 4.

The output included:
- Personalised weekly milestones tied to my actual skill profile
- Daily task breakdowns with time allocations
- Specific resources matched to my current level
- Weekly portfolio projects (SQL + Python EDA Pipeline, Reproducible ML Pipeline, Cloud-Deployed Model with SHAP explainability, End-to-End Capstone)
- Tips that directly referenced my active crypto project as a sandbox
- An interactive UI with collapsible day cards and tab navigation by week

> **📸 Screenshot — Prompt B Output:** *(insert screenshot of the personalised interactive roadmap here)*

---

## Side-by-Side Comparison

| | Prompt A (No Context) | Prompt B (Full Context) |
|---|---|---|
| **Clarity of output** | Generic — applicable to anyone | Highly specific — built for me |
| **Domain relevance** | Claude/Prompt Engineering only | Data Science + ML Engineering |
| **Gaps addressed** | None (Claude didn't know my gaps) | SQL, AWS, and CS fundamentals targeted directly |
| **Personalisation** | Zero | Referenced my existing projects, tools, and experience |
| **Claude's first response** | Questions back to me | Direct output, no questions needed |
| **Token efficiency** | Low — multiple rounds of exchange | High — one prompt, one complete output |
| **UI/Output quality** | Basic roadmap structure | Fully interactive, colour-coded, collapsible artifact |
| **Actionability** | Moderate | Immediately actionable |

---

## Key Learnings

### 1. Context is data

Every model needs data to work. No data, no output — or at best, a bad output. Claude is no different. Context is its data. The moment I gave it data (my actual skills, gaps, goals, time, style), it was able to optimise and deliver something genuinely useful. Without that data, it either asked me for it, or produced something too generic to be actionable.

This is not abstract. I have spent months in data science learning that models without training data cannot make meaningful predictions. Context is exactly that — it is the training signal that tells Claude what to produce for *me*, not just for anyone.

### 2. Prompt without context = wasted tokens + confusion

When I gave Claude no context, it had to ask me questions. Multiple rounds. Tokens burned on clarification that should have been in the first message. Even after answering, Claude only had surface-level context to work with — enough to produce something, but not enough to produce something great.

Full context upfront = one prompt, one powerful output. That is the efficiency argument for context engineering, and it matters whether you are on a free plan managing tokens carefully or in a production pipeline managing API costs.

### 3. Surface-level context ≠ enough

Even when Claude asked questions and I gave it answers, the output was limited by the quality of what I gave back. Vague answers = surface-level output. The quality of Claude's response is directly proportional to the quality of the context it receives. You do not just need *some* context. You need *rich, specific, accurate* context.

### 4. Context engineering is not optional — it is foundational

This was Day 1, and it already fundamentally changed how I think about working with Claude. Context engineering is not a technique for advanced users. It is the baseline skill for getting any meaningful result. Before you touch any other prompting technique, learn this one.

---

## Tool Note: Sider AI

**What is Sider AI?**
Sider is a browser extension that adds an AI-powered sidebar to any webpage. It can summarise articles, explain highlighted text, answer questions about what you are currently reading, help with writing tasks in context, and translate content — without you having to leave the page or switch to another tool.

**Why I did not use it for today's task**
Today's task was entirely self-contained within the Claude.ai interface. The work was direct prompt engineering — no external articles needed summarising, no documentation needed explaining, no webpage content was relevant to the task. Sider is a browser-context tool, and today's task had no browser-context component.

**When I would use it**
- Reading through AWS documentation or Scikit-learn docs and wanting quick explanations without switching context
- Reviewing ML research papers or long technical articles and needing a fast summary before going deep
- Browsing Stack Overflow and wanting AI to explain a code solution in plain terms
- Going through long GitHub READMEs while evaluating tools or libraries for a project
- Later in this challenge, if daily tasks involve reading articles or external resources that need processing

---
*ABTalks 60-Day Claude AI Mastery Challenge — Day 1*
*Tools used: Claude Sonnet (claude.ai) | Sider AI (not required for this task)*
*#60DayClaudeChallenge*
