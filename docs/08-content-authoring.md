# Writing lessons & exam questions

Lessons are TypeScript data in `src/content/lessons/` (`g10.ts`, `g11.ts`, `g12.ts`, `life.ts`). The type system and the test suite catch most mistakes before a learner sees them.

## Writing money and formulas

- Write money SA style in text: `R12 450` or `R12 450,50`. In generators use `R()` from `src/lib/acc/numbers.ts`.
- Memo answers are plain numbers: `answer: "12450"`, `answer: "-1400"` for a loss, `answer: "33.3"` with `tol: 0.06` for a one-decimal percentage.
- Use LaTeX only for real formulas, e.g. `$A = P(1 + i)^n$`. Remember to escape `%` as `\%` inside LaTeX.

## Blocks

| Block | Use it for |
|---|---|
| `text`, `callout`, `keypoints`, `table` | Explanations. Callout variants: key, tip, mistake, memory, exam, break, real-world, safety (scam alert), life |
| `widget` | Any lab, e.g. `{ widget: "vat-lab", props: { mode: "return" } }`, a `sorter` with buckets and items, or a `drill` with `generators` |
| `worked` | A worked example revealed step by step, each step with an optional "why" |
| `practice` | Typed-answer problems with hint and solution |
| `sequence`, `match` | Put steps in order; match pairs |
| `quiz` | Multiple choice with an explanation for every question (every lesson ends with one) |
| `terms` | Shows the lesson's key terms as flashcards |
| `exam` | A short NSC-style question with a memo |

## Answer kinds

| kind | Memo answer | Learner can type |
|---|---|---|
| `number` (default) | `12450` | `R12 450`, `12 450,00`, `(R12 450)` for negatives |
| `text` | `CPJ \| Cash Payments Journal` | either alternative, any case |
| `list` | `3; 2` | `3:2`, `3, 2` |

## Exam questions

They live in `src/content/exam.ts`. Write one memo line per mark – figures and workings as separate lines, like a DBE memo. Pick a `level` (recall, comprehension, analysis, evaluation) and add a `figure` widget if a lab helps.

## Adding a topic

1. Add the topic id to `Topic` in `src/content/types.ts` and to `TOPICS` in `src/lib/topics.ts`.
2. Add a badge name in `src/lib/progress.ts`.
3. Write at least one lesson, and ideally a generator in `src/lib/acc/generators.ts` and exam questions.
4. Run `npm run check`.
