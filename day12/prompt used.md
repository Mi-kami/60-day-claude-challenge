# Prompt Used — Day 12 Job Search & Personal Branding Toolkit

### 60 Days Claude Challenge | The Midnight Architect

-----

## Context Provided to Claude

**Files uploaded:**

- `Deborah_Olofin_Resume_ATS_Optimized.pdf` — full resume
- `Screenshot_2026-06-13_000623.png` — Zoo Finance JD (page 1: company overview + responsibilities)
- `Screenshot_2026-06-13_000651.png` — Zoo Finance JD (page 2: requirements + benefits)
- `Screenshot_2026-06-13_000710.png` — Zoo Finance JD (page 3: how to apply + pay)

**Model used:** Claude Sonnet 4.6 (claude.ai)

-----

## The Exact Prompt

```
You are an expert Technical Recruiter, Hiring Manager, Career Coach,
Executive Resume Writer, and Personal Branding Consultant.

Carefully analyze my resume, LinkedIn profile, portfolio, and professional
background.

Your objective is to create a complete job search and personal branding
toolkit tailored to my profile.

Requirements:
* Use only information available in my resume/profile.
* Identify and highlight my most relevant skills, achievements,
  certifications, projects, leadership experience, and measurable
  business impact.
* Emphasize strengths that are most valuable for recruiters and hiring
  managers in my target industry.
* Adapt the messaging to my experience level (student, fresher,
  experienced professional, manager, or executive).
* Use a professional, modern, recruiter-focused, and results-oriented
  writing style.
* Avoid generic AI-generated language.
* Quantify achievements whenever possible.
* Ensure all content is ATS-friendly and ready to use immediately.

Generate the following:

SECTION 1:
ATS-Friendly Cover Letter
(350–450 words)

SECTION 2:
Recruiter Outreach Email

SECTION 3:
Hiring Manager Email

SECTION 4:
LinkedIn Connection Request
(Maximum 300 characters)

SECTION 5:
Referral Request Message

SECTION 6:
Follow-Up Email
(Send after 5 days if no response)

SECTION 7:
30-Second Professional Introduction
(Self-introduction for interviews, networking, and career events)

SECTION 8:
Top 10 Job Titles Best Suited for My Profile

SECTION 9:
Key Strengths Recruiters Will Notice

SECTION 10:
Skill Gap Analysis
* Current strengths
* Missing skills
* Recommended learning roadmap

SECTION 11:
Personal Brand Summary
* Unique value proposition
* Professional positioning statement
* Recruiter headline

SECTION 12:
Interview Talking Points
* Most impressive achievements
* Key stories to discuss
* Areas recruiters are likely to ask about

Make every section highly personalized based on my profile and generate
content that is ready to send or use immediately without requiring edits.

Note: I'm to add a target company as well to the JD (it's optional but
I still want to do it regardless) but outside Microsoft, Google, Amazon
and maybe Meta I have no other target company in mind so looking at my
resume select 5 target companies that are my best bet in getting to in
aspects of growth, pay and every other thing necessary.
```

-----

## What Made This Prompt Work

### 1. Persona stacking

Assigning Claude five distinct expert roles simultaneously — recruiter, hiring manager, career coach, resume writer, and branding consultant — forces it to reason from multiple professional perspectives at once rather than defaulting to a single generic voice.

### 2. Hard constraints on sourcing

`"Use only information available in my resume/profile"` prevented hallucination. Every project name, metric, and claim in the output maps to something specific in the uploaded resume.

### 3. Numbered, named sections with format specs

Specifying all 12 sections by name, with word counts and sub-bullets where relevant, gave Claude a precise output structure to fill. This eliminates the need to re-prompt for missing pieces.

### 4. The “no edits needed” constraint

`"ready to send or use immediately without requiring edits"` raises the quality bar. Claude knows that generic filler or placeholder text will fail this constraint, so it writes specifically.

### 5. The bonus company request — unprompted strategy

The target company request was added conversationally at the end of the prompt, not in the formal list. Claude responded by doing a skills-first analysis (not just company name recognition) and returned five companies with domain-specific rationales and first-action steps for each.

### 6. Dual-document grounding

Providing both the resume PDF and the job description screenshots simultaneously let Claude do a real skills-gap match between the two documents — which is why the cover letter language mirrors the JD’s exact terminology (on-chain/off-chain, AI-assisted workflow, trend forecasting) while being grounded in the resume’s actual projects.

-----

## Key Output Stats

|Metric                    |Value                                      |
|--------------------------|-------------------------------------------|
|Sections generated        |12 + bonus                                 |
|Total word count (approx.)|~4,500 words                               |
|Companies identified      |5 (beyond Big Tech)                        |
|Job titles mapped         |10                                         |
|Resume stats referenced   |6+ (MAPE, accuracy, CGPA, data scale, etc.)|
|Prompting session length  |Single turn                                |
|Re-prompts needed         |0                                          |

-----

## Files Generated from This Prompt

|File                                   |Description                                           |
|---------------------------------------|------------------------------------------------------|
|`Deborah_Olofin_Job_Search_Toolkit.pdf`|Full 12-section toolkit as a formatted PDF            |
|`toolkit_visual.html`                  |LinkedIn visual summary (open in browser → screenshot)|
|`README.md`                            |This repository’s documentation                       |
|`prompt_used.md`                       |This file — the exact prompt and analysis             |

-----

## Replication Notes

If you want to adapt this prompt for your own profile:

1. **Upload your resume as a PDF** — not a text paste. Claude reads the PDF structure and extracts formatting context.
1. **Upload the job description as screenshots** — multiple screenshots are fine; Claude reads all of them as a single context window.
1. **Keep the “use only information from my resume” constraint** — this is the anti-hallucination guard.
1. **Add the target company request last** — it works better as a closing request after the main structure is defined.
1. **Specify “ready to use immediately”** — without this, Claude may leave placeholder brackets or generic language.

-----

*60 Days Claude Challenge — Day 12 | The Midnight Architect*
*github.com/Mi-kami | linkedin.com/in/deborah-olofin*