# Build With Me: Testing the Brain Dump Action Planner Skill in Claude

**Author:** Deborah Olofin  
**Date:** June 2025  
**ABTalks 60-Day Claude AI Mastery Challenge**

---

## What I Was Building

I have a custom skill called the **Brain Dump Action Planner** installed in my Claude workspace. The skill is designed to take raw, messy, unstructured notes — voice memos, scattered thoughts, meeting rambles — and transform them into a structured output: summaries, key takeaways, action items, open questions, risks, and conflicts.

The goal of this session was to test whether the skill actually works in practice, across real, unscripted input. Not a clean bullet list. Not formatted notes. A live voice brain dump, the kind that wanders and doubles back and contradicts itself — which is exactly what I gave it.

Alongside the skill test, I asked Claude to render the structured output as an **interactive HTML dashboard** — a single-page interface with a sticky nav bar, stat cards, section headers, and collapsible notes. The whole thing had to look sharp and be fully navigable without any external dependencies.

---

## The Input: What I Gave It

The brain dump was a raw voice recording, transcribed as-is. Here's what was in it:

- The Crypto AI Intelligence System, a project I have been building since April, currently at phase 3 of 6, and the drop in motivation around it
- Five things running in parallel at once: the crypto project, AWS AI Practitioner course, DataCamp ML Engineering course, LinkedIn content and engagement, and the job search with cold emailing
- Feeling unusually drained, and knowing that a fixed schedule is not going to fix it since I have a history of not following schedules
- Plans to reach out to people on LinkedIn who are actively building, to explore collaboration or mutual support
- A self-imposed rule: only ask the data scientist I want as a mentor after the crypto project is finished and published
- An idea to document the crypto project as a video series with a face-cam overlay instead of a written series, and uncertainty about whether that was even the right format

There was also a factual conflict in the original recording. I said the crypto project was "completed right now" in one breath and "perhaps in phase three of six" in the next. The skill correctly flagged this as a conflict in the dashboard rather than silently picking one version. I later clarified it is phase 3 of 6, and the dashboard was updated accordingly.

---

## What Claude Built (First Output)

Claude processed the voice dump using the brain-dump-action-planner skill and generated an HTML dashboard with the following sections:

| Section | What It Contained |
|---|---|
| Summary | A clean paragraph restating everything from the dump, with a visual strip showing the 5 parallel commitments |
| Key Takeaways | 8 takeaway cards in a two-column grid |
| Action Items | A full table: 9 tasks with Owner, Deadline, and Status columns |
| Open Questions | 3 questions surfaced from the notes, marked as unresolved |
| Risks / Blockers | 5 items ranked High or Medium, including burnout and the schedule problem |
| Conflicts | Flagged the "completed vs. phase 3 of 6" contradiction |
| Additional Notes | Collapsible details on the video series reasoning and the skill test context |

The design used a dark navy theme with colour-coded accents across sections, a sticky header, and stat cards at the top showing counts for actions, questions, risks, and conflicts.

---

## Problem 1: The Artifact Wouldn't Load

**Symptom:** After the dashboard was generated, Claude's artifact preview showed: *"Loading is taking longer than expected. There may be an issue with the content you're trying to load."*

**Diagnosis:** The original HTML file opened with an `@import` call to Google Fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');
```

The Claude artifact viewer renders inside a sandboxed iframe. That iframe does not have unrestricted access to external network resources. The `@import` was blocking the entire CSS parse while it waited on a response from `fonts.googleapis.com` — a response that was either timing out or being silently blocked by the sandbox. The viewer hit its timeout and surfaced the loading error.

**Fix:** Removed the `@import` entirely. Defined two CSS custom property font stacks using only system fonts — fonts that are available in the browser itself and require zero network requests:

```css
:root {
  --font-display: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
}
```

Every `font-family` reference throughout the stylesheet was updated to use `var(--font-display)` or `var(--font-body)`. The visual difference from removing the custom fonts was negligible. The artifact loaded immediately.

---

## Problem 2: Navigation Clicking Through to a "Loading" State

**Symptom:** Clicking any of the nav buttons in the sticky header triggered the same "Loading is taking longer than expected" error instead of scrolling within the page.

**Diagnosis:** The nav was built using standard HTML anchor links:

```html
<a href="#summary">Summary</a>
<a href="#risks">Risks / Blockers</a>
```

In a normal browser context, `href="#summary"` scrolls the current page to the element with `id="summary"`. In the sandboxed artifact iframe, however, the viewer intercepts anchor navigation and attempts to treat it as a navigation event — loading a new "page" at the URL `#summary`. That page does not exist anywhere, so the viewer hangs.

