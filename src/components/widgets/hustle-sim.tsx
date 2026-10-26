"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, RotateCcw } from "lucide-react";
import { addXp, solvePuzzle } from "@/lib/progress";
import { cn, seededRandom } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Explain, celebrate, rand, useToolUse } from "./sim-kit";
import { Segmented, Slider, WidgetFrame } from "./widget-frame";

type BizId = "vetkoek" | "sneakers" | "covers";
const BIZ: Record<BizId, { name: string; emoji: string; unit: string; cost: number; ref: number; base: number; perishable: boolean; fee: number; blurb: string }> = {
  vetkoek: { name: "Vetkoek stall", emoji: "🥯", unit: "vetkoek", cost: 3.5, ref: 8, base: 70, perishable: true, fee: 25, blurb: "Cheap to make, sells fast at taxi ranks – but what you don't sell today goes in the bin." },
  sneakers: { name: "Sneaker cleaning", emoji: "👟", unit: "clean", cost: 14, ref: 60, base: 14, perishable: true, fee: 15, blurb: "A service: supplies per clean are cheap, your time is the product. Unused time can't be sold tomorrow." },
  covers: { name: "Phone covers", emoji: "📱", unit: "cover", cost: 35, ref: 99, base: 10, perishable: false, fee: 30, blurb: "Higher price, slower sales – but stock you don't sell keeps for tomorrow (it is an asset)." },
};
const EVENTS = [
  { text: "Normal day", factor: 1 },
  { text: "☔ Rainy day – fewer people out", factor: 0.6 },
  { text: "💸 Month-end payday!", factor: 1.6 },
  { text: "⚽ Soccer match nearby", factor: 1.35 },
  { text: "🏫 School holiday", factor: 0.85 },
  { text: "🚧 Road works block your spot", factor: 0.7 },
];
interface Day { day: number; event: string; bought: number; price: number; sold: number; demand: number; sales: number; stockCost: number; fee: number; wasted: number; cash: number }

/**
 * Run a side hustle for five days: buy stock, set a price, react to the
 * weather and paydays, and keep a cash book. At the end you get your own
 * Income Statement – profit is not the same as cash!
 */
