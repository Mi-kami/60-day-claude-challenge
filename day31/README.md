# Operation Lifeline: Supply Chain Command Lab (V3)

A single-file, browser-based supply chain simulator built entirely with React (via CDN) and vanilla JavaScript. No build tools, no backend, no external assets beyond the CDN scripts that load React and Babel. Open the HTML file in a browser and it runs.

Built as part of the ABTalks 60-Day Claude AI Mastery Challenge.
Live link: https://oplifeline.netlify.app/
---

## What's new in V3

V1 tested crisis response. V2 added the ability to design a supply chain before testing it. V3 adds the missing third act: ongoing, real-time operations, where the skill being tested isn't reacting to a crisis that's already happened, it's catching a small problem early enough that it never becomes one.

The brief for V3 originally called for a standalone arcade-style app: three minutes, alerts flying in at increasing speed, click the right button, vanilla JavaScript, no connection to anything else. Rather than build it exactly as scoped, it was deliberately adapted before implementation: merged into the existing app instead of shipped separately, rebuilt in React to match the existing architecture, and redesigned around an actual predictive mechanic instead of a pure reflex game, because a control tower's real value in practice is catching signals early, not reacting fast. Domain research on how real supply chain control towers work (including the well-documented case of Cisco building one after getting blindsided by the 2011 Thailand floods and Tōhoku earthquake) informed these changes directly.

## The Control Tower path

Selectable on the Welcome screen as its own path, or unlocked as a continuation from the Crisis Simulator's final dashboard ("Run Your Control Tower"), so it works both as a standalone experience and as the natural next chapter after surviving a crisis.

You become Head of Operations, watching a live stream of operational signals across the network: port congestion, supplier delays, truck breakdowns, warehouse stockouts, customs inspections, demand spikes, factory failures, weather disruption, inventory count errors, and damaged shipments.

## The predictive escalation mechanic

This is the core mechanic that distinguishes Control Tower from the Crisis Simulator's War Room. Every alert enters at **Signal** stage, small and cheap to fix. Left unaddressed, it escalates to **Elevated**, then **Critical**, and if a Critical alert's timer runs out with no action taken, it detonates into a full KPI hit automatically, exactly like an unmanaged operational issue does in real life.

Choosing the right action for the alert type resolves it, but the payoff depends entirely on timing:

- **Caught at Signal** — nearly free. This is prevention, and it's rewarded the most.
- **Caught at Elevated** — resolved, but some damage is already banked. This is a good save, not a perfect one.
- **Caught at Critical** — resolved, but this is pure damage control, the smallest reward of the three.
- **Wrong action chosen** — the alert stays live and keeps escalating. Wasted move, wasted time.
- **Ignore** or **Delay** — legitimate deliberate choices. Sometimes the correct call is triaging a worse fire first; the game doesn't penalize this outright.

Eight response actions are available per alert (Expedite Shipment, Use Backup Supplier, Reroute Trucks, Increase Production, Transfer Inventory, Approve Air Freight, Ignore, Delay Decision), each genuinely suited to different alert types, so picking the right tool for the right problem matters as much as picking one quickly.

## Pacing scales by difficulty, not a fixed arcade speed

The original brief's three-minutes-and-increasingly-frantic pacing is real, it's just scoped to Expert mode specifically, rather than applied uniformly:

- **Beginner** — the simulation auto-pauses whenever an alert is expanded for inspection, so reading what a signal means and which action fits doesn't cost you time. Max 2 concurrent alerts, slower escalation, a 4-minute session.
- **Intermediate** — real-time with no auto-pause, max 3 concurrent alerts, standard escalation speed, 3-minute session.
- **Expert** — no pausing, up to 5 concurrent alerts, the fastest escalation windows, 3-minute session. This is the original prompt's vision, intact, for players who want it.

## KPIs, reconciled rather than duplicated

Rather than introducing a fourth, disconnected metric system, Control Tower reuses Cost, Inventory, Delivery Speed, and Customer Satisfaction exactly as they're defined elsewhere in the app. One genuinely new metric, **Network Efficiency**, was added to cover transportation and logistics smoothness, since nothing existing quite captured it. Score and Revenue Protected are separate running counters rather than 0-100 bars, alongside a live countdown timer.

## Foundation linkage

If a player arrives at Control Tower through a Dependent-mode Full Command Journey, their Foundation Score from Chain Builder measurably shapes this run:

- **Starting KPI baseline** scales with Foundation Score, using the same formula as the Crisis Simulator's Dependent mode, so a well-built chain starts operations already ahead.
- **Escalation speed** slows down for a strong foundation and speeds up for a weak one, alerts genuinely get more time to be caught before they worsen.
- **Alert spawn frequency** follows the same logic, calmer for a resilient chain, busier for a fragile one.

If the full Dependent-mode journey is played end to end, the final debrief blends the Foundation Score, the Crisis Response Score, and the Control Tower Score into one overall Supply Chain Command Score, the complete arc: design it, survive a crisis in it, then prove the lessons stuck by running it live.

