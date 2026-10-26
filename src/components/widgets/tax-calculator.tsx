"use client";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BRACKETS, incomeTax, TAX_YEAR } from "@/lib/acc/tax";
import { Explain, NumberField, rand, Readouts, useToolUse } from "./sim-kit";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

/**
 * A SARS-style income tax calculator: brackets, rebates, retirement deduction,
 * medical credits – and whether you get a refund or owe SARS on assessment.
 */
export function TaxCalculator({ title = "Income tax calculator" }: { title?: string }) {
  const touch = useToolUse();
  const [income, setIncome] = useState(360_000);
  const [age, setAge] = useState<"u65" | "65" | "75">("u65");
  const [ra, setRa] = useState(0);
  const [members, setMembers] = useState(0);
  const [payePaid, setPayePaid] = useState(48_000);
  const ageNum = age === "u65" ? 30 : age === "65" ? 66 : 76;
  const t = incomeTax({ income, age: ageNum, retirement: ra, medicalMembers: members });
  const diff = payePaid - t.payable;

  const data = BRACKETS.map((b) => {
    const top = Math.min(t.taxable, b.to);
    const inBracket = Math.max(0, top - b.from);
    return { name: `${Math.round(b.rate * 100)}%`, taxed: Math.round(inBracket * b.rate), income: Math.round(inBracket) };
  }).filter((d) => d.income > 0);
  const change = <T,>(f: (v: T) => void) => (v: T) => { f(v); touch(); };

  return (
    <WidgetFrame title={title} colour="var(--t-tax)" instruction={`Uses the SARS ${TAX_YEAR} tables. Change the inputs and watch how each slice of income is taxed at a different rate.`}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <Slider label="Taxable income for the year" value={income} min={0} max={2_000_000} step={5_000} onChange={change(setIncome)} format={(v) => rand(v)} colour="var(--t-tax)" />
          <div><div className="mb-1 text-sm font-semibold">Age on the last day of the tax year</div><Segmented colour="var(--t-tax)" value={age} onChange={change(setAge)} options={[{ id: "u65", label: "Under 65" }, { id: "65", label: "65 – 74" }, { id: "75", label: "75+" }]} /></div>
          <Slider label="Retirement annuity / pension contributions" value={ra} min={0} max={150_000} step={1_000} onChange={change(setRa)} format={(v) => rand(v)} colour="var(--t-tax)" />
          <Slider label="People on your medical aid" value={members} min={0} max={6} onChange={change(setMembers)} colour="var(--t-tax)" />
          <NumberField label="PAYE your employer already paid (from your IRP5)" value={payePaid} onChange={change(setPayePaid)} step={500} colour="var(--t-tax)" />
        </div>
        <div>
          <Readouts colour="var(--t-tax)" items={[
            { label: "Taxable income", value: rand(t.taxable) },
            { label: "Tax before rebates", value: rand(t.beforeRebates) },
            { label: "Rebate(s)", value: `−${rand(t.rebate)}` },
            { label: "Medical credits", value: `−${rand(t.medical)}` },
            { label: "Tax for the year", value: rand(t.payable), highlight: true },
            { label: "Per month", value: rand(t.payable / 12) },
          ]} />
          <div className="mt-3 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
                <YAxis tick={{ fontSize: 10, fill: "var(--text-muted)" }} tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`} />
                <Tooltip formatter={(v, n) => [rand(Number(v)), n === "taxed" ? "Tax on this slice" : "Income in this slice"]} />
                <Bar dataKey="income" fill="var(--t-report)" radius={[6, 6, 0, 0]} isAnimationActive={false} />
                <Bar dataKey="taxed" fill="var(--t-tax)" radius={[6, 6, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={`mt-2 rounded-xl p-3 text-center font-display font-bold ${diff >= 0 ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`} role="status">
            {Math.abs(diff) < 1 ? "PAYE matches your tax exactly – nothing to pay, no refund." : diff > 0 ? `SARS owes YOU a refund of ${rand(diff)} 🎉` : `You owe SARS ${rand(-diff)} – pay by the due date to avoid penalties.`}
          </div>
        </div>
      </div>
      <Explain colour="var(--t-tax)">
        Effective rate: <strong>{(t.effectiveRate * 100).toFixed(1).replace(".", ",")}%</strong> of your income goes to tax. Marginal rate: <strong>{Math.round(t.marginalRate * 100)}%</strong> on your next rand. Getting a raise NEVER makes you take home less – only the slice above each bracket line is taxed at the higher rate.
        {income <= 95_750 && age === "u65" && <> You are below the tax threshold (R95 750) – no income tax.</>}
      </Explain>
    </WidgetFrame>
  );
}
