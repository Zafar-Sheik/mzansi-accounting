import type { Lesson } from "../types";

const m = String.raw;

export const G12: Lesson[] = [
  // ------------------------------------------------------------------ Companies
  {
    slug: "companies-ledger",
    topic: "g12-companies",
    order: 1,
    title: "Companies: shares, shareholders & the ledger",
    tagline: "Own a slice of a business – and see how the books track every share.",
    emoji: "🏢",
    caps: "CAPS Gr 12 · Financial Accounting: companies – the Companies Act, characteristics, share capital, share buy-backs, retained income, income tax, dividends; ledger accounts of a company.",
    objectives: ["Describe the characteristics of a company", "Record the issue and buy-back of shares", "Prepare the Ordinary share capital and Retained income accounts", "Calculate income tax and dividends"],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 100,
    terms: [
      { term: "Public company (Ltd)", def: "A company that may offer shares to the public, e.g. listed on the JSE. At least 3 directors." },
      { term: "Private company (Pty) Ltd", def: "A company whose shares cannot be offered to the public and are not freely transferable." },
      { term: "Authorised shares", def: "The maximum number of shares a company may issue, as set out in its Memorandum of Incorporation (MOI)." },
      { term: "Issued shares", def: "Shares actually sold to shareholders." },
      { term: "Ordinary share capital", def: "The money received from issuing ordinary shares – part of shareholders' equity." },
      { term: "Share buy-back (repurchase)", def: "The company buys back its own shares. Ordinary share capital decreases at the average issue price; any excess paid comes out of retained income." },
      { term: "Retained income", def: "Profits kept in the company after income tax and dividends (accumulated profits)." },
      { term: "Dividends", def: "The part of profit paid to shareholders: interim (during the year) and final (declared at year-end)." },
      { term: "Income tax", def: "Company tax paid to SARS – 27% of taxable profit. Companies pay provisional tax in advance during the year." },
    ],
    chunks: [
      {
        id: "intro",
        title: "Why companies?",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: "When you buy a share in Shoprite, Capitec or MTN on the JSE, you become a **part-owner** of that company. If it does well you get **dividends** and your share price may rise. If it fails, you lose only what you paid – that is **limited liability**." },
          {
            type: "table",
            headers: ["", "Sole trader", "Partnership", "Company"],
            rows: [
              ["Legal person", "No", "No", "Yes"],
              ["Liability", "Unlimited", "Unlimited", "Limited"],
              ["Continuity", "Ends with the owner", "Ends if a partner leaves", "Continues forever (perpetual succession)"],
              ["Owners' equity", "Capital", "Capital & current accounts", "Ordinary share capital + retained income"],
              ["Tax", "Owner pays personal tax", "Partners pay personal tax", "Company pays 27% income tax; shareholders pay 20% dividends tax"],
            ],
          },
        ],
      },
      {
        id: "shares",
        title: "Shares & buy-backs",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Repurchasing shares",
            problem: "Ordinary share capital: 800 000 shares, R2 400 000. The company buys back 50 000 shares at R4,20 each.",
            steps: [
              { md: "Average issue price = R2 400 000 ÷ 800 000 = **R3,00**" },
              { md: "Ordinary share capital decreases by 50 000 × R3,00 = **R150 000**", why: "OSC is always reduced at the average issue price." },
              { md: "Total paid = 50 000 × R4,20 = **R210 000**" },
              { md: "Retained income decreases by R210 000 − R150 000 = **R60 000**", why: "The extra above the average price comes out of retained income." },
            ],
          },
          {
            type: "text",
            md: "The **Retained income** account at year-end:\n\n- Credit: balance at the start + **net profit after tax**\n- Debit: **ordinary share dividends** (interim + final) and any **share buy-back excess**\n- Balance = retained income at year-end",
          },
          {
            type: "practice",
            id: "company-practice",
            problems: [
              { q: "Net profit before tax R1 800 000; income tax at 27%. Calculate net profit after tax.", answer: "1314000", unit: "R", solution: "Tax = R486 000. R1 800 000 − R486 000 = **R1 314 000**" },
              { q: "600 000 shares in issue; final dividend 45 cents per share. Calculate the final dividend.", answer: "270000", unit: "R", solution: "600 000 × R0,45 = **R270 000**" },
              { q: "Retained income at the start R520 000; net profit after tax R1 314 000; interim dividends R180 000; final dividends R270 000; buy-back excess R60 000. Calculate retained income at year-end.", answer: "1324000", unit: "R", solution: "R520 000 + R1 314 000 − R180 000 − R270 000 − R60 000 = **R1 324 000**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["companies"], title: "Company calculations drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Companies are legal persons with limited liability and perpetual succession.", "Buy-backs: OSC down at average price; excess from retained income.", "Retained income = opening + NPAT − dividends − buy-back excess.", "Company tax 27%; provisional tax is paid during the year."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "company-quiz",
            questions: [
              { q: "Which document sets out the authorised shares of a company?", options: ["Partnership agreement", "Memorandum of Incorporation", "IRP5", "Audit report"], answer: 1, explain: "The MOI is the company's founding document." },
              { q: "Shares bought back above the average issue price: the excess is debited to…", options: ["Ordinary share capital", "Retained income", "Bank", "Dividends"], answer: 1, explain: "The premium comes out of retained income." },
              { q: "Shareholders have…", options: ["unlimited liability", "limited liability", "no voting rights", "a fixed salary"], answer: 1, explain: "They can lose only their investment." },
              { q: "The company income tax rate in South Africa is…", options: ["15%", "27%", "28%", "45%"], answer: 1, explain: "27% for years of assessment ending on or after 31 March 2023." },
              { q: "A final dividend declared but not yet paid at year-end is a…", options: ["current asset", "current liability", "non-current liability", "income"], answer: 1, explain: "Shareholders for dividends – a current liability." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Company statements
  {
    slug: "company-financial-statements",
    topic: "g12-statements",
    order: 1,
    title: "Company financial statements & notes",
    tagline: "The annual report: Income Statement, Balance Sheet and the notes that explain them.",
    emoji: "📑",
    caps: "CAPS Gr 12 · Financial Accounting: financial statements of a company – Income Statement, Balance Sheet and notes, with year-end adjustments; correcting a net profit figure.",
    objectives: ["Prepare a company Income Statement including income tax", "Prepare the shareholders' equity and liabilities sections of the Balance Sheet", "Complete notes: fixed assets, inventories, receivables, payables, OSC, retained income", "Correct net profit for adjustments"],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 110,
    terms: [
      { term: "Operating profit", def: "Gross operating income − operating expenses: profit from the main activities." },
      { term: "Net profit before tax", def: "Operating profit + interest income − interest expense." },
      { term: "Shareholders' equity", def: "Ordinary share capital + retained income." },
      { term: "Trade and other receivables", def: "Net debtors + prepaid expenses + accrued income (+ SARS income tax if overpaid)." },
      { term: "Trade and other payables", def: "Creditors + accrued expenses + income received in advance + SARS income tax owed + shareholders for dividends." },
      { term: "Current portion of loan", def: "The part of a loan that will be repaid in the next 12 months – a current liability." },
      { term: "Cash and cash equivalents", def: "Bank balances, cash float, petty cash and short-term fixed deposits (maturing within 3 months)." },
    ],
    chunks: [
      {
        id: "lab",
        title: "Build a Balance Sheet that balances",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "statement-builder", props: { title: "Warm-up: place the accounts" } },
          {
            type: "table",
            headers: ["Company Balance Sheet (extract)", ""],
            rows: [
              ["**Ordinary shareholders' equity**", "Ordinary share capital + Retained income"],
              ["**Non-current liabilities**", "Loan (minus the current portion)"],
              ["**Current liabilities**", "Trade and other payables; Shareholders for dividends; Current portion of loan; Bank overdraft"],
              ["**Non-current assets**", "Fixed/tangible assets (carrying value); Fixed deposit (> 12 months)"],
              ["**Current assets**", "Inventories; Trade and other receivables; Cash and cash equivalents"],
            ],
          },
        ],
      },
      {
        id: "correct-np",
        title: "Correcting net profit",
        minutes: 9,
        blocks: [
          { type: "text", md: "A classic Paper 1 question: \"The bookkeeper calculated net profit as R480 000 but forgot the adjustments. Calculate the correct net profit.\" Work through each adjustment and decide **+** or **−**." },
          {
            type: "table",
            headers: ["Adjustment", "Effect on net profit"],
            rows: [
              ["Insurance prepaid R4 000", "+ R4 000 (expense was too high)"],
              ["Salary of R12 000 still owing", "− R12 000"],
              ["Rent received in advance R6 000", "− R6 000 (income was too high)"],
              ["Interest on fixed deposit still receivable R3 200", "+ R3 200"],
              ["Depreciation not yet provided R45 000", "− R45 000"],
              ["Provision for bad debts decreased by R1 500", "+ R1 500"],
            ],
          },
          {
            type: "practice",
            id: "company-np-practice",
            problems: [
              { q: "Net profit before the adjustments in the table above: R480 000. Calculate the correct net profit before tax.", answer: "425700", unit: "R", solution: "R480 000 + 4 000 − 12 000 − 6 000 + 3 200 − 45 000 + 1 500 = **R425 700**" },
              { q: "Income tax is 27% of the correct net profit before tax (R425 700). Calculate income tax.", answer: "114939", unit: "R", solution: "27% × R425 700 = **R114 939**" },
              { q: "Provisional tax paid during the year R120 000; income tax for the year R114 939. Is SARS owed money, or does SARS owe the company? Type the amount SARS OWES THE COMPANY (a receivable).", answer: "5061", unit: "R", solution: "Paid more than owed: R120 000 − R114 939 = **R5 061** – shown under trade and other receivables." },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Income Statement: … net profit before tax − income tax = net profit after tax.", "Shareholders' equity = OSC + retained income.", "Unpaid final dividends and owed income tax are current liabilities.", "Current portion of loan moves to current liabilities."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "company-fs-quiz",
            questions: [
              { q: "Shareholders for dividends is part of…", options: ["trade and other receivables", "current liabilities", "non-current liabilities", "equity"], answer: 1, explain: "The company owes declared dividends." },
              { q: "Provisional tax paid exceeds income tax for the year. The difference is…", options: ["a current liability", "a current asset (receivable)", "income", "an expense"], answer: 1, explain: "SARS owes the company." },
              { q: "Forgetting R20 000 of depreciation means net profit was…", options: ["understated by R20 000", "overstated by R20 000", "correct", "doubled"], answer: 1, explain: "An expense was left out, so profit is too high." },
              { q: "A fixed deposit maturing in 2 months is part of…", options: ["non-current assets", "cash and cash equivalents", "inventories", "trade and other payables"], answer: 1, explain: "It matures within 3 months." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Cash flow
  {
    slug: "cash-flow-statement",
    topic: "g12-cash-flow",
    order: 1,
    title: "The cash flow statement",
    tagline: "Where did the cash come from – and where did it go?",
    emoji: "🌊",
    caps: "CAPS Gr 12 · Financial Accounting: the Cash Flow Statement – cash effects of operating, investing and financing activities; notes; net change in cash and cash equivalents.",
    objectives: ["Classify cash flows into operating, investing and financing activities", "Calculate income tax paid and dividends paid", "Calculate fixed assets purchased", "Calculate the net change in cash and cash equivalents"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 110,
    terms: [
      { term: "Operating activities", def: "Cash from the main business: cash generated from operations, interest paid, income tax paid, dividends paid." },
      { term: "Investing activities", def: "Buying and selling fixed assets and long-term investments (e.g. fixed deposits)." },
      { term: "Financing activities", def: "Raising or repaying finance: issuing or buying back shares, receiving or repaying loans." },
      { term: "Cash generated from operations", def: "Net profit before tax adjusted for non-cash items (depreciation) and changes in working capital, plus interest expense." },
      { term: "Net change in cash", def: "Closing cash and cash equivalents − opening cash and cash equivalents." },
    ],
    chunks: [
      {
        id: "sort",
        title: "Three buckets",
        minutes: 7,
        blocks: [
          { type: "callout", variant: "real-world", md: "A company can report a big profit and still be short of cash – maybe it bought new trucks, repaid a loan and paid huge dividends. The **cash flow statement** shows exactly where the money went." },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "cashflow-sorter", title: "Operating, investing or financing?", buckets: ["Operating", "Investing", "Financing"], colour: "var(--t-report)",
              items: [
                { text: "Income tax paid", bucket: "Operating" }, { text: "Bought a delivery truck", bucket: "Investing" }, { text: "Issued new shares", bucket: "Financing" },
                { text: "Dividends paid", bucket: "Operating" }, { text: "Repaid part of the loan", bucket: "Financing" }, { text: "Sold old equipment", bucket: "Investing" },
                { text: "Interest paid on the loan", bucket: "Operating" }, { text: "Bought back shares", bucket: "Financing" }, { text: "Invested in a 2-year fixed deposit", bucket: "Investing" },
              ],
            },
          },
          { type: "callout", variant: "memory", md: "**O**perating = **O**rdinary day-to-day. **I**nvesting = **I**tems we keep (assets). **F**inancing = **F**unders (shareholders and lenders)." },
        ],
      },
      {
        id: "calcs",
        title: "The key calculations",
        minutes: 9,
        blocks: [
          {
            type: "text",
            md: m`$$\text{Tax paid} = \text{Owed at start} + \text{Tax for the year} - \text{Owed at end}$$

$$\text{Dividends paid} = \text{Last year's final dividend} + \text{This year's interim dividend}$$

$$\text{Fixed assets bought} = \text{Closing CV} - \text{Opening CV} + \text{Depreciation} + \text{CV of assets sold}$$`,
          },
          {
            type: "practice",
            id: "cashflow-practice",
            problems: [
              { q: "SARS was owed R18 000 at the start of the year and R24 000 at the end. Income tax for the year R210 000. Calculate income tax paid.", answer: "204000", unit: "R", solution: "R18 000 + R210 000 − R24 000 = **R204 000**" },
              { q: "Last year's final dividend R95 000 (paid this year). This year's interim dividend R60 000; final dividend R110 000 (unpaid). Calculate dividends paid.", answer: "155000", unit: "R", solution: "R95 000 + R60 000 = **R155 000**" },
              { q: "Fixed assets (carrying value): opening R1 400 000, closing R1 520 000. Depreciation R130 000. Assets sold at carrying value R40 000. Calculate fixed assets purchased.", answer: "290000", unit: "R", solution: "R1 520 000 − R1 400 000 + R130 000 + R40 000 = **R290 000**" },
              { q: "Net cash from operating R320 000; investing (R290 000); financing R85 000. Calculate the net change in cash and cash equivalents.", answer: "115000", unit: "R", solution: "R320 000 − R290 000 + R85 000 = **R115 000** increase" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["cash-flow"], title: "Cash flow drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Operating: CGO, interest paid, tax paid, dividends paid.", "Investing: buying/selling fixed assets and long-term investments.", "Financing: shares issued/bought back, loans received/repaid.", "Cash outflows are shown in brackets."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "cashflow-quiz",
            questions: [
              { q: "Repaying a loan is a(n)… activity.", options: ["operating", "investing", "financing", "non-cash"], answer: 2, explain: "Loans are financing." },
              { q: "Depreciation is added back in cash generated from operations because…", options: ["it is income", "it is a non-cash expense", "it is paid to SARS", "it increases assets"], answer: 1, explain: "No cash left the business." },
              { q: "Dividends paid this year usually include…", options: ["this year's final dividend", "last year's final + this year's interim", "only interim", "dividends received"], answer: 1, explain: "Final dividends are paid after year-end." },
              { q: "Buying equipment is shown under investing activities as…", options: ["a cash inflow", "a cash outflow in brackets", "a non-cash item", "a financing item"], answer: 1, explain: "Cash goes out to buy an asset." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Analysis 12
  {
    slug: "company-analysis",
    topic: "g12-analysis",
    order: 1,
    title: "Analysing a company: shares, returns & risk",
    tagline: "Should you buy more shares? The ratios will tell you.",
    emoji: "📈",
    caps: "CAPS Gr 12 · Financial Accounting: analysis and interpretation of company financial statements – EPS, DPS, dividend pay-out rate, NAV, market price, ROSHE, ROTCE, liquidity, solvency and gearing; dividend policy.",
    objectives: ["Calculate EPS, DPS, dividend pay-out rate and NAV", "Compare NAV with the market price", "Calculate and interpret ROSHE and ROTCE", "Advise shareholders and directors"],
    styles: ["visual", "read-write"],
    xp: 110,
    terms: [
      { term: "Earnings per share (EPS)", def: "Net profit after tax ÷ number of shares × 100 – how much profit each share earned (cents)." },
      { term: "Dividends per share (DPS)", def: "Total dividends ÷ number of shares × 100 – how much each share was paid (cents)." },
      { term: "Dividend pay-out rate", def: "DPS ÷ EPS × 100 – the % of profit paid out; the rest is retained for growth." },
      { term: "Net asset value per share (NAV)", def: "Shareholders' equity ÷ number of shares × 100 – what each share is 'worth' on the books." },
      { term: "Market price", def: "What a share trades for on the JSE – reflects investors' expectations." },
      { term: "ROSHE", def: "Return on shareholders' equity: NPAT ÷ average shareholders' equity × 100." },
      { term: "ROTCE", def: "Return on total capital employed: (NPBT + interest expense) ÷ average (equity + non-current liabilities) × 100." },
      { term: "Positive gearing", def: "When ROTCE is higher than the interest rate on loans, borrowing increases shareholders' returns." },
    ],
    chunks: [
      {
        id: "shares",
        title: "Share ratios",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Mzansi Motors Ltd",
            problem: "NPAT R2 700 000; 1 500 000 shares; dividends R1 200 000; shareholders' equity R12 000 000; market price R9,40.",
            steps: [
              { md: "EPS = R2 700 000 ÷ 1 500 000 × 100 = **180 cents**" },
              { md: "DPS = R1 200 000 ÷ 1 500 000 × 100 = **80 cents**" },
              { md: "Pay-out rate = 80 ÷ 180 × 100 = **44,4%** – the company keeps 55,6% of profit for growth" },
              { md: "NAV = R12 000 000 ÷ 1 500 000 × 100 = **800 cents**" },
              { md: "Market price (940c) > NAV (800c): investors value the company above its book value – they are confident in its future.", why: "Always compare market price with NAV in the exam." },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["share-ratios"], title: "EPS, DPS & NAV drill" } },
        ],
      },
      {
        id: "returns",
        title: "Returns, gearing & liquidity",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "ratio-lab" },
          {
            type: "practice",
            id: "analysis12-practice",
            problems: [
              { q: "NPAT R1 080 000; average shareholders' equity R7 200 000. Calculate ROSHE (%).", answer: "15", unit: "%", tol: 0.06, solution: "R1 080 000 ÷ R7 200 000 × 100 = **15%**" },
              { q: "NPBT R1 500 000; interest expense R180 000; average equity R7 200 000; average loans R1 200 000. Calculate ROTCE (%, one decimal).", answer: "20", unit: "%", tol: 0.06, solution: "(R1 500 000 + R180 000) ÷ R8 400 000 × 100 = **20%**" },
              { q: "ROTCE is 20% and the loan interest rate is 13%. Is the company positively geared? Type yes or no.", answer: "yes | y", kind: "text", solution: "**Yes** – the business earns 20% on borrowed money that costs only 13%, so the loans increase shareholders' returns." },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["EPS, DPS and NAV are in cents per share.", "Pay-out rate = DPS ÷ EPS × 100.", "Market price above NAV = investor confidence.", "Positive gearing: ROTCE > interest rate on loans."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "analysis12-quiz",
            questions: [
              { q: "EPS 200c, DPS 150c. The pay-out rate is…", options: ["25%", "75%", "133%", "50%"], answer: 1, explain: "150 ÷ 200 × 100 = 75%." },
              { q: "A low pay-out rate usually means the directors…", options: ["want to expand using retained profits", "are in trouble", "have no profit", "will liquidate"], answer: 0, explain: "Profits are kept for growth." },
              { q: "A shareholder wants to know if the share is fairly priced. Compare…", options: ["EPS and DPS", "market price and NAV", "current ratio and acid-test", "sales and cost of sales"], answer: 1, explain: "NAV vs market price." },
              { q: "Debt-equity 0,2:1 means the company is…", options: ["highly geared", "lowly geared (low risk)", "insolvent", "illiquid"], answer: 1, explain: "Little borrowed money compared with equity." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Audit
  {
    slug: "audit-governance",
    topic: "g12-audit",
    order: 1,
    title: "Audit, ethics & corporate governance",
    tagline: "Who checks the checkers? Auditors, the King Code and good directors.",
    emoji: "⚖️",
    caps: "CAPS Gr 12 · Managing Resources: audit and the audit report (internal and external audit, unqualified, qualified, adverse and disclaimer opinions); corporate governance (King Code); directors' responsibilities and remuneration; ethics.",
    objectives: ["Explain internal vs external audit", "Interpret the types of audit opinions", "Explain the principles of corporate governance (King IV)", "Discuss ethical issues around directors and executives"],
    styles: ["auditory", "read-write"],
    xp: 80,
    terms: [
      { term: "External audit", def: "An independent check of a company's financial statements by a registered auditor, who gives an opinion." },
      { term: "Internal audit", def: "Employees of the company who check internal controls and risk all year round." },
      { term: "Unqualified opinion", def: "A 'clean' audit report: the statements fairly present the financial position in line with IFRS." },
      { term: "Qualified opinion", def: "The statements are fair EXCEPT for a specific problem that the auditor explains." },
      { term: "Adverse opinion", def: "The statements do NOT fairly present the position – serious misstatements." },
      { term: "Disclaimer of opinion", def: "The auditor could not get enough evidence to give any opinion." },
      { term: "King IV Code", def: "South Africa's code of corporate governance: ethical leadership, accountability, transparency and fairness." },
      { term: "IRBA", def: "Independent Regulatory Board for Auditors – registers and regulates auditors in South Africa." },
    ],
    chunks: [
      {
        id: "opinions",
        title: "Reading an audit report",
        minutes: 7,
        blocks: [
          { type: "callout", variant: "real-world", md: "South Africa has seen huge corporate scandals – where executives overstated profits and hid debts. Shareholders, pensioners and workers lost billions. Independent auditors and strong governance exist to stop exactly this." },
          {
            type: "match",
            id: "audit-match",
            title: "Match the opinion to its meaning",
            pairs: [
              { left: "Unqualified", right: "Clean – the statements are fairly presented" },
              { left: "Qualified", right: "Fair, except for one specific issue" },
              { left: "Adverse", right: "Not fairly presented – materially misstated" },
              { left: "Disclaimer", right: "Couldn't form an opinion – not enough evidence" },
            ],
          },
          { type: "callout", variant: "exam", md: "Why does an audit matter to shareholders? Shareholders don't run the company – directors do. The **independent** auditor gives shareholders confidence that the directors' report is true." },
        ],
      },
      {
        id: "governance",
        title: "Good governance",
        minutes: 7,
        blocks: [
          {
            type: "table",
            headers: ["King IV principle", "In practice"],
            rows: [
              ["Ethical, effective leadership", "Directors act honestly and in the company's interest"],
              ["Transparency", "Directors' remuneration is disclosed in the annual report"],
              ["Accountability", "Board committees: audit, remuneration, social & ethics"],
              ["Independence", "Most non-executive directors are independent"],
              ["Stakeholder inclusivity", "Consider workers, communities and the environment, not only shareholders"],
            ],
          },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "governance-sorter", title: "Good or poor governance?", buckets: ["Good governance", "Poor governance"], colour: "var(--t-control)",
              items: [
                { text: "The CEO is also the chairperson of the board", bucket: "Poor governance" },
                { text: "An independent audit committee", bucket: "Good governance" },
                { text: "Directors' bonuses are hidden from shareholders", bucket: "Poor governance" },
                { text: "Rotating the audit partner regularly", bucket: "Good governance" },
                { text: "Directors set their own salaries", bucket: "Poor governance" },
                { text: "A whistle-blowing hotline for staff", bucket: "Good governance" },
              ],
            },
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["External auditors are independent and report to shareholders.", "Opinions: unqualified, qualified, adverse, disclaimer.", "King IV: ethics, transparency, accountability, independence.", "Directors' remuneration must be disclosed."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "audit-quiz",
            questions: [
              { q: "An unqualified audit report means…", options: ["the auditor isn't qualified", "the statements are fairly presented", "there was fraud", "no audit was done"], answer: 1, explain: "It's a clean report." },
              { q: "External auditors report to the…", options: ["directors", "shareholders", "employees", "SARS"], answer: 1, explain: "Shareholders appoint them at the AGM." },
              { q: "Which body regulates auditors in South Africa?", options: ["SARS", "IRBA", "JSE", "SAPS"], answer: 1, explain: "Independent Regulatory Board for Auditors." },
              { q: "Why should the CEO NOT also chair the board?", options: ["It's more expensive", "Too much power in one person – less independent oversight", "It's illegal for private companies", "King IV says CEOs can't vote"], answer: 1, explain: "Separation of roles = checks and balances." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Reconciliations 12
  {
    slug: "reconciliations-matric",
    topic: "g12-reconciliations",
    order: 1,
    title: "Reconciliations at matric level",
    tagline: "Bank, debtors and creditors – plus the internal-control comment that earns the marks.",
    emoji: "🔁",
    caps: "CAPS Gr 12 · Managing Resources: bank, debtors and creditors reconciliations; identifying errors and problems; internal control.",
    objectives: ["Complete a bank reconciliation with errors and dishonoured cheques", "Reconcile debtors and creditors with complex errors", "Identify internal-control problems from reconciliation data", "Suggest practical solutions"],
    styles: ["kinaesthetic", "read-write"],
    xp: 90,
    terms: [
      { term: "Dishonoured (R/D) cheque or EFT", def: "A payment from a debtor that the bank couldn't process (e.g. insufficient funds). The debtor owes us again: record in the CPJ." },
      { term: "Stale cheque", def: "A cheque older than 6 months that the bank will no longer pay – cancel it in the CRJ." },
      { term: "Post-dated cheque", def: "A cheque dated in the future – it can't be recorded yet." },
      { term: "Outstanding deposit", def: "A deposit recorded in the CRJ that doesn't appear on the bank statement yet." },
      { term: "Reconciling item", def: "An item that explains the difference between two records." },
    ],
    chunks: [
      {
        id: "bank",
        title: "Bank reconciliation with twists",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "bank-recon-lab" },
          {
            type: "practice",
            id: "recon12-practice",
            problems: [
              { q: "Bank account before updating: R14 600 (favourable). Statement shows: R/D cheque from a debtor R2 300; bank charges R410; interest income R120; a deposit of R5 800 was entered in the CRJ as R8 500. Calculate the updated Bank account balance.", answer: "9310", unit: "R", hint: "The deposit was over-recorded by R2 700.", solution: "R14 600 − R2 300 − R410 + R120 − R2 700 = **R9 310**" },
              { q: "Bank statement shows R6 950 favourable. Outstanding deposit R4 400; outstanding EFTs R1 200 and R850. Calculate the balance per Bank account.", answer: "9300", unit: "R", solution: "R6 950 + R4 400 − R1 200 − R850 = **R9 300**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["bank-recon", "debtors-recon"], title: "Reconciliation drill" } },
        ],
      },
      {
        id: "controls",
        title: "Spot the problem",
        minutes: 6,
        blocks: [
          {
            type: "match",
            id: "recon-problems",
            title: "Match the reconciliation clue to the internal-control problem",
            pairs: [
              { left: "The same deposit has been outstanding for 3 months", right: "Cash may have been stolen before banking" },
              { left: "Several debtors' EFTs keep being dishonoured", right: "Poor credit checks before selling on credit" },
              { left: "An EFT to an unknown supplier with no invoice", right: "Possible fictitious supplier – need authorisation" },
              { left: "A creditor's statement shows a discount we didn't record", right: "Bookkeeper isn't checking statements" },
            ],
          },
          { type: "callout", variant: "exam", md: "Internal-control answers must be **specific**: \"The cashier should not be the person who records receipts and reconciles the bank\" earns marks; \"improve internal control\" does not." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Update the journals first (statement-only items, errors).", "Then reconcile timing differences.", "R/D cheques: CPJ, and the debtor owes us again.", "Always link problems to specific internal controls."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "recon12-quiz",
            questions: [
              { q: "A debtor's cheque is returned R/D. We record it in the…", options: ["CRJ", "CPJ", "DJ", "GJ"], answer: 1, explain: "It reverses the receipt – money goes out of our bank." },
              { q: "A cheque issued 8 months ago hasn't been presented. It is…", options: ["post-dated", "stale – cancel it in the CRJ", "dishonoured", "an outstanding deposit"], answer: 1, explain: "Stale after 6 months." },
              { q: "Which suggests teeming and lading (hiding stolen cash)?", options: ["Bank charges increased", "Deposits outstanding for long periods", "Interest received", "A debit order"], answer: 1, explain: "Stolen cash is covered with later deposits." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ VAT 12
  {
    slug: "vat-matric",
    topic: "g12-vat",
    order: 1,
    title: "VAT at matric level",
    tagline: "The VAT control account, tricky transactions and ethical traps.",
    emoji: "🧾",
    caps: "CAPS Gr 12 · Managing Resources/Financial Accounting: VAT – VAT calculations, the VAT control account, VAT on bad debts, discounts and drawings; payments to/refunds from SARS; ethical issues.",
    objectives: ["Calculate VAT on a range of transactions", "Prepare the VAT control account", "Explain VAT on bad debts, returns and drawings", "Identify and comment on VAT-related ethical problems"],
    styles: ["kinaesthetic", "read-write"],
    xp: 90,
    terms: [
      { term: "VAT control account", def: "A ledger account with output VAT on the credit side and input VAT on the debit side; the balance is owed to (or by) SARS." },
      { term: "VAT on bad debts", def: "When a debtor's account is written off, the VAT already paid to SARS on that sale can be claimed back (input)." },
      { term: "VAT on drawings of stock", def: "If the owner takes stock, output VAT must be paid on it (as if it were sold)." },
      { term: "VAT201", def: "The VAT return a vendor submits to SARS for each tax period (usually every two months)." },
      { term: "Input tax fraud", def: "Claiming input VAT on fake or personal purchases – a crime." },
    ],
    chunks: [
      {
        id: "lab",
        title: "VAT return",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "vat-lab", props: { mode: "return", title: "VAT201 simulator" } },
          {
            type: "table",
            headers: ["Transaction", "Output or input VAT?"],
            rows: [
              ["Sales (cash and credit)", "Output (credit VAT control)"],
              ["Goods returned BY debtors", "Reduces output (debit VAT control)"],
              ["Purchases of stock and expenses", "Input (debit VAT control)"],
              ["Goods returned TO creditors", "Reduces input (credit VAT control)"],
              ["Bad debts written off", "Input claimable (debit VAT control)"],
              ["Owner takes stock (drawings)", "Output (credit VAT control)"],
            ],
          },
        ],
      },
      {
        id: "calc",
        title: "Calculate the amount due",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "VAT control at the end of the period",
            problem: "Balance owed to SARS at the start: R12 000 (paid during the period). Output VAT on sales R96 000; input VAT on purchases R61 000; VAT on returns by debtors R1 800; VAT on bad debts written off R450; VAT on drawings of stock R300.",
            steps: [
              { md: "Opening R12 000 is paid → no effect on the closing balance" },
              { md: "Output: R96 000 − R1 800 + R300 = **R94 500**" },
              { md: "Input: R61 000 + R450 = **R61 450**" },
              { md: "Owed to SARS = R94 500 − R61 450 = **R33 050**" },
            ],
          },
          {
            type: "practice",
            id: "vat12-practice",
            problems: [
              { q: "A debtor owing R2 760 (including VAT) is written off. How much VAT can be claimed back?", answer: "360", unit: "R", solution: "R2 760 × 15/115 = **R360**" },
              { q: "Output VAT R74 200; input VAT R58 900; VAT on goods returned by debtors R1 100; VAT on goods returned to creditors R700. Calculate VAT payable.", answer: "14900", unit: "R", solution: "(R74 200 − R1 100) − (R58 900 − R700) = R73 100 − R58 200 = **R14 900**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["vat"], title: "VAT drill" } },
          { type: "callout", variant: "safety", md: "VAT fraud red flags: claiming input VAT on the owner's private car, fake invoices, under-declaring cash sales. SARS audits vendors and penalties can be up to 200% of the tax plus criminal charges." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Output VAT → credit VAT control; input VAT → debit.", "Bad debts: claim the VAT back.", "Drawings of stock: pay output VAT.", "Ethics: never claim personal expenses as input VAT."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "vat12-quiz",
            questions: [
              { q: "A credit balance on the VAT control account means…", options: ["SARS owes the business", "the business owes SARS", "no VAT was charged", "the business is exempt"], answer: 1, explain: "Output exceeded input." },
              { q: "When a debtor is written off, VAT on the debt is…", options: ["paid again", "claimed back from SARS", "ignored", "added to sales"], answer: 1, explain: "VAT was paid on a sale that will never be collected." },
              { q: "The owner takes stock for personal use. VAT effect?", options: ["Input VAT claimed", "Output VAT payable", "No VAT", "VAT refund"], answer: 1, explain: "Treated like a sale to the owner." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Cost & break-even
  {
    slug: "cost-break-even",
    topic: "g12-cost",
    order: 1,
    title: "Cost accounting & break-even analysis",
    tagline: "How many units before the factory starts making money?",
    emoji: "🎯",
    caps: "CAPS Gr 12 · Managerial Accounting: cost accounting – production cost statement, unit costs, fixed and variable costs, break-even point; interpretation and problem-solving.",
    objectives: ["Prepare and analyse a production cost statement", "Separate fixed and variable costs per unit", "Calculate and interpret the break-even point", "Identify problems and suggest solutions from unit cost data"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 100,
    terms: [
      { term: "Break-even point", def: m`$\text{Fixed costs} \div (\text{Selling price} - \text{Variable cost per unit})$ – the number of units where profit is zero.` },
      { term: "Contribution per unit", def: "Selling price − variable cost per unit: what each unit contributes towards fixed costs and then profit." },
      { term: "Margin of safety", def: "How far actual sales are above the break-even point." },
      { term: "Fixed cost per unit", def: "Total fixed costs ÷ units produced – it falls as production rises." },
      { term: "Variable cost per unit", def: "Stays the same per unit (in theory), e.g. raw materials per unit." },
    ],
    chunks: [
      {
        id: "lab",
        title: "Break-even lab",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "break-even-lab" },
          { type: "callout", variant: "exam", md: "Comment questions: \"Did the business pass break-even?\" Compare units **produced and sold** with the break-even point, quote both, and say whether it made a profit. Then suggest how to lower the break-even point: increase the selling price, reduce variable costs (bulk buying), or reduce fixed costs." },
        ],
      },
      {
        id: "analyse",
        title: "Analysing unit costs",
        minutes: 8,
        blocks: [
          {
            type: "table",
            headers: ["Per unit", "2025", "2026", "Comment"],
            rows: [
              ["Direct material cost", "R95", "R112", "Increased 17,9% – inflation is about 4–5%: wastage or theft? Change supplier?"],
              ["Direct labour cost", "R60", "R58", "Decreased – fewer hours per unit, more efficient workers"],
              ["Fixed factory overheads", "R40", "R50", "Increased because fewer units were made"],
              ["Selling price", "R290", "R290", "Not increased despite rising costs"],
            ],
          },
          {
            type: "practice",
            id: "be-practice",
            problems: [
              { q: "Fixed costs R396 000; selling price R290; variable cost R180 per unit. Calculate the break-even point (units).", answer: "3600", unit: "units", tol: 0.5, solution: "R396 000 ÷ (R290 − R180) = R396 000 ÷ R110 = **3 600 units**" },
              { q: "The business made and sold 4 200 units. Calculate the net profit.", answer: "66000", unit: "R", solution: "4 200 × R110 − R396 000 = **R66 000**" },
              { q: "Fixed costs R250 000 for 5 000 units. Calculate the fixed cost per unit.", answer: "50", unit: "R", solution: "R250 000 ÷ 5 000 = **R50**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["break-even", "manufacturing"], title: "Break-even & unit cost drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Break-even = fixed costs ÷ contribution per unit.", "Above break-even: each unit adds its contribution to profit.", "Fixed cost per unit falls as production rises.", "Always compare with inflation when commenting on cost increases."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "be-quiz",
            questions: [
              { q: "Selling price R50, variable cost R30, fixed costs R40 000. Break-even?", options: ["800 units", "2 000 units", "1 333 units", "500 units"], answer: 1, explain: "R40 000 ÷ R20 = 2 000." },
              { q: "Raising the selling price (other things equal)…", options: ["raises the break-even point", "lowers the break-even point", "has no effect", "makes fixed costs variable"], answer: 1, explain: "Bigger contribution per unit." },
              { q: "Direct material cost per unit rose by 20% while inflation was 5%. A good explanation could be…", options: ["more efficient workers", "wastage, theft or a more expensive supplier", "fewer units produced", "lower rent"], answer: 1, explain: "Material cost per unit shouldn't rise much faster than inflation." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Budget 12
  {
    slug: "budgets-projected-statements",
    topic: "g12-budget",
    order: 1,
    title: "Budgets & projected income statements",
    tagline: "Plan the year, then explain every variance.",
    emoji: "🗓️",
    caps: "CAPS Gr 12 · Managerial Accounting: budgeting – cash budget and projected income statement; debtors' collection and creditors' payment schedules; comparing budgeted and actual figures; internal control.",
    objectives: ["Distinguish a cash budget from a projected income statement", "Complete missing figures in a cash budget", "Analyse variances and comment", "Suggest how management should respond"],
    styles: ["kinaesthetic", "read-write"],
    xp: 90,
    terms: [
      { term: "Projected income statement", def: "A budgeted income statement – includes non-cash items like depreciation, but not loans or capital." },
      { term: "Variance analysis", def: "Comparing budgeted and actual figures and explaining the differences." },
      { term: "Creditors' payment schedule", def: "Shows when credit purchases are paid (e.g. the month after purchase to get a discount)." },
      { term: "Zero-based budgeting", def: "Starting every budget from zero – every expense must be justified." },
    ],
    chunks: [
      {
        id: "compare",
        title: "Cash budget vs projected income statement",
        minutes: 7,
        blocks: [
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "budget-sorter", title: "Where does it appear?", buckets: ["Cash budget only", "Projected income statement only", "Both"], colour: "var(--t-cost)",
              items: [
                { text: "Depreciation", bucket: "Projected income statement only" }, { text: "Loan received", bucket: "Cash budget only" }, { text: "Salaries", bucket: "Both" },
                { text: "Capital contribution / shares issued", bucket: "Cash budget only" }, { text: "Bad debts", bucket: "Projected income statement only" }, { text: "Rent paid", bucket: "Both" },
                { text: "Purchase of a vehicle", bucket: "Cash budget only" }, { text: "Cash collected from debtors", bucket: "Cash budget only" }, { text: "Sales", bucket: "Projected income statement only" },
              ],
            },
          },
          { type: "widget", widget: "cash-budget-lab" },
        ],
      },
      {
        id: "variances",
        title: "Explaining variances",
        minutes: 7,
        blocks: [
          {
            type: "table",
            headers: ["Item", "Budget", "Actual", "Comment"],
            rows: [
              ["Advertising", "R18 000", "R32 000", "Overspent R14 000 – but did sales increase? If yes, a good decision"],
              ["Sales", "R420 000", "R455 000", "8,3% more than budgeted – successful advertising"],
              ["Telephone", "R4 500", "R9 800", "More than double – private calls? Introduce controls/pin codes"],
              ["Repairs", "R12 000", "R2 000", "Under budget – postponing repairs may cause bigger costs later"],
            ],
          },
          {
            type: "practice",
            id: "budget12-practice",
            problems: [
              { q: "Budgeted sales R420 000; actual R455 000. Calculate the % by which actual exceeded budget (one decimal).", answer: "8.3", unit: "%", tol: 0.06, solution: "R35 000 ÷ R420 000 × 100 = **8,3%**" },
              { q: "Total cost of credit purchases in April R120 000. Creditors are paid 70% the next month (with a 5% discount) and 30% the month after. How much is paid in May?", answer: "79800", unit: "R", solution: "R120 000 × 70% × 95% = **R79 800**" },
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
          { type: "keypoints", points: ["Cash budget: cash only. Projected income statement: income and expenses, including non-cash items.", "Variance = actual − budget; explain and advise.", "An overspent item isn't always bad – check what it achieved."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "budget12-quiz",
            questions: [
              { q: "Which appears in a projected income statement but NOT a cash budget?", options: ["Loan repayment", "Depreciation", "Cash from debtors", "Shares issued"], answer: 1, explain: "Depreciation is an expense but not a cash flow." },
              { q: "Telephone costs are double the budget. Best internal control?", options: ["Ignore it", "PIN codes and itemised billing to stop private calls", "Increase the budget", "Stop paying the account"], answer: 1, explain: "Specific, practical control." },
              { q: "Repairs far below budget could mean…", options: ["great efficiency only", "maintenance is being postponed, risking bigger costs", "VAT was saved", "debtors paid early"], answer: 1, explain: "Under-spending isn't always good." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Inventory valuation
  {
    slug: "inventory-valuation",
    topic: "g12-inventory",
    order: 1,
    title: "Inventory valuation: FIFO, weighted average & specific identification",
    tagline: "Same stock, different methods, different profit. Which is right?",
    emoji: "📦",
    caps: "CAPS Gr 12 · Managing Resources: inventory valuation methods – FIFO, weighted average and specific identification; cost of sales, gross profit, stock-holding period and stock turnover; internal control over stock.",
    objectives: ["Value closing stock using FIFO, weighted average and specific identification", "Calculate cost of sales and gross profit", "Calculate stock-holding period and stock turnover", "Identify stock problems and suggest controls"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 100,
    terms: [
      { term: "FIFO (first-in, first-out)", def: "Assumes the oldest stock is sold first, so closing stock is valued at the most recent purchase prices." },
      { term: "Weighted average", def: "Closing stock = units on hand × (total cost of goods available ÷ total units available)." },
      { term: "Specific identification", def: "Each unique item is valued at its own cost – used for expensive, identifiable items like cars or jewellery." },
      { term: "Stock-holding period", def: "Average stock ÷ cost of sales × 365 – how many days stock sits before it is sold." },
      { term: "Stock turnover rate", def: "Cost of sales ÷ average stock – how many times a year stock is sold and replaced." },
      { term: "Consistency principle", def: "Use the same valuation method every year so results can be compared." },
    ],
    chunks: [
      {
        id: "lab",
        title: "Stock as layers",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "inventory-lab" },
          { type: "callout", variant: "memory", md: "**FIFO = First In, First Out** – like a queue at the bank. The oldest stock leaves first, so what's left is the **newest** (and when prices rise, the most expensive)." },
        ],
      },
      {
        id: "calc",
        title: "Calculations",
        minutes: 9,
        blocks: [
          {
            type: "worked",
            title: "Specific identification at a car dealer",
            problem: "A dealer bought 3 cars: A R180 000, B R210 000, C R245 000. Car B was sold for R260 000.",
            steps: [
              { md: "Cost of sales = cost of car B = **R210 000**" },
              { md: "Gross profit = R260 000 − R210 000 = **R50 000**" },
              { md: "Closing stock = A + C = **R425 000**", why: "Each car is valued at its own actual cost." },
            ],
          },
          {
            type: "practice",
            id: "inventory12-practice",
            problems: [
              { q: "Opening stock 20 units @ R100; purchases 30 @ R110 and 50 @ R120. 30 units are on hand at year-end. Value closing stock using FIFO.", answer: "3600", unit: "R", solution: "The 30 units left are the latest: 30 × R120 = **R3 600**" },
              { q: "Same data, weighted average: total cost R11 300 for 100 units. Value the 30 units on hand.", answer: "3390", unit: "R", solution: "R11 300 ÷ 100 = R113 per unit. 30 × R113 = **R3 390**" },
              { q: "Average stock R84 000; cost of sales R511 000. Calculate the stock-holding period in days (whole number).", answer: "60", unit: "days", tol: 0.6, solution: "R84 000 ÷ R511 000 × 365 = **60 days**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["inventory-valuation"], title: "Inventory valuation drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["FIFO: closing stock at the latest prices.", "Weighted average: total cost ÷ total units, × units on hand.", "Specific identification for unique, expensive items.", "A long stock-holding period means money is tied up in stock."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "inventory12-quiz",
            questions: [
              { q: "When prices are rising, FIFO gives a…", options: ["lower closing stock", "higher closing stock and higher gross profit", "lower gross profit", "zero cost of sales"], answer: 1, explain: "Closing stock is at the newest (highest) prices." },
              { q: "Which method suits a jewellery shop with unique pieces?", options: ["FIFO", "Weighted average", "Specific identification", "Periodic"], answer: 2, explain: "Each piece has its own cost." },
              { q: "The stock-holding period increased from 45 to 90 days. This suggests…", options: ["stock is selling faster", "stock is selling slower – risk of obsolescence", "more cash is available", "lower storage costs"], answer: 1, explain: "Stock sits twice as long." },
              { q: "Why must a business use the same method every year?", options: ["Prudence", "Consistency – so years can be compared", "Matching", "SARS charges extra"], answer: 1, explain: "Consistency principle." },
            ],
          },
        ],
      },
    ],
  },
];
