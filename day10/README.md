# Day 10: Personal Portfolio Website

## 60-Day Claude AI Mastery Challenge

**Prompt Date:** June 2026
**Challenge Day:** 10
**Task Type:** Full-stack web development + personal branding

-----

## What Was Built

A fully responsive, single-file personal portfolio website built entirely in collaboration with Claude — no templates, no pre-built themes, no external dependencies.

### Features

- Custom rose-tinted cursor with animated trail
- Canvas-based particle constellation in the hero section
- Typing animation cycling through professional titles
- Animated skill progress bars triggered on scroll
- 4 project cards with real, verified performance metrics
- Dark / light mode toggle
- Experience and certifications timeline
- Contact form + social media links
- Fully mobile-responsive layout

**Stack:** HTML · Tailwind CSS (CDN) · Vanilla JavaScript
**Format:** Single self-contained `.html` file with base64-embedded photo

-----

## Files in This Submission

|File                           |Description                             |
|-------------------------------|----------------------------------------|
|`deborah_olofin_portfolio.html`|Complete portfolio — open in any browser|
|`README.md`                    |This document                           |
|`screenshots/`                 |Add screenshots before committing       |

-----

## Screenshots

> Add before GitHub commit:
> 
> - Hero section (dark mode)
> - Projects section
> - Skills section
> - Light mode toggle

-----

## Prompting Strategy That Made This Work

The most important lesson from Day 10: **the prompt is the architecture**.

Three elements that determined output quality:

### 1. Role Assignment

Claude was given a specific, layered role:

> “You are an expert full-stack web developer and personal branding designer.”

Role framing changes how Claude approaches the problem — from generic assistant to domain specialist with taste.

### 2. Context Loading

Before writing a single line of code, Claude received:

- Resume PDF (for accurate content extraction)
- Professional headshot (embedded as base64)
- Brand colors: deep purple `#0d0618` + warm rose `#e8688a`
- Typography preferences: Georgia serif headings, Courier New monospace labels
- Reference to existing portfolio design language at mi-kami.github.io

This prevented generic output and produced a portfolio consistent with an already-established personal brand.

### 3. Chain of Thought

Complex tasks were sequenced deliberately:

```
Extract resume data → Design layout decisions → Build section by section 
→ Embed photo → Fix console errors → Fix image centering
```

Each step built on the last. No assumptions. Predictable, high-quality output.

-----

## Key Personal Branding Learning

**Your visual identity is a filter, not decoration.**

Deep purple signals technical depth and seriousness.
Warm rose signals warmth, ambition, and approachability.
Together they create a signal that fires before a recruiter reads a single word.

Consistency is what turns a portfolio into a brand. When the same colors, typography, and tone appear across the portfolio, LinkedIn, GitHub, and resume — it stops feeling like a template and starts feeling like a person.

The build also reinforced something broader: **AI is only as good as the context you give it.** Claude received a resume, a photo, a color palette, and a design reference — and produced output calibrated to a specific person, not a generic candidate.

That is the difference between AI as a tool and AI as a collaborator.

-----

## Live Portfolio

> Deploy by dragging `deborah_olofin_portfolio.html` into Netlify or Vercel drop zone. No configuration needed.

**Live URL:** *(add after deployment)*

-----

*Built during the #60DayClaudeChallenge · Day 10 · Powered by @Anthropic*