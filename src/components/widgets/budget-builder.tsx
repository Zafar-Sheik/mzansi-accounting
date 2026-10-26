"use client";
import { useEffect, useState } from "react";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { solvePuzzle } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Explain, chartTick, kfmt, rand, useToolUse } from "./sim-kit";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type Kind = "need" | "want" | "save";
interface Line { id: string; label: string; kind: Kind; value: number; max: number }

const PRESETS: Record<string, { income: number; lines: Line[] }> = {
  student: { income: 4_500, lines: [
    { id: "res", label: "Res / rent share", kind: "need", value: 1_500, max: 4_000 },
    { id: "transport", label: "Taxi / bus fare", kind: "need", value: 900, max: 3_000 },
    { id: "food", label: "Groceries", kind: "need", value: 1_000, max: 4_000 },
    { id: "data", label: "Data & airtime", kind: "need", value: 300, max: 1_000 },
    { id: "fun", label: "Going out & takeaways", kind: "want", value: 500, max: 2_000 },
    { id: "clothes", label: "Clothes & sneakers", kind: "want", value: 200, max: 2_000 },
    { id: "save", label: "Savings", kind: "save", value: 100, max: 2_000 },
  ] },
  first: { income: 14_000, lines: [
    { id: "rent", label: "Rent (bachelor flat)", kind: "need", value: 4_500, max: 10_000 },
    { id: "transport", label: "Transport", kind: "need", value: 1_400, max: 5_000 },
    { id: "food", label: "Groceries", kind: "need", value: 2_200, max: 6_000 },
    { id: "family", label: "Supporting family", kind: "need", value: 1_000, max: 5_000 },
    { id: "insurance", label: "Funeral & life cover", kind: "need", value: 300, max: 2_000 },
    { id: "data", label: "Phone contract & data", kind: "want", value: 600, max: 2_000 },
    { id: "fun", label: "Entertainment & eating out", kind: "want", value: 1_500, max: 5_000 },
    { id: "clothes", label: "Clothes & beauty", kind: "want", value: 800, max: 4_000 },
    { id: "save", label: "Emergency fund / TFSA", kind: "save", value: 1_200, max: 5_000 },
    { id: "debt", label: "Extra debt repayment", kind: "save", value: 500, max: 5_000 },
  ] },
  family: { income: 32_000, lines: [
    { id: "bond", label: "Home loan / rent", kind: "need", value: 9_000, max: 20_000 },
    { id: "school", label: "School fees & uniforms", kind: "need", value: 3_000, max: 10_000 },
    { id: "food", label: "Groceries", kind: "need", value: 5_000, max: 12_000 },
    { id: "car", label: "Car repayment, fuel & insurance", kind: "need", value: 4_500, max: 12_000 },
    { id: "medical", label: "Medical aid", kind: "need", value: 2_500, max: 8_000 },
    { id: "dstv", label: "Streaming & DStv", kind: "want", value: 900, max: 3_000 },
    { id: "fun", label: "Family outings & holidays", kind: "want", value: 2_000, max: 8_000 },
    { id: "save", label: "Retirement annuity & savings", kind: "save", value: 3_500, max: 10_000 },
    { id: "debt", label: "Credit card paydown", kind: "save", value: 1_000, max: 8_000 },
  ] },
};
const KIND: Record<Kind, { label: string; colour: string; target: number }> = {
  need: { label: "Needs", colour: "var(--t-book)", target: 50 },
  want: { label: "Wants", colour: "var(--t-tax)", target: 30 },
  save: { label: "Savings & debt", colour: "var(--t-life)", target: 20 },
};

