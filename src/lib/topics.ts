import type { Grade, Paper, Strand, Topic } from "@/content/types";

/** Every knowledge area has ONE colour across the whole site (see docs/06-design-system.md). */
export const STRANDS: { strand: Strand; colour: string; emoji: string; slug: string; short: string; blurb: string }[] = [
  { strand: "Bookkeeping", colour: "var(--t-book)", emoji: "📒", slug: "bookkeeping", short: "Bookkeeping", blurb: "The accounting equation, source documents, journals, the General Ledger, the Trial Balance and company ledger accounts." },
  { strand: "Financial Reporting", colour: "var(--t-report)", emoji: "📊", slug: "reporting", short: "Reporting", blurb: "Year-end adjustments, financial statements of sole traders, partnerships, clubs and companies, cash flow and ratio analysis." },
  { strand: "Managerial Accounting", colour: "var(--t-cost)", emoji: "🏭", slug: "managerial", short: "Managerial", blurb: "Cost accounting for manufacturers, break-even analysis, cash budgets and projected income statements." },
  { strand: "Managing Resources", colour: "var(--t-control)", emoji: "🛡️", slug: "resources", short: "Resources", blurb: "Ethics, internal control, reconciliations, fixed assets, inventory systems and valuation, audit and corporate governance." },
  { strand: "Tax, VAT & Payroll", colour: "var(--t-tax)", emoji: "🧾", slug: "tax", short: "Tax & VAT", blurb: "Salaries and wages, PAYE, UIF and SDL, and Value-Added Tax – how businesses collect and pay tax to SARS." },
  { strand: "Money Life", colour: "var(--t-life)", emoji: "💸", slug: "money-life", short: "Money Life", blurb: "Accounting for real life: budgets, banking, side hustles, payslips, credit, saving and investing, filing your own tax return and adulting." },
];

export interface TopicMeta {
  topic: Topic;
  grade: Grade;
  strand: Strand;
  title: string;
  emoji: string;
  slug: string;
  blurb: string;
  colour: string;
  /** 1 or 2 for CAPS topics; 0 for Money Life (life skills – not in the exam). */
  paper: Paper;
}

const T = (topic: Topic, grade: Grade, strand: Strand, paper: Paper, title: string, emoji: string, blurb: string): TopicMeta => {
  const s = STRANDS.find((x) => x.strand === strand)!;
  return { topic, grade, strand, title, emoji, slug: topic, blurb, colour: s.colour, paper };
};

