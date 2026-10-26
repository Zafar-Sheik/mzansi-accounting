"use client";
import { useState } from "react";
import { Explain, NumberField, useToolUse } from "./sim-kit";
import { Segmented, WidgetFrame } from "./widget-frame";

interface Figures { sales: number; cos: number; opex: number; ca: number; stock: number; cl: number; ncl: number; equity: number; debtors: number; creditors: number }
const PRESETS: Record<string, { label: string; f: Figures }> = {
  healthy: { label: "🟢 Healthy", f: { sales: 1_200_000, cos: 720_000, opex: 300_000, ca: 380_000, stock: 140_000, cl: 190_000, ncl: 150_000, equity: 800_000, debtors: 95_000, creditors: 70_000 } },
  cash: { label: "🟠 Cash-strapped", f: { sales: 900_000, cos: 650_000, opex: 210_000, ca: 260_000, stock: 200_000, cl: 280_000, ncl: 100_000, equity: 450_000, debtors: 45_000, creditors: 160_000 } },
  geared: { label: "🔴 Over-borrowed", f: { sales: 1_500_000, cos: 1_000_000, opex: 420_000, ca: 300_000, stock: 110_000, cl: 210_000, ncl: 900_000, equity: 380_000, debtors: 150_000, creditors: 90_000 } },
};
type Light = "good" | "ok" | "bad";
const LIGHT: Record<Light, string> = { good: "var(--success)", ok: "var(--warning)", bad: "var(--danger)" };

/** Type in (or pick) a set of figures and get every CAPS ratio with a traffic light and a plain-language comment. */
export function RatioLab({ title = "Ratio analysis dashboard" }: { title?: string }) {
  const touch = useToolUse();
  const [preset, setPreset] = useState("healthy");
  const [f, setF] = useState<Figures>(PRESETS.healthy.f);
  const set = (k: keyof Figures) => (v: number) => { setF((x) => ({ ...x, [k]: v })); touch(); };
  const gp = f.sales - f.cos;
  const np = gp - f.opex;
  const ratios: { name: string; value: string; light: Light; say: string; formula: string }[] = [
    { name: "Gross profit on sales", formula: "GP ÷ sales × 100", value: `${((gp / f.sales) * 100).toFixed(1)}%`, light: gp / f.sales > 0.35 ? "good" : gp / f.sales > 0.25 ? "ok" : "bad", say: "How much of every R1 of sales is left after paying for the stock." },
    { name: "Mark-up achieved", formula: "GP ÷ cost of sales × 100", value: `${((gp / f.cos) * 100).toFixed(1)}%`, light: gp / f.cos > 0.5 ? "good" : gp / f.cos > 0.3 ? "ok" : "bad", say: "Compare with the planned mark-up – a lower figure may mean discounts or stock theft." },
    { name: "Net profit on sales", formula: "NP ÷ sales × 100", value: `${((np / f.sales) * 100).toFixed(1)}%`, light: np / f.sales > 0.1 ? "good" : np / f.sales > 0.03 ? "ok" : "bad", say: "Profit after ALL expenses. Low = expenses are eating the profit." },
    { name: "Current ratio", formula: "CA ÷ CL", value: `${(f.ca / f.cl).toFixed(2)} : 1`, light: f.ca / f.cl >= 1.5 ? "good" : f.ca / f.cl >= 1 ? "ok" : "bad", say: "Can the business pay its short-term debts? Around 2:1 is comfortable; below 1:1 is dangerous." },
    { name: "Acid-test ratio", formula: "(CA − inventories) ÷ CL", value: `${((f.ca - f.stock) / f.cl).toFixed(2)} : 1`, light: (f.ca - f.stock) / f.cl >= 1 ? "good" : (f.ca - f.stock) / f.cl >= 0.7 ? "ok" : "bad", say: "Same, but without stock (which can be slow to turn into cash). 1:1 is the target." },
    { name: "Debt-equity ratio", formula: "Non-current liabilities ÷ equity", value: `${(f.ncl / f.equity).toFixed(2)} : 1`, light: f.ncl / f.equity <= 0.5 ? "good" : f.ncl / f.equity <= 1 ? "ok" : "bad", say: "How much the business relies on borrowed money. Above 1:1 is high risk (high gearing)." },
    { name: "Debtors collection period", formula: "Avg debtors ÷ credit sales × 365", value: `${Math.round((f.debtors / f.sales) * 365)} days`, light: (f.debtors / f.sales) * 365 <= 30 ? "good" : (f.debtors / f.sales) * 365 <= 60 ? "ok" : "bad", say: "How long customers take to pay. Compare with the credit terms (usually 30 days)." },
    { name: "Creditors payment period", formula: "Avg creditors ÷ credit purchases × 365", value: `${Math.round((f.creditors / f.cos) * 365)} days`, light: (f.creditors / f.cos) * 365 <= 60 ? "good" : (f.creditors / f.cos) * 365 <= 90 ? "ok" : "bad", say: "How long we take to pay suppliers. Paying later than debtors pay us helps cash flow – but don't damage the relationship." },
    { name: "Return on owner's equity", formula: "NP ÷ average equity × 100", value: `${((np / f.equity) * 100).toFixed(1)}%`, light: np / f.equity > 0.15 ? "good" : np / f.equity > 0.08 ? "ok" : "bad", say: "Is the owner earning more than they would in a fixed deposit (about 8%)?" },
  ];

  return (
    <WidgetFrame title={title} colour="var(--t-report)" instruction="Pick a business or type your own figures. Each ratio gets a traffic light and a comment you could write in an exam.">
      <Segmented colour="var(--t-report)" value={preset} onChange={(p) => { setPreset(p); setF(PRESETS[p].f); touch(); }} options={Object.entries(PRESETS).map(([id, p]) => ({ id, label: p.label }))} />
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {([["sales", "Sales"], ["cos", "Cost of sales"], ["opex", "Operating expenses"], ["ca", "Current assets"], ["stock", "Inventories"], ["cl", "Current liabilities"], ["ncl", "Non-current liabilities"], ["equity", "Owner's equity"], ["debtors", "Debtors"], ["creditors", "Creditors"]] as const).map(([k, label]) => (
          <NumberField key={k} label={label} value={f[k]} onChange={set(k)} step={5_000} colour="var(--t-report)" />
        ))}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {ratios.map((r) => (
          <div key={r.name} className="rounded-xl border border-line p-3" style={{ borderLeft: `6px solid ${LIGHT[r.light]}` }}>
            <div className="flex items-baseline justify-between gap-2"><span className="text-sm font-bold">{r.name}</span><span className="font-mono text-lg font-bold" style={{ color: LIGHT[r.light] }}>{r.value.replace(".", ",")}</span></div>
            <div className="text-[11px] text-muted">{r.formula}</div>
            <p className="mt-1 text-xs">{r.say}</p>
          </div>
        ))}
      </div>
      <Explain colour="var(--t-report)">In the exam, always <strong>quote the figures</strong> (e.g. &quot;the current ratio dropped from 2,1:1 to 0,9:1&quot;) and then <strong>explain what it means</strong> for the business and what it should do. Traffic lights here are rules of thumb – the right answer always depends on the type of business.</Explain>
    </WidgetFrame>
  );
}
