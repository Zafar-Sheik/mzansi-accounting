"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, RotateCcw, Scale } from "lucide-react";
import { solvePuzzle } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Explain, celebrate, rand, useToolUse } from "./sim-kit";
import { WidgetFrame } from "./widget-frame";

interface Tx { date: string; text: string; amount: number; dr: string; cr: string }
type Kind = "asset" | "equity" | "liability" | "income" | "expense";

const ACCOUNTS: { name: string; kind: Kind }[] = [
  { name: "Bank", kind: "asset" },
  { name: "Equipment", kind: "asset" },
  { name: "Trading stock", kind: "asset" },
  { name: "Debtors control", kind: "asset" },
  { name: "Capital", kind: "equity" },
  { name: "Drawings", kind: "equity" },
  { name: "Creditors control", kind: "liability" },
  { name: "Loan", kind: "liability" },
  { name: "Sales", kind: "income" },
  { name: "Rent income", kind: "income" },
  { name: "Cost of sales", kind: "expense" },
  { name: "Wages", kind: "expense" },
  { name: "Telephone", kind: "expense" },
];

const DEFAULT_TX: Tx[] = [
  { date: "1", text: "Owner Zanele deposits capital into the bank", amount: 60_000, dr: "Bank", cr: "Capital" },
  { date: "2", text: "Bought equipment by EFT", amount: 15_000, dr: "Equipment", cr: "Bank" },
  { date: "4", text: "Bought trading stock on credit", amount: 20_000, dr: "Trading stock", cr: "Creditors control" },
  { date: "8", text: "Cash sales of goods (cost price R6 000)", amount: 9_000, dr: "Bank", cr: "Sales" },
  { date: "8", text: "…and the cost of those goods sold", amount: 6_000, dr: "Cost of sales", cr: "Trading stock" },
  { date: "12", text: "Paid wages by EFT", amount: 4_000, dr: "Wages", cr: "Bank" },
  { date: "20", text: "Paid the supplier part of what we owe", amount: 8_000, dr: "Creditors control", cr: "Bank" },
  { date: "25", text: "Received rent from a tenant", amount: 3_500, dr: "Bank", cr: "Rent income" },
  { date: "28", text: "Zanele takes cash for personal use", amount: 2_000, dr: "Drawings", cr: "Bank" },
  { date: "30", text: "Paid the Telkom account", amount: 700, dr: "Telephone", cr: "Bank" },
];

const KIND_COLOUR: Record<Kind, string> = { asset: "var(--t-book)", equity: "var(--t-report)", liability: "var(--t-tax)", income: "var(--t-life)", expense: "var(--t-cost)" };

/**
 * Hands-on double entry: choose the account to debit and the account to
 * credit for each transaction, watch it post to the T-accounts, then balance
 * the accounts and draw up a Trial Balance that (of course) balances.
 */
