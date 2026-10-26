/**
 * Problem generators: endless, fresh practice with a full worked solution.
 * Every generator is deterministic for a given seed, so tests can check that
 * each generated memo answer passes its own checker.
 *
 * Money is written SA style in the text (R12 450) and as a plain number in
 * the memo answer (12450). Percentages are rounded to one decimal unless the
 * question says otherwise.
 */
import { seededRandom } from "@/lib/utils";
import { ans, D, P, R, round } from "./numbers";
import { type Generator, int, pick } from "./gen-kit";
import { incomeTax, monthlyPaye, uif } from "./tax";

export type { Generator } from "./gen-kit";

const SHOPS = ["Thandi's Spaza", "Kasi Kicks", "Durban Bunny Co.", "Karoo Crafts", "Soweto Sneaker Lab", "Mama Afrika Catering", "Braai Masters", "Ubuntu Phones", "Joburg Juice Bar", "Cape Surf Supplies"];
const OWNERS = ["Thandi", "Sipho", "Ayesha", "Pieter", "Lerato", "Naledi", "Kagiso", "Zanele", "Ruan", "Fatima", "Bongani", "Priya"];
/** A tidy amount: lo..hi in steps of `step` rands. */
const amt = (r: () => number, lo: number, hi: number, s = 100) => lo + Math.floor(r() * (Math.floor((hi - lo) / s) + 1)) * s;
const PCT_TOL = 0.06;

// ------------------------------------------------------------ Grade 10: the accounting equation
const equationEffect: Generator = {
  id: "equation",
  title: "Accounting equation",
  topic: "g10-equation",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 3);
    const owner = pick(r, OWNERS);
    if (t === 0) {
      const a = amt(r, 50_000, 400_000, 1000);
      const l = amt(r, 10_000, Math.floor(a * 0.6), 1000);
      return {
        q: `${owner}'s business has total assets of ${R(a)} and total liabilities of ${R(l)}. Calculate the owner's equity.`,
        answer: ans(a - l),
        unit: "R",
        hint: "A = OE + L, so OE = A − L.",
        solution: `$$\\text{OE} = \\text{A} - \\text{L}$$\n${R(a)} − ${R(l)} = **${R(a - l)}**`,
      };
    }
    if (t === 1) {
      const oe = amt(r, 40_000, 300_000, 1000);
      const l = amt(r, 5_000, 150_000, 1000);
      return {
        q: `Owner's equity is ${R(oe)} and liabilities are ${R(l)}. What are the total assets?`,
        answer: ans(oe + l),
        unit: "R",
        hint: "A = OE + L",
        solution: `A = OE + L = ${R(oe)} + ${R(l)} = **${R(oe + l)}**`,
      };
    }
    if (t === 2) {
      const a = amt(r, 80_000, 250_000, 1000);
      const l = amt(r, 20_000, 60_000, 1000);
      const sale = amt(r, 2_000, 9_000, 100);
      const markup = pick(r, [25, 50, 60, 100]);
      const cost = round(sale / (1 + markup / 100), 2);
      return {
        q: `Assets are ${R(a)} and liabilities ${R(l)}. The business then sells goods for ${R(sale)} cash (cost price ${R(cost)}, mark-up ${markup}%). What is the owner's equity **after** the sale?`,
        answer: ans(a - l + sale - cost),
        unit: "R",
        hint: "Only the profit on the sale changes owner's equity: selling price − cost price.",
        solution: [
          `OE before: ${R(a)} − ${R(l)} = ${R(a - l)}`,
          `Profit on the sale = ${R(sale)} − ${R(cost)} = ${R(sale - cost)} (income ${R(sale)} up, cost of sales ${R(cost)} down)`,
          `OE after = ${R(a - l)} + ${R(sale - cost)} = **${R(a - l + sale - cost)}**`,
        ].join("\n\n"),
      };
    }
    const a = amt(r, 100_000, 300_000, 1000);
    const l = amt(r, 20_000, 80_000, 1000);
    const draw = amt(r, 500, 8_000, 100);
    return {
      q: `Assets are ${R(a)} and liabilities ${R(l)}. ${owner} (the owner) takes ${R(draw)} cash for personal use. Calculate the owner's equity after this.`,
      answer: ans(a - l - draw),
      unit: "R",
      hint: "Drawings reduce assets (cash) AND owner's equity.",
      solution: `Drawings: assets −${R(draw)}, owner's equity −${R(draw)}.\n\nOE = ${R(a - l)} − ${R(draw)} = **${R(a - l - draw)}**`,
    };
  },
};

const DRCR: { tx: string; dr: string; cr: string }[] = [
  { tx: "The owner deposits capital into the business bank account", dr: "Bank", cr: "Capital" },
  { tx: "Bought stationery and paid by EFT", dr: "Stationery", cr: "Bank" },
  { tx: "Bought trading stock on credit from a supplier", dr: "Trading stock", cr: "Creditors control" },
  { tx: "Paid the monthly rent by EFT", dr: "Rent expense", cr: "Bank" },
  { tx: "Received rent from a tenant (cash deposited)", dr: "Bank", cr: "Rent income" },
  { tx: "The owner took cash for personal use", dr: "Drawings", cr: "Bank" },
  { tx: "Paid wages by EFT", dr: "Wages", cr: "Bank" },
  { tx: "Took a loan from Mzansi Bank", dr: "Bank", cr: "Loan: Mzansi Bank" },
  { tx: "Paid a creditor by EFT", dr: "Creditors control", cr: "Bank" },
  { tx: "Received cash from a debtor", dr: "Bank", cr: "Debtors control" },
  { tx: "Bought equipment on credit", dr: "Equipment", cr: "Creditors control" },
  { tx: "Paid the electricity account", dr: "Water and electricity", cr: "Bank" },
  { tx: "Received interest on the current bank account", dr: "Bank", cr: "Interest income" },
  { tx: "Paid the advertising account by EFT", dr: "Advertising", cr: "Bank" },
  { tx: "Donated trading stock to a school (at cost)", dr: "Donations", cr: "Trading stock" },
];

const debitCredit: Generator = {
  id: "debit-credit",
  title: "Which account is debited?",
  topic: "g10-ledger",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const d = pick(r, DRCR);
    const askDr = r() < 0.6;
    const norm = (s: string) => s.replace(/:.*/, "");
    return {
      q: `**${d.tx}.** Which account is **${askDr ? "debited" : "credited"}** in the General Ledger?`,
      answer: askDr ? `${d.dr} | ${norm(d.dr)}` : `${d.cr} | ${norm(d.cr)}`,
      kind: "text",
      hint: "Ask: which account increases or decreases? Assets & expenses increase on the debit side; liabilities, equity and income increase on the credit side.",
      solution: `Debit **${d.dr}**, credit **${d.cr}**.\n\nEvery transaction has a debit and a credit for the same amount – that is double entry.`,
    };
  },
};

