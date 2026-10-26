/**
 * South African tax figures used for learning. These are the SARS figures for
 * the 2025/26 tax year (1 March 2025 – 28 February 2026). Tax tables change
 * every year in the Budget Speech – always check www.sars.gov.za before you
 * file a real return.
 */
export const TAX_YEAR = "2025/26";

/** Income tax brackets for individuals: [from, to, base tax, rate]. */
export const BRACKETS: { from: number; to: number; base: number; rate: number }[] = [
  { from: 0, to: 237_100, base: 0, rate: 0.18 },
  { from: 237_100, to: 370_500, base: 42_678, rate: 0.26 },
  { from: 370_500, to: 512_800, base: 77_362, rate: 0.31 },
  { from: 512_800, to: 673_000, base: 121_475, rate: 0.36 },
  { from: 673_000, to: 857_900, base: 179_147, rate: 0.39 },
  { from: 857_900, to: 1_817_000, base: 251_258, rate: 0.41 },
  { from: 1_817_000, to: Infinity, base: 644_489, rate: 0.45 },
];

export const REBATES = { primary: 17_235, secondary: 9_444, tertiary: 3_145 } as const;

/** You pay no income tax below these annual incomes. */
export const THRESHOLDS = { under65: 95_750, from65: 148_217, from75: 165_689 } as const;

/** Medical scheme fees tax credit per month. */
export const MEDICAL_CREDIT = { first: 364, second: 364, additional: 246 } as const;

/** UIF: 1 % from the employee and 1 % from the employer, on earnings up to R17 712 a month. */
export const UIF = { rate: 0.01, ceilingMonthly: 17_712 } as const;
/** Skills Development Levy: 1 % of payroll, paid by employers with a payroll above R500 000 a year. */
export const SDL_RATE = 0.01;

/** Retirement fund contributions are deductible up to 27,5 % of income, capped at R350 000 a year. */
export const RETIREMENT_DEDUCTION = { rate: 0.275, cap: 350_000 } as const;

/** Tax-free savings account limits. */
export const TFSA = { annual: 36_000, lifetime: 500_000 } as const;

/** Standard VAT rate. */
export const VAT_RATE = 0.15;

export function bracketFor(taxable: number) {
  return BRACKETS.find((b) => taxable <= b.to) ?? BRACKETS[BRACKETS.length - 1];
}

/** Tax on taxable income before rebates. */
export function taxBeforeRebates(taxable: number): number {
  if (taxable <= 0) return 0;
  const b = bracketFor(taxable);
  return b.base + (taxable - b.from) * b.rate;
}

export function rebateFor(age: number): number {
  return REBATES.primary + (age >= 65 ? REBATES.secondary : 0) + (age >= 75 ? REBATES.tertiary : 0);
}

/** Annual medical tax credit for a number of people on the medical aid (main member counts). */
export function medicalCredit(members: number, months = 12): number {
  if (members <= 0) return 0;
  const perMonth = MEDICAL_CREDIT.first + (members >= 2 ? MEDICAL_CREDIT.second : 0) + Math.max(0, members - 2) * MEDICAL_CREDIT.additional;
  return perMonth * months;
}

export interface TaxResult {
  gross: number;
  retirementDeduction: number;
  taxable: number;
  beforeRebates: number;
  rebate: number;
  medical: number;
  payable: number;
  effectiveRate: number;
  marginalRate: number;
}

/** Annual income tax for an individual (simplified: salary income, retirement deduction, rebates, medical credits). */
export function incomeTax({ income, age = 30, retirement = 0, medicalMembers = 0 }: { income: number; age?: number; retirement?: number; medicalMembers?: number }): TaxResult {
  const retirementDeduction = Math.min(retirement, RETIREMENT_DEDUCTION.rate * income, RETIREMENT_DEDUCTION.cap);
  const taxable = Math.max(0, income - retirementDeduction);
  const beforeRebates = taxBeforeRebates(taxable);
  const rebate = Math.min(rebateFor(age), beforeRebates);
  const afterRebate = beforeRebates - rebate;
  const medical = Math.min(medicalCredit(medicalMembers), afterRebate);
  const payable = Math.max(0, afterRebate - medical);
  return {
    gross: income,
    retirementDeduction,
    taxable,
    beforeRebates,
    rebate,
    medical,
    payable,
    effectiveRate: income > 0 ? payable / income : 0,
    marginalRate: taxable > 0 ? bracketFor(taxable).rate : 0,
  };
}

/** Monthly PAYE estimate: annualise the monthly salary, work out the annual tax, divide by 12. */
export function monthlyPaye(monthlyTaxable: number, age = 30, medicalMembers = 0): number {
  const annual = incomeTax({ income: monthlyTaxable * 12, age, medicalMembers }).payable;
  return Math.round((annual / 12) * 100) / 100;
}

/** Employee UIF for a month (1 % up to the ceiling). */
export function uif(monthlyGross: number): number {
  return Math.round(Math.min(monthlyGross, UIF.ceilingMonthly) * UIF.rate * 100) / 100;
}
