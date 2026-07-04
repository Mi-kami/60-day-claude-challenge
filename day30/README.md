# Operation Lifeline: Supply Chain Command Lab (V2)

A single-file, browser-based supply chain simulator built entirely with React (via CDN) and vanilla JavaScript. No build tools, no backend, no external assets beyond the CDN scripts that load React and Babel. Open the HTML file in a browser and it runs.

Built as part of the ABTalks 60-Day Claude AI Mastery Challenge.

---

## What's new in V2

V1 dropped you straight into a random company that had already been hit by a random crisis. V2 adds the missing half of the story: the ability to design that company's supply chain yourself, before anything goes wrong, and then choose whether your design decisions actually matter once a crisis hits.

Rather than shipping this as a second, separate app, V2 merges both experiences into a single product with three selectable paths, so the tool tells one coherent story instead of two disconnected ones.

## The three paths

Selected on the Welcome screen alongside difficulty mode:

- **🧩 Chain Builder** — design a supply chain from scratch across five decisions, then get a standalone Foundation Score.
- **🚨 Crisis Simulator** — the original V1 experience, unchanged. A random company, already mid-crisis, straight into the War Room.
- **🔗 Full Command Journey** — build your chain first, then watch it get tested by a real crisis using the company you just designed.

## The Bridge: Independent vs Dependent

This is the core design decision of V2. After finishing the Chain Builder (whether via the Full Command Journey path or by choosing "Stress-Test This Chain" at the end of Build-only mode), the player is asked directly: should your build quality and your crisis performance be scored **independently**, or **dependently**?

- **Independent** — the crisis run starts from the company you designed, but is scored purely on how you handle the crisis. Your Foundation Score and Crisis Score stay separate, useful if you want a clean read on crisis-response skill in isolation.
- **Dependent** — your Foundation Score is mathematically folded into the crisis. A strong foundation lowers crisis severity and raises your starting resilience baseline; a weak one makes the crisis hit harder. The final dashboard shows one blended **Supply Chain Command Score** (40% Foundation Score, 60% Crisis Response Score) instead of two disconnected numbers.

This mirrors something true about real businesses: the quality of your original supply chain design doesn't just get graded separately from a crisis, it actively determines how bad that crisis turns out to be. Independent mode exists for players who want to isolate and practice crisis-response skill on its own; Dependent mode exists for players who want the fuller, messier, more realistic picture.

## Chain Builder: the five decisions

Each decision opens with a plain-English concept explainer before any choice is presented, then shows the trade-off explicitly after a choice is made. Every option affects five live metrics: **Cost, Delivery Speed, Risk Control, Customer Satisfaction, and Sustainability**. No option is a free win, every choice trades something for something else.

1. **Supplier Count** — single supplier (cheaper, faster to coordinate, high concentration risk) vs multiple suppliers (costlier, more resilient).
2. **Factory Location** — domestic, nearshore, offshore low-cost hub, or distributed across regions. Each shifts cost, speed, risk, and sustainability in a different direction.
3. **Warehouse Strategy** — centralized, regionally distributed, or minimal/just-in-time.
4. **Transportation Method** — air, sea, rail, or road, modeled as a genuine three-way trade-off between speed, cost, and emissions.
5. **Inventory Strategy** — low, balanced, or high, mirroring the same "inventory days" concept that determines crisis resilience in the Crisis Simulator.

The Foundation Score is the average of all five metrics after all five decisions. The Builder Dashboard also generates a specific, non-generic biggest-risk narrative (for example, flagging the concentration risk of pairing a single supplier with an offshore factory) and three targeted improvement suggestions based on whichever metrics scored weakest.

## How Chain Builder choices carry into the crisis

When continuing into a crisis (in either Dependent or Independent mode), the company object used by the Crisis Simulator is regenerated from your actual Builder choices, not left random:

- Supplier count choice sets the company's supplier count band (very low for single, high for multiple).
- Factory location sets factory count and supplier lead time (short for domestic, long for offshore).
- Warehouse strategy sets warehouse count.
- Inventory strategy sets inventory days.

In Dependent mode specifically, the Foundation Score also modifies two things mathematically before the crisis is even generated:

- **Crisis severity multiplier** — ranges roughly 0.7x to 1.3x based on how far the Foundation Score sits from a neutral 50, so a strong foundation measurably softens the disruption and a weak one measurably worsens it.
- **Starting metric baseline** — instead of the flat 78 used in V1 and Independent mode, Dependent mode scales the starting baseline with the Foundation Score, so a well-built company starts the crisis already ahead.