export function TAccountLab({ transactions = DEFAULT_TX, title = "T-account ledger lab" }: { transactions?: Tx[]; title?: string }) {
  const touch = useToolUse();
  const [i, setI] = useState(0);
  const [dr, setDr] = useState<string | null>(null);
  const [cr, setCr] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "bad">("idle");
  const [tries, setTries] = useState(0);
  const [firstTry, setFirstTry] = useState(0);
  const [showTb, setShowTb] = useState(false);
  const used = useMemo(() => ACCOUNTS.filter((a) => transactions.some((t) => t.dr === a.name || t.cr === a.name)), [transactions]);
  const posted = transactions.slice(0, i);
  const tx = transactions[i];
  const done = i >= transactions.length;

  const post = () => {
    if (!tx || !dr || !cr) return;
    touch();
    if (dr === tx.dr && cr === tx.cr) {
      if (tries === 0) setFirstTry((f) => f + 1);
      setI((n) => n + 1);
      setDr(null);
      setCr(null);
      setTries(0);
      setStatus("idle");
      if (i + 1 === transactions.length) {
        solvePuzzle("t-account-lab", 25);
        celebrate();
      }
    } else {
      setTries((t) => t + 1);
      setStatus("bad");
    }
  };
  const reset = () => { setI(0); setDr(null); setCr(null); setTries(0); setFirstTry(0); setShowTb(false); setStatus("idle"); };

  const balances = used.map((a) => {
    const d = posted.filter((t) => t.dr === a.name).reduce((s, t) => s + t.amount, 0);
    const c = posted.filter((t) => t.cr === a.name).reduce((s, t) => s + t.amount, 0);
    return { ...a, d, c, bal: d - c };
  });
  const tbDr = balances.filter((b) => b.bal > 0).reduce((s, b) => s + b.bal, 0);
  const tbCr = balances.filter((b) => b.bal < 0).reduce((s, b) => s - b.bal, 0);

  const hint = tx ? (() => {
    const k = (n: string) => ACCOUNTS.find((a) => a.name === n)!.kind;
    if (dr && dr !== tx.dr) return `${dr} is not debited here. Debit = the account that INCREASES if it is an asset/expense/drawings, or DECREASES if it is a liability/equity/income.`;
    if (cr && cr !== tx.cr) return `${cr} is not credited here. Think about what the business GAVE (or what increased on the credit side: ${k(tx.cr)}).`;
    return "Check both sides again.";
  })() : "";

  return (
    <WidgetFrame title={title} colour="var(--t-book)" instruction="Pick the account to DEBIT and the account to CREDIT. Correct entries post themselves to the T-accounts below.">
      {!done ? (
        <div className="rounded-2xl border-2 border-line p-4">
          <div className="text-xs font-bold text-muted">Transaction {i + 1}/{transactions.length} · day {tx.date}</div>
          <p className="mt-1 font-display text-lg font-bold">{tx.text}: <span className="font-mono">{rand(tx.amount)}</span></p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {(["Debit", "Credit"] as const).map((side) => {
              const val = side === "Debit" ? dr : cr;
              const set = side === "Debit" ? setDr : setCr;
              return (
                <div key={side}>
                  <div className="mb-1 text-sm font-bold">{side} <span className="font-normal text-muted">({side === "Debit" ? "left" : "right"} side)</span></div>
                  <div className="flex flex-wrap gap-1.5">
                    {ACCOUNTS.map((a) => (
                      <button key={a.name} onClick={() => { set(a.name); setStatus("idle"); }} aria-pressed={val === a.name}
                        className={cn("rounded-lg border-2 px-2 py-1 text-xs font-semibold transition", val === a.name ? "text-white" : "border-line hover:border-brand/50")}
                        style={val === a.name ? { background: KIND_COLOUR[a.kind], borderColor: KIND_COLOUR[a.kind] } : undefined}>
                        {a.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button size="sm" onClick={post} disabled={!dr || !cr}><Check className="h-4 w-4" /> Post entry</Button>
            <span className="text-xs text-muted">Colours: <b style={{ color: KIND_COLOUR.asset }}>asset</b> · <b style={{ color: KIND_COLOUR.equity }}>equity</b> · <b style={{ color: KIND_COLOUR.liability }}>liability</b> · <b style={{ color: KIND_COLOUR.income }}>income</b> · <b style={{ color: KIND_COLOUR.expense }}>expense</b></span>
          </div>
          {status === "bad" && <Explain colour="var(--danger)">{hint}</Explain>}
        </div>
      ) : (
        <div className="rounded-2xl bg-success/10 p-4" role="status">
          <p className="font-display text-lg font-bold">All {transactions.length} entries posted – {firstTry} right first time. 🎉</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setShowTb((s) => !s)}><Scale className="h-4 w-4" /> {showTb ? "Hide" : "Draw up"} the Trial Balance</Button>
            <Button size="sm" variant="secondary" onClick={reset}><RotateCcw className="h-4 w-4" /> Start again</Button>
          </div>
        </div>
      )}

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {balances.map((a) => (
          <div key={a.name} className="overflow-hidden rounded-xl border border-line text-xs">
            <div className="px-2 py-1 text-center font-bold text-white" style={{ background: KIND_COLOUR[a.kind] }}>Dr · {a.name} · Cr</div>
            <div className="grid min-h-16 grid-cols-2 divide-x divide-line font-mono">
              {(["dr", "cr"] as const).map((side) => (
                <ul key={side} className="space-y-0.5 p-1.5">
                  <AnimatePresence>
                    {posted.filter((t) => (side === "dr" ? t.dr : t.cr) === a.name).map((t, k) => (
                      <motion.li key={`${t.date}-${k}-${t.text}`} initial={{ opacity: 0, x: side === "dr" ? -12 : 12 }} animate={{ opacity: 1, x: 0 }} className="flex justify-between gap-1">
                        <span className="text-muted">{t.date}</span><span className="tabular-nums">{rand(t.amount)}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              ))}
            </div>
            {done && (
              <div className="border-t border-line px-2 py-1 text-center font-semibold">
                Balance: {a.bal === 0 ? "nil" : `${rand(Math.abs(a.bal))} ${a.bal > 0 ? "Dr" : "Cr"}`}
              </div>
            )}
          </div>
        ))}
      </div>

      {showTb && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <caption className="mb-1 text-left font-display font-bold">Trial Balance at the end of the month</caption>
            <thead><tr className="border-b border-line text-left"><th className="py-1">Account</th><th className="text-right">Debit</th><th className="text-right">Credit</th></tr></thead>
            <tbody>
              {balances.filter((b) => b.bal !== 0).map((b) => (
                <tr key={b.name} className="border-b border-line/60"><td className="py-1">{b.name}</td><td className="text-right font-mono">{b.bal > 0 ? rand(b.bal) : ""}</td><td className="text-right font-mono">{b.bal < 0 ? rand(-b.bal) : ""}</td></tr>
              ))}
              <tr className="font-bold"><td className="py-1">Totals</td><td className="text-right font-mono underline decoration-double">{rand(tbDr)}</td><td className="text-right font-mono underline decoration-double">{rand(tbCr)}</td></tr>
            </tbody>
          </table>
          <Explain colour="var(--success)">Debits {rand(tbDr)} = Credits {rand(tbCr)}. Because every entry had an equal debit and credit, the Trial Balance <em>must</em> balance. (It doesn&apos;t prove there are no errors though – posting to the wrong account still balances!)</Explain>
        </div>
      )}
    </WidgetFrame>
  );
}

