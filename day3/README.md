# Day 3 — Role-Based Prompting: Same Question, Three Different Minds

> *"You do not need to change what you ask. You need to change who is answering."*

---

## What is Role-Based Prompting?

Role-based prompting is the practice of assigning Claude a specific professional persona before asking your question. Instead of sending a neutral query to a neutral model, you tell it who it is first. That single instruction restructures the entire cognitive frame it uses to process your question.

The model does not just change its tone. It changes its priorities, its logic, and its definition of what a good answer even looks like.

---

## The Experiment Setup

**One question. Three versions. Zero changes to the question itself.**

The question used across all three prompts:

> *When building an AI product with your team, when choosing what algorithm or approach to use for your foundation model, what should you prioritize? What kind of inference would you recommend? This is for the first version of an AI product.*

---

## Prompt 1 — No Role Assigned

**Exact prompt sent:**
```
When building an AI product with your team, when choosing what algorithm or 
approach to use for the foundation model, what should you prioritize? What kind 
of inference would you recommend? This is for the first version of an AI product.
```

**Screenshot:** `screenshots/no-role-response.png`

**What the model did:**

The model treated this as a practical v1 deployment problem. It opened by separating two decisions teams often confuse: "what is the best model" versus "what is the right model for v1." It gave a structured decision tree — prompt engineering first, fine-tune second, train from scratch last and almost never — and then ranked model selection criteria in priority order:

1. Task fit — does the model actually perform on your specific task, not on benchmarks
2. Latency against your SLA — sub-500ms requirements eliminate certain model classes before you start
3. Cost at projected volume — run the math at 10x expected day-one traffic, not at current usage
4. Fine-tunability and control — open-weights models give you this, proprietary APIs do not
5. Team ability to maintain — the best model your team cannot debug is a liability

For inference: synchronous real-time for anything user-facing, batch for background processing, and a strong recommendation against building async streaming pipelines in v1 unless the core UX collapses without them.

It then applied all of this directly to the Crypto AI Intelligence System — unprompted, because the project context was present in the session.

---

## Prompt 2 — Founder Persona

**Exact prompt sent:**
```
You are a tech founder who has shipped multiple AI products from zero to 
production. When building the first version of an AI product, when choosing 
what algorithm or approach to use for the foundation model, what should I 
prioritize? What kind of inference would you recommend?
```

**Screenshot:** `screenshots/founder-role-response.png`

**What the model did:**

It opened with: *"Honestly? The biggest mistake I see first-time AI product teams make is that they treat this like a research problem. It is not. It is a product problem. The moment you frame it that way, most of your decisions become obvious."*

Then it never left business mode. The entire response was filtered through cost, timeline, market timing, and what users actually need right now. The priority order it gave:

1. What is the minimum capability that makes this product useful — define it precisely, write it down, do not move without that definition
2. Does an existing model already have that capability — nine times out of ten, yes
3. What does your data situation actually look like — fewer than 10,000 labeled examples means RAG will outperform fine-tuning anyway
4. What is your latency constraint and your cost ceiling — these are product requirements, not afterthoughts

The actual algorithm decision came down to three paths: prompt a frontier model, fine-tune a small open-weights model, or build RAG over proprietary data with a generative model on top. The instruction was to pick based on data, team skills, and timeline — not based on what sounds best in a pitch deck.

The closing line: *"Your foundation model choice for v1 is not permanent. It feels like a marriage. It is actually more like a rental agreement."*

---

## Prompt 3 — Developer Persona

**Exact prompt sent:**
```
You are a senior ML engineer with production experience building and deploying 
AI systems. When building the first version of an AI product, when choosing 
what algorithm or approach to use for the foundation model, what should I 
prioritize? What kind of inference would you recommend?
```

**Screenshot:** `screenshots/developer-role-response.png`

**What the model did:**

It opened with: *"Different hat from the founder. My concerns are reproducibility, operability, and what happens at 3am when something breaks in production."*

Business context disappeared entirely. The first instruction was to write down three numbers before touching any model at all:
- Acceptable latency at p99
- Maximum cost per inference
- Minimum acceptable quality score on your eval set

It called out that teams who skip this step end up switching models three times in six months because they never knew what they were actually optimizing for.

The technical priority stack it laid out:

- **Evaluability before everything** — build a curated dataset of 100 to 200 examples covering real use cases and edge cases before selecting any model
- **Task specificity determines architecture** — narrow well-defined tasks suit smaller fine-tuned models; broad reasoning tasks suit frontier models via API; retrieval-heavy tasks suit RAG regardless of model size
- **Latency budget drives model size** — a 7B parameter model can handle synchronous inference at acceptable latency for most user-facing applications; a 70B model starts to strain without multiple GPUs
- **Reproducibility and version control from day one** — pin your model version string in every API call, log every prompt and output, version your prompt templates the same way you version code

For inference architecture: real-time synchronous on the critical path, batch for embeddings, historical scoring, and pre-computing features, streaming only if the UX materially degrades without it.

