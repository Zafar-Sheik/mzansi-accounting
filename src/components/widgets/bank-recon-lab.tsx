"use client";
import { useMemo, useState } from "react";
import { Check, RotateCcw } from "lucide-react";
import { solvePuzzle } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Explain, celebrate, rand, useToolUse } from "./sim-kit";
import { WidgetFrame } from "./widget-frame";

interface Entry { id: string; text: string; amount: number; type: "in" | "out"; match?: string }

const BOOKS: Entry[] = [
  { id: "b1", text: "CRJ: cash sales 26 Mar", amount: 8_400, type: "in", match: "s1" },
  { id: "b2", text: "CRJ: T. Nkosi (debtor)", amount: 1_200, type: "in", match: "s2" },
  { id: "b3", text: "CRJ: cash sales 31 Mar", amount: 5_300, type: "in" },
  { id: "b4", text: "CPJ: EFT Rent – Landlord", amount: 6_000, type: "out", match: "s3" },
  { id: "b5", text: "CPJ: EFT Wholesaler", amount: 4_750, type: "out", match: "s4" },
  { id: "b6", text: "CPJ: Cheque 113 – Plumber", amount: 900, type: "out" },
];
const STATEMENT: Entry[] = [
  { id: "s1", text: "Deposit", amount: 8_400, type: "in" },
  { id: "s2", text: "Deposit – Nkosi", amount: 1_200, type: "in" },
  { id: "s3", text: "EFT Landlord", amount: 6_000, type: "out" },
  { id: "s4", text: "EFT Wholesaler", amount: 4_750, type: "out" },
  { id: "s5", text: "Service fees", amount: 230, type: "out" },
  { id: "s6", text: "Interest received", amount: 45, type: "in" },
  { id: "s7", text: "Debit order: insurance", amount: 650, type: "out" },
];
const OPEN = 12_000; // both books and bank agreed at the start of the month

/**
 * Tick off the cash journals against the bank statement, then use what is
 * left over to update the journals and draw up the reconciliation statement.
 */
