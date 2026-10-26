import type { Lesson } from "../types";


export const G11: Lesson[] = [
  // ------------------------------------------------------------------ Adjustments
  {
    slug: "year-end-adjustments",
    topic: "g11-adjustments",
    order: 1,
    title: "Year-end adjustments & final accounts",
    tagline: "Make the Trial Balance tell the truth before you report.",
    emoji: "🔧",
    caps: "CAPS Gr 11 · Financial Accounting: year-end adjustments – accrued and prepaid expenses and income, consumable stores, depreciation, bad debts, provision for bad debts, trading stock deficits; financial statements of a sole trader.",
    objectives: ["Explain each year-end adjustment using the matching and prudence principles", "Calculate adjusted figures for the Income Statement", "Show the Balance Sheet effect of each adjustment", "Draw up the Income Statement and Balance Sheet of a sole trader"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 100,
    terms: [
      { term: "Accrued expense", def: "An expense that belongs to this year but is still unpaid at year-end (e.g. unpaid electricity). Current liability." },
      { term: "Prepaid expense", def: "An expense paid this year that belongs to next year (e.g. insurance paid in advance). Current asset." },
      { term: "Accrued income", def: "Income earned this year but not yet received (e.g. rent owed by a tenant). Current asset." },
      { term: "Income received in advance", def: "Income received this year that belongs to next year (e.g. next month's rent received). Current liability." },
      { term: "Bad debts", def: "Amounts owed by debtors that will never be received and are written off – an expense." },
      { term: "Provision for bad debts", def: "An estimate of debtors who may not pay, deducted from debtors in the Balance Sheet (prudence principle)." },
      { term: "Depreciation", def: "The part of a fixed asset's cost used up during the year – an expense." },
      { term: "Carrying value", def: "Cost − accumulated depreciation." },
    ],
    chunks: [
      {
        id: "why",
        title: "Why adjust?",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: "Ayesha's financial year ends on 28 February. On 1 February she paid R18 000 for a **year** of insurance. If she shows all R18 000 as this year's expense, her profit is too low – 11 months of that cover belong to next year." },
          { type: "text", md: "Two GAAP principles drive every adjustment:\n\n- **Matching** – expenses must be matched with the income of the period they help earn.\n- **Prudence** – don't overstate assets or profit; plan for losses (e.g. debtors who won't pay)." },
          {
            type: "table",
            headers: ["Adjustment", "Income Statement", "Balance Sheet"],
            rows: [
              ["Accrued expense (still owing)", "+ expense", "Current liability"],
              ["Prepaid expense (paid in advance)", "− expense", "Current asset"],
              ["Accrued income (still receivable)", "+ income", "Current asset"],
              ["Income received in advance", "− income", "Current liability"],
              ["Consumable stores on hand", "− expense", "Current asset"],
              ["Depreciation", "+ expense", "− carrying value of fixed assets"],
              ["Bad debts", "+ expense", "− debtors"],
              ["Increase in provision for bad debts", "+ expense", "− net debtors"],
              ["Trading stock deficit", "+ expense", "− trading stock"],
            ],
          },
          { type: "callout", variant: "memory", md: "Every adjustment affects **two** things: one in the Income Statement and one in the Balance Sheet. If you only change one, the Balance Sheet won't balance." },
        ],
      },
      {
        id: "worked",
        title: "Adjustments, step by step",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Insurance and rent",
            problem: "Insurance in the Trial Balance: R19 500 – this includes R1 500 a month paid up to 31 March (year-end 28 February). Rent income: R55 000 for 11 months; the tenant still owes February's R5 000.",
            steps: [
              { md: "Prepaid insurance = 1 month × R1 500 = R1 500. Insurance expense = R19 500 − R1 500 = **R18 000**", why: "March belongs to next year. R1 500 is a current asset." },
              { md: "Accrued rent income = R5 000. Rent income = R55 000 + R5 000 = **R60 000**", why: "February's rent was earned this year. R5 000 is a current asset (trade and other receivables)." },
            ],
          },
          {
            type: "worked",
            title: "Bad debts & the provision",
            problem: "Debtors control R84 000. Write off R2 000 owed by B. Mofokeng. Provision for bad debts must be 5% of debtors; the existing provision is R3 500.",
            steps: [
              { md: "Debtors after write-off = R84 000 − R2 000 = **R82 000**; bad debts expense R2 000" },
              { md: "New provision = 5% × R82 000 = **R4 100**", why: "The provision is a percentage of the debtors AFTER bad debts." },
              { md: "Adjustment = R4 100 − R3 500 = **R600 increase** → an expense in the Income Statement", why: "An increase is an expense; a decrease would be income." },
              { md: "Balance Sheet: net debtors = R82 000 − R4 100 = **R77 900**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["adjustments"], title: "Adjustments drill" } },
        ],
      },
      {
        id: "practice",
        title: "Practise",
        minutes: 8,
        blocks: [
          {
            type: "practice",
            id: "adjust-practice",
            problems: [
              { q: "Water & electricity in the Trial Balance R26 400. February's account of R2 600 is still unpaid. What amount goes in the Income Statement?", answer: "29000", unit: "R", solution: "Accrued expense: R26 400 + R2 600 = **R29 000** (R2 600 is a current liability)" },
              { q: "Rent income R84 000 includes R7 000 received for March (next financial year). Calculate rent income for the year.", answer: "77000", unit: "R", solution: "Income received in advance: R84 000 − R7 000 = **R77 000**" },
              { q: "Provision for bad debts was R4 800. It must now be R3 900. Is this an expense or income in the Income Statement – and how much? (Type the amount as a positive number.)", answer: "900", unit: "R", solution: "A **decrease** of R900 → 'Provision for bad debts adjustment' is shown as **income** (other operating income)." },
              { q: "Equipment cost R120 000; accumulated depreciation R30 000. Depreciation is 10% p.a. on cost. Calculate the carrying value at year-end after this year's depreciation.", answer: "78000", unit: "R", solution: "Depreciation = R12 000. Carrying value = R120 000 − (R30 000 + R12 000) = **R78 000**" },
            ],
          },
          { type: "widget", widget: "statement-builder", props: { title: "Warm-up: classify the Trial Balance" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Adjust for: accruals, prepayments, stores, depreciation, bad debts, provision, deficits.", "Each adjustment has an Income Statement AND a Balance Sheet effect.", "Provision = % × (debtors − bad debts); adjust by the difference.", "Accrued/prepaid items appear under trade and other receivables / payables."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "adjust-quiz",
            questions: [
              { q: "Income received in advance appears in the Balance Sheet as a…", options: ["current asset", "current liability", "non-current asset", "part of equity"], answer: 1, explain: "The business still owes the service – a liability." },
              { q: "An increase in the provision for bad debts is…", options: ["income", "an expense", "a liability", "drawings"], answer: 1, explain: "It reduces profit (prudence)." },
              { q: "Insurance paid in advance at year-end is…", options: ["added to insurance expense", "subtracted from insurance expense", "ignored", "a liability"], answer: 1, explain: "It belongs to next year – a prepaid expense (asset)." },
              { q: "Which principle explains accrued expenses?", options: ["Historical cost", "Matching", "Business entity", "Going concern"], answer: 1, explain: "The expense belongs to the year it was incurred." },
              { q: "Bad debts are written off. Debtors control…", options: ["increases", "decreases", "stays the same", "becomes a liability"], answer: 1, explain: "Dr Bad debts, Cr Debtors control." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Partnerships
  {
    slug: "partnerships",
    topic: "g11-partnerships",
    order: 1,
    title: "Partnerships",
    tagline: "Two (or more) owners, one business – and a fair way to share the profit.",
    emoji: "🤝",
    caps: "CAPS Gr 11 · Financial Accounting: partnerships – characteristics, the partnership agreement, capital and current accounts, appropriation of profit (salaries, interest on capital, profit-sharing ratio), financial statements and notes.",
    objectives: ["Describe the characteristics of a partnership", "Prepare the Appropriation account", "Prepare partners' current accounts", "Show partners' equity in the Balance Sheet"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 100,
    terms: [
      { term: "Partnership agreement", def: "A contract that sets out capital contributions, salaries, interest on capital, the profit-sharing ratio and what happens if a partner leaves." },
      { term: "Capital account", def: "Records each partner's long-term investment in the business. It usually stays the same unless capital is added or withdrawn." },
      { term: "Current account", def: "Records each partner's share of profit (credit) and drawings (debit) for the year." },
      { term: "Appropriation account", def: "Shows how net profit is shared: partners' salaries, interest on capital, then the remaining profit in the profit-sharing ratio." },
      { term: "Profit-sharing ratio", def: "The ratio (e.g. 3:2) in which the remaining profit or loss is shared." },
      { term: "Interest on capital", def: "A reward to partners for the capital they invested: capital × agreed %." },
      { term: "Unlimited liability", def: "Partners are personally liable for the partnership's debts." },
    ],
    chunks: [
      {
        id: "intro",
        title: "Why partner up?",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: "Ayesha (a chef) and Bongani (who has money and a building) open a restaurant in Durban. Ayesha works full-time; Bongani put in more capital. How should they share the profit fairly? The **partnership agreement** decides." },
          {
            type: "table",
            headers: ["Advantages", "Disadvantages"],
            rows: [
              ["More capital and skills", "Unlimited liability"],
              ["Shared decisions and workload", "Disagreements between partners"],
              ["Easy to start (no registration needed)", "Limited life – ends if a partner leaves or dies"],
              ["Shared risk", "Each partner is bound by the others' decisions"],
            ],
          },
          { type: "callout", variant: "key", md: "Partners' salaries and interest on capital are **NOT expenses** in the Income Statement. They are a way of **dividing the profit** – shown in the Appropriation account." },
        ],
      },
      {
        id: "lab",
        title: "Share the profit",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "appropriation-lab" },
          {
            type: "sequence",
            id: "appropriation-order",
            title: "The order of appropriation",
            steps: ["Start with net profit from the Income Statement", "Deduct partners' salaries", "Deduct interest on capital", "Share what remains (profit or loss) in the profit-sharing ratio", "Credit each partner's total share to their current account"],
            explain: "Salaries and interest come FIRST, even if there isn't enough profit – then the remaining (possibly negative) amount is shared.",
          },
        ],
      },
      {
        id: "current",
        title: "Current accounts",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Ayesha's current account",
            problem: "Balance at the start R12 000 (credit). Salary R120 000; interest on capital R50 000; share of remaining profit R60 000. Drawings R185 000.",
            steps: [
              { md: "Credit side: R12 000 + R120 000 + R50 000 + R60 000 = **R242 000**" },
              { md: "Debit side: drawings **R185 000**" },
              { md: "Closing balance = R242 000 − R185 000 = **R57 000 credit**", why: "A credit balance means the business owes Ayesha – it is part of her equity." },
            ],
          },
          {
            type: "practice",
            id: "partner-practice",
            problems: [
              { q: "Net profit R300 000. Salaries R90 000 and R80 000. Interest on capital R40 000 and R30 000. Calculate the remaining profit to be shared.", answer: "60000", unit: "R", solution: "R300 000 − R170 000 − R70 000 = **R60 000**" },
              { q: "Share R60 000 in the ratio 3:2. What is the first partner's share?", answer: "36000", unit: "R", solution: "3/5 × R60 000 = **R36 000**" },
              { q: "A partner's current account: opening debit balance R8 000, total share of profit R140 000, drawings R150 000. Calculate the closing balance (negative if it is a debit balance).", answer: "-18000", unit: "R", hint: "Treat credits as positive and debits as negative.", solution: "−R8 000 + R140 000 − R150 000 = **−R18 000** (a debit balance – the partner drew more than they earned)" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["partnership"], title: "Appropriation drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Capital accounts = long-term investment; current accounts = profit share − drawings.", "Appropriation order: salaries → interest on capital → remainder in the ratio.", "Partners' salaries are not an expense.", "A debit balance on a current account reduces that partner's equity."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "partner-quiz",
            questions: [
              { q: "Partners' salaries are shown in the…", options: ["Income Statement as an expense", "Appropriation account", "Balance Sheet as a liability", "Cash budget only"], answer: 1, explain: "They are a share of profit." },
              { q: "Drawings by a partner are debited to the partner's…", options: ["capital account", "current account", "salary account", "appropriation account"], answer: 1, explain: "Current accounts track profit shares and drawings." },
              { q: "Interest on capital of R400 000 at 10% is…", options: ["R4 000", "R40 000", "R400", "R440 000"], answer: 1, explain: "10% × R400 000." },
              { q: "If salaries + interest exceed net profit, the remainder is…", options: ["ignored", "a loss shared in the ratio", "paid by SARS", "added to capital"], answer: 1, explain: "The shortfall is shared as a loss." },
              { q: "Which is a disadvantage of a partnership?", options: ["Limited liability", "Unlimited liability", "Shares can be sold on the JSE", "Separate legal person"], answer: 1, explain: "Partners can lose personal assets." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Clubs
  {
    slug: "clubs",
    topic: "g11-clubs",
    order: 1,
    title: "Clubs & non-profit organisations",
    tagline: "No profit motive, but the treasurer still has to account for every rand.",
    emoji: "⚽",
    caps: "CAPS Gr 11 · Financial Accounting: non-profit organisations (clubs) – Receipts and Payments Account, membership fees (arrears and in advance), Income and Expenditure Statement, Balance Sheet, accumulated funds.",
    objectives: ["Explain how a club differs from a business", "Calculate membership fees income using arrears and advances", "Prepare an Income and Expenditure Statement", "Explain accumulated funds and surplus/deficit"],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 80,
    terms: [
      { term: "Non-profit organisation (NPO)", def: "An organisation that exists to serve its members or a cause, not to make a profit, e.g. a sports club or stokvel." },
      { term: "Accumulated fund", def: "The club's equivalent of capital – it grows with surpluses and shrinks with deficits." },
      { term: "Surplus / deficit", def: "The club's 'profit' (income > expenditure) or 'loss' (expenditure > income)." },
      { term: "Receipts and Payments Account", def: "A summary of the club's cash book: all cash received and paid, whatever year it belongs to." },
      { term: "Income and Expenditure Statement", def: "The club's Income Statement – only income and expenses of THIS year (matching principle)." },
      { term: "Membership fees in arrears", def: "Fees members still owe – a current asset (accrued income)." },
      { term: "Membership fees in advance", def: "Fees received for next year – a current liability (income received in advance)." },
    ],
    chunks: [
      {
        id: "intro",
        title: "Club accounting",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: "The Mamelodi Sundowns Supporters' Club charges R600 per member per year. It sells refreshments at matches and organises a bus to away games. It doesn't want profit – but members demand to see where their money went." },
          {
            type: "match",
            id: "club-terms",
            title: "Business word ↔ club word",
            pairs: [
              { left: "Capital", right: "Accumulated fund" },
              { left: "Net profit", right: "Surplus" },
              { left: "Net loss", right: "Deficit" },
              { left: "Income Statement", right: "Income and Expenditure Statement" },
              { left: "Cash book summary", right: "Receipts and Payments Account" },
            ],
          },
        ],
      },
      {
        id: "fees",
        title: "Membership fees",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Supporters' club fees",
            problem: "120 members at R600 each. During the year the club received R73 800: this included R3 000 from 5 members for last year (arrears), and R4 200 from 7 members for next year. 8 members still owe this year's fees.",
            steps: [
              { md: "Income for THIS year = 120 × R600 = **R72 000**", why: "Matching: only this year's fees count." },
              { md: "Check: R73 800 − R3 000 (last year) − R4 200 (next year) + R4 800 (still owing: 8 × R600) = **R72 000** ✔" },
              { md: "Balance Sheet: arrears R4 800 = current asset; advance R4 200 = current liability" },
            ],
          },
          {
            type: "practice",
            id: "club-practice",
            problems: [
              { q: "A club has 80 members; the fee is R450. Calculate membership fees income for the year.", answer: "36000", unit: "R", solution: "80 × R450 = **R36 000**" },
              { q: "Fees received R39 150 (fee R450). This includes 3 members' fees for last year and 4 members' fees paid in advance for next year. 2 members have not paid this year. Calculate membership fees income.", answer: "36900", unit: "R", solution: "R39 150 − R1 350 − R1 800 + R900 = **R36 900** (that means the club has 82 members)" },
              { q: "Accumulated fund at the start R95 000; surplus for the year R12 400. Calculate the accumulated fund at year-end.", answer: "107400", unit: "R", solution: "R95 000 + R12 400 = **R107 400**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["club-fees"], title: "Membership fees drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Clubs: accumulated fund, surplus/deficit, Income and Expenditure Statement.", "Membership fees income = members × fee for THIS year.", "Arrears = current asset; fees in advance = current liability.", "Receipts and Payments = all cash, any year; Income and Expenditure = this year only."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "club-quiz",
            questions: [
              { q: "A club's equivalent of capital is the…", options: ["surplus", "accumulated fund", "receipts account", "membership fee"], answer: 1, explain: "Accumulated fund." },
              { q: "Fees received for next year are a…", options: ["current asset", "current liability", "surplus", "expense"], answer: 1, explain: "Income received in advance." },
              { q: "The Receipts and Payments Account includes…", options: ["depreciation", "only this year's income", "all cash received and paid", "accrued expenses"], answer: 2, explain: "It's a cash summary." },
              { q: "Expenditure greater than income gives a…", options: ["surplus", "deficit", "dividend", "profit"], answer: 1, explain: "Deficit = a club's loss." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Fixed assets
  {
    slug: "fixed-assets-depreciation",
    topic: "g11-fixed-assets",
    order: 1,
    title: "Fixed assets, depreciation & disposals",
    tagline: "Vehicles wear out, computers go out of date – accounting tracks it.",
    emoji: "🚚",
    caps: "CAPS Gr 11 · Managing Resources: tangible assets – cost, depreciation (straight-line and diminishing-balance), accumulated depreciation, carrying value, asset disposal account and the fixed asset note; internal control over fixed assets.",
    objectives: ["Calculate depreciation using both methods, including part-years", "Calculate carrying value", "Record the disposal of an asset and calculate profit or loss", "Complete the fixed asset note"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 90,
    terms: [
      { term: "Tangible (fixed) asset", def: "A physical asset used for more than a year to run the business, e.g. land, buildings, vehicles, equipment." },
      { term: "Straight-line method", def: "Depreciation = cost × rate – the same amount every year (also 'on cost')." },
      { term: "Diminishing-balance method", def: "Depreciation = carrying value × rate – less every year (also 'on carrying value')." },
      { term: "Accumulated depreciation", def: "The total depreciation written off on an asset since it was bought." },
      { term: "Asset disposal account", def: "A ledger account used to work out the profit or loss when an asset is sold or scrapped." },
      { term: "Land", def: "Land is NOT depreciated – it doesn't wear out." },
    ],
    chunks: [
      {
        id: "lab",
        title: "Watch assets lose value",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "depreciation-lab" },
          { type: "callout", variant: "memory", md: "**S**traight-line uses **S**ame cost every year. **D**iminishing balance gets **D**ownsized every year." },
        ],
      },
      {
        id: "calc",
        title: "Calculations",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Part-year depreciation",
            problem: "New equipment costing R48 000 was bought on 1 October. Year-end is 28 February. Depreciation is 15% p.a. on cost.",
            steps: [
              { md: "Months owned: October → February = **5 months**" },
              { md: "Depreciation = R48 000 × 15% × 5/12 = **R3 000**", why: "Only depreciate for the time the business owned the asset." },
            ],
          },
          {
            type: "worked",
            title: "Selling a vehicle",
            problem: "A vehicle cost R250 000; accumulated depreciation on 1 March was R140 000. It was sold on 31 August for R95 000 cash. Depreciation is 20% p.a. on the diminishing-balance method.",
            steps: [
              { md: "Carrying value on 1 March = R250 000 − R140 000 = R110 000" },
              { md: "Depreciation to 31 August = R110 000 × 20% × 6/12 = **R11 000**", why: "Depreciate up to the date of sale first." },
              { md: "Carrying value on date of sale = R110 000 − R11 000 = **R99 000**" },
              { md: "Loss on sale = R95 000 − R99 000 = **(R4 000)**", why: "Sold for less than carrying value." },
            ],
          },
          {
            type: "practice",
            id: "fa-practice",
            problems: [
              { q: "Computers cost R90 000. Depreciation 30% p.a. on the diminishing-balance method. Accumulated depreciation at the start of the year R27 000. Calculate this year's depreciation.", answer: "18900", unit: "R", solution: "(R90 000 − R27 000) × 30% = **R18 900**" },
              { q: "Equipment with a carrying value of R14 500 is sold for R16 000. Calculate the profit on sale.", answer: "1500", unit: "R", solution: "R16 000 − R14 500 = **R1 500** profit" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["depreciation", "asset-disposal"], title: "Depreciation & disposal drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Straight-line: cost × rate; diminishing balance: carrying value × rate.", "Part-years: × months/12.", "Disposal: depreciate to the date of sale, then selling price − carrying value.", "Land is not depreciated."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "fa-quiz",
            questions: [
              { q: "Which asset is NOT depreciated?", options: ["Vehicles", "Equipment", "Land", "Computers"], answer: 2, explain: "Land doesn't wear out." },
              { q: "Carrying value = …", options: ["cost + depreciation", "cost − accumulated depreciation", "selling price − cost", "cost × rate"], answer: 1, explain: "What's left of the cost on the books." },
              { q: "Depreciation is shown in the Income Statement as…", options: ["income", "an operating expense", "a liability", "drawings"], answer: 1, explain: "It's the cost of using the asset." },
              { q: "Selling price R30 000; carrying value R34 000. The result is…", options: ["profit R4 000", "loss R4 000", "profit R64 000", "no effect"], answer: 1, explain: "Sold for less than it's worth on the books." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Analysis
  {
    slug: "analysis-interpretation-11",
    topic: "g11-analysis",
    order: 1,
    title: "Analysis & interpretation",
    tagline: "Ratios turn a page of numbers into a story about the business.",
    emoji: "🔍",
    caps: "CAPS Gr 11 · Financial Accounting: analysis and interpretation of the financial statements of a sole trader and partnership – profitability, liquidity, solvency, risk and returns.",
    objectives: ["Calculate the CAPS ratios for profitability, liquidity, solvency and returns", "Interpret ratios and compare them over two years", "Write exam-quality comments quoting figures", "Suggest actions for the owner"],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 100,
    terms: [
      { term: "Profitability", def: "How well the business turns sales into profit (GP %, NP %, mark-up achieved)." },
      { term: "Liquidity", def: "The ability to pay short-term debts (current ratio, acid-test ratio, stock-holding period, debtors and creditors periods)." },
      { term: "Solvency", def: "Whether total assets are more than total liabilities (solvency ratio)." },
      { term: "Gearing (financial risk)", def: "How much the business relies on borrowed money (debt-equity ratio)." },
      { term: "Return on owner's equity", def: "Net profit ÷ average owner's equity × 100 – is the owner earning a good return?" },
      { term: "Current ratio", def: "Current assets : current liabilities." },
      { term: "Acid-test ratio", def: "(Current assets − inventories) : current liabilities." },
      { term: "Debtors collection period", def: "Average debtors ÷ credit sales × 365 – how many days customers take to pay." },
    ],
    chunks: [
      {
        id: "lab",
        title: "The ratio dashboard",
        minutes: 9,
        blocks: [
          { type: "text", md: "There are four big questions an owner asks. Ratios answer them:\n\n1. **Profitability** – am I making enough profit on my sales?\n2. **Liquidity** – can I pay my bills next month?\n3. **Solvency & risk** – could I pay all my debts if I closed? Am I borrowing too much?\n4. **Returns** – is my investment earning more than a bank would pay?" },
          { type: "widget", widget: "ratio-lab" },
        ],
      },
      {
        id: "comment",
        title: "Writing good comments",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Comment on liquidity",
            problem: "Current ratio: 2,1:1 last year, 0,9:1 this year. Acid-test ratio: 1,2:1 last year, 0,4:1 this year.",
            steps: [
              { md: "**Quote the figures:** The current ratio dropped from 2,1:1 to 0,9:1 and the acid-test ratio from 1,2:1 to 0,4:1.", why: "Markers give a mark for the figures." },
              { md: "**Explain:** Current liabilities are now more than current assets – the business will struggle to pay creditors on time.", why: "Show you understand the meaning." },
              { md: "**Dig deeper:** The big gap between the two ratios shows that most current assets are tied up in stock." },
              { md: "**Advise:** Reduce stock levels (sales/specials), collect from debtors faster, avoid buying more on credit." },
            ],
          },
          {
            type: "practice",
            id: "ratio-practice",
            problems: [
              { q: "Sales R850 000; cost of sales R510 000. Calculate gross profit on sales (%).", answer: "40", unit: "%", tol: 0.06, solution: "GP = R340 000. R340 000 ÷ R850 000 × 100 = **40%**" },
              { q: "Current assets R156 000; current liabilities R120 000. Calculate the current ratio (x:1).", answer: "1.3", unit: ": 1", tol: 0.011, solution: "R156 000 ÷ R120 000 = **1,3 : 1**" },
              { q: "Average debtors R73 000; credit sales R532 900. Calculate the debtors collection period in days (whole days).", answer: "50", unit: "days", tol: 0.6, solution: "R73 000 ÷ R532 900 × 365 = **50 days**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["ratios"], title: "Ratio drill" } },
          { type: "callout", variant: "exam", md: "Formula → substitution → answer with the right format (%, : 1 or days). Write ratios as **x : 1** (e.g. 1,5 : 1) and percentages to one decimal unless told otherwise." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Profitability, liquidity, solvency/risk, returns.", "Always quote figures, then explain, then advise.", "Acid-test removes stock because stock is the slowest to turn into cash.", "Compare debtors' collection days with the credit terms offered."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "analysis11-quiz",
            questions: [
              { q: "Which ratio measures liquidity?", options: ["Debt-equity", "Acid-test", "Net profit on sales", "Return on equity"], answer: 1, explain: "Acid-test = can we pay short-term debts quickly?" },
              { q: "A debt-equity ratio of 1,8:1 means the business is…", options: ["low-geared (safe)", "highly geared (risky)", "very liquid", "very profitable"], answer: 1, explain: "Borrowed money is almost twice the owner's equity." },
              { q: "Debtors take 75 days to pay but terms are 30 days. The business should…", options: ["give more credit", "tighten credit control and follow up on late payers", "stop paying creditors", "increase mark-up"], answer: 1, explain: "Slow debtors starve the business of cash." },
              { q: "The return on owner's equity is 6%; a fixed deposit pays 8%. This suggests…", options: ["the owner is earning less than a safe alternative", "the business is insolvent", "the current ratio is too high", "the business has no debtors"], answer: 0, explain: "Compare with the opportunity cost." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Reconciliations
  {
    slug: "debtors-creditors-reconciliations",
    topic: "g11-reconciliations",
    order: 1,
    title: "Debtors & creditors reconciliations",
    tagline: "When the list and the control account disagree, someone made a mistake.",
    emoji: "🔁",
    caps: "CAPS Gr 11 · Managing Resources: debtors and creditors reconciliations – Debtors control vs debtors' list; creditors' statements vs Creditors Ledger accounts; internal control.",
    objectives: ["Explain why the control account and the list may differ", "Correct errors in the Debtors control account and debtors' list", "Reconcile a creditor's statement with the Creditors Ledger account", "Suggest internal controls over debtors and creditors"],
    styles: ["kinaesthetic", "read-write"],
    xp: 80,
    terms: [
      { term: "Debtors control account", def: "A General Ledger account showing the total owed by all debtors." },
      { term: "Debtors' list", def: "A list of the balances of each individual debtor in the Debtors Ledger – its total must equal Debtors control." },
      { term: "Creditor's statement", def: "A statement sent by a supplier showing what they think we owe them." },
      { term: "Undercast / overcast", def: "A column total that is added up too small (undercast) or too big (overcast)." },
      { term: "Transposition error", def: "Digits swapped around, e.g. R4 560 recorded as R4 650. The difference is always divisible by 9." },
    ],
    chunks: [
      {
        id: "debtors",
        title: "Debtors: control account vs list",
        minutes: 8,
        blocks: [
          { type: "text", md: "Errors in **journals** (totals) affect the **control account**. Errors in **posting to an individual debtor** affect the **list**. Some errors affect both." },
          {
            type: "table",
            headers: ["Error", "Debtors control", "Debtors' list"],
            rows: [
              ["DJ undercast by R500", "+ R500", "no effect"],
              ["Invoice of R1 200 not recorded at all", "+ R1 200", "+ R1 200"],
              ["Payment of R800 posted to the wrong debtor's account", "no effect", "+ R800 and − R800 (no net effect)"],
              ["Credit note R300 posted to the debit side of the debtor's account", "no effect", "− R600"],
              ["Interest of R90 on overdue account not recorded", "+ R90", "+ R90"],
            ],
          },
          { type: "callout", variant: "tip", md: "Posting to the **wrong side** of an account doubles the error: the amount isn't subtracted AND it's wrongly added. Fix it with **2 ×** the amount." },
          { type: "widget", widget: "drill", props: { generators: ["debtors-recon"], title: "Reconciliation drill" } },
        ],
      },
      {
        id: "creditors",
        title: "Creditors' statements",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Reconcile with Shoe Wholesalers",
            problem: "Statement from Shoe Wholesalers: R46 300. Our Creditors Ledger shows R38 950. Differences: our EFT of R6 000 on 30 June is not on the statement; the supplier charged R350 interest that we haven't recorded; they recorded an invoice of R1 000 twice.",
            steps: [
              { md: "Start with the statement: **R46 300**" },
              { md: "− EFT not yet on the statement (R6 000) → R40 300" },
              { md: "− duplicate invoice (R1 000) → **R39 300**" },
              { md: "Our ledger R38 950 + interest R350 (enter in our books) = **R39 300** ✔ reconciled" },
            ],
          },
          {
            type: "practice",
            id: "recon11-practice",
            problems: [
              { q: "Debtors control shows R54 300. The DJ was overcast by R900 and a debtor's cheque of R1 500 was dishonoured but not recorded. Calculate the correct Debtors control balance.", answer: "54900", unit: "R", hint: "Overcast DJ → too much debited. A dishonoured cheque means the debtor owes us again.", solution: "R54 300 − R900 + R1 500 = **R54 900**" },
              { q: "An amount of R7 830 was recorded as R7 380. Calculate the difference – and check if it is divisible by 9.", answer: "450", unit: "R", solution: "R7 830 − R7 380 = **R450**; 450 ÷ 9 = 50 ✔ – a transposition error." },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Journal (total) errors → control account. Individual posting errors → the list.", "Wrong side of an account = 2 × the amount.", "Payments in transit and supplier errors explain creditor statement differences.", "Transposition errors are divisible by 9."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "recon11-quiz",
            questions: [
              { q: "The Debtors Journal was undercast by R200. Which is affected?", options: ["Debtors' list only", "Debtors control only", "Both", "Neither"], answer: 1, explain: "The DJ total is posted to the control account." },
              { q: "A payment we made on the last day isn't on the creditor's statement. On the reconciliation we…", options: ["add it to the statement balance", "subtract it from the statement balance", "ignore it", "add it to our ledger"], answer: 1, explain: "The supplier will deduct it once they receive it." },
              { q: "Which difference suggests a transposition error?", options: ["R100", "R270", "R250", "R55"], answer: 1, explain: "270 ÷ 9 = 30." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Manufacturing
  {
    slug: "manufacturing-cost-accounting",
    topic: "g11-cost",
    order: 1,
    title: "Manufacturing cost accounting",
    tagline: "From planks to school chairs: what does one unit really cost?",
    emoji: "🏭",
    caps: "CAPS Gr 11 · Managerial Accounting: cost accounting for a manufacturing business – direct material, direct labour, factory overheads, administration and selling & distribution costs, Production Cost Statement, unit costs.",
    objectives: ["Classify costs of a manufacturer", "Calculate prime cost and total manufacturing cost", "Prepare a Production Cost Statement", "Calculate and comment on unit costs"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 90,
    terms: [
      { term: "Direct material cost", def: "Raw materials that become part of the product, e.g. wood in a chair." },
      { term: "Direct labour cost", def: "Wages of workers who physically make the product." },
      { term: "Prime cost", def: "Direct material cost + direct labour cost." },
      { term: "Factory overhead cost", def: "All other factory costs: indirect materials and labour, factory rent, water and electricity, depreciation on factory equipment." },
      { term: "Administration cost", def: "Office costs, e.g. office salaries, stationery, office rent." },
      { term: "Selling & distribution cost", def: "Costs of selling and delivering, e.g. advertising, sales commission, delivery vehicle costs." },
      { term: "Work-in-process", def: "Products that are partly finished at year-end – an asset." },
    ],
    chunks: [
      {
        id: "classify",
        title: "Where does each cost go?",
        minutes: 7,
        blocks: [
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "manufacturing-costs", title: "Classify the costs of a chair factory", buckets: ["Direct material", "Direct labour", "Factory overheads", "Admin / selling"], colour: "var(--t-cost)",
              items: [
                { text: "Pine planks", bucket: "Direct material" }, { text: "Wages of carpenters", bucket: "Direct labour" }, { text: "Factory supervisor's salary", bucket: "Factory overheads" },
                { text: "Glue and sandpaper (indirect materials)", bucket: "Factory overheads" }, { text: "Factory electricity", bucket: "Factory overheads" }, { text: "Office stationery", bucket: "Admin / selling" },
                { text: "Advertising on radio", bucket: "Admin / selling" }, { text: "Depreciation on factory machines", bucket: "Factory overheads" }, { text: "Steel for the chair legs", bucket: "Direct material" },
                { text: "Salesperson's commission", bucket: "Admin / selling" },
              ],
            },
          },
          { type: "callout", variant: "tip", md: "Shared costs (like rent for a building that is 80% factory and 20% office) must be **split**: 80% to factory overheads, 20% to administration." },
        ],
      },
      {
        id: "lab",
        title: "Production Cost Statement",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "cost-lab" },
          {
            type: "practice",
            id: "cost11-practice",
            problems: [
              { q: "Raw materials: opening stock R18 000, purchases R140 000, carriage R4 000, closing stock R22 000. Calculate direct material cost.", answer: "140000", unit: "R", solution: "R18 000 + R144 000 − R22 000 = **R140 000**" },
              { q: "Prime cost R230 000; factory overheads R95 000; WIP opening R12 000, closing R17 000. Calculate cost of production of finished goods.", answer: "320000", unit: "R", solution: "R230 000 + R95 000 + R12 000 − R17 000 = **R320 000**" },
              { q: "Cost of production R320 000 for 4 000 chairs. Calculate the cost per chair.", answer: "80", unit: "R", solution: "R320 000 ÷ 4 000 = **R80**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["manufacturing"], title: "Manufacturing drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Prime cost = direct materials + direct labour.", "Total manufacturing cost = prime cost + factory overheads.", "Cost of production = total manufacturing cost + opening WIP − closing WIP.", "Admin and selling costs are NOT production costs."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "cost11-quiz",
            questions: [
              { q: "The factory foreman's salary is…", options: ["direct labour", "factory overheads", "administration", "selling"], answer: 1, explain: "Indirect labour → factory overheads." },
              { q: "Prime cost includes…", options: ["direct materials and direct labour", "all factory costs", "admin costs", "selling costs"], answer: 0, explain: "Just the two direct costs." },
              { q: "Closing work-in-process is…", options: ["added", "subtracted", "ignored", "an expense"], answer: 1, explain: "It hasn't been finished yet." },
              { q: "If production doubles, the fixed cost per unit…", options: ["doubles", "halves", "stays the same", "becomes zero"], answer: 1, explain: "The same total spread over twice as many units." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Cash budgets
  {
    slug: "cash-budgets",
    topic: "g11-budget",
    order: 1,
    title: "Cash budgets",
    tagline: "Profit is an opinion, cash is a fact. Plan it month by month.",
    emoji: "💰",
    caps: "CAPS Gr 11 · Managerial Accounting: budgeting – the cash budget, debtors' collection schedule, creditors' payment schedule, interpretation and internal control.",
    objectives: ["Prepare a debtors' collection schedule", "Prepare a cash budget for several months", "Identify items that do not belong in a cash budget", "Comment on a cash budget and suggest actions"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 90,
    terms: [
      { term: "Debtors' collection schedule", def: "Shows when credit sales will be collected (e.g. 40% in the month of sale, 50% the next month…)." },
      { term: "Creditors' payment schedule", def: "Shows when credit purchases will be paid." },
      { term: "Cash surplus / deficit", def: "Receipts − payments for the month." },
      { term: "Overdraft", def: "A negative bank balance – the bank lends you money at a high interest rate." },
      { term: "Non-cash item", def: "An item that affects profit but not cash, e.g. depreciation, bad debts, provision for bad debts." },
    ],
    chunks: [
      {
        id: "lab",
        title: "Play with a cash budget",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "cash-budget-lab" },
          { type: "callout", variant: "key", md: "A business can be **profitable** and still **run out of cash** – if customers pay late, or if it buys too much stock. That's why every business needs a cash budget." },
        ],
      },
      {
        id: "collections",
        title: "Collecting from debtors",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Collection schedule",
            problem: "Credit sales: April R60 000, May R80 000, June R90 000. Debtors pay 30% in the month of sale (and get a 5% discount), 60% the next month, 8% the month after; 2% are bad debts. Calculate June's collections.",
            steps: [
              { md: "June sales: R90 000 × 30% × 95% = **R25 650**", why: "The 5% discount reduces what we receive." },
              { md: "May sales: R80 000 × 60% = **R48 000**" },
              { md: "April sales: R60 000 × 8% = **R4 800**" },
              { md: "Total June collections = **R78 450**", why: "The 2% bad debts are never collected – they never appear in a cash budget." },
            ],
          },
          {
            type: "practice",
            id: "budget11-practice",
            problems: [
              { q: "Credit sales: July R50 000, August R70 000. Debtors pay 40% in the month of sale and 60% the next month. Calculate August's collections.", answer: "58000", unit: "R", solution: "R70 000 × 40% + R50 000 × 60% = R28 000 + R30 000 = **R58 000**" },
              { q: "Opening bank R12 000; receipts R95 000; payments R113 500. Calculate the closing bank balance (negative for an overdraft).", answer: "-6500", unit: "R", solution: "R12 000 + R95 000 − R113 500 = **−R6 500** (overdraft)" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["collections"], title: "Collections drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Only cash items appear in a cash budget.", "Collections follow the payment pattern of debtors; discounts reduce cash; bad debts are never received.", "Opening balance + receipts − payments = closing balance.", "Comment: quote the shortfall and suggest actions (collect faster, delay purchases, arrange finance)."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "budget11-quiz",
            questions: [
              { q: "Which does NOT belong in a cash budget?", options: ["Loan received", "Depreciation", "Rent paid", "Cash sales"], answer: 1, explain: "Depreciation is a non-cash expense." },
              { q: "A projected overdraft in March suggests the business should…", options: ["buy more stock on credit", "arrange an overdraft facility or speed up collections", "increase drawings", "ignore it"], answer: 1, explain: "Plan finance before it is needed." },
              { q: "Debtors receive a 5% discount for paying in the month of sale. This…", options: ["increases cash received", "reduces cash received from those debtors", "doesn't affect cash", "is a bad debt"], answer: 1, explain: "They pay 95% of the amount." },
            ],
          },
        ],
      },
    ],
  },
];
