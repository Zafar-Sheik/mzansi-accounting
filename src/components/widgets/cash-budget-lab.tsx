"use client";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { cn } from "@/lib/utils";
import { Explain, chartTick, kfmt, rand, useToolUse } from "./sim-kit";
import { Slider, WidgetFrame } from "./widget-frame";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const BASE_SALES = [80_000, 90_000, 120_000, 100_000, 140_000, 160_000];

/** A six-month cash budget: credit sales collected over time, payments, and the bank balance each month. */
export function CashBudgetLab({ title = "Cash budget lab" }: { title?: string }) {
  const touch = useToolUse();
  const [opening, setOpening] = useState(20_000);
  const [cashPct, setCashPct] = useState(40);
  const [same, setSame] = useState(30);
  const [next, setNext] = useState(50);
  const [growth, setGrowth] = useState(0);
  const [cosPct, setCosPct] = useState(60);
  const [fixed, setFixed] = useState(30_000);
  const [loanMonth, setLoanMonth] = useState(0);
  const sales = BASE_SALES.map((s) => Math.round(s * (1 + growth / 100)));
  const prior = 70_000; // December credit sales
  const third = Math.max(0, 100 - same - next);
  let bal = opening;
  const rows = sales.map((s, m) => {
    const credit = s * (1 - cashPct / 100);
    const prevCredit = m === 0 ? prior * (1 - cashPct / 100) : sales[m - 1] * (1 - cashPct / 100);
    const prev2 = m <= 1 ? prior * (1 - cashPct / 100) : sales[m - 2] * (1 - cashPct / 100);
    const receipts = s * (cashPct / 100) + credit * (same / 100) + prevCredit * (next / 100) + (m >= 1 ? prev2 * (third / 100) : 0);
    const purchases = (m < 5 ? sales[m + 1] : s) * (cosPct / 100); // buy next month's stock
    const loan = loanMonth === m + 1 ? 60_000 : 0;
    const payments = purchases + fixed;
    const open = bal;
    bal = bal + receipts + loan - payments;
    return { month: MONTHS[m], open, receipts: Math.round(receipts + loan), payments: Math.round(payments), close: Math.round(bal) };
  });
  const lowest = Math.min(...rows.map((r) => r.close));
  const change = (f: (v: number) => void) => (v: number) => { f(v); touch(); };

  return (
    <WidgetFrame title={title} colour="var(--t-cost)" instruction="Profit is not cash! Change how fast customers pay and watch the bank balance. Can you stay out of overdraft?">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-2.5">
          <Slider label="Bank balance on 1 January" value={opening} min={-20_000} max={80_000} step={1_000} onChange={change(setOpening)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Cash sales (% of sales)" value={cashPct} min={0} max={100} step={5} onChange={change(setCashPct)} format={(v) => `${v}%`} colour="var(--t-cost)" />
          <Slider label="Credit debtors who pay in the month of sale" value={same} min={0} max={100 - next} step={5} onChange={change(setSame)} format={(v) => `${v}%`} colour="var(--t-cost)" />
          <Slider label="…pay the next month" value={next} min={0} max={100 - same} step={5} onChange={change(setNext)} format={(v) => `${v}%`} colour="var(--t-cost)" />
          <p className="text-xs text-muted">…the other {third}% pay in the third month.</p>
          <Slider label="Sales growth vs plan" value={growth} min={-30} max={30} step={5} onChange={change(setGrowth)} format={(v) => `${v > 0 ? "+" : ""}${v}%`} colour="var(--t-cost)" />
          <Slider label="Stock purchases (% of next month's sales)" value={cosPct} min={30} max={90} step={5} onChange={change(setCosPct)} format={(v) => `${v}%`} colour="var(--t-cost)" />
          <Slider label="Fixed payments each month (salaries, rent)" value={fixed} min={10_000} max={70_000} step={1_000} onChange={change(setFixed)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Take a R60 000 loan in month (0 = no loan)" value={loanMonth} min={0} max={6} onChange={change(setLoanMonth)} colour="var(--t-cost)" />
        </div>
        <div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows} margin={{ left: 4, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid)" />
                <XAxis dataKey="month" tick={chartTick} />
                <YAxis tick={chartTick} tickFormatter={kfmt} width={52} />
                <Tooltip formatter={(v) => rand(Number(v))} />
                <ReferenceLine y={0} stroke="var(--text-muted)" />
                <Bar dataKey="close" name="Closing bank balance" isAnimationActive={false} radius={[4, 4, 0, 0]}>{rows.map((r) => <Cell key={r.month} fill={r.close < 0 ? "var(--danger)" : "var(--t-book)"} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-xs">
              <thead><tr className="border-b border-line text-left text-muted"><th /> {rows.map((r) => <th key={r.month} className="text-right">{r.month}</th>)}</tr></thead>
              <tbody>
                <tr><td>Receipts</td>{rows.map((r) => <td key={r.month} className="text-right font-mono">{kfmt(r.receipts)}</td>)}</tr>
                <tr><td>Payments</td>{rows.map((r) => <td key={r.month} className="text-right font-mono">({kfmt(r.payments)})</td>)}</tr>
                <tr className="font-bold"><td>Closing bank</td>{rows.map((r) => <td key={r.month} className={cn("text-right font-mono", r.close < 0 && "text-danger")}>{r.close < 0 ? `(${kfmt(-r.close)})` : kfmt(r.close)}</td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Explain colour="var(--t-cost)">
        {lowest < 0 ? <>Danger: the bank goes into <strong>overdraft</strong> (lowest {rand(lowest)}). Options: collect from debtors faster, offer a discount for early payment, delay a payment, or arrange a loan/overdraft <em>before</em> you need it.</> : <>The bank never drops below {rand(lowest)} – the plan works.</>}{" "}A cash budget only shows <strong>cash</strong> items: depreciation and bad debts are never in a cash budget (no money moves), but a loan received is.
      </Explain>
    </WidgetFrame>
  );
}
