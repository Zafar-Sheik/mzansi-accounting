# Colours, type & design system

## Colour has meaning

Every knowledge area has ONE colour across the whole site – on chips, lesson cards, labs, charts and the progress dashboard.

| Token | Colour | Meaning |
|---|---|---|
| `--brand` | indigo `#4338ca` | Actions and links – "you can click this" |
| `--t-book` | ledger green `#047857` | Bookkeeping (equation, journals, ledger, companies) |
| `--t-report` | teal `#0e7490` | Financial reporting (statements, partnerships, clubs, cash flow, analysis) |
| `--t-cost` | orange `#c2410c` | Managerial accounting (cost accounting, break-even, budgets) |
| `--t-control` | violet `#6d28d9` | Managing resources (control, reconciliations, fixed assets, inventory, audit) |
| `--t-tax` | berry `#be185d` | Tax, VAT & payroll |
| `--t-life` | gold `#a16207` | Money Life (adulting) |
| `--danger` | red | ONLY errors and common mistakes |
| `--memory` | pink | Memory hooks, flashcards |
| `--exam` | amber | Exam tips, Exam Room |
| `--mzansi` | blue | "Mzansi moment" real-world callouts |
| `--warning` | amber | Scam alerts |
| `--success` | green | Correct answers |

Every token has a dark-mode and a high-contrast value (see `src/app/globals.css`).

## Type and numbers

- **Space Grotesk** for headings, **Inter** for reading (switchable to Atkinson Hyperlegible or OpenDyslexic), and **JetBrains Mono** for amounts, T-accounts and typed answers.
- Money follows SA style: **R12 450,50** – a space between thousands and a decimal comma. Negative amounts in statements are shown in brackets: **(R5 000)**.
- Ratios are written **1,5 : 1**; percentages to one decimal (**33,3%**).
- The few formulas (e.g. compound interest) are rendered with **KaTeX**.

## Components and libraries

- **Aceternity-style** marketing components: aurora, spotlight, 3D cards, bento grid, moving borders, glow cards.
- **GSAP** drives the home-page balance-scale animation and scroll reveals.
- **Motion** (Framer Motion) animates the equation scale, T-account postings, inventory layers and source documents.
- **Recharts** draws every chart: payslip and budget pies, tax brackets, compound growth, loan balances, depreciation, break-even, cash budgets and partnership shares.
- **dnd-kit** powers drag-and-drop in the statement builder (with tap and keyboard alternatives).
- **canvas-confetti** celebrates finished labs (skipped in calm mode).
- Labs share a kit (`src/components/widgets/sim-kit.tsx`): readouts, sliders, number fields, an Explain box, the `rand()` formatter and theme-aware chart styling.
