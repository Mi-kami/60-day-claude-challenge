# Marketing Detective

A single-file, fully offline detective game that teaches marketing diagnosis through casework instead of case studies. Built as Day 34 of the #ABTalksOnAI 60-day build challenge, closing out a three-part arc with Day 32 (Marketing Strategist) and Day 33 (Media Integrity Analyzer).

---

## Why this exists

Reading a case study about a failed campaign is passive. You're told the mistake before you've had a chance to notice it yourself. This app inverts that: you get the raw evidence first, exactly as a strategist reviewing a campaign post-mortem would see it, reach, click-through rate, real customer comments, social sentiment, budget breakdown, and you have to work out the actual root cause before the app tells you.

The mechanic is deliberately built like a detective board, not a dashboard, because the skill being taught is the same one either way: reading scattered, sometimes contradictory signals and finding the one that actually explains the outcome, rather than the one that's loudest or most obvious.

## The case structure

Each of the 10 cases includes:

- Company name, industry, campaign objective, target audience
- Marketing channels and budget allocation
- Campaign metrics (reach, CTR, engagement, conversions, sales)
- Real customer comments
- Social media performance notes
- One primary marketing mistake (the actual answer)
- Three supporting clues (which evidence card actually proves the mistake)
- A full explanation connecting the clues to the conclusion
- Three suggested improvements

Every case is built around a genuinely different failure mode: unclear differentiation, over-promised product vs. reality, vanity signups with no real activation, targeting mismatches, inaccurate specs driving returns, quality mismatches between trial and paid tiers, infrastructure failing under a campaign's own success, low-intent lead generation, unclear promotional terms, and a mismatch between marketing promise and service delivery. No two cases are solved the same way.

## Design: the deliberate red herring

Each case shows exactly 4 evidence cards (channels/budget, metrics, comments, social performance), but only 3 of them are the actual supporting clues for that case's mistake. Which card is the red herring changes from case to case, so there's no shortcut pattern to learn (like "the channels card is never relevant"). The user has to read all 4 cards and reason about which one is genuinely diagnostic before locking in their 3.

## User flow

1. **Case Assignment** — the case file: company, industry, objective, audience
2. **Investigation Board** — a corkboard of draggable, flaggable evidence cards
3. **Solve the Case** — pick the primary mistake from 4 options, then select exactly 3 supporting clues
4. **Case Closed** — a stamp animation reveals whether the diagnosis was correct, plus the full explanation and suggested improvements
5. **Learning Report** — an overall investigation score, a detective rank, and the improvements recap

## The drag mechanic

Evidence cards are draggable using pointer events with a small movement threshold: if a pointerdown-to-pointerup sequence moves more than 5px, it's treated as a drag and the card's position is committed on release. If it doesn't move past that threshold, it's treated as a tap and toggles the card's "flagged as lead" state instead. This lets a single element support both interactions without a separate drag handle or button, which keeps the corkboard feeling like an actual investigation board instead of a form with buttons on it.

## Scoring

Final score is 60% correct primary-mistake diagnosis, 40% accuracy of the 3 selected supporting clues against the case's true supporting clue set. The resulting score maps to a detective rank, from "Back to the Academy" up to "Master Detective."

## Tech stack

- **Pure vanilla JavaScript, HTML, and CSS.** No React, no Babel, no CDN of any kind.
- The brief allowed switching away from React+CDN if it would hurt reliability as a standalone file. Given a real CDN outage encountered while building Day 32, and given Day 33 was built the same way with no issues, vanilla was the clear, deliberate choice here too, not a fallback taken reluctantly.
- One `render()` function redraws the relevant screen on state change; interaction is handled through a single delegated click listener plus dedicated pointermove/pointerup listeners for the drag mechanic.
- Zero external assets: no fonts, no images, no analytics, nothing fetched over the network at any point, including first load.

## Design system

Four themes, all available at once via a floating switcher in the corner (not just at launch):

| Theme | Feel |
|---|---|
| Claude Orange | Warm cream case files, terracotta accents |
| Midnight Precinct | Navy-black with an amber desk-lamp glow |
| Classic Noir | Charcoal and sepia with red pushpin accents |
| Evidence Green | Deep forest green with brass accents |

The corkboard texture, sticky-note cards, pushpins, and folder tab are built entirely with CSS gradients, borders, and box-shadows, no image assets anywhere.

## Known considerations

- All 10 cases are pre-authored and randomly drawn without immediate repeats, not generated at runtime, since the app has no API access by design
- No data persists between sessions or is sent anywhere
- Drag interactions use Pointer Events, which cover both mouse and touch in modern browsers without separate handling code

## Author's note

This closes a three-part arc: Day 32 taught how to build a marketing strategy from scratch, Day 33 taught how to recognize when content is manipulating you as a reader, and this one teaches how to diagnose a campaign that already happened. Same underlying subject, three different vantage points.
