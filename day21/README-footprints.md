# 👣 Footprints — Digital Privacy Intelligence App

> **Day 21 of the 60-Day Claude AI Challenge**
> First deployed web app of the challenge — live on Netlify.

🔗 **Live App:** [footprints-privacy-app.netlify.app](https://footprints-privacy-app.netlify.app)

---

## What Is This?

Footprints is a digital privacy intelligence web app that helps anyone — not just tech people — understand how exposed their personal data is online.

You enter the apps and services you use every day. Footprints analyses them against a database of 150+ services and generates a full, personalised privacy intelligence report — covering your risk scores, which companies hold the most of your data, what types of data they likely collect, and what you can do to protect yourself.

Every report is unique to the user who generates it. No data is stored. No accounts needed. It runs entirely in the browser.

---

## Why I Built This

This started as a personal dashboard — a Day 21 task to visualise my own digital footprint. But the more I learned about how data collection actually works, the more I realised this wasn't something I should keep to myself.

Most people have no idea that:

- Every website they visit logs their IP address
- Cookies follow them across sites they have never even visited
- Apps read their location in the background — even without permission
- Websites record how long you hover over a button before clicking it
- Companies called **data brokers** legally buy and sell your personal data — assembled from apps, loyalty programmes, and public records — without you ever consenting or receiving a single kobo

What upset me most was not that data collection exists. It was that the people most affected are the people who least know it is happening. So I made the dashboard into a proper app, deployed it, and made it available to everyone.

---

## Domain Knowledge: What I Had to Learn First

Before writing a single line (or prompting a single line), I took time to actually understand the problem space. Here is what I learned.

### Digital Privacy
The protection of your personal data in digital environments — covering what is collected, who holds it, how it is used, and what rights you have over it.

### Digital Footprint
The trail of data you leave whenever you use the internet or a digital service. There are two types:

**Active Footprint** (conscious) — things you knowingly put out there:
posts, emails, form submissions, photos, comments, account registrations.

**Passive Footprint** (unconscious) — data collected without you actively sharing it:
- Your IP address being logged by every website you visit
- Cookies tracking your browser across multiple sites
- Apps reading your location in the background
- Websites recording how long you hover over elements — yes, even a button

The passive kind is typically **ten times larger** than the active kind and far more dangerous in the wrong hands.

### Data Brokers
Companies that buy, aggregate, and sell personal data profiles. There are thousands of them globally. They do not need to hack you — they buy your data from apps, loyalty programmes, and public records. Most people have profiles at dozens of these companies without ever having heard of them.

### Why It Matters
- **Identity theft, phishing, and social engineering** all rely on data already out there about you. The more a criminal knows about you before contacting you, the more convincing and dangerous their approach becomes.
- **Employers, insurers, and landlords** use data about you that you never consciously shared.
- Reducing your digital footprint directly reduces your attack surface.

---

## What the App Does

### The User Flow
1. Land on the homepage
2. Enter your name (optional)
3. Search and select your apps from the 150+ database
4. Add any custom app not in the list
5. Click **"Analyse my footprint"**
6. Receive a full, personalised privacy intelligence report

### Report Sections

| Section | What It Shows |
|---|---|
| **Digital Footprint Score** | A 0–100 score of how exposed your digital life is. Higher = more exposed. |
| **Privacy Protection Score** | A 0–100 score of how protected your data currently is. Higher = better protected. |
| **Exposure Heat Map** | Every app you entered, colour-coded from Critical to Low based on data collection intensity. |
| **Company Exposure Ranking** | Which companies own the most of your data, ranked by estimated volume and sensitivity. |
| **Data Collection Matrix** | A grid showing what each of your apps likely collects: location, contacts, behaviour, biometrics, financial data, and device ID. |
| **Risk Radar** | A spider chart showing your risk across 6 dimensions: identity theft, financial exposure, location tracking, social engineering, reputation risk, and data broker exposure. |
| **Digital Twin Profile** | The profile a data broker likely holds about you — age range, lifestyle, shopping behaviour, tech ecosystem — inferred from your services. |
| **WOW Insights** | Striking numbers personalised to your data: how many companies hold your data, what percentage share it with third parties, how many distinct data types are collected. |
| **Most Valuable Data Assets** | Your data ranked by market value and identity theft utility — what is worth the most to advertisers and bad actors. |
| **Privacy Improvement Simulator** | An interactive "what if" tool. Tick actions (enable 2FA, restrict location, etc.) and watch your Privacy Score improve in real time. |
| **Final Verdict** | A plain-language summary of your overall risk level and four prioritised actions to take — today, this week, this month, and long term. |

---

## How It Was Built

### Architecture Decision: Single-File HTML App
The entire app — HTML, CSS, and JavaScript — lives in one file. This was a deliberate choice:

- **Zero dependencies to install** — no npm, no build step
- **Instant deployment** — drag one file to Netlify and it is live
- **Fully client-side** — nothing is sent to any server, ever
- **Portable** — anyone can download it and run it locally by opening it in a browser

### The App Database
The core intelligence layer is a hand-curated database of 150+ services, each tagged with:
- Parent company
- Risk level (Critical / High / Medium / Low)
- Company exposure score (0–100)
- Data collection profile across 6 categories: location, contacts, behaviour, biometrics, financial, device ID

The database covers: social media (Meta, ByteDance, Snap), Google services, Apple services, Nigerian fintech (Kuda, Opay, PalmPay), global fintech (Revolut, Coinbase), e-commerce (Amazon, Jumia, Konga, Shein), ride-hailing (Uber, Bolt, InDrive), gaming, streaming, messaging, productivity, dating apps, and more.

### Scoring Engine
Scores are computed dynamically from the user's actual app selection — not pulled from any external database:

**Footprint Score** = weighted average of each app's risk level, scaled by total number of services. More apps + higher-risk apps = higher score.

**Privacy Score** = starts at a base and decreases based on critical-risk app count, high-risk app count, and total service volume. Reflects how much protection currently exists given the app mix.

**Risk Dimensions** = each of the 6 radar dimensions is calculated from specific app properties — e.g. location tracking risk is driven by how many apps collect precise location; financial exposure is driven by whether any apps handle payment data.

### Transparency Principle
Every inference in the report is clearly labelled:
- **FACT** = directly from the apps the user entered
- **ESTIMATE** = a reasonable inference based on publicly known data practices

The app never claims certainty. It never claims to access real databases. This is intentional — the purpose is education and awareness, not surveillance.

### Digital Twin Algorithm
The Digital Twin Profile uses conditional logic to infer likely demographic and lifestyle attributes from the app mix — gaming apps suggest younger users, ride-hailing apps suggest urban mobility patterns, crypto apps suggest financial risk appetite, etc. Every inference is labelled as an estimate and sourced to the specific apps that drove it.

### Privacy Simulator
Each recommended action has an assigned point impact, calculated based on how much it would realistically reduce the key risk factors. Ticking an action updates the projected score in real time using simple accumulative logic with a cap at 100.

---

## Deployment

This was the **first app in the challenge deployed to a real domain** — marking an upgrade from Claude artifacts to proper web deployment via Netlify.

**Deployed with:** Netlify
**Method:** Direct deploy via Netlify MCP integration with Claude
**Live URL:** [footprints-privacy-app.netlify.app](https://footprints-privacy-app.netlify.app)

To deploy your own copy:
1. Download `index.html`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the file into the Netlify deploy area
4. Done — live in under 30 seconds

---

## Important Disclaimers

- This app does **not** access any real database or external API
- It does **not** store, transmit, or log any user data
- All scores and inferences are estimates based on publicly reported data practices
- For a professional privacy audit, consult a qualified cybersecurity professional
- Data practices of companies change over time — treat all inferences as directional, not definitive

---

## Who This Is For

- Anyone who wants to understand how exposed their personal data is
- Parents wanting to understand their children's digital exposure
- Security-conscious individuals who want to reduce their attack surface
- Journalists, activists, or professionals in high-risk environments
- Anyone who has been in a data breach and wants to assess the landscape
- Anyone who just received a spam SMS and finally wants to know how they got your number

---

## Part of the 60-Day Claude AI Challenge

This project is **Day 21** of a public 60-day challenge using Claude AI to build practical, real-world tools — one per day — while documenting the learning process publicly.

Follow the journey: [LinkedIn — Temi](https://linkedin.com)

---

*Built with Claude AI · Deployed on Netlify · No data collected · No tracking*
