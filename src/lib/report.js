import { CATEGORIES, SEVERITIES } from "../data/taxonomy.js";
import { penaltyOf, totalPenalty } from "./scoring.js";

const COUNTED = SEVERITIES.filter(s => s.points > 0);

export function buildSummaryData({ meta, errors, wordCount, score, pass, threshold, date }) {
  const header = COUNTED.map(s => `${s.label} (${s.points}pts)`);
  return [
    ["LQA REPORT"],
    ["Project", meta.project, "", "Date", date],
    ["Language Pair", meta.langPair, "", "Reviewer", meta.reviewer],
    ["File", meta.file, "", "Word Count", wordCount],
    ["Threshold", `${threshold}%`, "", "Result", pass ? "PASS" : "FAIL"],
    ["Quality Score", score],
    [],
    ["Category", ...header, "Neutral", "Total Errors", "Total Penalty"],
    ...Object.keys(CATEGORIES).map(cat => {
      const inCat = errors.filter(e => e.category === cat);
      const counts = COUNTED.map(s => inCat.filter(e => e.severity === s.label).length);
      const neutral = inCat.filter(e => e.severity === "Neutral").length;
      return [cat, ...counts, neutral, inCat.length, totalPenalty(inCat)];
    }),
    ["Total",
      ...COUNTED.map(s => errors.filter(e => e.severity === s.label).length),
      errors.filter(e => e.severity === "Neutral").length,
      errors.length,
      totalPenalty(errors),
    ],
  ];
}

export function buildErrorData(errors) {
  return [
    ["#", "Source", "Target (as received)", "Revised (correct)", "Category", "Subcategory", "Severity", "Penalty", "Comment"],
    ...errors.map((e, i) => [
      i + 1, e.source, e.target, e.revised, e.category, e.subcategory, e.severity, penaltyOf(e.severity), e.comment,
    ]),
  ];
}
