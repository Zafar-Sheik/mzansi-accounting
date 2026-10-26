"use client";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Explain, chartTick, kfmt, rand, Readouts, useToolUse } from "./sim-kit";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

/** Compound growth: savings (money working for you) vs debt (money working against you), plus "start at 20 vs 30". */
export function CompoundLab({ title = "Compound interest lab", mode: initial = "save" }: { title?: string; mode?: "save" | "early" }) {
  const touch = useToolUse();
  const [mode, setMode] = useState<"save" | "early">(initial);
  const [start, setStart] = useState(5_000);
  const [monthly, setMonthly] = useState(500);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);
  const [inflation, setInflation] = useState(5);

  const series = (delay: number) => {
    const out: number[] = [];
    let bal = delay ? 0 : start;
    for (let m = 0; m <= years * 12; m++) {
      if (m % 12 === 0) out.push(bal);
      if (m / 12 >= delay) bal = bal * (1 + rate / 1200) + monthly;
    }
    return out;
  };
  const main = series(0);
  const late = series(10);
  const data = main.map((v, y) => {
    const paid = start + monthly * 12 * y;
    return { year: y, "You paid in": paid, Interest: Math.max(0, v - paid), total: v, late: late[y], real: v / (1 + inflation / 100) ** y };
  });
  const end = data[data.length - 1];
  const change = (f: (v: number) => void) => (v: number) => { f(v); touch(); };

  return (
    <WidgetFrame title={title} colour="var(--t-life)" instruction="Interest earns interest. Slide the numbers and watch the 'interest' area grow faster every year.">
      <Segmented colour="var(--t-life)" value={mode} onChange={(m) => { setMode(m); touch(); }} options={[{ id: "save", label: "📈 Grow my savings" }, { id: "early", label: "⏰ Start now vs in 10 years" }]} />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-3">
          <Slider label="Starting amount" value={start} min={0} max={100_000} step={500} onChange={change(setStart)} format={(v) => rand(v)} colour="var(--t-life)" />
          <Slider label="Added every month" value={monthly} min={0} max={10_000} step={50} onChange={change(setMonthly)} format={(v) => rand(v)} colour="var(--t-life)" />
          <Slider label="Growth rate (% per year)" value={rate} min={0} max={15} step={0.5} onChange={change(setRate)} format={(v) => `${String(v).replace(".", ",")}%`} colour="var(--t-life)" />
          <Slider label="Years" value={years} min={1} max={45} onChange={change(setYears)} colour="var(--t-life)" />
          <Slider label="Inflation (% per year)" value={inflation} min={0} max={10} step={0.5} onChange={change(setInflation)} format={(v) => `${String(v).replace(".", ",")}%`} colour="var(--t-life)" />
        </div>
        <div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid)" />
                <XAxis dataKey="year" tick={chartTick} />
                <YAxis tick={chartTick} tickFormatter={kfmt} width={52} />
                <Tooltip formatter={(v, n) => [rand(Number(v)), n === "late" ? "Start 10 years later" : n === "real" ? "In today's money" : n]} labelFormatter={(l) => `Year ${l}`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {mode === "save" ? (
                  <>
                    <Area type="monotone" dataKey="You paid in" stackId="1" stroke="var(--t-report)" fill="var(--t-report)" fillOpacity={0.5} isAnimationActive={false} />
                    <Area type="monotone" dataKey="Interest" stackId="1" stroke="var(--t-life)" fill="var(--t-life)" fillOpacity={0.6} isAnimationActive={false} />
                  </>
                ) : (
                  <>
                    <Area type="monotone" dataKey="total" name="Start now" stroke="var(--t-life)" fill="var(--t-life)" fillOpacity={0.35} isAnimationActive={false} />
                    <Area type="monotone" dataKey="late" name="Start in 10 years" stroke="var(--t-tax)" fill="var(--t-tax)" fillOpacity={0.35} isAnimationActive={false} />
                  </>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <Readouts colour="var(--t-life)" items={[
            { label: "You paid in", value: rand(end["You paid in"]) },
            { label: "Interest earned", value: rand(end.Interest), highlight: true },
            { label: "Final balance", value: rand(end["You paid in"] + end.Interest) },
            { label: "In today's money", value: rand(end.real) },
            ...(mode === "early" ? [{ label: "If you wait 10 years", value: rand(end.late) }] : []),
          ]} />
        </div>
      </div>
      <Explain colour="var(--t-life)">
        {mode === "save"
          ? <>After {years} years, <strong>{Math.round((end.Interest / Math.max(1, end["You paid in"] + end.Interest)) * 100)}%</strong> of your money is interest you never had to work for. The same maths works <em>against</em> you on a credit card at 20%+ – that is why you pay off debt before you invest.</>
          : <>Waiting 10 years costs you <strong>{rand(end["You paid in"] + end.Interest - end.late)}</strong>. Time in the market beats almost everything else – start small, but start now.</>}
        {" "}Inflation of {inflation}% means a rand buys less every year: your final balance is worth only {rand(end.real)} in today&apos;s money.
      </Explain>
    </WidgetFrame>
  );
}
