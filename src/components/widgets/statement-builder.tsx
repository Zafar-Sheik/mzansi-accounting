"use client";
import { useMemo, useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { Check, RotateCcw } from "lucide-react";
import { solvePuzzle } from "@/lib/progress";
import { cn, shuffle } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Explain, celebrate, rand, useToolUse } from "./sim-kit";
import { WidgetFrame } from "./widget-frame";

type Section = "sales" | "cos" | "other-income" | "expenses" | "nca" | "ca" | "equity" | "ncl" | "cl";

const SECTIONS: { id: Section; name: string; statement: "IS" | "BS" }[] = [
  { id: "sales", name: "Sales", statement: "IS" },
  { id: "cos", name: "Cost of sales", statement: "IS" },
  { id: "other-income", name: "Other operating income", statement: "IS" },
  { id: "expenses", name: "Operating expenses", statement: "IS" },
  { id: "nca", name: "Non-current assets", statement: "BS" },
  { id: "ca", name: "Current assets", statement: "BS" },
  { id: "equity", name: "Owner's equity", statement: "BS" },
  { id: "ncl", name: "Non-current liabilities", statement: "BS" },
  { id: "cl", name: "Current liabilities", statement: "BS" },
];

interface Card { name: string; amount: number; section: Section; sign?: -1 }

const DEFAULT_CARDS: Card[] = [
  { name: "Sales", amount: 400_000, section: "sales" },
  { name: "Cost of sales", amount: 250_000, section: "cos" },
  { name: "Rent income", amount: 12_000, section: "other-income" },
  { name: "Salaries", amount: 70_000, section: "expenses" },
  { name: "Rent expense", amount: 36_000, section: "expenses" },
  { name: "Water & electricity", amount: 9_000, section: "expenses" },
  { name: "Advertising", amount: 6_000, section: "expenses" },
  { name: "Equipment", amount: 80_000, section: "nca" },
  { name: "Vehicles", amount: 120_000, section: "nca" },
  { name: "Trading stock", amount: 40_000, section: "ca" },
  { name: "Debtors control", amount: 25_000, section: "ca" },
  { name: "Bank", amount: 28_000, section: "ca" },
  { name: "Capital", amount: 200_000, section: "equity" },
  { name: "Drawings", amount: 30_000, section: "equity", sign: -1 },
  { name: "Loan: Mzansi Bank (5 years)", amount: 60_000, section: "ncl" },
  { name: "Creditors control", amount: 22_000, section: "cl" },
];

function DraggableCard({ card, selected, onSelect, placedWrong }: { card: Card; selected: boolean; onSelect: () => void; placedWrong?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: card.name });
  return (
    <button ref={setNodeRef} {...listeners} {...attributes} onClick={onSelect} aria-pressed={selected}
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
      className={cn("touch-none rounded-lg border-2 px-2 py-1 text-left text-xs font-semibold shadow-sm transition", isDragging ? "z-50 scale-105 shadow-xl" : "", selected ? "border-brand bg-brand-soft text-brand" : placedWrong ? "border-danger bg-danger/10" : "border-line bg-surface hover:border-brand/50")}>
      {card.name} <span className="font-mono font-normal text-muted">{rand(card.amount)}</span>
    </button>
  );
}

function Drop({ id, name, children, active, onClick, total }: { id: Section; name: string; children: React.ReactNode; active: boolean; onClick: () => void; total: number }) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={cn("rounded-xl border-2 border-dashed p-2 transition", isOver ? "border-brand bg-brand-soft/50" : active ? "border-brand/50" : "border-line")}>
      <button onClick={onClick} className="mb-1 flex w-full items-center justify-between text-left text-xs font-bold">
        <span>{name}{active && <span className="ml-1 font-normal text-brand">← tap to drop</span>}</span>
        <span className="font-mono">{total ? rand(total) : ""}</span>
      </button>
      <div className="flex min-h-7 flex-wrap gap-1">{children}</div>
    </div>
  );
}

/**
 * Drag each Trial Balance account into the right section of the Income
 * Statement or Balance Sheet (or tap a card, then tap a section). The app
 * works out gross profit, net profit and checks that the Balance Sheet balances.
 */
