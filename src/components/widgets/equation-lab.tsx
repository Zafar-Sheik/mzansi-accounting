"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { Check, RotateCcw } from "lucide-react";
import { solvePuzzle } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Explain, celebrate, rand, useToolUse } from "./sim-kit";
import { WidgetFrame } from "./widget-frame";

type Eff = "+" | "−" | "0";
interface Tx { text: string; a: number; oe: number; l: number; why: string }

const DEFAULT_TX: Tx[] = [
  { text: "Owner deposits R50 000 capital into the business bank account", a: 50_000, oe: 50_000, l: 0, why: "Bank (asset) ↑ and Capital (owner's equity) ↑ – the owner put money in." },
  { text: "Bought equipment for R8 000 by EFT", a: 0, oe: 0, l: 0, why: "Equipment ↑ R8 000 and Bank ↓ R8 000 – one asset swapped for another, total assets unchanged." },
  { text: "Bought trading stock on credit, R12 000", a: 12_000, oe: 0, l: 12_000, why: "Trading stock (asset) ↑ and Creditors (liability) ↑ – we owe the supplier." },
  { text: "Sold goods for R6 000 cash (cost price R4 000)", a: 2_000, oe: 2_000, l: 0, why: "Bank ↑ R6 000, Trading stock ↓ R4 000: assets net ↑ R2 000. Sales R6 000 − cost of sales R4 000 = R2 000 profit, so equity ↑ R2 000." },
  { text: "Paid rent of R3 000 by EFT", a: -3_000, oe: -3_000, l: 0, why: "Bank ↓ and an expense reduces owner's equity." },
  { text: "Paid R5 000 to a creditor", a: -5_000, oe: 0, l: -5_000, why: "Bank ↓ and Creditors ↓ – we paid off part of what we owe." },
  { text: "The owner takes R1 000 cash for personal use", a: -1_000, oe: -1_000, l: 0, why: "Drawings reduce owner's equity, and cash leaves the business." },
  { text: "Received a loan of R20 000 from Mzansi Bank", a: 20_000, oe: 0, l: 20_000, why: "Bank ↑ and Loan (liability) ↑." },
  { text: "Received R2 500 rent from a tenant", a: 2_500, oe: 2_500, l: 0, why: "Bank ↑ and income increases owner's equity." },
  { text: "A debtor pays R1 500 owing to us", a: 0, oe: 0, l: 0, why: "Bank ↑, Debtors ↓ – just a swap between assets." },
];

const sign = (n: number): Eff => (n > 0 ? "+" : n < 0 ? "−" : "0");
const OPTS: Eff[] = ["+", "−", "0"];

/**
 * The accounting equation as a balance scale. Learners predict the effect of
 * each transaction on Assets, Owner's equity and Liabilities, then watch the
 * totals update – the scale ALWAYS stays level.
 */
