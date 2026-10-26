"use client";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { incomeTax, SDL_RATE, TAX_YEAR, uif } from "@/lib/acc/tax";
import { Explain, rand, useToolUse } from "./sim-kit";
import { Slider, WidgetFrame } from "./widget-frame";

const COLOURS = ["var(--t-book)", "var(--t-tax)", "var(--t-report)", "var(--t-cost)", "var(--t-control)"];

/**
 * Build your own payslip: basic salary, overtime and commission, then watch
 * PAYE (from the SARS tables), UIF, pension and medical aid come off.
 */
export function PayslipLab({ title = "Payslip builder", employer = "Mzansi Retail (Pty) Ltd", name = "N. Dlamini" }: { title?: string; employer?: string; name?: string }) {
  const touch = useToolUse();
  const [basic, setBasic] = useState(18_000);
  const [otHours, setOtHours] = useState(0);
  const [commission, setCommission] = useState(0);
  const [pensionPct, setPensionPct] = useState(7.5);
  const [medical, setMedical] = useState(0);
  const [members, setMembers] = useState(1);

  const otRate = (basic / 195) * 1.5; // 45-hour week ≈ 195 hours a month
  const overtime = Math.round(otHours * otRate * 100) / 100;
  const gross = basic + overtime + commission;
  const pension = Math.round(((basic * pensionPct) / 100) * 100) / 100;
  const annual = incomeTax({ income: gross * 12, retirement: pension * 12, medicalMembers: medical > 0 ? members : 0 });
  const paye = Math.round((annual.payable / 12) * 100) / 100;
  const u = uif(gross);
  const deductions = paye + u + pension + medical;
  const net = gross - deductions;
  const pie = [
    { name: "Take-home pay", value: Math.max(0, net) },
    { name: "PAYE (to SARS)", value: paye },
    { name: "Pension", value: pension },
    { name: "Medical aid", value: medical },
    { name: "UIF", value: u },
  ].filter((p) => p.value > 0);
  const change = (f: (v: number) => void) => (v: number) => { f(v); touch(); };

  return (
    <WidgetFrame title={title} colour="var(--t-tax)" instruction={`Slide to change the salary and deductions. PAYE uses the SARS ${TAX_YEAR} tables (estimate).`}>
      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-3">
          <Slider label="Basic salary (per month)" value={basic} min={4_000} max={80_000} step={500} onChange={change(setBasic)} format={(v) => rand(v)} colour="var(--t-tax)" />
          <Slider label="Overtime hours (× 1,5)" value={otHours} min={0} max={30} onChange={change(setOtHours)} colour="var(--t-tax)" />
          <Slider label="Commission / bonus" value={commission} min={0} max={20_000} step={250} onChange={change(setCommission)} format={(v) => rand(v)} colour="var(--t-tax)" />
          <Slider label="Pension fund (% of basic)" value={pensionPct} min={0} max={15} step={0.5} onChange={change(setPensionPct)} format={(v) => `${String(v).replace(".", ",")}%`} colour="var(--t-tax)" />
          <Slider label="Medical aid (per month)" value={medical} min={0} max={8_000} step={100} onChange={change(setMedical)} format={(v) => rand(v)} colour="var(--t-tax)" />
          {medical > 0 && <Slider label="People on the medical aid" value={members} min={1} max={5} onChange={change(setMembers)} colour="var(--t-tax)" />}
        </div>
        <div>
          <div className="rounded-xl border border-line bg-surface font-mono text-xs shadow-sm">
            <div className="flex justify-between border-b border-line px-3 py-2"><strong>{employer}</strong><span>PAYSLIP · Month 1</span></div>
            <div className="px-3 py-1 text-muted">Employee: {name} · Tax ref 0123/456/78/9</div>
            <div className="grid grid-cols-2 divide-x divide-line border-t border-line">
              <div className="p-2">
                <div className="mb-1 font-bold">EARNINGS</div>
                <Row k="Basic salary" v={basic} />
                {overtime > 0 && <Row k={`Overtime ${otHours} h`} v={overtime} />}
                {commission > 0 && <Row k="Commission" v={commission} />}
                <Row k="GROSS" v={gross} bold />
              </div>
              <div className="p-2">
                <div className="mb-1 font-bold">DEDUCTIONS</div>
                <Row k="PAYE" v={paye} />
                <Row k="UIF (1%)" v={u} />
                {pension > 0 && <Row k="Pension" v={pension} />}
                {medical > 0 && <Row k="Medical aid" v={medical} />}
                <Row k="TOTAL" v={deductions} bold />
              </div>
            </div>
            <div className="flex justify-between border-t-2 border-line px-3 py-2 text-sm font-bold" style={{ color: "var(--t-book)" }}><span>NET PAY (to your bank)</span><span>{rand(net, 2)}</span></div>
            <div className="border-t border-line px-3 py-1 text-[10px] text-muted">Employer also pays: UIF {rand(u, 2)} · SDL {rand(gross * SDL_RATE, 2)} (not deducted from you)</div>
          </div>
          <div className="mt-2 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pie} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2} isAnimationActive={false}>
                  {pie.map((p, k) => <Cell key={p.name} fill={COLOURS[k % COLOURS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => rand(Number(v), 2)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs">
            {pie.map((p, k) => <li key={p.name} className="flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-full" style={{ background: COLOURS[k % COLOURS.length] }} />{p.name} {Math.round((p.value / gross) * 100)}%</li>)}
          </ul>
        </div>
      </div>
      <Explain colour="var(--t-tax)">
        You keep <strong>{Math.round((net / gross) * 100)}%</strong> of your gross pay. PAYE is an estimate of your yearly income tax ({rand(annual.payable)}) split into 12. Pension contributions are deducted <em>before</em> tax is worked out, so saving for retirement lowers your PAYE. Your marginal tax rate is <strong>{Math.round(annual.marginalRate * 100)}%</strong> – that is the tax on your <em>next</em> rand, not on all of your income.
      </Explain>
    </WidgetFrame>
  );
}

function Row({ k, v, bold }: { k: string; v: number; bold?: boolean }) {
  return <div className={bold ? "mt-1 flex justify-between border-t border-line pt-1 font-bold" : "flex justify-between"}><span>{k}</span><span className="tabular-nums">{rand(v, 2)}</span></div>;
}
