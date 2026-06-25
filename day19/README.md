# ⚽ Football Intelligence Hub

A multi-stage interactive football experience built with React, powered entirely by a rule-based JavaScript engine. No backend. No API calls. No external dependencies beyond React.

Built as **Day 18 of the ABTalks 60-Day Claude AI Mastery Challenge** — extended significantly beyond the original brief in data sourcing, architecture, and profile personalisation.

## Artifact Link:
https://claude.ai/public/artifacts/a9627eb3-d24f-40f0-8fb7-2694bbe105c6
---

## What It Does

Users move through five sequential stages:

### Stage 0 — Knowledge Calibration
Four knowledge levels (Complete Newbie → Active Follower) calibrate terminology and explanation depth throughout the entire experience.

### Stage 1 — World Cup 2026 Prediction Report
Three-tab layout: **Predictions**, **Live Results**, and **Golden Boot Race**.

- Confidence-scored predictions for 4 teams (Argentina, France, Germany, Norway)
- Live group stage results from 10 matches (as of June 19, 2026)
- Golden Boot tracker with 6 scored players and per-player context
- Each prediction includes FIFA ranking, form score, 2026 opener result, supporting evidence, and key risk

### Stage 2 — Football IQ Quiz
Five questions, one at a time, spanning:

| Question | Category | Difficulty | Points |
|---|---|---|---|
| Q1 | Rules Knowledge | Beginner | 15 |
| Q2 | Tournament History | Intermediate | 20 |
| Q3 | Player Intelligence | Intermediate | 20 |
| Q4 | Live 2026 Data | Intermediate | 20 |
| Q5 | Tactical Thinking | Advanced | 25 |

Scores 0–100. Five classifications: Beginner Fan → Football Expert.

### Stage 3 — Messi vs Ronaldo Personality Quiz
Twelve questions across ten trait dimensions: Ambition, Discipline, Leadership, Teamwork, Creativity, Competitiveness, Risk Taking, Confidence, Learning Style, Work Ethic, Pressure Response, and Recognition.

Supports both **single-select** (radio-style) and **multi-select** (up to 2 answers) question types. Rating questions use a 1–5 scale.

### Final Profile
A fully personalised Football Intelligence Profile generated in real time. Includes:

- Football IQ Score + classification
- Messi vs Ronaldo compatibility percentages with animated bars
- Personality archetype (1 of 8) with colour-coded badge
- Three AI-quality insight paragraphs (IQ, personality split, archetype)
- Personalised recommendations: player, club, national team, rivalry
- Three key insights specific to the user's actual answers

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18 (JSX) |
| Styling | Tailwind CSS utility classes + inline styles for gradients |
| Profile engine | Pure JavaScript (rule-based) |
| State management | React `useState` hooks |
| External calls | None |

---

## Architecture: Profile Engine

The core innovation is a six-function rule-based profile generator. Each function produces text that references the user's specific answers and real-world football data.

```
generateProfile(results)
├── buildHeadline()         — 3 variants per archetype, selected by answer pattern
├── buildIQInsight()        — references which exact categories were answered correctly/incorrectly
├── buildPersonalityInsight()  — maps Q1, Q5, Q9, Q10 answers to real Messi/Ronaldo career stats
├── buildArchetypeInsight() — unique paragraph per archetype with real player references
├── buildRecommendations()  — wide pool selected by archetype + Messi/Ronaldo lean + Q5 answer
└── buildKeyInsights()      — 3 observations tied specifically to the user's answer combination
```

### Scoring System

**Messi/Ronaldo compatibility** is calculated from a weighted trait matrix across all 12 personality questions. Multi-select answers are averaged across selections. Rating questions (1–5) map to pre-set Messi and Ronaldo point values based on known personality profiles.

**Archetype assignment** uses priority-ordered conditional logic across 8 archetypes:

1. Tactical Visionary
2. Big-Match Specialist
3. Relentless Competitor
4. Quiet Leader
5. Strategic Commander
6. Fearless Attacker
7. Creative Playmaker
8. Consistent Performer

---

## Data Sources

The app draws from multiple sources beyond the original challenge workbook:

| Data | Source |
|---|---|
| Team historical performance, form scores, FIFA rankings | ABTalks Challenge Workbook |
| Live 2026 group stage results | CBS Sports, Sofascore, FIFA.com |
| Golden Boot race tracker | FIFA Official, Olympics.com |
| Messi vs Ronaldo career stats | Squawka, messivsronaldo.app, FootballPulse |
| Football personality framework | Player Status FPF, DISC Football Model |
| Prediction corrections (France 3-1 Senegal) | CBS Sports live data |

---

## Why Rule-Based, Not API

The Claude.ai artifact sandbox routes external API calls through an internal proxy that enforces response size constraints and strips certain request fields. This causes silent failures or invalid response format errors — a known architectural constraint confirmed across multiple projects (StockLens, LifeLens).

A pure JavaScript rule-based engine is:
- **Faster** — no network round-trip
- **Reliable** — no proxy, no sandbox restrictions, no silent failures
- **Deterministic** — same inputs always produce consistent, high-quality outputs
- **Deployable anywhere** — no API key management needed

---

## Project Structure

```
football-hub.jsx
├── Design tokens (C, card)
├── Data constants (KL, PREDS, LIVE, GOLDEN_BOOT, IQQ, PQ, ARC)
├── Scoring functions (mPts, rPts, calcPersonality, calcArchetype, calcIQ, getClass)
├── Profile engine (6 build functions + generateProfile)
├── Shared UI components (StepBar, PageWrap, SecTitle, Btn, PBar)
├── Stage components (Landing, KnowledgeCheck, PredictionsStage, IQStage,
│                     PersonalityStage, GeneratingScreen, ProfileStage)
└── Main app (FootballHub — state machine with 7 stages)
```

---

## Running Locally

```bash
npx create-react-app football-hub
cd football-hub
# Replace src/App.jsx with football-hub.jsx content
npm start
```

For deployment to GitHub Pages or Netlify, no environment variables are needed — the app is fully self-contained.

---

## Challenge Context

**Challenge:** ABTalks 60-Day Claude AI Mastery Challenge  
**Day:** 18  
**Original prompt:** Football Intelligence Hub with 3 stages and AI-generated profile  
**Extended scope:** Wider data sourcing, rule-based engine architecture, three-tab prediction view, Golden Boot tracker, corrected live match data, enriched personality framework

---

*Built with Claude Sonnet 4.6 | Data current as of June 19, 2026*
