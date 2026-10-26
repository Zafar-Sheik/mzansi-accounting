/**
 * Content model for lessons. Lessons are plain TypeScript data so that they
 * are type-checked and can be tested automatically: every quiz answer, every
 * practice answer, every formula (it must render in KaTeX) and every exam memo
 * is validated by the test-suite.
 *
 * Formulas are written in Markdown with LaTeX: `$v = f\lambda$` inline, `$$...$$` display.
 */

export type Grade = 10 | 11 | 12;

/** The CAPS knowledge areas of Accounting, plus the Money Life (adulting) track. */
export type Strand = "Bookkeeping" | "Financial Reporting" | "Managerial Accounting" | "Managing Resources" | "Tax, VAT & Payroll" | "Money Life";

/** Paper 1 is mainly Financial Accounting, Paper 2 Managerial Accounting & Managing Resources. 0 = Money Life (not examined – for life). */
export type Paper = 0 | 1 | 2;

/** A CAPS topic in a specific grade, or a Money Life topic (see src/lib/topics.ts for titles, colours and papers). */
export type Topic =
  // Grade 10
  | "g10-concepts"
  | "g10-equation"
  | "g10-journals"
  | "g10-ledger"
  | "g10-statements"
  | "g10-salaries"
  | "g10-vat"
  | "g10-bank"
  | "g10-ethics"
  | "g10-cost"
  | "g10-budget"
  | "g10-inventory"
  // Grade 11
  | "g11-adjustments"
  | "g11-partnerships"
  | "g11-clubs"
  | "g11-fixed-assets"
  | "g11-analysis"
  | "g11-reconciliations"
  | "g11-cost"
  | "g11-budget"
  // Grade 12
  | "g12-companies"
  | "g12-statements"
  | "g12-cash-flow"
  | "g12-analysis"
  | "g12-audit"
  | "g12-reconciliations"
  | "g12-vat"
  | "g12-cost"
  | "g12-budget"
  | "g12-inventory"
  // Money Life – accounting for real life
  | "life-money"
  | "life-banking"
  | "life-hustle"
  | "life-payslip"
  | "life-credit"
  | "life-saving"
  | "life-tax"
  | "life-adulting";

export type CalloutVariant = "key" | "tip" | "mistake" | "memory" | "exam" | "break" | "real-world" | "safety" | "life";

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Term {
  term: string;
  def: string;
}

/**
 * How a typed answer is checked (see src/lib/acc/check.ts):
 * - number:  one value; "R", spaces in 12 450, decimal commas, "%" and brackets for negatives – (R5 000) – are understood
 * - list:    ordered numbers, e.g. a profit-sharing ratio `3; 2`
 * - set:     several values in any order
 * - text:    a word or name (case, spaces and hyphens ignored), alternatives separated by " | "
 * - formula: case-sensitive text (kept for compatibility)
 * - point, expr: rarely used here (kept for graphs and algebra)
 */
export type AnswerKind = "number" | "list" | "set" | "text" | "formula" | "point" | "expr";

export interface PracticeProblem {
  q: string;
  /** The memo answer, written so the checker can read it (e.g. `12450`, `35.5`, `3; 2`, `debit | dr`). */
  answer: string;
  kind?: AnswerKind;
  /** Shown after the answer box, e.g. `R`, `%`, `:1`, `units`. */
  unit?: string;
  /** Absolute tolerance. */
  tol?: number;
  /** Relative tolerance (default: exact to the cent – accounting balances!). */
  rtol?: number;
  /** Variables for `expr` answers (default: x). */
  vars?: string[];
  form?: "simplified-surd";
  hint?: string;
  /** Full worked solution (markdown), shown after an attempt. */
  solution: string;
  /** Optional diagram shown with the question. */
  figure?: { widget: WidgetName; props?: Record<string, unknown> };
}

export interface WorkedStep {
  md: string;
  /** Why this step is allowed – the bit learners usually skip. */
  why?: string;
}

export type Block =
  | { type: "text"; md: string }
  | { type: "callout"; variant: CalloutVariant; title?: string; md: string }
  | { type: "keypoints"; points: string[] }
  | { type: "flashcards"; cards: { front: string; back: string }[] }
  /** Renders the lesson's own key terms as flashcards. */
  | { type: "terms" }
  | { type: "quiz"; id: string; questions: QuizQuestion[] }
  | { type: "widget"; widget: WidgetName; props?: Record<string, unknown> }
  /** Put the steps of a method in order. */
  | { type: "sequence"; id: string; title: string; steps: string[]; explain: string }
  /** Match each item to its partner (term ↔ definition, quantity ↔ unit…). */
  | { type: "match"; id: string; title: string; pairs: { left: string; right: string }[] }
  | { type: "table"; headers: string[]; rows: string[][]; caption?: string }
  /** A worked example revealed one step at a time ("predict, then reveal"). */
  | { type: "worked"; title: string; problem: string; steps: WorkedStep[] }
  /** Typed-answer practice with hints, instant checking and full solutions. */
  | { type: "practice"; id: string; title?: string; problems: PracticeProblem[] }
  /** A short exam-style question with a memo the learner self-marks against. */
  | { type: "exam"; question: ExamPart & { id: string } };

export type WidgetName =
  | "sorter"
  | "drill"
  | "equation-lab"
  | "t-account-lab"
  | "journal-lab"
  | "statement-builder"
  | "vat-lab"
  | "payslip-lab"
  | "tax-calculator"
  | "budget-builder"
  | "compound-lab"
  | "loan-lab"
  | "depreciation-lab"
  | "break-even-lab"
  | "cost-lab"
  | "ratio-lab"
  | "inventory-lab"
  | "bank-recon-lab"
  | "cash-budget-lab"
  | "appropriation-lab"
  | "hustle-sim"
  | "formula-sheet";

export interface Chunk {
  id: string;
  title: string;
  /** Rough reading/doing time in minutes – chunks are kept short (2–10 min). */
  minutes: number;
  blocks: Block[];
}

export interface Lesson {
  slug: string;
  topic: Topic;
  order: number;
  title: string;
  tagline: string;
  emoji: string;
  /** CAPS reference. */
  caps: string;
  objectives: string[];
  /** Learning style tags used in docs: visual, auditory, read-write, kinaesthetic */
  styles: ("visual" | "auditory" | "read-write" | "kinaesthetic")[];
  xp: number;
  /** Key concepts and formulas – feed the lesson flashcards, the global deck and the games. */
  terms: Term[];
  chunks: Chunk[];
}

/** Cognitive levels used in the DBE Accounting examination guidelines. */
export type CognitiveLevel = "recall" | "comprehension" | "analysis" | "evaluation";

export interface ExamPart {
  q: string;
  marks: number;
  /** Each memo line is one mark (one tick), exactly like an NSC marking memo. */
  memo: string[];
  level?: CognitiveLevel;
}

export interface ExamQuestion {
  id: string;
  topic: Topic;
  title: string;
  /** Stimulus: information, a diagram description or data that the questions refer to. */
  source?: string;
  /** Optional interactive figure shown with the source. */
  figure?: { widget: WidgetName; props?: Record<string, unknown> };
  parts: ExamPart[];
}