/** A real personal budget with the 50/30/20 rule, a pie chart and live feedback. */
export function BudgetBuilder({ title = "Budget builder", preset: initial = "first" }: { title?: string; preset?: keyof typeof PRESETS }) {
  const touch = useToolUse();
  const [preset, setPreset] = useState<keyof typeof PRESETS>(initial);
  const [income, setIncome] = useState(PRESETS[initial].income);
  const [lines, setLines] = useState<Line[]>(PRESETS[initial].lines);
  const [awarded, setAwarded] = useState(false);
  const load = (p: keyof typeof PRESETS) => { setPreset(p); setIncome(PRESETS[p].income); setLines(PRESETS[p].lines); };
  const total = lines.reduce((s, l) => s + l.value, 0);
  const left = income - total;
  const byKind = (k: Kind) => lines.filter((l) => l.kind === k).reduce((s, l) => s + l.value, 0);
  const pctOf = (v: number) => (income ? Math.round((v / income) * 100) : 0);
  const bars = (Object.keys(KIND) as Kind[]).map((k) => ({ name: KIND[k].label, yours: pctOf(byKind(k)), rule: KIND[k].target, kind: k }));
  const good = left >= 0 && pctOf(byKind("save")) >= 20 && pctOf(byKind("want")) <= 30;
  useEffect(() => {
    if (good && !awarded) { setAwarded(true); solvePuzzle(`budget-${preset}`, 15); }
  }, [good, awarded, preset]);

  return (
    <WidgetFrame title={title} colour="var(--t-life)" instruction="Choose a life, then move the sliders. Can you balance it – and still save 20%?">
      <Segmented colour="var(--t-life)" value={preset} onChange={(p) => { load(p); touch(); }} options={[{ id: "student", label: "🎓 Student" }, { id: "first", label: "💼 First job" }, { id: "family", label: "👨‍👩‍👧 Family" }]} />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-2.5">
          <Slider label="💰 Take-home pay (per month)" value={income} min={1_000} max={60_000} step={500} onChange={(v) => { setIncome(v); touch(); }} format={(v) => rand(v)} colour="var(--t-life)" />
          {lines.map((l) => (
            <Slider key={l.id} colour={KIND[l.kind].colour} value={l.value} min={0} max={l.max} step={50} format={(v) => rand(v)}
              label={<span>{l.label} <span className="text-xs font-normal" style={{ color: KIND[l.kind].colour }}>· {KIND[l.kind].label.toLowerCase()}</span></span>}
              onChange={(v) => { setLines((ls) => ls.map((x) => (x.id === l.id ? { ...x, value: v } : x))); touch(); }} />
          ))}
        </div>
        <div>
          <div className={cn("rounded-2xl p-3 text-center", left >= 0 ? "bg-success/10" : "bg-danger/10")} role="status">
            <div className="text-xs font-semibold text-muted">{left >= 0 ? "Left over (unallocated)" : "Over budget!"}</div>
            <div className={cn("font-display text-3xl font-bold", left >= 0 ? "text-success" : "text-danger")}>{rand(Math.abs(left))}</div>
          </div>
          <div className="mt-2 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={lines.filter((l) => l.value > 0)} dataKey="value" nameKey="label" outerRadius={70} innerRadius={35} isAnimationActive={false}>
                  {lines.filter((l) => l.value > 0).map((l, k) => <Cell key={l.id} fill={KIND[l.kind].colour} fillOpacity={1 - (k % 3) * 0.22} />)}
                </Pie>
                <Tooltip formatter={(v) => rand(Number(v))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} layout="vertical" margin={{ left: 10, right: 10 }}>
                <XAxis type="number" domain={[0, 100]} tick={chartTick} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={chartTick} width={90} />
                <Tooltip formatter={(v, n) => [`${v}%`, n === "rule" ? "50/30/20 rule" : "Your budget"]} />
                <Bar dataKey="rule" fill="var(--curve-ghost)" isAnimationActive={false} barSize={8} />
                <Bar dataKey="yours" isAnimationActive={false} barSize={12}>{bars.map((b) => <Cell key={b.kind} fill={KIND[b.kind].colour} />)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Explain colour="var(--t-life)">
        Needs {pctOf(byKind("need"))}% · wants {pctOf(byKind("want"))}% · savings &amp; debt {pctOf(byKind("save"))}%.{" "}
        {left < 0 ? "You are spending more than you earn – that gap gets filled with debt. Cut a want first." : good ? "🎉 Balanced AND saving 20% – this is a budget an accountant would sign off." : pctOf(byKind("save")) < 20 ? "Try to pay yourself first: move money from wants to savings until savings reach 20%." : "Give every rand a job – put the leftover money into savings."}
        {" "}Total planned spending: {kfmt(total)}.
      </Explain>
    </WidgetFrame>
  );
}
