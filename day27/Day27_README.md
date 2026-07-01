# PA Story Simulator

**Day 27 of the 60-Day Claude AI Challenge — #ABTalksOnAI**

An interactive story-based chat simulator that walks you through a real Prior Authorization (PA) case from start to finish — diagnosis, submission, denial, appeal, and approval — through two characters having an actual conversation, at a pace you control.

---

## What It Does

You follow Rahul, a patient newly diagnosed with Rheumatoid Arthritis, and Priya, a healthcare operations specialist at his clinic, as they navigate the PA process together for Rahul's Humira prescription.

The story runs across 8 scenes. Messages appear one at a time — you tap "Continue" to reveal the next line, rather than the whole scene flooding in at once. At the end of each scene, you choose what you want to learn next, and the conversation branches based on your choice before continuing to the next stage.

It is designed to be beginner-friendly: no prior healthcare knowledge required.

---

## The Two Characters

**👦 Rahul** — the patient. Asking the questions most people actually have. Appears on the left.

**👧 Priya** — healthcare operations specialist at City Medical Center. Explains the system in plain language. Appears on the right.

Doctors and narrators appear as centered italic text — never as chat bubbles — to keep them visually separate from the two main voices.

---

## The 8 Scenes

| Scene | Title | What Happens |
|---|---|---|
| 1 | The Doctor Visit | Rahul gets diagnosed with RA. Dr. Patel prescribes Humira. PA process explained. |
| 2 | The Insurance Roadblock | PA submitted directly Provider → Payer. No pharmacy involved at this stage. |
| 3 | What Is PA? | Priya explains Prior Authorization in plain language, including step therapy and the "fail first" policy. |
| 4 | What StarCare Health Checks | Eligibility, clinical documentation, ICD-10 diagnosis match, step therapy history — and why each one matters. |
| 5 | The Denial | PA denied for missing step therapy documentation. Priya explains why denial ≠ permanent. |
| 6 | Building the Appeal | Letter of Medical Necessity, peer-to-peer review, formal appeal filing, patient rights. |
| 7 | The Approval | PA approved. Reference number issued. Saved on file permanently — no repeat PA needed for Humira. |
| 8 | Takeaways | Patient perspective (what Rahul learned) and system perspective (denial rate, appeal rate, resolution time). |

---

## Key Things the Simulator Teaches

**The PA flow for specialty medications:**
Provider submits PA → Payer reviews → Decision issued. The pharmacy is not involved until after approval.

**What step therapy actually means:**
Insurance companies can require you to try cheaper medications and fail on them before approving the medication your doctor actually prescribed. For aggressive conditions like RA, this delay has clinical consequences — not just logistical ones.

**Why denials are not the end:**
60% of PA denials are never appealed. Of those that are, 40–60% get overturned. Most patients don't know they have the right to appeal, or that their doctor can request a direct peer-to-peer call with the insurance company's medical reviewer.

**What a Letter of Medical Necessity is:**
Not the same as a prescription. The prescription says what the doctor wants. The Letter of Medical Necessity says why — with clinical specifics, evidence, and a direct argument against the denial criteria.

**What to document as a patient:**
Every reference number. Every date. Every name of who you spoke to at the insurance company. That paper trail is your protection if anything is disputed.

---

## Reading Experience

Messages are revealed one at a time. After each message, a small "Continue" control appears beneath it — tap it to bring in the next line. The feed scrolls just enough to keep the newest message in view, instead of jumping straight to the bottom of a long scene.

This was a deliberate design correction: the first version auto-cascaded every message in a scene on a fixed timer, which moved faster than most people could actually read and made it easy to lose your place. The reader-paced version puts control back where it belongs — with the person reading.

---

## Technical Details

- **Single HTML file** — HTML, CSS, Vanilla JavaScript. No external CSS framework
- **No backend, no database, no framework dependency**
- **Append-only chat feed** — every message is built with `createElement + appendChild`. `innerHTML` is never called on the chat container, per spec
- **Reader-paced reveal** — each scene's messages are shown one at a time via a Promise chain, advancing only when the reader taps Continue
- **Narrators and doctors** — rendered as centered amber italic cards, never as chat bubbles
- **2 choices per scene** — each choice triggers additional dialogue before unlocking the next scene
- **Progress bar** — tracks position across all 8 scenes
- **StarCare Health** — used as an illustrative payer example throughout. The PA process described applies across most major US insurers

---

## Real-World Data Referenced

- AMA 2023 Prior Authorization Physician Survey
- US Senate Permanent Subcommittee on Investigations — UnitedHealthcare AI Denial Report, 2023
- KFF Health Policy Prior Authorization Report, 2023
- The GOLD CARD Act (pending legislation)
- Improving Seniors' Timely Access to Care Act

---

## How to Run

Open `PAStorySimulator_Day27.html` in any modern browser. No install, no build step, no server required.

Live demo: [link]

---

## Part of a Larger Series

This is Day 27 of a 60-day public building challenge. Day 26 was PriorRight — a drag-and-drop workflow simulator that lets you experience the broken PA system and then run the same case through an ideal system side by side.

Both projects came from the same starting question: *Prior Authorization causes documented, measurable harm to real people. What can I build that makes that visible?* Day 26 answered it at the systems level. Day 27 answers it at the level of a single human being trying to get medication.

---

*PA Story Simulator is an educational tool. It does not provide medical or legal advice. If you receive a PA denial, you have the right to appeal. Contact your state insurance commissioner for a free External Independent Review.*
