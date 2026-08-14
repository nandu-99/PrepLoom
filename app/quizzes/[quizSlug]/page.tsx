import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComingSoonPage } from "@/components/coming-soon-page";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { QuizRunner } from "@/components/quizzes/quiz-runner";
import { getQuizBySlug, quizzes } from "@/content/quizzes";
import { quizAvailability } from "@/lib/feature-flags";
import { isAvailable } from "@/lib/release-status";

type QuizPageProps = {
  params: Promise<{ quizSlug: string }>;
};

export function generateStaticParams() {
  return quizzes.map((quiz) => ({ quizSlug: quiz.slug }));
}

export async function generateMetadata({ params }: QuizPageProps): Promise<Metadata> {
  const { quizSlug } = await params;
  const quiz = getQuizBySlug(quizSlug);

  if (!quiz) return {};

  if (!isAvailable(quizAvailability)) {
    return {
      title: "Operating Systems Quiz Coming Soon | PrepLoom",
      description:
        "The Operating Systems quiz is coming soon to PrepLoom. Study the notes while it is being prepared.",
    };
  }

  return {
    title: `${quiz.title} | PrepLoom`,
    description: quiz.description,
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { quizSlug } = await params;
  const quiz = getQuizBySlug(quizSlug);

  if (!quiz) notFound();

  if (!isAvailable(quizAvailability)) {
    return (
      <ComingSoonPage
        title="Operating Systems quiz"
        description="This quiz is being prepared. Study the Operating Systems notes now and return here when the quiz is released."
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f5] font-[family-name:var(--font-geist-sans)] text-[#151515] dark:bg-[#0a0a0a] dark:text-[#f3f3f1]">
      <SiteHeader />
      <QuizRunner quiz={quiz} />
      <SiteFooter />
    </div>
  );
}
