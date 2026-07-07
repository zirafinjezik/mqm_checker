// MQM CORE typology, adapted from themqm.org (CC BY 4.0).
export const CATEGORIES = {
  "Terminology": ["Inconsistent with terminology resource", "Inconsistent use of terminology", "Wrong term"],
  "Accuracy": ["Mistranslation", "Overtranslation", "Undertranslation", "Addition", "Omission", "Do not translate", "Untranslated"],
  "Linguistic conventions": ["Grammar", "Punctuation", "Spelling", "Unintelligible", "Character encoding", "Textual conventions"],
  "Style": ["Organization style", "Third-party style", "Inconsistent with external reference", "Language register", "Awkward style", "Unidiomatic style", "Inconsistent style"],
  "Locale conventions": ["Number format", "Currency format", "Measurement format", "Time format", "Date format", "Address format", "Telephone format", "Shortcut key"],
  "Audience appropriateness": ["Culture-specific reference", "Offensive"],
  "Design and markup": ["Layout", "Markup tag", "Truncation/text expansion", "Missing text", "Link/cross-reference"],
  "Custom": ["Other"],
};

export const SEVERITIES = [
  { label: "Critical", points: 25, color: "#e05c2a", bg: "rgba(224,92,42,0.12)" },
  { label: "Major", points: 5, color: "#e8a838", bg: "rgba(232,168,56,0.12)" },
  { label: "Minor", points: 1, color: "#c8b98a", bg: "rgba(200,185,138,0.12)" },
  { label: "Neutral", points: 0, color: "#9a8f78", bg: "rgba(154,143,120,0.12)" },
];

export const DEFAULT_THRESHOLD = 98;

export const categoryColors = {
  "Terminology": "#d4956a",
  "Accuracy": "#e05c2a",
  "Linguistic conventions": "#c8b98a",
  "Style": "#a0785a",
  "Locale conventions": "#e8a838",
  "Audience appropriateness": "#b8875a",
  "Design and markup": "#8a9a6a",
  "Custom": "#9a8f78",
};
