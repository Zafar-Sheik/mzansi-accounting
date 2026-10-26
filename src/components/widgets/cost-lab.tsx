"use client";
import { useState } from "react";
import { Explain, rand, useToolUse } from "./sim-kit";
import { Slider, WidgetFrame } from "./widget-frame";

/**
 * A manufacturer's Production Cost Statement that you control. Change the
 * costs and the number of units and see why fixed costs per unit fall when
 * production rises.
 */
export function CostLab({ title = "Production cost statement", product = "school chairs" }: { title?: string; product?: string }) {
  const touch = useToolUse();
  const [dm, setDm] = useState(180_000);
  const [dl, setDl] = useState(120_000);
  const [ind, setInd] = useState(25_000);
  const [rent, setRent] = useState(36_000);
  const [dep, setDep] = useState(14_000);
  const [wipO, setWipO] = useState(12_000);
  const [wipC, setWipC] = useState(9_000);
  const [units, setUnits] = useState(3_000);
  const prime = dm + dl;
  const foh = ind + rent + dep;
  const total = prime + foh;
  const cop = total + wipO - wipC;
  const unit = units ? cop / units : 0;
  const fixedPerUnit = units ? (rent + dep) / units : 0;
  const change = (f: (v: number) => void) => (v: number) => { f(v); touch(); };
  const Row = ({ k, v, bold, indent }: { k: string; v: number; bold?: boolean; indent?: boolean }) => (
    <div className={`flex justify-between ${bold ? "border-t border-line pt-1 font-bold" : ""} ${indent ? "pl-3 text-muted" : ""}`}><span>{k}</span><span className="font-mono tabular-nums">{rand(v)}</span></div>
  );

  return (
    <WidgetFrame title={title} colour="var(--t-cost)" instruction={`A factory makes ${product}. Move the sliders – the statement updates like a spreadsheet.`}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2.5">
          <Slider label="Direct materials used (wood, screws)" value={dm} min={0} max={400_000} step={5_000} onChange={change(setDm)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Direct labour (factory workers)" value={dl} min={0} max={300_000} step={5_000} onChange={change(setDl)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Indirect materials & labour (cleaning, supervisor)" value={ind} min={0} max={100_000} step={1_000} onChange={change(setInd)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Factory rent (fixed)" value={rent} min={0} max={100_000} step={1_000} onChange={change(setRent)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Depreciation on factory machines (fixed)" value={dep} min={0} max={60_000} step={1_000} onChange={change(setDep)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Work-in-process: opening" value={wipO} min={0} max={50_000} step={1_000} onChange={change(setWipO)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Work-in-process: closing" value={wipC} min={0} max={50_000} step={1_000} onChange={change(setWipC)} format={(v) => rand(v)} colour="var(--t-cost)" />
          <Slider label="Units completed" value={units} min={100} max={10_000} step={100} onChange={change(setUnits)} colour="var(--t-cost)" />
        </div>
        <div className="rounded-xl border border-line bg-surface p-3 text-sm">
          <div className="mb-2 text-center font-display font-bold">Production Cost Statement</div>
          <Row k="Direct material cost" v={dm} />
          <Row k="Direct labour cost" v={dl} />
          <Row k="Prime cost" v={prime} bold />
          <Row k="Factory overhead cost" v={foh} />
          <Row k="Indirect materials & labour" v={ind} indent />
          <Row k="Factory rent" v={rent} indent />
          <Row k="Depreciation – factory" v={dep} indent />
          <Row k="Total manufacturing cost" v={total} bold />
          <Row k="+ Work-in-process (opening)" v={wipO} />
          <Row k="− Work-in-process (closing)" v={-wipC} />
          <Row k="Cost of production of finished goods" v={cop} bold />
          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-surface-2 p-2"><div className="text-xs text-muted">Cost per unit</div><div className="font-mono text-lg font-bold" style={{ color: "var(--t-cost)" }}>{rand(unit, 2)}</div></div>
            <div className="rounded-xl bg-surface-2 p-2"><div className="text-xs text-muted">Fixed cost per unit</div><div className="font-mono text-lg font-bold">{rand(fixedPerUnit, 2)}</div></div>
          </div>
        </div>
      </div>
      <Explain colour="var(--t-cost)">
        <strong>Prime cost</strong> = direct materials + direct labour. Add <strong>factory overheads</strong> (all other factory costs) for the total manufacturing cost, then adjust for unfinished goods (work-in-process). Office salaries, advertising and delivery costs are <em>not</em> production costs – they are administration and selling &amp; distribution costs. Try doubling the units: the fixed cost per unit halves, so the unit cost drops – that is why factories like to run at full capacity.
      </Explain>
    </WidgetFrame>
  );
}
