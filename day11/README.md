# Day 11 — ATS Resume Optimizer & Resume Generator
## 60 Days Claude Challenge | The Midnight Architect

> *"Don't just keyword-stuff. Diagnose honestly."*

---

## What This Is

On Day 11 of the 60 Days Claude Challenge, I engineered a structured 
prompt system that functions as an ATS Resume Optimizer and Resume 
Generator.

It takes two inputs and produces a complete, recruiter-ready, 
ATS-optimized resume — with one strict rule: **100% factual accuracy. 
No invented experience. No fabricated metrics. No hallucinated skills.**

---

## The Prompt System

### Inputs
- Existing resume (any format)
- Target job description

### Process
The system runs three sequential operations:

**1. ATS Match Score**  
Scores the resume against the JD before and after optimization,
with explicit reasoning for the gap.

**2. Gap Analysis**
- Missing keywords from the JD
- Missing skills (categorized: structural vs. addressable)
- Improvement opportunities (honest reframing, not fabrication)

**3. Resume Rewrite**  
Full resume regeneration with:
- JD-aligned professional summary
- Naturally integrated domain keywords
- Impact-reframed project and experience bullets
- ATS-safe formatting ready for Word, Google Docs,
  FlowCV, Overleaf, or Canva

---

## What Made This Task Non-Trivial

The interesting constraint wasn't keyword insertion —
it was the **honesty requirement**.

Claude was explicitly instructed to surface **hard eligibility 
blockers** separately from ATS optimization. Not to bury them 
in optimistic language. Not to paper over them with better keywords.

When I ran my own resume against a real remote internship JD 
(Susan G. Komen — Data Science Intern), Claude returned this 
before touching a single bullet point:

| Requirement | Status |
|---|---|
| Authorized to perform duties in the U.S. | ❌ Lagos, Nigeria |
| Degree program must require internship for graduation | ❌ Already graduated |
| Actively enrolled in 4-year degree program | ❌ Not currently enrolled |

**ATS Score: 52% → 69% post-optimization.**  
**Structural ceiling: ~72% — because keywords can't fix eligibility.**

This is what an honest optimizer does. It saves you from spending 
energy on applications that will be filtered at the gate, not the 
resume stage.

---

## Real-World Finding

> A good ATS optimizer isn't just a keyword injector.
> It's a diagnostic tool. The output should help you decide
> *whether* to apply, not just *how* to apply.

The most valuable output from this task wasn't the rewritten resume.
It was the gap analysis that told me where my time was actually 
worth spending.

---

## Prompt Engineering Notes

Key constraints that produced reliable, honest output:

```
- "Never invent experience, projects, employers, 
   certifications, dates, or metrics."
   
- "Flag hard eligibility blockers separately before 
   beginning ATS optimization."
   
- "Distinguish structural gaps (cannot be addressed) 
   from addressable gaps (can be resolved through 
   reframing existing content)."
   
- Explicit output schema: Score → Gap Analysis → 
  Full Resume → Formatting note
```

These constraints prevented the common failure mode of 
AI resume tools: confident, polished output that looks 
great until the recruiter asks a follow-up question you 
can't answer.

---

## Sample Output Structure

```
1. ATS Match Score (pre + post, with rationale)
2. Gap Analysis
   ├── Missing Keywords
   ├── Missing Skills (structural | addressable)
   └── Improvement Opportunities
3. Optimized Resume
   ├── Professional Summary (JD-aligned)
   ├── Technical Skills
   ├── Experience (impact-reframed)
   ├── Projects (domain-relevant framing)
   ├── Education
   ├── Certifications
   └── Achievements
4. Formatting note (copy-paste ready)
```

---

## Tools Used

- **Claude (Anthropic)** — Prompt engineering, analysis, generation
- **Input:** PDF resume + JD screenshots
- **Output:** Structured markdown resume + analytical report

---

## Files in This Folder

```
day-11/
├── README.md              ← You are here
├── prompt.md              ← Full prompt used
└── output.md              ← ATS analysis + optimized resume
```

---

## Part of the Series

This is **Day 11** of my **60 Days Claude Challenge** —  
a public experiment documenting daily AI workflows,  
prompt engineering discoveries, and honest field reports  
from building a data science career from Lagos.

| | |
|---|---|
| 🐙 GitHub | [Mi-kami](https://github.com/Mi-kami) |
| 💼 LinkedIn | [Deborah Olofin](https://linkedin.com/in/deborah-olofin) |
| 🌐 Portfolio | [mi-kami.github.io](https://mi-kami.github.io) |

---

*The Midnight Architect — building in the dark until the blueprint is done.*
