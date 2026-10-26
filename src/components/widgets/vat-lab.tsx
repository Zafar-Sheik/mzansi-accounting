"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Explain, NumberField, rand, Readouts, useToolUse } from "./sim-kit";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

/** VAT calculator (inclusive ↔ exclusive) and a mini VAT return: output VAT − input VAT = payable to SARS (or a refund). */
export function VatLab({ title = "VAT lab", mode: initial = "calc" }: { title?: string; mode?: "calc" | "return" }) {
  const touch = useToolUse();
  const [mode, setMode] = useState<"calc" | "return">(initial);
  const [amount, setAmount] = useState(1150);
  const [incl, setIncl] = useState(true);
  const [sales, setSales] = useState(250_000);
  const [zero, setZero] = useState(30_000);
  const [purchases, setPurchases] = useState(160_000);
  const [badDebts, setBadDebts] = useState(0);

  const excl = incl ? amount / 1.15 : amount;
  const vat = excl * 0.15;
  const total = excl + vat;
  const output = sales * 0.15;
  const input = purchases * 0.15 + badDebts * (15 / 115);
  const payable = output - input;

  return (
    <WidgetFrame title={title} colour="var(--t-tax)" instruction="VAT is 15% in South Africa. Businesses collect it from customers (output VAT), claim back what they paid suppliers (input VAT) and pay the difference to SARS.">
      <Segmented colour="var(--t-tax)" value={mode} onChange={(m) => { setMode(m); touch(); }} options={[{ id: "calc", label: "Price calculator" }, { id: "return", label: "VAT return (VAT201)" }]} />
      {mode === "calc" ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <NumberField label="Amount" value={amount} onChange={(v) => { setAmount(v); touch(); }} step={10} colour="var(--t-tax)" />
            <Segmented colour="var(--t-tax)" value={incl ? "in" : "ex"} onChange={(v) => setIncl(v === "in")} options={[{ id: "in", label: "This amount INCLUDES VAT" }, { id: "ex", label: "This amount EXCLUDES VAT" }]} />
            <Readouts colour="var(--t-tax)" items={[{ label: "Excluding VAT", value: rand(excl, 2) }, { label: "VAT (15%)", value: rand(vat, 2), highlight: true }, { label: "Including VAT", value: rand(total, 2) }]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-muted">Where your money goes</div>
            <div className="mt-2 flex h-14 overflow-hidden rounded-xl border border-line">
              <motion.div className="grid place-items-center bg-[var(--t-book)] text-xs font-bold text-white" animate={{ width: `${(excl / total) * 100}%` }}>business {Math.round((excl / total) * 100)}%</motion.div>
              <motion.div className="grid place-items-center bg-[var(--t-tax)] text-xs font-bold text-white" animate={{ width: `${(vat / total) * 100}%` }}>SARS</motion.div>
            </div>
            <Explain colour="var(--t-tax)">
              {incl ? <>VAT inside an inclusive price = amount × <strong>15/115</strong>. So {rand(amount, 2)} × 15/115 = <strong>{rand(vat, 2)}</strong>.</> : <>Inclusive price = exclusive × <strong>115/100</strong>. VAT = exclusive × 15/100 = <strong>{rand(vat, 2)}</strong>.</>}
              {" "}Common mistake: taking 15% of an inclusive price – that gives too much VAT.
            </Explain>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <Slider label="Standard-rated sales (excl. VAT)" value={sales} min={0} max={600_000} step={5000} onChange={(v) => { setSales(v); touch(); }} format={(v) => rand(v)} colour="var(--t-tax)" />
            <Slider label="Zero-rated sales (bread, maize meal, exports…)" value={zero} min={0} max={200_000} step={5000} onChange={setZero} format={(v) => rand(v)} colour="var(--t-tax)" />
            <Slider label="Purchases & expenses (excl. VAT)" value={purchases} min={0} max={600_000} step={5000} onChange={setPurchases} format={(v) => rand(v)} colour="var(--t-tax)" />
            <Slider label="Bad debts written off (incl. VAT)" value={badDebts} min={0} max={23_000} step={1150} onChange={setBadDebts} format={(v) => rand(v)} colour="var(--t-tax)" />
          </div>
          <div>
            <Readouts colour="var(--t-tax)" items={[{ label: "Output VAT (15% × sales)", value: rand(output, 2) }, { label: "Zero-rated: output VAT", value: "R0" }, { label: "Input VAT (claimable)", value: rand(input, 2) }, { label: payable >= 0 ? "Payable to SARS" : "Refund from SARS", value: rand(Math.abs(payable), 2), highlight: true }]} />
            <Explain colour="var(--t-tax)">
              <strong>VAT payable = output VAT − input VAT.</strong> Zero-rated sales are taxed at 0% – the business still claims input VAT on its purchases. <em>Exempt</em> items (e.g. bus and taxi fares, residential rent) have no VAT at all and no input VAT can be claimed. When a debtor&apos;s account is written off, the VAT already paid to SARS on that sale can be claimed back (bad debts × 15/115).
            </Explain>
          </div>
        </div>
      )}
    </WidgetFrame>
  );
}
