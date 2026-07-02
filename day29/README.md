# Operation Lifeline: Supply Chain Crisis Lab

Livelink -> https://oplifeline.netlify.app/

A single-file, browser-based supply chain crisis simulator built entirely with React (via CDN) and vanilla JavaScript. No build tools, no backend, no external assets beyond the CDN scripts that load React and Babel. Open the HTML file in a browser and it runs.

Built as part of the ABTalks 60-Day Claude AI Mastery Challenge.

---

## What it does

Operation Lifeline drops you into a randomly generated company and a randomly generated supply chain crisis, then walks you through the same decisions a real operations leader has to make: how to respond in the moment, how to negotiate with a supplier under pressure, how to lead a boardroom through uncertainty, and where to invest in AI to reduce the next crisis before it happens. At the end, you get a scored debrief with your biggest mistake, your best decision, and concrete lessons tied to the specific crisis you just lived through.

Every playthrough is different. The company, the crisis, the severity, the negotiation dialogue, and your outcomes are all generated fresh each time.

## Difficulty modes

The app ships with three modes, selected at the start of every run:

- **Beginner** — every decision comes with an open "why this matters" explanation, synergy hints flag which War Room actions genuinely fit the crisis in front of you, and consequences are gentler with less random swing.
- **Intermediate** — the same explanations exist but are collapsed by default, synergy hints are gone, and stakes sit at a standard level. You have to reason about fit yourself.
- **Expert** — explanations shrink to a single terse line, consequences are sharper with wider randomness, and the header adds a Severity Index metric the other modes don't show.

Difficulty isn't just copy. It changes the actual math behind crisis severity, action effectiveness, and outcome variance, so the three modes genuinely play differently rather than just reading differently.

## The seven-phase flow

1. **Welcome** — choose a difficulty mode.
2. **Company Briefing** — a randomly generated fictional company with industry, revenue, factories, warehouses, suppliers, inventory days, and supplier lead time. Each stat comes with a plain-language explanation of why it matters for crisis resilience.
3. **Crisis Briefing** — one of eight crisis types (factory fire, supplier bankruptcy, port strike, cyberattack, flooding, raw material shortage, political conflict, or shipping delay), each grounded in a real category of disruption companies actually face.
4. **War Room** — choose three of six response actions (expedite freight, activate a backup supplier, deploy safety stock, negotiate partial delivery, communicate proactively, or triage by customer priority). Every action trades off against something; none are free wins. Effects animate in with sound and visual feedback, and picks that genuinely fit the crisis type get a visible synergy bonus.
5. **Negotiation** — a four-round branching conversation with a supplier. Every choice moves Trust, Price, and Lead Time in different directions, and the tone the supplier takes in each round reflects how you handled the last one.
6. **CEO Boardroom** — five multiple-choice leadership moments covering transparency, resource allocation, accountability, budget tradeoffs, and long-term thinking.
7. **AI Strategy** — choose two of five AI investments (Demand Forecasting, Inventory Optimization, Supplier Risk Monitoring, Warehouse Vision, Procurement Copilot) to carry into the next crisis.
8. **Final Dashboard** — an overall Crisis Score out of 100, broken into Leadership, Negotiation, Resilience, Cost Control, Risk Management, and Customer Satisfaction, plus personalized feedback, your biggest mistake, your best decision, an expert recommendation targeting your weakest category, and lessons learned specific to the crisis type you faced.

## Design principles

- **No free wins.** Every action in every phase helps some metrics and costs you on others. The tension between cost, speed, trust, and inventory is the entire point.
- **Explanations before decisions, not after.** Beginner and intermediate modes explain the reasoning behind a mechanic before you commit to it, so decisions build real intuition instead of just producing a score.
- **Consequences are grounded in real supply chain practice.** Crisis types, response actions, and negotiation dynamics are modeled on documented patterns from real disruptions (e.g. single-site production risk, port labor disputes, chokepoint shipping routes, supplier concentration risk) rather than arbitrary game mechanics.
- **Gamified, not gamey.** Sound cues, confetti, toast notifications, and achievement badges give the simulator energy and replay value without undercutting the seriousness of the decisions being modeled.

## Tech stack

- **React 18** — loaded via CDN (`unpkg.com`), no npm or build step.
- **Babel Standalone** — compiles the in-browser JSX at runtime.
- **Vanilla CSS** — custom design system (no Tailwind or component library), including CSS custom properties for theming, keyframe animations, and gradient-based visual language.
- **Web Audio API** — all sound effects are synthesized on the fly with oscillators; there are no audio files.
- **Canvas API** — confetti bursts are hand-rolled with `requestAnimationFrame`, no libraries.
- **A single HTML file** — everything (markup, styles, and logic) lives in one `.html` file. It runs fully offline after the first load, provided the CDN scripts have already been cached by the browser.

## Running it

Open the HTML file directly in a modern browser (Chrome, Safari, Firefox, Edge). An internet connection is required the first time it loads, since React and Babel are pulled from a CDN.

**Note for mobile users:** opening the file through a file preview panel (such as iOS Quick Look) will show a blank screen, because those previews block the external scripts the app needs. Open it in an actual browser tab instead (on iOS: share sheet or the "•••" menu → Open in Safari).

## Code structure

The app is organized into reusable React function components, each responsible for one phase of the simulation:

- `WelcomeScreen`, `CompanyScreen`, `CrisisScreen`, `WarRoomScreen`, `NegotiationScreen`, `BoardroomScreen`, `AIStrategyScreen`, `DashboardScreen` — one component per phase, composed inside a top-level `App` component that manages phase transitions via `useState`.
- `ConsoleHeader` — a persistent sticky header showing the current phase, live metrics, and difficulty mode.
- `WhyItMatters`, `MetricBar`, `LabeledBar` — shared presentational components used across multiple phases.
- `SoundToggle`, `ParticleField`, `Confetti`, `ToastStack` — the gamification layer, isolated from the core simulation logic so the underlying scoring and mechanics stay easy to audit independently of the visual layer.

Core simulation logic lives in plain functions outside the component tree (`generateCompany`, `generateCrisis`, `applyCrisisImpact`, `getActionEffect`, `negotiationScoreOf`, `computeBadges`), which keeps the randomization and scoring math testable and separate from rendering.

## License

Built for educational and portfolio purposes as part of a personal AI mastery challenge. Feel free to fork, remix, or adapt.
