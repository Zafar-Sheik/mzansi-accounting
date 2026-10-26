"use client";
import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { RotateCcw } from "lucide-react";
import { solvePuzzle } from "@/lib/progress";
import { cn, shuffle } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Explain, celebrate, useToolUse } from "./sim-kit";
import { WidgetFrame } from "./widget-frame";

type Journal = "CRJ" | "CPJ" | "DJ" | "DAJ" | "CJ" | "CAJ" | "PCJ" | "GJ";

const JOURNALS: { id: Journal; name: string }[] = [
  { id: "CRJ", name: "Cash Receipts Journal" },
  { id: "CPJ", name: "Cash Payments Journal" },
  { id: "DJ", name: "Debtors Journal" },
  { id: "DAJ", name: "Debtors Allowances Journal" },
  { id: "CJ", name: "Creditors Journal" },
  { id: "CAJ", name: "Creditors Allowances Journal" },
  { id: "PCJ", name: "Petty Cash Journal" },
  { id: "GJ", name: "General Journal" },
];

interface Doc { kind: string; from: string; to: string; lines: string[]; total: string; journal: Journal; why: string; colour: string }

const DOCS: Doc[] = [
  { kind: "RECEIPT No. 041", from: "Kasi Kicks", to: "Received from: T. Mokoena", lines: ["Settling account"], total: "R1 850,00", journal: "CRJ", why: "A receipt is issued when money comes IN – Cash Receipts Journal.", colour: "#047857" },
  { kind: "CASH REGISTER ROLL", from: "Kasi Kicks till 2", to: "Daily total", lines: ["38 cash sales"], total: "R12 460,00", journal: "CRJ", why: "Cash sales (till slips / cash register roll) are money received – CRJ.", colour: "#047857" },
  { kind: "EFT PAYMENT ADVICE", from: "Kasi Kicks (FNB)", to: "Paid to: Eskom", lines: ["Electricity – March"], total: "R2 300,00", journal: "CPJ", why: "Money going OUT of the bank – Cash Payments Journal.", colour: "#c2410c" },
  { kind: "CHEQUE COUNTERFOIL 0087", from: "Kasi Kicks", to: "Pay: Landlord (Pty) Ltd", lines: ["Rent – April"], total: "R8 000,00", journal: "CPJ", why: "Cheque counterfoils and EFT payment slips are payments – CPJ.", colour: "#c2410c" },
  { kind: "DUPLICATE INVOICE No. 112", from: "Kasi Kicks (seller)", to: "Sold to: Soweto High School (on credit)", lines: ["20 × school shoes @ R450"], total: "R9 000,00", journal: "DJ", why: "We SOLD on credit and kept the duplicate (copy) invoice – Debtors Journal.", colour: "#0e7490" },
  { kind: "DUPLICATE CREDIT NOTE No. 9", from: "Kasi Kicks", to: "To: Soweto High School", lines: ["2 pairs returned – wrong size"], total: "R900,00", journal: "DAJ", why: "We issued a credit note because a DEBTOR returned goods – Debtors Allowances Journal.", colour: "#6d28d9" },
  { kind: "ORIGINAL INVOICE No. A-5521", from: "From: Shoe Wholesalers Ltd", to: "To: Kasi Kicks (on credit)", lines: ["100 pairs sneakers @ R300"], total: "R30 000,00", journal: "CJ", why: "We BOUGHT on credit and received the original invoice – Creditors Journal.", colour: "#be185d" },
  { kind: "DUPLICATE DEBIT NOTE No. 4", from: "Kasi Kicks", to: "To: Shoe Wholesalers Ltd", lines: ["5 damaged pairs returned"], total: "R1 500,00", journal: "CAJ", why: "We returned goods to a CREDITOR (debit note issued) – Creditors Allowances Journal.", colour: "#a16207" },
  { kind: "PETTY CASH VOUCHER No. 17", from: "Petty cashier", to: "Paid to: Spar", lines: ["Milk and tea for staff"], total: "R65,00", journal: "PCJ", why: "Small cash payments from the petty cash tin – Petty Cash Journal.", colour: "#64748b" },
  { kind: "JOURNAL VOUCHER No. 3", from: "Owner's instruction", to: "Owner takes stock for own use", lines: ["2 pairs at cost"], total: "R600,00", journal: "GJ", why: "No cash, no credit sale/purchase – an internal transaction on a journal voucher goes to the General Journal.", colour: "#334155" },
  { kind: "BANK STATEMENT LINE", from: "FNB statement", to: "Service fees", lines: ["Monthly account fee"], total: "R185,00", journal: "CPJ", why: "Bank charges reduce the bank balance – record them in the CPJ when you see the bank statement.", colour: "#c2410c" },
  { kind: "BANK STATEMENT LINE", from: "FNB statement", to: "Interest on credit balance", lines: ["Interest earned"], total: "R42,00", journal: "CRJ", why: "Interest earned increases the bank balance – CRJ.", colour: "#047857" },
];

