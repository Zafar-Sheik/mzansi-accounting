"use client";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Explain, chartTick, kfmt, NumberField, rand, Readouts, useToolUse } from "./sim-kit";
import { Slider, WidgetFrame } from "./widget-frame";

/** Straight-line vs diminishing-balance depreciation, with a disposal (profit or loss on sale). */
export function DepreciationLab({ title = "Depreciation & disposal lab", asset = "Delivery vehicle" }: { title?: string; asset?: string }) {
  const touch = useToolUse();
  const [cost, setCost] = useState(300_000);
  const [rate, setRate] = useState(20);
  const [years, setYears] = useState(6);
  const [sellYear, setSellYear] = useState(3);
  const [price, setPrice] = useState(150_000);

  const rows = Array.from({ length: years + 1 }, (_, y) => {
    const sl = Math.max(0, cost - cost * (rate / 100) * y);
    const db = cost * (1 - rate / 100) ** y;
    return { year: y, "Straight-line": Math.round(sl), "Diminishing balance": Math.round(db) };
  });
  const sold = rows[Math.min(sellYear, years)];
  const plSL = price - sold["Straight-line"];
  const plDB = price - sold["Diminishing balance"];
  const change = (f: (v: number) => void) => (v: number) => { f(v); touch(); };

  return (
    <WidgetFrame title={title} colour="var(--t-control)" instruction="Assets wear out. Compare the two CAPS methods, then sell the asset and see if you make a profit or a loss.">
      <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <div className="space-y-3">
          <NumberField label={`${asset}: cost price`} value={cost} onChange={change(setCost)} step={5_000} colour="var(--t-control)" />
          <Slider label="Depreciation rate (% p.a.)" value={rate} min={5} max={40} step={5} onChange={change(setRate)} format={(v) => `${v}%`} colour="var(--t-control)" />
          <Slider label="Years to show" value={years} min={2} max={10} onChange={change(setYears)} colour="var(--t-control)" />
          <Slider label="Sell at the end of year" value={Math.min(sellYear, years)} min={1} max={years} onChange={change(setSellYear)} colour="var(--t-control)" />
          <NumberField label="Selling price" value={price} onChange={change(setPrice)} step={5_000} colour="var(--t-control)" />
        </div>
        <div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rows} margin={{ left: 4, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid)" />
                <XAxis dataKey="year" tick={chartTick} label={{ value: "years", position: "insideBottomRight", offset: -2, fontSize: 10 }} />
                <YAxis tick={chartTick} tickFormatter={kfmt} width={52} />
                <Tooltip formatter={(v) => rand(Number(v))} labelFormatter={(l) => `End of year ${l}`} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <ReferenceLine x={Math.min(sellYear, years)} stroke="var(--t-tax)" strokeDasharray="4 4" label={{ value: "sold", fontSize: 10, fill: "var(--t-tax)" }} />
                <ReferenceLine y={price} stroke="var(--curve-ghost)" strokeDasharray="2 4" />
                <Line type="linear" dataKey="Straight-line" stroke="var(--t-control)" strokeWidth={3} isAnimationActive={false} />
                <Line type="monotone" dataKey="Diminishing balance" stroke="var(--t-report)" strokeWidth={3} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <Readouts colour="var(--t-control)" items={[
            { label: "Year-1 depreciation (SL)", value: rand(cost * rate / 100) },
            { label: "Year-1 depreciation (DB)", value: rand(cost * rate / 100) },
            { label: `Year-2 depreciation (DB)`, value: rand(cost * (1 - rate / 100) * rate / 100) },
            { label: "Carrying value when sold (SL)", value: rand(sold["Straight-line"]) },
            { label: plSL >= 0 ? "Profit on sale (SL)" : "Loss on sale (SL)", value: rand(Math.abs(plSL)), highlight: true },
            { label: plDB >= 0 ? "Profit on sale (DB)" : "Loss on sale (DB)", value: rand(Math.abs(plDB)), highlight: true },
          ]} />
        </div>
      </div>
      <Explain colour="var(--t-control)">
        <strong>Straight-line</strong>: the same amount every year (cost × rate) – a straight line down to zero. <strong>Diminishing balance</strong>: rate × carrying value, so it falls fast at first and never quite reaches zero. Carrying value = cost − accumulated depreciation. On disposal: selling price − carrying value = profit (if positive) or loss. In the Asset Disposal account you transfer the cost (debit) and accumulated depreciation (credit) and the selling price (credit).
      </Explain>
    </WidgetFrame>
  );
}
