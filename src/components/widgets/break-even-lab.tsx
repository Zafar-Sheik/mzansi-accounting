"use client";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceDot, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Explain, chartTick, kfmt, rand, Readouts, useToolUse } from "./sim-kit";
import { Slider, WidgetFrame } from "./widget-frame";

/** Break-even (cost–volume–profit) chart: where total revenue crosses total cost. */
export function BreakEvenLab({ title = "Break-even lab", product = "school jerseys" }: { title?: string; product?: string }) {
  const touch = useToolUse();
  const [fixed, setFixed] = useState(120_000);
  const [vc, setVc] = useState(90);
  const [price, setPrice] = useState(150);
  const [sold, setSold] = useState(2_800);
  const contribution = price - vc;
  const be = contribution > 0 ? fixed / contribution : Infinity;
  const maxUnits = Math.max(1000, Math.ceil(Math.max(sold, Number.isFinite(be) ? be : 0) * 1.5 / 500) * 500);
  const data = Array.from({ length: 11 }, (_, k) => {
    const u = (maxUnits / 10) * k;
    return { units: u, "Total revenue": u * price, "Total cost": fixed + u * vc, "Fixed cost": fixed };
  });
  const profit = sold * contribution - fixed;
  const safety = Number.isFinite(be) ? ((sold - be) / sold) * 100 : -100;
  const change = (f: (v: number) => void) => (v: number) => { f(v); touch(); };

  return (
    <WidgetFrame title={title} colour="var(--t-cost)" instruction={`You make ${product}. How many must you sell before you stop losing money?`}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-3">
          <Slider label="Fixed costs (rent, salaries, insurance)" value={fixed} min={10_000} max={400_000} step={5_000} onChange={change(setFixed)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Variable cost per unit (materials, labour)" value={vc} min={10} max={300} step={5} onChange={change(setVc)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Selling price per unit" value={price} min={20} max={400} step={5} onChange={change(setPrice)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Units actually sold" value={sold} min={0} max={10_000} step={100} onChange={change(setSold)} colour="var(--t-cost)" />
        </div>
        <div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid)" />
                <XAxis dataKey="units" type="number" domain={[0, maxUnits]} tick={chartTick} />
                <YAxis tick={chartTick} tickFormatter={kfmt} width={52} />
                <Tooltip formatter={(v) => rand(Number(v))} labelFormatter={(l) => `${Math.round(Number(l))} units`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line dataKey="Total revenue" stroke="var(--t-book)" strokeWidth={3} dot={false} isAnimationActive={false} />
                <Line dataKey="Total cost" stroke="var(--danger)" strokeWidth={3} dot={false} isAnimationActive={false} />
                <Line dataKey="Fixed cost" stroke="var(--curve-ghost)" strokeDasharray="5 5" dot={false} isAnimationActive={false} />
                <ReferenceLine x={sold} stroke="var(--t-cost)" strokeDasharray="4 4" label={{ value: "sold", fontSize: 10, fill: "var(--t-cost)" }} />
                {Number.isFinite(be) && be <= maxUnits && <ReferenceDot x={be} y={be * price} r={7} fill="var(--t-cost)" stroke="white" label={{ value: "break-even", position: "top", fontSize: 10 }} />}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Readouts colour="var(--t-cost)" items={[
            { label: "Contribution per unit", value: rand(contribution) },
            { label: "Break-even point", value: Number.isFinite(be) ? `${Math.ceil(be).toLocaleString("en-ZA")} units` : "never", highlight: true },
            { label: profit >= 0 ? "Net profit" : "Net loss", value: rand(Math.abs(profit)), highlight: true },
            { label: "Margin of safety", value: Number.isFinite(be) ? `${Math.round(safety)}%` : "–" },
          ]} />
        </div>
      </div>
      <Explain colour="var(--t-cost)">
        Break-even = fixed costs ÷ (selling price − variable cost per unit) = {rand(fixed)} ÷ {rand(contribution)}{Number.isFinite(be) ? ` = ${Math.ceil(be).toLocaleString("en-ZA")} units` : " – you can never break even if each unit costs more to make than you sell it for!"}. Every unit sold above that adds {rand(contribution)} profit. {sold < be ? "You are below break-even: the gap between the lines is your loss." : "You are above break-even – the gap between revenue and cost is profit."}
      </Explain>
    </WidgetFrame>
  );
}