/**
 * Real-looking source documents: decide which journal each one is recorded in.
 * The document type (receipt, duplicate invoice, original invoice, credit
 * note…) is the clue – exactly how a bookkeeper works.
 */
export function JournalLab({ title = "Which journal? Source-document sorter" }: { title?: string }) {
  const touch = useToolUse();
  const [round, setRound] = useState(0);
  const deck = useMemo(() => shuffle(DOCS, `journal-${round}`), [round]);
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<Journal | null>(null);
  const [score, setScore] = useState(0);
  const doc = deck[i];
  const done = i >= deck.length;

  const choose = (j: Journal) => {
    if (picked) return;
    touch();
    setPicked(j);
    if (j === doc.journal) setScore((s) => s + 1);
  };
  const next = () => {
    setPicked(null);
    setI((n) => n + 1);
    if (i + 1 === deck.length && score >= deck.length - 2) {
      solvePuzzle("journal-lab", 20);
      celebrate();
    }
  };

  return (
    <WidgetFrame title={title} colour="var(--t-book)" instruction="Read the source document, then post it to the right journal. The type of document is your biggest clue.">
      {!done ? (
        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <motion.div key={`${round}-${i}`} initial={{ rotate: -3, y: 20, opacity: 0 }} animate={{ rotate: -1, y: 0, opacity: 1 }}
            className="relative rounded-md border border-line bg-[#fffdf5] p-4 font-mono text-sm text-[#1f2937] shadow-lg dark:bg-[#fdf8e7]">
            <div className="absolute top-0 left-0 h-full w-1.5 rounded-l-md" style={{ background: doc.colour }} />
            <div className="text-xs font-bold tracking-wider" style={{ color: doc.colour }}>{doc.kind}</div>
            <div className="mt-2 text-xs">{doc.from}</div>
            <div className="text-xs">{doc.to}</div>
            <div className="my-2 border-y border-dashed border-gray-400 py-2">{doc.lines.map((l) => <div key={l}>{l}</div>)}</div>
            <div className="flex justify-between font-bold"><span>TOTAL</span><span>{doc.total}</span></div>
            <div className="mt-2 text-right text-[10px] text-gray-500">Document {i + 1} of {deck.length}</div>
          </motion.div>
          <div>
            <div className="grid grid-cols-2 gap-2">
              {JOURNALS.map((j) => {
                const right = picked && j.id === doc.journal;
                const wrong = picked === j.id && j.id !== doc.journal;
                return (
                  <button key={j.id} onClick={() => choose(j.id)} disabled={!!picked}
                    className={cn("rounded-xl border-2 p-2 text-left transition", right ? "border-success bg-success/15" : wrong ? "border-danger bg-danger/10" : "border-line hover:border-brand/60")}>
                    <div className="font-mono text-sm font-bold">{j.id}</div>
                    <div className="text-xs text-muted">{j.name}</div>
                  </button>
                );
              })}
            </div>
            {picked && (
              <>
                <Explain colour={picked === doc.journal ? "var(--success)" : "var(--danger)"}><strong>{picked === doc.journal ? "Correct! " : `It's the ${doc.journal}. `}</strong>{doc.why}</Explain>
                <Button size="sm" className="mt-2" onClick={next}>Next document →</Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-success/10 p-4 text-center" role="status">
          <div className="text-3xl">🗂️</div>
          <p className="font-display text-xl font-bold">{score}/{deck.length} documents filed correctly</p>
          <p className="text-sm text-muted">Receipts in → CRJ · payments out → CPJ · credit sales → DJ · credit purchases → CJ · returns → DAJ/CAJ · small cash → PCJ · everything else → GJ</p>
          <Button size="sm" variant="secondary" className="mt-2" onClick={() => { setRound((r) => r + 1); setI(0); setScore(0); setPicked(null); }}><RotateCcw className="h-4 w-4" /> Shuffle &amp; play again</Button>
        </div>
      )}
    </WidgetFrame>
  );
}
