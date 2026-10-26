"use client";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Explain, chartTick, kfmt, rand, useToolUse } from "./sim-kit";
import { Slider, WidgetFrame } from "./widget-frame";

/** A partnership's Appropriation Account: salaries, interest on capital, then the rest in the profit-sharing ratio. */
export function AppropriationLab({ title = "Partnership appropriation lab", a = "Ayesha", b = "Bongani" }: { title?: string; a?: string; b?: string }) {
  const touch = useToolUse();
  const [np, setNp] = useState(420_000);
  const [capA, setCapA] = useState(500_000);
  const [capB, setCapB] = useState(300_000);
  const [ir, setIr] = useState(10);
  const [salA, setSalA] = useState(120_000);
  const [salB, setSalB] = useState(150_000);
  const [ratioA, setRatioA] = useState(3);
  const [ratioB, setRatioB] = useState(2);
  const intA = (capA * ir) / 100;
  const intB = (capB * ir) / 100;
  const remain = np - salA - salB - intA - intB;
  const shA = (remain * ratioA) / (ratioA + ratioB);
  const shB = remain - shA;
  const data = [
    { name: a, Salary: salA, "Interest on capital": intA, "Share of remainder": shA },
    { name: b, Salary: salB, "Interest on capital": intB, "Share of remainder": shB },
  ];
  const change = (f: (v: number) => void) => (v: number) => { f(v); touch(); };

  return (
    <WidgetFrame title={title} colour="var(--t-report)" instruction={`${a} and ${b} own a business together. Change the partnership agreement and see who gets what.`}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-2.5">
          <Slider label="Net profit for the year" value={np} min={-100_000} max={900_000} step={10_000} onChange={change(setNp)} format={(v) => rand(v)} colour="var(--t-report)" />
          <Slider label={`Capital: ${a}`} value={capA} min={0} max={1_000_000} step={20_000} onChange={change(setCapA)} format={(v) => rand(v)} colour="var(--t-report)" />
          <Slider label={`Capital: ${b}`} value={capB} min={0} max={1_000_000} step={20_000} onChange={change(setCapB)} format={(v) => rand(v)} colour="var(--t-report)" />
          <Slider label="Interest on capital (% p.a.)" value={ir} min={0} max={15} onChange={change(setIr)} format={(v) => `${v}%`} colour="var(--t-report)" />
          <Slider label={`Salary: ${a}`} value={salA} min={0} max={300_000} step={5_000} onChange={change(setSalA)} format={(v) => rand(v)} colour="var(--t-report)" />
          <Slider label={`Salary: ${b}`} value={salB} min={0} max={300_000} step={5_000} onChange={change(setSalB)} format={(v) => rand(v)} colour="var(--t-report)" />
          <div className="grid grid-cols-2 gap-2">
            <Slider label={`Ratio: ${a}`} value={ratioA} min={1} max={5} onChange={change(setRatioA)} colour="var(--t-report)" />
            <Slider label={`Ratio: ${b}`} value={ratioB} min={1} max={5} onChange={change(setRatioB)} colour="var(--t-report)" />
          </div>
        </div>
        <div>
          <div className="rounded-xl border border-line p-3 font-mono text-xs">
            <div className="mb-1 text-center font-display text-sm font-bold">Appropriation Account</div>
            <div className="flex justify-between font-bold"><span>Net profit</span><span>{rand(np)}</span></div>
            <div className="flex justify-between"><span>Partners&apos; salaries</span><span>({rand(salA + salB)})</span></div>
            <div className="flex justify-between"><span>Interest on capital</span><span>({rand(intA + intB)})</span></div>
            <div className="flex justify-between border-t border-line pt-1 font-bold"><span>{remain >= 0 ? "Remaining profit" : "Remaining LOSS"} to share {ratioA}:{ratioB}</span><span>{rand(remain)}</span></div>
            <div className="flex justify-between pl-3"><span>{a}</span><span>{rand(shA)}</span></div>
            <div className="flex justify-between pl-3"><span>{b}</span><span>{rand(shB)}</span></div>
          </div>
          <div className="mt-2 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--graph-grid)" />
                <XAxis dataKey="name" tick={chartTick} />
                <YAxis tick={chartTick} tickFormatter={kfmt} width={52} />
                <Tooltip formatter={(v) => rand(Number(v))} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <ReferenceLine y={0} stroke="var(--text-muted)" />
                <Bar dataKey="Salary" stackId="a" fill="var(--t-report)" isAnimationActive={false} />
                <Bar dataKey="Interest on capital" stackId="a" fill="var(--t-life)" isAnimationActive={false} />
                <Bar dataKey="Share of remainder" stackId="a" fill="var(--t-control)" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <Explain colour="var(--t-report)">
        Total to {a}: <strong>{rand(salA + intA + shA)}</strong>; to {b}: <strong>{rand(salB + intB + shB)}</strong>. These amounts go to each partner&apos;s <em>current account</em> (credit side); drawings go on the debit side. Partners&apos; salaries are NOT an expense in the Income Statement – they are an appropriation (sharing) of profit. {remain < 0 && "When salaries and interest are more than the profit, the shortfall is a loss shared in the ratio."}
      </Explain>
    </WidgetFrame>
  );
}
