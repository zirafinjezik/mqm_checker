# MQM Error Scorer

A lightweight web-based tool for Localization Quality Assurance (LQA) using the **Multidimensional Quality Metrics (MQM)** framework. Built for linguists, LQA reviewers, and localization project managers who need a fast, structured way to log translation errors, calculate quality scores, and generate professional LQA reports.

🔗 **Live demo:** [mqm-checker.vercel.app](https://mqm-checker.vercel.app)

## What it does

- **Log translation errors** with source segment, target (as received), and revised (correct) version
- **Categorize errors** using standard MQM taxonomy: Accuracy, Compliance, Language, Style, Terminology (with subcategories)
- **Assign severity levels** with weighted scoring: Critical (25 pts), Major (5 pts), Minor (1 pt)
- **Calculate quality scores** automatically based on error penalties relative to total word count
- **Pass/fail evaluation** against a configurable quality threshold (default: 98%)
- **Export to Excel (.xlsx)** with a Summary sheet and detailed Error Log, ready for client delivery or internal review

## Why this exists

Most LQA workflows still rely on manually formatted spreadsheets or expensive enterprise tools. This app provides a clean, purpose-built interface for MQM scoring that any linguist can use immediately, with no setup, no login, and no cost.

## MQM Error Categories

| Category     | Subcategories                                                        |
|-------------|----------------------------------------------------------------------|
| Accuracy     | Addition, Omission, Incorrect Meaning, Numbers                      |
| Compliance   | Glossary not used                                                    |
| Language     | Punctuation, Spelling/Typos, Grammar/Syntax                         |
| Style        | Wrong register, Inappropriate formality, Unidiomatic usage, Cultural reference not adapted |
| Terminology  | Inconsistent terminology                                             |

## Scoring

```
Quality Score = 100 - (Total Penalty Points / Word Count) × 100
```

- Critical error = 25 penalty points
- Major error = 5 penalty points
- Minor error = 1 penalty point
- Pass threshold: ≥ 98%

## Tech Stack

- React 18+
- Vite
- SheetJS (xlsx) for Excel export
- Deployed on Vercel

## Getting Started

```bash
git clone https://github.com/zirafinjezik/mqm-checker.git
cd mqm-checker
npm install
npm run dev
```

## Screenshot

<!-- Add a screenshot of the app here -->
<!-- ![MQM Error Scorer](./screenshot.png) -->

## Author

**Natalija Marić** -- Localization specialist and LQA reviewer with 13+ years of experience in game localization, technical translation, and quality assurance.

- 🦒 [Žirafin jezik j.d.o.o.](https://zirafinjezik.com)
- 💼 [LinkedIn](www.linkedin.com/in/natalija-maric-zirafinjezik)

## License

MIT