export function EquationLab({ transactions = DEFAULT_TX, title = "Accounting equation balance" }: { transactions?: Tx[]; title?: string }) {
  const touch = useToolUse();
  const [i, setI] = useState(0);
  const [guess, setGuess] = useState<{ a?: Eff; oe?: Eff; l?: Eff }>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [tot, setTot] = useState({ a: 0, oe: 0, l: 0 });
  const [wobble, setWobble] = useState(0);
  const tx = transactions[i];
  const done = i >= transactions.length;
  const right = tx && guess.a === sign(tx.a) && guess.oe === sign(tx.oe) && guess.l === sign(tx.l);

  const check = () => {
    if (!tx || !guess.a || !guess.oe || !guess.l) return;
    touch();
    setChecked(true);
    if (right) setScore((s) => s + 1);
    setTot((t) => ({ a: t.a + tx.a, oe: t.oe + tx.oe, l: t.l + tx.l }));
    setWobble((w) => w + 1);
  };
  const next = () => {
    setChecked(false);
    setGuess({});
    const n = i + 1;
    setI(n);
    if (n >= transactions.length && score >= transactions.length - 1) {
      solvePuzzle("equation-lab", 20);
      celebrate();
    }
  };
  const reset = () => { setI(0); setGuess({}); setChecked(false); setScore(0); setTot({ a: 0, oe: 0, l: 0 }); };
  const max = Math.max(1, tot.a);

  return (
    <WidgetFrame title={title} colour="var(--t-book)" instruction="Predict how each transaction changes Assets, Owner's equity and Liabilities. Then watch the scale – it never tips.">
      <div className="grid items-center gap-4 md:grid-cols-[1fr_1.1fr]">
        <svg viewBox="0 0 320 190" className="w-full" role="img" aria-label={`Assets ${rand(tot.a)} equals owner's equity ${rand(tot.oe)} plus liabilities ${rand(tot.l)}`}>
          <polygon points="160,150 140,185 180,185" fill="var(--text-muted)" />
          <motion.g key={wobble} initial={{ rotate: wobble ? -6 : 0 }} animate={{ rotate: [wobble ? -6 : 0, 4, -2, 0] }} transition={{ duration: 0.9 }} style={{ originX: "160px", originY: "150px" }}>
            <rect x="30" y="146" width="260" height="8" rx="4" fill="var(--text)" />
            {/* left pan: assets */}
            <line x1="70" y1="150" x2="70" y2="110" stroke="var(--text-muted)" strokeWidth="2" />
            <rect x="25" y={110 - Math.min(80, (tot.a / max) * 80)} width="90" height={Math.min(80, (tot.a / max) * 80)} rx="6" fill="var(--t-book)" opacity="0.85" />
            <text x="70" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text)">Assets</text>
            <text x="70" y="140" textAnchor="middle" fontSize="11" fill="var(--text)">{rand(tot.a)}</text>
            {/* right pan: equity + liabilities */}
            <line x1="250" y1="150" x2="250" y2="110" stroke="var(--text-muted)" strokeWidth="2" />
            <rect x="205" y={110 - Math.min(80, (Math.max(0, tot.oe) / max) * 80)} width="90" height={Math.min(80, (Math.max(0, tot.oe) / max) * 80)} rx="6" fill="var(--t-report)" opacity="0.85" />
            <rect x="205" y={110 - Math.min(80, ((Math.max(0, tot.oe) + tot.l) / max) * 80)} width="90" height={Math.min(80, (tot.l / max) * 80)} rx="6" fill="var(--t-tax)" opacity="0.85" />
            <text x="250" y="104" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text)">OE + L</text>
            <text x="250" y="140" textAnchor="middle" fontSize="11" fill="var(--text)">{rand(tot.oe + tot.l)}</text>
          </motion.g>
        </svg>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          {[{ k: "Assets", v: tot.a, c: "var(--t-book)" }, { k: "Owner's equity", v: tot.oe, c: "var(--t-report)" }, { k: "Liabilities", v: tot.l, c: "var(--t-tax)" }].map((x) => (
            <div key={x.k} className="rounded-xl border border-line p-2"><div className="text-xs font-bold" style={{ color: x.c }}>{x.k}</div><div className="font-mono font-bold tabular-nums">{rand(x.v)}</div></div>
          ))}
          <div className="col-span-3 rounded-xl bg-success/10 p-2 font-mono text-xs font-bold text-success">A = OE + L → {rand(tot.a)} = {rand(tot.oe)} + {rand(tot.l)} ✓</div>
        </div>
      </div>

      {!done ? (
        <div className="mt-4 rounded-2xl border-2 border-line p-4">
          <div className="text-xs font-bold text-muted">Transaction {i + 1} of {transactions.length}</div>
          <p className="mt-1 font-display text-lg font-bold">{tx.text}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(["a", "oe", "l"] as const).map((k) => (
              <div key={k}>
                <div className="mb-1 text-xs font-semibold">{k === "a" ? "Assets" : k === "oe" ? "Owner's equity" : "Liabilities"}</div>
                <div className="flex gap-1">
                  {OPTS.map((o) => {
                    const sel = guess[k] === o;
                    const truth = checked && sign(tx[k]) === o;
                    return (
                      <button key={o} disabled={checked} onClick={() => setGuess((g) => ({ ...g, [k]: o }))} aria-pressed={sel}
                        className={cn("h-10 flex-1 rounded-lg border-2 font-mono text-lg font-bold transition", truth ? "border-success bg-success/15" : sel && checked ? "border-danger bg-danger/10" : sel ? "border-brand bg-brand-soft text-brand" : "border-line hover:border-brand/50")}>
                        {o}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            {!checked ? <Button size="sm" onClick={check} disabled={!guess.a || !guess.oe || !guess.l}><Check className="h-4 w-4" /> Check &amp; post</Button>
              : <Button size="sm" onClick={next}>Next transaction →</Button>}
          </div>
          {checked && <Explain colour={right ? "var(--success)" : "var(--danger)"}><strong>{right ? "Yes! " : "Not quite. "}</strong>{tx.why}</Explain>}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl bg-success/10 p-4 text-center" role="status">
          <div className="text-3xl">⚖️</div>
          <p className="font-display text-xl font-bold">{score}/{transactions.length} predicted correctly</p>
          <p className="text-sm text-muted">Notice: after every single transaction, A = OE + L. That is why it is called an <em>equation</em>.</p>
          <Button size="sm" variant="secondary" className="mt-2" onClick={reset}><RotateCcw className="h-4 w-4" /> Start again</Button>
        </div>
      )}
    </WidgetFrame>
  );
}
