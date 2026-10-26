# AccountingMzansi

**An interactive Grade 10, 11 & 12 Accounting companion for South African learners (CAPS, NSC Paper 1 & Paper 2) – plus *Money Life*, a track of accounting skills for real life.**

It's the sister app of *MathsMzansi*, *CodeMzansi* (IT), *GeoMzansi* (Geography) and *PhysicsMzansi*, with the same learning design and accessibility features. Built with Next.js, Recharts, dnd-kit, Motion, GSAP and Aceternity UI patterns. It's designed to be fun, hands-on, and to work for every learner, including learners with ADHD, dyslexia and other learning differences.

## What's inside

- 📚 **40 lessons covering all 30 CAPS topics and 8 Money Life topics**, in short steps:
  - *Grade 10:* concepts & GAAP, the accounting equation, source documents and journals (cash and credit), the General Ledger and Trial Balance, sole-trader financial statements, salaries & wages, VAT, bank reconciliation, ethics & internal control, cost accounting basics, budgeting, inventory systems
  - *Grade 11:* year-end adjustments, partnerships, clubs, fixed assets & depreciation, analysis & interpretation, debtors & creditors reconciliations, manufacturing cost accounting, cash budgets
  - *Grade 12:* companies, company financial statements, the cash flow statement, analysis of companies (EPS, DPS, NAV, ROSHE, ROTCE), audit & corporate governance, reconciliations, VAT, cost accounting & break-even, budgets & projected statements, inventory valuation
  - *Money Life:* your money plan (budgets), banking, cards & scams, starting a side hustle, your first payslip, credit, debt & interest, saving & investing, **how to do your own taxes on SARS eFiling**, tax for side hustlers, and adulting (renting, cars, insurance, two-pot retirement)
- 🛠️ **22 hands-on labs**:
  - the accounting-equation balance scale
  - a T-account ledger with an automatic Trial Balance
  - a source-document sorter with real-looking receipts and invoices
  - a drag-and-drop statement builder
  - VAT, payslip and SARS income-tax calculators
  - a 50/30/20 budget builder, compound-interest and credit/loan labs
  - depreciation & disposal, break-even, production-cost, ratio-analysis and FIFO/weighted-average inventory labs
  - bank-reconciliation, cash-budget and partnership-appropriation labs
  - a **side-hustle business simulator**
  - a formula & SARS reference sheet
- ✍️ **Typed answers that understand accountants**: `R12 450`, `12 450,50`, `(R5 000)`, `35,5%`, `1,45 : 1`. Answers must be right to the cent, and the feedback spots VAT-inclusive/exclusive slips, % vs decimal, monthly vs yearly and upside-down ratios.
- ♾️ **Endless practice**: 28 question generators with worked solutions and streaks.
- 🪜 **Worked examples revealed one step at a time**, with a "Why?" for every step.
- 🃏 **Flashcards** with spaced repetition for 280+ terms, plus a glossary.
- ⚔️ **Quiz Arena**: 165+ questions, mixed-topic rounds, relaxed or timed.
- 📝 **Exam Room**: 53 NSC-style questions (155 parts) with marking memos.
- ⏱️ **Mock papers**: Paper 1 and Paper 2 for each grade, full or quick (~50 marks), timed or untimed, self-marked with an NSC level and a breakdown by topic.
- 🎯 **Weak-spot coach** and a 🖨️ **worksheet generator** for teachers.
- 🎮 **Games**: Speed Solve, Debit or Credit Dash, Concept Pairs, True/False Blitz, Odd One Out, Accounting Hangman.
- 🧠 **Accessibility**: step mode, focus mode, focus sprints, calm mode, a reading ruler, word anchors, dyslexia-friendly fonts, read-aloud, high contrast, and tap/keyboard alternatives for every drag-and-drop.
- 🔒 **No accounts, no tracking**: everything is stored on the learner's device.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command | |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | TypeScript strict check |
| `npm run lint` | ESLint (zero warnings) |
| `npm test` | Accounting-engine, tax-engine and content-integrity tests (Vitest) |
| `npm run test:e2e` | Browser tests on desktop + mobile (Playwright; needs a production build) |
| `npm run check` | typecheck + lint + test + build |

## Deploying

Every page is statically generated. There is no backend and there are no environment variables. Node 18.18+ is required.

```bash
npm ci
npm run check
npm start          # http://localhost:3000 (set PORT to change)
```

## Tax figures

All SARS figures (2025/26 brackets, rebates, thresholds, medical credits, UIF, retirement deduction, TFSA limits) live in one file: `src/lib/acc/tax.ts`. Update it after each Budget Speech and every calculator, generator and reference table follows.

## Documentation

Teacher and developer docs live in [`docs/`](docs) and are rendered in the site at **`/teachers`**. They cover:
- overview and teacher quick-start
- CAPS curriculum map
- learning design
- ADHD, dyslexia and accessibility
- the formula sheet, ratios and SARS tables
- the Money Life track
- design system and architecture
- content authoring
- testing and deployment
- privacy
- FAQ

> An independent study aid. Always confirm exam details with your teacher and the latest DBE examination guidelines, and tax details with SARS (www.sars.gov.za).
