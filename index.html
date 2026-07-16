import { describe, it, expect } from "vitest";
import { buildSummaryData, buildErrorData } from "./report.js";
import { CATEGORIES } from "../data/taxonomy.js";

const meta = { project: "P", langPair: "EN>HR", reviewer: "N", file: "ui.xlsx" };
const errors = [
  { source: "s", target: "t", revised: "r", category: "Accuracy", subcategory: "Omission", severity: "Major", comment: "c" },
  { source: "s2", target: "t2", revised: "r2", category: "Accuracy", subcategory: "Addition", severity: "Neutral", comment: "" },
];

describe("buildSummaryData", () => {
  const rows = buildSummaryData({ meta, errors, wordCount: 500, score: 99, pass: true, threshold: 98, date: "01/01/2026" });

  it("has one row per category plus header rows and total", () => {
    expect(rows.length).toBe(7 + 1 + Object.keys(CATEGORIES).length + 1);
  });

  it("no undefined cells in the meta block (the old export crash)", () => {
    for (const row of rows.slice(0, 6)) {
      for (const cell of row) expect(cell).not.toBe(undefined);
    }
  });

  it("category row counts severities and penalty", () => {
    const acc = rows.find(r => r[0] === "Accuracy");
    expect(acc).toEqual(["Accuracy", 0, 1, 0, 1, 2, 5]);
  });

  it("total row sums everything", () => {
    const total = rows[rows.length - 1];
    expect(total).toEqual(["Total", 0, 1, 0, 1, 2, 5]);
  });
});

describe("buildErrorData", () => {
  it("header plus one row per error, penalty resolved", () => {
    const rows = buildErrorData(errors);
    expect(rows.length).toBe(3);
    expect(rows[1]).toEqual([1, "s", "t", "r", "Accuracy", "Omission", "Major", 5, "c"]);
    expect(rows[2][7]).toBe(0);
  });
});
