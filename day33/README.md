# Media Integrity Analyzer

A single-file, fully offline media literacy trainer. Built as Day 33 of the #ABTalksOnAI 60-day build challenge, as the companion piece to Day 32's Marketing Strategist simulator.

---

## Why this exists

Most media literacy content tells you the rules after the fact: "watch out for clickbait," "don't trust vague sourcing." This app does the opposite. It shows you a real (fictional but realistic) headline or post first, lets you guess and flag what feels off with your own hands, and only then reveals the mechanics behind it. The learning happens in the gap between your guess and the reveal, not in a lecture beforehand.

It's built to be the mirror image of Day 32. That app taught how to construct a message that earns attention. This one teaches how to recognize when a message is manufacturing that attention dishonestly. Same underlying techniques (urgency, emotional framing, audience targeting), viewed from opposite sides of the screen.

## The two challenges

**Challenge 1: Headline Detective.** A fictional headline and article are shown side by side, with a fabricated outlet name, byline (or a flagged missing one), and date. The user taps the exact words or phrases in the headline that feel exaggerated, guesses whether they'd click it, and rates the source's reliability. The reveal shows a Headline Accuracy Score, which words were actually misleading (highlighted green if the user caught them, red if they missed or over-flagged), a fair rewritten headline, and a plain-language explanation of the gap between headline and article.

**Challenge 2: Emotion Detector.** A fictional social post or caption is shown. The user taps the phrases that most shaped how it made them feel, guesses the intended audience, and names the emotion it triggered in them. The reveal names the actual manipulation technique, shows a neutral rewrite of the same content, and includes a short callback connecting the technique to its honest marketing equivalent from Day 32 (for example, tying manufactured urgency in a scam post to the honest use of real urgency in a legitimate promotion).

**Bonus: Test Something Real.** A paste-your-own box that runs the same pattern-detection logic on the user's own text, whether that's a caption they're about to post or a headline they're deciding whether to trust. It's a heuristic scanner, not a fact-checker, and the app says so explicitly.

## Scoring methodology

Both challenges use the same underlying mechanic: every headline or post is pre-authored as an array of text chunks, each tagged as misleading/emotional or not. The user's taps are compared against that tagging using a simple precision-and-recall style score (correctly flagged chunks count up, wrongly flagged chunks count down), rather than a binary right/wrong quiz answer. This rewards careful reading over guessing.

The **Paste Your Own** heuristic runs a plain-JS pattern scan for:
- Shouting (ALL CAPS words)
- Superlative/absolutist language ("shocking," "banned," "instantly," "never")
- Conspiracy/secrecy framing ("they don't want you to know," "before it's taken down")
- Vague, unnamed sourcing ("sources say," "experts claim")
- Excessive punctuation
- Unattributed numeric claims (a percentage or scale claim with no named study or source nearby)

Each flag deducts points from a 100-point baseline. The app is explicit in its own copy that this is a simplified teaching heuristic, not a verdict on whether a real claim is true, since overclaiming accuracy on user-submitted real-world content would be irresponsible.

## Live metrics

A sticky header tracks four running scores as the user progresses: Headline Accuracy, Source Reliability, Emotional Manipulation detection, and Audience Targeting. These are skill scores (how well the user is reading the signals), not content ratings.

## Tech stack

- **Pure vanilla JavaScript** — no framework, no build step, no CDN dependency of any kind
- **Vanilla CSS** with custom properties driving a full theme system
- **Zero external assets** — no fonts, no images, no analytics, nothing fetched over the network at any point, including first load
- A single `render()` function re-draws the relevant DOM region on every state change, with one delegated click listener on `document` handling all interaction via `data-action` attributes, rather than re-attaching listeners after each render

This is a meaningfully different constraint from Day 32, which used React and Babel via CDN. This build has no first-load network dependency at all: open the file with no internet connection and it works exactly the same.

## Design system

Four selectable themes, chosen up front on the welcome screen:

| Theme | Feel |
|---|---|
| Midnight Editorial (default) | Deep navy with gold accents, broadsheet-at-night |
| Claude Orange | Warm cream background with terracotta accents |
| Crimson Press | Charcoal black with crimson red, newsroom energy |
| Emerald Ink | Deep green with soft gold, premium magazine feel |

Typography uses only system font stacks (Georgia for display/headlines, system sans-serif for body, system monospace for scores and data), which keeps the editorial feel without requiring a single external font file.

## Known considerations

- All scenario content is pre-authored and randomly drawn from a fixed pool (6 headline scenarios, 6 emotion scenarios), not generated at runtime, since the app has no API access by design
- The Paste Your Own analyzer is a pattern heuristic, explicitly disclaimed as such, and does not verify factual accuracy of any claim
- No data persists between sessions or is sent anywhere; everything lives in an in-memory state object for the duration of the page load

## Author's note

Built as the direct companion to Day 32. The two apps stayed deliberately separate rather than merged, since combining "how to market convincingly" and "how to detect manipulative marketing" into one tool would have diluted both lessons. Instead, Day 33 links back to Day 32 explicitly at the one place it matters most: the emotional manipulation reveal, where the honest version of each manipulative technique is named directly.