const trialBalance: Generator = {
  id: "trial-balance",
  title: "Trial Balance missing figure",
  topic: "g10-ledger",
  make(seed) {
    const r = seededRandom(seed);
    const loan = amt(r, 20_000, 120_000, 1000);
    const creditors = amt(r, 5_000, 40_000, 100);
    const sales = amt(r, 200_000, 600_000, 1000);
    const drawings = amt(r, 10_000, 40_000, 100);
    const equipment = amt(r, 40_000, 150_000, 1000);
    const debtors = amt(r, 10_000, 50_000, 100);
    const stock = amt(r, 30_000, 90_000, 1000);
    const cos = round(sales / pick(r, [1.5, 1.6, 2]), 0);
    const expenses = amt(r, 30_000, 90_000, 100);
    const bankFinal = amt(r, 2_000, 60_000, 10);
    const others = drawings + equipment + debtors + stock + cos + expenses;
    // Capital is the balancing figure (at least R80 000), so the bank balance is always favourable.
    const vehicles = Math.max(amt(r, 80_000, 250_000, 1000), Math.ceil((80_000 + loan + creditors + sales - others - bankFinal) / 1000) * 1000);
    const debitsKnown = others + vehicles;
    const capital = debitsKnown + bankFinal - loan - creditors - sales;
    const credits = capital + loan + creditors + sales;
    const rows = [["Capital", "", R(capital)], ["Drawings", R(drawings), ""], ["Equipment", R(equipment), ""], ["Vehicles", R(vehicles), ""], ["Trading stock", R(stock), ""], ["Debtors control", R(debtors), ""], ["Bank", "?", ""], ["Loan: Mzansi Bank", "", R(loan)], ["Creditors control", "", R(creditors)], ["Sales", "", R(sales)], ["Cost of sales", R(cos), ""], ["Sundry expenses", R(expenses), ""]];
    const table = `| Account | Debit | Credit |\n|---|---:|---:|\n${rows.map((x) => `| ${x.join(" | ")} |`).join("\n")}`;
    return {
      q: `The bookkeeper lost the Bank balance (a favourable, debit balance). Use the Trial Balance to find it.\n\n${table}`,
      answer: ans(bankFinal),
      unit: "R",
      hint: "Total debits must equal total credits. Add up the credits, then subtract every known debit.",
      solution: `Total credits = ${R(credits)}\n\nKnown debits = ${R(debitsKnown)}\n\nBank = ${R(credits)} − ${R(debitsKnown)} = **${R(bankFinal)}**`,
    };
  },
};

// ------------------------------------------------------------ Grade 10: cost price, mark-up, profit
const markup: Generator = {
  id: "markup",
  title: "Mark-up & gross profit",
  topic: "g10-cost",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 3);
    const item = pick(r, ["a pair of sneakers", "a phone cover", "a school bag", "a bunny chow", "a braai pack", "a hoodie", "a cake", "a smartwatch"]);
    const cost = amt(r, 40, 900, 10);
    const mu = pick(r, [20, 25, 40, 50, 60, 75, 80, 100]);
    const sell = round(cost * (1 + mu / 100), 2);
    if (t === 0) {
      return {
        q: `A business buys ${item} for ${R(cost)} and adds a mark-up of ${mu}% on cost. Calculate the selling price.`,
        answer: ans(sell),
        unit: "R",
        hint: `Selling price = cost × (100 + ${mu})/100`,
        solution: `${R(cost)} × ${100 + mu}/100 = **${R(sell)}**`,
      };
    }
    if (t === 1) {
      return {
        q: `${item[0].toUpperCase()}${item.slice(1)} costs ${R(cost)} and sells for ${R(sell)}. Calculate the mark-up percentage on cost.`,
        answer: ans(mu, 1),
        unit: "%",
        tol: PCT_TOL,
        hint: "Mark-up % = gross profit ÷ cost price × 100",
        solution: `Gross profit = ${R(sell)} − ${R(cost)} = ${R(sell - cost)}\n\n$$\\text{Mark-up \\%} = \\frac{${D(sell - cost)}}{${D(cost)}} \\times 100 = ${mu}\\%$$`,
      };
    }
    if (t === 2) {
      const sales = amt(r, 50_000, 500_000, 1000);
      const gp = round(sales - sales / (1 + mu / 100), 2);
      return {
        q: `Sales for the year were ${R(sales)}. The business uses a fixed mark-up of ${mu}% on cost. Calculate the **cost of sales**.`,
        answer: ans(sales - gp),
        unit: "R",
        hint: `Sales = cost × ${100 + mu}/100, so cost = sales × 100/${100 + mu}.`,
        solution: `Cost of sales = ${R(sales)} × 100/${100 + mu} = **${R(sales - gp)}**\n\n(Gross profit = ${R(gp)})`,
      };
    }
    const qty = int(r, 20, 200);
    return {
      q: `A stall buys ${qty} units of ${item} at ${R(cost)} each and sells all of them at ${R(sell)} each. Calculate the gross profit.`,
      answer: ans(qty * (sell - cost)),
      unit: "R",
      hint: "Gross profit = sales − cost of sales",
      solution: `Sales = ${qty} × ${R(sell)} = ${R(qty * sell)}\n\nCost of sales = ${qty} × ${R(cost)} = ${R(qty * cost)}\n\nGross profit = **${R(qty * (sell - cost))}**`,
    };
  },
};

// ------------------------------------------------------------ VAT
const vat: Generator = {
  id: "vat",
  title: "VAT calculations",
  topic: "g10-vat",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 3);
    if (t === 0) {
      const excl = amt(r, 100, 20_000, 10);
      return {
        q: `Goods cost ${R(excl)} **excluding** VAT. Calculate the VAT-inclusive price (VAT = 15%).`,
        answer: ans(excl * 1.15),
        unit: "R",
        hint: "Inclusive = exclusive × 115/100",
        solution: `${R(excl)} × 115/100 = **${R(excl * 1.15)}**`,
      };
    }
    if (t === 1) {
      const incl = amt(r, 115, 23_000, 115);
      return {
        q: `A till slip shows ${R(incl)} **including** VAT. How much of that is VAT?`,
        answer: ans((incl * 15) / 115),
        unit: "R",
        hint: "VAT in an inclusive amount = inclusive × 15/115",
        solution: `${R(incl)} × 15/115 = **${R((incl * 15) / 115)}**`,
      };
    }
    if (t === 2) {
      const sales = amt(r, 100_000, 600_000, 1000);
      const purchases = amt(r, 40_000, Math.floor(sales * 0.8), 1000);
      const out = sales * 0.15;
      const inn = purchases * 0.15;
      return {
        q: `For a VAT period a business had sales of ${R(sales)} and purchases of ${R(purchases)} (both **excluding** VAT, all standard-rated). Calculate the VAT payable to SARS.`,
        answer: ans(out - inn),
        unit: "R",
        hint: "VAT payable = output VAT (on sales) − input VAT (on purchases)",
        solution: `Output VAT = ${R(sales)} × 15% = ${R(out)}\n\nInput VAT = ${R(purchases)} × 15% = ${R(inn)}\n\nPayable to SARS = **${R(out - inn)}**`,
      };
    }
    const outIncl = amt(r, 115_000, 690_000, 1150);
    const inIncl = amt(r, 23_000, Math.floor(outIncl * 0.7), 1150);
    const v = ((outIncl - inIncl) * 15) / 115;
    return {
      q: `Sales were ${R(outIncl)} and purchases ${R(inIncl)}, both **including** VAT. Calculate the amount payable to SARS.`,
      answer: ans(v),
      unit: "R",
      hint: "Find the VAT in each inclusive amount (× 15/115), then output − input.",
      solution: `Output VAT = ${R(outIncl)} × 15/115 = ${R((outIncl * 15) / 115)}\n\nInput VAT = ${R(inIncl)} × 15/115 = ${R((inIncl * 15) / 115)}\n\nPayable = **${R(v)}**`,
    };
  },
};

