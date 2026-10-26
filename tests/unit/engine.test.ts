import { describe, expect, it } from "vitest";
import katex from "katex";
import { checkAnswer, cleanNumber } from "@/lib/acc/check";
import { GENERATORS } from "@/lib/acc/generators";
import { R } from "@/lib/acc/numbers";
import { incomeTax, medicalCredit, monthlyPaye, taxBeforeRebates, uif } from "@/lib/acc/tax";
import { instalment } from "@/components/widgets/loan-lab";

const texOk = (md: string) => {
  const parts = [...md.matchAll(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g)].map((m) => m[1] ?? m[2]);
  for (const t of parts) katex.renderToString(t, { throwOnError: true, strict: false });
};

describe("answer checker", () => {
  it("reads rands, spaces, decimal commas, percentages and brackets", () => {
    expect(cleanNumber("R12 450")).toBe("12450");
    expect(cleanNumber("R12 450,50")).toBe("12450.50");
    expect(checkAnswer("R12 450", { answer: "12450" }).ok).toBe(true);
    expect(checkAnswer("12450.00", { answer: "12450" }).ok).toBe(true);
    expect(checkAnswer("R 1 234 567,89", { answer: "1234567.89" }).ok).toBe(true);
    expect(checkAnswer("(R5 000)", { answer: "-5000" }).ok).toBe(true);
    expect(checkAnswer("-R5 000", { answer: "-5000" }).ok).toBe(true);
    expect(checkAnswer("35,5%", { answer: "35.5" }).ok).toBe(true);
    expect(checkAnswer("1,45 : 1", { answer: "1.45" }).ok).toBe(true);
    expect(checkAnswer("x = 300", { answer: "300" }).ok).toBe(true);
  });
  it("is exact to the cent by default", () => {
    expect(checkAnswer("12450", { answer: "12450" }).ok).toBe(true);
    expect(checkAnswer("12451", { answer: "12450" }).ok).toBe(false);
    expect(checkAnswer("177.12", { answer: "177.12" }).ok).toBe(true);
    expect(checkAnswer("177.1", { answer: "177.12" }).ok).toBe(false);
    expect(checkAnswer("33.3", { answer: "33.33", tol: 0.06 }).ok).toBe(true);
  });
  it("gives accounting-specific feedback", () => {
    expect(checkAnswer("-1200", { answer: "1200" }).message).toMatch(/direction/);
    expect(checkAnswer("1150", { answer: "1000" }).message).toMatch(/VAT/);
    expect(checkAnswer("0.355", { answer: "35.5" }).message).toMatch(/percentage/);
    expect(checkAnswer("120000", { answer: "10000" }).message).toMatch(/monthly/);
    expect(checkAnswer("0.5", { answer: "2" }).message).toMatch(/upside down/);
  });
  it("checks text and lists", () => {
    expect(checkAnswer("creditors control", { answer: "Creditors control | Creditors", kind: "text" }).ok).toBe(true);
    expect(checkAnswer("CPJ", { answer: "CPJ | Cash Payments Journal", kind: "text" }).ok).toBe(true);
    expect(checkAnswer("cash payments journal", { answer: "CPJ | Cash Payments Journal", kind: "text" }).ok).toBe(true);
    expect(checkAnswer("3:2", { answer: "3; 2", kind: "list" }).ok).toBe(true);
  });
  it("formats rands SA style", () => {
    expect(R(12450)).toBe("R12 450");
    expect(R(1234.5)).toBe("R1 234,50");
    expect(R(-5000)).toBe("(R5 000)");
  });
});

describe("tax engine (SARS 2025/26)", () => {
  it("applies the brackets", () => {
    expect(taxBeforeRebates(237_100)).toBeCloseTo(42_678, 2);
    expect(taxBeforeRebates(370_500)).toBeCloseTo(77_362, 2);
    expect(taxBeforeRebates(512_800)).toBeCloseTo(121_475, 2);
    expect(taxBeforeRebates(673_000)).toBeCloseTo(179_147, 2);
    expect(taxBeforeRebates(857_900)).toBeCloseTo(251_258, 2);
    expect(taxBeforeRebates(1_817_000)).toBeCloseTo(644_489, 2);
  });
  it("applies rebates, thresholds and credits", () => {
    expect(incomeTax({ income: 95_750 }).payable).toBeCloseTo(0, 2);
    expect(incomeTax({ income: 300_000 }).payable).toBeCloseTo(41_797, 2);
    expect(incomeTax({ income: 148_000, age: 66 }).payable).toBe(0);
    expect(medicalCredit(3)).toBe(11_688);
    expect(incomeTax({ income: 500_000, retirement: 200_000 }).retirementDeduction).toBe(137_500);
    expect(uif(30_000)).toBeCloseTo(177.12, 2);
    expect(uif(10_000)).toBe(100);
    expect(monthlyPaye(25_000)).toBeCloseTo(incomeTax({ income: 300_000 }).payable / 12, 2);
  });
  it("calculates loan instalments", () => {
    expect(instalment(200_000, 12, 72)).toBeCloseTo(3_910, 0);
    expect(instalment(12_000, 0, 12)).toBe(1_000);
  });
});

describe("generators", () => {
  it.each(GENERATORS.map((g) => [g.id, g] as const))("%s: memo passes its own checker and renders", (_id, g) => {
    for (let s = 0; s < 150; s++) {
      const p = g.make(s * 7919 + 13);
      expect(checkAnswer(p.answer.split(" | ")[0], p).ok, `${g.id} seed ${s}: ${p.q} → ${p.answer}`).toBe(true);
      texOk(p.q);
      texOk(p.solution);
      if (p.hint) texOk(p.hint);
      expect(p.solution).not.toMatch(/NaN(?![A-Z])|undefined|Infinity/);
      expect(p.q).not.toMatch(/NaN(?![A-Z])|undefined|Infinity/);
    }
  });
});
