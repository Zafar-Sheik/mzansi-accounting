import type { Lesson } from "../types";

const m = String.raw;

export const G10: Lesson[] = [
  // ------------------------------------------------------------------ Concepts
  {
    slug: "what-is-accounting",
    topic: "g10-concepts",
    order: 1,
    title: "What is accounting – and why should I care?",
    tagline: "The language of money: who uses it, the forms of ownership and the rules everyone plays by.",
    emoji: "💡",
    caps: "CAPS Gr 10 · Financial Accounting: accounting concepts; the accounting cycle; users of financial information; forms of ownership; GAAP principles.",
    objectives: ["Explain what accounting is and who uses accounting information", "Compare the forms of ownership in South Africa", "Apply the basic GAAP principles", "Describe the accounting cycle"],
    styles: ["visual", "read-write", "kinaesthetic"],
    xp: 60,
    terms: [
      { term: "Accounting", def: "Collecting, recording, summarising and reporting financial information so people can make decisions." },
      { term: "Bookkeeping", def: "The recording part of accounting: entering transactions in journals and the ledger." },
      { term: "Transaction", def: "An event that changes the financial position of a business, e.g. buying stock, paying rent or making a sale." },
      { term: "Sole trader", def: "A business owned by one person, who has unlimited liability for its debts." },
      { term: "Partnership", def: "A business owned by 2 or more partners who share profits and losses according to an agreement." },
      { term: "Company", def: "A separate legal person registered under the Companies Act, owned by shareholders who have limited liability." },
      { term: "Business entity principle", def: "The business and its owner are separate: the owner's private transactions are not the business's transactions." },
      { term: "Historical cost principle", def: "Assets are recorded at the price originally paid for them." },
      { term: "Prudence principle", def: "Be careful: never overstate income or assets, never understate expenses or liabilities." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Thandi's spaza",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "real-world", md: "Thandi runs a spaza shop in Mamelodi. Every day she sells bread, airtime and cooldrinks. At month-end she asks: *Did I make a profit? How much do I owe the wholesaler? Can I afford a new fridge?* Without records, she is guessing. **Accounting** turns a shoebox of till slips into answers." },
          { type: "text", md: "Accounting is often called **the language of business**. It has four jobs:\n\n1. **Collect** the evidence (source documents like receipts and invoices)\n2. **Record** each transaction (journals and the ledger)\n3. **Summarise** (the Trial Balance)\n4. **Report** (financial statements) – so people can make decisions." },
          {
            type: "sequence",
            id: "accounting-cycle",
            title: "Put the accounting cycle in order",
            steps: ["Transaction happens", "Source document is issued or received", "Record in the subsidiary journals", "Post to the General Ledger", "Draw up a Trial Balance", "Prepare the financial statements", "Analyse and interpret"],
            explain: "Documents → journals → ledger → Trial Balance → statements. Every exam question you will ever see sits somewhere on this cycle.",
          },
        ],
      },
      {
        id: "users",
        title: "Who uses accounting information?",
        minutes: 6,
        blocks: [
          {
            type: "match",
            id: "users-match",
            title: "Match the user to what they want to know",
            pairs: [
              { left: "Owner", right: "Did I make a profit, and is my business growing?" },
              { left: "Bank", right: "Can this business repay a loan?" },
              { left: "SARS", right: "How much tax and VAT must be paid?" },
              { left: "Supplier (creditor)", right: "Will they pay us on time if we sell on credit?" },
              { left: "Employees", right: "Is my job safe? Can the business afford increases?" },
              { left: "Investors", right: "Is this a good place to put my money?" },
            ],
          },
          { type: "text", md: "There are three main **forms of ownership** you study in Grades 10–12:" },
          {
            type: "table",
            headers: ["", "Sole trader", "Partnership", "Company"],
            rows: [
              ["Owners", "1 person", "2 or more partners", "Shareholders"],
              ["Liability for debts", "Unlimited – owner's house is at risk", "Unlimited (jointly)", "Limited – shareholders lose only their investment"],
              ["Legal person?", "No", "No", "Yes – it can sue and be sued"],
              ["Owner's equity is called", "Capital", "Partners' capital & current accounts", "Shareholders' equity"],
              ["Studied in", "Grade 10", "Grade 11", "Grade 12"],
            ],
          },
          { type: "callout", variant: "memory", md: "**Limited** liability = **Limited** damage. If a company fails, shareholders lose what they put in – not their car or house." },
        ],
      },
      {
        id: "gaap",
        title: "GAAP: the rules of the game",
        minutes: 7,
        blocks: [
          { type: "text", md: "**GAAP** (Generally Accepted Accounting Practice) are principles that make financial statements fair, reliable and comparable. You must know these in Grade 10:" },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "gaap-sorter", title: "Which GAAP principle is this?", buckets: ["Business entity", "Historical cost", "Prudence", "Matching", "Materiality"], colour: "var(--t-book)",
              items: [
                { text: "The owner's personal cellphone bill is not paid from the business account", bucket: "Business entity" },
                { text: "A building bought for R800 000 stays at R800 000 even though it is now worth R1,2 million", bucket: "Historical cost" },
                { text: "We create a provision for debtors who might not pay", bucket: "Prudence" },
                { text: "March rent paid in April is still a March expense", bucket: "Matching" },
                { text: "Small expenses like R40 for tea are grouped as 'sundry expenses'", bucket: "Materiality" },
                { text: "The owner takes stock home – it is recorded as drawings", bucket: "Business entity" },
                { text: "Don't record expected income until it is earned", bucket: "Prudence" },
                { text: "Salaries earned in December but paid in January are a December expense", bucket: "Matching" },
              ],
            },
          },
          { type: "callout", variant: "exam", md: "Exam questions love the **business entity** principle: \"The owner paid her son's school fees from the business bank account. Which GAAP principle was ignored?\" → Business entity. Record it as **drawings**." },
          { type: "callout", variant: "life", md: "Use the business entity principle in your own life from day one: open a **separate bank account** for any side hustle. Mixing your pocket money with business money is the #1 reason small businesses never know if they make a profit." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Accounting = collect, record, summarise, report.", "Sole traders and partners have unlimited liability; company shareholders have limited liability.", "GAAP: business entity, historical cost, prudence, matching, materiality, going concern.", "The cycle: documents → journals → ledger → Trial Balance → statements."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "concepts-quiz",
            questions: [
              { q: "Which form of ownership is a separate legal person?", options: ["Sole trader", "Partnership", "Company", "Spaza shop"], answer: 2, explain: "Only a company is a separate legal person registered under the Companies Act." },
              { q: "The owner uses the business bank card to buy groceries for home. This is…", options: ["an expense", "drawings", "capital", "income"], answer: 1, explain: "Business entity principle: personal use of business money is drawings." },
              { q: "Which principle says assets are recorded at their original cost?", options: ["Prudence", "Matching", "Historical cost", "Going concern"], answer: 2, explain: "Historical cost: the price actually paid." },
              { q: "Which is the CORRECT order?", options: ["Ledger → journals → documents", "Documents → journals → ledger", "Journals → documents → ledger", "Trial Balance → journals → ledger"], answer: 1, explain: "You can't record a transaction until you have evidence (the source document)." },
              { q: "Why would a bank want to see a business's financial statements?", options: ["To work out VAT", "To decide whether to lend money", "To set salaries", "To count stock"], answer: 1, explain: "Banks assess whether the business can repay a loan." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Equation
  {
    slug: "accounting-equation",
    topic: "g10-equation",
    order: 1,
    title: "The accounting equation: A = OE + L",
    tagline: "One equation explains every transaction a business will ever make.",
    emoji: "⚖️",
    caps: "CAPS Gr 10 · Financial Accounting: the accounting equation; elements (assets, owner's equity, liabilities, income, expenses); analysis of transactions.",
    objectives: ["Identify assets, liabilities and owner's equity", "Explain why A = OE + L always balances", "Analyse the effect of transactions on the equation", "Explain how income, expenses and drawings affect owner's equity"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 80,
    terms: [
      { term: "Assets", def: "Possessions the business owns or controls that will bring future benefits, e.g. vehicles, stock, debtors and cash." },
      { term: "Liabilities", def: "Debts the business owes to outsiders, e.g. loans and creditors." },
      { term: "Owner's equity", def: "The owner's interest in the business: capital + profit − drawings. Also = Assets − Liabilities." },
      { term: "Accounting equation", def: m`$\text{Assets} = \text{Owner's equity} + \text{Liabilities}$ – it is always in balance.` },
      { term: "Income", def: "Money earned by the business (e.g. sales, rent income, interest income). Income increases owner's equity." },
      { term: "Expenses", def: "Costs of running the business (e.g. wages, rent, electricity). Expenses decrease owner's equity." },
      { term: "Drawings", def: "Cash or goods the owner takes for personal use. Drawings decrease owner's equity." },
      { term: "Capital", def: "The money or assets the owner put into the business." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Where did the money come from?",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "real-world", md: "Sipho starts a car wash. He puts in **R30 000** of his savings and borrows **R20 000** from his uncle. He uses the R50 000 to buy a pressure washer, a gazebo and soap, and keeps the rest in the bank. He has R50 000 of **stuff** (assets) – paid for by himself (R30 000) and his uncle (R20 000)." },
          { type: "text", md: m`Every asset in a business was paid for by **someone**: either the **owner** or an **outsider** (a lender or a supplier). So:

$$\text{Assets} = \text{Owner's equity} + \text{Liabilities}$$

What the business **has** = what the business **owes** to the owner + what it **owes** to outsiders.` },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "elements", title: "Asset, liability or owner's equity?", buckets: ["Asset", "Liability", "Owner's equity"], colour: "var(--t-book)",
              items: [
                { text: "Delivery bakkie", bucket: "Asset" }, { text: "Loan from Absa", bucket: "Liability" }, { text: "Capital", bucket: "Owner's equity" },
                { text: "Debtors (customers who owe us)", bucket: "Asset" }, { text: "Creditors (suppliers we owe)", bucket: "Liability" }, { text: "Trading stock", bucket: "Asset" },
                { text: "Bank overdraft", bucket: "Liability" }, { text: "Cash float in the till", bucket: "Asset" }, { text: "Net profit for the year", bucket: "Owner's equity" },
              ],
            },
          },
        ],
      },
      {
        id: "lab",
        title: "The balance scale",
        minutes: 9,
        blocks: [
          { type: "text", md: "Every transaction changes **at least two things**, and the equation **always** stays balanced. Predict the effect of each transaction – then post it and watch the scale." },
          { type: "widget", widget: "equation-lab" },
          { type: "callout", variant: "tip", md: "A transaction can also change two items on the **same side**: buying equipment for cash makes one asset go up and another go down, so total assets stay the same." },
        ],
      },
      {
        id: "income-expenses",
        title: "Income, expenses & drawings",
        minutes: 8,
        blocks: [
          { type: "text", md: m`Owner's equity grows and shrinks for four reasons:

$$\text{OE} = \text{Capital} + \text{Income} - \text{Expenses} - \text{Drawings}$$

So income and expenses are really **owner's equity** accounts. Income makes the owner richer; expenses and drawings make the owner poorer.` },
          {
            type: "worked",
            title: "Analysing a sale (perpetual inventory)",
            problem: "Sipho sells soap products for R900 cash. They cost him R600. Show the effect on the accounting equation.",
            steps: [
              { md: "**Assets:** Bank +R900; Trading stock −R600 → net **+R300**", why: "Cash came in, stock went out." },
              { md: "**Owner's equity:** Sales (income) +R900; Cost of sales (expense) −R600 → net **+R300**", why: "The profit on the sale belongs to the owner." },
              { md: "**Liabilities:** no effect (0)" },
              { md: "Check: +R300 = +R300 + 0 ✔", why: "Both sides change by the same amount – the equation balances." },
            ],
          },
          {
            type: "table",
            headers: ["Transaction", "Assets", "Owner's equity", "Liabilities"],
            rows: [
              ["Owner contributes capital", "+", "+", "0"],
              ["Buy equipment on credit", "+", "0", "+"],
              ["Pay wages", "−", "−", "0"],
              ["Receive interest", "+", "+", "0"],
              ["Pay a creditor", "−", "0", "−"],
              ["Owner takes drawings", "−", "−", "0"],
              ["Debtor pays us", "+ and − (0)", "0", "0"],
            ],
            caption: "The common patterns – learn these and you can analyse anything.",
          },
          {
            type: "practice",
            id: "equation-practice",
            problems: [
              { q: "Assets R250 000, liabilities R70 000. Calculate owner's equity.", answer: "180000", unit: "R", hint: "OE = A − L", solution: "R250 000 − R70 000 = **R180 000**" },
              { q: "The business pays the telephone account of R1 200 by EFT. By how much does owner's equity change? (Use a minus sign for a decrease.)", answer: "-1200", unit: "R", hint: "An expense reduces owner's equity.", solution: "Expense → OE −R1 200 (and Bank −R1 200)." },
              { q: "Stock costing R4 000 is sold on credit for R6 500. By how much do total assets increase?", answer: "2500", unit: "R", hint: "Debtors go up by the selling price; stock goes down by the cost.", solution: "Debtors +R6 500, Trading stock −R4 000 → net **+R2 500**." },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["equation"], title: "Equation drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["A = OE + L, always.", "Income increases OE; expenses and drawings decrease OE.", "Every transaction affects at least two items.", "Buying an asset for cash: one asset up, one down – totals don't change."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "equation-quiz",
            questions: [
              { q: "A business borrows R50 000 from the bank. The effect is…", options: ["A +, OE +", "A +, L +", "A −, L −", "OE +, L −"], answer: 1, explain: "Bank (asset) goes up, loan (liability) goes up." },
              { q: "Which item DECREASES owner's equity?", options: ["Capital contribution", "Rent income", "Drawings", "Loan received"], answer: 2, explain: "Drawings reduce what belongs to the owner." },
              { q: "Assets = R90 000 and owner's equity = R60 000. Liabilities are…", options: ["R150 000", "R30 000", "R60 000", "R90 000"], answer: 1, explain: "L = A − OE = R30 000." },
              { q: "The business buys stationery for cash. Which is correct?", options: ["A −, OE −", "A +, L +", "A 0", "OE +, A +"], answer: 0, explain: "Stationery is an expense: Bank down, OE down." },
              { q: "A debtor pays R2 000. Total assets…", options: ["increase by R2 000", "decrease by R2 000", "don't change", "double"], answer: 2, explain: "Bank up, debtors down – an asset swap." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Journals
  {
    slug: "source-documents-journals",
    topic: "g10-journals",
    order: 1,
    title: "Source documents & the subsidiary journals",
    tagline: "No document, no entry. Learn which slip goes where.",
    emoji: "🗂️",
    caps: "CAPS Gr 10 · Financial Accounting: source documents; Cash Receipts Journal, Cash Payments Journal, Debtors Journal, Debtors Allowances Journal, Creditors Journal, Creditors Allowances Journal, Petty Cash Journal and General Journal.",
    objectives: ["Name the source document for each type of transaction", "Choose the correct subsidiary journal", "Record transactions in the CRJ and CPJ", "Explain cash vs credit transactions"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 80,
    terms: [
      { term: "Source document", def: "The written or electronic proof that a transaction happened, e.g. a receipt, invoice or bank statement." },
      { term: "Cash Receipts Journal (CRJ)", def: "Records all money received by the business (cash, cheques, EFTs, card payments)." },
      { term: "Cash Payments Journal (CPJ)", def: "Records all payments made from the business bank account (EFTs, cheques, debit orders, bank charges)." },
      { term: "Debtors Journal (DJ)", def: "Records sales of goods on credit. Source document: duplicate (copy of the) invoice." },
      { term: "Creditors Journal (CJ)", def: "Records purchases on credit. Source document: original invoice received from the supplier." },
      { term: "Debtors Allowances Journal (DAJ)", def: "Records goods returned by debtors or discounts allowed to them. Source document: duplicate credit note." },
      { term: "Creditors Allowances Journal (CAJ)", def: "Records goods we return to creditors. Source document: duplicate debit note (or credit note received)." },
      { term: "General Journal (GJ)", def: "Records transactions that don't fit any other journal, e.g. corrections, drawings of stock, bad debts. Source: journal voucher." },
      { term: "Petty Cash Journal (PCJ)", def: "Records small cash payments from the petty cash float. Source: petty cash voucher." },
    ],
    chunks: [
      {
        id: "documents",
        title: "Evidence first",
        minutes: 6,
        blocks: [
          { type: "text", md: "Before anything is written in the books, there must be **evidence** – a **source document**. Auditors check that every entry has one. That stops fraud and mistakes." },
          {
            type: "table",
            headers: ["Transaction", "Source document", "Journal"],
            rows: [
              ["Cash received (sales, debtors paying, rent income)", "Receipt / cash register roll / deposit slip", "CRJ"],
              ["Payment by EFT, cheque or debit order", "EFT payment advice / cheque counterfoil / bank statement", "CPJ"],
              ["Sell goods on credit", "Duplicate invoice", "DJ"],
              ["Debtor returns goods", "Duplicate credit note", "DAJ"],
              ["Buy on credit", "Original invoice (from the supplier)", "CJ"],
              ["We return goods to a supplier", "Duplicate debit note", "CAJ"],
              ["Small cash payment (tea, taxi fare)", "Petty cash voucher", "PCJ"],
              ["Anything else (corrections, drawings of stock)", "Journal voucher", "GJ"],
            ],
          },
          { type: "callout", variant: "memory", md: "**D**uplicate = we **D**rew it up (we issued it and kept a copy). **O**riginal = it came from **O**utside. So a duplicate invoice is a credit SALE (DJ), an original invoice is a credit PURCHASE (CJ)." },
        ],
      },
      {
        id: "lab",
        title: "File the documents",
        minutes: 8,
        blocks: [
          { type: "widget", widget: "journal-lab" },
          { type: "callout", variant: "mistake", md: "A cash sale is NEVER in the Debtors Journal – debtors are customers who **owe** us. Cash sales go in the **CRJ**." },
        ],
      },
      {
        id: "crj-cpj",
        title: "Inside the CRJ & CPJ",
        minutes: 9,
        blocks: [
          { type: "text", md: "Each journal has **analysis columns** so totals can be posted to the ledger at month-end. A typical **CRJ** for a trading business with a perpetual inventory system:" },
          {
            type: "table",
            headers: ["Doc", "Day", "Details", "Analysis of receipts", "Bank", "Sales", "Cost of sales", "Debtors control", "Sundry accounts"],
            rows: [
              ["CRR", "5", "Cash sales", "8 400", "8 400", "8 400", "5 600", "", ""],
              ["R01", "8", "T. Nkosi", "1 200", "1 200", "", "", "1 200", ""],
              ["R02", "12", "Rent income", "3 000", "3 000", "", "", "", "3 000 (Rent income)"],
            ],
            caption: "Cost of sales is recorded at the same time as each cash sale – that is the perpetual inventory system.",
          },
          {
            type: "worked",
            title: "Recording a cash sale at a mark-up",
            problem: "Goods are sold for cash for R4 500. The business marks up its goods by 50% on cost. What goes in the Sales and Cost of sales columns?",
            steps: [
              { md: "Sales column = selling price = **R4 500**" },
              { md: "Cost price = R4 500 × 100/150 = **R3 000** → Cost of sales column", why: "Selling price is 150% of cost when the mark-up is 50%." },
              { md: "Bank column = R4 500 (the money actually deposited)" },
            ],
          },
          {
            type: "practice",
            id: "journal-practice",
            problems: [
              { q: "Goods sold for R6 000 cash. Mark-up is 25% on cost. Calculate the amount for the **Cost of sales** column.", answer: "4800", unit: "R", hint: "Cost = selling price × 100/125", solution: "R6 000 × 100/125 = **R4 800**" },
              { q: "Which journal records goods bought on credit from a wholesaler? (Give the abbreviation.)", answer: "CJ | Creditors Journal", kind: "text", solution: "The **Creditors Journal (CJ)** – source document: original invoice." },
              { q: "Which journal records bank charges that you only found on the bank statement? (Abbreviation.)", answer: "CPJ | Cash Payments Journal", kind: "text", solution: "Bank charges reduce the bank balance – **CPJ**." },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["markup"], title: "Mark-up & cost of sales drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Every entry needs a source document.", "Money in → CRJ; money out → CPJ.", "Credit sales → DJ (duplicate invoice); credit purchases → CJ (original invoice).", "Returns: DAJ (debtors return to us), CAJ (we return to creditors)."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "journals-quiz",
            questions: [
              { q: "The source document for a credit sale is…", options: ["a receipt", "a duplicate invoice", "an original invoice", "a cheque counterfoil"], answer: 1, explain: "We issue the invoice and keep the duplicate." },
              { q: "Petty cash vouchers are recorded in the…", options: ["CPJ", "GJ", "PCJ", "CRJ"], answer: 2, explain: "Petty Cash Journal." },
              { q: "A debtor returns damaged goods. Which journal?", options: ["DJ", "DAJ", "CAJ", "CJ"], answer: 1, explain: "Debtors Allowances Journal – source: duplicate credit note." },
              { q: "Rent received from a tenant goes in the…", options: ["CRJ", "CPJ", "DJ", "GJ"], answer: 0, explain: "Money received – Cash Receipts Journal (Sundry accounts column)." },
              { q: "The owner takes trading stock for personal use. Which journal?", options: ["CPJ", "GJ", "DAJ", "CRJ"], answer: 1, explain: "No cash moves – General Journal: Dr Drawings, Cr Trading stock." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Journals 2
  {
    slug: "credit-journals",
    topic: "g10-journals",
    order: 2,
    title: "Credit journals: DJ, CJ, DAJ, CAJ & the General Journal",
    tagline: "Buy now, pay later – for businesses. Record who owes whom.",
    emoji: "📑",
    caps: "CAPS Gr 10 · Financial Accounting: Debtors Journal, Debtors Allowances Journal, Creditors Journal, Creditors Allowances Journal and General Journal; Debtors and Creditors Ledgers.",
    objectives: ["Record credit sales in the Debtors Journal with cost of sales", "Record credit purchases in the Creditors Journal", "Record returns in the DAJ and CAJ", "Record General Journal entries with a narration"],
    styles: ["kinaesthetic", "read-write", "visual"],
    xp: 80,
    terms: [
      { term: "Debtor", def: "A customer who bought on credit and still owes the business money." },
      { term: "Creditor", def: "A supplier the business bought from on credit and still owes money to." },
      { term: "Credit terms", def: "The agreed time to pay, e.g. 30 days, sometimes with a discount for paying early." },
      { term: "Narration", def: "A short explanation written under each General Journal entry." },
      { term: "Bad debt", def: "A debtor's balance that will never be received – written off in the General Journal." },
      { term: "Creditors Ledger", def: "A subsidiary ledger with one account for each supplier." },
    ],
    chunks: [
      {
        id: "dj-cj",
        title: "Selling and buying on credit",
        minutes: 8,
        blocks: [
          { type: "callout", variant: "real-world", md: "Kasi Kicks sells 20 pairs of school shoes on credit to Soweto High School (R9 000, 30 days). It buys 100 pairs of sneakers on credit from Shoe Wholesalers (R30 000). No cash moves today – but the business must record who owes whom." },
          {
            type: "table",
            headers: ["Debtors Journal", "Doc", "Day", "Debtor", "Fol", "Sales", "Cost of sales"],
            rows: [["", "Inv 112", "4", "Soweto High School", "D3", "9 000", "6 000"], ["", "Inv 113", "9", "T. Nkosi", "D7", "1 500", "1 000"], ["", "", "", "Totals", "", "10 500", "7 000"]],
            caption: "Mark-up 50% on cost. Totals are posted: Dr Debtors control R10 500, Cr Sales R10 500; Dr Cost of sales R7 000, Cr Trading stock R7 000.",
          },
          {
            type: "worked",
            title: "Posting the DJ totals",
            problem: "Post the DJ above to the General Ledger and the Debtors Ledger.",
            steps: [
              { md: "General Ledger: **Dr Debtors control R10 500, Cr Sales R10 500**", why: "Debtors (an asset) increase; income increases." },
              { md: "**Dr Cost of sales R7 000, Cr Trading stock R7 000**", why: "Perpetual inventory: stock leaves when it is sold." },
              { md: "Debtors Ledger: debit Soweto High School R9 000 and T. Nkosi R1 500 – each invoice separately", why: "The individual accounts must add up to the control account." },
            ],
          },
        ],
      },
      {
        id: "returns-gj",
        title: "Returns and the General Journal",
        minutes: 8,
        blocks: [
          {
            type: "match",
            id: "credit-journal-match",
            title: "Match the transaction to the journal entry",
            pairs: [
              { left: "Soweto High returns shoes worth R900 (cost R600)", right: "DAJ: Dr Debtors allowances, Cr Debtors control; Dr Trading stock, Cr Cost of sales" },
              { left: "We return damaged sneakers to Shoe Wholesalers, R1 500", right: "CAJ: Dr Creditors control, Cr Trading stock" },
              { left: "T. Nkosi's debt of R500 is written off", right: "GJ: Dr Bad debts, Cr Debtors control" },
              { left: "The owner takes shoes for her son, cost R600", right: "GJ: Dr Drawings, Cr Trading stock" },
            ],
          },
          {
            type: "practice",
            id: "credit-journals-practice",
            problems: [
              { q: "Credit sale of R7 200 at a mark-up of 80% on cost. Calculate the cost of sales for the DJ.", answer: "4000", unit: "R", solution: "R7 200 × 100/180 = **R4 000**" },
              { q: "Which account is CREDITED when a debtor's account is written off as a bad debt?", answer: "Debtors control | Debtors", kind: "text", solution: "Dr Bad debts (expense), Cr **Debtors control** (asset decreases)." },
              { q: "Debtors Journal total R48 000; Debtors Allowances Journal total R2 300. By how much does Debtors control increase for the month from these journals?", answer: "45700", unit: "R", solution: "R48 000 − R2 300 = **R45 700**" },
            ],
          },
          { type: "widget", widget: "journal-lab", props: { title: "Practise: which journal?" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["DJ: credit sales (with cost of sales); CJ: credit purchases.", "DAJ: returns by debtors; CAJ: returns to creditors.", "GJ: everything else – with a narration.", "Post individual amounts to the subsidiary ledgers and totals to the control accounts."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "credit-journals-quiz",
            questions: [
              { q: "The total of the Creditors Journal is credited to…", options: ["Trading stock", "Creditors control", "Bank", "Sales"], answer: 1, explain: "We owe more to suppliers: Cr Creditors control (and Dr Trading stock)." },
              { q: "Goods returned by a debtor reduce…", options: ["Creditors control", "Debtors control", "Capital", "Bank"], answer: 1, explain: "The debtor owes us less." },
              { q: "A General Journal entry always needs a…", options: ["receipt", "narration", "cheque", "VAT number"], answer: 1, explain: "The narration explains why the entry was made." },
              { q: "Writing off a bad debt is recorded in the…", options: ["DAJ", "CRJ", "GJ", "CJ"], answer: 2, explain: "No cash, not a return – General Journal." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Ledger
  {
    slug: "general-ledger-trial-balance",
    topic: "g10-ledger",
    order: 1,
    title: "Double entry, the General Ledger & the Trial Balance",
    tagline: "Debit left, credit right – and the totals must agree.",
    emoji: "📒",
    caps: "CAPS Gr 10 · Financial Accounting: the double-entry principle; General Ledger (balance sheet and nominal accounts); Debtors and Creditors Ledgers; balancing accounts; the Trial Balance.",
    objectives: ["Apply the debit/credit rules", "Post from journals to T-accounts", "Balance a ledger account", "Draw up a Trial Balance and explain what it proves"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 90,
    terms: [
      { term: "Double entry", def: "Every transaction is recorded twice: on the debit side of one account and the credit side of another, for the same amount." },
      { term: "Debit (Dr)", def: "The LEFT side of a ledger account. Assets, expenses and drawings increase on the debit side." },
      { term: "Credit (Cr)", def: "The RIGHT side of a ledger account. Liabilities, capital and income increase on the credit side." },
      { term: "General Ledger", def: "The main book of accounts: Balance Sheet accounts (assets, liabilities, equity) and Nominal accounts (income and expenses)." },
      { term: "Balance c/d and b/d", def: "Carried down / brought down: the difference between the two sides, carried to the next period." },
      { term: "Trial Balance", def: "A list of all ledger balances on a date. Total debits must equal total credits." },
      { term: "Debtors Ledger", def: "A subsidiary ledger with a separate account for each debtor; its total must equal the Debtors control account." },
      { term: "Nominal accounts", def: "Income and expense accounts – closed off to Profit and loss at year-end." },
    ],
    chunks: [
      {
        id: "rules",
        title: "The debit & credit rules",
        minutes: 7,
        blocks: [
          { type: "text", md: "Every account is shaped like a **T**: debits on the left, credits on the right. Which side an account **increases** on depends on where it sits in the accounting equation." },
          {
            type: "table",
            headers: ["Type of account", "Increase", "Decrease", "Normal balance"],
            rows: [
              ["Assets", "Debit", "Credit", "Debit"],
              ["Expenses", "Debit", "Credit", "Debit"],
              ["Drawings", "Debit", "Credit", "Debit"],
              ["Liabilities", "Credit", "Debit", "Credit"],
              ["Capital (owner's equity)", "Credit", "Debit", "Credit"],
              ["Income", "Credit", "Debit", "Credit"],
            ],
          },
          { type: "callout", variant: "memory", md: "**DEAD CLIC**: **D**ebits = **E**xpenses, **A**ssets, **D**rawings · **C**redits = **L**iabilities, **I**ncome, **C**apital." },
          { type: "widget", widget: "drill", props: { generators: ["debit-credit"], title: "Debit or credit? (type the account name)" } },
        ],
      },
      {
        id: "lab",
        title: "Post it yourself",
        minutes: 10,
        blocks: [
          { type: "text", md: "Zanele has just opened a sneaker shop. Post her first month's transactions. When you're done, draw up her **Trial Balance**." },
          { type: "widget", widget: "t-account-lab" },
          { type: "callout", variant: "mistake", md: "A Trial Balance that balances does **not** prove the books are correct. Errors of **omission** (forgot it completely), **principle** (wrong type of account), **commission** (right type, wrong account) and **compensating** errors still balance." },
        ],
      },
      {
        id: "balancing",
        title: "Balancing an account",
        minutes: 7,
        blocks: [
          {
            type: "worked",
            title: "Balancing the Bank account",
            problem: "Bank: debit side R60 000 + R9 000 + R3 500; credit side R15 000 + R4 000 + R8 000 + R2 000 + R700. Balance the account at month-end.",
            steps: [
              { md: "Debit total = **R72 500**; credit total = **R29 700**" },
              { md: "Balance = R72 500 − R29 700 = **R42 800**", why: "The bigger side minus the smaller side." },
              { md: "Write 'Balance c/d R42 800' on the **credit** side so both sides total R72 500.", why: "You carry the balance down on the smaller side." },
              { md: "Start next month with 'Balance b/d R42 800' on the **debit** side – a favourable bank balance." },
            ],
          },
          {
            type: "practice",
            id: "ledger-practice",
            problems: [
              { q: "Creditors control: debits R8 000 and R1 200; credits R20 000 and R5 600. Calculate the balance (it will be a credit balance).", answer: "16400", unit: "R", hint: "Credits − debits", solution: "R25 600 − R9 200 = **R16 400** credit (we still owe suppliers)." },
              { q: "Trial Balance: total credits R485 000. Known debits add up to R462 300; the only missing figure is Bank (debit). Calculate Bank.", answer: "22700", unit: "R", solution: "R485 000 − R462 300 = **R22 700**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["trial-balance"], title: "Trial Balance detective" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["DEAD CLIC: debits = expenses, assets, drawings; credits = liabilities, income, capital.", "Each journal total is posted to the ledger – debit one account, credit another.", "Balance = bigger side − smaller side; c/d on the smaller side, b/d on the other side.", "A balanced Trial Balance proves arithmetic accuracy, not that there are no errors."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "ledger-quiz",
            questions: [
              { q: "Wages paid by EFT: which account is credited?", options: ["Wages", "Bank", "Capital", "Creditors control"], answer: 1, explain: "Bank (asset) decreases → credit Bank; debit Wages." },
              { q: "An income account normally has a…", options: ["debit balance", "credit balance", "nil balance", "either"], answer: 1, explain: "Income increases on the credit side." },
              { q: "Which error will make the Trial Balance NOT balance?", options: ["A transaction omitted completely", "Posting R500 to the wrong expense account", "Posting only the debit side of an entry", "Two errors that cancel out"], answer: 2, explain: "One-sided entries break debits = credits." },
              { q: "The Debtors Ledger total must agree with…", options: ["Sales", "Debtors control", "Bank", "Creditors control"], answer: 1, explain: "The control account is the summary of all individual debtors." },
              { q: "Which is a nominal account?", options: ["Equipment", "Loan", "Advertising", "Capital"], answer: 2, explain: "Nominal accounts are income and expense accounts." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Statements
  {
    slug: "sole-trader-statements",
    topic: "g10-statements",
    order: 1,
    title: "Financial statements of a sole trader",
    tagline: "From Trial Balance to Income Statement and Balance Sheet – the business's report card.",
    emoji: "📄",
    caps: "CAPS Gr 10 · Financial Accounting: closing transfers; Income Statement; Balance Sheet and notes; basic year-end adjustments (consumable stores, accrued and prepaid items, trading stock deficits).",
    objectives: ["Classify Trial Balance accounts for the financial statements", "Calculate gross profit and net profit", "Draw up a basic Income Statement and Balance Sheet", "Explain the link between net profit and owner's equity"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 90,
    terms: [
      { term: "Income Statement", def: "Shows the income and expenses for a period – and the net profit or loss. (Statement of comprehensive income.)" },
      { term: "Balance Sheet", def: "Shows the assets, owner's equity and liabilities on one date. (Statement of financial position.)" },
      { term: "Gross profit", def: "Sales − cost of sales: the profit on trading before other income and expenses." },
      { term: "Net profit", def: "Gross profit + other operating income − operating expenses (± interest)." },
      { term: "Current assets", def: "Assets that will be turned into cash within 12 months: trading stock, debtors, cash and prepaid expenses." },
      { term: "Non-current assets", def: "Long-term assets used to run the business, e.g. land and buildings, vehicles, equipment." },
      { term: "Current liabilities", def: "Debts payable within 12 months: creditors, bank overdraft, accrued expenses, current portion of a loan." },
      { term: "Closing transfers", def: "Year-end entries that close the nominal accounts to Trading account / Profit and loss, and the profit to Capital." },
    ],
    chunks: [
      {
        id: "two-statements",
        title: "Two statements, two questions",
        minutes: 6,
        blocks: [
          { type: "text", md: "The **Income Statement** answers *\"How did we do this year?\"* (a video of the year). The **Balance Sheet** answers *\"What do we own and owe right now?\"* (a photo on the last day)." },
          {
            type: "table",
            headers: ["Income Statement (Trading account & Profit and loss)", "Balance Sheet"],
            rows: [
              ["Sales", "Non-current assets"],
              ["− Cost of sales = **Gross profit**", "Current assets"],
              ["+ Other operating income", "**Total assets**"],
              ["− Operating expenses", "Owner's equity (capital + net profit − drawings)"],
              ["= Operating profit; ± interest", "Non-current liabilities"],
              ["= **Net profit for the year**", "Current liabilities → **Total equity & liabilities**"],
            ],
          },
          { type: "callout", variant: "key", md: "The link: **net profit** from the Income Statement is added to **capital** in the Balance Sheet. That is why the Balance Sheet only balances if the Income Statement is right." },
        ],
      },
      {
        id: "lab",
        title: "Build the statements",
        minutes: 10,
        blocks: [
          { type: "widget", widget: "statement-builder" },
          { type: "callout", variant: "exam", md: "In the exam you will usually draw up the statements from a **Trial Balance plus adjustments**. Work neatly: do the adjustments as workings next to each figure – the markers give method marks." },
        ],
      },
      {
        id: "adjustments",
        title: "First year-end adjustments",
        minutes: 9,
        blocks: [
          { type: "text", md: "The **matching principle** says expenses and income must belong to the year in which they are earned or used. So at year-end we adjust:" },
          {
            type: "table",
            headers: ["Adjustment", "Effect on Income Statement", "Balance Sheet"],
            rows: [
              ["Expense paid in advance (prepaid)", "Reduce the expense", "Current asset"],
              ["Expense still owing (accrued)", "Increase the expense", "Current liability"],
              ["Income received in advance", "Reduce the income", "Current liability"],
              ["Income still receivable (accrued)", "Increase the income", "Current asset"],
              ["Consumable stores on hand (e.g. stationery)", "Reduce the expense", "Current asset"],
              ["Trading stock deficit (stock count < ledger)", "Expense: trading stock deficit", "Reduce trading stock"],
            ],
          },
          {
            type: "practice",
            id: "statements-practice",
            problems: [
              { q: "Sales R480 000; cost of sales R300 000. Calculate gross profit.", answer: "180000", unit: "R", solution: "R480 000 − R300 000 = **R180 000**" },
              { q: "Gross profit R180 000; rent income R24 000; operating expenses R131 500. Calculate net profit.", answer: "72500", unit: "R", solution: "R180 000 + R24 000 − R131 500 = **R72 500**" },
              { q: "Stationery account shows R5 600. Stationery worth R900 is still unused at year-end. What is the stationery expense in the Income Statement?", answer: "4700", unit: "R", hint: "Unused stationery is an asset (consumable stores on hand).", solution: "R5 600 − R900 = **R4 700**" },
              { q: "Capital at the start R200 000; net profit R72 500; drawings R36 000. Calculate capital at the end of the year.", answer: "236500", unit: "R", solution: "R200 000 + R72 500 − R36 000 = **R236 500**" },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Income Statement = a period; Balance Sheet = one date.", "Gross profit = sales − cost of sales.", "Net profit increases capital; drawings decrease it.", "Adjustments apply the matching principle: prepaid, accrued, stores on hand, stock deficits."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "statements-quiz",
            questions: [
              { q: "Where does 'Debtors control' appear?", options: ["Income Statement – income", "Balance Sheet – current assets", "Balance Sheet – current liabilities", "Income Statement – expenses"], answer: 1, explain: "Debtors owe us money within 12 months – a current asset." },
              { q: "A loan repayable over 5 years is a…", options: ["current liability", "non-current liability", "current asset", "expense"], answer: 1, explain: "Long-term debt is non-current (except the part payable in the next 12 months)." },
              { q: "Insurance paid in advance at year-end is shown as…", options: ["an expense", "a current asset", "a current liability", "income"], answer: 1, explain: "Prepaid expenses are amounts owed TO the business in services – current asset." },
              { q: "Drawings are shown in the…", options: ["Income Statement as an expense", "owner's equity (subtracted)", "current liabilities", "non-current assets"], answer: 1, explain: "Drawings are not an expense – they reduce owner's equity." },
              { q: "Net profit is transferred at year-end to the…", options: ["Bank account", "Capital account", "Sales account", "Drawings account"], answer: 1, explain: "Profit belongs to the owner, so it goes to Capital." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Salaries
  {
    slug: "salaries-and-wages",
    topic: "g10-salaries",
    order: 1,
    title: "Salaries & wages",
    tagline: "Gross pay, deductions, net pay – and what the employer pays on top.",
    emoji: "💼",
    caps: "CAPS Gr 10 · Financial Accounting: salaries and wages; gross and net pay; deductions (PAYE, UIF, pension, medical aid); employer's contributions; Salaries Journal and Wages Journal.",
    objectives: ["Distinguish between salaries and wages", "Calculate gross wages including overtime", "Calculate deductions and net pay", "Explain employer's contributions and record them"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 80,
    terms: [
      { term: "Salary", def: "A fixed monthly payment to a permanent employee." },
      { term: "Wage", def: "Payment per hour, day or week, usually to workers paid weekly. Overtime is paid at a higher rate." },
      { term: "Gross pay", def: "Total earnings before deductions: basic + overtime + bonus + commission + allowances." },
      { term: "Net pay", def: "What the employee actually receives: gross pay − deductions." },
      { term: "PAYE", def: "Pay-As-You-Earn: income tax the employer deducts every month and pays to SARS." },
      { term: "UIF", def: "Unemployment Insurance Fund: 1% deducted from the employee plus 1% paid by the employer (earnings capped at R17 712 a month)." },
      { term: "SDL", def: "Skills Development Levy: 1% of payroll paid by the employer (if payroll is above R500 000 a year) to fund training." },
      { term: "Employer's contributions", def: "Extra amounts the employer pays on top of salaries (e.g. UIF, SDL, pension and medical aid contributions) – an extra expense for the business." },
    ],
    chunks: [
      {
        id: "gross",
        title: "Gross pay",
        minutes: 7,
        blocks: [
          { type: "callout", variant: "real-world", md: "Lerato works at a Pick n Pay in Polokwane. She earns R45 an hour for a 45-hour week, and time-and-a-half for overtime. Last week she worked 51 hours." },
          {
            type: "worked",
            title: "Lerato's gross wage",
            problem: "R45 per hour, 45 normal hours, overtime at 1,5 times. She worked 51 hours.",
            steps: [
              { md: "Normal: 45 × R45 = **R2 025**" },
              { md: "Overtime: 6 hours × R45 × 1,5 = **R405**", why: "Only the hours above 45 are overtime." },
              { md: "Gross wage = R2 025 + R405 = **R2 430**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["salaries"], title: "Gross & net pay drill" } },
        ],
      },
      {
        id: "payslip",
        title: "Build a payslip",
        minutes: 9,
        blocks: [
          { type: "text", md: "From gross pay the employer must deduct **PAYE** and **UIF** (by law), plus anything the employee agreed to (pension, medical aid, union fees, loans). Play with the payslip below – it uses the real SARS tax tables." },
          { type: "widget", widget: "payslip-lab" },
          { type: "callout", variant: "life", md: "When you get your first job, check every payslip: Is the UIF there (so you can claim if you lose your job)? Is your tax number correct? Keep your payslips and your **IRP5** for tax season." },
        ],
      },
      {
        id: "journal",
        title: "The Salaries Journal & employer's contributions",
        minutes: 8,
        blocks: [
          {
            type: "table",
            headers: ["Employee", "Gross salary", "PAYE", "UIF", "Pension", "Medical aid", "Total deductions", "Net salary", "Employer: pension", "Employer: medical", "Employer: UIF"],
            rows: [
              ["S. Pillay", "22 000", "2 890", "177,12", "1 650", "1 800", "6 517,12", "15 482,88", "1 650", "1 800", "177,12"],
              ["J. Botha", "15 000", "1 240", "150", "1 125", "900", "3 415", "11 585", "1 125", "900", "150"],
            ],
            caption: "Salaries Journal (extract). The employer's contributions are an extra expense for the business.",
          },
          {
            type: "practice",
            id: "salaries-practice",
            problems: [
              { q: "Gross salary R22 000. Deductions: PAYE R2 890, UIF R177,12, pension R1 650, medical aid R1 800. Calculate net salary.", answer: "15482.88", unit: "R", solution: "R22 000 − (R2 890 + R177,12 + R1 650 + R1 800) = R22 000 − R6 517,12 = **R15 482,88**" },
              { q: "An employee earns R30 000 a month. Calculate the employee's UIF deduction (1%, earnings capped at R17 712).", answer: "177.12", unit: "R", hint: "1% of the ceiling, not of R30 000.", solution: "1% × R17 712 = **R177,12**" },
              { q: "The employer matches the employee's pension (R1 650) and pays UIF of R177,12 and SDL of 1% of R22 000. Calculate the employer's total contribution.", answer: "2047.12", unit: "R", solution: "R1 650 + R177,12 + R220 = **R2 047,12**" },
            ],
          },
          { type: "callout", variant: "exam", md: "In the ledger: Dr **Salaries** with the gross salaries; Cr **Bank** with net salaries; Cr **SARS (PAYE)**, **UIF**, **Pension fund**, **Medical aid fund** with the deductions (they are liabilities until paid over). Employer's contributions: Dr **Pension fund contributions** etc. (expenses), Cr the funds." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Gross pay − deductions = net pay.", "Compulsory deductions: PAYE and UIF.", "UIF: 1% employee + 1% employer (capped).", "Employer's contributions (UIF, SDL, pension, medical) are an extra expense for the business."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "salaries-quiz",
            questions: [
              { q: "Which deduction goes to SARS?", options: ["Medical aid", "PAYE", "Pension", "Union fees"], answer: 1, explain: "PAYE is employees' income tax, paid over to SARS by the employer." },
              { q: "The SDL is paid by…", options: ["the employee", "the employer", "SARS", "the bank"], answer: 1, explain: "Skills Development Levy is an employer cost." },
              { q: "Net pay is…", options: ["gross pay + deductions", "gross pay − deductions", "basic pay only", "PAYE + UIF"], answer: 1, explain: "Net = what reaches your bank account." },
              { q: "The UIF deduction is…", options: ["5% of gross", "1% of gross (capped)", "fixed at R500", "paid only by the employer"], answer: 1, explain: "1% from the employee and 1% from the employer, on earnings up to R17 712 a month." },
              { q: "Until it is paid over, PAYE deducted from employees is a…", options: ["liability (owed to SARS)", "asset", "income", "drawings"], answer: 0, explain: "The business is holding SARS's money – a current liability." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ VAT
  {
    slug: "vat-basics",
    topic: "g10-vat",
    order: 1,
    title: "VAT: the 15% everyone pays",
    tagline: "Businesses don't pay VAT – they collect it for SARS. Here's how.",
    emoji: "🧾",
    caps: "CAPS Gr 10 · Financial Accounting: Value-Added Tax – concepts, input and output VAT, VAT-inclusive and exclusive amounts, zero-rated and exempt supplies, VAT payable/refundable.",
    objectives: ["Explain how VAT works and who pays it", "Calculate VAT-inclusive, exclusive and VAT amounts", "Distinguish zero-rated and exempt supplies", "Calculate the amount payable to or refundable by SARS"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 80,
    terms: [
      { term: "VAT", def: "Value-Added Tax: a 15% tax on most goods and services in South Africa, collected by registered vendors for SARS." },
      { term: "VAT vendor", def: "A business registered for VAT. Registration is compulsory once taxable turnover passes the SARS threshold (R1 million for many years – check SARS for the current figure)." },
      { term: "Output VAT", def: "VAT the business charges on its sales – owed to SARS." },
      { term: "Input VAT", def: "VAT the business pays on its purchases and expenses – claimed back from SARS." },
      { term: "Zero-rated supplies", def: "Taxed at 0%, e.g. brown bread, maize meal, milk, eggs, fresh fruit and vegetables, exports. The vendor can still claim input VAT." },
      { term: "Exempt supplies", def: "Not taxed at all and no input VAT may be claimed, e.g. public transport (taxis, buses), residential rent, interest on loans." },
      { term: "VAT payable", def: "Output VAT − input VAT. If input VAT is bigger, SARS owes the business a refund." },
    ],
    chunks: [
      {
        id: "how",
        title: "How VAT flows",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: "You buy a R23 burger. R3 of that is VAT. The burger shop doesn't keep it – it pays it to SARS, minus the VAT it paid on buns and meat. Every business in the chain pays SARS only on the **value it added**." },
          {
            type: "table",
            headers: ["Stage", "Sells for (excl.)", "Output VAT", "Input VAT claimed", "Pays SARS"],
            rows: [
              ["Farmer → mill", "R100", "R15", "R0", "R15"],
              ["Mill → bakery", "R160", "R24", "R15", "R9"],
              ["Bakery → shop", "R250", "R37,50", "R24", "R13,50"],
              ["Shop → you", "R400", "R60", "R37,50", "R22,50"],
            ],
            caption: "Total paid to SARS = R60 = exactly the VAT you, the final consumer, paid.",
          },
          { type: "callout", variant: "memory", md: "**15/115** takes the VAT **out** of an inclusive price. **115/100** puts it **in**. Never take 15% of an inclusive price!" },
        ],
      },
      {
        id: "lab",
        title: "VAT lab",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "vat-lab" },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "vat-sorter", title: "Standard, zero-rated or exempt?", buckets: ["Standard (15%)", "Zero-rated (0%)", "Exempt"], colour: "var(--t-tax)",
              items: [
                { text: "A cellphone", bucket: "Standard (15%)" }, { text: "Brown bread", bucket: "Zero-rated (0%)" }, { text: "Taxi fare", bucket: "Exempt" },
                { text: "Maize meal", bucket: "Zero-rated (0%)" }, { text: "Residential rent for a flat", bucket: "Exempt" }, { text: "A takeaway burger", bucket: "Standard (15%)" },
                { text: "Fresh vegetables", bucket: "Zero-rated (0%)" }, { text: "Electricity", bucket: "Standard (15%)" }, { text: "Eggs", bucket: "Zero-rated (0%)" },
              ],
            },
          },
        ],
      },
      {
        id: "calc",
        title: "VAT calculations",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "VAT payable for a period",
            problem: "Sales (incl. VAT) R172 500; purchases (incl. VAT) R92 000. Calculate VAT payable.",
            steps: [
              { md: "Output VAT = R172 500 × 15/115 = **R22 500**" },
              { md: "Input VAT = R92 000 × 15/115 = **R12 000**" },
              { md: "VAT payable = R22 500 − R12 000 = **R10 500** to SARS", why: "Output (collected) minus input (paid)." },
            ],
          },
          {
            type: "practice",
            id: "vat-practice",
            problems: [
              { q: "A jacket costs R800 excluding VAT. Calculate the price including VAT.", answer: "920", unit: "R", solution: "R800 × 115/100 = **R920**" },
              { q: "A till slip shows R1 380 including VAT. How much VAT is included?", answer: "180", unit: "R", solution: "R1 380 × 15/115 = **R180**" },
              { q: "Output VAT R48 000; input VAT R51 600. How much does SARS refund the business?", answer: "3600", unit: "R", solution: "Input > output, so SARS refunds R51 600 − R48 000 = **R3 600**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["vat"], title: "VAT drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["VAT = 15%. Exclusive × 115/100 = inclusive; inclusive × 15/115 = VAT.", "Output VAT (sales) − input VAT (purchases) = VAT payable.", "Zero-rated: 0% VAT but input VAT CAN be claimed. Exempt: no VAT and NO input claim.", "The final consumer carries the full cost of VAT."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "vat-quiz",
            questions: [
              { q: "The VAT included in R575 is…", options: ["R86,25", "R75", "R57,50", "R500"], answer: 1, explain: "R575 × 15/115 = R75." },
              { q: "Output VAT is VAT on…", options: ["purchases", "sales", "salaries", "drawings"], answer: 1, explain: "Output = on what goes OUT (sales)." },
              { q: "Which is zero-rated?", options: ["Petrol station coffee", "Brown bread", "A taxi fare", "A laptop"], answer: 1, explain: "Basic foods such as brown bread are zero-rated to help poorer households." },
              { q: "Who finally bears the cost of VAT?", options: ["The manufacturer", "The retailer", "The final consumer", "SARS"], answer: 2, explain: "Vendors claim back input VAT; consumers can't." },
              { q: "A business with exempt supplies…", options: ["charges 15% VAT", "claims input VAT", "charges no VAT and claims no input VAT", "pays double VAT"], answer: 2, explain: "Exempt means outside the VAT system." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Bank recon
  {
    slug: "bank-reconciliation",
    topic: "g10-bank",
    order: 1,
    title: "Bank reconciliation",
    tagline: "Your books say one thing, the bank says another. Find out why.",
    emoji: "🏦",
    caps: "CAPS Gr 10 · Managing Resources: bank reconciliation – comparing the cash journals with the bank statement; outstanding deposits and payments; errors; the Bank Reconciliation Statement; internal control.",
    objectives: ["Explain why the bank statement and Bank account differ", "Tick and compare the cash journals and bank statement", "Update the cash journals", "Prepare a Bank Reconciliation Statement"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 80,
    terms: [
      { term: "Bank statement", def: "The bank's record of the business's account. Money in is shown as a credit (the bank owes you) – the opposite of your books!" },
      { term: "Outstanding deposit", def: "Money recorded in the CRJ but not yet on the bank statement (deposit in transit)." },
      { term: "Outstanding payment", def: "An EFT or cheque recorded in the CPJ that the bank has not yet processed." },
      { term: "Bank charges", def: "Fees the bank deducts (service fees, cash-deposit fees). Record them in the CPJ when you see the statement." },
      { term: "Debit order", def: "An instruction allowing someone to take money from your account each month, e.g. insurance." },
      { term: "Bank Reconciliation Statement", def: "A statement that explains the difference between the bank statement balance and the Bank account balance." },
      { term: "Favourable balance", def: "Money in the bank: a debit balance in our books and a credit balance on the bank statement." },
    ],
    chunks: [
      {
        id: "why",
        title: "Why don't they agree?",
        minutes: 5,
        blocks: [
          { type: "text", md: "At month-end the **Bank account** in the ledger and the **bank statement** almost never show the same balance. The reasons:\n\n1. **Timing** – we recorded it, the bank hasn't yet (outstanding deposits and payments).\n2. **Information only on the statement** – bank charges, interest, debit orders, unpaid (\"dishonoured\") cheques.\n3. **Errors** – by us or by the bank." },
          { type: "callout", variant: "mistake", md: "On the bank **statement**, a favourable balance is a **credit** – because to the bank, your money is a liability (they owe it to you). In **your** books it's a debit. Don't let that confuse you." },
        ],
      },
      {
        id: "lab",
        title: "Reconcile it yourself",
        minutes: 10,
        blocks: [
          { type: "widget", widget: "bank-recon-lab" },
          {
            type: "sequence",
            id: "recon-steps",
            title: "The bank reconciliation method",
            steps: ["Tick matching items in the CRJ/CPJ and on the bank statement", "Enter unticked statement items (charges, interest, debit orders) in the cash journals", "Total the journals and post to the Bank account", "List unticked journal items as outstanding on the reconciliation statement", "Check that the statement balance + outstanding deposits − outstanding payments = Bank account"],
            explain: "Update the books first, then reconcile only the timing differences.",
          },
        ],
      },
      {
        id: "calc",
        title: "Practise the calculations",
        minutes: 7,
        blocks: [
          {
            type: "practice",
            id: "bank-practice",
            problems: [
              { q: "Bank statement: R18 400 favourable. Outstanding deposit R6 200. Outstanding EFT R2 750. What is the correct Bank account balance?", answer: "21850", unit: "R", solution: "R18 400 + R6 200 − R2 750 = **R21 850** (favourable)" },
              { q: "The Bank account shows R9 300 favourable before you see the statement. The statement shows service fees of R245 and a debit order for insurance of R560. What is the updated Bank balance?", answer: "8495", unit: "R", solution: "R9 300 − R245 − R560 = **R8 495**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["bank-recon"], title: "Bank reconciliation drill" } },
          { type: "callout", variant: "safety", md: "Internal control: an outstanding deposit that is **weeks** old means cash may have been stolen before it reached the bank. The person who receives cash must **not** be the person who does the reconciliation." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Differences: timing, statement-only items, errors.", "Statement-only items go INTO the journals.", "Timing differences go on the reconciliation statement.", "Segregation of duties protects cash."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "bank-quiz",
            questions: [
              { q: "Bank charges are recorded in the…", options: ["CRJ", "CPJ", "Bank Reconciliation Statement only", "DJ"], answer: 1, explain: "They reduce the bank balance – CPJ." },
              { q: "A deposit made on the last day of the month not yet on the statement is…", options: ["a bank error", "an outstanding deposit", "a debit order", "a dishonoured cheque"], answer: 1, explain: "It's a timing difference." },
              { q: "On the bank statement, a favourable balance is shown as a…", options: ["debit", "credit", "nil", "overdraft"], answer: 1, explain: "To the bank your money is a liability." },
              { q: "Interest earned on the bank account is recorded in the…", options: ["CRJ", "CPJ", "GJ", "PCJ"], answer: 0, explain: "It increases the bank balance." },
              { q: "Which is the best internal control?", options: ["One person handles cash and reconciles", "Different people receive cash and do the reconciliation", "Reconcile once a year", "Keep deposits in a drawer for a week"], answer: 1, explain: "Segregation of duties." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Ethics & control
  {
    slug: "ethics-internal-control",
    topic: "g10-ethics",
    order: 1,
    title: "Ethics & internal control",
    tagline: "Honesty is a business asset. Controls make sure nobody is tempted.",
    emoji: "🛡️",
    caps: "CAPS Gr 10 · Managing Resources: ethics – ethical behaviour, codes of conduct and professional bodies; internal control over cash and inventory.",
    objectives: ["Describe ethical behaviour in business", "Name the accounting professional bodies", "Identify internal-control measures for cash and stock", "Suggest solutions to ethical problems"],
    styles: ["auditory", "read-write", "kinaesthetic"],
    xp: 60,
    terms: [
      { term: "Ethics", def: "Moral principles that decide what is right and wrong behaviour." },
      { term: "Code of conduct", def: "A written set of rules about how employees and managers must behave." },
      { term: "Internal control", def: "Procedures that protect a business's assets, prevent fraud and make records reliable." },
      { term: "Segregation of duties", def: "Splitting tasks so no single person controls a whole process (e.g. one person receives cash, another records it)." },
      { term: "SAICA", def: "South African Institute of Chartered Accountants – the professional body for CAs(SA)." },
      { term: "SAIPA", def: "South African Institute of Professional Accountants." },
      { term: "Fraud", def: "Deliberately deceiving someone to gain money or an advantage illegally." },
    ],
    chunks: [
      {
        id: "dilemmas",
        title: "What would you do?",
        minutes: 7,
        blocks: [
          { type: "callout", variant: "real-world", md: "Ruan is a cashier. His manager tells him to ring up fewer sales on the till \"so the business pays less VAT\". The manager says everyone does it. What should Ruan do?" },
          { type: "text", md: "This is **tax evasion** – a crime. Ethical accountants follow the law **and** the spirit of the law. Ruan should refuse, and report it (e.g. via a whistle-blowing hotline). South African law protects whistle-blowers (the Protected Disclosures Act)." },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "ethics-sorter", title: "Ethical or unethical?", buckets: ["Ethical", "Unethical"], colour: "var(--t-control)",
              items: [
                { text: "Declaring all cash sales to SARS", bucket: "Ethical" },
                { text: "Giving a tender to your cousin's company without quotes", bucket: "Unethical" },
                { text: "Reporting a colleague who steals stock", bucket: "Ethical" },
                { text: "Backdating an invoice to claim VAT earlier", bucket: "Unethical" },
                { text: "Disclosing a conflict of interest to your manager", bucket: "Ethical" },
                { text: "Using the company car for weekend trips without permission", bucket: "Unethical" },
                { text: "Accepting an expensive gift from a supplier in exchange for orders", bucket: "Unethical" },
                { text: "Paying suppliers on time as agreed", bucket: "Ethical" },
              ],
            },
          },
        ],
      },
      {
        id: "controls",
        title: "Internal controls that work",
        minutes: 7,
        blocks: [
          {
            type: "table",
            headers: ["Area", "Control", "Why"],
            rows: [
              ["Cash", "Bank all cash daily; use a safe; issue pre-numbered receipts", "Less cash lying around to steal; every rand is traceable"],
              ["Cash", "Two signatures / approvals for EFTs over a limit", "One person can't pay themselves"],
              ["Cash", "Monthly bank reconciliation by an independent person", "Spots missing deposits and fake payments"],
              ["Stock", "Regular stock counts; compare with the ledger", "Shows theft (stock deficits)"],
              ["Stock", "CCTV, locked storeroom, limited access", "Physical protection"],
              ["Staff", "Rotate duties; compulsory leave", "Hidden fraud is often found when someone else does the job"],
            ],
          },
          { type: "callout", variant: "memory", md: "**SPAR** your controls: **S**egregate duties · **P**hysical protection · **A**uthorise everything · **R**econcile regularly." },
          {
            type: "match",
            id: "control-match",
            title: "Match the problem to the control",
            pairs: [
              { left: "Cashier pockets cash sales", right: "Issue till slips for every sale and check the till roll" },
              { left: "Fake supplier is paid", right: "Two people must approve new suppliers and EFTs" },
              { left: "Stock disappears from the storeroom", right: "Lock the store and do surprise stock counts" },
              { left: "Bookkeeper hides missing deposits", right: "Someone else reconciles the bank statement" },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Ethics: honesty, integrity, transparency, accountability.", "Professional bodies: SAICA, SAIPA, CIMA, ACCA, SAIBA.", "Internal control: segregation of duties, physical safeguards, authorisation, reconciliation.", "Tax evasion is a crime; tax avoidance (legal planning) is not."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "ethics-quiz",
            questions: [
              { q: "Splitting the receiving and recording of cash between two people is called…", options: ["rotation of duties", "segregation of duties", "authorisation", "auditing"], answer: 1, explain: "Segregation of duties – no one person controls the whole process." },
              { q: "Which body registers Chartered Accountants CA(SA)?", options: ["SARS", "SAICA", "SAPS", "JSE"], answer: 1, explain: "South African Institute of Chartered Accountants." },
              { q: "Under-declaring sales to pay less VAT is…", options: ["tax avoidance", "tax evasion", "tax planning", "allowed under R1 million"], answer: 1, explain: "Evasion = illegal." },
              { q: "Why should employees take compulsory leave?", options: ["To save on wages", "So that someone else does their job and any fraud is noticed", "To reduce UIF", "It is a GAAP principle"], answer: 1, explain: "Fraud often needs daily cover-ups." },
              { q: "The best way to protect cash takings is to…", options: ["keep them in the office drawer", "bank them daily", "let the cashier take them home", "count them once a month"], answer: 1, explain: "Daily banking reduces the risk of theft." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Cost basics
  {
    slug: "cost-accounting-basics",
    topic: "g10-cost",
    order: 1,
    title: "Cost accounting basics: costs, mark-up & pricing",
    tagline: "Know your costs or you'll never know if you are making money.",
    emoji: "🏷️",
    caps: "CAPS Gr 10 · Managerial Accounting: cost accounting concepts – fixed and variable costs, direct and indirect costs; cost price, mark-up and selling price; break-even (introduction).",
    objectives: ["Classify costs as fixed or variable, direct or indirect", "Calculate selling price from cost and mark-up", "Calculate the mark-up percentage", "Explain the break-even idea"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 70,
    terms: [
      { term: "Fixed cost", def: "A cost that stays the same in total no matter how many units are made or sold, e.g. rent, insurance." },
      { term: "Variable cost", def: "A cost that changes in total with the number of units, e.g. raw materials, packaging, sales commission." },
      { term: "Direct cost", def: "A cost that can be traced straight to the product, e.g. the fabric in a T-shirt." },
      { term: "Indirect cost", def: "A cost that can't be traced to one product, e.g. the factory supervisor's salary." },
      { term: "Mark-up", def: "The percentage added to cost price to get the selling price: gross profit ÷ cost × 100." },
      { term: "Break-even point", def: "The number of units at which total income equals total costs – no profit, no loss." },
    ],
    chunks: [
      {
        id: "costs",
        title: "Types of costs",
        minutes: 6,
        blocks: [
          { type: "callout", variant: "real-world", md: "Naledi prints custom T-shirts in her garage in Soweto. Each shirt needs a blank T-shirt (R55) and ink (R10). She also pays R1 500 a month for the printing-machine lease, whether she prints 1 shirt or 500." },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "fixed-variable", title: "Fixed or variable cost?", buckets: ["Fixed", "Variable"], colour: "var(--t-cost)",
              items: [
                { text: "Rent of the workshop", bucket: "Fixed" }, { text: "Blank T-shirts", bucket: "Variable" }, { text: "Ink", bucket: "Variable" },
                { text: "Insurance", bucket: "Fixed" }, { text: "Machine lease", bucket: "Fixed" }, { text: "Packaging per order", bucket: "Variable" },
                { text: "Delivery cost per order", bucket: "Variable" }, { text: "Manager's monthly salary", bucket: "Fixed" },
              ],
            },
          },
        ],
      },
      {
        id: "pricing",
        title: "Mark-up and selling price",
        minutes: 8,
        blocks: [
          { type: "text", md: m`$$\text{Selling price} = \text{Cost price} \times \frac{100 + \text{mark-up}\ \%}{100}$$

$$\text{Mark-up}\ \% = \frac{\text{Gross profit}}{\text{Cost price}} \times 100$$` },
          {
            type: "worked",
            title: "Pricing Naledi's T-shirts",
            problem: "Variable cost per shirt = R65. Naledi wants a mark-up of 80% on variable cost. What should she charge?",
            steps: [
              { md: "R65 × 180/100 = **R117**" },
              { md: "Gross profit per shirt = R117 − R65 = **R52**" },
              { md: "To cover the R1 500 lease she must sell R1 500 ÷ R52 = 28,8 → **29 shirts** a month just to break even.", why: "Break-even = fixed costs ÷ profit per unit." },
            ],
          },
          {
            type: "practice",
            id: "cost-practice",
            problems: [
              { q: "A school bag costs R240. The shop adds a 75% mark-up. Calculate the selling price.", answer: "420", unit: "R", solution: "R240 × 175/100 = **R420**" },
              { q: "Sneakers cost R600 and sell for R900. Calculate the mark-up percentage.", answer: "50", unit: "%", solution: "Gross profit = R300. R300 ÷ R600 × 100 = **50%**" },
              { q: "Fixed costs are R3 000 a month; each cake sells for R180 and costs R105 to make. How many cakes must be sold to break even?", answer: "40", unit: "cakes", solution: "Profit per cake = R75. R3 000 ÷ R75 = **40 cakes**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["markup"], title: "Pricing drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Fixed costs stay the same in total; variable costs change with output.", "Direct costs can be traced to the product; indirect costs can't.", "Selling price = cost × (100 + mark-up)/100.", "Break-even units = fixed costs ÷ (selling price − variable cost)."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "cost10-quiz",
            questions: [
              { q: "Which is a variable cost for a bakery?", options: ["Rent", "Flour", "Insurance", "Manager's salary"], answer: 1, explain: "More bread = more flour." },
              { q: "Cost R200, mark-up 40%. Selling price?", options: ["R240", "R280", "R80", "R333"], answer: 1, explain: "R200 × 1,4 = R280." },
              { q: "At the break-even point…", options: ["profit is highest", "income = total costs", "fixed costs are zero", "variable costs are zero"], answer: 1, explain: "No profit, no loss." },
              { q: "The factory cleaner's wage is a(n)…", options: ["direct cost", "indirect cost", "income", "asset"], answer: 1, explain: "It can't be traced to one product." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Budget basics
  {
    slug: "budgeting-basics",
    topic: "g10-budget",
    order: 1,
    title: "Budgeting basics: plan before you spend",
    tagline: "A budget is a plan for your money – for a household or a business.",
    emoji: "🗓️",
    caps: "CAPS Gr 10 · Managerial Accounting: budgeting – personal and business budgets; projected receipts and payments; budgeted vs actual figures.",
    objectives: ["Explain the purpose of a budget", "Draw up a simple personal budget", "Compare budgeted and actual figures", "Explain why only cash items appear in a cash budget"],
    styles: ["kinaesthetic", "visual"],
    xp: 60,
    terms: [
      { term: "Budget", def: "A financial plan for a future period, showing expected income and spending." },
      { term: "Cash budget", def: "A projection of cash receipts and cash payments, month by month, to predict the bank balance." },
      { term: "Variance", def: "The difference between the budgeted and the actual figure." },
      { term: "Favourable variance", def: "Actual is better than budget (more income or less spending)." },
      { term: "Unfavourable variance", def: "Actual is worse than budget (less income or more spending)." },
    ],
    chunks: [
      {
        id: "why",
        title: "Why budget?",
        minutes: 6,
        blocks: [
          { type: "text", md: "Budgets help you **plan** (what's coming), **control** (compare actual vs plan) and **decide** (can we afford it?). Businesses and households use exactly the same idea." },
          { type: "widget", widget: "budget-builder", props: { preset: "student" } },
          { type: "callout", variant: "life", md: "The 50/30/20 rule is a great start for your own money: 50% needs, 30% wants, 20% savings and paying off debt. The Money Life track goes deeper." },
        ],
      },
      {
        id: "variance",
        title: "Budget vs actual",
        minutes: 6,
        blocks: [
          {
            type: "table",
            headers: ["Item", "Budget", "Actual", "Variance", ""],
            rows: [
              ["Sales", "R80 000", "R86 000", "R6 000", "Favourable"],
              ["Wages", "R18 000", "R21 500", "R3 500", "Unfavourable"],
              ["Electricity", "R4 000", "R3 600", "R400", "Favourable"],
              ["Advertising", "R2 000", "R2 000", "R0", "On budget"],
            ],
          },
          {
            type: "practice",
            id: "budget10-practice",
            problems: [
              { q: "Budgeted transport R1 200; actual R1 470. Calculate the variance (positive number).", answer: "270", unit: "R", solution: "R1 470 − R1 200 = **R270** – unfavourable (spent more)." },
              { q: "Which of these appears in a CASH budget? Type 'loan' or 'depreciation'.", answer: "loan", kind: "text", solution: "A **loan** received brings in cash. Depreciation is not a cash flow, so it never appears in a cash budget." },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Budgets: plan, control, decide.", "Variance = actual − budget; favourable or unfavourable.", "Cash budgets include only cash items – no depreciation, no bad debts."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "budget10-quiz",
            questions: [
              { q: "Spending less than budgeted on electricity is a…", options: ["favourable variance", "unfavourable variance", "bad debt", "drawing"], answer: 0, explain: "Less spending is better than planned." },
              { q: "Which item never appears in a cash budget?", options: ["Wages", "Rent paid", "Depreciation", "Cash sales"], answer: 2, explain: "Depreciation does not involve cash." },
              { q: "A budget is mainly used to…", options: ["record past transactions", "plan and control the future", "pay tax", "count stock"], answer: 1, explain: "Budgets look forward." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Inventory systems
  {
    slug: "inventory-systems",
    topic: "g10-inventory",
    order: 1,
    title: "Inventory systems: perpetual vs periodic",
    tagline: "Two ways to track stock – and why stock counts still matter.",
    emoji: "📦",
    caps: "CAPS Gr 10 · Managing Resources: inventory systems – perpetual and periodic; cost of sales; stock counts and stock control.",
    objectives: ["Compare the perpetual and periodic inventory systems", "Calculate cost of sales under the periodic system", "Explain trading stock deficits", "Suggest stock control measures"],
    styles: ["visual", "kinaesthetic", "read-write"],
    xp: 60,
    terms: [
      { term: "Perpetual inventory system", def: "Stock and cost of sales are updated with every purchase and every sale, so the Trading stock account always shows what should be on hand." },
      { term: "Periodic inventory system", def: "Purchases are recorded in a Purchases account; stock is counted at year-end and cost of sales is calculated." },
      { term: "Cost of sales", def: "The cost price of the goods that were sold." },
      { term: "Stock count", def: "Physically counting the stock on hand on a date." },
      { term: "Trading stock deficit", def: "When the physical count is less than the ledger balance (perpetual system) – stock lost, stolen or damaged." },
      { term: "Carriage on purchases", def: "Transport cost to get stock to the shop – part of the cost of the stock." },
    ],
    chunks: [
      {
        id: "systems",
        title: "Two systems",
        minutes: 7,
        blocks: [
          {
            type: "table",
            headers: ["", "Perpetual", "Periodic"],
            rows: [
              ["When cost of sales is recorded", "At every sale", "Only at year-end (calculated)"],
              ["Stock purchases debited to", "Trading stock", "Purchases"],
              ["Know your stock level anytime?", "Yes (in theory)", "No – only after a count"],
              ["Suits", "Supermarkets with barcode scanners", "Small shops, e.g. a spaza or market stall"],
              ["Stock count still needed?", "Yes – to find deficits (theft, damage)", "Yes – to calculate cost of sales"],
            ],
          },
          {
            type: "text",
            md: m`Under the **periodic** system:

$$\text{Cost of sales} = \text{Opening stock} + \text{Net purchases} - \text{Closing stock}$$

Net purchases = purchases + carriage on purchases + customs duty − returns.`,
          },
        ],
      },
      {
        id: "practice",
        title: "Calculate cost of sales",
        minutes: 7,
        blocks: [
          {
            type: "practice",
            id: "inventory10-practice",
            problems: [
              { q: "Opening stock R24 000; purchases R130 000; carriage on purchases R3 500; closing stock R28 500. Calculate cost of sales.", answer: "129000", unit: "R", solution: "R24 000 + R133 500 − R28 500 = **R129 000**" },
              { q: "Perpetual system: Trading stock account R61 200; physical count R59 850. Calculate the stock deficit.", answer: "1350", unit: "R", solution: "R61 200 − R59 850 = **R1 350**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["cost-of-sales"], title: "Cost of sales drill" } },
          { type: "callout", variant: "tip", md: "Want to see how stock is **valued** when prices keep rising? Try the inventory valuation lab (FIFO vs weighted average) in the Toolkit – that's Grade 12 work." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Perpetual: cost of sales at every sale; periodic: at year-end.", "Periodic: COS = opening stock + net purchases − closing stock.", "A stock count is always needed – deficits reveal theft or damage."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "inventory10-quiz",
            questions: [
              { q: "In the periodic system, stock bought is debited to…", options: ["Trading stock", "Purchases", "Cost of sales", "Sales"], answer: 1, explain: "Purchases account – stock is only adjusted at year-end." },
              { q: "Carriage on purchases is…", options: ["added to the cost of stock", "an income", "deducted from sales", "drawings"], answer: 0, explain: "It's part of getting the stock ready to sell." },
              { q: "A trading stock deficit means…", options: ["more stock than expected", "less stock than the records show", "stock was sold at a loss", "stock was returned"], answer: 1, explain: "Physical count < ledger balance." },
            ],
          },
        ],
      },
    ],
  },
];