// ------------------------------------------------------------ Salaries & wages
const salaries: Generator = {
  id: "salaries",
  title: "Gross & net salary",
  topic: "g10-salaries",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 2);
    const name = pick(r, OWNERS);
    if (t === 0) {
      const rate = amt(r, 30, 120, 5);
      const normal = pick(r, [40, 45]);
      const ot = int(r, 2, 12);
      const factor = pick(r, [1.5, 2]);
      const gross = rate * normal + rate * factor * ot;
      return {
        q: `${name} earns ${R(rate)} per hour for a ${normal}-hour week. Overtime is paid at ${D(factor, 1)} times the normal rate. This week ${name} worked ${normal + ot} hours. Calculate the gross wage.`,
        answer: ans(gross),
        unit: "R",
        hint: "Normal hours × rate, plus overtime hours × rate × the overtime factor.",
        solution: `Normal: ${normal} × ${R(rate)} = ${R(rate * normal)}\n\nOvertime: ${ot} × ${R(rate)} × ${D(factor, 1)} = ${R(rate * factor * ot)}\n\nGross wage = **${R(gross)}**`,
      };
    }
    const basic = amt(r, 8_000, 35_000, 100);
    const pensionPct = pick(r, [5, 6, 7.5]);
    const pension = round((basic * pensionPct) / 100, 2);
    const medical = amt(r, 600, 2_400, 50);
    const paye = monthlyPaye(basic - pension);
    const u = uif(basic);
    const net = basic - pension - medical - paye - u;
    if (t === 1) {
      return {
        q: `${name}'s basic salary is ${R(basic)} per month. Calculate the employee's UIF contribution (1% of gross, earnings capped at R17 712).`,
        answer: ans(u),
        unit: "R",
        hint: "UIF = 1% × gross salary (but never more than 1% of R17 712 = R177,12).",
        solution: `UIF = 1% × ${R(Math.min(basic, 17_712))} = **${R(u)}**`,
      };
    }
    return {
      q: `${name}'s gross salary is ${R(basic)}. Deductions: pension ${pensionPct}% of gross, medical aid ${R(medical)}, PAYE ${R(paye)} and UIF ${R(u)}. Calculate the net salary.`,
      answer: ans(net),
      unit: "R",
      hint: "Net salary = gross − all deductions.",
      solution: `Pension = ${pensionPct}% × ${R(basic)} = ${R(pension)}\n\nTotal deductions = ${R(pension)} + ${R(medical)} + ${R(paye)} + ${R(u)} = ${R(pension + medical + paye + u)}\n\nNet salary = ${R(basic)} − ${R(pension + medical + paye + u)} = **${R(net)}**`,
    };
  },
};

// ------------------------------------------------------------ Bank reconciliation
const bankRecon: Generator = {
  id: "bank-recon",
  title: "Bank reconciliation",
  topic: "g10-bank",
  make(seed) {
    const r = seededRandom(seed);
    const statement = amt(r, 5_000, 60_000, 10);
    const dep = amt(r, 1_000, 12_000, 10);
    const ch1 = amt(r, 300, 6_000, 10);
    const ch2 = amt(r, 300, 6_000, 10);
    const ledger = statement + dep - ch1 - ch2;
    const t = int(r, 0, 1);
    if (t === 0) {
      return {
        q: `The bank statement shows a favourable balance of ${R(statement)}. A deposit of ${R(dep)} is not yet on the statement, and EFT/cheque payments of ${R(ch1)} and ${R(ch2)} have not yet been processed by the bank. What should the Bank account in the ledger show?`,
        answer: ans(ledger),
        unit: "R",
        hint: "Statement balance + outstanding deposits − outstanding payments = Bank account balance.",
        solution: `${R(statement)} + ${R(dep)} − ${R(ch1)} − ${R(ch2)} = **${R(ledger)}** (favourable/debit)`,
      };
    }
    const charges = amt(r, 50, 600, 5);
    const interest = amt(r, 10, 300, 5);
    const before = amt(r, 4_000, 40_000, 10);
    return {
      q: `The Bank account (before checking the statement) shows ${R(before)} favourable. The statement shows bank charges of ${R(charges)} and interest earned of ${R(interest)} that are not yet in the cash journals. Calculate the correct Bank balance.`,
      answer: ans(before - charges + interest),
      unit: "R",
      hint: "Bank charges reduce the bank balance (CPJ); interest earned increases it (CRJ).",
      solution: `${R(before)} − ${R(charges)} + ${R(interest)} = **${R(before - charges + interest)}**`,
    };
  },
};

// ------------------------------------------------------------ Inventory systems (cost of sales)
const costOfSales: Generator = {
  id: "cost-of-sales",
  title: "Cost of sales (periodic)",
  topic: "g10-inventory",
  make(seed) {
    const r = seededRandom(seed);
    const open = amt(r, 10_000, 80_000, 100);
    const purchases = amt(r, 50_000, 300_000, 100);
    const carriage = amt(r, 500, 6_000, 50);
    const returns = amt(r, 200, 5_000, 50);
    const close = amt(r, 8_000, 90_000, 100);
    const cos = open + purchases + carriage - returns - close;
    return {
      q: `Periodic system. Opening stock ${R(open)}; purchases ${R(purchases)}; carriage on purchases ${R(carriage)}; returns to suppliers ${R(returns)}; closing stock (stock count) ${R(close)}. Calculate the cost of sales.`,
      answer: ans(cos),
      unit: "R",
      hint: "Cost of sales = opening stock + net purchases − closing stock. Carriage on purchases is part of the cost.",
      solution: `Net purchases = ${R(purchases)} + ${R(carriage)} − ${R(returns)} = ${R(purchases + carriage - returns)}\n\nCost of sales = ${R(open)} + ${R(purchases + carriage - returns)} − ${R(close)} = **${R(cos)}**`,
    };
  },
};

// ------------------------------------------------------------ Grade 11: adjustments
const adjustments: Generator = {
  id: "adjustments",
  title: "Year-end adjustments",
  topic: "g11-adjustments",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 3);
    if (t === 0) {
      const monthly = amt(r, 200, 3_000, 50);
      const months = int(r, 1, 4);
      const tb = monthly * (12 + months);
      return {
        q: `The Trial Balance shows Insurance of ${R(tb)}. The monthly premium of ${R(monthly)} has been paid up to ${months} month(s) **after** the financial year-end. What amount appears for Insurance in the Income Statement?`,
        answer: ans(monthly * 12),
        unit: "R",
        hint: "Remove the part paid in advance (prepaid expense) – it is a current asset.",
        solution: `Prepaid = ${months} × ${R(monthly)} = ${R(monthly * months)}\n\nInsurance expense = ${R(tb)} − ${R(monthly * months)} = **${R(monthly * 12)}**`,
      };
    }
    if (t === 1) {
      const monthly = amt(r, 1_000, 9_000, 100);
      const owed = int(r, 1, 3);
      const tb = monthly * (12 - owed);
      return {
        q: `Rent income of ${R(tb)} has been received. The tenant still owes rent for ${owed} month(s) of this financial year (rent is ${R(monthly)} per month). Calculate the rent income for the Income Statement.`,
        answer: ans(monthly * 12),
        unit: "R",
        hint: "Rent owed to the business is accrued income – add it.",
        solution: `Accrued income = ${owed} × ${R(monthly)} = ${R(owed * monthly)}\n\nRent income = ${R(tb)} + ${R(owed * monthly)} = **${R(monthly * 12)}**`,
      };
    }
    if (t === 2) {
      const debtors = amt(r, 20_000, 120_000, 100);
      const bad = amt(r, 200, 3_000, 10);
      const pctP = pick(r, [2, 3, 4, 5]);
      const oldProv = amt(r, 500, 4_000, 10);
      const newProv = round(((debtors - bad) * pctP) / 100, 2);
      return {
        q: `Debtors control is ${R(debtors)}. A debtor owing ${R(bad)} must be written off as irrecoverable. The provision for bad debts must be adjusted to ${pctP}% of the remaining debtors (it is currently ${R(oldProv)}). Calculate the **adjustment** to the provision (positive = increase, negative = decrease).`,
        answer: ans(newProv - oldProv),
        unit: "R",
        hint: "New provision = % × (debtors − bad debts). Adjustment = new − old.",
        solution: `New provision = ${pctP}% × (${R(debtors)} − ${R(bad)}) = ${R(newProv)}\n\nAdjustment = ${R(newProv)} − ${R(oldProv)} = **${R(newProv - oldProv)}** (${newProv >= oldProv ? "an increase – an expense" : "a decrease – income"})`,
      };
    }
    const count = amt(r, 20_000, 90_000, 10);
    const ledger = count + amt(r, 100, 3_000, 10);
    return {
      q: `Perpetual system. The Trading stock account shows ${R(ledger)}, but the physical stock count at year-end is ${R(count)}. Calculate the trading stock deficit.`,
      answer: ans(ledger - count),
      unit: "R",
      hint: "Deficit = ledger balance − physical count.",
      solution: `Deficit = ${R(ledger)} − ${R(count)} = **${R(ledger - count)}** – an expense ("Trading stock deficit"); credit Trading stock.`,
    };
  },
};

