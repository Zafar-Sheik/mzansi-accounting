import type { AnswerKind, PracticeProblem } from "@/content/types";
import { evaluate, type Node, parse, ParseError, variablesIn, walk } from "./expr";
import { seededRandom } from "@/lib/utils";

export interface CheckResult {
  ok: boolean;
  /** Friendly feedback ("Check your unit prefixes", "You found 1 of 2 answers"…). */
  message?: string;
  /** Could not read the input at all. */
  unreadable?: boolean;
}

type Spec = Pick<PracticeProblem, "answer" | "kind" | "tol" | "rtol" | "vars" | "form">;

/** Accounting must balance: by default an answer must be right to the cent (with a hair of room for big amounts). */
export const DEFAULT_RTOL = 0.00005;
export const DEFAULT_ABS_TOL = 0.011;

/** Guess the answer kind from the memo answer when a problem doesn't say. */
export function inferKind(answer: string): AnswerKind {
  const a = answer.trim();
  if (/\s\|\s/.test(a)) return "text";
  if (/^\(.*\)$/.test(a) && /[;,]/.test(a)) return "point";
  if (/;|\bor\b/.test(a)) return "set";
  const letters = a.replace(/sqrt|cbrt|pi|sin|cos|tan|log|ln|abs/gi, "").replace(/^[a-zA-Z]\s*=/, "").replace(/\d[eE][-+]?\d/g, "");
  if (/[a-zA-Z]/.test(letters)) return "expr";
  return "number";
}

