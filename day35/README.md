# 🧩 Prompt Puzzle — Master AI Prompting Through Play

A single-file, zero-dependency web app that turns prompt engineering into a game. No signup, no server, no API calls. Open the HTML file and you're playing.

**Part of the ABTalks 60-Day Claude AI Mastery Challenge.**
Live link: https://prompt-puzzle.netlify.app/

---

## What it actually does

Prompt engineering is a skill, but most people never get direct feedback on how good they are at it. This app fixes that by turning prompting into something you can practice, score, and get better at like any other skill.

Every session runs through scenarios pulled from **8 real-world domains** at once: Business & Marketing, Software Engineering & Data, Creative Writing, Academic & Research, Personal Productivity, Customer Support, Marketing & Advertising, and Data Analysis. Nobody gets left out just because they picked "beginner" or "code" as a category.

Three challenge types, all testing different prompting muscles:

- **Build the Prompt** — drag the right instruction blocks into place, dodge the distractor blocks (vague tone words, contradictory instructions, scope creep)
- **Clean the Prompt** — you're handed a bloated, over-engineered prompt and have to strip it down to what actually matters
- **Choose the Best Prompt** — three prompts, one desired output, pick the one that would actually get you there

Each scenario shows you the weak prompt vs the optimized prompt vs an over-engineered version, side by side with their actual outputs, plus the underlying prompting principle it's teaching (specificity, context, structure, few-shot anchoring, tone framing, output format specs).

## Why this matters (the actual point)

Anyone can write a prompt. Not everyone can tell a good one from a bad one, or know why one worked and another didn't. This puzzle is designed to expose that gap: it's not testing whether you can type instructions, it's testing whether you understand what makes a prompt *work*.

## Scoring system

Live tracking across:
- Accuracy (correct blocks placed / kept / chosen)
- Time (par-time bonus for finishing quick without rushing into mistakes)
- Moves
- Wrong placements (penalized per difficulty tier)
- Hints used (costs points, tiered by difficulty)
- Optimization bonus (clean run, zero wrong, zero hints)

## The report

At the end you get a full **Prompt Performance Report**:
- Prompt Score (averaged across all scenarios)
- Rank (D through S)
- Rating (Prompt Rookie → Prompt Virtuoso)
- **Prompt DNA** — a per-dimension bar chart showing exactly which prompting skills you're strong in vs which need work
- Personalized feedback calling out your strongest and weakest dimension
- Next milestone (the score threshold to hit the next rank)
- The optimized prompt from your weakest scenario, pulled out for you to actually study

Replay reshuffles scenario order and distractor sets, so no two runs feel identical.

## Technical fun bits

- **Truly single-file.** One `.html` file. No build step, no bundler, no CDN dependency, no internet connection required after download. Everything (HTML, CSS, JS) lives in one file on purpose, so it's as portable as a text file.
- **Vanilla JS, no framework.** Went with plain JS over React-via-CDN because a puzzle this state-heavy (drag-drop, timers, live scoring) doesn't need a virtual DOM to stay fast, and it keeps the file dependency-free and future-proof (no CDN going down mid-game).
- **Native HTML5 Drag and Drop API** powers the block-placement mechanic, with a parallel click-to-place fallback for touch devices where drag events get flaky.
- **Difficulty as a modifier, not a gate.** Instead of locking content behind difficulty levels, difficulty only changes hint cost, wrong-answer penalty, par time, and distractor count. Everyone plays the same domains, difficulty just changes how forgiving the game is.
- **Randomized distractor sampling per scenario** means the "wrong" options you see also change between plays, not just the order of the right ones.
- **Score formula:**
  `score = (correct/needed × 100) − (wrong × penalty) − (hints × cost) + timeBonus + optimizationBonus`
  capped at 130 to reward genuinely clean, fast, no-hint runs above the baseline 100.
- **CSS custom properties** drive the entire gradient theme (deep violet to teal), so re-skinning the whole app is a handful of variable edits, not a rewrite.
- Runs completely offline. You could email this file, and it would still work.

## How to use it

1. Download `prompt-puzzle.html`
2. Open it in any modern browser
3. Pick a difficulty
4. Play through the scenarios
5. Read your Prompt Performance Report
6. Replay to see if your score improves

## Why I built this

I've been documenting daily builds for the ABTalks 60-Day Claude AI Mastery Challenge, and prompt engineering is the one skill that's improved the most for me across the whole thing. This felt like the right way to actually measure that instead of just feeling like I'm "getting better" with no way to check.

---

*Built as part of the ABTalks 60-Day Claude AI Mastery Challenge — one Claude-powered project a day.*