// ------------------------------------------------------------ Depreciation
const depreciation: Generator = {
  id: "depreciation",
  title: "Depreciation",
  topic: "g11-fixed-assets",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 2);
    const asset = pick(r, ["Equipment", "Vehicles", "Computers", "Furniture"]);
    if (t === 0) {
      const cost = amt(r, 20_000, 400_000, 1000);
      const rate = pick(r, [10, 15, 20, 25]);
      return {
        q: `${asset} cost ${R(cost)}. Depreciation is ${rate}% p.a. on cost (straight-line). Calculate the depreciation for a full year.`,
        answer: ans((cost * rate) / 100),
        unit: "R",
        hint: "Straight-line: cost × rate",
        solution: `${R(cost)} × ${rate}% = **${R((cost * rate) / 100)}**`,
      };
    }
    if (t === 1) {
      const cost = amt(r, 50_000, 300_000, 1000);
      const acc = amt(r, 5_000, Math.floor(cost * 0.6), 1000);
      const rate = pick(r, [10, 15, 20, 25]);
      return {
        q: `${asset}: cost ${R(cost)}, accumulated depreciation ${R(acc)}. Depreciation is ${rate}% p.a. on the **diminishing-balance** method. Calculate this year's depreciation.`,
        answer: ans(((cost - acc) * rate) / 100),
        unit: "R",
        hint: "Diminishing balance: (cost − accumulated depreciation) × rate",
        solution: `Carrying value = ${R(cost)} − ${R(acc)} = ${R(cost - acc)}\n\nDepreciation = ${R(cost - acc)} × ${rate}% = **${R(((cost - acc) * rate) / 100)}**`,
      };
    }
    const cost = amt(r, 24_000, 360_000, 1200);
    const rate = pick(r, [10, 20]);
    const months = int(r, 2, 10);
    return {
      q: `New ${asset.toLowerCase()} costing ${R(cost)} were bought ${months} months before the financial year-end. Depreciation is ${rate}% p.a. on cost. Calculate depreciation for this year.`,
      answer: ans((cost * rate * months) / 1200),
      unit: "R",
      hint: "Only depreciate for the months the asset was owned: cost × rate × months/12.",
      solution: `${R(cost)} × ${rate}% × ${months}/12 = **${R((cost * rate * months) / 1200)}**`,
    };
  },
};

const disposal: Generator = {
  id: "asset-disposal",
  title: "Asset disposal",
  topic: "g11-fixed-assets",
  make(seed) {
    const r = seededRandom(seed);
    const cost = amt(r, 60_000, 300_000, 1000);
    const acc = amt(r, 10_000, Math.floor(cost * 0.8), 500);
    const sold = amt(r, 5_000, cost - acc + 20_000, 500);
    const pl = sold - (cost - acc);
    return {
      q: `A vehicle that cost ${R(cost)} (accumulated depreciation ${R(acc)} at the date of sale) is sold for ${R(sold)}. Calculate the profit (positive) or loss (negative) on disposal.`,
      answer: ans(pl),
      unit: "R",
      hint: "Profit/loss = selling price − carrying value; carrying value = cost − accumulated depreciation.",
      solution: `Carrying value = ${R(cost)} − ${R(acc)} = ${R(cost - acc)}\n\n${R(sold)} − ${R(cost - acc)} = **${R(pl)}** (${pl >= 0 ? "profit" : "loss"} on sale of asset)`,
    };
  },
};

// ------------------------------------------------------------ Partnerships
const partnership: Generator = {
  id: "partnership",
  title: "Partnership appropriation",
  topic: "g11-partnerships",
  make(seed) {
    const r = seededRandom(seed);
    const a = pick(r, OWNERS);
    const nameB = pick(r, OWNERS.filter((x) => x !== a));
    const capA = amt(r, 100_000, 500_000, 10_000);
    const capB = amt(r, 100_000, 500_000, 10_000);
    const ir = pick(r, [8, 10, 12]);
    const salA = amt(r, 60_000, 200_000, 5_000);
    const salB = amt(r, 60_000, 200_000, 5_000);
    const [ra, rb] = pick(r, [[3, 2], [1, 1], [2, 1], [3, 1]] as const);
    const intA = (capA * ir) / 100;
    const intB = (capB * ir) / 100;
    const np = round(salA + salB + intA + intB + amt(r, -30_000, 150_000, 1000), 0);
    const remain = np - salA - salB - intA - intB;
    const shareA = (remain * ra) / (ra + rb);
    const totalA = salA + intA + shareA;
    return {
      q: `${a} and ${nameB} share profits and losses in the ratio ${ra}:${rb}. Capital: ${a} ${R(capA)}, ${nameB} ${R(capB)}. Interest on capital ${ir}% p.a. Salaries: ${a} ${R(salA)}, ${nameB} ${R(salB)}. Net profit for the year is ${R(np)}. Calculate ${a}'s **total** share of the profit (salary + interest + share of the remaining profit).`,
      answer: ans(totalA),
      unit: "R",
      hint: "Appropriate in order: salaries, interest on capital, then share what is left (it may be negative!) in the ratio.",
      solution: [
        `Interest on capital: ${a} ${R(intA)}; ${nameB} ${R(intB)}`,
        `Remaining = ${R(np)} − ${R(salA + salB)} − ${R(intA + intB)} = ${R(remain)}`,
        `${a}'s share of the remainder = ${ra}/${ra + rb} × ${R(remain)} = ${R(shareA)}`,
        `${a}'s total = ${R(salA)} + ${R(intA)} + ${R(shareA)} = **${R(totalA)}**`,
      ].join("\n\n"),
    };
  },
};

// ------------------------------------------------------------ Clubs
const clubFees: Generator = {
  id: "club-fees",
  title: "Club membership fees",
  topic: "g11-clubs",
  make(seed) {
    const r = seededRandom(seed);
    const fee = amt(r, 200, 1_200, 50);
    const members = int(r, 40, 200);
    const arrearsOpen = int(r, 1, 8);
    const advanceClose = int(r, 1, 6);
    const arrearsClose = int(r, 1, 6);
    const received = fee * (members - arrearsClose + arrearsOpen + advanceClose);
    return {
      q: `A soccer club has ${members} members; the annual fee is ${R(fee)}. During the year it received ${R(received)} in fees. This included ${arrearsOpen} members' fees still owing from last year, and ${advanceClose} members who paid next year's fees in advance. ${arrearsClose} members have not paid this year. What is the membership fees **income** for the year?`,
      answer: ans(fee * members),
      unit: "R",
      hint: "Income for the year = members × fee. Check: received − arrears from last year − advances + arrears at year-end.",
      solution: `${members} × ${R(fee)} = **${R(fee * members)}**\n\nCheck: ${R(received)} − ${R(fee * arrearsOpen)} (last year's arrears) − ${R(fee * advanceClose)} (in advance) + ${R(fee * arrearsClose)} (owing now) = ${R(fee * members)}`,
    };
  },
};

