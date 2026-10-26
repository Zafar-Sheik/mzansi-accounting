import type { Metadata } from "next";
import { MoneyLife } from "@/components/pages/money-life";
import { lessonsForTopic } from "@/content";
import { TOPICS } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Money Life",
  description: "Accounting for real life: budgets, banking and scams, side hustles, your first payslip, credit and debt, saving and investing, doing your own taxes on SARS eFiling, and adulting – with hands-on calculators and simulators.",
};

export default function MoneyLifePage() {
  const topics = TOPICS.filter((t) => t.paper === 0).map((t) => ({
    topic: t.topic,
    title: t.title,
    emoji: t.emoji,
    blurb: t.blurb,
    lessons: lessonsForTopic(t.topic).map((l) => ({ slug: l.slug, title: l.title, tagline: l.tagline, minutes: l.chunks.reduce((s, c) => s + c.minutes, 0) })),
  }));
  return <MoneyLife topics={topics} />;
}