/** All CAPS Grade 10, 11 & 12 Accounting topics (in teaching order), followed by the Money Life track. */
export const TOPICS: TopicMeta[] = [
  // ------------------------------------------------------------- Grade 10
  T("g10-concepts", 10, "Bookkeeping", 1, "Accounting Concepts & GAAP", "💡", "What accounting is, who uses it, the forms of ownership, and the GAAP principles that keep everyone honest."),
  T("g10-equation", 10, "Bookkeeping", 1, "The Accounting Equation", "⚖️", "Assets = Owner's equity + Liabilities, and how every transaction keeps the scale balanced."),
  T("g10-journals", 10, "Bookkeeping", 1, "Source Documents & Journals", "🗂️", "Receipts, invoices, cheques and credit notes – and the CRJ, CPJ, DJ, CJ, DAJ, CAJ, petty cash and General Journal."),
  T("g10-ledger", 10, "Bookkeeping", 1, "General Ledger & Trial Balance", "📒", "Double entry, posting to T-accounts, balancing accounts, the debtors' and creditors' ledgers, and the Trial Balance."),
  T("g10-statements", 10, "Financial Reporting", 1, "Financial Statements of a Sole Trader", "📄", "Closing transfers, the Income Statement, the Balance Sheet and the first year-end adjustments."),
  T("g10-salaries", 10, "Tax, VAT & Payroll", 2, "Salaries & Wages", "💼", "Gross and net pay, deductions and contributions, the salaries journal and the wages journal."),
  T("g10-vat", 10, "Tax, VAT & Payroll", 2, "Value-Added Tax (VAT)", "🧾", "Input and output VAT, VAT-inclusive and exclusive prices, zero-rated and exempt items, and VAT payable to SARS."),
  T("g10-bank", 10, "Managing Resources", 2, "Bank Reconciliation", "🏦", "Comparing the cash journals with the bank statement: outstanding items, errors and the reconciliation statement."),
  T("g10-ethics", 10, "Managing Resources", 2, "Ethics & Internal Control", "🛡️", "Ethical behaviour, the professional bodies, and internal controls that protect cash and stock."),
  T("g10-cost", 10, "Managerial Accounting", 2, "Cost Accounting Basics", "🏷️", "Fixed and variable costs, direct and indirect costs, cost price, mark-up and selling price."),
  T("g10-budget", 10, "Managerial Accounting", 2, "Budgeting Basics", "🗓️", "Personal and business budgets, budgeted vs actual figures, and why budgets matter."),
  T("g10-inventory", 10, "Managing Resources", 2, "Inventory Systems", "📦", "The perpetual and periodic inventory systems, cost of sales and stock control."),
  // ------------------------------------------------------------- Grade 11
  T("g11-adjustments", 11, "Financial Reporting", 1, "Year-end Adjustments & Final Accounts", "🔧", "Accruals, prepayments, depreciation, bad debts, provision for bad debts, inventory deficits – and the financial statements."),
  T("g11-partnerships", 11, "Financial Reporting", 1, "Partnerships", "🤝", "Capital and current accounts, the appropriation account, partners' salaries, interest on capital and the profit-sharing ratio."),
  T("g11-clubs", 11, "Financial Reporting", 1, "Clubs (Non-profit Organisations)", "⚽", "Membership fees, the Receipts and Payments Account, the Income and Expenditure Statement and accumulated funds."),
  T("g11-fixed-assets", 11, "Managing Resources", 1, "Fixed Assets & Depreciation", "🚚", "Cost price, the straight-line and diminishing-balance methods, the asset disposal account and the fixed asset note."),
  T("g11-analysis", 11, "Financial Reporting", 1, "Analysis & Interpretation", "🔍", "Profitability, liquidity, solvency and return ratios – and what they tell the owner."),
  T("g11-reconciliations", 11, "Managing Resources", 2, "Debtors & Creditors Reconciliations", "🔁", "Reconciling the debtors' list with the control account, and a creditor's statement with the creditors' ledger."),
  T("g11-cost", 11, "Managerial Accounting", 2, "Manufacturing Cost Accounting", "🏭", "Direct materials, direct labour, factory overheads, the Production Cost Statement and cost per unit."),
  T("g11-budget", 11, "Managerial Accounting", 2, "Cash Budgets", "💰", "Projected receipts and payments, debtors' collection schedules and comments on a budget."),
  // ------------------------------------------------------------- Grade 12
  T("g12-companies", 12, "Bookkeeping", 1, "Companies: Concepts & Ledger", "🏢", "Companies Act, shares and shareholders, ordinary share capital, share buy-backs, retained income, income tax and dividends."),
  T("g12-statements", 12, "Financial Reporting", 1, "Company Financial Statements", "📑", "The Income Statement, Balance Sheet and notes of a company, including adjustments and the audit report."),
  T("g12-cash-flow", 12, "Financial Reporting", 1, "Cash Flow Statement", "🌊", "Cash from operating, investing and financing activities, and the net change in cash and cash equivalents."),
  T("g12-analysis", 12, "Financial Reporting", 1, "Analysis of Company Statements", "📈", "EPS, DPS, NAV, returns, liquidity and solvency ratios, share prices and dividend policy."),
  T("g12-audit", 12, "Managing Resources", 1, "Audit, Ethics & Governance", "⚖️", "Independent audit, the audit report, the King Code, directors' remuneration and corporate governance."),
  T("g12-reconciliations", 12, "Managing Resources", 2, "Reconciliations", "🔁", "Bank, debtors and creditors reconciliations at matric level, with internal-control comments."),
  T("g12-vat", 12, "Tax, VAT & Payroll", 2, "VAT at Matric Level", "🧾", "VAT calculations, the VAT control account, bad debts and drawings, and ethical problems with VAT."),
  T("g12-cost", 12, "Managerial Accounting", 2, "Cost Accounting & Break-even", "🎯", "Production cost statements, unit costs, fixed and variable costs, the break-even point and problem-solving."),
  T("g12-budget", 12, "Managerial Accounting", 2, "Budgeting & Projected Statements", "🗓️", "Cash budgets, projected income statements, variances and internal control over budgets."),
  T("g12-inventory", 12, "Managing Resources", 2, "Inventory Valuation", "📦", "FIFO, weighted average and specific identification, stock-holding period and inventory turnover."),
  // ------------------------------------------------------------- Money Life (accounting for real life)
  T("life-money", 10, "Money Life", 0, "Your Money Plan", "🧠", "Needs vs wants, the 50/30/20 rule, tracking your spending and building a budget that actually works."),
  T("life-banking", 10, "Money Life", 0, "Banking, Cards & Scams", "💳", "Choosing a bank account, fees, debit vs credit cards, EFTs, and spotting scams before they get you."),
  T("life-hustle", 10, "Money Life", 0, "Start a Side Hustle", "🚀", "Pricing, costs, profit, keeping a cash book, invoices and quotes – run a small business like an accountant."),
  T("life-payslip", 11, "Money Life", 0, "Your First Payslip", "💵", "Gross vs net pay, PAYE, UIF, medical aid and pension, your IRP5 and employment contracts."),
  T("life-credit", 11, "Money Life", 0, "Credit, Debt & Interest", "🪤", "How interest works, credit scores, store cards, personal loans, the debt trap and your rights under the NCA."),
  T("life-saving", 11, "Money Life", 0, "Saving & Investing", "🌱", "Emergency funds, compound growth, inflation, tax-free savings accounts, unit trusts and ETFs."),
  T("life-tax", 12, "Money Life", 0, "Doing Your Own Taxes", "🧮", "SARS, tax numbers, tax brackets and rebates, deductions, medical credits and filing on eFiling, step by step."),
  T("life-adulting", 12, "Money Life", 0, "Adulting 101", "🏠", "Renting a flat, buying a car, insurance, retirement savings (two-pot), wills and planning your first year of work."),
];

