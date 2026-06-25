# AI Job Post Red Flag Detector

**ABTalks 60-Day Claude AI Mastery Challenge — Day 14**
Built by [Deborah Olofin](https://linkedin.com/in/deborah-olofin) · Data Scientist & ML Engineer · Lagos, Nigeria

---

## Overview

This project documents a structured prompt system that uses Claude to analyze job postings and company information for red flags before a job seeker submits an application. It was developed as part of the ABTalks AI Mastery Challenge (Day 14) and applied as a real-world case study to a live job post from Remote Haven.

The detector surfaces risks across five categories: requirements, workplace culture, remote job authenticity, hiring transparency, and company legitimacy. It outputs a scored risk report, a breakdown table, a final verdict, and five smart interview questions tailored to the identified risks.

---

## Case Study: Remote Haven — Data Scientist Role

A job post for multiple data roles (Data Analyst, Data Entry Specialist, Data Engineer, Data Scientist, Database Administrator, Data Migration Analyst) was posted on X (Twitter) by @BenoHr80463 on June 15, 2026, directing applicants to send a CV, cover letter, LinkedIn profile, phone number, and video introduction to info@remote-haven.com.

Remote Haven is a Nigerian outsourcing company (DANFAL LTD) that claims UK incorporation with registration number 8720755. A Companies House lookup revealed that this number belongs to an unrelated entity — First Securities Group Magna Limited — raising serious legitimacy concerns.

### Risk Score: 68 / 100

| Category | Risk Level | Score |
|---|---|---|
| Company trust | Critical | 85/100 |
| Hiring clarity | High | 72/100 |
| Data privacy | Medium | 60/100 |
| Requirements | Low | 30/100 |
| Culture signals | Low | 20/100 |
| Remote validity | Low | 25/100 |

### Top Red Flags

1. **[9/10] Fraudulent UK registration number** — Companies House shows reg. 8720755 belongs to a completely different company. DANFAL LTD does not exist under this number.
2. **[8/10] No salary information** — No salary range or compensation structure disclosed anywhere in the post or on the company website.
3. **[8/10] High-volume personal data collection before verification** — Applicants are asked for CV, cover letter, LinkedIn, phone number, and a video introduction before the company's legal identity is established.
4. **[7/10] Six roles, zero individual job descriptions** — No seniority levels, requirements, or role-specific details provided.
5. **[7/10] No third-party reviews or verified placements** — Zero Trustpilot, Glassdoor, or Google reviews. Company appears to have launched late 2025.
6. **[6/10] CEO not verifiable on LinkedIn** — Daniel Falomo HRCI has no findable LinkedIn profile connected to Remote Haven.
7. **[5/10] Unverified third-party job poster** — The post originated from a generic X handle with no company affiliation tag.

### Positive Signals

- No fees from job seekers (B2B revenue model — businesses pay, not candidates)
- CFO Yetunde Oludare (AAT, ACA) has a verifiable LinkedIn profile linked from the company website
- Legitimate industry sector (Nigerian talent outsourcing to Western companies)
- Active social presence across LinkedIn, Instagram, YouTube, and TikTok
- Real Lagos phone number and Ikeja address

### Verdict

**Apply with caution — verify first.** This is not a classic scam (no upfront fees), but the fraudulent company registration number is a serious credibility gap that cannot be dismissed. The data privacy risk is real: the personal data package requested matches patterns associated with identity theft schemes. Do not submit application materials until the registration discrepancy is resolved and the CEO's identity is independently verified.

### Recommended Pre-Application Questions

1. *Registration*: "Your website lists DANFAL LTD with UK reg. 8720755. Companies House shows that number belongs to a different company. Can you clarify?"
2. *Compensation*: "What is the salary range for the Data Scientist role, and in which currency is compensation paid?"
3. *Track record*: "Can you share profiles of data professionals you have placed? I'd like to understand client profiles and typical timelines."
4. *Data handling*: "What is your data retention and privacy policy for candidate information submitted during the application process?"
5. *Placement continuity*: "If a client engagement ends, do you actively re-place the talent or is the contract terminated?"

---

## The Prompt System

### Input structure

```
You are an AI Red Flag Detector for job seekers.
Analyze the Job Description and Company Information.
Identify:

1. Unrealistic Requirements
   - Excessive experience for the role
   - Too many skills/responsibilities
   - Contradictory expectations

2. Toxic Workplace Signals
   - Burnout indicators
   - 'Wear many hats' / 'rockstar' / 'hustle culture'
   - Poor work-life balance signals

3. Remote Job Authenticity
   - Hidden office requirements
   - Relocation expectations
   - Misleading remote claims

4. Hiring Risks
   - Missing salary information
   - Vague responsibilities
   - Excessive qualifications
   - Suspicious hiring practices

5. Company Risks
   - Reputation concerns
   - Stability concerns
   - Growth or layoff indicators

Output:
## Overall Risk Score (0-100)
### Top Red Flags [severity 1-10 each]
### Positive Signals
### Risk Breakdown Table
### Final Verdict [Apply / Apply with Caution / Avoid]
### 5 Smart Interview Questions

Job Description: [paste]
Company Information: [paste]
```

### Supplementing with company research

For best results, pre-research the company before running the prompt and include findings in the `Company Information` field. Sources to check:

- Companies House (UK) / CAC (Nigeria) for registration verification
- LinkedIn for leadership profiles
- Trustpilot, Glassdoor, Google Reviews for reputation signals
- Wayback Machine / domain age check for company longevity
- Social media for active presence vs. ghost accounts

---

## Files in This Repository

| File | Description |
|---|---|
| `README.md` | This file — project documentation and case study |
| `remote_haven_analysis.pdf` | Full PDF analysis report for the Remote Haven case study |
| `remote_haven_analysis.png` | LinkedIn infographic summary of the analysis |

---

## Key Takeaway

Fake and misleading job posts are a real risk for Nigerian job seekers targeting remote international roles. The volume of personal data typically requested (CV, video, phone number, LinkedIn) creates significant exposure when submitted to unverified companies. This detector provides a structured, repeatable way to vet opportunities before committing personal data or time.

---

## About This Challenge

The ABTalks 60-Day Claude AI Mastery Challenge is a structured daily project series designed to build practical AI skills through real-world tasks. Each day focuses on a distinct use case. Day 14 focused on building and applying an AI-powered job post red flag detector.

**Analyst:** Deborah Olofin
**Role:** Data Scientist & ML Engineer
**Location:** Lagos, Nigeria
**Links:** [LinkedIn](https://linkedin.com/in/deborah-olofin) · [GitHub](https://github.com/Mi-kami) · [Portfolio](https://mi-kami.github.io)
