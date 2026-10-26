"use client";
import dynamic from "next/dynamic";
import type { WidgetName } from "@/content/types";

const loading = () => <div className="h-64 animate-pulse rounded-2xl border border-line bg-surface-2" />;

/** Widgets are code-split so each lesson only downloads what it uses. */
const REGISTRY: Record<WidgetName, React.ComponentType<Record<string, unknown>>> = {
  sorter: dynamic(() => import("./sorter").then((m) => m.Sorter as never), { loading }),
  drill: dynamic(() => import("./drill").then((m) => m.Drill as never), { loading }),
  "equation-lab": dynamic(() => import("./equation-lab").then((m) => m.EquationLab as never), { loading }),
  "t-account-lab": dynamic(() => import("./t-account-lab").then((m) => m.TAccountLab as never), { loading }),
  "journal-lab": dynamic(() => import("./journal-lab").then((m) => m.JournalLab as never), { loading }),
  "statement-builder": dynamic(() => import("./statement-builder").then((m) => m.StatementBuilder as never), { loading }),
  "vat-lab": dynamic(() => import("./vat-lab").then((m) => m.VatLab as never), { loading }),
  "payslip-lab": dynamic(() => import("./payslip-lab").then((m) => m.PayslipLab as never), { loading }),
  "tax-calculator": dynamic(() => import("./tax-calculator").then((m) => m.TaxCalculator as never), { loading }),
  "budget-builder": dynamic(() => import("./budget-builder").then((m) => m.BudgetBuilder as never), { loading }),
  "compound-lab": dynamic(() => import("./compound-lab").then((m) => m.CompoundLab as never), { loading }),
  "loan-lab": dynamic(() => import("./loan-lab").then((m) => m.LoanLab as never), { loading }),
  "depreciation-lab": dynamic(() => import("./depreciation-lab").then((m) => m.DepreciationLab as never), { loading }),
  "break-even-lab": dynamic(() => import("./break-even-lab").then((m) => m.BreakEvenLab as never), { loading }),
  "cost-lab": dynamic(() => import("./cost-lab").then((m) => m.CostLab as never), { loading }),
  "ratio-lab": dynamic(() => import("./ratio-lab").then((m) => m.RatioLab as never), { loading }),
  "inventory-lab": dynamic(() => import("./inventory-lab").then((m) => m.InventoryLab as never), { loading }),
  "bank-recon-lab": dynamic(() => import("./bank-recon-lab").then((m) => m.BankReconLab as never), { loading }),
  "cash-budget-lab": dynamic(() => import("./cash-budget-lab").then((m) => m.CashBudgetLab as never), { loading }),
  "appropriation-lab": dynamic(() => import("./appropriation-lab").then((m) => m.AppropriationLab as never), { loading }),
  "hustle-sim": dynamic(() => import("./hustle-sim").then((m) => m.HustleSim as never), { loading }),
  "formula-sheet": dynamic(() => import("./formula-sheet").then((m) => m.FormulaSheet as never), { loading }),
};

export function Widget({ name, props }: { name: WidgetName; props?: Record<string, unknown> }) {
  const C = REGISTRY[name];
  if (!C) return <p className="text-danger">Unknown widget: {name}</p>;
  return <C {...(props ?? {})} />;
}
