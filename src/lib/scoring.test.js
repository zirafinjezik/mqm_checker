import { describe, it, expect } from "vitest";
import { calcScore, totalPenalty, penaltyPer1000, penaltyOf } from "./scoring.js";

const e = severity => ({ severity });

describe("scoring", () => {
  it("severity weights: 25/5/1/0", () => {
    expect(penaltyOf("Critical")).toBe(25);
    expect(penaltyOf("Major")).toBe(5);
    expect(penaltyOf("Minor")).toBe(1);
    expect(penaltyOf("Neutral")).toBe(0);
  });

  it("unknown severity contributes 0", () => {
    expect(totalPenalty([e("Blocker")])).toBe(0);
  });

  it("score formula: 100 - penalty/words*100, 2 decimals", () => {
    expect(calcScore([e("Major"), e("Minor")], 500)).toBe(98.8);
  });

  it("neutral errors never lower the score", () => {
    expect(calcScore([e("Neutral"), e("Neutral")], 100)).toBe(100);
  });

  it("word count 0 returns 100 instead of dividing by zero", () => {
    expect(calcScore([e("Critical")], 0)).toBe(100);
  });

  it("score clamps at 0", () => {
    expect(calcScore(Array(10).fill(e("Critical")), 50)).toBe(0);
  });

  it("penalty per 1000 words", () => {
    expect(penaltyPer1000([e("Major")], 500)).toBe(10);
    expect(penaltyPer1000([e("Minor")], 3000)).toBe(0.3);
    expect(penaltyPer1000([e("Minor")], 0)).toBe(null);
  });
});
