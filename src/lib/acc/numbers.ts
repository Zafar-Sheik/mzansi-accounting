/** Number helpers shared by widgets, generators and tests. */

export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a || 1;
}

export function round(x: number, dp = 2): number {
  const f = 10 ** dp;
  return Math.round((x + Number.EPSILON * Math.sign(x)) * f) / f;
}

/** 12 345,67 – SA style: space thousands separators and a decimal comma (plain text). */
export function fmt(x: number, dp = 2): string {
  const [i, f] = Math.abs(round(x, dp)).toFixed(dp).split(".");
  const grouped = i.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${x < 0 ? "-" : ""}${grouped}${f ? `,${f}` : ""}`;
}

/**
 * A Rand amount for markdown text: R12 450 (whole rands) or R12 450,50.
 * Cents are shown only when there are any. Negative amounts are shown in brackets.
 */
export function R(x: number): string {
  const r = round(x, 2);
  const whole = Number.isInteger(r);
  const body = `R${fmt(Math.abs(r), whole ? 0 : 2)}`;
  return r < 0 ? `(${body})` : body;
}

/** Trim trailing zeros: 2.50 → "2.5", 3.00 → "3". Plain JS number string (checker syntax). */
export function ans(x: number, dp = 2): string {
  return String(round(x, dp));
}

/** Percentage for text: 35,5% (dp decimals, trailing zeros trimmed). */
export function P(x: number, dp = 1): string {
  return `${String(round(x, dp)).replace(".", ",")}%`;
}

/** A plain decimal-comma number for text: 1,45. */
export function D(x: number, dp = 2): string {
  return String(round(x, dp)).replace(".", ",");
}

/**
 * A number for LaTeX with a decimal comma, e.g. 9.8 → "9{,}8", rounded to dp
 * decimals with trailing zeros removed, thousands separated by a thin space.
 */
export function tex(x: number, dp = 2): string {
  const r = round(x, dp);
  const [i, f] = String(Math.abs(r)).split(".");
  const grouped = i.replace(/\B(?=(\d{3})+(?!\d))/g, "\\,");
  return `${r < 0 ? "-" : ""}${grouped}${f ? `{,}${f}` : ""}`;
}

/** Signed term for building expressions: ` + 3`, ` - 2`, `` for 0. */
export function signed(v: number, suffix = ""): string {
  if (v === 0) return "";
  const body = Math.abs(v) === 1 && suffix ? suffix : `${Math.abs(v)}${suffix}`;
  return v < 0 ? ` - ${body}` : ` + ${body}`;
}