const FN_WORD = /^(sqrt|cbrt|pi|sin|cos|tan|log|ln|abs)/i;
const NUMERIC = /[\d\s.+\-*/^()√π×·∙−–⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/;

/** Cut a trailing unit or direction off a number: "9,8 m·s⁻² downwards" → "9,8". */
export function stripUnit(s: string): string {
  let i = 0;
  while (i < s.length) {
    const fn = FN_WORD.exec(s.slice(i));
    if (fn) {
      i += fn[0].length;
      continue;
    }
    if (!NUMERIC.test(s[i])) break;
    i++;
  }
  return s.slice(0, i).replace(/[\s*/^·×∙(]+$/, "").trim();
}

/**
 * Strip what learners naturally add around a number: "v =", "R", "%", units,
 * spaces in 12 345, decimal commas, and "× 10^" / "x 10^" / "e" in scientific notation.
 */
export function cleanNumber(s: string): string {
  let t = s.trim();
  // Accountants show negatives in brackets: (R5 000) means -5000.
  const bracketed = /^\(\s*R?\s*[\d\s  .,]+\)$/i.exec(t);
  if (bracketed) t = `-${t.slice(1, -1)}`;
  t = t.replace(/^[^=]*=\s*/, "");
  t = t.replace(/^-\s*R\s*(?=\d)/i, "-");
  t = t.replace(/^R\s*(?=\d)/i, "");
  t = t.replace(/(\d)[\s  ]+(?=\d{3}\b)/g, "$1");
  t = t.replace(/(\d),(\d)/g, "$1.$2");
  t = t.replace(/(\d|\))\s*[xX]\s*(?=10)/g, "$1*");
  t = t.replace(/(\d|\.)[eE]([-+]?\d+)(?![a-zA-Z])/g, "$1*10^($2)");
  t = t.replace(/%\s*$/, "");
  return stripUnit(t);
}

function num(s: string): { v: number; tree: Node } {
  const tree = parse(cleanNumber(s));
  return { v: evaluate(tree), tree };
}

function splitSet(s: string): string[] {
  let parts = s.split(/;|\bor\b|\band\b|\|/i);
  if (parts.length === 1 && /,\s/.test(s)) parts = s.split(/,\s*/);
  parts = parts.flatMap((x) => (/±|\+-|\+\/-/.test(x) ? [x.replace(/±|\+-|\+\/-/, "+"), x.replace(/±|\+-|\+\/-/, "-")] : [x]));
  return parts.map((x) => x.trim()).filter(Boolean);
}

/** An ordered list such as balancing coefficients: "2; 1; 2", "2:1:2", "2, 1, 2" or "2 1 2". */
function splitList(s: string): string[] {
  const t = s.trim();
  const parts = /[;:]/.test(t) ? t.split(/[;:]/) : /,\s/.test(t) || /^\d+(,\d+)+$/.test(t) ? t.split(/,/) : t.split(/\s+/);
  return parts.map((x) => x.trim()).filter(Boolean);
}

function splitPoint(s: string): string[] {
  const inner = s.trim().replace(/^\(/, "").replace(/\)$/, "");
  if (inner.includes(";")) return inner.split(";");
  const parts = inner.split(",");
  return parts.length === 2 ? parts : [inner];
}

const SUB: Record<string, string> = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9", "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁺": "+", "⁻": "-" };

/** Words and names: case, spaces and hyphens don't matter ("2-methyl propane" = "2-methylpropane"). */
export function normaliseText(s: string): string {
  return s
    .toLowerCase()
    .replace(/[₀-₉⁰-⁹⁺⁻¹²³]/g, (c) => SUB[c] ?? c)
    .replace(/[−–—]/g, "-")
    .replace(/[\s\-_.'’]/g, "")
    .trim();
}

/** Chemical formulae: case matters (Co ≠ CO), spaces and sub/superscript styles don't. */
export function normaliseFormula(s: string): string {
  return s
    .replace(/[₀-₉⁰-⁹⁺⁻¹²³]/g, (c) => SUB[c] ?? c)
    .replace(/[−–—]/g, "-")
    .replace(/[\s_{}^]/g, "")
    .replace(/\(aq\)|\(s\)|\(l\)|\(g\)/g, "")
    .trim();
}

const alternatives = (answer: string) => answer.split(/\s\|\s/).map((a) => a.trim()).filter(Boolean);

function closeTo(a: number, b: number, spec: Spec) {
  if (spec.tol !== undefined) return Math.abs(a - b) <= spec.tol;
  if (spec.rtol !== undefined) return Math.abs(a - b) <= Math.max(spec.rtol * Math.abs(b), 1e-12);
  return Math.abs(a - b) <= Math.max(DEFAULT_RTOL * Math.abs(b), DEFAULT_ABS_TOL);
}

function isSquareFree(n: number) {
  for (let k = 2; k * k <= n; k++) if (n % (k * k) === 0) return false;
  return true;
}

function formProblem(tree: Node, form: Spec["form"]): string | null {
  if (!form) return null;
  let problem: string | null = null;
  walk(tree, (n) => {
    if (n.k === "fn" && n.f === "sqrt" && n.a.k === "num" && Number.isInteger(n.a.v)) {
      if (n.a.v > 1 && !isSquareFree(n.a.v)) problem = `√${n.a.v} can still be simplified – look for a square factor.`;
    }
  });
  return problem;
}

/** Accounting-flavoured hints for a number that is wrong in a recognisable way. */
function diagnose(got: number, want: number, spec: Spec): string | undefined {
  if (want === 0 || !Number.isFinite(got)) return undefined;
  if (closeTo(-got, want, spec)) return "Right amount, wrong direction – is it a profit or a loss, an increase or a decrease, a debit or a credit?";
  const ratio = got / want;
  const near = (k: number) => Math.abs(ratio / k - 1) < 0.004;
  if (near(1.15) || near(1 / 1.15)) return "Out by exactly 15 % – check whether the amount should include or exclude VAT. (Exclusive × 115/100 = inclusive; inclusive × 15/115 = the VAT.)";
  if (near(100) || near(0.01)) return "Out by a factor of 100 – a percentage vs a decimal? 35 % is 0,35 in a calculation but you write 35 in the answer.";
  if (near(12) || near(1 / 12)) return "Out by a factor of 12 – monthly vs yearly? Check the period the question asks for.";
  if (near(1000) || near(0.001)) return "Out by a factor of 1 000 – check your zeros (thousands).";
  if (Math.abs(want) !== 1 && Math.abs(got * want - 1) < 0.02) return "Looks like the ratio is upside down – check which figure goes on top.";
  if (Math.abs(Math.abs(ratio) - 1) < 0.02) return "Very close! Check your rounding – keep the cents until the end, and round only the final answer.";
  return undefined;
}

/** Check a typed answer against a memo answer. Never throws. */
export function checkAnswer(input: string, spec: Spec): CheckResult {
  const kind = spec.kind ?? inferKind(spec.answer);
  if (!input.trim()) return { ok: false, unreadable: true, message: "Type an answer first." };
  try {
    if (kind === "text") {
      const got = normaliseText(input);
      if (alternatives(spec.answer).some((a) => normaliseText(a) === got)) return { ok: true };
      return { ok: false };
    }

    if (kind === "formula") {
      const got = normaliseFormula(input);
      const alts = alternatives(spec.answer).map(normaliseFormula);
      if (alts.includes(got)) return { ok: true };
      if (alts.some((a) => a.toLowerCase() === got.toLowerCase())) return { ok: false, message: "Nearly – check your capital letters. Element symbols start with a capital (Co is cobalt, CO is carbon monoxide)." };
      return { ok: false };
    }

    if (kind === "number") {
      const a = num(spec.answer).v;
      const u = num(input);
      if (!Number.isFinite(u.v)) return { ok: false, message: "That works out to something undefined – check for dividing by 0." };
      if (closeTo(u.v, a, spec)) {
        const f = formProblem(u.tree, spec.form);
        return f ? { ok: false, message: `Right value, wrong form: ${f}` } : { ok: true };
      }
      return { ok: false, message: diagnose(u.v, a, spec) };
    }

    if (kind === "list") {
      const want = splitList(spec.answer).map((x) => num(x).v);
      const got = splitList(input).map((x) => num(x).v);
      if (got.length !== want.length) return { ok: false, message: `Give ${want.length} numbers in order, separated by “;”.` };
      const hits = got.filter((g, i) => closeTo(g, want[i], spec)).length;
      if (hits === want.length) return { ok: true };
      // 4; 2; 4 for 2; 1; 2 – right ratio, not the lowest whole numbers.
      const k = got[0] / want[0];
      if (Number.isFinite(k) && k > 1 && got.every((g, i) => Math.abs(g - k * want[i]) < 1e-9)) return { ok: false, message: "Right ratio – now use the smallest whole numbers (divide them all by the same number)." };
      return { ok: false, message: hits ? `${hits} of ${want.length} in the right place.` : undefined };
    }

    if (kind === "set") {
      const want = splitSet(spec.answer).map((x) => num(x).v).sort((x, y) => x - y);
      const got = splitSet(input).map((x) => num(x).v).sort((x, y) => x - y);
      const used = new Set<number>();
      let hits = 0;
      for (const g of got) {
        const k = want.findIndex((w, i) => !used.has(i) && closeTo(g, w, spec));
        if (k >= 0) {
          used.add(k);
          hits++;
        }
      }
      if (hits === want.length && got.length === want.length) return { ok: true };
      if (got.length < want.length && hits === got.length) return { ok: false, message: `So far so good – you found ${hits} of ${want.length}. Separate answers with “;” or “or”.` };
      return { ok: false, message: hits ? `${hits} of ${want.length} correct.` : undefined };
    }

    if (kind === "point") {
      const want = splitPoint(spec.answer).map((x) => num(x).v);
      const got = splitPoint(input).map((x) => num(x).v);
      if (got.length !== want.length) return { ok: false, message: `Give a coordinate like (2; -3).` };
      if (got.every((g, i) => closeTo(g, want[i], spec))) return { ok: true };
      return { ok: false, message: got.some((g, i) => closeTo(g, want[i], spec)) ? "One coordinate is right." : undefined };
    }

    // expr: compare the two expressions at random points
    const vars = spec.vars ?? ["x"];
    const rhs = (s: string) => s.replace(/^.*=\s*/, "").replace(/(\d),(\d)/g, "$1.$2");
    const a = parse(rhs(spec.answer), vars);
    const u = parse(rhs(input), vars);
    const extra = variablesIn(u).filter((v) => !vars.includes(v));
    if (extra.length) return { ok: false, message: `Use only ${vars.join(", ")} in your answer.` };
    const rnd = seededRandom(spec.answer);
    let tested = 0;
    for (let k = 0; k < 40 && tested < 8; k++) {
      const scope = Object.fromEntries(vars.map((v) => [v, Math.round((rnd() * 8 - 3.7) * 1000) / 1000 || 0.37]));
      const av = evaluate(a, scope);
      if (!Number.isFinite(av)) continue;
      const uv = evaluate(u, scope);
      tested++;
      if (!Number.isFinite(uv) || Math.abs(uv - av) > 1e-7 * Math.max(1, Math.abs(av))) return { ok: false };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, unreadable: true, message: e instanceof ParseError ? e.message : "I couldn't read that – check the brackets and symbols." };
  }
}
