# Think Like a Marketing Strategist: Grow This Brand

A single-file, offline-capable simulation that teaches marketing strategy by making the user *make the decisions*, instead of reading about them. Built as Day 32 of the #ABTalksOnAI 60-day build challenge.

---

## Why this exists

Most beginner marketing content teaches tactics: which platform to use, what to post, how often. It rarely teaches the thing a paid strategist actually gets hired for, which is judgment: diagnosing the real problem before touching a channel, forcing trade-offs under a limited budget, and reading real performance data before deciding what to do next.

This app is built around that gap. Every screen makes the user commit to a decision, then shows the reasoning a strategist would apply to that same decision, before moving on. Nothing is generated *for* the user. The user builds the strategy; the app explains why it worked or didn't.

## The simulation flow

| Step | What happens | The strategist skill it teaches |
|---|---|---|
| 1. Setup | Choose a real business, a personal brand, or a randomly generated client | Working with constraints you didn't choose |
| 2. Diagnosis | Name the actual root problem (awareness / leads / conversion / retention / positioning) | Diagnosing before prescribing |
| 3. Positioning | Fill in a guided positioning statement ("For X, brand is the Y that Z, unlike A, because B") | Sharpening differentiation before touching tactics |
| 4. Platforms | Pick channels, scored against budget, competition, and the diagnosis | Channel fit over channel popularity |
| 5. Budget | Split 100 points across chosen platforms | Real trade-offs, not "a bit of everything" |
| 6. Pillars | Choose exactly 3 recurring content themes | Focus over content sprawl |
| 7. Roadmap | A 4-week strategic plan, not a posting calendar | Sequencing effort so early weeks enable later ones |
| 8. Check-in | Read a simulated Month 1 data snapshot and decide: double down, pivot, or wait | Interpreting data instead of just producing content |
| 9. Event | Respond to a branching, unexpected curveball | Judgment under pressure |
| 10. Report | A full Growth Report with a leading/lagging KPI framework | Measuring the right things |

A persistent **Strategic Clarity Meter** tracks decision quality throughout, so a bad call has a visible, immediate consequence instead of only showing up in the final score.

Every major screen also includes a **"How to ask Claude"** card: a ready-to-copy prompt that mirrors the exact reasoning the screen just taught, so the user leaves with a reusable prompting pattern, not just a one-off answer.

## Tech stack

- **React 18** (UMD build, loaded via CDN) — no build step, no bundler
- **Babel Standalone** — transpiles JSX to plain JS directly in the browser at load time
- **Vanilla CSS** — custom properties (CSS variables) drive the entire theme, including a color system that shifts hue across the 11 stages of the simulation
- **Zero backend, zero API calls, zero analytics** — all state lives in React `useState`, nothing persists between sessions

Everything ships in **one `.html` file**. There is no `package.json`, no `node_modules`, no build pipeline. Opening the file in a browser (with an internet connection, for the CDN scripts) is the entire deployment story.

### Why CDN + Babel instead of a build step

The brief for this challenge day called for React via CDN with in-browser JSX transpilation rather than a compiled bundle, so the file stays genuinely single-file and portable: no `npm install`, no build output to manage, just one artifact that works the moment it's opened. The trade-off is a first-load dependency on the CDN (React, ReactDOM, and Babel Standalone), which is why the file includes a loading indicator and a visible fallback message if those scripts fail to reach the browser, rather than a silent blank screen.

## Design system

- **Base palette**: light background (`#FBF9FF`) with soft, blurred multi-color gradient blobs behind the content
- **Stage-cycling accent**: each of the 11 stages gets its own accent color (purple → pink → indigo → violet → blue → cyan → teal → gold → orange → coral → magenta), applied live via CSS custom properties as the user progresses, so the interface visibly changes character at each step
- **Fixed semantic colors**: "strong / workable / risky" fit tags always use the same teal / gold / coral regardless of the current stage color, so their meaning stays consistent
- **Typography**: Space Grotesk (display/headers), Inter (body), JetBrains Mono (data, scores, prompts)
- **Motion**: staggered fade-ins on option grids, a subtle tilt-lift on card hover, and a smooth color transition on the Strategic Clarity ring

## Replayability

Every "New Client" run randomly draws from a pool of 8 fictional businesses spanning different industries, budgets, and competitive situations. Combined with 5 possible diagnoses, 7 platforms, 8 content pillars, a branching Month 1 check-in, and 4+ random curveball events, no two runs produce the same report.

## Known considerations

- Requires an internet connection on first load to fetch React, ReactDOM, and Babel from `cdnjs.cloudflare.com`
- No data is saved between sessions; refreshing the page resets the simulation
- Designed and tested for modern desktop and mobile browsers (Chrome, Safari, Edge)

## Author's note

Built for the #ABTalksOnAI 60-day challenge: one deployable AI-assisted tool per day. This one went noticeably further past the original brief than most, because marketing strategy turned out to be a much more technical discipline than "writing good content," and the build reflects that.
