import type { Grade, Topic, WidgetName } from "@/content/types";

/** Every interactive lab and tool, used by the Toolkit page and the docs. `grades` lists other grades the tool is useful for. */
export const WIDGET_CATALOGUE: { name: WidgetName; title: string; topic: Topic; description: string; grades?: Grade[]; props?: Record<string, unknown> }[] = [
  { name: "formula-sheet", title: "Formula & reference sheet", topic: "g12-analysis", grades: [10, 11, 12], description: "Every ratio formula, statement formats, GAAP principles and the SARS tax tables." },
  // Bookkeeping
  { name: "equation-lab", title: "Accounting equation balance", topic: "g10-equation", grades: [11, 12], description: "Predict the effect of transactions on A = OE + L and watch the scale stay level." },
  { name: "journal-lab", title: "Which journal? Source documents", topic: "g10-journals", description: "Real-looking receipts, invoices, credit notes and vouchers – file each one in the right journal." },
  { name: "t-account-lab", title: "T-account ledger lab", topic: "g10-ledger", grades: [11], description: "Debit and credit ten transactions, watch them post, then draw up a Trial Balance." },
  { name: "statement-builder", title: "Build the financial statements", topic: "g10-statements", grades: [11, 12], description: "Drag Trial Balance accounts into the Income Statement and Balance Sheet – it checks that it balances." },
  // Reporting
  { name: "appropriation-lab", title: "Partnership appropriation", topic: "g11-partnerships", description: "Salaries, interest on capital and the profit-sharing ratio – even when there is a loss." },
  { name: "ratio-lab", title: "Ratio analysis dashboard", topic: "g11-analysis", grades: [12], description: "Every CAPS ratio with a traffic light and an exam-style comment." },
  // Managing resources
  { name: "bank-recon-lab", title: "Bank reconciliation lab", topic: "g10-bank", grades: [11, 12], description: "Tick the journals against the bank statement, update the journals and reconcile." },
  { name: "depreciation-lab", title: "Depreciation & disposal", topic: "g11-fixed-assets", grades: [12], description: "Straight-line vs diminishing balance, carrying value and profit or loss on sale." },
  { name: "inventory-lab", title: "Inventory valuation (FIFO vs weighted average)", topic: "g12-inventory", grades: [10, 11], description: "Stock as coloured layers – see which batches are sold and how closing stock is valued." },
  // Managerial
  { name: "cost-lab", title: "Production cost statement", topic: "g11-cost", grades: [12], description: "Direct materials, direct labour, factory overheads, WIP and cost per unit." },
  { name: "break-even-lab", title: "Break-even lab", topic: "g12-cost", grades: [10], description: "Fixed costs, variable costs and selling price on a live cost–volume–profit chart." },
  { name: "cash-budget-lab", title: "Cash budget lab", topic: "g11-budget", grades: [10, 12], description: "Six months of receipts and payments – collect from debtors in time or hit the overdraft." },
  // Tax
  { name: "vat-lab", title: "VAT lab", topic: "g10-vat", grades: [12], description: "Inclusive ↔ exclusive prices and a mini VAT201 return: output − input VAT." },
  { name: "payslip-lab", title: "Payslip builder", topic: "g10-salaries", grades: [11, 12], description: "Basic, overtime and commission; PAYE, UIF, pension and medical aid; net pay." },
  // Money Life
  { name: "budget-builder", title: "Budget builder (50/30/20)", topic: "life-money", grades: [10, 11, 12], description: "Student, first job or family budgets with pie charts and the 50/30/20 rule." },
  { name: "hustle-sim", title: "Side-hustle simulator", topic: "life-hustle", grades: [10, 11, 12], description: "Run a vetkoek stall, sneaker-cleaning or phone-cover business for five days and keep the books." },
  { name: "tax-calculator", title: "Income tax calculator", topic: "life-tax", grades: [10, 11, 12], description: "SARS brackets, rebates, retirement deductions, medical credits – refund or owe?" },
  { name: "compound-lab", title: "Compound interest lab", topic: "life-saving", grades: [10, 11, 12], description: "Watch savings snowball, start now vs in 10 years, and the effect of inflation." },
  { name: "loan-lab", title: "Credit & loan lab", topic: "life-credit", grades: [10, 11, 12], description: "The real cost of a loan and the credit-card minimum-payment trap." },
  {
    name: "sorter", title: "Assets, liabilities or equity?", topic: "g10-equation", description: "Sort everyday items into the elements of the accounting equation.",
    props: {
      id: "toolkit-elements", title: "Asset, liability or owner's equity?", buckets: ["Asset", "Liability", "Owner's equity"], colour: "var(--t-book)",
      items: [
        { text: "Delivery bakkie", bucket: "Asset" }, { text: "Loan from Absa", bucket: "Liability" }, { text: "Capital", bucket: "Owner's equity" },
        { text: "Money owed by customers (debtors)", bucket: "Asset" }, { text: "Money owed to suppliers (creditors)", bucket: "Liability" }, { text: "Drawings", bucket: "Owner's equity" },
        { text: "Cash in the till", bucket: "Asset" }, { text: "Bank overdraft", bucket: "Liability" }, { text: "Net profit for the year", bucket: "Owner's equity" },
        { text: "Trading stock", bucket: "Asset" },
      ],
    },
  },
  { name: "drill", title: "Endless drill (everything)", topic: "g10-equation", grades: [10, 11, 12], description: "Randomly generated calculations from every topic, with full working." },
];

export const WIDGET_COUNT = new Set(WIDGET_CATALOGUE.map((w) => w.title)).size;