// ------------------------------------------------------------ Ratios
const RATIOS = ["current", "acid", "debtEquity", "gpSales", "npSales", "markup", "return"] as const;
const ratios: Generator = {
  id: "ratios",
  title: "Financial ratios",
  topic: "g11-analysis",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const t = pick(r, RATIOS);
    if (t === "current" || t === "acid") {
      const ca = amt(r, 60_000, 400_000, 1000);
      const stock = amt(r, 10_000, Math.floor(ca * 0.6), 1000);
      const cl = amt(r, 30_000, 250_000, 1000);
      const v = t === "current" ? ca / cl : (ca - stock) / cl;
      return {
        q: `Current assets ${R(ca)} (including inventories of ${R(stock)}); current liabilities ${R(cl)}. Calculate the **${t === "current" ? "current" : "acid-test"} ratio** (x:1, to two decimals).`,
        answer: ans(v),
        unit: ": 1",
        tol: 0.011,
        hint: t === "current" ? "Current ratio = current assets ÷ current liabilities" : "Acid-test = (current assets − inventories) ÷ current liabilities",
        solution: t === "current" ? `${R(ca)} ÷ ${R(cl)} = **${D(v)} : 1**` : `(${R(ca)} − ${R(stock)}) ÷ ${R(cl)} = **${D(v)} : 1**`,
      };
    }
    if (t === "debtEquity") {
      const debt = amt(r, 20_000, 400_000, 1000);
      const eq = amt(r, 100_000, 900_000, 1000);
      return {
        q: `Non-current liabilities ${R(debt)}; owner's (shareholders') equity ${R(eq)}. Calculate the **debt-equity ratio** (x:1, two decimals).`,
        answer: ans(debt / eq),
        unit: ": 1",
        tol: 0.011,
        hint: "Debt-equity = non-current liabilities ÷ equity",
        solution: `${R(debt)} ÷ ${R(eq)} = **${D(debt / eq)} : 1**`,
      };
    }
    const sales = amt(r, 200_000, 2_000_000, 1000);
    const cos = round(sales / pick(r, [1.4, 1.5, 1.6, 1.75, 2]), 0);
    const gp = sales - cos;
    if (t === "gpSales" || t === "markup") {
      const v = t === "gpSales" ? (gp / sales) * 100 : (gp / cos) * 100;
      return {
        q: `Sales ${R(sales)}; cost of sales ${R(cos)}. Calculate the **${t === "gpSales" ? "gross profit on sales" : "gross profit on cost of sales (mark-up)"}** percentage (one decimal).`,
        answer: ans(v, 1),
        unit: "%",
        tol: PCT_TOL,
        hint: t === "gpSales" ? "GP ÷ sales × 100" : "GP ÷ cost of sales × 100",
        solution: `Gross profit = ${R(sales)} − ${R(cos)} = ${R(gp)}\n\n${R(gp)} ÷ ${R(t === "gpSales" ? sales : cos)} × 100 = **${P(v)}**`,
      };
    }
    if (t === "npSales") {
      const np = amt(r, 10_000, Math.floor(gp * 0.7), 100);
      return {
        q: `Sales ${R(sales)}; net profit ${R(np)}. Calculate the **net profit on sales** percentage (one decimal).`,
        answer: ans((np / sales) * 100, 1),
        unit: "%",
        tol: PCT_TOL,
        hint: "Net profit ÷ sales × 100",
        solution: `${R(np)} ÷ ${R(sales)} × 100 = **${P((np / sales) * 100)}**`,
      };
    }
    const open = amt(r, 200_000, 900_000, 1000);
    const close = open + amt(r, -50_000, 200_000, 1000);
    const np = amt(r, 30_000, 300_000, 1000);
    const v = (np / ((open + close) / 2)) * 100;
    return {
      q: `Net profit ${R(np)}. Owner's equity was ${R(open)} at the start of the year and ${R(close)} at the end. Calculate the **return on owner's equity** (one decimal).`,
      answer: ans(v, 1),
      unit: "%",
      tol: PCT_TOL,
      hint: "Net profit ÷ average owner's equity × 100. Average = (opening + closing) ÷ 2.",
      solution: `Average equity = (${R(open)} + ${R(close)}) ÷ 2 = ${R((open + close) / 2)}\n\n${R(np)} ÷ ${R((open + close) / 2)} × 100 = **${P(v)}**`,
    };
  },
};

// ------------------------------------------------------------ Debtors reconciliation
const debtorsRecon: Generator = {
  id: "debtors-recon",
  title: "Debtors reconciliation",
  topic: "g11-reconciliations",
  make(seed) {
    const r = seededRandom(seed);
    const control = amt(r, 20_000, 90_000, 10);
    const undercast = amt(r, 100, 2_000, 10);
    const credit = amt(r, 100, 900, 10);
    const t = int(r, 0, 1);
    if (t === 0) {
      return {
        q: `The Debtors control account shows ${R(control)}. The Debtors journal was **undercast** by ${R(undercast)}, and a credit note for ${R(credit)} was not recorded at all. Calculate the correct Debtors control balance.`,
        answer: ans(control + undercast - credit),
        unit: "R",
        hint: "An undercast DJ means too little was debited to the control account. An unrecorded credit note must still be credited.",
        solution: `${R(control)} + ${R(undercast)} − ${R(credit)} = **${R(control + undercast - credit)}**`,
      };
    }
    const creditorStmt = amt(r, 10_000, 60_000, 10);
    const payment = amt(r, 1_000, 8_000, 10);
    const invoice = amt(r, 500, 5_000, 10);
    return {
      q: `A creditor's statement shows that we owe ${R(creditorStmt)}. Our payment of ${R(payment)} on the last day of the month is not on the statement yet, and the creditor charged us twice for an invoice of ${R(invoice)}. What should our Creditors ledger account for this supplier show?`,
      answer: ans(creditorStmt - payment - invoice),
      unit: "R",
      hint: "Start with the statement, then subtract what the supplier should not be charging us yet / at all.",
      solution: `${R(creditorStmt)} − ${R(payment)} (payment in transit) − ${R(invoice)} (duplicate invoice) = **${R(creditorStmt - payment - invoice)}**`,
    };
  },
};

// ------------------------------------------------------------ Manufacturing
const manufacturing: Generator = {
  id: "manufacturing",
  title: "Production cost & unit cost",
  topic: "g11-cost",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const units = amt(r, 2_000, 20_000, 100);
    const dm = amt(r, 50_000, 400_000, 1000);
    const dl = amt(r, 30_000, 250_000, 1000);
    const foh = amt(r, 20_000, 200_000, 1000);
    const wipO = amt(r, 0, 30_000, 1000);
    const wipC = amt(r, 0, 30_000, 1000);
    const t = int(r, 0, 2);
    if (t === 0) {
      return {
        q: `Direct material cost ${R(dm)}; direct labour ${R(dl)}. Calculate the **prime cost**.`,
        answer: ans(dm + dl),
        unit: "R",
        hint: "Prime cost = direct materials + direct labour",
        solution: `${R(dm)} + ${R(dl)} = **${R(dm + dl)}**`,
      };
    }
    const total = dm + dl + foh + wipO - wipC;
    if (t === 1) {
      return {
        q: `Direct materials ${R(dm)}; direct labour ${R(dl)}; factory overheads ${R(foh)}; work-in-process: opening ${R(wipO)}, closing ${R(wipC)}. Calculate the **cost of production of finished goods**.`,
        answer: ans(total),
        unit: "R",
        hint: "Prime cost + factory overheads = total manufacturing cost; then + opening WIP − closing WIP.",
        solution: `Total manufacturing cost = ${R(dm + dl + foh)}\n\n+ ${R(wipO)} − ${R(wipC)} = **${R(total)}**`,
      };
    }
    return {
      q: `A factory made ${units.toLocaleString("en-ZA")} units. Direct materials ${R(dm)}, direct labour ${R(dl)}, factory overheads ${R(foh)} (no work-in-process). Calculate the **cost of production per unit**.`,
      answer: ans((dm + dl + foh) / units),
      unit: "R",
      hint: "Unit cost = total production cost ÷ units produced",
      solution: `(${R(dm)} + ${R(dl)} + ${R(foh)}) ÷ ${units} = ${R(dm + dl + foh)} ÷ ${units} = **${R(round((dm + dl + foh) / units, 2))}**`,
    };
  },
};

