# 🏥 AdmitReady — Hospital Admission Readiness Simulator

> Day 29 of 60 · #ABTalksOnAI · Built by Temi

A browser-based training simulator for hospital admission coordination workflows. You play the role of an Admission Coordinator navigating PA status, insurance, bed assignment, documentation, consent, and care coordination — all the way to a final admit decision.

**[Live Demo →](#)** · No backend. No login. Single HTML file.

---

## What It Does

AdmitReady simulates the full admission readiness workflow for five clinical scenarios across five admission types. Every decision you make — from PA status to diagnosis to payer — shapes the simulation you navigate.

### Setup
Configure the scenario:
- Provider and Attending Physician (illustrative training data)
- **Diagnosis:** Acute MI · CHF · Pneumonia · Elective Surgery · Hip Fracture
- **Admission Type:** Inpatient · Observation · Emergency · ICU · Same-Day Surgery
- **Payer:** Medicare · Medicaid · BlueCross · Aetna · Self-Pay
- **PA Status:** Approved · Pending · Denied
- Admission Date

### Readiness Score
A weighted readiness score calculated from six components:

| Component | Weight |
|---|---|
| PA Status | 25% |
| Clinical Documentation | 20% |
| Physician Orders | 20% |
| Insurance Verification | 15% |
| Consent | 10% |
| Bed Assignment | 10% |

Initial score lands between 30–60%. Actions move it upward. Final admission requires ≥ 90%.

### PA Branching Logic
- **Approved** → proceed with admission workflow
- **Pending** → Follow Up · Upload Docs · Contact Physician
- **Denied** → Review Reason → Contact Insurance → Submit Appeal → Appeal Approval converts to Authorized

> **ICU + Denied PA:** Score is capped at 60%, but admission is never hard-blocked. For critically ill patients, clinical need takes precedence over authorization status. The simulator reflects that.

### Workflow Actions
Seven clickable tasks that update the score and status in real time:
- Assign Bed
- Verify Insurance
- Upload Documentation
- Complete Consent
- Contact Physician
- Notify Nursing
- Prepare Patient Arrival
- MOON Form Delivery *(Observation only — checkbox compliance task)*

### Care Coordination Cards
Five team roles with context-aware content:

| Role | Highlights |
|---|---|
| Attending Physician | Orders, diagnosis confirmation, escalation |
| Case Manager | Care plan, payer comms, discharge initiation |
| Nursing Team | Bed prep, intake, triage readiness |
| **Utilization Review** | Concurrent review · denial risk · InterQual · Milliman |
| Discharge Planner | SNF eligibility, post-acute options |

> **UR card adapts by admission type.** Scheduled admissions (Elective/Same-Day) show planned, low-urgency UR language. Emergency/ICU/cardiac show active concurrent review, real-time denial risk, and clinical criteria language.

### Admission Timeline
Nine milestone tracker:
`PA Review → Insurance Verification → Bed Assignment → Documentation → Consent → Patient Arrival → Registration → Clinical Assessment → Admission Complete`

### Risk Tracking Panel
Four qualitative risk indicators — separate from the readiness score (no score impact):
- Documentation Risk
- Insurance Risk
- Bed Risk
- **Clinical Risk** — weighted higher for Acute MI, CHF, ICU

### Governance Snapshot *(unlocks at ≥ 75%)*
Industry benchmark reference:
- PA turnaround: **3–5 days**
- Inpatient denial rate: **8–10%** *(CMS)*
- PA rework cost: **$11/transaction** *(CAQH)*

### Final Decision
- **≥ 90%** → ✅ Admit — full summary with diagnosis, type, PA status, provider
- **< 90%** → ⚠ Not Ready — itemised missing items and required actions

### Compliance Notices
- **Observation Status** triggers the CMS 2-Midnight Rule notice automatically, with MOON notification requirement
- **Acute MI / CHF** trigger InterQual/Milliman criteria notice for UR review
- **Disclaimer** pinned to footer: *Simulated environment. All data, scores, and workflows are for training purposes only.*

---

## Clinical Concepts Covered

| Term | What It Means |
|---|---|
| **PA (Prior Authorization)** | Insurance permission slip before a patient is admitted |
| **2-Midnight Rule** | CMS rule — a patient must be expected to stay 2+ midnights to qualify as inpatient vs. observation |
| **MOON** | Medicare Outpatient Observation Notice — federally required written form for Medicare observation patients |
| **InterQual / Milliman** | Clinical criteria tools used by UR teams to determine if an admission meets medical necessity |
| **Concurrent Review** | Active, real-time UR review happening during an emergency admission |
| **SNF Eligibility** | Skilled Nursing Facility eligibility — affected by whether patient is inpatient vs. observation |
| **Utilization Review (UR)** | Hospital team that validates clinical necessity and manages denial risk |

---

## Tech Stack

| Layer | Choice |
|---|---|
| Structure | HTML5 |
| Styling | Tailwind CSS CDN + custom CSS variables |
| Logic | Vanilla JavaScript |
| Fonts | IBM Plex Mono + Inter (Google Fonts) |
| Deployment | Single file — Netlify drag-and-drop |

No build step. No dependencies. No framework. Open the file and it works.

---

## Design System

- **Base:** `#0a0e1a` navy
- **Primary accent:** `#00e5ff` electric cyan
- **Secondary:** `#f59e0b` amber
- **Success:** `#22c55e` green
- **Alert:** `#ef4444` red
- **Typography:** IBM Plex Mono (data/scores) · Inter (UI)
- Task-first layout — no dashboard on load, simulation begins on setup completion

---

## Disclaimer

> **Simulated environment. All data, scores, and workflows are for training purposes only.**
> Provider and payer names are illustrative training data. This tool is not a substitute for institutional policy, clinical judgment, or legal compliance guidance.

---

## The #ABTalksOnAI Challenge

60 days. 60 deployable AI tools. Built in public.

This is Day 29. Each project ships with a working tool, a GitHub README, and a LinkedIn post documenting the build process — technical decisions, domain research, and real workflow thinking.

Follow the journey: [LinkedIn →](#)

---

*Built with curiosity about how technology intersects with systems that affect real people.*
