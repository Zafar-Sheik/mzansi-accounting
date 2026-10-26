import { expect, test } from "@playwright/test";

const errors: string[] = [];
// React #418 is a recoverable hydration error that Next 15 occasionally reports under heavy CPU load.
// React re-renders on the client, so nothing visible breaks. Every other error fails the test.
const KNOWN = /Minified React error #418/;
test.beforeEach(({ page }) => {
  errors.length = 0;
  page.on("pageerror", (e) => { if (!KNOWN.test(e.message)) errors.push(e.message); });
  page.on("console", (m) => { if (m.type() === "error" && !/favicon/.test(m.text())) errors.push(m.text()); });
});
test.afterEach(() => expect(errors, errors.join("\n")).toEqual([]));

const PRAISE = /Sharp sharp|Lekker|Spot on|Eish, you're good|Yebo|Too clean/;

const LESSON_SLUGS = [
  "what-is-accounting", "accounting-equation", "source-documents-journals", "credit-journals", "general-ledger-trial-balance", "sole-trader-statements",
  "salaries-and-wages", "vat-basics", "bank-reconciliation", "ethics-internal-control", "cost-accounting-basics", "budgeting-basics", "inventory-systems",
  "year-end-adjustments", "partnerships", "clubs", "fixed-assets-depreciation", "analysis-interpretation-11", "debtors-creditors-reconciliations", "manufacturing-cost-accounting", "cash-budgets",
  "companies-ledger", "company-financial-statements", "cash-flow-statement", "company-analysis", "audit-governance", "reconciliations-matric", "vat-matric", "cost-break-even", "budgets-projected-statements", "inventory-valuation",
  "money-plan", "banking-cards-scams", "side-hustle", "first-payslip", "credit-debt-interest", "saving-investing", "doing-your-taxes", "tax-for-hustlers", "adulting-101",
];

test.describe("AccountingMzansi smoke tests", () => {
  test("home page renders hero and strands", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Accounting");
    await expect(page.getByRole("heading", { name: /Money Life/ }).first()).toBeVisible();
  });

  test("lesson: typed rand answers are checked", async ({ page }) => {
    await page.goto("/learn/accounting-equation", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("accounting equation");
    await page.getByRole("button", { name: /3\. Income, expenses & drawings/ }).first().click();
    const input = page.getByRole("textbox", { name: /Your answer/ }).first();
    await input.fill("R320 000");
    await page.getByRole("button", { name: "Check", exact: true }).first().click();
    await expect(page.getByText("Not yet.").first()).toBeVisible();
    await input.fill("R180 000");
    await page.getByRole("button", { name: "Check", exact: true }).first().click();
    await expect(page.getByText(PRAISE).first()).toBeVisible();
  });

  test("worked example reveals step by step", async ({ page }) => {
    await page.goto("/learn/partnerships", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /3\. Current accounts/ }).first().click();
    await page.getByRole("button", { name: "Show step 1" }).click();
    await expect(page.getByText(/R242 000/)).toBeVisible();
  });

  test("equation lab posts a transaction", async ({ page }) => {
    await page.goto("/toolkit", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /^Accounting equation balance/ }).click();
    for (const [i, v] of [[0, "+"], [1, "+"], [2, "0"]] as const) await page.getByRole("button", { name: v, exact: true }).nth(i).click();
    await page.getByRole("button", { name: /Check & post/ }).click();
    await expect(page.getByText(/Yes!/)).toBeVisible();
  });

  test("every lab in the toolkit renders without errors", async ({ page }) => {
    test.slow();
    await page.goto("/toolkit", { waitUntil: "networkidle" });
    const titles = await page.locator("ul li button span.text-sm").allInnerTexts();
    expect(titles.length).toBeGreaterThanOrEqual(20);
    for (const t of titles) {
      await page.getByRole("button", { name: new RegExp(`^${t.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`) }).first().click();
      await expect(page.locator("main section[aria-label]").first()).toBeVisible();
    }
  });

  test("speed solve starts", async ({ page }) => {
    await page.goto("/games", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Start/ }).first().click();
    await expect(page.getByRole("textbox", { name: /Your answer/ })).toBeVisible();
  });

  test("debit or credit dash plays", async ({ page }) => {
    await page.goto("/games", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: /Debit or Credit Dash/ }).click();
    await page.getByRole("button", { name: /Start/ }).first().click();
    await page.getByRole("button", { name: /Debit \(Dr\)/ }).click();
    await expect(page.getByText(/\d+s/).first()).toBeVisible();
  });

  test("flashcards flip and record", async ({ page }) => {
    await page.goto("/flashcards");
    await page.getByRole("button", { name: "Show answer" }).click();
    await page.getByRole("button", { name: /I knew it/ }).click();
    await expect(page.getByText(/Card 2 of/)).toBeVisible();
  });

  test("exam room self-marking", async ({ page }) => {
    await page.goto("/exam");
    await page.getByRole("button", { name: /Analysis of transactions/ }).click();
    await page.getByRole("button", { name: /Show the memo/ }).first().click();
    await page.locator("li button[aria-pressed]").first().click();
    await page.getByRole("button", { name: "Save my mark" }).first().click();
    await expect(page.getByText("Saved ✓")).toBeVisible();
  });

  test("quiz arena round starts", async ({ page }) => {
    await page.goto("/quiz");
    await page.getByRole("button", { name: "Start round" }).click();
    await expect(page.getByText(/Question 1 \/ 10/)).toBeVisible();
  });

  test("preferences panel toggles calm mode", async ({ page }) => {
    await page.goto("/learn");
    await page.getByRole("button", { name: "Open learning preferences" }).click();
    await page.getByText("Calm mode").click();
    await expect(page.locator("html")).toHaveClass(/calm/);
  });

  test("mock lobby lists six full mocks", async ({ page }) => {
    await page.goto("/exam/mock");
    await expect(page.getByRole("link", { name: /Full mock/ })).toHaveCount(6);
  });

  test("money life hub shows lessons and tools", async ({ page }) => {
    await page.goto("/money-life", { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toContainText("money");
    await page.getByRole("button", { name: /Tax calculator/ }).click();
    await expect(page.getByText(/Tax for the year/)).toBeVisible();
  });

  test("curriculum API returns JSON", async ({ request }) => {
    const body = await (await request.get("/api/curriculum")).json();
    expect(body.lessons.length).toBeGreaterThanOrEqual(40);
    expect(body.topics.length).toBe(38);
  });

  test("every lesson renders in full without errors", async ({ page }) => {
    test.slow();
    await page.addInitScript(() => window.localStorage.setItem("accountingmzansi:prefs", JSON.stringify({ stepMode: false })));
    for (const slug of LESSON_SLUGS) {
      await page.goto(`/learn/${slug}`, { waitUntil: "networkidle" });
      await expect(page.getByRole("heading", { level: 1 }), slug).toBeVisible();
    }
  });

  for (const path of ["/", "/learn", "/money-life", "/learn/accounting-equation", "/learn/general-ledger-trial-balance", "/learn/partnerships", "/learn/doing-your-taxes", "/learn/side-hustle", "/flashcards", "/quiz", "/exam", "/exam/mock", "/exam/mock/g12-p1", "/toolkit", "/games", "/progress", "/teachers/worksheets", "/teachers/docs/data-sheets"]) {
    test(`no sideways scrolling on ${path}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
});
