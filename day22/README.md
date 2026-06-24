# RouteIQ Nigeria 🗺️
### Hyperlocal Navigation & Dispatch Accountability — Startup Validation Report

> *"My neighbourhood has a name everyone knows. Google Maps calls it something completely different. The dispatch rider gets lost. The customer is angry. The vendor loses money. Nobody wins."*
> — Temi, Founder

---

## What Is This?

This repository contains the **Startup Validation Report** for **RouteIQ Nigeria** — a concept for a hyperlocal navigation and dispatch intelligence platform built specifically for how Nigerian cities actually work.

The report was generated as **Day 22 of the 60-Day Claude AI Challenge** (#ABTalksOnAI / #AnilBajpai). The prompt asked Claude to act as a Startup Advisor, VC Analyst, and Market Research Expert — collecting the founder's answers and producing a McKinsey/YC-style validation report in PDF format.

**This is not a built product yet.** This is a validated idea with a clear path to MVP.

---

## The Problem

Google Maps and Apple Maps were built for cities with formal, Western-style street naming conventions. Nigeria was not consulted.

In Lagos — and across Nigeria — navigation works like this:

> *"Go straight, pass the Total filling station, turn left before the big white church, the compound with the blue gate."*

No GPS app captures that. The result:

- 🏍️ **Dispatch riders** spend 30–90 minutes finding a single address, burning fuel and losing earnings
- 📦 **Vendors** ship packages with no visibility — they cannot see where their rider is or confirm delivery
- 🛵 **Riders lie about their location** ("I'm almost there") because there's no accountability layer
- 😤 **Customers** receive late deliveries, wrong items, or nothing at all
- 🔁 **Vendors lose repeat business** because their dispatcher failed them — and they had no way to know

The street name on Google Maps and the name every single person in that neighbourhood uses? Two completely different things.

---

## The Idea

**RouteIQ Nigeria** is a mobile-first platform combining:

| Feature | Description |
|---|---|
| 🗺️ **Landmark-based routing** | Navigation using how Nigerians actually give directions — landmarks, zones, local names |
| 📍 **Real-time dispatcher tracking** | Vendors see their rider's live location from pickup to delivery |
| ✅ **Proof of delivery** | Photo confirmation + timestamp — no more "I delivered it" disputes |
| 📦 **Package status for senders** | End customers can track their own orders without calling the vendor |
| 🏆 **Verified Rider badges** | High-performing, trusted riders get visibility — more jobs |

**Primary Users:** Lagos dispatch riders, SME vendors (Instagram sellers, e-commerce merchants), ride-hailing drivers
**Geography:** Lagos (Phase 1) → Abuja → Port Harcourt

---

## Validation Report — Key Findings

The full PDF report is available in this repository. Summary of scores:

| Dimension | Score | Notes |
|---|---|---|
| Problem Clarity | 9/10 | Daily, painful, financially costly for all parties |
| Founder-Market Fit | 8/10 | Lived experience + ML skills + Lagos context |
| Market Size | 8/10 | ~$2.1B TAM; $340M SAM; $1.2M realistic Yr-1 SOM |
| Execution Risk | 6/10 | Map data bootstrapping is the hardest early challenge |
| Competitive Moat | 7/10 | No incumbent owns the Nigerian informal routing layer |

**Overall Recommendation: GO — 78% Confidence**

---

## Why No Incumbent Has Solved This

Google is a $2 trillion company. Apple is bigger. Neither has cracked Nigerian street-level navigation accuracy — and it's not because the problem is hard.

It's because they don't prioritise it.

Africa's informal geographic conventions, landmark-based directions, and community-named streets require local, on-the-ground data collection that global mapping products have no incentive to invest in at the required depth. The informal routing language layer — the most critical piece — remains completely unowned by any product.

That is the white space.

---

## Competitive Landscape

| Product | Nigerian Fit | Landmark Nav | Dispatch Tracking |
|---|---|---|---|
| Google Maps | 3/10 | ❌ | ❌ |
| Apple Maps | 2/10 | ❌ | ❌ |
| Uber / Bolt | 5/10 | Partial | ❌ |
| Sendbox | 6/10 | ❌ | Partial |
| Kwik Delivery | 5/10 | ❌ | Limited |
| OkHi | 6/10 | Partial | ❌ |
| **RouteIQ Nigeria** | **10/10** | **✅** | **✅** |

---

## Market Size

```
TAM  ────────────────────────────  $2.1B/year
     All Nigerian logistics + mobility tech spend

SAM  ──────────────────────  $340M/year
     Lagos + Abuja + PH dispatch riders,
     vendors, ride-hailing drivers

SOM  ────────────  $1.2M/year (Yr 1 target)
     500 vendors @ $120/yr
     + 5,000 riders @ $60/yr
```

Nigerian logistics market is growing at **18% YoY**. This is a tailwind, not a headwind.

---

## Ideal Customers

**Vendor Vivian** — Instagram fashion seller, 50–80 deliveries/day, Yaba or Ajah
> *"My dispatcher will say he is on his way for 2 hours. My customer is angry. I am angry."*

**Rider Rasheed** — Full-time dispatch rider covering Lagos Mainland and Island
> *"Sometimes the address they give me, Google Maps will just put me in the wrong place."*

---

## The Origin Story

This idea came to me last month, returning from church after a conversation with a fellow member — someone who knew I worked in data science and ML — who wanted to brainstorm an AI product. That conversation nudged something. I started thinking: what hasn't been built for Nigeria that genuinely needs to exist?

My mind went straight to GPS navigation. I'd just tried to find an address to give a dispatch rider and opened Google Maps — the name it showed for my own neighbourhood was completely unrecognisable. Not just slightly off. Completely different from what every person who lives there calls it. If my rider had followed that map and asked anyone for directions using that name, he would have been sent somewhere that doesn't exist.

I wrote a rough roadmap. Then I set it aside — I had other things to clear first, and I knew this idea would need funding.

Then the Claude AI Challenge gave me a prompt: validate your startup idea. I submitted this one. And what came back changed how I see it entirely.

I didn't expect a validation score of 9/10 on problem clarity. I didn't expect the founder-market fit to come back strong. I didn't fully realise until reading the report that the dispatcher accountability angle — tracking whether your rider is actually where they say they are — is a standalone B2B monetisation hook that vendors would pay for *today*.

This is a real startup idea. I just didn't know it yet.

---

## What's Next (30-Day Plan)

Before writing a single line of code:

- [ ] 20 user discovery interviews — dispatch riders and Lagos SME vendors
- [ ] Validate willingness to pay: find 5 vendors who'd commit to ₦5,000/month
- [ ] Explore OpenStreetMap Nigeria data quality and crowd-sourcing strategy
- [ ] Build MVP prototype: landmark-based address sharing for Lagos
- [ ] Landing page + waitlist — target 100 signups in first 72 hours

---

## How This Was Built

| Tool | Role |
|---|---|
| Claude (Anthropic) | Startup Advisor, VC Analyst, Market Research Expert |
| Python + ReportLab | PDF generation and professional report layout |
| Claude AI Challenge | Prompt framework (Day 22 of 60) |

**Prompt approach:** Claude was prompted to ask structured discovery questions, then generate a consulting-grade validation report — including TAM/SAM/SOM, competitor analysis, ICP, buyer personas, risk matrix, and a 30-day action plan — formatted as a PDF-ready document.

---

## Files in This Repository

```
/
├── README.md                                      ← You are here
└── RouteIQ_Nigeria_Startup_Validation_Report.pdf  ← Full validation report
```

---

## Author

**Temi** — Data Scientist & ML Engineer → AI Engineer
📍 Lagos, Nigeria
🔗 [LinkedIn](#) | Participating in the 60-Day Claude AI Challenge

---

*Day 22 / 60 — #60DayClaudeChallenge #ABTalksOnAI #BuildWithClaude #NigerianStartup #RouteIQ*
