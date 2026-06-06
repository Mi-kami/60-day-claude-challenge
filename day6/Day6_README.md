# Day 6 — AI Resume Optimizer
### ABTalks 60-Day Claude AI Mastery Challenge

---

## Overview

Day 6 task: use Claude as an **AI-powered ATS Resume Optimizer**.

The workflow was straightforward — upload an existing resume, apply a structured ATS-scoring prompt, review the analysis Claude generated, and produce a final optimized one-page resume. What was not straightforward was how much was wrong with a resume I thought was good.

This turned out to be the most eye-opening day of the challenge so far.

---

## Task Details

| Field | Details |
|---|---|
| **Day** | Day 6 |
| **Challenge** | ABTalks 60-Day Claude AI Mastery Challenge |
| **Task** | AI Resume Optimizer |
| **Tool** | Claude (claude.ai) |
| **Input** | Existing multi-page resume (PDF) |
| **Output** | ATS-optimized one-page resume (PDF) |

---

## The Process

1. Uploaded existing resume to Claude
2. Applied a structured prompt instructing Claude to act as an **ATS Optimization Expert and Resume Writer**
3. Claude returned a two-part output:
   - **Part 1 — ATS Score Analysis:** Before and after scores with specific, actionable reasons for each change
   - **Part 2 — Optimized Resume:** A fully rewritten, ATS-friendly single-page A4 resume (no tables, no images, no text boxes, no icons — clean plain text that any parser can read)
4. Reviewed the findings, applied minor factual corrections, and exported the final PDF

---

## ATS Score: Before & After

| | Score |
|---|---|
| **Original Resume** | 62 / 100 |
| **Optimized Resume** | 84 / 100 |
| **Potential Score** *(with phone number added)* | 90+ / 100 |

---

## What Changed — The 8 Optimizations

### 1. Multi-Page → Single Page
**What it was:** 3 pages.
**Why it matters:** ATS systems truncate or deprioritize multi-page resumes for early-career applicants. Most of the content on pages 2 and 3 may never be scanned. Condensed to one A4 page without losing any major credential.

### 2. Special Separator Characters Removed
**What it was:** The header used middle-dot (`·`) characters between title segments.
**Why it matters:** Many ATS parsers read `·` as garbage characters and break the parsed text, mangling the job title entirely. Replaced with `|` throughout.

### 3. Section Order Restructured
**What it was:** Projects appeared before Experience — non-standard ordering.
**Why it matters:** ATS systems expect a predictable sequence. Content in the wrong section can be misclassified or ignored entirely. Reordered to: **Summary → Skills → Experience → Projects → Education → Certifications**.

### 4. Non-Standard Heading Fixed
**What it was:** `EDUCATION & TRAINING`
**Why it matters:** ATS systems match against canonical keyword lists. `EDUCATION & TRAINING` is not a standard heading; `EDUCATION` is. One ampersand, one parsing failure.

### 5. Skills Missing from Skills Section
**What it was:** Tools like SQLite appeared in project descriptions but not in the Skills section.
**Why it matters:** ATS systems scan the Skills section independently. A skill listed only in a project bullet may not register as a declared skill at all.

### 6. Irrelevant Role Removed
**What it was:** A non-technical student leadership role was listed under Experience.
**Why it matters:** It contributed no ML/Data Science keywords and diluted keyword density — making the resume look less focused to an ATS scanning for signal.

### 7. Summary Tightened
**What it was:** A 6+ line summary with repeated points.
**Why it matters:** Verbose summaries can bury key signal. Condensed to 4 clean lines, preserving every strong credential.

### 8. Missing Phone Number
**What it was:** Phone number was intentionally omitted.
**Why it matters:** Most ATS systems expect a phone number as a required contact field. Its absence alone costs approximately 8 points. Adding it would push the score to **90+/100**.

---

## Key Learnings

- A resume that looks polished to the human eye can still fail silently inside an ATS — before a single recruiter ever reads it.
- For early-career applicants, **one page is not a stylistic preference — it is a functional requirement** in many ATS environments.
- ATS systems are literal parsers, not readers. They match exact keywords from expected sections. Burying skills in project descriptions is not enough.
- Small formatting decisions — separator characters, heading wording, section order — carry real scoring consequences that are invisible until you test for them.
- Optimizing against a specific job description (keyword alignment) can push an already-optimized resume from 84 toward 95+. General optimization has a ceiling.

---

## Reflection

> *"I always thought my resume was good. This humbled me."*

I've tailored my resume for specific applications before. I've rewritten bullet points, adjusted the summary, rearranged sections. What I never tested was whether the document could even survive the first filter — the automated one that runs before any human sees it at all.

The reason I rarely got callbacks may not have been my qualifications. It may have been a 3-page PDF with dots in the header landing in an ATS parser and getting scored into a bin I never came out of.

That is a fixable problem. And now it's fixed.

---

## Screenshots

### Original Resume
> *(Add screenshot here)*

### Optimized Resume — Page 1
> *(Add screenshot here)*

### ATS Score Comparison
> *(Add screenshot here)*

---

## Files in This Folder

| File | Description |
|---|---|
| `README.md` | This file — full documentation of Day 6 |
| *(original_resume.png)* | Screenshot of the original resume |
| *(optimized_resume.png)* | Screenshot of the optimized one-page resume |

---

## Tools & Resources

- **Claude** — [claude.ai](https://claude.ai)
- **Challenge** — ABTalks 60-Day Claude AI Mastery Challenge
- **Prompt Role Used** — ATS Optimization Expert & Resume Writer

---

*Day 6 of 60 — ABTalks 60-Day Claude AI Mastery Challenge*
