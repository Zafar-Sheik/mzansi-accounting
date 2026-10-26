import type { Metadata } from "next";
import { Toolkit } from "@/components/pages/toolkit";

export const metadata: Metadata = { title: "Hands-on labs", description: "Interactive accounting labs: the accounting equation scale, T-accounts, source documents, statement builder, VAT, payslips, tax calculator, budgets, compound interest, loans, depreciation, break-even, ratios, inventory, bank reconciliation, cash budgets and a side-hustle simulator." };

export default function ToolkitPage() {
  return <Toolkit />;
}
