# RouteIQ Nigeria — Customer & MVP Blueprint

> *"I thought I needed to build everything at once. This report taught me I just need to show people a trailer."*
> — Temi, Founder

---

## What Is This?

This is the **Customer & MVP Blueprint** for RouteIQ Nigeria — the second document in a two-part founder research series built using Claude AI.

The first document was the **Startup Validation Report** (also in this repository), which answered the question: *is this idea worth pursuing?* The answer was GO, with 78% confidence.

This document answers the next question: *who exactly are we building for, and what do we build first?*

It was generated as part of the **60-Day Claude AI Challenge** (Day 22 of 60, #ABTalksOnAI).

---

## What Is RouteIQ Nigeria?

A hyperlocal navigation and dispatch accountability platform built for how Nigerian cities actually work.

Google Maps and Apple Maps were not designed for Lagos. Nigerian navigation runs on landmarks, community names, and local knowledge that no global mapping product has ever captured. Meanwhile, the dispatch rider ecosystem — the backbone of Lagos last-mile delivery — operates with zero accountability. Vendors cannot see where their riders are. Riders cannot find the addresses they are sent to. Customers receive packages late, wrong, or not at all.

RouteIQ addresses all three sides of this problem in one lightweight mobile platform.

---

## What This Blueprint Covers

### Who The Customers Are

Two primary customer profiles emerged from the research:

**Vendor Vivian** — a Lagos SME seller (Instagram, Jumia, or marketplace-based) dispatching 20 to 200 packages per day. Her biggest problem is not navigation. It is not knowing where her dispatcher actually is, having no proof that a package was delivered, and losing customers because of failures she cannot even see happening. She will pay for a solution. The question is whether she trusts one enough to try it.

**Rider Rasheed** — a full-time Lagos dispatch rider covering the Mainland and Island daily. He gets sent to estates Google Maps has never heard of. He calls the customer three times, burns extra fuel backtracking, and completes fewer deliveries than he should. He is not the paying customer. But without him using the app, Vendor Vivian has nothing to track. The rider is the network.

### What They Feel Every Day

The blueprint maps ten specific pain points across both personas, ranked by severity and financial impact. The two that sit at the top — dispatcher location dishonesty (10/10) and Google Maps showing the wrong name for Nigerian streets (9/10) — are both daily and financially costly. These are not inconveniences. They are revenue problems.

### How They Buy

The customer journey section maps each persona from the moment they first hear about RouteIQ to the moment they tell someone else about it. The insight here is that the trigger for Vendor Vivian is almost always an incident — a lost package, an angry customer, a dispatcher who went silent for two hours. The product does not need to be discovered. It needs to be there when the incident happens.

### What They Will Say Before They Buy

Seven objections are documented with specific responses. The most important one: *"My riders won't use it."* The answer is to flip the pitch entirely. Riders adopt the app for navigation. Vendors get tracking as a by-product. The rider's self-interest drives the vendor's value.

---

## The MVP

### Build This First

- **Landmark-based address creation and sharing** — a vendor types a delivery address using Lagos landmarks and shares it as a link with their rider
- **Live rider GPS pin for the vendor** — the vendor opens a link and sees their rider moving in real time, no account required
- **Delivery confirmation** — rider taps delivered, uploads a photo, vendor gets a timestamped notification
- **Lightweight Android app** — offline-tolerant, under 15MB, minimal data consumption

### Do Not Build This Yet

- A full custom mapping engine
- An iOS app
- Multi-city support
- Payment integration, ratings, or a marketplace
- Ride-hailing or job-matching features

The MVP is not the finished product. It is a trailer. It shows the customer what the finished product will feel like, at the lowest possible cost to build and the highest possible speed to learn.

---

## MoSCoW Summary

| Priority | Examples |
|---|---|
| Must Have | Landmark address sharing, live rider tracking, delivery confirmation, Android app |
| Should Have | Vendor dashboard, push notifications, offline map caching |
| Could Have | Rider ratings, multi-drop optimisation, customer-facing tracking link |
| Won't Have (yet) | iOS app, marketplace, multi-city, custom mapping engine |

---

## Pricing Hypothesis

| Tier | Price | For |
|---|---|---|
| Free | ₦0/month | Dispatch riders — navigation, address sharing |
| Starter | ₦4,999/month | SME vendors with 1–3 riders |
| Growth | ₦12,999/month | Active vendors with 4–10 riders |
| Pro | ₦29,999/month | Logistics SMEs with 10+ riders |

These are hypotheses, not prices. Every tier needs to be tested in user interviews before a payment layer is built.

---

## Scores

| Dimension | Score | Meaning |
|---|---|---|
| Customer Clarity | 82/100 | ICP is specific, named, and reachable today |
| Problem Severity | 90/100 | Daily pain with direct financial consequences |
| PMF Potential | 75/100 | Strong signal — needs user interview proof |
| MVP Readiness | 62/100 | Scope is clear; map data bootstrapping is the gap to close |

---

## Top 5 Risks

1. **Map data quality** — OpenStreetMap Nigeria coverage may not be sufficient at launch
2. **Rider privacy resistance** — riders may reject location tracking even with a navigation benefit
3. **Vendor payment friction** — freemium adoption must come before any monetisation attempt
4. **Solo founder bandwidth** — ruthless MVP scoping is non-negotiable
5. **Competitor response** — Google Maps improving Nigeria coverage is unlikely but possible

---

## The 30-Day MVP Plan

The plan is deliberately sequenced: research first, build second.

- Days 1–3: Problem mapping and documentation
- Days 4–7: 10 user interviews with Lagos dispatch riders
- Days 8–10: 10 user interviews with Lagos SME vendors
- Days 11–12: Synthesise findings and lock MVP scope
- Days 13–15: Assess OpenStreetMap Nigeria data quality
- Days 16–20: Build MVP v0 — landmark sharing + live rider pin
- Days 21–23: Test with 5 riders and 3 vendors from interview pool
- Days 24–26: Fix top 3 blockers; add delivery confirmation
- Days 27–28: Landing page and waitlist
- Days 29–30: Launch waitlist publicly; target 100 signups in 72 hours

---

## Founder's Note

This document came out of a prompt in the 60-Day Claude AI Challenge. But the idea it is built on came earlier — last month, coming back from church, looking at Google Maps and seeing my own street listed under a name nobody who lives there has ever used.

I set the idea aside. I had other things going on. I was not sure it was real.

The challenge brought it back. Running it through two layers of AI-assisted research — a startup validation report and this customer and MVP blueprint — changed how I see it. I now know who I am building for. I know what to build first. I know what not to touch yet. And I know the first conversation I need to have is not with a developer. It is with a dispatch rider at a pickup hub in Yaba at 7am.

That is where this starts.

---

## Documents in This Series

```
/
├── README_validation.md                           ← Startup Validation Report README
├── RouteIQ_Nigeria_Startup_Validation_Report.pdf  ← Full validation report (Day 22)
├── README.md                                      ← This file
└── RouteIQ_Customer_MVP_Blueprint.pdf             ← Customer & MVP Blueprint (Day 22)
```

---

## How This Was Built

| Tool | Role |
|---|---|
| Claude (Anthropic) | Startup Product Manager + Customer Research Expert |
| Python + ReportLab | PDF generation and report layout |
| RouteIQ Validation Report | Source data extracted and carried forward |
| Claude AI Challenge | Prompt framework — Day 22 of 60 |

---

## Author

**Temi** — Data Scientist & ML Engineer → AI Engineer
📍 Lagos, Nigeria
🔗 [LinkedIn](#) | 60-Day Claude AI Challenge — Day 22 of 60

---

*#60DayClaudeChallenge #ABTalksOnAI #BuildWithClaude #RouteIQNigeria #NigerianStartup*
