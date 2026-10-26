"use client";
import { useState } from "react";
import { BRACKETS, MEDICAL_CREDIT, REBATES, RETIREMENT_DEDUCTION, TAX_YEAR, TFSA, THRESHOLDS, UIF } from "@/lib/acc/tax";
import { rand } from "./sim-kit";
import { Segmented, WidgetFrame } from "./widget-frame";

type Tab = "ratios" | "formats" | "gaap" | "tax" | "life";

const RATIOS: [string, string, string][] = [
  ["Gross profit on sales", "Gross profit ÷ Sales × 100", "Profitability"],
  ["Gross profit on cost of sales (mark-up)", "Gross profit ÷ Cost of sales × 100", "Profitability"],
  ["Net profit on sales", "Net profit ÷ Sales × 100", "Profitability"],
  ["Operating expenses on sales", "Operating expenses ÷ Sales × 100", "Profitability"],
  ["Operating profit on sales", "Operating profit ÷ Sales × 100", "Profitability"],
  ["Current ratio", "Current assets : Current liabilities", "Liquidity"],
  ["Acid-test ratio", "(Current assets − Inventories) : Current liabilities", "Liquidity"],
  ["Stock-holding period", "Average inventories ÷ Cost of sales × 365", "Liquidity"],
  ["Stock turnover rate", "Cost of sales ÷ Average inventories", "Liquidity"],
  ["Debtors collection period", "Average debtors ÷ Credit sales × 365", "Liquidity"],
  ["Creditors payment period", "Average creditors ÷ Credit purchases × 365", "Liquidity"],
  ["Debt-equity ratio", "Non-current liabilities : Equity", "Solvency & risk"],
  ["Solvency ratio", "Total assets : Total liabilities", "Solvency & risk"],
  ["Return on equity (ROSHE)", "Net profit after tax ÷ Average equity × 100", "Returns"],
  ["Return on capital employed (ROTCE)", "Net profit before tax + interest on loans ÷ Average (equity + non-current liabilities) × 100", "Returns"],
  ["Earnings per share (EPS)", "Net profit after tax ÷ Weighted number of shares × 100 (cents)", "Shares"],
  ["Dividends per share (DPS)", "Total dividends ÷ Number of shares × 100 (cents)", "Shares"],
  ["Dividend pay-out rate", "DPS ÷ EPS × 100", "Shares"],
  ["Net asset value per share (NAV)", "Shareholders' equity ÷ Number of shares × 100 (cents)", "Shares"],
  ["Break-even point", "Fixed costs ÷ (Selling price per unit − Variable cost per unit)", "Cost accounting"],
  ["Prime cost", "Direct material cost + Direct labour cost", "Cost accounting"],
  ["Average = ", "(Opening + Closing) ÷ 2", "Tip"],
];