// ------------------------------------------------------------ Cash budget collections
const collections: Generator = {
  id: "collections",
  title: "Debtors' collection schedule",
  topic: "g11-budget",
  make(seed) {
    const r = seededRandom(seed);
    const pctThis = pick(r, [30, 40, 50, 60]);
    const pctNext = pick(r, [30, 40]);
    const pctThird = 100 - pctThis - pctNext - pick(r, [0, 5, 10]);
    const bad = 100 - pctThis - pctNext - pctThird;
    const months = ["August", "September", "October"];
    const s = [amt(r, 50_000, 200_000, 1000), amt(r, 50_000, 200_000, 1000), amt(r, 50_000, 200_000, 1000)];
    const v = (s[2] * pctThis + s[1] * pctNext + s[0] * pctThird) / 100;
    return {
      q: `Credit sales: ${months[0]} ${R(s[0])}, ${months[1]} ${R(s[1])}, ${months[2]} ${R(s[2])}. Debtors pay: ${pctThis}% in the month of sale, ${pctNext}% the next month, ${pctThird}% in the third month${bad ? `; ${bad}% is written off` : ""}. Calculate the cash expected from debtors in **${months[2]}**.`,
      answer: ans(v),
      unit: "R",
      hint: `${months[2]} gets ${pctThis}% of ${months[2]}'s sales, ${pctNext}% of ${months[1]}'s and ${pctThird}% of ${months[0]}'s.`,
      solution: `${pctThis}% × ${R(s[2])} = ${R((s[2] * pctThis) / 100)}\n\n${pctNext}% × ${R(s[1])} = ${R((s[1] * pctNext) / 100)}\n\n${pctThird}% × ${R(s[0])} = ${R((s[0] * pctThird) / 100)}\n\nTotal = **${R(v)}**`,
    };
  },
};

// ------------------------------------------------------------ Grade 12: companies
const companies: Generator = {
  id: "companies",
  title: "Company calculations",
  topic: "g12-companies",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 2);
    if (t === 0) {
      const shares = amt(r, 200_000, 2_000_000, 10_000);
      const dps = amt(r, 20, 150, 5);
      return {
        q: `A company has ${shares.toLocaleString("en-ZA")} ordinary shares in issue. It declares a final dividend of ${dps} cents per share. Calculate the total final dividend.`,
        answer: ans((shares * dps) / 100),
        unit: "R",
        hint: "Shares × cents per share ÷ 100",
        solution: `${shares.toLocaleString("en-ZA")} × ${dps}c = **${R((shares * dps) / 100)}**`,
      };
    }
    if (t === 1) {
      const np = amt(r, 200_000, 3_000_000, 1000);
      const rate = 27;
      const tax = round((np * rate) / 100, 2);
      return {
        q: `Net profit before tax is ${R(np)}. Company income tax is ${rate}% of net profit. Calculate the **net profit after tax**.`,
        answer: ans(np - tax),
        unit: "R",
        hint: "Income tax = 27% × net profit before tax.",
        solution: `Tax = 27% × ${R(np)} = ${R(tax)}\n\nNet profit after tax = **${R(np - tax)}**`,
      };
    }
    const shares = amt(r, 300_000, 900_000, 10_000);
    const avgPrice = round(amt(r, 150, 600, 5) / 100, 2);
    const bought = amt(r, 10_000, 60_000, 1_000);
    const buyPrice = round(avgPrice + amt(r, 20, 300, 5) / 100, 2);
    return {
      q: `Ordinary share capital: ${shares.toLocaleString("en-ZA")} shares with an average issue price of R${D(avgPrice)}. The company buys back ${bought.toLocaleString("en-ZA")} shares at R${D(buyPrice)} each. By how much is **retained income** reduced?`,
      answer: ans(bought * (buyPrice - avgPrice)),
      unit: "R",
      hint: "Ordinary share capital is reduced at the AVERAGE issue price; the amount paid above that comes out of retained income.",
      solution: `Paid: ${bought} × R${D(buyPrice)} = ${R(bought * buyPrice)}\n\nOSC reduced: ${bought} × R${D(avgPrice)} = ${R(bought * avgPrice)}\n\nRetained income reduced by **${R(bought * (buyPrice - avgPrice))}**`,
    };
  },
};

const cashFlow: Generator = {
  id: "cash-flow",
  title: "Cash flow figures",
  topic: "g12-cash-flow",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 2);
    if (t === 0) {
      const owedOpen = amt(r, 0, 40_000, 100);
      const owedClose = amt(r, 0, 40_000, 100);
      const tax = amt(r, 80_000, 500_000, 100);
      const paid = owedOpen + tax - owedClose;
      return {
        q: `Income tax for the year (Income Statement) is ${R(tax)}. SARS was owed ${R(owedOpen)} at the start of the year and ${R(owedClose)} at the end. Calculate the income tax **paid**.`,
        answer: ans(paid),
        unit: "R",
        hint: "Paid = owed at the start + tax for the year − owed at the end.",
        solution: `${R(owedOpen)} + ${R(tax)} − ${R(owedClose)} = **${R(paid)}** (shown as (${R(paid).slice(1)}) in the cash flow statement)`,
      };
    }
    if (t === 1) {
      const interim = amt(r, 20_000, 200_000, 100);
      const finalOpen = amt(r, 20_000, 200_000, 100);
      const finalClose = amt(r, 20_000, 200_000, 100);
      return {
        q: `Shareholders for dividends at the start of the year: ${R(finalOpen)} (last year's final dividend). This year: interim dividends paid ${R(interim)}; final dividend declared ${R(finalClose)} (not yet paid). Calculate the dividends **paid** this year.`,
        answer: ans(finalOpen + interim),
        unit: "R",
        hint: "Paid = last year's final dividend (paid this year) + this year's interim dividend.",
        solution: `${R(finalOpen)} + ${R(interim)} = **${R(finalOpen + interim)}**`,
      };
    }
    const fixedOpen = amt(r, 400_000, 2_000_000, 1000);
    const dep = amt(r, 20_000, 150_000, 100);
    const sold = amt(r, 0, 80_000, 100);
    const bought = amt(r, 20_000, 400_000, 1000);
    const fixedClose = fixedOpen - dep - sold + bought;
    return {
      q: `Fixed assets (carrying value): ${R(fixedOpen)} at the start and ${R(fixedClose)} at the end of the year. Depreciation ${R(dep)}; assets sold at carrying value ${R(sold)}. Calculate the cost of fixed assets **purchased**.`,
      answer: ans(bought),
      unit: "R",
      hint: "Closing = opening − depreciation − disposals + purchases. Solve for purchases.",
      solution: `Purchases = ${R(fixedClose)} − ${R(fixedOpen)} + ${R(dep)} + ${R(sold)} = **${R(bought)}**`,
    };
  },
};

