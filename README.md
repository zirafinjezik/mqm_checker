# MQM Error Scorer

A lightweight web-based tool for Localization Quality Assurance (LQA) using the Multidimensional Quality Metrics (MQM) framework. Built for linguists, LQA reviewers, and localization project managers who need a fast, structured way to log translation errors, calculate quality scores, and generate professional LQA reports.

**Live demo:** [mqm-checker.vercel.app](https://mqm-checker.vercel.app)

**Repository:** [github.com/zirafinjezik/mqm-checker](https://github.com/zirafinjezik/mqm-checker)

---

## Screenshot
<img width="2512" height="1336" alt="mqm" src="https://github.com/user-attachments/assets/a5588c80-efb6-4b73-b0a6-bd033e735319" />



## What It Does

- Log translation errors with source segment, target (as received), and revised (correct) version
- Categorize errors using standard MQM taxonomy: Accuracy, Compliance, Language, Style, Terminology (with subcategories)
- Assign severity levels with weighted scoring: Critical (25 pts), Major (5 pts), Minor (1 pt)
- Calculate quality scores automatically based on error penalties relative to total word count
- Pass/fail evaluation against a configurable quality threshold (default: 98%)
- Export to Excel (.xlsx) with a Summary sheet and detailed Error Log, ready for client delivery or internal review

---

## Use Cases

**Freelance LQA reviewer**
You receive a 500-word translated game UI batch. You open the tool, enter the word count, log each error with segment context and severity, and export a clean Excel report to send to the client or PM – no spreadsheet setup required.

**Localization project manager**
You need to compare LQA scores across multiple linguists or language pairs on the same project. Each reviewer uses the same tool and threshold, producing consistent, comparable reports.

**Game localization QA**
You are reviewing in-game strings for a Steam release. You log terminology inconsistencies, register errors, and punctuation issues by MQM category, generate a pass/fail score, and attach the Excel export to your Jira ticket.

**LQA training and onboarding**
You are onboarding a junior reviewer. The tool enforces MQM taxonomy and scoring methodology, ensuring consistent error classification from day one without requiring knowledge of enterprise LQA platforms.

---

## Why This Exists

Most LQA workflows still rely on manually formatted spreadsheets or expensive enterprise tools. This app provides a clean, purpose-built interface for MQM scoring that any linguist can use immediately – no setup, no login, no cost.

---

## MQM Error Categories

| Category | Subcategories |
|---|---|
| Accuracy | Addition, Omission, Incorrect Meaning, Numbers |
| Compliance | Glossary not used |
| Language | Punctuation, Spelling/Typos, Grammar/Syntax |
| Style | Wrong register, Inappropriate formality, Unidiomatic usage, Cultural reference not adapted |
| Terminology | Inconsistent terminology |

---

## Scoring

```
Quality Score = 100 - (Total Penalty Points / Word Count) × 100
```

| Severity | Penalty Points |
|---|---|
| Critical | 25 |
| Major | 5 |
| Minor | 1 |

Default pass threshold: **≥ 98%**

---

## Tech Stack

- React 18+
- Vite
- SheetJS (xlsx) for Excel export
- Deployed on Vercel

---

## Getting Started

```bash
git clone https://github.com/zirafinjezik/mqm-checker.git
cd mqm-checker
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Part of the LQA Lifecycle Tools

This tool is part of a set of three open-source LQA tools built around the full quality assurance lifecycle:

| Tool | Purpose | Link |
|---|---|---|
| **MQM Error Scorer** | Log errors, score quality, export reports | [mqm-checker.vercel.app](https://mqm-checker.vercel.app) |
| **LQA Checker** | Review and flag LQA issues | [lqa-checker-s7wi.vercel.app](https://lqa-checker-s7wi.vercel.app) |
| **LQA Challenge** | Practice and train LQA skills | [lqa-game.vercel.app](https://lqa-game.vercel.app) |

---

## Author

**Natalija Marić** – Localization Engineer and LQA specialist with 14+ years of experience in game localization, technical translation, and quality assurance.

- 🦒 [Žirafin jezik j.d.o.o.](https://zirafinjezik.hr)
- 💼 [LinkedIn](https://www.linkedin.com/in/natalija-maric-zirafinjezik)

---

## License

MIT
