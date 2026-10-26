import type { Metadata } from "next";
import { Suspense } from "react";
import { EXAM_QUESTIONS } from "@/content";
import { ExamRoom } from "@/components/pages/exam-room";

export const metadata: Metadata = { title: "Exam Room", description: "Exam-style Grade 10, 11 & 12 Accounting questions (Paper 1 and Paper 2) with marking memos and exam technique." };

export default function ExamPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10 text-muted">Loading…</div>}>
      <ExamRoom questions={EXAM_QUESTIONS} />
    </Suspense>
  );
}
