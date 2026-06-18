# 📊 StockLens — Stock Fundamental Research Web App

> **Day 18 of #60DaysClaude Challenge** · Built by [Deborah Olofin](https://linkedin.com/in/deborah-olofin) · The Midnight Architect

[![No API Required](https://img.shields.io/badge/No%20API%20Required-✓-16a34a?style=flat-square)](.)
[![Markets Covered](https://img.shields.io/badge/Markets-NGX%20·%20NSE%2FBSE%20·%20Global-2563eb?style=flat-square)](.)
[![Stocks](https://img.shields.io/badge/Stocks-30%20Companies-7c3aed?style=flat-square)](.)
[![Built With](https://img.shields.io/badge/Built%20With-React%20·%20Recharts-f97316?style=flat-square)](.)

---

## What Is StockLens?

StockLens is a fully client-side stock fundamental research web app covering **30 companies** across Nigerian (NGX), Indian (NSE/BSE), and global (NYSE, NASDAQ, LSE) markets.

It delivers:
- Valuation analysis (P/E, P/B, EV/EBITDA vs sector and historical benchmarks)
- Growth trend charts (revenue and profit YoY % across 4 fiscal years)
- ROE/ROCE trend lines
- Ownership breakdown pie charts
- Risk factor assessment (HIGH / MEDIUM / LOW)
- Peer comparison tables
- Side-by-side stock comparison mode

**No backend. No API calls. No connectivity issues. It just works.**

---

## Why There Is No Claude API Integration — An Honest Technical Explanation

If you follow my previous project (myFinancials), you'll know I ran into persistent "unable to connect to server" errors when trying to call the Claude API from within a Claude.ai artifact. This happened again during the early development of StockLens. I want to document the root cause clearly, because it is not obvious and it is not a billing or subscription issue.

### What Actually Causes the Error

Claude.ai artifacts run inside a **sandboxed browser iframe**. When an artifact makes a `fetch()` call to `api.anthropic.com`, the request does not go directly to Anthropic's API — it is routed through a **restricted internal proxy** that the Claude.ai platform controls.

This proxy:
- Does not reliably support all standard Anthropic API request fields (e.g. the `system` field)
- Has strict constraints on response size and format that differ from the public API
- Can return malformed or truncated responses that cause JSON parse failures
- Rejects certain request shapes with generic errors like "invalid response format" or "unable to connect"

**This is an architectural constraint of the Claude.ai artifact sandbox — not a free vs paid plan issue.** A developer on the highest-tier plan would hit the same wall. The proxy exists for security reasons (to prevent API key exposure in the browser), but its limitations mean it cannot be relied upon for production-grade API calls from within an artifact.

### What Actually Works

If you want to use the Claude API reliably in a web app, the correct approach is one of these:

| Approach | How It Works |
|---|---|
| **Server-side proxy** | Your backend (Node.js, Python, etc.) holds the API key and makes the call. The frontend calls your backend, not Anthropic directly. |
| **Standalone React app** | Build and deploy your own React app (Vite, CRA, etc.) with the API key stored in `.env`. API calls go directly from your server environment, not a sandboxed iframe. |
| **Claude Code / API playground** | Use Anthropic's own developer tools where the call originates from a non-sandboxed environment. |

Direct API calls from a Claude.ai artifact are not architecturally designed for production use and should be treated as experimental at best.

### How I Solved It for StockLens

Rather than depend on an unreliable connection, I pivoted to a **comprehensive hardcoded dataset** approach:

- All 30 stock profiles are embedded directly in the component as structured JavaScript objects
- Each stock includes ~20 fundamental metrics, 4 years of growth data, ownership breakdown, risk factors, strengths, watch-points, and peer comparisons
- Recharts renders all visualisations from this local data — no network request needed
- The result is instant, reliable, and portable

The data reflects figures from training knowledge (approximate, as of mid-2024). Users are always advised to verify current figures independently.

---

## Stocks Covered

### 🇳🇬 Nigerian Exchange (NGX)
| Ticker | Company |
|---|---|
| MTNN | MTN Nigeria Communications |
| DANGCEM | Dangote Cement PLC |
| GTCO | Guaranty Trust Holding Company |
| AIRTELAFRI | Airtel Africa PLC |
| ZENITHBANK | Zenith Bank PLC |
| ACCESSCORP | Access Holdings PLC |
| UBA | United Bank for Africa PLC |
| SEPLAT | Seplat Energy PLC |
| BUAFOODS | BUA Foods PLC |
| FBNH | FBN Holdings PLC |

### 🇮🇳 Indian Markets (NSE / BSE)
| Ticker | Company |
|---|---|
| RELIANCE | Reliance Industries Limited |
| TCS | Tata Consultancy Services |
| INFY | Infosys Limited |
| HDFCBANK | HDFC Bank Limited |
| ICICIBANK | ICICI Bank Limited |
| HINDUNILVR | Hindustan Unilever Limited |
| WIPRO | Wipro Limited |
| BHARTIARTL | Bharti Airtel Limited |
| ITC | ITC Limited |
| ADANIPORTS | Adani Ports and SEZ Limited |

### 🌍 Global Markets (NYSE / NASDAQ / LSE)
| Ticker | Company |
|---|---|
| AAPL | Apple Inc. |
| MSFT | Microsoft Corporation |
| GOOGL | Alphabet Inc. (Google) |
| AMZN | Amazon.com Inc. |
| NVDA | NVIDIA Corporation |
| TSLA | Tesla Inc. |
| META | Meta Platforms Inc. |
| BP | BP PLC |
| HSBC | HSBC Holdings PLC |
| SAMSUNG | Samsung Electronics |

---

## Features

### Four Research Modes

**⚡ Quick Take** — Snapshot report covering CMP, Market Cap, P/E valuation verdict, D/E health verdict, ROE, ROCE, growth trend, 3 strengths, 2 watch-points, and overall Fundamental Quality rating.

**🔬 Deep Dive** — Full 8-section fundamental report: Snapshot → Valuation → Growth → Financial Health → Returns → Peer Comparison → Ownership → Analyst View.

**⚖️ Pros & Cons** — Evidence-backed strengths and risks, each citing a specific metric. Ideal for quick investment thesis validation.

**↔️ Compare** — Side-by-side comparison of any two stocks in the dataset. Includes dual ownership charts, dual risk panels, and a neutral analyst summary. Works across exchanges (e.g. MTNN vs TCS).

### Charts (All Client-Side via Recharts)
- **Valuation bar chart** — Current P/E, P/B, EV/EBITDA vs sector median and 5-year historical average
- **Growth bar chart** — Revenue and profit YoY growth % across 4 fiscal years
- **ROE/ROCE line chart** — Return on equity and capital trend over 4 years
- **Ownership pie chart** — Promoter/Founder, FII/Foreign, DII/Domestic, Retail breakdown

### UX Details
- Quick-launch ticker buttons — one click for single mode, two clicks to select both stocks in Compare mode
- Live slot-fill hint in Compare mode — shows which stock is selected and what to do next
- Colour-coded verdict badges — CHEAP/FAIR/EXPENSIVE, SAFE/MODERATE/LEVERAGED, STRONG/MODERATE/WEAK, HIGH/MEDIUM/LOW risk
- Peer comparison table with directional colour coding on growth columns

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (functional components, hooks) |
| Charts | Recharts (BarChart, LineChart, PieChart) |
| Styling | Inline styles — no CSS framework dependency |
| Data | Hardcoded structured JS dataset (no database, no API) |
| Deployment | Any static host (Vercel, Netlify, GitHub Pages) |

---

## How to Use

### In Claude.ai (Artifact)
Open the `.jsx` file as a Claude artifact. It renders as an interactive React app immediately.

### As a Standalone React App
```bash
# Clone / copy the component into your project
npm install react recharts
# Import and render <StockLens /> in your App.jsx
```

### Usage
1. Select a research mode (Quick Take, Deep Dive, Pros & Cons, or Compare)
2. Type a ticker (e.g. `MTNN`, `TCS`, `AAPL`) or click any quick-launch button
3. For Compare mode: click one stock to set Stock A, then click a second stock to set Stock B — the comparison runs automatically
4. The full report with charts renders instantly

---

## Data Sources & Disclaimer

All fundamental data is sourced from publicly available information and training knowledge. Key reference sources include NGX filings, NSE/BSE exchange data, Screener.in, Nairametrics, company annual reports, and Bloomberg aggregates.

**Figures are approximate and reflect data available as of approximately mid-2024. They will not reflect the latest quarterly results, price movements, or corporate actions.**

> ⚠️ **This application is for educational and informational purposes only. It is not investment advice and not a buy, sell, or hold recommendation. Always verify current figures independently before making any financial decision. The final decision is yours.**

---

## About This Project

StockLens is **Day 18** of my [#60DaysClaude Challenge](https://github.com/Mi-kami) — a public commitment to building, documenting, and shipping one meaningful AI-assisted workflow every day for 60 days.

The challenge is about learning in public: the wins, the dead ends, and the pivots. This project is a good example of all three.

**Built by Deborah Olofin** · Data Scientist & ML Engineer · Lagos, Nigeria
The Midnight Architect 🌙

- GitHub: [github.com/Mi-kami](https://github.com/Mi-kami)
- LinkedIn: [linkedin.com/in/deborah-olofin](https://linkedin.com/in/deborah-olofin)

---

*Part of the #60DaysClaude Challenge · #BuildInPublic · #DataScience · #FinTech · #NGX · #Nigeria*
