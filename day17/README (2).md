# 🚗 AI Vehicle Cost & Fuel Analysis Dashboard
### Day 17 — 60 Days Claude Challenge

> *"How much is fuel really costing you per kilometre — and what can you do about it?"*

---

## 📌 Project Overview

This project is a fully interactive, browser-based **fuel cost intelligence dashboard** built entirely with Claude AI. It takes a real-world fleet dataset and transforms it into actionable insights for Nigerian drivers — breaking down the true cost of five fuel types across vehicle age, distance, CO₂ emissions, and maintenance.

No Tableau. No Power BI. No Python environment setup. Just a well-crafted prompt and Claude.

---

## 🇳🇬 Why Nigeria?

Nigeria is one of Africa's largest crude oil producers, yet Nigerians face some of the most volatile fuel pricing on the continent. Since the removal of the fuel subsidy in May 2023, petrol prices have risen from under ₦200/litre to over ₦1,200/litre at many filling stations. Most Nigerian drivers have no structured way to understand what they are actually spending on fuel per kilometre — or how to plan around it.

This dashboard was adapted from an India-origin dataset and localised entirely to Nigerian market conditions, using real 2026 pump prices sourced live from NNPCL, Dangote Refinery data, and Nigerian fuel tracking platforms.

---

## 🎯 What the Dashboard Does

Given a vehicle profile (type, age, fuel, monthly km), the dashboard computes and visualises:

1. **Cost per kilometre** for each fuel type — the real number that matters, not just the pump price
2. **CO₂ emissions per km** — so you can weigh your environmental footprint
3. **Maintenance cost per km** — because fuel is not your only running cost
4. **Cost vs vehicle age** — how costs change as your car gets older
5. **E85 Flex-Fuel Paradox** — why a cheaper pump price does not always mean cheaper running
6. **E85 Fuel Score out of 10** — a weighted rating across cost, emissions, refuel time and maintenance
7. **Fuel type profiles** — pros, cons, and best-use case for each fuel in the Nigerian context

---

## 🔢 Real Nigerian Fuel Prices Used

All costs are computed from **current 2026 Nigerian market prices**, not conversions from another currency:

| Fuel | Price Used | Source |
|---|---|---|
| Petrol (PMS) | ₦1,200 / litre | Dangote gate + pump avg, June 2026 |
| Diesel (AGO) | ₦1,200 / litre | Lagos/Abuja pump avg, June 2026 |
| CNG | ₦400 / SCM | Blended NNPC (₦230) + private (₦550+) avg |
| E85 Flex-Fuel | ₦900 / litre | Estimated at ~75% of petrol (limited availability) |
| Electricity (EV) | ₦165 / kWh | Mid-band NERC tariff avg, 2026 |

---

## 🚘 Sample Vehicle Profile Used

| Field | Value |
|---|---|
| Vehicle | Toyota Camry 2018 |
| Fuel type | Petrol (E20) |
| Car age | 8 years |
| Monthly usage | 1,000 km/month |

---

## 📊 Key Insights from the Dashboard

- **Petrol is the most expensive fuel per km** at ₦73.85/km — costing a typical Camry owner roughly ₦37,000–₦40,000/month for normal Lagos outings
- **CNG is the cheapest** at just ₦16.62/km — but is limited by scarce filling stations and the need for vehicle conversion
- **The E85 Paradox**: E85 is 25% cheaper at the pump (₦900 vs ₦1,200/L), but its poor mileage (13 km/L vs 16+ km/L for petrol) means it only saves about ₦4 per km — barely worth it, and nearly impossible to find in Nigeria
- **EVs cost ₦24/km** to run but face real infrastructure barriers — unstable grid, 45-minute charge times, and high vehicle acquisition costs in Nigeria
- **Older vehicles cost more** — the aged (6–9 year) bucket shows noticeably higher cost/km and maintenance/km than newer vehicles

---

## 🛠️ How It Was Built

| Component | Detail |
|---|---|
| AI Tool | Claude (Anthropic) |
| Output format | Single-file HTML — no frameworks, no CDN |
| Charts | Pure SVG — bar chart, doughnut, line chart, animated gauge |
| Styling | Dark navy glassmorphism, fully responsive (375px–1440px) |
| Data | 52-row fleet dataset, all metrics computed in vanilla JavaScript |
| Currency | Nigerian Naira (₦ NGN) — real 2026 market prices |

---

## 📁 Files in This Repository

```
/
├── README.md                          ← You are here
├── fuel_dashboard.html                ← The full interactive dashboard
└── day17_e85_dataset_optimised.csv    ← Source dataset
```

---

## 🚀 How to Use

1. Download `fuel_dashboard.html`
2. Open it in any modern browser (Chrome, Firefox, Edge)
3. No internet connection required — everything runs locally
4. Hover over charts for tooltips
5. Read the fuel cards at the bottom for your fuel type's pros and cons

---

## 💡 Personal Takeaway

This task proved that data analysis — the kind professionals do daily in Tableau, Power BI, or Python — is now accessible to anyone who knows how to communicate clearly with an AI. The barrier is no longer the tool. It is understanding the question you are trying to answer.

For Nigerian drivers especially, knowing your **cost per kilometre** is one of the most practical financial insights you can have. It turns "fuel is expensive" from a feeling into a number you can plan around.

---

## 🔗 Part of the 60 Days Claude Challenge

This is **Day 17 of 60** — a personal challenge to build real, useful projects with Claude AI every day for 60 days.

Follow the journey on LinkedIn for daily updates.

---

*Built with Claude · Nigerian market data · June 2026*
