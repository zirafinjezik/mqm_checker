import { SEVERITIES } from "../data/taxonomy.js";

export function penaltyOf(severity) {
  return SEVERITIES.find(s => s.label === severity)?.points ?? 0;
}

export function totalPenalty(errors) {
  return errors.reduce((sum, e) => sum + penaltyOf(e.severity), 0);
}

export function calcScore(errors, wordCount) {
  if (wordCount === 0) return 100;
  return Math.round(Math.max(0, 100 - (totalPenalty(errors) / wordCount) * 100) * 100) / 100;
}

// MQM normalized penalty total per 1000 words.
export function penaltyPer1000(errors, wordCount) {
  if (wordCount === 0) return null;
  return Math.round((totalPenalty(errors) / wordCount) * 1000 * 10) / 10;
}
