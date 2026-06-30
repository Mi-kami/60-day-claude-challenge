# PriorRight
LINK: https://priorright.netlify.app/

**Authorization should never come before care.**

PriorRight is an interactive, gamified simulator of the US Prior Authorization (PA) healthcare system — built as an advocacy and education tool. It does not just explain how PA works. It makes you feel it.

Each patient case runs twice: first through the broken system that exists today, then through PriorRight's ideal system — showing what authorization could look like if it were designed around patients instead of cost control.

---

## What It Is

A single-file HTML application with no dependencies, no frameworks, and no build step. Drop it in a browser and it runs.

It covers four patient scenarios, each exposing a different failure mode of the current Prior Authorization system:

| Patient | Condition | Key Issue |
|---|---|---|
| Marcus, 58 | Cardiac MRI | Racial disparity + automated denial |
| Sofia, 31 | Biologic medication | Step therapy / fail-first policy |
| David, 44 | Urgent gallbladder surgery | Federal urgency rule violation |
| Aisha, 19 | Acute psychiatric crisis | Mental Health Parity Act violation |

Cases unlock progressively. You cannot skip to Aisha without going through Marcus, Sofia, and David first — because the educational load builds deliberately. By the time you hit a 19-year-old in psychiatric crisis waiting 4 days for inpatient approval, you already understand exactly what each day of that wait means.

---

## How It Works

### Broken System Mode

You drag and drop a patient case through three workflow lanes — Patient, Provider, Payer — watching the process unfold in real time. Days tick up. Efficiency drops. Denials arrive. A callout panel appears at every stage showing:

- What just happened in the current system
- Why it happens (the financial and structural incentive)
- What the PriorRight solution would do instead
- A real-world statistic sourced from AMA, KFF, NAMI, and US Senate investigations

### Transition Screen

When the broken system case ends, a side-by-side screen appears: *9 days vs projected 4 hours. 1 denial vs 0. You just experienced one. Now run the other.*

### PriorRight Ideal Mode

Same patient. Same condition. Same insurance. The ideal system runs — and the experience is noticeably different. The topbar turns green. The payer lane becomes "PriorRight." Cards show "Auto-Processed" instead of "Denied." Steps complete in hours instead of days. Callouts explain why each ideal step is technically and legally achievable today — not hypothetical future technology, but existing frameworks like FHIR, the 21st Century Cures Act, and the Mental Health Parity Act applied as written.

### Outcome Screen

After both modes complete for a patient, a side-by-side comparison shows the full contrast:

- Current system: 9 days, 1 denial, physician spent 90 minutes on hold
- PriorRight: 4 hours, 0 denials, documentation automated

### Summary Screen

After all four patients are complete, the summary screen collects every case into a comparison table, presents the real-world data behind what just happened, explains the racial equity dimension explicitly, and gives three concrete advocacy actions the user can take in real life.

---

## Why This Was Built

Prior Authorization is a requirement used by US insurance companies where a doctor must get permission before providing certain care. The data on its impact is not ambiguous:

- **94%** of physicians say PA causes delays in care — AMA, 2022
- **33%** of physicians report a patient experienced serious harm due to PA delay — AMA, 2022
- **90%** error rate found in UnitedHealthcare's AI auto-denial algorithm — US Senate Investigation, 2023
- **56%** of inpatient psychiatric PA requests denied on first submission — NAMI, 2023
- **$93 billion** estimated annual cost of PA administrative burden — AMA, 2022

Black patients face higher PA denial rates than white patients for identical procedures. The Mental Health Parity Act has been law since 2008 and is routinely violated. A 19-year-old in acute psychiatric crisis can spend four days in an emergency department while an insurance company's paperwork process catches up.

This tool does not present those facts as neutral information. It presents them as what they are: a system causing measurable, documented harm to real people — and it demonstrates that the technical and policy solutions already exist.

---

## Technical Details

- **Single file:** HTML + CSS + Vanilla JavaScript
- **No dependencies:** No CDN, no npm, no build step
- **No storage:** All state managed in JavaScript memory
- **Responsive:** Works on mobile and desktop
- **Accessible:** Keyboard-navigable, high contrast throughout

### Scenario Data

All patient scenarios are stored in a single `SCENARIOS` array near the top of the script. Each scenario contains:

```
{
  id, name, emoji, condition, insurance,
  denialRisk, tags, hasEquityFlag,
  brokenSteps: [ ...5 steps with callout data ],
  idealSteps:  [ ...3 steps with callout data ],
  brokenDays, brokenDenials, idealDays,
  outcome: { headline, body, realityCheck }
}
```

To add a new scenario, copy an existing entry and edit the data. The simulation engine handles the rest.

---

## Visual Design

Deep navy base (`#0A1628`) with electric blue (`#0066FF`) as the primary accent. Amber (`#F59E0B`) for warnings and delays. Red (`#DC2626`) for denials. Green (`#16A34A`) for the ideal system — so the mode switch is visible before the user reads a word.

The broken system and ideal system are visually distinct on purpose. Feeling the difference is the point.

---

## Real-World Data Sources

- American Medical Association (AMA) Prior Authorization Physician Survey, 2022
- KFF Health Policy Prior Authorization Report, 2023
- National Alliance on Mental Illness (NAMI) Parity Report, 2023
- US Senate Permanent Subcommittee on Investigations, UnitedHealthcare AI Denial Report, 2023
- American Psychiatric Association (APA) Prior Authorization Survey, 2022
- American College of Cardiology, Peer-to-Peer Review Data, 2021
- Wit v. United Behavioral Health, California, 2023

---

## Built as Part of the 60-Day Claude AI Challenge

Day 25 of the #ABTalksOnAI challenge — one project per day, built in public on LinkedIn.

This one took longer than a day to think through. The domain knowledge phase alone — understanding what PA actually does to people, who it harms most, and why it still exists — shaped every design decision in the application. The tool exists because the domain demanded honesty, not because the tech was interesting.

---

*PriorRight is an educational advocacy simulator. It does not provide medical or legal advice. If you have received a PA denial, you have the right to appeal. If you are a provider, you have the right to request Peer-to-Peer review. If you are a patient, your state insurance commissioner can initiate an independent external review — at no cost to you.*
