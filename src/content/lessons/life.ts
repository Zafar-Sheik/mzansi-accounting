import type { Lesson } from "../types";

const m = String.raw;

/**
 * Money Life: accounting skills for real life. Not examined in the NSC, but
 * every learner needs them – budgets, banking, side hustles, payslips, credit,
 * saving, doing your own taxes and adulting.
 */
export const LIFE: Lesson[] = [
  // ------------------------------------------------------------------ Money plan
  {
    slug: "money-plan",
    topic: "life-money",
    order: 1,
    title: "Your money plan: budgets that actually work",
    tagline: "Tell your money where to go, instead of wondering where it went.",
    emoji: "🧠",
    caps: "Money Life · links to CAPS Gr 10 budgeting. Personal budgets, needs vs wants, the 50/30/20 rule, tracking spending and emergency funds.",
    objectives: ["Separate needs from wants", "Build a monthly budget with the 50/30/20 rule", "Track spending and spot money leaks", "Plan for emergencies and family responsibilities"],
    styles: ["kinaesthetic", "visual"],
    xp: 70,
    terms: [
      { term: "Need", def: "Something you must have to live and work: housing, basic food, transport, electricity, basic data for work or school." },
      { term: "Want", def: "Something nice to have but not essential: takeaways, new sneakers, streaming, the latest phone." },
      { term: "50/30/20 rule", def: "A simple budget: 50% of take-home pay on needs, 30% on wants, 20% on savings and paying off debt." },
      { term: "Pay yourself first", def: "Move your savings out on payday, before you spend – not whatever is left at month-end." },
      { term: "Emergency fund", def: "Savings of 3–6 months of essential expenses for job loss, illness or a broken fridge." },
      { term: "Money leak", def: "Small, regular spending you don't notice that adds up – e.g. R35 coffees, unused subscriptions, bank fees." },
    ],
    chunks: [
      {
        id: "hook",
        title: "Where did it go?",
        minutes: 5,
        blocks: [
          { type: "callout", variant: "life", md: "Kagiso gets his first salary: **R12 000**. By the 15th he's broke. Rent, a night out, sneakers on sale, airtime, a loan to his cousin, Uber Eats… He didn't do anything crazy – he just didn't have a **plan**." },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "needs-wants", title: "Need or want?", buckets: ["Need", "Want"], colour: "var(--t-life)",
              items: [
                { text: "Rent", bucket: "Need" }, { text: "Takeaway pizza", bucket: "Want" }, { text: "Taxi fare to work", bucket: "Need" },
                { text: "Netflix", bucket: "Want" }, { text: "Groceries", bucket: "Need" }, { text: "New sneakers (you have 3 pairs)", bucket: "Want" },
                { text: "Electricity", bucket: "Need" }, { text: "Latest iPhone on contract", bucket: "Want" }, { text: "Data for online classes", bucket: "Need" },
                { text: "Concert tickets", bucket: "Want" },
              ],
            },
          },
          { type: "callout", variant: "tip", md: "Wants are not evil! A budget with **zero** fun fails within a month. The goal is to choose your wants on purpose." },
        ],
      },
      {
        id: "lab",
        title: "Build your budget",
        minutes: 9,
        blocks: [
          { type: "widget", widget: "budget-builder" },
          {
            type: "sequence",
            id: "budget-steps",
            title: "Five steps to a budget that works",
            steps: ["Write down your take-home (net) pay", "List fixed needs (rent, transport, family support)", "Pay yourself first – savings on payday", "Give the rest a job: groceries, wants, a buffer", "Track every rand for a month and adjust"],
            explain: "This is exactly what a business does: a budget, then a comparison of budget vs actual, then adjustments.",
          },
        ],
      },
      {
        id: "practice",
        title: "Do the maths",
        minutes: 6,
        blocks: [
          {
            type: "practice",
            id: "money-practice",
            problems: [
              { q: "Take-home pay R9 800. Using 50/30/20, how much is for savings and debt repayment?", answer: "1960", unit: "R", solution: "20% × R9 800 = **R1 960**" },
              { q: "You buy a R38 coffee every school day (about 22 days a month). How much is that per year (12 months)?", answer: "10032", unit: "R", solution: "R38 × 22 × 12 = **R10 032** – a money leak!" },
              { q: "Your essential expenses are R7 500 a month. How big should a 3-month emergency fund be?", answer: "22500", unit: "R", solution: "3 × R7 500 = **R22 500**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["budget-503020"], title: "50/30/20 drill" } },
          { type: "callout", variant: "real-world", md: "**Black tax** – supporting family once you earn – is real for many South Africans. Put it in the budget as a **need** with a clear amount, talk openly about it, and still protect your 20% savings so you don't end up needing support yourself." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Needs first, wants on purpose, savings on payday.", "50/30/20 is a starting point – adjust it to your life.", "Track spending to find money leaks.", "Build an emergency fund before investing for fun."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "money-quiz",
            questions: [
              { q: "'Pay yourself first' means…", options: ["buy something nice on payday", "save on payday before spending", "pay your own salary", "pay off friends first"], answer: 1, explain: "Savings come out first, so they actually happen." },
              { q: "An emergency fund should be…", options: ["invested in crypto", "kept in an account you can access quickly", "lent to friends", "spent on a holiday"], answer: 1, explain: "It must be available when the emergency happens." },
              { q: "Which is a money leak?", options: ["Rent", "Unused gym membership debit order", "School fees", "Electricity"], answer: 1, explain: "Paying for something you don't use." },
              { q: "Take-home pay R15 000. The 50/30/20 'wants' amount is…", options: ["R3 000", "R4 500", "R7 500", "R1 500"], answer: 1, explain: "30% of R15 000." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Banking & scams
  {
    slug: "banking-cards-scams",
    topic: "life-banking",
    order: 1,
    title: "Banking, cards & scams",
    tagline: "Pick the right account, stop paying silly fees and never fall for a scam.",
    emoji: "💳",
    caps: "Money Life · links to CAPS Gr 10 bank reconciliation and internal control. Bank accounts, fees, debit vs credit cards, EFTs and instant payments, reading a bank statement, fraud and scams.",
    objectives: ["Choose a bank account that suits you", "Compare debit cards, credit cards and store cards", "Read your own bank statement and spot errors", "Recognise and avoid common scams"],
    styles: ["visual", "auditory", "kinaesthetic"],
    xp: 70,
    terms: [
      { term: "Transactional account", def: "An everyday bank account for your salary, card payments and debit orders." },
      { term: "Debit card", def: "Pays with YOUR money straight from your account." },
      { term: "Credit card", def: "Pays with the BANK's money – you must pay it back, with interest if you don't settle in full." },
      { term: "Debit order", def: "Permission for a company to take money from your account each month. You can dispute an unauthorised one." },
      { term: "OTP", def: "One-time PIN sent to your phone to approve a transaction. NEVER share it – banks will never ask for it." },
      { term: "SIM swap fraud", def: "A criminal moves your number to a new SIM to receive your OTPs and empty your account." },
      { term: "Phishing", def: "Fake emails, SMSes or WhatsApps that trick you into giving your login details or OTP." },
      { term: "Ponzi / pyramid scheme", def: "An 'investment' that pays early members with new members' money. It always collapses." },
    ],
    chunks: [
      {
        id: "accounts",
        title: "Choose your account",
        minutes: 6,
        blocks: [
          { type: "text", md: "When choosing a bank account, compare: **monthly fee**, **pay-as-you-use fees** (cash withdrawals, deposits at a branch), the **app**, free **instant payments** (e.g. PayShap) and whether it pays **interest**. Digital banks often have no monthly fee." },
          {
            type: "table",
            headers: ["", "Debit card", "Credit card", "Store card"],
            rows: [
              ["Whose money?", "Yours", "The bank's (a loan)", "The store's (a loan)"],
              ["Interest?", "No", "Yes – if you don't pay in full by the due date", "Yes – often high, plus fees"],
              ["Builds credit record?", "No", "Yes (if paid on time)", "Yes (if paid on time)"],
              ["Risk", "Low", "Debt spiral if misused", "Tempts impulse buying"],
            ],
          },
          { type: "callout", variant: "life", md: "Do your own **bank reconciliation** every month: check every line on your statement. Unknown debit order? You can dispute it with your bank. That's Grade 10 Accounting saving you real money." },
        ],
      },
      {
        id: "scams",
        title: "Scam or legit?",
        minutes: 7,
        blocks: [
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "scam-sorter", title: "Scam or legit?", buckets: ["Scam 🚩", "Legit ✅"], colour: "var(--warning)",
              items: [
                { text: "SMS: 'Your account is blocked. Click this link and enter your PIN'", bucket: "Scam 🚩" },
                { text: "WhatsApp group promising 30% profit a week from forex trading", bucket: "Scam 🚩" },
                { text: "Your bank app asks you to approve a purchase you just made", bucket: "Legit ✅" },
                { text: "A 'recruiter' asks for R500 for your uniform before you start the job", bucket: "Scam 🚩" },
                { text: "Caller from 'the bank' asks you to read out the OTP you just received", bucket: "Scam 🚩" },
                { text: "A registered unit trust with an FSCA-licensed manager and published fees", bucket: "Legit ✅" },
                { text: "'Recruit 3 friends and double your money' scheme", bucket: "Scam 🚩" },
                { text: "Your employer pays your salary by EFT on the 25th", bucket: "Legit ✅" },
              ],
            },
          },
          { type: "callout", variant: "safety", md: "Red flags: **guaranteed** high returns, **pressure** to act now, requests for **OTPs or PINs**, **upfront fees** for jobs or loans, and \"recruit others\" schemes. Check whether a financial provider is registered with the **FSCA** before you invest a cent." },
        ],
      },
      {
        id: "practice",
        title: "Fees add up",
        minutes: 5,
        blocks: [
          {
            type: "practice",
            id: "banking-practice",
            problems: [
              { q: "Account A: R99 monthly fee, all transactions free. Account B: R0 monthly fee, but R10 per cash withdrawal and R5 per card swipe. You withdraw cash 4 times and swipe 6 times a month. How much does Account B cost per month?", answer: "70", unit: "R", solution: "4 × R10 + 6 × R5 = **R70** – cheaper than Account A." },
              { q: "Bank fees of R85 a month for 12 months. How much is that per year?", answer: "1020", unit: "R", solution: "R85 × 12 = **R1 020**" },
            ],
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Debit card = your money; credit/store card = borrowed money.", "Check your statement monthly – dispute unknown debit orders.", "Never share PINs, passwords or OTPs.", "Guaranteed high returns = scam."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "banking-quiz",
            questions: [
              { q: "Someone 'from your bank' phones and asks for the OTP you just received. You…", options: ["read it to them", "hang up and call the bank on the number on your card", "SMS it to them", "post it on WhatsApp"], answer: 1, explain: "Banks never ask for OTPs." },
              { q: "Which card spends your own money?", options: ["Credit card", "Store card", "Debit card", "Gift voucher on credit"], answer: 2, explain: "Debit = straight from your account." },
              { q: "A scheme pays you for recruiting new members. It is probably a…", options: ["unit trust", "pyramid scheme", "savings account", "medical aid"], answer: 1, explain: "Money comes from new members, not real investments." },
              { q: "Which regulator licenses financial service providers?", options: ["SARS", "FSCA", "SAPS", "CIPC"], answer: 1, explain: "Financial Sector Conduct Authority." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Side hustle
  {
    slug: "side-hustle",
    topic: "life-hustle",
    order: 1,
    title: "Start a side hustle (and keep the books)",
    tagline: "Price it, sell it, record it – and know your real profit.",
    emoji: "🚀",
    caps: "Money Life · vocational, hands-on. Links to CAPS Gr 10 cost accounting, journals and the accounting equation: pricing, cash book, invoices and quotes, profit vs cash, registering a business and small-business tax.",
    objectives: ["Calculate the cost of a product or service and set a price", "Keep a simple cash book for a small business", "Write a quote and an invoice", "Explain profit vs cash and when to register for tax"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 90,
    terms: [
      { term: "Cost per unit", def: "Everything it costs to make one item or deliver one service: materials, packaging, transport, your time." },
      { term: "Quote", def: "A document that tells a customer what a job will cost BEFORE they agree." },
      { term: "Invoice", def: "A document asking a customer to pay for goods or services delivered – the source document for a credit sale." },
      { term: "Cash book", def: "A simple record of every rand in and out of your business – a mini CRJ and CPJ." },
      { term: "CIPC", def: "Companies and Intellectual Property Commission – where you register a company (Pty) Ltd." },
      { term: "Turnover tax", def: "A simplified SARS tax for micro businesses with turnover up to R1 million a year." },
      { term: "Provisional taxpayer", def: "Someone with income not taxed through PAYE (e.g. a side hustle) who pays tax in advance twice a year." },
    ],
    chunks: [
      {
        id: "sim",
        title: "Run your hustle",
        minutes: 10,
        blocks: [
          { type: "callout", variant: "life", md: "Fatima braids hair on Saturdays. Zanele bakes cupcakes. Bongani washes cars at the taxi rank. Every one of them is running a business – and every business needs **pricing, records and profit**. Try it below: you have five days and R500." },
          { type: "widget", widget: "hustle-sim" },
        ],
      },
      {
        id: "pricing",
        title: "Price for profit",
        minutes: 8,
        blocks: [
          {
            type: "worked",
            title: "Pricing cupcakes",
            problem: "A batch of 24 cupcakes needs: flour, sugar, eggs and butter R96; icing R48; boxes R60; electricity R18. You want a 100% mark-up on cost.",
            steps: [
              { md: "Total batch cost = R96 + R48 + R60 + R18 = **R222**" },
              { md: "Cost per cupcake = R222 ÷ 24 = **R9,25**" },
              { md: "Selling price = R9,25 × 200/100 = **R18,50** per cupcake", why: "A 100% mark-up doubles the cost." },
              { md: "Profit per batch = 24 × R9,25 = **R222** – but did you count your 3 hours? That's R74 an hour.", why: "Always check what your time is earning." },
            ],
          },
          {
            type: "practice",
            id: "hustle-practice",
            problems: [
              { q: "A car wash uses R18 of soap and water per car. You charge R80. You pay R150 a day for your spot and wash 12 cars. What is your profit for the day?", answer: "594", unit: "R", solution: "12 × (R80 − R18) − R150 = 12 × R62 − R150 = **R594**" },
              { q: "Sneaker-cleaning supplies cost R1 120 for 80 cleans. What is the cost per clean?", answer: "14", unit: "R", solution: "R1 120 ÷ 80 = **R14**" },
              { q: "A braiding style takes 4 hours and R160 of hair extensions. You want to earn R80 an hour for your time. What should you charge?", answer: "480", unit: "R", solution: "R160 + 4 × R80 = **R480**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["hustle-profit", "markup"], title: "Hustle maths drill" } },
        ],
      },
      {
        id: "records",
        title: "Records, invoices & tax",
        minutes: 7,
        blocks: [
          {
            type: "sequence",
            id: "hustle-setup",
            title: "Set up your side hustle like an accountant",
            steps: ["Open a separate bank account for the business", "Work out your cost per unit and set prices", "Send a quote before big jobs", "Issue an invoice or receipt for every sale", "Record every rand in and out in a cash book or app", "Work out your profit monthly", "Register with SARS when you earn above the tax threshold"],
            explain: "Separate account = business entity principle. Invoices and receipts = source documents. Cash book = journals. Monthly profit = an Income Statement. You already know this from Grade 10!",
          },
          {
            type: "table",
            headers: ["Invoice must show", "Example"],
            rows: [
              ["Your business name & contact details", "Bongani's Car Spa, 082 000 0000"],
              ["Invoice number and date", "INV-0042, 14 March"],
              ["Customer's name", "Mrs Naidoo"],
              ["What was done and the price", "Full valet, 1 × R250"],
              ["Total and payment details", "R250 – pay by EFT to FNB acc. …"],
              ["VAT number (only if VAT-registered)", "Not registered – no VAT charged"],
            ],
          },
          { type: "callout", variant: "life", md: "Side-hustle income is **taxable**. If you earn more than the tax threshold (R95 750 a year under 65) from all sources, you must declare it to SARS. Keep receipts for business expenses – you only pay tax on **profit**, not on sales." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Know your cost per unit before you set a price.", "Separate business and personal money.", "Every sale gets a receipt or invoice; every rand goes in the cash book.", "Profit ≠ cash. Side-hustle profit is taxable."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "hustle-quiz",
            questions: [
              { q: "Why open a separate bank account for your hustle?", options: ["It's more expensive", "To see exactly what the business earns and spends", "SARS forbids one account", "To avoid tax"], answer: 1, explain: "Business entity principle – clean records." },
              { q: "A quote is given…", options: ["after the job", "before the customer agrees to the job", "only to SARS", "to the bank"], answer: 1, explain: "Quote first, invoice after." },
              { q: "Unsold cupcakes you throw away are…", options: ["an asset", "a cost that reduces profit (wastage)", "income", "capital"], answer: 1, explain: "Perishable stock that isn't sold is lost money." },
              { q: "Tax on a side hustle is paid on…", options: ["total sales", "profit (income − business expenses)", "the number of customers", "nothing – it's always tax-free"], answer: 1, explain: "Keep receipts to prove your expenses." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Payslip
  {
    slug: "first-payslip",
    topic: "life-payslip",
    order: 1,
    title: "Your first job & your first payslip",
    tagline: "Gross vs net, PAYE, UIF – and your rights at work.",
    emoji: "💵",
    caps: "Money Life · links to CAPS Gr 10 salaries and wages. Reading a payslip, PAYE, UIF and benefits, employment contracts, the BCEA, IRP5 certificates.",
    objectives: ["Read every line of a payslip", "Explain how PAYE is worked out", "Know your basic rights under the BCEA", "Explain what an IRP5 is and why you need it"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 70,
    terms: [
      { term: "Employment contract", def: "A written agreement setting out your job, pay, hours, leave and notice period." },
      { term: "BCEA", def: "Basic Conditions of Employment Act: sets minimum rules for working hours, overtime, leave and notice." },
      { term: "IRP5", def: "The tax certificate your employer gives you after each tax year, showing your income and the PAYE paid. You need it to file your tax return." },
      { term: "13th cheque", def: "An extra month's salary paid once a year (usually December) – only if your contract says so. It is taxed." },
      { term: "Fringe benefit", def: "A non-cash benefit from your employer (e.g. a company car or cellphone) – it is taxable." },
      { term: "National Minimum Wage", def: "The lowest hourly wage an employer may legally pay – it is updated every year." },
    ],
    chunks: [
      {
        id: "lab",
        title: "Build your payslip",
        minutes: 9,
        blocks: [
          { type: "callout", variant: "life", md: "Priya is offered a job: \"R20 000 a month\". She is excited – until her first payslip shows **R15 900** in her bank. Nobody lied: R20 000 is **gross**, R15 900 is **net**. Always ask about both." },
          { type: "widget", widget: "payslip-lab", props: { name: "P. Govender", employer: "Mzansi Tech (Pty) Ltd" } },
        ],
      },
      {
        id: "rights",
        title: "Your rights at work",
        minutes: 6,
        blocks: [
          {
            type: "table",
            headers: ["BCEA rule (basic)", "What it means for you"],
            rows: [
              ["Max 45 ordinary hours a week", "More than that is overtime"],
              ["Overtime at 1,5× (Sundays and public holidays more)", "Check it's on your payslip"],
              ["21 consecutive days' annual leave a year (about 15 working days)", "Paid holidays"],
              ["Sick leave: 30 days in a 3-year cycle", "With a doctor's note for longer absences"],
              ["Payslip with every payment", "You have a right to see the deductions"],
            ],
          },
          { type: "callout", variant: "tip", md: "If you lose your job, you can claim **UIF** from the Department of Employment and Labour (online via uFiling). That only works if your employer actually paid it over – so check your payslip!" },
        ],
      },
      {
        id: "practice",
        title: "Practise",
        minutes: 6,
        blocks: [
          {
            type: "practice",
            id: "payslip-practice",
            problems: [
              { q: "Gross salary R16 000. Deductions: PAYE R1 410, UIF R160, pension R1 200, medical aid R1 650. Calculate net pay.", answer: "11580", unit: "R", solution: "R16 000 − R4 420 = **R11 580**" },
              { q: "What is the maximum monthly UIF deduction from an employee (1% of R17 712)?", answer: "177.12", unit: "R", solution: "1% × R17 712 = **R177,12**" },
              { q: "You earn R95 per hour. Overtime is at 1,5×. How much do you earn for 6 hours of overtime?", answer: "855", unit: "R", solution: "6 × R95 × 1,5 = **R855**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["salaries"], title: "Payslip drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Gross − deductions = net.", "PAYE is your income tax paid monthly; UIF protects you if you lose your job.", "Keep your payslips, contract and IRP5.", "Know your BCEA rights: hours, overtime, leave."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "payslip-quiz",
            questions: [
              { q: "The document you need from your employer to file your tax return is the…", options: ["IRP5", "ID", "bank statement", "CV"], answer: 0, explain: "It shows your income and PAYE for the tax year." },
              { q: "A job ad says R18 000 per month. That is usually…", options: ["net pay", "gross pay", "PAYE", "UIF"], answer: 1, explain: "Advertised salaries are before deductions." },
              { q: "A company cellphone you may use privately is a…", options: ["fringe benefit (taxable)", "deduction", "gift with no tax", "loan"], answer: 0, explain: "Fringe benefits are taxable." },
              { q: "Under the BCEA, ordinary working hours are at most…", options: ["35 a week", "45 a week", "60 a week", "unlimited"], answer: 1, explain: "45 ordinary hours a week." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Credit
  {
    slug: "credit-debt-interest",
    topic: "life-credit",
    order: 1,
    title: "Credit, debt & interest: don't get trapped",
    tagline: "Credit can build your future or eat it. Learn the difference.",
    emoji: "🪤",
    caps: "Money Life · links to CAPS liabilities, interest expense and the debt-equity ratio. Interest, credit scores, store cards, loans, buy-now-pay-later, mashonisas and the National Credit Act.",
    objectives: ["Calculate the total cost of buying on credit", "Explain how interest compounds on debt", "Describe how a credit score works", "Know your rights under the National Credit Act"],
    styles: ["kinaesthetic", "visual"],
    xp: 80,
    terms: [
      { term: "Interest", def: "The price of borrowing money, usually a % per year of the amount owed." },
      { term: "Credit score", def: "A number from a credit bureau showing how reliably you repay debt. Lenders use it to decide whether to lend to you and at what rate." },
      { term: "Credit bureau", def: "A company (e.g. TransUnion, Experian) that keeps records of people's credit. You may get a free credit report once a year." },
      { term: "National Credit Act (NCA)", def: "The law that protects borrowers: lenders must check affordability, explain costs and may not charge more than the legal maximums." },
      { term: "Debt review", def: "A legal process where a debt counsellor restructures your debts into one affordable payment." },
      { term: "Mashonisa", def: "An informal, unregistered moneylender – often charging extreme interest and keeping your ID or bank card illegally." },
      { term: "Good debt vs bad debt", def: "Good debt helps you build value (e.g. a reasonable study loan or home loan). Bad debt pays for things that lose value or are consumed (clothes, takeaways)." },
    ],
    chunks: [
      {
        id: "lab",
        title: "What credit really costs",
        minutes: 9,
        blocks: [
          { type: "callout", variant: "life", md: "\"Only R299 × 24 months!\" sounds cheap for a R4 500 phone. But R299 × 24 = **R7 176**. You'd pay **R2 676 extra** – 59% more – for not waiting." },
          { type: "widget", widget: "loan-lab" },
          { type: "widget", widget: "loan-lab", props: { mode: "card", title: "The minimum-payment trap" } },
        ],
      },
      {
        id: "score",
        title: "Your credit score",
        minutes: 6,
        blocks: [
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "credit-score", title: "Helps or hurts your credit score?", buckets: ["Helps 📈", "Hurts 📉"], colour: "var(--t-life)",
              items: [
                { text: "Paying every account on time", bucket: "Helps 📈" }, { text: "Missing a store-card payment", bucket: "Hurts 📉" },
                { text: "Using only 20% of your credit limit", bucket: "Helps 📈" }, { text: "Applying for 5 store cards in one month", bucket: "Hurts 📉" },
                { text: "A long history of well-managed credit", bucket: "Helps 📈" }, { text: "A judgment against you for unpaid debt", bucket: "Hurts 📉" },
              ],
            },
          },
          { type: "callout", variant: "safety", md: "A **mashonisa** who keeps your bank card and ID is acting illegally. If you're drowning in debt, speak to a registered **debt counsellor** (check with the National Credit Regulator) – not another lender." },
        ],
      },
      {
        id: "practice",
        title: "Practise",
        minutes: 6,
        blocks: [
          {
            type: "practice",
            id: "credit-practice",
            problems: [
              { q: "A TV costs R6 000 cash or R390 a month for 24 months. How much extra do you pay on credit?", answer: "3360", unit: "R", solution: "R390 × 24 = R9 360. R9 360 − R6 000 = **R3 360**" },
              { q: m`You owe R5 000 at 24% per year, compounded monthly (2% a month). You pay nothing for 3 months. How much do you owe? Use $A = P(1 + i)^n$.`, answer: "5306.04", unit: "R", tol: 0.6, solution: m`$A = 5\,000(1{,}02)^3 = 5\,306{,}04$ → **R5 306,04**` },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["loan-cost"], title: "Cost-of-credit drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Total cost of credit = all repayments − cash price.", "Minimum payments keep you in debt for years.", "Pay on time and use little of your limit to build a good score.", "The NCA protects you; use registered lenders and debt counsellors."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "credit-quiz",
            questions: [
              { q: "Which usually hurts your credit score?", options: ["Paying on time", "Missing payments", "Checking your own report", "Saving money"], answer: 1, explain: "Missed payments are recorded at the credit bureaus." },
              { q: "Paying only the minimum on a credit card…", options: ["clears the debt quickly", "keeps you paying interest for years", "is free", "improves your score most"], answer: 1, explain: "Most of the payment is interest." },
              { q: "Under the NCA, a lender must…", options: ["lend to anyone", "check that you can afford the repayments", "keep your ID", "charge any interest it likes"], answer: 1, explain: "Reckless lending is illegal." },
              { q: "Which is generally 'good debt'?", options: ["Store card for clothes", "Payday loan for a party", "A reasonable study loan for a qualification", "Buy-now-pay-later for takeaways"], answer: 2, explain: "It can increase your future income." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Saving & investing
  {
    slug: "saving-investing",
    topic: "life-saving",
    order: 1,
    title: "Saving & investing: make money work for you",
    tagline: "Compound interest is the closest thing to magic in accounting.",
    emoji: "🌱",
    caps: "Money Life · links to CAPS interest income, fixed deposits, shares and returns. Emergency funds, compound growth, inflation, tax-free savings accounts, unit trusts, ETFs, stokvels, risk and return.",
    objectives: ["Explain compound interest and the effect of time", "Explain inflation and real returns", "Compare savings and investment options in South Africa", "Match risk to your goals and time frame"],
    styles: ["visual", "kinaesthetic"],
    xp: 80,
    terms: [
      { term: "Compound interest", def: m`Interest earned on interest: $A = P(1 + i)^n$.` },
      { term: "Inflation", def: "The general rise in prices over time – it shrinks what your money can buy." },
      { term: "Real return", def: "Your investment return minus inflation." },
      { term: "Tax-free savings account (TFSA)", def: "A savings or investment account where growth is tax-free: up to R36 000 a year and R500 000 in your lifetime." },
      { term: "Unit trust", def: "A fund that pools many people's money and invests it in shares, bonds or cash, managed by professionals." },
      { term: "ETF", def: "Exchange-traded fund: a low-cost fund that tracks an index (like the JSE Top 40) and trades on the stock exchange." },
      { term: "Stokvel", def: "A savings club where members contribute regularly and take turns to receive the pot, or buy groceries in bulk together." },
      { term: "Rule of 72", def: "72 ÷ interest rate ≈ the number of years it takes for money to double." },
    ],
    chunks: [
      {
        id: "lab",
        title: "Watch money grow",
        minutes: 9,
        blocks: [
          { type: "callout", variant: "life", md: "Naledi saves R500 a month from age 20. Sipho starts at 30 and saves R1 000 a month. At 8% growth, who has more at 60? Try it below with the **start now vs later** tab – the answer surprises everyone." },
          { type: "widget", widget: "compound-lab" },
          { type: "widget", widget: "compound-lab", props: { mode: "early", title: "Start now vs start later" } },
        ],
      },
      {
        id: "options",
        title: "Where to put your money",
        minutes: 7,
        blocks: [
          {
            type: "table",
            headers: ["Option", "Risk", "Good for", "Watch out for"],
            rows: [
              ["Savings / notice account", "Very low", "Emergency fund, short-term goals", "Returns often below inflation"],
              ["Fixed deposit", "Low", "Money you won't touch for 1–5 years", "Can't withdraw early"],
              ["TFSA (unit trust or ETF)", "Medium", "Long-term growth, tax-free", "Don't exceed R36 000 a year (40% penalty)"],
              ["Shares / equity ETFs", "Higher (short term)", "10+ years", "Prices go up and down – don't panic-sell"],
              ["Stokvel", "Low–medium", "Discipline, December groceries", "Make sure it's well run; it's not a bank"],
              ["'Forex/crypto mentor' groups", "Extreme", "Nothing", "Most are scams"],
            ],
          },
          {
            type: "practice",
            id: "saving-practice",
            problems: [
              { q: m`You invest R10 000 at 9% per year compounded annually for 8 years. How much do you have? ($A = P(1+i)^n$)`, answer: "19925.63", unit: "R", tol: 0.6, solution: m`$10\,000(1{,}09)^8 = 19\,925{,}63$ → **R19 925,63** – it almost doubled.` },
              { q: "Use the rule of 72: roughly how many years does money take to double at 12%?", answer: "6", unit: "years", tol: 0.01, solution: "72 ÷ 12 = **6 years**" },
              { q: "Your savings earn 4% while inflation is 5,5%. What is your real return (%)? Use a minus sign if negative.", answer: "-1.5", unit: "%", solution: "4% − 5,5% = **−1,5%** – your money is losing buying power." },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["compound", "inflation"], title: "Growth & inflation drill" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Time is your biggest advantage: start early.", "Beat inflation or your money shrinks.", "Emergency fund first, then long-term investing (e.g. a TFSA).", "Higher return = higher risk; guaranteed huge returns = scam."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "saving-quiz",
            questions: [
              { q: "The annual TFSA contribution limit is…", options: ["R10 000", "R36 000", "R100 000", "unlimited"], answer: 1, explain: "R36 000 a year, R500 000 lifetime." },
              { q: "Inflation of 6% means…", options: ["your money buys 6% more", "prices rise about 6% a year", "your bank pays 6%", "tax goes up 6%"], answer: 1, explain: "Prices rise, buying power falls." },
              { q: "Money for a car repair next month should be in…", options: ["shares", "an easy-access savings account", "crypto", "a 5-year fixed deposit"], answer: 1, explain: "Short-term money needs low risk and easy access." },
              { q: "Using the rule of 72, money doubles at 8% in about…", options: ["4 years", "9 years", "18 years", "72 years"], answer: 1, explain: "72 ÷ 8 = 9." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Taxes
  {
    slug: "doing-your-taxes",
    topic: "life-tax",
    order: 1,
    title: "How to do your own taxes (SARS eFiling, step by step)",
    tagline: "Tax season doesn't have to be scary. Here's exactly what to do.",
    emoji: "🧮",
    caps: "Money Life · links to CAPS Gr 10 salaries (PAYE) and VAT. Who must file, tax numbers, tax brackets, rebates and medical credits, deductions, the ITR12 on eFiling, assessments, refunds and deadlines.",
    objectives: ["Work out your income tax using the SARS tables", "Explain marginal and effective tax rates", "List the documents needed to file", "Follow the eFiling steps and read your assessment"],
    styles: ["kinaesthetic", "visual", "read-write"],
    xp: 100,
    terms: [
      { term: "Tax year", def: "In South Africa: 1 March to the end of February the next year." },
      { term: "Tax reference number", def: "Your personal number with SARS – you get it when you register (often automatically when you start work)." },
      { term: "ITR12", def: "The income tax return that individuals complete on eFiling or the SARS MobiApp." },
      { term: "Auto-assessment", def: "SARS pre-fills and assesses many people's returns automatically. You must check it and edit it if something is missing." },
      { term: "ITA34", def: "Your notice of assessment – it shows the tax calculated and whether you get a refund or owe SARS." },
      { term: "Tax rebate", def: "An amount subtracted from your tax. Everyone gets the primary rebate (R17 235 in 2025/26)." },
      { term: "Marginal tax rate", def: "The rate on your NEXT rand of income (your highest bracket)." },
      { term: "Effective tax rate", def: "Total tax ÷ total income – the average rate you actually pay." },
      { term: "Medical tax credit", def: "A monthly credit (R364 for you, R364 for the first dependant, R246 each for others) that reduces your tax if you pay medical aid." },
    ],
    chunks: [
      {
        id: "how",
        title: "How income tax works",
        minutes: 8,
        blocks: [
          { type: "callout", variant: "life", md: "Tax brackets confuse people: \"If I get a raise into the 31% bracket, all my income is taxed at 31%!\" **False.** Only the rands **above** each line are taxed at the higher rate. A raise always leaves you better off." },
          {
            type: "worked",
            title: "Tax on R300 000 (under 65, 2025/26 tables)",
            problem: "Taxable income R300 000. Bracket: R237 101 – R370 500 → R42 678 + 26% of the amount above R237 100.",
            steps: [
              { md: "Amount above R237 100 = R300 000 − R237 100 = R62 900" },
              { md: "Tax = R42 678 + 26% × R62 900 = R42 678 + R16 354 = **R59 032**" },
              { md: "Less primary rebate R17 235 → tax payable = **R41 797** for the year", why: "Everyone gets the primary rebate." },
              { md: "Effective rate = R41 797 ÷ R300 000 = **13,9%**; marginal rate = **26%**", why: "You pay 13,9% on average, even though your top rand is taxed at 26%." },
            ],
          },
          { type: "widget", widget: "tax-calculator" },
        ],
      },
      {
        id: "efiling",
        title: "Filing on eFiling",
        minutes: 8,
        blocks: [
          {
            type: "sequence",
            id: "efiling-steps",
            title: "Put the eFiling steps in order",
            steps: ["Register on SARS eFiling (or the SARS MobiApp) with your ID and tax number", "Collect your documents: IRP5, medical aid certificate, RA certificate, IT3(b) interest certificate", "Open your ITR12 for the right tax year (check the auto-assessment if you got one)", "Check that the pre-filled IRP5 figures match your documents", "Add anything missing: other income, medical expenses, RA contributions", "Submit and read your ITA34 assessment", "Get your refund – or pay what you owe by the due date"],
            explain: "Filing season for most employees runs roughly from July to October – SARS announces the exact dates every year. Keep your documents for 5 years in case SARS asks to verify.",
          },
          {
            type: "table",
            headers: ["Document", "From", "What it proves"],
            rows: [
              ["IRP5 / IT3(a)", "Your employer", "Salary earned and PAYE already paid"],
              ["Medical scheme tax certificate", "Your medical aid", "Contributions → medical tax credits"],
              ["Retirement annuity certificate", "Your RA provider", "Deductible retirement contributions"],
              ["IT3(b)", "Your bank", "Interest earned (first R23 800 is exempt if under 65)"],
              ["Logbook", "You", "Business travel if you get a travel allowance"],
            ],
          },
          { type: "callout", variant: "safety", md: "SARS will never email you a link asking for your banking details or eFiling password. Always log in by typing **sarsefiling.co.za** yourself. Tax scams peak during filing season." },
        ],
      },
      {
        id: "practice",
        title: "Practise",
        minutes: 7,
        blocks: [
          {
            type: "practice",
            id: "tax-practice",
            problems: [
              { q: "Use the 2025/26 table: taxable income R200 000 (bracket 1: 18%), under 65. Calculate tax payable after the primary rebate (R17 235).", answer: "18765", unit: "R", solution: "18% × R200 000 = R36 000. R36 000 − R17 235 = **R18 765**" },
              { q: "Your employer deducted PAYE of R21 000 during the year. Your assessment shows tax of R18 765. Refund or owe? Type the refund amount.", answer: "2235", unit: "R", solution: "R21 000 − R18 765 = **R2 235 refund**" },
              { q: "You and 2 children are on your medical aid for the full year. Calculate your medical tax credit for the year (R364 + R364 + R246 per month).", answer: "11688", unit: "R", solution: "(R364 + R364 + R246) × 12 = R974 × 12 = **R11 688**" },
              { q: "Total tax R41 797 on income R300 000. Calculate the effective tax rate (%, one decimal).", answer: "13.9", unit: "%", tol: 0.06, solution: "R41 797 ÷ R300 000 × 100 = **13,9%**" },
            ],
          },
          { type: "widget", widget: "drill", props: { generators: ["income-tax"], title: "Income tax drill" } },
          { type: "widget", widget: "formula-sheet", props: { tab: "tax", title: "SARS tables (reference)" } },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 5,
        blocks: [
          { type: "keypoints", points: ["Tax year: 1 March – end of February.", "Tax = bracket calculation − rebates − medical credits.", "Your top bracket is your marginal rate; your average is the effective rate.", "Docs: IRP5, medical, RA, interest certificates. File on eFiling/MobiApp; check auto-assessments."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "tax-quiz",
            questions: [
              { q: "The South African tax year runs from…", options: ["1 January to 31 December", "1 March to the end of February", "1 April to 31 March", "1 July to 30 June"], answer: 1, explain: "March to February." },
              { q: "Getting a raise into a higher bracket means…", options: ["all your income is taxed at the higher rate", "only the income above the bracket line is taxed at the higher rate", "you pay less tax in total", "you lose your rebate"], answer: 1, explain: "That's how marginal rates work." },
              { q: "Which document shows the PAYE your employer paid for you?", options: ["ITA34", "IRP5", "VAT201", "Payslip only"], answer: 1, explain: "The IRP5 summarises the tax year." },
              { q: "SARS sends an email with a link asking for your banking details. You…", options: ["click it quickly", "ignore it and log in to eFiling yourself", "reply with your PIN", "forward it to friends"], answer: 1, explain: "Phishing – never click." },
              { q: "Paying into a retirement annuity…", options: ["increases your tax", "reduces your taxable income (within limits)", "has no tax effect", "is illegal"], answer: 1, explain: "Deductible up to 27,5% of income, max R350 000 a year." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Taxes 2
  {
    slug: "tax-for-hustlers",
    topic: "life-tax",
    order: 2,
    title: "Tax for side hustlers, freelancers & small businesses",
    tagline: "Earning outside a payslip? Here is how SARS sees it – and how to stay on the right side.",
    emoji: "🧾",
    caps: "Money Life · links to CAPS Gr 10 & 12 VAT, Gr 12 company tax and the business entity principle. Taxable income from a business, deductible expenses, provisional tax, turnover tax, VAT registration and record keeping.",
    objectives: ["Work out taxable income from a side hustle", "Explain which expenses are deductible", "Explain provisional tax and turnover tax", "Decide when VAT registration is needed"],
    styles: ["read-write", "kinaesthetic"],
    xp: 80,
    terms: [
      { term: "Taxable income (business)", def: "Business income minus expenses incurred to earn that income." },
      { term: "Deductible expense", def: "A cost spent in the production of business income, e.g. stock, data used for the business, transport to clients." },
      { term: "IRP6", def: "The provisional tax return: paid in August and February for income not taxed through PAYE." },
      { term: "Turnover tax", def: "A simple tax on turnover (not profit) for micro businesses with turnover up to R1 million a year." },
      { term: "Record keeping", def: "SARS requires you to keep invoices, receipts and bank statements for 5 years." },
    ],
    chunks: [
      {
        id: "income",
        title: "From hustle profit to taxable income",
        minutes: 7,
        blocks: [
          { type: "callout", variant: "life", md: "Fatima earns a salary of R180 000 a year AND braids hair on weekends: R60 000 income, R18 000 on hair extensions and products, R4 000 on transport to clients. SARS taxes her on **all** her income – but only on her hustle's **profit**." },
          {
            type: "worked",
            title: "Fatima's taxable income",
            problem: "Salary R180 000. Braiding income R60 000; expenses R22 000 (all for the business). Under 65, no medical aid.",
            steps: [
              { md: "Braiding profit = R60 000 − R22 000 = **R38 000**", why: "Only business expenses are deductible – not her personal clothes or groceries." },
              { md: "Taxable income = R180 000 + R38 000 = **R218 000**" },
              { md: "Tax = 18% × R218 000 = R39 240 − R17 235 rebate = **R22 005**", why: "All of it is still in the first bracket (up to R237 100)." },
              { md: "Her employer only deducted PAYE on R180 000, so she will owe SARS the extra – unless she pays **provisional tax** during the year." },
            ],
          },
          { type: "widget", widget: "tax-calculator" },
        ],
      },
      {
        id: "rules",
        title: "Provisional tax, turnover tax & VAT",
        minutes: 7,
        blocks: [
          {
            type: "table",
            headers: ["Situation", "What to do"],
            rows: [
              ["Side income of more than R30 000 a year (not taxed via PAYE)", "Register as a provisional taxpayer: pay estimates in August and February (IRP6)"],
              ["Micro business, turnover up to R1 million", "You MAY choose turnover tax – a simple % of turnover, fewer records"],
              ["Taxable supplies above the compulsory VAT threshold in 12 months", "You MUST register for VAT (check SARS for the current threshold); voluntary registration is possible from R50 000"],
              ["Registering a company (Pty) Ltd at CIPC", "The company pays 27% tax; you pay tax on the salary or dividends you take"],
            ],
          },
          {
            type: "widget",
            widget: "sorter",
            props: {
              id: "deductible-sorter", title: "Deductible for a hairstylist's side hustle?", buckets: ["Deductible", "Not deductible"], colour: "var(--t-tax)",
              items: [
                { text: "Hair extensions used on clients", bucket: "Deductible" }, { text: "Her own groceries", bucket: "Not deductible" },
                { text: "Transport to clients' homes", bucket: "Deductible" }, { text: "Advertising on social media", bucket: "Deductible" },
                { text: "A holiday to Cape Town", bucket: "Not deductible" }, { text: "Her personal Netflix subscription", bucket: "Not deductible" },
              ],
            },
          },
          {
            type: "practice",
            id: "hustle-tax-practice",
            problems: [
              { q: "A car-wash hustle earns R84 000 and spends R31 500 on soap, water and the stall. Calculate its taxable profit.", answer: "52500", unit: "R", solution: "R84 000 − R31 500 = **R52 500**" },
              { q: "Fatima's tax for the year is R22 005. Her employer deducted PAYE of R15 165. How much must she still pay SARS?", answer: "6840", unit: "R", solution: "R22 005 − R15 165 = **R6 840**" },
            ],
          },
          { type: "callout", variant: "safety", md: "Not declaring side-hustle income is tax evasion. SARS gets data from banks, payment platforms and other sources. It is much cheaper to declare and keep good records than to pay penalties and interest later." },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Tax is on business profit: income − business expenses.", "Keep every receipt and invoice for 5 years.", "Side income not taxed via PAYE → provisional tax (August and February).", "Micro businesses can choose turnover tax; VAT registration becomes compulsory above the SARS threshold."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "hustle-tax-quiz",
            questions: [
              { q: "Which expense can a freelance designer deduct?", options: ["Her own rent at home (all of it)", "Design software used for clients", "Clothes for a party", "Groceries"], answer: 1, explain: "It is incurred to earn the business income." },
              { q: "Provisional tax is paid…", options: ["every day", "twice a year (August and February)", "only when you retire", "never by individuals"], answer: 1, explain: "IRP6 payments in August and February, with an optional top-up." },
              { q: "Turnover tax is calculated on…", options: ["profit", "turnover (total sales)", "assets", "the owner's salary"], answer: 1, explain: "That is what makes it simple." },
              { q: "How long must you keep tax records?", options: ["1 year", "5 years", "1 month", "forever"], answer: 1, explain: "SARS can ask to see them for 5 years." },
            ],
          },
        ],
      },
    ],
  },
  // ------------------------------------------------------------------ Adulting
  {
    slug: "adulting-101",
    topic: "life-adulting",
    order: 1,
    title: "Adulting 101: renting, cars, insurance & retirement",
    tagline: "The big money decisions of your 20s – made like an accountant.",
    emoji: "🏠",
    caps: "Money Life · links to CAPS assets, liabilities, depreciation and budgeting. Renting a flat, buying a car (deposit, balloon payments, running costs), insurance, retirement savings (two-pot system), wills and a first-year-of-work checklist.",
    objectives: ["Work out what rent and a car you can afford", "Explain insurance premiums and excesses", "Explain the two-pot retirement system", "Build a first-year-of-work money checklist"],
    styles: ["kinaesthetic", "read-write", "visual"],
    xp: 80,
    terms: [
      { term: "Lease", def: "A rental contract that sets the rent, deposit, period and rules." },
      { term: "Deposit (rental)", def: "Money held by the landlord (often 1–2 months' rent) in an interest-bearing account; refunded with interest when you leave, minus damages." },
      { term: "Balloon payment", def: "A large lump sum due at the end of a car finance agreement – it makes instalments smaller but the total cost higher." },
      { term: "Premium", def: "The monthly amount you pay for insurance." },
      { term: "Excess", def: "The part of an insurance claim you pay yourself." },
      { term: "Two-pot retirement system", def: "Since 1 September 2024, new retirement contributions are split: one-third to a savings pot (one withdrawal a year, taxed) and two-thirds to a retirement pot (locked until retirement)." },
      { term: "Will", def: "A legal document saying who gets your assets when you die. Without one, the law decides." },
    ],
    chunks: [
      {
        id: "home-car",
        title: "Rent & wheels",
        minutes: 8,
        blocks: [
          { type: "callout", variant: "life", md: "Rule of thumb: keep **rent below about 30%** of your take-home pay, and **all car costs below about 20%**. Your first car is an asset that **depreciates** – just like the vehicles in Grade 11 Accounting." },
          { type: "widget", widget: "depreciation-lab", props: { asset: "Your first car", title: "Your car loses value too" } },
          {
            type: "table",
            headers: ["Car cost", "Monthly (example)"],
            rows: [
              ["Instalment (R200 000 over 72 months at 12%)", "≈ R3 910"],
              ["Comprehensive insurance", "≈ R1 100"],
              ["Fuel (1 000 km a month)", "≈ R1 600"],
              ["Maintenance, tyres & licence (spread out)", "≈ R600"],
              ["Tolls, parking", "≈ R300"],
              ["**Total**", "**≈ R7 510** – not just the instalment!"],
            ],
          },
        ],
      },
      {
        id: "insurance-retirement",
        title: "Insurance & retirement",
        minutes: 7,
        blocks: [
          {
            type: "match",
            id: "insurance-match",
            title: "Match the cover to the risk",
            pairs: [
              { left: "Car insurance", right: "Accident, theft or hail damage to your car" },
              { left: "Household contents", right: "Burglary or fire at home" },
              { left: "Medical aid / gap cover", right: "Hospital bills" },
              { left: "Life cover", right: "Your family's income if you die" },
              { left: "Funeral cover", right: "The cost of a funeral" },
              { left: "Disability cover", right: "Income if you can no longer work" },
            ],
          },
          { type: "text", md: "**Retirement:** if you work for a company with a pension or provident fund, part of your salary already goes there. Under the **two-pot system**, one-third goes into a **savings pot** you may withdraw from once a tax year (minimum R2 000, taxed at your marginal rate), and two-thirds into a **retirement pot** you can't touch until retirement. Withdrawing early is expensive – compound growth is lost forever." },
          { type: "widget", widget: "compound-lab", props: { mode: "early", title: "Why retirement saving starts at your first job" } },
        ],
      },
      {
        id: "practice",
        title: "Practise",
        minutes: 6,
        blocks: [
          {
            type: "practice",
            id: "adulting-practice",
            problems: [
              { q: "Take-home pay R16 500. What is the maximum rent using the 30% rule of thumb?", answer: "4950", unit: "R", solution: "30% × R16 500 = **R4 950**" },
              { q: "Your car is damaged; the repair costs R28 000. Your insurance excess is R5 500. How much does the insurer pay?", answer: "22500", unit: "R", solution: "R28 000 − R5 500 = **R22 500**" },
              { q: "Monthly retirement contribution R1 800. Under the two-pot system, how much goes into the savings pot each month?", answer: "600", unit: "R", solution: "One-third × R1 800 = **R600**" },
            ],
          },
          {
            type: "sequence",
            id: "first-year",
            title: "Your first-year-of-work money checklist",
            steps: ["Check your contract and first payslip (gross, net, UIF)", "Set up a budget and debit orders for savings on payday", "Build an emergency fund", "Join your employer's retirement fund and medical aid (or get gap/hospital cover)", "Open a TFSA for long-term goals", "File your first tax return in tax season", "Write a will"],
            explain: "Each step protects future-you. None of them needs a big salary – just a plan.",
          },
        ],
      },
      {
        id: "check",
        title: "Quick check",
        minutes: 4,
        blocks: [
          { type: "keypoints", points: ["Rent < ~30% of take-home pay; total car costs < ~20%.", "A car depreciates; a balloon payment makes it more expensive overall.", "Insurance: premium every month, excess when you claim.", "Two-pot: one-third accessible (taxed), two-thirds locked for retirement."] },
          { type: "terms" },
          {
            type: "quiz",
            id: "adulting-quiz",
            questions: [
              { q: "A balloon payment on a car loan…", options: ["reduces the total cost", "lowers instalments but increases the total cost", "is paid by the dealer", "is a type of insurance"], answer: 1, explain: "You still owe a big amount at the end – and pay interest on it all along." },
              { q: "The excess on an insurance claim is…", options: ["paid by the insurer", "paid by you", "a refund", "the monthly premium"], answer: 1, explain: "Your share of each claim." },
              { q: "Under the two-pot system, the savings pot gets…", options: ["all contributions", "one-third of new contributions", "two-thirds", "nothing"], answer: 1, explain: "One-third savings, two-thirds retirement." },
              { q: "If you die without a will…", options: ["SARS takes everything", "the law decides who inherits", "your friends decide", "your debts disappear"], answer: 1, explain: "Intestate succession rules apply." },
            ],
          },
        ],
      },
    ],
  },
];
