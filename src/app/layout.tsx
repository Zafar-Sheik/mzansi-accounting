import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PrefsApplier, themeBootScript } from "@/components/layout/prefs-applier";
import { ReadingRuler } from "@/components/layout/reading-ruler";
import { RewardLayer } from "@/components/layout/reward-layer";
import { ProgressBootstrap } from "@/components/layout/progress-bootstrap";
import { TOPIC_INDEX } from "@/content";

export const metadata: Metadata = {
  title: { default: "AccountingMzansi – Grade 10, 11 & 12 Accounting (CAPS) + Money Life", template: "%s · AccountingMzansi" },
  description:
    "Interactive CAPS Grade 10, 11 & 12 Accounting – the accounting equation, journals, ledgers, financial statements, partnerships, companies, cash flow, VAT, cost accounting and budgets – plus Money Life lessons on budgeting, payslips, credit and doing your own taxes. Hands-on labs, endless practice, quizzes, flashcards, exam questions and games. ADHD- and dyslexia-friendly.",
  applicationName: "AccountingMzansi",
  keywords: ["Accounting", "CAPS", "Grade 10", "Grade 11", "Grade 12", "NSC", "matric", "financial literacy", "VAT", "tax", "SARS eFiling", "budget", "South Africa"],
  openGraph: { title: "AccountingMzansi", description: "Grade 10–12 Accounting and real-life money skills, the interactive way.", type: "website" },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0b0a16" }, { media: "(prefers-color-scheme: light)", color: "#f7f7fb" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body className="min-h-screen">
        <PrefsApplier />
        <ProgressBootstrap topicIndex={TOPIC_INDEX} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ReadingRuler />
        <RewardLayer />
      </body>
    </html>
  );
}
