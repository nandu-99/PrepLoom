"use client";

import { motion, useReducedMotion } from "motion/react";

const defaultPrompts = [
  "What is semantic HTML?",
  "Why does DOCTYPE matter?",
  "How do forms validate?",
];

export function InterviewHeroAnimation({
  prompts = defaultPrompts,
  ariaLabel = "Interview questions appearing one after another",
}: {
  prompts?: string[];
  ariaLabel?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-[390px] overflow-hidden py-5 lg:mr-0"
      role="img"
      aria-label={ariaLabel}
    >
      <div className="absolute bottom-0 left-8 top-0 w-px bg-black/[0.09] dark:bg-white/[0.1]" aria-hidden="true" />

      <div className="space-y-3">
        {prompts.map((prompt, index) => (
          <motion.div
            key={prompt}
            initial={reduceMotion ? false : { opacity: 0, x: 18 }}
            animate={
              reduceMotion
                ? { opacity: 1, x: 0 }
                : {
                    opacity: [0.52, 1, 0.52],
                    x: [8, 0, 8],
                  }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 4.8,
                    delay: index * 0.65,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
            }
            className="relative ml-8 min-w-0 border-b border-black/[0.09] bg-[#f7f7f5] py-5 pl-7 pr-2 dark:border-white/[0.1] dark:bg-[#0a0a0a]"
          >
            <span
              className="absolute -left-[20px] top-[23px] flex size-6 items-center justify-center rounded-full border border-black/[0.14] bg-[#f7f7f5] font-[family-name:var(--font-geist-mono)] text-[10px] font-medium text-[#606060] dark:border-white/[0.16] dark:bg-[#0a0a0a] dark:text-[#a8a8a8]"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <p className="min-w-0 break-words text-[15px] font-medium leading-6 tracking-[-0.015em] [overflow-wrap:anywhere] sm:text-[16px]">
              {prompt}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