export function StatementBuilder({ cards = DEFAULT_CARDS, title = "Build the financial statements" }: { cards?: Card[]; title?: string }) {
  const touch = useToolUse();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }), useSensor(KeyboardSensor));
  const [round, setRound] = useState(0);
  const deck = useMemo(() => shuffle(cards, `sb-${round}`), [cards, round]);
  const [placed, setPlaced] = useState<Record<string, Section>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const place = (name: string, s: Section) => { touch(); setPlaced((p) => ({ ...p, [name]: s })); setSel(null); setChecked(false); };
  const onDragEnd = (e: DragEndEvent) => { if (e.over) place(String(e.active.id), e.over.id as Section); };
  const unplaced = deck.filter((c) => !placed[c.name]);
  const inSection = (s: Section) => deck.filter((c) => placed[c.name] === s);
  const sum = (s: Section) => inSection(s).reduce((t, c) => t + c.amount * (c.sign ?? 1), 0);

  const gp = sum("sales") - sum("cos");
  const np = gp + sum("other-income") - sum("expenses");
  const equity = sum("equity") + np;
  const assets = sum("nca") + sum("ca");
  const eqLiab = equity + sum("ncl") + sum("cl");
  const correct = deck.filter((c) => placed[c.name] === c.section).length;
  const allPlaced = unplaced.length === 0;

  const check = () => {
    setChecked(true);
    if (correct === deck.length) { solvePuzzle("statement-builder", 25); celebrate(); }
  };

  return (
    <WidgetFrame title={title} colour="var(--t-report)" instruction="Drag each account into its section – or tap a card, then tap the section. Then press Check.">
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="flex min-h-10 flex-wrap gap-1.5 rounded-xl bg-surface-2/60 p-2" aria-label="Trial Balance accounts">
          {unplaced.length === 0 ? <span className="text-xs text-muted">Every account is placed.</span> : unplaced.map((c) => <DraggableCard key={c.name} card={c} selected={sel === c.name} onSelect={() => setSel(sel === c.name ? null : c.name)} />)}
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          {(["IS", "BS"] as const).map((st) => (
            <div key={st} className="rounded-2xl border border-line p-3">
              <h4 className="mb-2 font-display font-bold">{st === "IS" ? "Income Statement" : "Balance Sheet"}</h4>
              <div className="space-y-2">
                {SECTIONS.filter((s) => s.statement === st).map((s) => (
                  <Drop key={s.id} id={s.id} name={s.name} active={!!sel} total={sum(s.id)} onClick={() => sel && place(sel, s.id)}>
                    {inSection(s.id).map((c) => <DraggableCard key={c.name} card={c} selected={sel === c.name} onSelect={() => setSel(sel === c.name ? null : c.name)} placedWrong={checked && c.section !== s.id} />)}
                  </Drop>
                ))}
              </div>
              {st === "IS" ? (
                <dl className="mt-2 space-y-0.5 text-sm">
                  <div className="flex justify-between"><dt>Gross profit</dt><dd className="font-mono font-bold">{rand(gp)}</dd></div>
                  <div className="flex justify-between"><dt>Net profit</dt><dd className="font-mono font-bold">{rand(np)}</dd></div>
                </dl>
              ) : (
                <dl className="mt-2 space-y-0.5 text-sm">
                  <div className="flex justify-between"><dt>Total assets</dt><dd className="font-mono font-bold">{rand(assets)}</dd></div>
                  <div className="flex justify-between"><dt>Equity (incl. net profit) + liabilities</dt><dd className="font-mono font-bold">{rand(eqLiab)}</dd></div>
                </dl>
              )}
            </div>
          ))}
        </div>
      </DndContext>
      <div className="mt-3 flex gap-2">
        <Button size="sm" onClick={check} disabled={!allPlaced}><Check className="h-4 w-4" /> Check</Button>
        <Button size="sm" variant="secondary" onClick={() => { setPlaced({}); setChecked(false); setRound((r) => r + 1); }}><RotateCcw className="h-4 w-4" /> Reset</Button>
      </div>
      {checked && (
        <Explain colour={correct === deck.length ? "var(--success)" : "var(--danger)"}>
          <strong>{correct}/{deck.length} in the right place.</strong>{" "}
          {correct === deck.length
            ? `The Balance Sheet balances: ${rand(assets)} = ${rand(eqLiab)}. Net profit (${rand(np)}) is added to capital and drawings are subtracted – that is how the Income Statement links to the Balance Sheet.`
            : "Red cards are in the wrong section. Tip: income & expenses → Income Statement; assets, equity & liabilities → Balance Sheet. A loan payable over more than 12 months is non-current."}
        </Explain>
      )}
    </WidgetFrame>
  );
}