export function HustleSim({ title = "Side-hustle simulator" }: { title?: string }) {
  const touch = useToolUse();
  const [biz, setBiz] = useState<BizId>("vetkoek");
  const [seed, setSeed] = useState(1);
  const [days, setDays] = useState<Day[]>([]);
  const [qty, setQty] = useState(60);
  const [price, setPrice] = useState(BIZ.vetkoek.ref);
  const [stock, setStock] = useState(0);
  const START = 500;
  useEffect(() => setSeed(Date.now()), []);
  const b = BIZ[biz];
  const cash = days.length ? days[days.length - 1].cash : START;
  const dayNo = days.length + 1;
  const over = days.length >= 5;
  const event = useMemo(() => {
    const r = seededRandom(`${seed}-${dayNo}`);
    return dayNo === 5 ? EVENTS[2] : EVENTS[Math.floor(r() * (EVENTS.length - 1))];
  }, [seed, dayNo]);
  const maxQty = Math.max(0, Math.floor((cash - b.fee) / b.cost));

  const choose = (id: BizId) => { setBiz(id); setDays([]); setStock(0); setPrice(BIZ[id].ref); setQty(Math.min(Math.round(BIZ[id].base * 0.9), Math.floor((START - BIZ[id].fee) / BIZ[id].cost))); setSeed(Date.now()); };
  const run = () => {
    touch();
    const r = seededRandom(`${seed}-${dayNo}-sales`);
    const buy = Math.min(qty, maxQty);
    const available = stock + buy;
    const demand = Math.max(0, Math.round(b.base * event.factor * (b.ref / price) ** 1.7 * (0.85 + r() * 0.3)));
    const sold = Math.min(demand, available);
    const leftover = available - sold;
    const wasted = b.perishable ? leftover : 0;
    const sales = sold * price;
    const stockCost = buy * b.cost;
    const newCash = cash + sales - stockCost - b.fee;
    setStock(b.perishable ? 0 : leftover);
    const d: Day = { day: dayNo, event: event.text, bought: buy, price, sold, demand, sales, stockCost, fee: b.fee, wasted, cash: newCash };
    const all = [...days, d];
    setDays(all);
    if (all.length === 5) {
      const profit = all.reduce((s, x) => s + x.sales, 0) - all.reduce((s, x) => s + x.sold, 0) * b.cost - all.reduce((s, x) => s + x.fee + x.wasted * b.cost, 0);
      if (profit > 0) { solvePuzzle(`hustle-${biz}`, 20); addXp(Math.min(40, Math.round(profit / 25)), "Side hustle profit"); celebrate(); }
    }
  };

  const tot = (k: keyof Day) => days.reduce((s, d) => s + (d[k] as number), 0);
  const cos = tot("sold") * b.cost;
  const wastage = tot("wasted") * b.cost;
  const gp = tot("sales") - cos;
  const np = gp - tot("fee") - wastage;

  return (
    <WidgetFrame title={title} colour="var(--t-life)" instruction="You start with R500 savings as capital. Run your business for 5 days and keep the books.">
      <Segmented colour="var(--t-life)" value={biz} onChange={(id) => { choose(id); touch(); }} options={(Object.keys(BIZ) as BizId[]).map((id) => ({ id, label: `${BIZ[id].emoji} ${BIZ[id].name}` }))} />
      <p className="mt-2 text-sm text-muted">{b.blurb} Cost: {rand(b.cost, 2)} per {b.unit} · daily stall/transport: {rand(b.fee)}.</p>

      <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <div className="rounded-2xl border-2 border-line p-4">
          {!over ? (
            <>
              <div className="flex items-center justify-between"><span className="font-display text-lg font-bold">Day {dayNo} of 5</span><span className="font-mono text-sm">Cash: <strong className={cash < 50 ? "text-danger" : "text-success"}>{rand(cash, 2)}</strong></span></div>
              <AnimatePresence mode="wait"><motion.div key={`${dayNo}-${event.text}`} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 rounded-lg bg-surface-2 px-3 py-1 text-sm">Forecast: <strong>{event.text}</strong></motion.div></AnimatePresence>
              {!b.perishable && stock > 0 && <p className="mt-1 text-xs text-muted">Stock left from yesterday: {stock}</p>}
              <div className="mt-3 space-y-3">
                <Slider label={`Buy ${b.unit} stock (max ${maxQty} with your cash)`} value={Math.min(qty, maxQty)} min={0} max={Math.max(1, maxQty)} onChange={setQty} colour="var(--t-life)" />
                <Slider label="Selling price" value={price} min={Math.ceil(b.cost)} max={b.ref * 2} step={b.ref >= 50 ? 5 : 0.5} onChange={setPrice} format={(v) => rand(v, b.ref >= 50 ? 0 : 2)} colour="var(--t-life)" />
                <p className="text-xs text-muted">Mark-up on cost: <strong>{Math.round(((price - b.cost) / b.cost) * 100)}%</strong>. Higher prices = fewer customers.</p>
              </div>
              <Button className="mt-3 w-full" onClick={run}><Play className="h-4 w-4" /> Open for business</Button>
            </>
          ) : (
            <div className="text-center" role="status">
              <div className="text-4xl">{np > 0 ? "🏆" : "📉"}</div>
              <div className="font-display text-2xl font-bold">{np > 0 ? `Profit ${rand(np, 2)}` : `Loss ${rand(-np, 2)}`}</div>
              <p className="text-sm text-muted">Cash went from {rand(START)} to {rand(cash, 2)}{!b.perishable && stock > 0 ? ` and you still own ${stock} ${b.unit}s worth ${rand(stock * b.cost)}` : ""}.</p>
              <Button size="sm" variant="secondary" className="mt-2" onClick={() => choose(biz)}><RotateCcw className="h-4 w-4" /> Play again</Button>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[380px] text-xs">
              <caption className="px-2 py-1 text-left font-display text-sm font-bold">Cash book</caption>
              <thead><tr className="border-b border-line text-left text-muted"><th className="px-2">Day</th><th>Event</th><th className="text-right">Sold</th><th className="text-right">Receipts</th><th className="text-right">Payments</th><th className="px-2 text-right">Bank</th></tr></thead>
              <tbody>
                <tr className="border-b border-line/50"><td className="px-2">0</td><td>Capital</td><td /><td className="text-right font-mono">{rand(START)}</td><td /><td className="px-2 text-right font-mono">{rand(START)}</td></tr>
                {days.map((d) => (
                  <tr key={d.day} className="border-b border-line/50">
                    <td className="px-2">{d.day}</td><td className="max-w-28 truncate" title={d.event}>{d.event}</td>
                    <td className={cn("text-right", d.demand > d.sold && "text-warning")} title={d.demand > d.sold ? `${d.demand - d.sold} customers walked away – you ran out!` : undefined}>{d.sold}{d.demand > d.sold ? "!" : ""}</td>
                    <td className="text-right font-mono">{rand(d.sales, 2)}</td><td className="text-right font-mono">({rand(d.stockCost + d.fee, 2)})</td><td className="px-2 text-right font-mono">{rand(d.cash, 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {days.length > 0 && (
            <div className="rounded-xl border border-line p-3 font-mono text-xs">
              <div className="mb-1 font-display text-sm font-bold">Income Statement (so far)</div>
              <div className="flex justify-between"><span>Sales</span><span>{rand(tot("sales"), 2)}</span></div>
              <div className="flex justify-between"><span>Cost of sales ({tot("sold")} × {rand(b.cost, 2)})</span><span>({rand(cos, 2)})</span></div>
              <div className="flex justify-between border-t border-line font-bold"><span>Gross profit</span><span>{rand(gp, 2)}</span></div>
              <div className="flex justify-between"><span>Stall fees & transport</span><span>({rand(tot("fee"))})</span></div>
              {wastage > 0 && <div className="flex justify-between text-danger"><span>Wastage ({tot("wasted")} unsold)</span><span>({rand(wastage, 2)})</span></div>}
              <div className="flex justify-between border-t-2 border-line font-bold"><span>Net {np >= 0 ? "profit" : "loss"}</span><span>{rand(np, 2)}</span></div>
            </div>
          )}
        </div>
      </div>
      <Explain colour="var(--t-life)">
        Real accountant habits: <strong>separate business money from pocket money</strong>, record every rand in and out (the cash book), and know your cost per unit so you can price for profit. Notice the difference between <strong>profit</strong> (sales − costs) and <strong>cash</strong> – {b.perishable ? "unsold food is wasted money" : "unsold covers are stock (an asset), not a loss"}. A &quot;!&quot; means customers wanted more than you had – lost sales.
      </Explain>
    </WidgetFrame>
  );
}
