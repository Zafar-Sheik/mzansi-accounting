# Architecture

AccountingMzansi is a **static Next.js site**. There is no database and no server-side learner data.

## Stack

Next.js 15 (App Router, static generation) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Recharts · dnd-kit · Motion · GSAP 3 · canvas-confetti · KaTeX · Vitest · Playwright

## Folders

```
src/
  app/                 routes (learn, money-life, flashcards, quiz, exam, exam/mock, toolkit, games, progress, teachers, api/curriculum)
  components/
    learn/             lesson player, quiz, practice, worked examples, flashcards, sequence, match, exam-part, markdown
    acc/               answer-input (typed answers + keypad), problem-card
    widgets/           the 22 hands-on labs (code-split with next/dynamic), sim-kit, catalogue
    pages/             client components for each page (incl. money-life)
    home/, layout/, ui/, aceternity/
  content/
    lessons/g10.ts, g11.ts, g12.ts, life.ts   lessons as typed data
    exam.ts            Exam Room questions and memos
    index.ts           LESSONS, LIVE_TOPICS, GLOSSARY, QUESTION_BANK
  lib/
    acc/check.ts       answer checker: rands, spaces, decimal commas, %, brackets for negatives, ratios, text
    acc/tax.ts         SARS 2025/26 brackets, rebates, thresholds, medical credits, UIF, PAYE, RA deduction
    acc/generators.ts  28 seeded question generators with worked solutions
    acc/numbers.ts     R(), P(), D() formatters; expr.ts (safe parser, no eval); speech.ts; gen-kit.ts
    topics.ts          grades, strands, topics, papers, colours and paper structure
    progress.ts, cards.ts, prefs.ts, mastery.ts, mock.ts, worksheet.ts
docs/                  this documentation (rendered at /teachers)
tests/                 Vitest unit + content tests, Playwright e2e
```

## The accounting engine

- **`check.ts`** reads what learners type: `R12 450`, `12 450,50`, `(R5 000)`, `-R5 000`, `35,5%`, `1,45 : 1`. Answers must be right to the cent unless a problem sets a tolerance (percentages and ratios usually allow rounding). Feedback recognises VAT-inclusive/exclusive slips (×1,15), % vs decimal (×100), monthly vs yearly (×12), thousands slips and upside-down ratios.
- **`tax.ts`** holds the SARS figures in one place, so the payslip builder, tax calculator, generators and formula sheet always agree. Update it after each Budget Speech.
- **Generators** create fresh problems from a seed. The test suite generates 150 problems per generator and checks that every memo answer passes its own checker and every formula renders.

## Data flow

- Lessons are plain TypeScript objects. Server components read them at build time and pass small, serialisable summaries to client components.
- The **glossary** and **quiz bank** are derived automatically from the lessons.
- Learner state lives in `localStorage` under keys prefixed `accountingmzansi:` (prefs, progress, cards, best scores and mock attempts).

## Topics

`src/lib/topics.ts` lists every topic (30 CAPS + 8 Money Life) with its grade, strand and paper. Money Life topics have `paper: 0`, so they never appear in mock papers.
