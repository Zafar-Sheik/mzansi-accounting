"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Explain, rand, Readouts, useToolUse } from "./sim-kit";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

interface Batch { label: string; units: number; price: number; colour: string }
const DEFAULT: Batch[] = [
  { label: "Opening stock", units: 40, price: 300, colour: "#64748b" },
  { label: "March purchase", units: 60, price: 320, colour: "#0e7490" },
  { label: "June purchase", units: 50, price: 350, colour: "#6d28d9" },
  { label: "October purchase", units: 50, price: 380, colour: "#be185d" },
];

/**
 * Stock as coloured layers. Sell units and see which layers leave the shelf
 * under FIFO, and how weighted average blends them – then compare closing
 * stock, cost of sales and gross profit.
 */
export function InventoryLab({ title = "Inventory valuation lab", item = "pairs of sneakers", batches = DEFAULT, sellingPrice = 600 }: { title?: string; item?: string; batches?: Batch[]; sellingPrice?: number }) {
  const touch = useToolUse();
  const totalUnits = batches.reduce((s, b) => s + b.units, 0);
  const totalCost = batches.reduce((s, b) => s + b.units * b.price, 0);
  const [sold, setSold] = useState(130);
  const [method, setMethod] = useState<"fifo" | "wa">("fifo");
  const left = totalUnits - sold;
  // FIFO: units left come from the newest batches
  let need = left;
  const fifoLeft = [...batches].reverse().map((b) => { const take = Math.min(need, b.units); need -= take; return { ...b, left: take }; }).reverse();
  const fifoClose = fifoLeft.reduce((s, b) => s + b.left * b.price, 0);
  const avg = totalCost / totalUnits;
  const waClose = avg * left;
  const close = method === "fifo" ? fifoClose : waClose;
  const cos = totalCost - close;
  const sales = sold * sellingPrice;

  return (
    <WidgetFrame title={title} colour="var(--t-control)" instruction={`A shop buys ${item} at rising prices. Slide to sell some, and compare the two methods.`}>
      <Segmented colour="var(--t-control)" value={method} onChange={(m) => { setMethod(m); touch(); }} options={[{ id: "fifo", label: "FIFO (first in, first out)" }, { id: "wa", label: "Weighted average" }]} />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="flex h-64 flex-col-reverse overflow-hidden rounded-xl border-2 border-line bg-surface-2/50" aria-label="Stock on the shelf, oldest at the bottom">
            {(method === "fifo" ? fifoLeft : batches.map((b) => ({ ...b, left: Math.round((b.units / totalUnits) * left) }))).map((b) => (
              <motion.div key={b.label} layout animate={{ height: `${(b.left / totalUnits) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="flex items-center justify-between px-3 text-xs font-bold text-white" style={{ background: method === "wa" ? "linear-gradient(90deg,#64748b,#0e7490,#6d28d9,#be185d)" : b.colour }}>
                {b.left > 6 && <><span>{b.label}</span><span>{b.left} @ {rand(method === "wa" ? avg : b.price, method === "wa" ? 2 : 0)}</span></>}
              </motion.div>
            ))}
          </div>
          <p className="mt-1 text-xs text-muted">Shelf: oldest stock at the bottom. {left} of {totalUnits} units left.</p>
        </div>
        <div className="space-y-3">
          <Slider label={`Units sold during the year (at ${rand(sellingPrice)} each)`} value={sold} min={0} max={totalUnits} step={5} onChange={(v) => { setSold(v); touch(); }} colour="var(--t-control)" />
          <table className="w-full text-sm">
            <thead><tr className="border-b border-line text-left text-xs text-muted"><th>Batch</th><th className="text-right">Units</th><th className="text-right">Price</th><th className="text-right">Cost</th></tr></thead>
            <tbody>{batches.map((b) => <tr key={b.label} className="border-b border-line/50"><td><span className="mr-1 inline-block h-2 w-2 rounded-full" style={{ background: b.colour }} />{b.label}</td><td className="text-right">{b.units}</td><td className="text-right font-mono">{rand(b.price)}</td><td className="text-right font-mono">{rand(b.units * b.price)}</td></tr>)}
              <tr className="font-bold"><td>Total available</td><td className="text-right">{totalUnits}</td><td /><td className="text-right font-mono">{rand(totalCost)}</td></tr></tbody>
          </table>
          <Readouts colour="var(--t-control)" items={[
            { label: "Closing stock (FIFO)", value: rand(fifoClose), highlight: method === "fifo" },
            { label: "Closing stock (weighted avg)", value: rand(waClose), highlight: method === "wa" },
            { label: "Cost of sales", value: rand(cos) },
            { label: "Gross profit", value: rand(sales - cos) },
          ]} />
        </div>
      </div>
      <Explain colour="var(--t-control)">
        {method === "fifo"
          ? <>FIFO assumes the <strong>oldest stock is sold first</strong>, so closing stock is valued at the <strong>latest</strong> prices: the {left} units left come from the most recent purchases. When prices rise, FIFO gives a higher closing stock and a higher gross profit.</>
          : <>Weighted average = total cost ÷ total units = {rand(totalCost)} ÷ {totalUnits} = <strong>{rand(avg, 2)}</strong> per unit. Closing stock = {left} × {rand(avg, 2)} = {rand(waClose, 2)}. It smooths out price changes.</>}
        {" "}Difference between the methods: {rand(Math.abs(fifoClose - waClose))} of gross profit. (Specific identification is used for unique, expensive items like cars – each one is valued at its own cost.)
      </Explain>
    </WidgetFrame>
  );
}
