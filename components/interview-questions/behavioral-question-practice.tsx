"use client";

import type {
  BehavioralCategory,
  BehavioralQuestion,
} from "@/content/interview-questions/types";
import { behavioralCategories } from "@/content/interview-questions/types";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type StudyMode = "learn" | "practice";
type CategoryFilter = "All questions" | BehavioralCategory;

function QuestionAnswer({ question }: { question: BehavioralQuestion }) {
  return (
    <div className="min-w-0 space-y-5">
      <div>
        <h4 className="text-[11px] font-semibold text-[#151515] dark:text-[#ededeb]">
          How to answer
        </h4>
        <p className="mt-2 break-words text-[13px] leading-6 text-[#505050] [overflow-wrap:anywhere] dark:text-[#b8b8b8] sm:text-[14px] sm:leading-7">
          {question.howToAnswer}
        </p>
      </div>

      <div className="rounded-[10px] border border-black/[0.08] bg-black/[0.025] p-4 dark:border-white/[0.09] dark:bg-white/[0.035] sm:p-5">
        <h4 className="text-[11px] font-semibold text-[#151515] dark:text-[#ededeb]">
          Example
        </h4>
        <p className="mt-2 break-words text-[13px] leading-6 text-[#404040] [overflow-wrap:anywhere] dark:text-[#c5c5c5] sm:text-[14px] sm:leading-7">
          {question.example}
        </p>
      </div>
    </div>
  );
}

export function BehavioralQuestionPractice({
  questions,
}: {
  questions: BehavioralQuestion[];
}) {
  const [mode, setMode] = useState<StudyMode>("learn");
  const [category, setCategory] = useState<CategoryFilter>("All questions");
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(
    () => new Set(),
  );

  const categoryOptions: CategoryFilter[] = [
    "All questions",
    ...behavioralCategories,
  ];
  const filteredQuestions =
    category === "All questions"
      ? questions
      : questions.filter((question) => question.category === category);

  function selectMode(nextMode: StudyMode) {
    setMode(nextMode);
    if (nextMode === "practice") {
      setRevealedAnswers(new Set());
    }
  }

  function toggleAnswer(id: string) {
    setRevealedAnswers((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="min-w-0">
      <div className="sticky top-[68px] z-30 mb-5 border-b border-black/[0.1] bg-[#f7f7f5]/95 py-3 backdrop-blur-xl dark:border-white/[0.11] dark:bg-[#0a0a0a]/95 sm:py-4">
        <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-medium text-[#606060] dark:text-[#a8a8a8]">
              Filter by category
            </p>
            <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
              <div
                className="flex w-max gap-1.5"
                aria-label="Behavioral question categories"
              >
                {categoryOptions.map((option) => {
                  const active = category === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setCategory(option)}
                      aria-pressed={active}
                      className={`h-8 shrink-0 rounded-[8px] border px-3 text-[10px] font-medium transition-[border-color,background-color,color,transform] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50 sm:text-[11px] ${
                        active
                          ? "border-[#151515] bg-[#151515] text-white dark:border-[#ededed] dark:bg-[#ededed] dark:text-[#151515]"
                          : "border-black/[0.1] text-[#606060] hover:border-black/25 hover:text-[#151515] dark:border-white/[0.12] dark:text-[#a8a8a8] dark:hover:border-white/25 dark:hover:text-white"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="shrink-0 lg:text-right">
            <p className="mb-2 text-[10px] font-medium text-[#606060] dark:text-[#a8a8a8]">
              Choose your mode
            </p>
            <div
              className="inline-grid grid-cols-2 rounded-[10px] border border-black/[0.11] bg-black/[0.025] p-1 dark:border-white/[0.12] dark:bg-white/[0.04]"
              aria-label="Answer mode"
            >
              {(
                [
                  { id: "learn", label: "Learn", icon: BookOpen },
                  { id: "practice", label: "Practice", icon: EyeOff },
                ] as const
              ).map((item) => {
                const Icon = item.icon;
                const active = mode === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectMode(item.id)}
                    aria-pressed={active}
                    className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-[8px] px-3 text-[10px] font-medium transition-[background-color,color,transform] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50 sm:h-9 sm:px-4 sm:text-[11px] ${
                      active
                        ? "bg-[#151515] text-white dark:bg-[#ededed] dark:text-[#151515]"
                        : "text-[#606060] hover:text-[#151515] dark:text-[#a8a8a8] dark:hover:text-white"
                    }`}
                  >
                    <Icon
                      className="size-3.5"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <p className="mb-4 text-[11px] text-[#777] dark:text-[#858585]">
        Showing {filteredQuestions.length} of {questions.length} questions
      </p>

      {filteredQuestions.length ? (
        <div className="grid min-w-0 gap-3">
          {filteredQuestions.map((question) => {
            const questionNumber = questions.findIndex(
              (item) => item.id === question.id,
            );
            const answerVisible =
              mode === "learn" || revealedAnswers.has(question.id);

            return (
              <article
                key={question.id}
                id={question.id}
                className="min-w-0 scroll-mt-[260px] overflow-hidden rounded-[12px] border border-black/[0.09] bg-white/45 px-4 py-5 dark:border-white/[0.1] dark:bg-[#111] sm:px-5"
              >
                <div className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 sm:grid-cols-[38px_minmax(0,1fr)_auto] sm:gap-4">
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] leading-6 text-[#777] dark:text-[#858585]">
                    {String(questionNumber + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <p className="mb-1.5 text-[10px] font-medium text-[#777] dark:text-[#858585]">
                      {question.category}
                    </p>
                    <h3 className="min-w-0 break-words text-[16px] font-semibold leading-6 tracking-[-0.025em] [overflow-wrap:anywhere] sm:text-[17px]">
                      {question.question}
                    </h3>
                  </div>

                  {mode === "practice" && (
                    <button
                      type="button"
                      onClick={() => toggleAnswer(question.id)}
                      aria-expanded={answerVisible}
                      className="col-start-2 mt-1 inline-flex h-8 w-fit items-center gap-2 rounded-[8px] px-2 text-[11px] font-medium text-[#606060] transition-colors hover:bg-black/[0.04] hover:text-[#151515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:text-[#a8a8a8] dark:hover:bg-white/[0.06] dark:hover:text-white dark:focus-visible:ring-white/50 sm:col-start-3 sm:row-start-1 sm:mt-0"
                    >
                      {answerVisible ? (
                        <EyeOff
                          className="size-3.5"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      ) : (
                        <Eye
                          className="size-3.5"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      )}
                      {answerVisible ? "Hide answer" : "Reveal answer"}
                    </button>
                  )}
                </div>

                {answerVisible && (
                  <div className="mt-4 min-w-0 border-t border-black/[0.08] pt-4 dark:border-white/[0.09] sm:ml-[54px]">
                    <QuestionAnswer question={question} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-[12px] border border-black/[0.09] px-5 py-12 text-center dark:border-white/[0.1]">
          <p className="text-sm font-medium">No questions in this category.</p>
          <button
            type="button"
            onClick={() => setCategory("All questions")}
            className="mt-3 rounded-[8px] px-3 py-2 text-xs text-[#606060] underline decoration-black/25 underline-offset-4 hover:text-[#151515] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:text-[#a8a8a8] dark:decoration-white/25 dark:hover:text-white dark:focus-visible:ring-white/50"
          >
            Show all questions
          </button>
        </div>
      )}
    </div>
  );
}