It ended with a direct application to the MLflow, Docker, and CI/CD stack — treating prompts as code, running evals on every prompt change before shipping.

---

## What I Observed

I ran the same question three times. Same words, same intent. What came back was three completely different minds.

**The baseline response (no role assigned)** was competent and perfectly forgettable. It answered the question the way a textbook would: broadly applicable, technically accurate, and utterly generic. It covered all the right ground without really landing anywhere specific. It was the kind of answer that could belong to any team, any product, any context. Useful, but unanchored.

Then something shifted.

**The moment I assigned a Founder persona**, the entire frame of the response changed. Cost showed up immediately — not as a consideration but as a constraint. Timeline stopped being abstract and became a competitive variable: how long until value erodes in the market? User satisfaction entered the picture not as a design goal but as a business survival condition. The founder did not ask "what is the best approach?" It asked "what can we actually produce right now, with the resources, budget, and runway we have, that will still meet users where they are?" That is a fundamentally different question. The role did not just change the tone. It changed the entire logic of the answer.

**The Developer persona did not even acknowledge the business layer existed.** It went straight into engineering mode. Reproducibility. Fault isolation. Failure paths. What happens when it breaks, how do you contain the damage, how do you make sure a failure in one component does not cascade through the rest of the system. It was looking at the product the way an engineer looks at a bridge: not just "will it hold?" but "what are all the ways it could fail, and have we designed against each of them?" Every recommendation came with a technical rationale. No market timing. No budget conversations. Just: here is how to build this correctly.

**The core insight:** these three responses did not just answer from different angles. They wore different garments. The thinking process itself changed with the role. Same input, three different cognitive frameworks, three distinct professional worldviews. The no-role response was a mirror held up to the question. The role-assigned responses were lenses, each one grinding the light into a specific frequency.

This is what role-based prompting actually does: it does not tell the model what to say. It tells the model **how to think**.

---

## Key Learnings

**1. A generic prompt gets a generic answer.**
Without a role, the model defaults to a balanced, broadly applicable response. That is not a flaw — it is the model's honest best guess at what a neutral, helpful answer looks like. But for any question where professional context changes the right answer, neutral is not actually helpful.

**2. Role assignment is a cognitive filter, not a decoration.**
When you assign a role, you are not just changing the style of the response. You are changing the model's priority function. The founder optimizes for time-to-market and business viability. The developer optimizes for correctness, maintainability, and failure handling. Both are answering the same question. Neither is wrong. They are solving for different objective functions.

**3. For technical decisions, run both roles.**
A model selection decision for a production AI system is both a business decision and an engineering decision. Running the founder and developer personas on the same question gives you a more complete decision surface than any single framing can.

**4. The role you assign reveals what you are actually optimizing for.**
If you default to the developer persona, you might build a beautifully engineered system nobody ships. If you default to the founder persona, you might ship fast and accumulate technical debt that collapses the system in month three. The discipline is knowing which lens the current decision actually requires.

**5. Applied to my own work:**
My Crypto AI Intelligence System lives at the intersection of both. The right move is to run founder-framed prompts when making product scope and timeline decisions, and developer-framed prompts when making architecture and inference decisions. These are not the same conversation and should not be treated as one.

---

## Tools Explored Today

### Claude Usage Counter Extension

**Screenshot:** `screenshots/claude-usage-counter.png`

The Claude Usage Counter is a browser extension that surfaces token consumption and usage percentage directly in the Claude interface. It tracks two windows: session usage (5-hour rolling window) and weekly usage.

What it shows in practice:
- Session (5h): percentage of the session limit consumed, with time remaining
- Weekly: cumulative usage across the week
- Token count and credit cost per conversation
- Cache hits, which indicate when Claude is reusing context rather than reprocessing it

During this experiment session: 38,430 tokens consumed, 27,546 credits, with 40 minutes of cached context. The cache indicator is worth noting — it confirms that long system prompts or repeated context are being stored efficiently, which has direct cost implications for API usage at scale.

**Why this matters for AI engineering:**
When you move from chat to API-based workflows and agents, token consumption becomes a real cost variable. Developing an intuition for how much context different task types consume — and where caching kicks in — is a practical skill for building cost-efficient AI systems.

---

## One Thing to Take Forward

Role-based prompting is a prototype for system prompt design. When you are building an AI product and writing the system prompt that shapes every user interaction, you are doing exactly this — but permanently, for every query the system receives. The difference between a well-designed system prompt and a vague one is the same difference between the generic baseline response and the developer persona response. One tells the model how to think. The other just asks it to try.

For the Crypto AI Intelligence System: the analyst persona that processes market signals, the risk persona that flags anomalies, and the explainer persona that surfaces reasoning for users are all role-based prompting at the system architecture level. This is not a prompting trick. It is a design pattern.

---

*ABTalks 60-Day Claude AI Mastery Challenge — Day 3 of 60*
*Phase 1: Foundation and Prompt Engineering*
