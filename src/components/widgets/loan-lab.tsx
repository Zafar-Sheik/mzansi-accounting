"use client";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Explain, chartTick, kfmt, rand, Readouts, useToolUse } from "./sim-kit";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

/** Instalment for a loan: P·i / (1 − (1+i)^−n). */
export function instalment(principal: number, annualRate: number, months: number) {
  const i = annualRate / 1200;
  if (i === 0) return principal / months;
  return (principal * i) / (1 - (1 + i) ** -months);
}

/** Loans and credit cards: what you really pay, and the minimum-payment trap. */
export function LoanLab({ title = "Credit & loan lab", mode: initial = "loan" }: { title?: string; mode?: "loan" | "card" }) {
  const touch = useToolUse();
  const [mode, setMode] = useState<"loan" | "card">(initial);
  const [amount, setAmount] = useState(20_000);
  const [rate, setRate] = useState(24);
  const [months, setMonths] = useState(36);
  const [fee, setFee] = useState(69);
  const [minPct, setMinPct] = useState(3);
  const [fixed, setFixed] = useState(1_500);

  const inst = instalment(amount, rate, months) + fee;
  const totalLoan = inst * months;

  // credit card: minimum payment vs fixed payment
  const simulate = (pay: (bal: number) => number) => {
    let bal = amount;
    let paid = 0;
    const path: number[] = [bal];
    let m = 0;
    while (bal > 0.5 && m < 600) {
      bal = bal * (1 + rate / 1200) + fee;
      const p = Math.min(bal, pay(bal));
      bal -= p;
      paid += p;
      m++;
      if (m % 3 === 0) path.push(Math.max(0, bal));
    }
    return { months: m, paid, path, stuck: m >= 600 };
  };
  const minPlan = simulate((b) => Math.max(b * (minPct / 100), 150));
  const fixedPlan = simulate(() => fixed);
  const len = Math.max(minPlan.path.length, fixedPlan.path.length);
  const data = Array.from({ length: Math.min(len, 160) }, (_, k) => ({ month: k * 3, "Minimum payment": minPlan.path[k] ?? 0, [`Fixed ${rand(fixed)}`]: fixedPlan.path[k] ?? 0 }));

  const loanData = (() => {
    let bal = amount;
    const i = rate / 1200;
    const base = instalment(amount, rate, months);
    return Array.from({ length: months + 1 }, (_, m) => {
      const row = { month: m, Balance: Math.max(0, bal) };
      bal = bal * (1 + i) - base;
      return row;
    }).filter((_, m) => m % Math.max(1, Math.round(months / 40)) === 0 || m === months);
  })();
  const change = (f: (v: number) => void) => (v: number) => { f(v); touch(); };

  return (
    <WidgetFrame title={title} colour="var(--t-life)" instruction="Credit is not free money – it is future-you paying for present-you, plus interest. Play with the numbers.">
      <Segmented colour="var(--t-life)" value={mode} onChange={(m) => { setMode(m); touch(); }} options={[{ id: "loan", label: "🏦 Personal loan / car finance" }, { id: "card", label: "💳 Credit card or store card" }]} />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-3">
          <Slider label={mode === "loan" ? "Amount borrowed" : "Card balance"} value={amount} min={1_000} max={300_000} step={1_000} onChange={change(setAmount)} format={(v) => rand(v)} colour="var(--t-life)" />
          <Slider label="Interest rate (% per year)" value={rate} min={0} max={30} step={0.25} onChange={change(setRate)} format={(v) => `${String(v).replace(".", ",")}%`} colour="var(--t-life)" />
          <Slider label="Monthly service fee" value={fee} min={0} max={100} onChange={change(setFee)} format={(v) => rand(v)} colour="var(--t-life)" />
          {mode === "loan" ? (
            <Slider label="Term (months)" value={months} min={6} max={84} step={6} onChange={change(setMonths)} colour="var(--t-life)" />
          ) : (
            <>
              <Slider label="Minimum payment (% of balance)" value={minPct} min={2} max={10} step={0.5} onChange={change(setMinPct)} format={(v) => `${String(v).replace(".", ",")}%`} colour="var(--t-life)" />
              <Slider label="…or a fixed payment of" value={fixed} min={200} max={10_000} step={100} onChange={change(setFixed)} format={(v) => rand(v)} colour="var(--t-life)" />
            </>
          )}
        </div>
        <div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              {mode === "loan" ? (
                <LineChart data={loanData} margin={{ left: 4, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid)" />
                  <XAxis dataKey="month" tick={chartTick} />
                  <YAxis tick={chartTick} tickFormatter={kfmt} width={52} />
                  <Tooltip formatter={(v) => rand(Number(v))} labelFormatter={(l) => `Month ${l}`} />
                  <Line type="monotone" dataKey="Balance" stroke="var(--t-life)" strokeWidth={3} dot={false} isAnimationActive={false} />
                </LineChart>
              ) : (
                <LineChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid)" />
                  <XAxis dataKey="month" tick={chartTick} />
                  <YAxis tick={chartTick} tickFormatter={kfmt} width={52} />
                  <Tooltip formatter={(v) => rand(Number(v))} labelFormatter={(l) => `Month ${l}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="Minimum payment" stroke="var(--danger)" strokeWidth={3} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey={`Fixed ${rand(fixed)}`} stroke="var(--t-book)" strokeWidth={3} dot={false} isAnimationActive={false} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
          {mode === "loan" ? (
            <Readouts colour="var(--t-life)" items={[{ label: "Monthly instalment", value: rand(inst, 2), highlight: true }, { label: "Total you repay", value: rand(totalLoan) }, { label: "Cost of credit", value: rand(totalLoan - amount) }]} />
          ) : (
            <Readouts colour="var(--t-life)" items={[
              { label: "Minimum only: time to pay off", value: minPlan.stuck ? "50+ years" : `${Math.floor(minPlan.months / 12)} y ${minPlan.months % 12} m`, highlight: true },
              { label: "Minimum only: total paid", value: rand(minPlan.paid) },
              { label: `Fixed ${rand(fixed)}: time`, value: fixedPlan.stuck ? "never!" : `${Math.floor(fixedPlan.months / 12)} y ${fixedPlan.months % 12} m` },
              { label: `Fixed ${rand(fixed)}: total paid`, value: rand(fixedPlan.paid) },
            ]} />
          )}
        </div>
      </div>
      <Explain colour="var(--t-life)">
        {mode === "loan"
          ? <>Borrowing {rand(amount)} costs you <strong>{rand(totalLoan - amount)}</strong> extra ({Math.round(((totalLoan - amount) / amount) * 100)}% of what you borrowed). A longer term makes the instalment smaller but the total cost bigger. Under the National Credit Act a lender must check that you can afford the instalment.</>
          : <>Paying only the minimum keeps you in debt for <strong>{minPlan.stuck ? "the rest of your life" : `${Math.ceil(minPlan.months / 12)} years`}</strong> because most of each payment is interest. A fixed payment that stays the same as the balance shrinks kills the debt much faster.{fixedPlan.stuck && " Your fixed payment is too small to cover the interest and fees – the debt never shrinks!"}</>}
      </Explain>
    </WidgetFrame>
  );
}