export function BankReconLab({ title = "Bank reconciliation lab" }: { title?: string }) {
  const touch = useToolUse();
  const [left, setLeft] = useState<string | null>(null);
  const [ticks, setTicks] = useState<Record<string, string>>({});
  const [wrong, setWrong] = useState<string | null>(null);
  const [stage, setStage] = useState<"tick" | "recon">("tick");
  const matched = new Set([...Object.keys(ticks), ...Object.values(ticks)]);
  const allTicked = BOOKS.filter((b) => b.match).every((b) => ticks[b.id]);

  const tapBook = (b: Entry) => { if (!matched.has(b.id)) setLeft(left === b.id ? null : b.id); };
  const tapStatement = (s: Entry) => {
    if (!left || matched.has(s.id)) return;
    touch();
    const b = BOOKS.find((x) => x.id === left)!;
    if (b.match === s.id) { setTicks((t) => ({ ...t, [b.id]: s.id })); setLeft(null); setWrong(null); }
    else setWrong(`${b.text} (${rand(b.amount)}) does not match "${s.text}" (${rand(s.amount)}). Look for the same amount AND direction.`);
  };

  const r = useMemo(() => {
    const bookBefore = OPEN + BOOKS.reduce((t, b) => t + (b.type === "in" ? b.amount : -b.amount), 0);
    const bankItems = STATEMENT.filter((s) => !BOOKS.some((b) => b.match === s.id));
    const bookAfter = bookBefore + bankItems.reduce((t, s) => t + (s.type === "in" ? s.amount : -s.amount), 0);
    const statement = OPEN + STATEMENT.reduce((t, s) => t + (s.type === "in" ? s.amount : -s.amount), 0);
    const outDep = BOOKS.filter((b) => !b.match && b.type === "in");
    const outPay = BOOKS.filter((b) => !b.match && b.type === "out");
    const recon = statement + outDep.reduce((t, b) => t + b.amount, 0) - outPay.reduce((t, b) => t + b.amount, 0);
    return { bookBefore, bankItems, bookAfter, statement, outDep, outPay, recon };
  }, []);

  const done = () => { setStage("recon"); solvePuzzle("bank-recon-lab", 25); celebrate(); };

  return (
    <WidgetFrame title={title} colour="var(--t-control)" instruction="Step 1: tap a journal entry, then the matching bank statement line to tick both. Step 2: deal with everything left over.">
      <div className="grid gap-3 md:grid-cols-2">
        {[{ name: "Our cash journals (March)", rows: BOOKS, tap: tapBook }, { name: "Bank statement (March)", rows: STATEMENT, tap: tapStatement }].map((col) => (
          <div key={col.name} className="rounded-xl border border-line p-2">
            <div className="mb-1 text-sm font-bold">{col.name}</div>
            <ul className="space-y-1">
              {col.rows.map((e) => {
                const isTicked = matched.has(e.id);
                return (
                  <li key={e.id}>
                    <button onClick={() => col.tap(e)} disabled={stage === "recon"}
                      className={cn("flex w-full items-center justify-between gap-2 rounded-lg border-2 px-2 py-1 text-left text-xs transition", isTicked ? "border-success/40 bg-success/10" : left === e.id ? "border-brand bg-brand-soft" : stage === "recon" ? "border-warning bg-warning/10" : "border-line hover:border-brand/50")}>
                      <span>{isTicked ? "✓ " : ""}{e.text}</span>
                      <span className={cn("font-mono font-bold", e.type === "in" ? "text-success" : "text-danger")}>{e.type === "in" ? "+" : "−"}{rand(e.amount)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {wrong && <Explain colour="var(--danger)">{wrong}</Explain>}
      {stage === "tick" && (
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={done} disabled={!allTicked}><Check className="h-4 w-4" /> All matching items ticked</Button>
          <Button size="sm" variant="secondary" onClick={() => { setTicks({}); setLeft(null); setWrong(null); }}><RotateCcw className="h-4 w-4" /> Clear</Button>
        </div>
      )}
      {stage === "recon" && (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-line p-3 text-sm">
            <div className="font-display font-bold">Step 2a · Update the journals</div>
            <p className="text-xs text-muted">Items on the bank statement that are not in our books (we only found out from the statement):</p>
            <ul className="mt-1 space-y-0.5">{r.bankItems.map((s) => <li key={s.id} className="flex justify-between"><span>{s.type === "in" ? "CRJ" : "CPJ"}: {s.text}</span><span className="font-mono">{rand(s.amount)}</span></li>)}</ul>
            <div className="mt-2 flex justify-between border-t border-line pt-1"><span>Bank account before</span><span className="font-mono">{rand(r.bookBefore)}</span></div>
            <div className="flex justify-between font-bold"><span>Bank account after</span><span className="font-mono">{rand(r.bookAfter)}</span></div>
          </div>
          <div className="rounded-xl border border-line p-3 text-sm">
            <div className="font-display font-bold">Step 2b · Bank Reconciliation Statement</div>
            <div className="flex justify-between"><span>Credit balance per bank statement</span><span className="font-mono">{rand(r.statement)}</span></div>
            {r.outDep.map((b) => <div key={b.id} className="flex justify-between text-muted"><span>+ Outstanding deposit: {b.text.replace("CRJ: ", "")}</span><span className="font-mono">{rand(b.amount)}</span></div>)}
            {r.outPay.map((b) => <div key={b.id} className="flex justify-between text-muted"><span>− Outstanding payment: {b.text.replace("CPJ: ", "")}</span><span className="font-mono">({rand(b.amount)})</span></div>)}
            <div className="mt-1 flex justify-between border-t border-line pt-1 font-bold"><span>Debit balance per Bank account</span><span className="font-mono">{rand(r.recon)}</span></div>
            <div className={cn("mt-2 rounded-lg p-2 text-center text-xs font-bold", Math.abs(r.recon - r.bookAfter) < 0.5 ? "bg-success/10 text-success" : "bg-danger/10 text-danger")}>{Math.abs(r.recon - r.bookAfter) < 0.5 ? "✓ Reconciled – the statement agrees with the updated Bank account" : "Not reconciled"}</div>
          </div>
          <Explain colour="var(--t-control)">Items in our books but not yet on the statement (the late deposit and the uncleared cheque) are <strong>timing differences</strong> – they go on the reconciliation statement. Items on the statement but not in our books (fees, interest, debit orders) must be <strong>entered in the CRJ/CPJ</strong>. An outstanding deposit older than a few days is an internal-control red flag – where did the cash go?</Explain>
        </div>
      )}
    </WidgetFrame>
  );
}