**Fix:** Replaced every `<a>` nav link with a `<button>` element carrying a `data-target` attribute instead of an `href`. No anchor, no navigation trigger. A small JavaScript block at the bottom of the file wires the clicks to programmatic scroll instead:

```javascript
document.querySelectorAll('.nav-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var target = document.getElementById(btn.getAttribute('data-target'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
```

Because the button has no `href`, there is nothing for the iframe viewer to intercept. The click goes straight to the JS handler and stays on the page.

---

## Problem 3: Scrolling to Below the Section Heading

**Symptom:** Clicking a nav button scrolled the page to the correct section, but landed a few lines below the section heading rather than at it. The heading itself was cut off at the top.

**Diagnosis:** The dashboard has a sticky header fixed to the top of the viewport. When `scrollIntoView()` runs with `block: 'start'`, it positions the target element's top edge at the top of the **scroll container** — not accounting for the sticky header sitting on top of it. The header was overlapping and hiding the section title.

The CSS already had `scroll-margin-top: 90px` on each section, which is the standard way to handle this. In this sandboxed environment, however, that property alone was not enough to fully compensate, and the header height can vary.

**Fix:** Replaced `scrollIntoView()` with a manual scroll calculation that reads the actual header height at click time and subtracts it from the target's position, with a small 12px buffer:

```javascript
var header = document.querySelector('.dash-header');
var headerH = header ? header.offsetHeight : 0;
var top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
window.scrollTo({ top: top, behavior: 'smooth' });
```

`getBoundingClientRect().top` gives the distance from the current viewport top to the element. Adding `window.pageYOffset` converts that to an absolute page position. Subtracting the header height and a small gap puts the section title cleanly below the nav bar.

---

## What the Final Dashboard Looks Like

The finished dashboard has:

- A sticky nav with 7 section buttons that scroll accurately to each heading
- 4 stat cards at the top (Action Items: 9, Open Questions: 3, Risks: 5, Conflicts: 0)
- A Summary section with a parallel-commitments strip showing all 5 active workstreams as coloured rows
- A two-column Key Takeaways grid
- A full Action Items table with status badges (Pending, High Priority, Blocked, Open Question)
- Open Questions, Risks, and Conflicts sections as stacked item cards with colour-coded left borders
- Collapsible Additional Notes at the bottom for supplementary detail that doesn't belong in the main sections
- Fully self-contained: no external scripts, no external fonts, no CDN calls

---

## What This Session Demonstrated About the Skill

The brain-dump-action-planner skill held up well across a genuine unscripted input. A few things worth noting:

**It did not invent.** Where owner names and deadlines were not specified in the dump, the table shows "Not specified" — not a guess.

**It surfaced the contradiction.** The conflicting project status ("completed" vs "phase 3 of 6") was caught and flagged rather than silently resolved. This is the correct behaviour for a tool that is supposed to reflect what was actually said, not what was probably meant.

**It separated concerns cleanly.** The video series idea, the mentor plan, the collaboration outreach, and the balance problem all ended up in different sections without needing to be pre-sorted. The messy voice input was genuinely messy and the output was genuinely structured.

**The sandboxed artifact environment has real constraints.** External `@import`, anchor-based navigation, and naive `scrollIntoView` usage all need to be handled differently inside the Claude artifact iframe than they would in a standard web deployment. These are not skill problems — they are environment problems. And they are all solvable.

---

*Built as part of the ABTalks 60-Day Claude AI Mastery Challenge.*
