# MQM Error Scorer

A lightweight web-based tool for Localization Quality Assurance (LQA) using the Multidimensional Quality Metrics (MQM) framework. Built for linguists, LQA reviewers, and localization project managers who need a fast, structured way to log translation errors, calculate quality scores, and generate professional LQA reports.

**Live demo:** [mqm.zirafinjezik.hr](https://mqm.zirafinjezik.hr)

**Repository:** [github.com/zirafinjezik/mqm_checker](https://github.com/zirafinjezik/mqm_checker)

---

## Screenshot
<img width="2512" height="1336" alt="mqm" src="https://github.com/user-attachments/assets/a5588c80-efb6-4b73-b0a6-bd033e735319" />



## What It Does

- Log translation errors with source segment, target (as received), and revised (correct) version
- Categorize errors using the official MQM CORE typology: 7 dimensions plus Custom, each with standard subcategories
- Assign severity levels with weighted scoring: Critical (25 pts), Major (5 pts), Minor (1 pt), Neutral (0 pts, for preferential comments)
- Calculate quality scores automatically based on error penalties relative to total word count
- Penalty per 1000 words (normalized penalty total) alongside the quality score
- Pass/fail evaluation against a configurable quality threshold (default: 98%)
- Session autosave: logged errors and project info survive a page refresh (localStorage)
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

## MQM CORE Typology

| Dimension | Subcategories |
|---|---|
| Terminology | Inconsistent with terminology resource, Inconsistent use of terminology, Wrong term |
| Accuracy | Mistranslation, Overtranslation, Undertranslation, Addition, Omission, Do not translate, Untranslated |
| Linguistic conventions | Grammar, Punctuation, Spelling, Unintelligible, Character encoding, Textual conventions |
| Style | Organization style, Third-party style, Inconsistent with external reference, Language register, Awkward style, Unidiomatic style, Inconsistent style |
| Locale conventions | Number, Currency, Measurement, Time, Date, Address, Telephone format, Shortcut key |
| Audience appropriateness | Culture-specific reference, Offensive |
| Design and markup | Layout, Markup tag, Truncation/text expansion, Missing text, Link/cross-reference |
| Custom | Other |

Typology adapted from the [MQM CORE typology](https://themqm.org/the-mqm-typology/) (CC BY 4.0).

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
| Neutral | 0 |

Default pass threshold: **≥ 98%**

---

## Tech Stack

- React 19
- Vite
- SheetJS (xlsx) for Excel export
- Vitest (scoring and report builders are covered by unit tests)
- Deployed on Vercel

---

## Getting Started

```bash
git clone https://github.com/zirafinjezik/mqm_checker.git
cd mqm_checker
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Part of the LQA Lifecycle Tools

This tool is part of a set of three open-source LQA tools built around the full quality assurance lifecycle:

| Tool | Purpose | Link |
|---|---|---|
| **MQM Error Scorer** | Log errors, score quality, export reports | [mqm.zirafinjezik.hr](https://mqm.zirafinjezik.hr) |
| **LQA Checker** | Review and flag LQA issues | [lqa.zirafinjezik.hr](https://lqa.zirafinjezik.hr) |
| **LQA Challenge** | Practice and train LQA skills | [game.zirafinjezik.hr](https://game.zirafinjezik.hr) |

---

## Author

**Natalija Marić** – Localization Engineer and LQA specialist with 14+ years of experience in game localization, technical translation, and quality assurance.

- 🦒 [Žirafin jezik j.d.o.o.](https://zirafinjezik.hr)
- 💼 [LinkedIn](https://www.linkedin.com/in/natalija-maric-zirafinjezik)

---

## Privacy

All processing happens in your browser. Segments and error logs are handled by JavaScript on your machine and are never uploaded or transmitted; session autosave uses your browser's localStorage only. For confidential content you can also run the tool offline: clone the repo and run it locally. Hosting (Vercel) logs standard access data such as IP addresses, never content.

## License

MIT