/** Formula sheet and reference card: ratios, statement formats, GAAP, SARS tables and life numbers. */
export function FormulaSheet({ title = "Accounting formula & reference sheet", tab: initial = "ratios" }: { title?: string; tab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initial);
  return (
    <WidgetFrame title={title} colour="var(--t-report)" instruction="Everything you need to look up – formulas, formats, principles and the SARS tables.">
      <Segmented colour="var(--t-report)" value={tab} onChange={setTab} options={[{ id: "ratios", label: "Ratios & formulas" }, { id: "formats", label: "Statement formats" }, { id: "gaap", label: "GAAP & concepts" }, { id: "tax", label: `SARS ${TAX_YEAR}` }, { id: "life", label: "Money Life numbers" }]} />
      <div className="mt-4 overflow-x-auto text-sm">
        {tab === "ratios" && (
          <table className="w-full">
            <thead><tr className="border-b border-line text-left text-xs text-muted"><th className="py-1">Ratio</th><th>Formula</th><th>Group</th></tr></thead>
            <tbody>{RATIOS.map(([n, f, g]) => <tr key={n} className="border-b border-line/50 align-top"><td className="py-1 pr-2 font-semibold">{n}</td><td className="pr-2 font-mono text-xs">{f}</td><td className="text-xs text-muted">{g}</td></tr>)}</tbody>
          </table>
        )}
        {tab === "formats" && (
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-line p-3 font-mono text-xs leading-relaxed">
              <div className="mb-1 font-display text-sm font-bold">Income Statement</div>
              Sales<br />− Cost of sales<br /><b>= Gross profit</b><br />+ Other operating income<br /><b>= Gross operating income</b><br />− Operating expenses<br /><b>= Operating profit (loss)</b><br />+ Interest income<br /><b>= Profit before interest expense</b><br />− Interest expense<br /><b>= Net profit before tax</b><br />− Income tax (companies)<br /><b>= Net profit after tax</b>
            </div>
            <div className="rounded-xl border border-line p-3 font-mono text-xs leading-relaxed">
              <div className="mb-1 font-display text-sm font-bold">Balance Sheet</div>
              <b>ASSETS</b><br />Non-current assets (fixed assets, fixed deposits &gt; 12 months)<br />Current assets (inventories, trade &amp; other receivables, cash &amp; cash equivalents)<br /><b>TOTAL ASSETS</b><br /><br /><b>EQUITY AND LIABILITIES</b><br />Owner&apos;s / shareholders&apos; equity<br />Non-current liabilities (loans)<br />Current liabilities (trade &amp; other payables, bank overdraft, current portion of loan)<br /><b>TOTAL EQUITY AND LIABILITIES</b>
            </div>
            <div className="rounded-xl border border-line p-3 font-mono text-xs leading-relaxed md:col-span-2">
              <div className="mb-1 font-display text-sm font-bold">Cash Flow Statement (companies)</div>
              Cash flows from operating activities (cash generated from operations, interest paid, income tax paid, dividends paid)<br />Cash flows from investing activities (buying/selling fixed assets, fixed deposits)<br />Cash flows from financing activities (shares issued/bought back, loans received/repaid)<br /><b>Net change in cash and cash equivalents</b> = closing − opening cash and cash equivalents
            </div>
          </div>
        )}
        {tab === "gaap" && (
          <ul className="grid gap-2 md:grid-cols-2">
            {[
              ["Business entity", "The business is separate from its owner – the owner's personal money is not the business's money."],
              ["Going concern", "We assume the business will carry on trading in the foreseeable future."],
              ["Historical cost", "Assets are recorded at their original cost price."],
              ["Matching", "Income and the expenses incurred to earn it are recorded in the same period (why we have accruals and prepayments)."],
              ["Prudence", "Don't overstate income or assets; don't understate expenses or liabilities (why we provide for bad debts)."],
              ["Materiality", "Show important amounts separately; small amounts can be grouped as 'sundry'."],
              ["Consistency", "Use the same methods each year so years can be compared."],
              ["Relevance & reliability", "Information must be useful to decision-makers and free from error and bias."],
              ["Realisation", "Income is recorded when it is earned, not necessarily when cash is received."],
              ["Double entry", "Every transaction affects at least two accounts: debits = credits."],
            ].map(([k, v]) => <li key={k} className="rounded-xl border border-line p-2"><strong>{k}</strong><br /><span className="text-xs text-muted">{v}</span></li>)}
          </ul>
        )}
        {tab === "tax" && (
          <div className="space-y-3">
            <table className="w-full">
              <caption className="mb-1 text-left text-xs text-muted">Individuals – tax year 1 March 2025 to 28 February 2026. Always check www.sars.gov.za for the current year.</caption>
              <thead><tr className="border-b border-line text-left text-xs text-muted"><th className="py-1">Taxable income</th><th>Rate of tax</th></tr></thead>
              <tbody>{BRACKETS.map((b, k) => <tr key={k} className="border-b border-line/50"><td className="py-1 font-mono">{rand(b.from + (k ? 1 : 0))} – {Number.isFinite(b.to) ? rand(b.to) : "and above"}</td><td className="font-mono">{b.base ? `${rand(b.base)} + ` : ""}{Math.round(b.rate * 100)}% of taxable income{b.from ? ` above ${rand(b.from)}` : ""}</td></tr>)}</tbody>
            </table>
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl bg-surface-2 p-2 text-xs"><strong>Rebates</strong><br />Primary {rand(REBATES.primary)}<br />Secondary (65+) {rand(REBATES.secondary)}<br />Tertiary (75+) {rand(REBATES.tertiary)}</div>
              <div className="rounded-xl bg-surface-2 p-2 text-xs"><strong>Tax thresholds</strong><br />Under 65: {rand(THRESHOLDS.under65)}<br />65 – 74: {rand(THRESHOLDS.from65)}<br />75+: {rand(THRESHOLDS.from75)}</div>
              <div className="rounded-xl bg-surface-2 p-2 text-xs"><strong>Medical tax credits (per month)</strong><br />Main member {rand(MEDICAL_CREDIT.first)}<br />First dependant {rand(MEDICAL_CREDIT.second)}<br />Each extra {rand(MEDICAL_CREDIT.additional)}</div>
              <div className="rounded-xl bg-surface-2 p-2 text-xs"><strong>UIF</strong><br />1% employee + 1% employer, on earnings up to {rand(UIF.ceilingMonthly)} a month</div>
              <div className="rounded-xl bg-surface-2 p-2 text-xs"><strong>Retirement contributions</strong><br />Deductible up to {Math.round(RETIREMENT_DEDUCTION.rate * 1000) / 10}% of income, max {rand(RETIREMENT_DEDUCTION.cap)} a year</div>
              <div className="rounded-xl bg-surface-2 p-2 text-xs"><strong>VAT &amp; companies</strong><br />VAT 15%<br />Company income tax 27%<br />Dividends tax 20%</div>
            </div>
          </div>
        )}
        {tab === "life" && (
          <ul className="grid gap-2 md:grid-cols-2">
            {[
              ["50/30/20 budget", "50% needs · 30% wants · 20% savings and paying off debt"],
              ["Emergency fund", "3–6 months of essential expenses, in an account you can reach quickly"],
              ["Tax-free savings account", `Up to ${rand(TFSA.annual)} a year, ${rand(TFSA.lifetime)} in your lifetime – growth is tax-free. Over-contributing costs a 40% penalty.`],
              ["Compound interest", "A = P(1 + i)ⁿ – monthly: use i ÷ 12 and n × 12"],
              ["Simple interest", "A = P(1 + in)"],
              ["Loan instalment", "P × i ÷ (1 − (1 + i)⁻ⁿ) with i the monthly rate"],
              ["Rule of 72", "72 ÷ interest rate ≈ years for money to double (at 8%: about 9 years)"],
              ["Credit score", "Pay on time, use less than 30% of your credit limit, don't apply for lots of credit at once"],
              ["Rent rule of thumb", "Keep rent below about 30% of your take-home pay"],
              ["Tax season", "Employees: usually July – October on SARS eFiling or the SARS MobiApp. Keep your IRP5, medical and RA certificates."],
            ].map(([k, v]) => <li key={k} className="rounded-xl border border-line p-2"><strong>{k}</strong><br /><span className="text-xs text-muted">{v}</span></li>)}
          </ul>
        )}
      </div>
    </WidgetFrame>
  );
}