## Full seven-to-eleven phase flow

Depending on the path chosen, the phase list adapts. The Full Command Journey path runs:

Welcome → Company Briefing (Builder) → Five Building Decisions → Foundation Score Dashboard → Bridge (Independent/Dependent) → Crisis Briefing → War Room → Negotiation → Boardroom → AI Strategy → Final Dashboard

The Crisis Simulator path skips straight from Welcome to Company Briefing and the crisis, exactly as V1 did. The Chain Builder path ends at the Foundation Score Dashboard, with an option to stress-test the same chain in a crisis at any time.

## Difficulty modes

Three modes, selected at the start of every run, apply across both the Builder and the Crisis Simulator:

- **Beginner** — full open explanations on every decision, gentler consequences, synergy hints flagging which actions genuinely fit the situation.
- **Intermediate** — the same explanations exist but collapsed by default, standard stakes, no synergy hints.
- **Expert** — terse one-line explanations, sharper consequences, wider randomness, and an extra Severity Index metric in the header.

Difficulty changes the underlying math (crisis severity ranges, action effect multipliers, jitter), not just the copy.

## Design principles

- **No free wins, anywhere in the app.** Every decision in the Builder and every action in the Crisis Simulator helps some metrics and costs you on others.
- **Explain before you decide, not after.** Every Builder decision and most Crisis Simulator decisions open with a concept explainer before the choice is presented.
- **The build and the crisis are allowed to actually be the same story.** The Bridge mechanic exists specifically so a player's earlier decisions can carry real, calculable weight into what happens later, instead of two disconnected minigames sharing a visual theme.
- **Gamified, not gamey.** Sound cues, confetti, toast notifications, and achievement badges add energy and replay value without undercutting the seriousness of the decisions being modeled.

## Tech stack

- **React 18** — loaded via CDN (`unpkg.com`), no npm or build step.
- **Babel Standalone** — compiles the in-browser JSX at runtime.
- **Vanilla CSS** — custom design system including CSS custom properties, keyframe animations, and a vibrant gradient-based visual language.
- **Web Audio API** — all sound effects are synthesized on the fly with oscillators, no audio files.
- **Canvas API** — confetti bursts are hand-rolled with `requestAnimationFrame`, no libraries.
- **A single HTML file** — everything lives in one `.html` file and runs fully offline after the first load, provided the CDN scripts have already been cached by the browser.

## Running it

Open the HTML file directly in a modern browser (Chrome, Safari, Firefox, Edge). An internet connection is required the first time it loads, since React and Babel are pulled from a CDN.

**Note for mobile users:** opening the file through a file preview panel (such as iOS Quick Look) will show a blank screen, because those previews block the external scripts the app needs. Open it in an actual browser tab instead (on iOS: share sheet or the "•••" menu → Open in Safari).

## Code structure

- `WelcomeScreen` — difficulty and path selection.
- `BuilderCompanyScreen`, `BuilderDecisionScreen`, `BuilderDashboardScreen` — the Chain Builder flow.
- `BridgeScreen` — the Independent/Dependent choice.
- `CompanyScreen`, `CrisisScreen`, `WarRoomScreen`, `NegotiationScreen`, `BoardroomScreen`, `AIStrategyScreen`, `DashboardScreen` — the Crisis Simulator flow, unchanged from V1 apart from accepting a dynamic step label and optional link-mode props.
- `App` — owns all phase routing via a path-aware `getPhaseList()` function, so the sticky header stepper only ever shows the phases relevant to the path the player is actually on.
- `ConsoleHeader`, `WhyItMatters`, `MetricBar`, `LabeledBar` — shared presentational components reused across both flows.
- `SoundToggle`, `ParticleField`, `Confetti`, `ToastStack` — the gamification layer, isolated from core simulation logic.

Core scoring logic lives in plain functions outside the component tree (`generateCompany`, `generateCrisis`, `applyCrisisImpact`, `getActionEffect`, `negotiationScoreOf`, `computeBuilderMetrics`, `computeBuilderScore`, `applyBuilderChoicesToCompany`, `generateBuilderFeedback`, `computeBadges`), which keeps the randomization and scoring math testable and separate from rendering.

## What's next (V3)

The next planned addition is a **Control Tower** mode: a real-time, end-to-end visibility layer across an entire supply chain network, the kind of centralized monitoring hub real logistics operations use to spot problems before they become crises. Domain research on how control towers actually function in practice is planned before implementation begins.

## License

Built for educational and portfolio purposes as part of a personal AI mastery challenge. Feel free to fork, remix, or adapt.