export function topicMeta(t: Topic): TopicMeta {
  return TOPICS.find((x) => x.topic === t)!;
}

export function strandMeta(s: Strand) {
  return STRANDS.find((x) => x.strand === s)!;
}

export function paperLabel(p: Paper) {
  return p === 1 ? "Paper 1 · Financial Accounting" : p === 2 ? "Paper 2 · Managerial & Resources" : "Money Life · for real life";
}

export function paperShort(p: Paper) {
  return p === 1 ? "Paper 1" : p === 2 ? "Paper 2" : "Money Life";
}

/** Short label used on chips, e.g. "Gr 11 · Partnerships" or "Money Life · Your First Payslip". */
export function topicLabel(t: Topic) {
  const m = topicMeta(t);
  return m.paper === 0 ? `Money Life · ${m.title}` : `Gr ${m.grade} · ${m.title}`;
}

/** True for the Money Life (adulting) topics. */
export const isLife = (t: Topic) => t.startsWith("life-");

/**
 * Approximate final-exam mark allocation per paper (DBE examination
 * guidelines; figures are approximate and change from year to year).
 */
export const PAPER_INFO: Record<Grade, Record<1 | 2, { title: string; duration: string; marks: number; sections: { name: string; marks: number }[] }>> = {
  10: {
    1: {
      title: "Paper 1 – Financial Accounting",
      duration: "2 hours",
      marks: 150,
      sections: [
        { name: "Concepts & the accounting equation", marks: 30 },
        { name: "Journals, ledger & trial balance", marks: 70 },
        { name: "Financial statements", marks: 50 },
      ],
    },
    2: {
      title: "Paper 2 – Managerial Accounting & Managing Resources",
      duration: "2 hours",
      marks: 150,
      sections: [
        { name: "Salaries, wages & VAT", marks: 45 },
        { name: "Bank reconciliation & internal control", marks: 45 },
        { name: "Cost accounting, budgets & inventory", marks: 60 },
      ],
    },
  },
  11: {
    1: {
      title: "Paper 1 – Financial Accounting",
      duration: "2 hours",
      marks: 150,
      sections: [
        { name: "Year-end adjustments & sole traders", marks: 40 },
        { name: "Partnerships", marks: 45 },
        { name: "Clubs & fixed assets", marks: 35 },
        { name: "Analysis & interpretation", marks: 30 },
      ],
    },
    2: {
      title: "Paper 2 – Managerial Accounting & Managing Resources",
      duration: "2 hours",
      marks: 150,
      sections: [
        { name: "Reconciliations", marks: 40 },
        { name: "Manufacturing cost accounting", marks: 55 },
        { name: "Cash budgets", marks: 55 },
      ],
    },
  },
  12: {
    1: {
      title: "Paper 1 – Financial Accounting",
      duration: "2 hours",
      marks: 150,
      sections: [
        { name: "Company ledger & financial statements", marks: 60 },
        { name: "Cash flow statement", marks: 35 },
        { name: "Analysis & interpretation", marks: 35 },
        { name: "Audit & corporate governance", marks: 20 },
      ],
    },
    2: {
      title: "Paper 2 – Managerial Accounting & Managing Resources",
      duration: "2 hours",
      marks: 150,
      sections: [
        { name: "Reconciliations & VAT", marks: 40 },
        { name: "Cost accounting & break-even", marks: 40 },
        { name: "Budgeting", marks: 35 },
        { name: "Inventory valuation", marks: 35 },
      ],
    },
  },
};
