# Testing & deployment

## Scripts

| Command | |
|---|---|
| `npm run dev` | Development server on http://localhost:3000 |
| `npm run typecheck` | TypeScript strict |
| `npm run lint` | ESLint (zero warnings allowed) |
| `npm test` | Vitest: accounting engine + content integrity |
| `npm run build` | Production build (every page is static) |
| `npm run test:e2e` | Playwright on desktop and mobile (needs a build) |
| `npm run check` | typecheck + lint + test + build |

## What the tests guarantee

- **Answer checker.** Rands, spaces, decimal commas, percentages, ratios and bracketed negatives are read correctly; answers are exact to the cent; feedback spots VAT, %, monthly/yearly and ratio slips.
- **Tax engine.** Every SARS bracket boundary, rebates, thresholds, medical credits, UIF caps and the retirement deduction.
- **Every generator** produces 150 problems whose memo answers pass their own checker and whose formulas render.
- **Every practice problem** passes its own checker; every quiz answer points at a real option; every sorter item belongs to a bucket.
- **Exam questions** have a memo line for every mark; mock papers are built from the right grade and paper and never include Money Life topics.
- **End-to-end.** Pages load on desktop and mobile without console errors or sideways scrolling.

## Deploying

Every page is statically generated; there are no environment variables. Any Node 18.18+ host works (Vercel, Netlify, a school server):

```bash
npm ci
npm run check
npm start
```