const shareRatios: Generator = {
  id: "share-ratios",
  title: "EPS, DPS & NAV",
  topic: "g12-analysis",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 3);
    const shares = amt(r, 200_000, 1_500_000, 10_000);
    if (t === 0) {
      const npat = amt(r, 100_000, 2_000_000, 1000);
      const v = (npat / shares) * 100;
      return {
        q: `Net profit after tax ${R(npat)}; weighted number of shares ${shares.toLocaleString("en-ZA")}. Calculate the **earnings per share** in cents (one decimal).`,
        answer: ans(v, 1),
        unit: "cents",
        tol: 0.06,
        hint: "EPS = net profit after tax ÷ number of shares × 100 (for cents)",
        solution: `${R(npat)} ÷ ${shares} × 100 = **${D(v, 1)} cents**`,
      };
    }
    if (t === 1) {
      const div = amt(r, 50_000, 900_000, 1000);
      const v = (div / shares) * 100;
      return {
        q: `Total dividends for the year ${R(div)}; shares in issue ${shares.toLocaleString("en-ZA")}. Calculate the **dividends per share** in cents (one decimal).`,
        answer: ans(v, 1),
        unit: "cents",
        tol: 0.06,
        hint: "DPS = total dividends ÷ number of shares × 100",
        solution: `${R(div)} ÷ ${shares} × 100 = **${D(v, 1)} cents**`,
      };
    }
    if (t === 2) {
      const eq = amt(r, 500_000, 9_000_000, 1000);
      const v = (eq / shares) * 100;
      return {
        q: `Shareholders' equity ${R(eq)}; shares in issue ${shares.toLocaleString("en-ZA")}. Calculate the **net asset value per share** in cents (one decimal).`,
        answer: ans(v, 1),
        unit: "cents",
        tol: 0.06,
        hint: "NAV = shareholders' equity ÷ number of shares × 100",
        solution: `${R(eq)} ÷ ${shares} × 100 = **${D(v, 1)} cents**`,
      };
    }
    const eps = amt(r, 50, 400, 1);
    const dps = amt(r, 10, eps, 1);
    return {
      q: `EPS is ${eps} cents and DPS is ${dps} cents. Calculate the **dividend pay-out rate** (one decimal).`,
      answer: ans((dps / eps) * 100, 1),
      unit: "%",
      tol: PCT_TOL,
      hint: "Pay-out rate = DPS ÷ EPS × 100",
      solution: `${dps} ÷ ${eps} × 100 = **${P((dps / eps) * 100)}**`,
    };
  },
};

const breakEven: Generator = {
  id: "break-even",
  title: "Break-even point",
  topic: "g12-cost",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const fixed = amt(r, 50_000, 900_000, 1000);
    const vc = amt(r, 20, 400, 5);
    const price = vc + amt(r, 10, 300, 5);
    const be = fixed / (price - vc);
    const t = int(r, 0, 1);
    if (t === 0) {
      return {
        q: `Total fixed costs ${R(fixed)}; selling price ${R(price)} per unit; variable cost ${R(vc)} per unit. Calculate the **break-even point** in units (round UP to a whole unit).`,
        answer: String(Math.ceil(be - 1e-9)),
        unit: "units",
        tol: 0.5,
        hint: "Break-even = fixed costs ÷ (selling price − variable cost per unit)",
        solution: `Contribution per unit = ${R(price)} − ${R(vc)} = ${R(price - vc)}\n\n${R(fixed)} ÷ ${R(price - vc)} = ${D(be)} → **${Math.ceil(be - 1e-9)} units**`,
      };
    }
    const units = Math.ceil(be) + amt(r, 100, 3_000, 10);
    return {
      q: `Fixed costs ${R(fixed)}; selling price ${R(price)}; variable cost ${R(vc)} per unit. The business sells ${units.toLocaleString("en-ZA")} units. Calculate the net profit.`,
      answer: ans(units * (price - vc) - fixed),
      unit: "R",
      hint: "Profit = units × contribution per unit − fixed costs",
      solution: `${units} × ${R(price - vc)} − ${R(fixed)} = **${R(units * (price - vc) - fixed)}**`,
    };
  },
};

const inventory: Generator = {
  id: "inventory-valuation",
  title: "FIFO & weighted average",
  topic: "g12-inventory",
  make(seed) {
    const r = seededRandom(seed);
    const openQ = int(r, 10, 80);
    const openP = amt(r, 100, 600, 10);
    const buys = [0, 1, 2].map(() => ({ q: int(r, 20, 120), p: amt(r, 100, 700, 10) }));
    const totalQ = openQ + buys.reduce((s, b) => s + b.q, 0);
    const totalV = openQ * openP + buys.reduce((s, b) => s + b.q * b.p, 0);
    const closeQ = int(r, 5, Math.min(60, totalQ - 5));
    const method = r() < 0.5 ? "fifo" : "wa";
    let value = 0;
    const steps: string[] = [];
    if (method === "fifo") {
      let need = closeQ;
      for (const b of [...buys].reverse()) {
        const take = Math.min(need, b.q);
        if (take > 0) {
          value += take * b.p;
          steps.push(`${take} × ${R(b.p)} = ${R(take * b.p)}`);
        }
        need -= take;
      }
      if (need > 0) {
        value += need * openP;
        steps.push(`${need} × ${R(openP)} = ${R(need * openP)} (opening stock)`);
      }
    } else {
      value = round((totalV / totalQ) * closeQ, 2);
      steps.push(`Weighted average = ${R(totalV)} ÷ ${totalQ} units = ${R(round(totalV / totalQ, 2))} per unit`, `${closeQ} × ${R(totalV / totalQ)} = ${R(value)}`);
    }
    const table = `| | Units | Price |\n|---|---:|---:|\n| Opening stock | ${openQ} | ${R(openP)} |\n${buys.map((b, i) => `| Purchase ${i + 1} | ${b.q} | ${R(b.p)} |`).join("\n")}`;
    return {
      q: `${table}\n\n${closeQ} units are on hand at year-end. Value the closing stock using **${method === "fifo" ? "FIFO" : "the weighted-average method"}**.`,
      answer: ans(value),
      unit: "R",
      tol: method === "wa" ? 0.6 : undefined,
      hint: method === "fifo" ? "FIFO: the oldest stock is sold first, so the units left are from the LATEST purchases." : "Weighted average = total cost of all units available ÷ total units; × units on hand.",
      solution: steps.join("\n\n") + `\n\nClosing stock = **${R(value)}**`,
    };
  },
};

// ------------------------------------------------------------ Money Life
const compound: Generator = {
  id: "compound",
  title: "Compound interest",
  topic: "life-saving",
  make(seed) {
    const r = seededRandom(seed);
    const p = amt(r, 1_000, 50_000, 500);
    const i = pick(r, [5, 6, 7, 8, 9, 10, 11, 12]);
    const n = int(r, 2, 15);
    const t = int(r, 0, 1);
    const a = p * (1 + i / 100) ** n;
    if (t === 0) {
      return {
        q: `You invest ${R(p)} at ${i}% per year, compounded annually, and leave it for ${n} years. How much will you have?`,
        answer: ans(a),
        unit: "R",
        tol: 0.6,
        hint: "A = P(1 + i)ⁿ",
        solution: `$$A = ${p}(1 + ${D(i / 100)})^{${n}}$$\n\n= **${R(round(a, 2))}** – that's ${R(round(a - p, 2))} of interest you did nothing for.`,
      };
    }
    const simple = p * (1 + (i / 100) * n);
    return {
      q: `${R(p)} at ${i}% p.a. for ${n} years. How much MORE do you earn with compound interest than with simple interest?`,
      answer: ans(a - simple),
      unit: "R",
      tol: 0.6,
      hint: "Simple: A = P(1 + in). Compound: A = P(1 + i)ⁿ.",
      solution: `Compound: ${R(round(a, 2))}\n\nSimple: ${R(round(simple, 2))}\n\nDifference = **${R(round(a - simple, 2))}** – interest earning interest.`,
    };
  },
};

