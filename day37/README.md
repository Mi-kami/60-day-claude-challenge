# Task Compass

> **A note on this folder:** this is the code and documentation submitted
> as part of the #ABTalksOnAI 60-day build challenge. It's provided here
> so the build is properly documented as a deliverable for the challenge.
> The live, maintained version of Task Compass lives in its own dedicated
> repository —[Task Compass](https://github.com/Mi-kami/task-compass)— and that repo, not this folder, is
> the source of truth for anyone deploying or contributing to the project
> going forward.

An AI-generated organizational workflow diagnostic. A team describes its
real roles, departments, and how escalation actually works today. Task
Compass generates nine realistic workplace scenarios built from that exact
structure, runs the player through three stages of ownership, routing, and
collaboration decisions, then produces a diagnostic report — including a
draft RACI matrix — comparing their instincts against standard
organizational best practice.

This is not a generic management-theory quiz. Every scenario is grounded
in the role names, department names, and stated escalation habits the user
provides, so the output reflects their actual team, not a stock archetype.

---

## Why this exists

Most teams believe they know who owns what, until a real incident proves
otherwise. By the time that gap surfaces, there's usually a customer, a
deadline, or a relationship at stake. Task Compass exists to surface that
gap in a low-stakes setting: play through nine plausible situations built
from your own org chart, see where your instincts match standard practice
and where they don't, and walk away with a draft RACI matrix you can
actually use in a real conversation with your team.

It's aimed at startups, small businesses, and self-employed founders in
particular — teams too small to have a dedicated ops or HR function, but
still exposed to the same "who owns this" failures as larger orgs, usually
with less slack to absorb the fallout when ownership is unclear.

## How it works

1. **Org intake** — a guided form collects 4-8 roles with departments,
   plus how the team currently handles first response and escalation.
2. **Scenario generation** — Gemini generates 3 scenarios per stage
   (9 total), using only the roles provided, each with a best-practice
   "ideal" answer and reasoning attached.
3. **Play** — the user works through Stage 1 (single ownership), Stage 2
   (routing order), and Stage 3 (multi-role collaboration), with the
   ideal answer and reasoning revealed after each submission.
4. **Diagnostic report** — a second pair of Gemini calls compares the
   full play log against the ideal answers and generates: what the
   player understood well, where they over-assigned ownership, where
   they underestimated collaboration, a grounded insight, four scored
   dimensions (ownership, delegation, collaboration, workflow thinking)
   shown as a compass-rose chart, and a draft RACI matrix.

## Architecture

```
.
├── index.html                    # static frontend — HTML/CSS/vanilla JS
├── netlify/functions/generate.js # serverless proxy to the Gemini API
├── netlify.toml                  # routes /api/generate -> the function
└── README.md
```

The frontend never talks to Gemini directly and never asks a visitor for
an API key. It calls `/api/generate`, which Netlify routes to
`generate.js`. That function holds the Gemini key as a server-side
environment variable and is the only part of the system that ever makes
an outbound call to Google. This keeps the key out of the browser
entirely, which matters both for security and for usability — nobody
using this tool needs their own key.

Scenario and report generation are each split into multiple smaller,
parallel Gemini calls (3 for scenarios, 2 for the report) rather than one
large call. Netlify's free-tier functions time out at 10 seconds, and a
single call asking for all 9 scenarios with full reasoning reliably
exceeded that. Splitting the work keeps each individual call well inside
the window.

## Deploy (Netlify)

1. Push this folder to a GitHub repo, or drag-and-drop it into Netlify's
   deploy UI.
2. In Netlify: **Site settings → Environment variables → Add a variable**
   - Key: `GEMINI_API_KEY`
   - Value: your Gemini API key (from Google AI Studio)
3. Deploy (or redeploy, if the variable was added after the first
   deploy — environment variables only apply to builds that happen
   after they're set).
4. Visit the site. The org form should work with no key prompt.

## Local testing

```
npm install -g netlify-cli
netlify dev
```

Create a local `.env` file with `GEMINI_API_KEY=your-key-here` (don't
commit it). This runs the static site and the function together.

## A note on the Gemini free tier

Everything above was built and tested against Gemini's free tier, which
is worth understanding before relying on this for anything beyond
personal testing:

- Limits are enforced **per Google Cloud project, not per API key** —
  extra keys don't add quota.
- Free-tier Flash models run roughly 10-15 requests per minute and
  ~1,500 requests per day. One full playthrough uses 5 calls, so this is
  comfortable for solo use but can be hit if several people generate at
  the same moment on a shared key.
- Free tier carries **no SLA** — occasional slow responses during peak
  load are expected and aren't a bug in this codebase.
- Google may use free-tier prompts to improve their models. Since this
  tool asks for real internal escalation habits, that's worth disclosing
  to anyone using it seriously, or resolved by enabling billing before
  a real rollout.
- Enabling billing removes the free tier entirely for that project —
  every subsequent call becomes billable. Use a separate project if you
  want to keep a free testing environment alongside a billed production
  one.
- Free-tier model availability changes without much notice — this
  project uses the `gemini-flash-latest` alias rather than pinning a
  specific dated model, so it follows Google's current recommended Flash
  model automatically instead of breaking when a specific version is
  deprecated.

## Build notes

Built as part of the #ABTalksOnAI 60-day build challenge. The brief
originally called for a generic RACI-teaching quiz game. I deviated from
it deliberately — a tool that teaches org theory in the abstract isn't
something a real team would use twice, so I rebuilt it around each
team's actual structure instead, with Gemini generating scenarios and a
diagnostic report from real input rather than a fixed question bank.

Mid-build, the app started failing with errors that traced back to
changes on Gemini's side: a previously working model was quietly
restricted, and later a timeout surfaced because a single request was
asking for more than the platform's function timeout could support. Free
tier terms and model availability shift more often than the docs
suggest, and the fix in both cases was the same: stop assuming the
platform is static, check what actually changed, and adjust rather than
patch around the symptom.
