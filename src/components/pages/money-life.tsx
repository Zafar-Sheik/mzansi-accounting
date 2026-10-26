"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import type { Topic, WidgetName } from "@/content/types";
import { useProgress } from "@/lib/progress";
import { cn } from "@/lib/utils";
import { GlowCard } from "@/components/aceternity/glow-card";
import { Widget } from "@/components/widgets";

interface LifeTopic { topic: Topic; title: string; emoji: string; blurb: string; lessons: { slug: string; title: string; tagline: string; minutes: number }[] }

const TOOLS: { name: WidgetName; label: string; props?: Record<string, unknown> }[] = [
  { name: "budget-builder", label: "💰 Budget builder" },
  { name: "tax-calculator", label: "🧮 Tax calculator" },
  { name: "payslip-lab", label: "💵 Payslip builder" },
  { name: "hustle-sim", label: "🚀 Side-hustle simulator" },
  { name: "compound-lab", label: "🌱 Compound interest" },
  { name: "loan-lab", label: "🪤 Credit & loans" },
];

const CHECKLIST = [
  "I know my take-home pay and have a written budget",
  "I save something on payday – before I spend",
  "I have (or am building) an emergency fund",
  "I check my bank statement every month",
  "I never share PINs, passwords or OTPs",
  "I know my tax number and where my IRP5 is",
  "I pay every account on time",
  "I know the difference between a need and a want",
];

/** The Money Life hub: life-skills lessons, the best calculators, and a personal checklist. */
export function MoneyLife({ topics }: { topics: LifeTopic[] }) {
  const progress = useProgress();
  const [tool, setTool] = useState<WidgetName>("budget-builder");
  const [ticks, setTicks] = useState<boolean[]>(() => CHECKLIST.map(() => false));
  const current = TOOLS.find((t) => t.name === tool)!;
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="rounded-[2rem] border border-line bg-gradient-to-br from-life/20 via-surface to-book/10 p-8 md:p-12">
        <p className="text-sm font-bold tracking-wider text-life uppercase">Money Life · accounting for real life</p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight md:text-5xl">The money stuff nobody teaches you</h1>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Budgets, bank fees and scams, side hustles, your first payslip, store cards and loans, investing, <strong className="text-fg">doing your own taxes</strong> and the big decisions of adulting.
          Every lesson uses the accounting you learn for the exam – applied to <em>your</em> life.
        </p>
      </div>

      <h2 className="mt-10 font-display text-2xl font-bold">Lessons</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {topics.flatMap((t) => t.lessons.map((l) => {
          const done = Boolean(progress.completedLessons[l.slug]);
          return (
            <Link key={l.slug} href={`/learn/${l.slug}`} className="group">
              <GlowCard colour="var(--t-life)" className="h-full p-5 transition group-hover:-translate-y-0.5">
                <div className="flex items-center justify-between text-xs"><span className="font-bold text-life">{t.title}</span>{done && <span className="flex items-center gap-1 font-bold text-success"><CheckCircle2 className="h-4 w-4" /> Done</span>}</div>
                <div className="mt-2 text-3xl">{t.emoji}</div>
                <h3 className="mt-1 font-display text-lg leading-tight font-bold">{l.title}</h3>
                <p className="mt-1 text-sm text-muted">{l.tagline}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted"><Clock className="h-3.5 w-3.5" /> {l.minutes} min <ArrowRight className="ml-auto h-4 w-4 text-life transition group-hover:translate-x-1" /></div>
              </GlowCard>
            </Link>
          );
        }))}
      </div>

      <h2 className="mt-12 font-display text-2xl font-bold">Calculators &amp; simulators</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {TOOLS.map((t) => (
          <button key={t.name} onClick={() => setTool(t.name)} aria-pressed={tool === t.name} className={cn("rounded-xl border-2 px-3 py-1.5 text-sm font-semibold transition", tool === t.name ? "border-life bg-life text-white" : "border-line hover:border-life/50")}>{t.label}</button>
        ))}
      </div>
      <div className="mt-4" key={tool}><Widget name={current.name} props={current.props} /></div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-surface p-6">
          <h2 className="font-display text-2xl font-bold">My money checklist</h2>
          <p className="text-sm text-muted">Tick what&apos;s true for you today. (Nothing is saved or sent anywhere.)</p>
          <ul className="mt-3 space-y-2">
            {CHECKLIST.map((c, k) => (
              <li key={c}>
                <button onClick={() => setTicks((t) => t.map((x, i) => (i === k ? !x : x)))} aria-pressed={ticks[k]} className={cn("flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm transition", ticks[k] ? "border-success/50 bg-success/10" : "border-line hover:border-life/50")}>
                  <span className={cn("grid h-6 w-6 shrink-0 place-items-center rounded-md border-2", ticks[k] ? "border-success bg-success text-white" : "border-line")}>{ticks[k] ? "✓" : ""}</span>{c}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 font-display font-bold">{ticks.filter(Boolean).length}/{CHECKLIST.length} – {ticks.filter(Boolean).length >= 6 ? "you're running your money like an accountant 🏆" : "every tick is a skill in the lessons above 💪"}</p>
        </div>
        <div className="rounded-3xl border border-line bg-surface p-6">
          <h2 className="font-display text-2xl font-bold">Where it connects to CAPS</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              ["Your budget", "Gr 10 & 11 budgeting and cash budgets"],
              ["Your bank statement", "Gr 10 bank reconciliation"],
              ["Your side hustle", "Gr 10 accounting equation, journals, cost and mark-up"],
              ["Your payslip", "Gr 10 salaries and wages – PAYE, UIF, deductions"],
              ["Your car", "Gr 11 fixed assets and depreciation"],
              ["Store cards & loans", "Liabilities, interest expense, debt-equity ratio"],
              ["Investing", "Gr 12 shares, dividends, EPS and returns"],
              ["Your tax return", "Gr 10 & 12 tax and VAT"],
            ].map(([a, b]) => <li key={a} className="flex gap-2 rounded-xl bg-surface-2 p-3"><strong className="w-40 shrink-0">{a}</strong><span className="text-muted">{b}</span></li>)}
          </ul>
          <p className="mt-3 text-xs text-muted">Tax figures use the SARS 2025/26 tables for learning. Rules change every Budget Speech – always check www.sars.gov.za before you file.</p>
        </div>
      </div>
    </div>
  );
}