const budget503020: Generator = {
  id: "budget-503020",
  title: "50/30/20 budget",
  topic: "life-money",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const net = amt(r, 6_000, 40_000, 500);
    const which = pick(r, [["needs", 50], ["wants", 30], ["savings and debt repayment", 20]] as const);
    return {
      q: `Your take-home pay is ${R(net)} a month. Using the 50/30/20 rule, how much should go to **${which[0]}**?`,
      answer: ans((net * which[1]) / 100),
      unit: "R",
      hint: "50% needs, 30% wants, 20% savings & paying off debt.",
      solution: `${which[1]}% × ${R(net)} = **${R((net * which[1]) / 100)}**`,
    };
  },
};

const loanCost: Generator = {
  id: "loan-cost",
  title: "The real cost of credit",
  topic: "life-credit",
  make(seed) {
    const r = seededRandom(seed);
    const t = int(r, 0, 1);
    if (t === 0) {
      const price = amt(r, 3_000, 20_000, 100);
      const months = pick(r, [12, 24, 36]);
      const inst = round((price * pick(r, [1.25, 1.35, 1.5, 1.6])) / months, 0);
      return {
        q: `A phone costs ${R(price)} cash, or ${months} monthly instalments of ${R(inst)} on credit. How much extra do you pay by buying on credit?`,
        answer: ans(inst * months - price),
        unit: "R",
        hint: "Total paid = instalment × number of months. Extra = total − cash price.",
        solution: `${months} × ${R(inst)} = ${R(inst * months)}\n\nExtra = ${R(inst * months)} − ${R(price)} = **${R(inst * months - price)}** – the cost of not waiting.`,
      };
    }
    const debt = amt(r, 2_000, 30_000, 100);
    const rate = pick(r, [18, 21, 24, 27.5]);
    const months = int(r, 1, 6);
    const owed = debt * (1 + rate / 1200) ** months;
    return {
      q: `You owe ${R(debt)} on a store card at ${rate}% per year, compounded monthly. You pay nothing for ${months} month(s). How much do you owe now?`,
      answer: ans(owed),
      unit: "R",
      tol: 0.6,
      hint: `Monthly rate = ${rate}% ÷ 12. A = P(1 + i/12)ⁿ`,
      solution: `$$A = ${debt}\\left(1 + \\frac{${D(rate / 100, 3)}}{12}\\right)^{${months}}$$\n\n= **${R(round(owed, 2))}** – the debt grew by ${R(round(owed - debt, 2))} while you did nothing.`,
    };
  },
};

const incomeTaxGen: Generator = {
  id: "income-tax",
  title: "Personal income tax",
  topic: "life-tax",
  make(seed) {
    const r = seededRandom(seed);
    const income = amt(r, 120_000, 900_000, 1000);
    const t = int(r, 0, 1);
    const res = incomeTax({ income });
    if (t === 0) {
      return {
        q: `Use the 2025/26 SARS tables (Money Life → tax calculator, or the formula sheet). A person younger than 65 has a taxable income of ${R(income)} and no medical aid. Calculate the income tax **payable for the year** (after the primary rebate of R17 235).`,
        answer: ans(res.payable),
        unit: "R",
        tol: 1,
        hint: "Find the bracket, work out base tax + rate × (income − bracket start), then subtract the primary rebate.",
        solution: `Tax before rebate = ${R(round(res.beforeRebates, 2))}\n\nLess primary rebate: ${R(res.rebate)}\n\nTax payable = **${R(round(res.payable, 2))}** (effective rate ${P(res.effectiveRate * 100)}, marginal rate ${Math.round(res.marginalRate * 100)}%)`,
      };
    }
    const ra = amt(r, 1_000, 6_000, 100) * 12;
    const withRa = incomeTax({ income, retirement: ra });
    return {
      q: `Same tables. Income ${R(income)}. You contribute ${R(ra)} a year to a retirement annuity (fully deductible – below 27,5% of income). How much tax do you **save** compared with not contributing?`,
      answer: ans(res.payable - withRa.payable),
      unit: "R",
      tol: 1,
      hint: "Work out the tax twice: on the full income, and on income − RA contribution. The difference is the saving.",
      solution: `Tax without RA = ${R(round(res.payable, 2))}\n\nTax with RA (taxable ${R(withRa.taxable)}) = ${R(round(withRa.payable, 2))}\n\nSaving = **${R(round(res.payable - withRa.payable, 2))}** – SARS effectively pays part of your retirement saving.`,
    };
  },
};

const hustle: Generator = {
  id: "hustle-profit",
  title: "Side-hustle profit",
  topic: "life-hustle",
  speed: true,
  make(seed) {
    const r = seededRandom(seed);
    const product = pick(r, [["vetkoek", 4, 12], ["car washes", 40, 120], ["braided hairstyles", 150, 600], ["phone repairs", 80, 400], ["cupcakes", 6, 20], ["tutoring sessions", 50, 200]] as const);
    const cost = amt(r, product[1], Math.max(product[1], Math.round(product[2] / 2)), 1);
    const price = amt(r, Math.max(cost + 1, Math.round(product[2] * 0.6)), product[2], 1);
    const qty = int(r, 20, 200);
    const fixed = amt(r, 100, 1_500, 50);
    return {
      q: `You sell ${qty} ${product[0]} in a month at ${R(price)} each. Each one costs you ${R(cost)} in supplies, and you pay ${R(fixed)} for the month's stall/transport/data. What is your net profit?`,
      answer: ans(qty * (price - cost) - fixed),
      unit: "R",
      hint: "Profit = sales − variable costs − fixed costs.",
      solution: `Sales = ${qty} × ${R(price)} = ${R(qty * price)}\n\nSupplies = ${qty} × ${R(cost)} = ${R(qty * cost)}\n\nProfit = ${R(qty * price)} − ${R(qty * cost)} − ${R(fixed)} = **${R(qty * (price - cost) - fixed)}**`,
    };
  },
};

const inflation: Generator = {
  id: "inflation",
  title: "Inflation",
  topic: "life-saving",
  make(seed) {
    const r = seededRandom(seed);
    const price = amt(r, 20, 5_000, 5);
    const rate = pick(r, [4, 5, 6, 7]);
    const years = int(r, 3, 20);
    const v = price * (1 + rate / 100) ** years;
    return {
      q: `Something costs ${R(price)} today. If inflation averages ${rate}% a year, what will it cost in ${years} years?`,
      answer: ans(v),
      unit: "R",
      tol: 0.6,
      hint: "Inflation compounds, just like interest: P(1 + i)ⁿ",
      solution: `${R(price)} × (1,0${rate})^${years} = **${R(round(v, 2))}**\n\nIf your savings grow slower than ${rate}% a year, you are losing buying power.`,
    };
  },
};

export const GENERATORS: Generator[] = [
  equationEffect, debitCredit, trialBalance, markup, vat, salaries, bankRecon, costOfSales,
  adjustments, depreciation, disposal, partnership, clubFees, ratios, debtorsRecon, manufacturing, collections,
  companies, cashFlow, shareRatios, breakEven, inventory,
  budget503020, hustle, compound, inflation, loanCost, incomeTaxGen,
];

export function getGenerator(id: string): Generator | undefined {
  return GENERATORS.find((g) => g.id === id);
}

/** Retained for docs: list of shop names used in stories. */
export const STORY_SHOPS = SHOPS;