Entered standalone or through Independent mode, Control Tower runs at a neutral baseline with no bonus or penalty.

## End of session

- **Performance Grade** (A+ through D) based on a blend of final KPI health and how many alerts were resolved correctly versus missed.
- **Session stats**: alerts resolved, wrong calls made, alerts that detonated unaddressed, final Score, and Revenue Protected.
- **A written debrief** naming what got away (if anything did), what the session teaches, and, when applicable, the full blended journey score.

## Full path structure (all three versions)

- **🧩 Chain Builder** — design a supply chain from scratch across five decisions, ending in a Foundation Score.
- **🚨 Crisis Simulator** — a random company, already mid-crisis, straight into the War Room, Negotiation, Boardroom, and AI Strategy.
- **🗼 Control Tower** — live operations, catching signals before they escalate.
- **🔗 Full Command Journey** — Build → Bridge (Independent/Dependent) → Crisis → optionally Control Tower. The complete arc.

Difficulty mode (Beginner/Intermediate/Expert) applies consistently across all three experiences, changing the underlying math, not just the copy, in each one.

## Design principles

- **No free wins, anywhere in the app.** Every decision in every mode helps some things and costs others.
- **Explain before you decide, not after.** Concepts are introduced before choices are presented throughout.
- **Earlier decisions are allowed to actually matter later.** The Bridge mechanic and the Control Tower's foundation linkage both exist so a player's choices carry real, calculable weight forward, instead of each mode being a disconnected minigame sharing a color scheme.
- **When a brief and good practice conflict, good practice wins.** V3 deliberately departed from parts of its original scope (a standalone vanilla JS arcade game) where following it exactly would have undercut the product's teaching goals or its technical coherence with what already existed.
- **Gamified, not gamey.** Sound, confetti, toasts, and badges add energy without undercutting the seriousness of the decisions being modeled.

## Tech stack

- **React 18** — loaded via CDN (`unpkg.com`), no npm or build step.
- **Babel Standalone** — compiles the in-browser JSX at runtime.
- **Vanilla CSS** — a custom design system: CSS custom properties, keyframe animations, a vibrant gradient-based visual language.
- **Web Audio API** — all sound effects are synthesized on the fly with oscillators, no audio files.
- **Canvas API** — confetti bursts hand-rolled with `requestAnimationFrame`.
- **A single HTML file** — everything lives in one `.html` file and runs fully offline after the first load, provided the CDN scripts have already been cached.

## Running it

Open the HTML file directly in a modern browser (Chrome, Safari, Firefox, Edge). An internet connection is required the first time it loads, since React and Babel are pulled from a CDN.

**Note for mobile users:** opening the file through a file preview panel (such as iOS Quick Look) will show a blank screen, because those previews block the external scripts the app needs. Open it in an actual browser tab instead (on iOS: share sheet or the "•••" menu → Open in Safari).

## Code structure

- `WelcomeScreen` — difficulty and path selection (four paths as of V3).
- `BuilderCompanyScreen`, `BuilderDecisionScreen`, `BuilderDashboardScreen` — the Chain Builder flow.
- `BridgeScreen` — the Independent/Dependent choice.
- `CompanyScreen`, `CrisisScreen`, `WarRoomScreen`, `NegotiationScreen`, `BoardroomScreen`, `AIStrategyScreen`, `DashboardScreen` — the Crisis Simulator flow.
- `TowerBriefingScreen`, `TowerGameScreen`, `TowerDashboardScreen` — the Control Tower flow. `TowerGameScreen` drives a real-time tick loop via `useEffect`/`setInterval`, delegating all actual game logic to pure functions so the simulation stays testable independent of rendering.
- `App` — owns all phase routing via a path-and-tower-aware `getPhaseList()` function, so the sticky header stepper only ever shows the phases relevant to the player's actual route through the app.
- `ConsoleHeader`, `WhyItMatters`, `MetricBar`, `LabeledBar` — shared presentational components reused across all three flows.
- `SoundToggle`, `ParticleField`, `Confetti`, `ToastStack` — the gamification layer, isolated from core simulation logic.

Core scoring and simulation logic lives in plain, pure functions outside the component tree: `generateCompany`, `generateCrisis`, `applyCrisisImpact`, `getActionEffect`, `negotiationScoreOf`, `computeBuilderMetrics`, `computeBuilderScore`, `applyBuilderChoicesToCompany`, `generateBuilderFeedback`, `computeBadges`, and, new in V3, `computeTowerLinkage`, `createAlertInstance`, `tickAlerts`, `resolveAlertAction`, `escalationPenalty`, `detonationPenalty`, `computeTowerGrade`, `computeTowerPerformance`. Keeping these pure and separate from rendering made it possible to verify the entire escalation ladder, scoring hierarchy, and foundation-linkage math directly, without needing a live browser to test a real-time game loop.

## License

Built for educational and portfolio purposes as part of a personal AI mastery challenge. Feel free to fork, remix, or adapt.
