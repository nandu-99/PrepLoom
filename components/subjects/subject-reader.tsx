"use client";

import {
  LearnContent,
  RecallContent,
  ReviewContent,
} from "@/components/subjects/subject-workspace";
import type {
  SubjectContent,
  SubjectStudyMode,
  SubjectTopic,
} from "@/lib/subject-content";
import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ListTree,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type ReadingLayout = "topic" | "all";

type SavedReadingState = {
  layout: ReadingLayout;
  mode: SubjectStudyMode;
  selectedSlug: string;
  completed: string[];
  saved: string[];
};

const layoutOptions: { value: ReadingLayout; label: string }[] = [
  { value: "topic", label: "Topic by topic" },
  { value: "all", label: "All notes" },
];

const modeOptions: { value: SubjectStudyMode; label: string }[] = [
  { value: "learn", label: "Detailed" },
  { value: "revise", label: "Quick review" },
  { value: "last-minute", label: "Last check" },
];

function clean(text: string) {
  return text.replace(/[\u2014\u2013]/g, "-");
}

function TopicContent({
  topic,
  mode,
}: {
  topic: SubjectTopic;
  mode: SubjectStudyMode;
}) {
  if (mode === "learn") return <LearnContent topic={topic} />;
  if (mode === "revise") return <ReviewContent topic={topic} />;
  return <RecallContent topic={topic} />;
}

function TopicActions({
  topic,
  completed,
  saved,
  onToggleComplete,
  onToggleSaved,
  placement = "footer",
}: {
  topic: SubjectTopic;
  completed: boolean;
  saved: boolean;
  onToggleComplete: () => void;
  onToggleSaved: () => void;
  placement?: "footer" | "sidebar";
}) {
  const sidebar = placement === "sidebar";

  return (
    <div
      className={
        sidebar
          ? "space-y-2"
          : "flex flex-wrap items-center gap-3 border-t border-black/[0.1] pt-5 dark:border-white/[0.11]"
      }
    >
      <button
        type="button"
        onClick={onToggleComplete}
        aria-pressed={completed}
        className={`${sidebar ? "flex min-h-11 w-full px-3" : "inline-flex min-h-10 px-4"} items-center gap-2 rounded-[10px] text-[12px] font-medium transition-[background-color,color,border-color,transform] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50 ${
          completed
            ? "border border-black/[0.1] bg-black/[0.06] text-[#151515] dark:border-white/[0.12] dark:bg-white/[0.08] dark:text-[#f3f3f1]"
            : "bg-[#151515] text-white dark:border dark:border-white/[0.14] dark:bg-[#242424] dark:text-[#f3f3f1]"
        }`}
      >
        <Check className="size-4" strokeWidth={1.8} aria-hidden="true" />
        {completed ? "Completed" : "Mark complete"}
      </button>
      <button
        type="button"
        onClick={onToggleSaved}
        aria-pressed={saved}
        className={`${sidebar ? "flex min-h-11 w-full px-3" : "inline-flex min-h-10 px-4"} items-center gap-2 rounded-[10px] border border-black/[0.1] text-[12px] font-medium transition-[background-color,color,border-color,transform] hover:bg-black/[0.04] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:border-white/[0.11] dark:hover:bg-white/[0.06] dark:focus-visible:ring-white/50`}
      >
        <Bookmark
          className={`size-4 ${saved ? "fill-current" : ""}`}
          strokeWidth={1.7}
          aria-hidden="true"
        />
        {saved ? "Saved" : "Save topic"}
      </button>
      <span className="sr-only">Actions for {clean(topic.title)}</span>
    </div>
  );
}

export function SubjectReader({
  subject,
}: {
  subject: SubjectContent;
}) {
  const topics = useMemo(
    () => subject.modules.flatMap((module) => module.topics),
    [subject.modules],
  );
  const storageKey = `preploom-reading-preview-${subject.slug}`;
  const [layout, setLayout] = useState<ReadingLayout>("topic");
  const [mode, setMode] = useState<SubjectStudyMode>("learn");
  const [selectedSlug, setSelectedSlug] = useState(topics[0].slug);
  const [completed, setCompleted] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const pendingScrollSlug = useRef<string | null>(null);
  const reduceMotion = useReducedMotion();

  const selectedIndex = topics.findIndex((topic) => topic.slug === selectedSlug);
  const selectedTopic = topics[selectedIndex] ?? topics[0];
  const selectedModuleTitle =
    subject.modules.find((module) =>
      module.topics.some((topic) => topic.slug === selectedTopic.slug),
    )?.title ?? "";

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const state = JSON.parse(raw) as SavedReadingState;
          if (state.layout === "topic" || state.layout === "all") {
            setLayout(state.layout);
          }
          if (["learn", "revise", "last-minute"].includes(state.mode)) {
            setMode(state.mode);
          }
          if (topics.some((topic) => topic.slug === state.selectedSlug)) {
            setSelectedSlug(state.selectedSlug);
          }
          setCompleted(state.completed ?? []);
          setSaved(state.saved ?? []);
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [storageKey, topics]);

  useEffect(() => {
    if (!hydrated) return;
    const state: SavedReadingState = {
      layout,
      mode,
      selectedSlug,
      completed,
      saved,
    };
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [completed, hydrated, layout, mode, saved, selectedSlug, storageKey]);

  useEffect(() => {
    if (layout !== "all") return;
    const elements = topics
      .map((topic) => document.getElementById(`all-note-${topic.slug}`))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setSelectedSlug(visible.target.id.replace("all-note-", ""));
        }
      },
      { rootMargin: "-24% 0px -58% 0px", threshold: [0, 0.2, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [layout, topics]);

  useEffect(() => {
    if (!pendingScrollSlug.current) return;
    const slug = pendingScrollSlug.current;
    const frame = window.requestAnimationFrame(() => {
      const id = layout === "all" ? `all-note-${slug}` : "reading-preview-note";
      document.getElementById(id)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      pendingScrollSlug.current = null;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [layout, mode, reduceMotion]);

  function toggleList(
    setter: Dispatch<SetStateAction<string[]>>,
    slug: string,
  ) {
    setter((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  }

  function changeLayout(nextLayout: ReadingLayout) {
    if (nextLayout === layout) return;
    pendingScrollSlug.current = selectedSlug;
    setLayout(nextLayout);
  }

  function changeMode(nextMode: SubjectStudyMode) {
    if (nextMode === mode) return;
    pendingScrollSlug.current = selectedSlug;
    setMode(nextMode);
  }

  function selectTopic(slug: string) {
    setSelectedSlug(slug);
    if (layout === "all") {
      document.getElementById(`all-note-${slug}`)?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      return;
    }
    document.getElementById("reading-preview-note")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <section className="border-b border-black/[0.08] dark:border-white/[0.09]">
      <div className="sticky top-[68px] z-30 border-b border-black/[0.08] bg-[#f7f7f5]/95 px-5 py-3 backdrop-blur-xl dark:border-white/[0.09] dark:bg-[#0a0a0a]/95 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-[1320px] gap-3 lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-5">
          <p className="text-[13px] font-medium">
            {completed.length} of {topics.length} complete
          </p>

          <div className="flex items-center justify-between gap-3">
            <span className="hidden text-[11px] text-[#777] dark:text-[#999] sm:inline">Reading layout</span>
            <div className="grid grid-cols-2 rounded-[12px] bg-black/[0.045] p-1 dark:bg-white/[0.055]" aria-label="Reading layout">
              {layoutOptions.map((option) => (
                <button key={option.value} type="button" onClick={() => changeLayout(option.value)} aria-pressed={layout === option.value} className={`min-h-9 rounded-[9px] px-3 text-[12px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50 ${layout === option.value ? "bg-[#151515] text-white dark:bg-[#242424] dark:text-[#f3f3f1] dark:ring-1 dark:ring-inset dark:ring-white/[0.12]" : "text-[#606060] hover:text-[#151515] dark:text-[#a8a8a8] dark:hover:text-white"}`}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="hidden text-[11px] text-[#777] dark:text-[#999] sm:inline">Note depth</span>
            <div className="grid flex-1 grid-cols-3 rounded-[12px] bg-black/[0.045] p-1 dark:bg-white/[0.055] sm:flex-none" aria-label="Note depth">
              {modeOptions.map((option) => (
                <button key={option.value} type="button" onClick={() => changeMode(option.value)} aria-pressed={mode === option.value} className={`min-h-9 rounded-[9px] px-2.5 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50 sm:px-3 sm:text-[12px] ${mode === option.value ? "bg-[#151515] text-white dark:bg-[#242424] dark:text-[#f3f3f1] dark:ring-1 dark:ring-inset dark:ring-white/[0.12]" : "text-[#606060] hover:text-[#151515] dark:text-[#a8a8a8] dark:hover:text-white"}`}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <details className="group mb-8 rounded-[14px] border border-black/[0.1] dark:border-white/[0.11] lg:hidden">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 text-[13px] font-medium">
            <span className="inline-flex items-center gap-2">
              <ListTree className="size-4" strokeWidth={1.7} aria-hidden="true" />
              Contents
            </span>
            <ChevronDown className="size-4 transition-transform group-open:rotate-180" strokeWidth={1.7} aria-hidden="true" />
          </summary>
          <TopicList
            key={`mobile-${selectedModuleTitle}`}
            subject={subject}
            selectedSlug={selectedSlug}
            completed={completed}
            onSelect={selectTopic}
          />
        </details>

        <div className="grid items-start gap-12 lg:grid-cols-[250px_minmax(0,780px)] lg:justify-between xl:grid-cols-[270px_minmax(0,800px)_170px]">
          <aside className="sticky top-[178px] hidden max-h-[calc(100dvh-205px)] overflow-y-auto pr-5 lg:block">
            <p className="text-[12px] font-medium text-[#616161] dark:text-[#a8a8a8]">Contents</p>
            <TopicList
              key={`desktop-${selectedModuleTitle}`}
              subject={subject}
              selectedSlug={selectedSlug}
              completed={completed}
              onSelect={selectTopic}
              desktop
            />
          </aside>

          <div id="reading-preview-note" className="min-w-0 scroll-mt-52">
            {layout === "topic" ? (
              <TopicByTopic
                topic={selectedTopic}
                mode={mode}
                selectedIndex={selectedIndex}
                topics={topics}
                completed={completed}
                saved={saved}
                onSelect={selectTopic}
                onToggleComplete={(slug) => toggleList(setCompleted, slug)}
                onToggleSaved={(slug) => toggleList(setSaved, slug)}
                reduceMotion={Boolean(reduceMotion)}
              />
            ) : (
              <AllNotes
                subject={subject}
                mode={mode}
                completed={completed}
                saved={saved}
                onToggleComplete={(slug) => toggleList(setCompleted, slug)}
                onToggleSaved={(slug) => toggleList(setSaved, slug)}
              />
            )}
          </div>

          <aside className="sticky top-[178px] hidden xl:block">
            <p className="text-[12px] leading-5 text-[#777] dark:text-[#999]">
              {layout === "topic"
                ? "Move one topic at a time."
                : "Every topic is shown in one continuous document."}
            </p>
            <div className="mt-5 border-t border-black/[0.1] pt-5 dark:border-white/[0.11]">
              <TopicActions
                topic={selectedTopic}
                completed={completed.includes(selectedTopic.slug)}
                saved={saved.includes(selectedTopic.slug)}
                onToggleComplete={() =>
                  toggleList(setCompleted, selectedTopic.slug)
                }
                onToggleSaved={() => toggleList(setSaved, selectedTopic.slug)}
                placement="sidebar"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function TopicList({
  subject,
  selectedSlug,
  completed,
  onSelect,
  desktop = false,
}: {
  subject: SubjectContent;
  selectedSlug: string;
  completed: string[];
  onSelect: (slug: string) => void;
  desktop?: boolean;
}) {
  const listId = useId().replace(/:/g, "");
  const activeModuleTitle = subject.modules.find((module) =>
    module.topics.some((topic) => topic.slug === selectedSlug),
  )?.title;
  const [openModules, setOpenModules] = useState<string[]>(() =>
    activeModuleTitle ? [activeModuleTitle] : [],
  );

  function toggleModule(title: string) {
    setOpenModules((current) =>
      current.includes(title)
        ? current.filter((moduleTitle) => moduleTitle !== title)
        : [...current, title],
    );
  }

  return (
    <div
      className={
        desktop
          ? "mt-4 space-y-1"
          : "max-h-[55vh] overflow-y-auto border-t border-black/[0.09] p-2 dark:border-white/[0.1]"
      }
    >
      {subject.modules.map((module, moduleIndex) => {
        const isOpen = openModules.includes(module.title);
        const panelId = `${listId}-module-${moduleIndex}`;

        return (
          <section key={module.title}>
            <h2>
              <button
                type="button"
                onClick={() => toggleModule(module.title)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-[9px] px-2 py-2 text-left font-medium transition-colors hover:bg-black/[0.035] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:hover:bg-white/[0.05] dark:focus-visible:ring-white/50 ${
                  desktop ? "text-[11px]" : "text-[12px]"
                }`}
              >
                <span className="min-w-0 break-words leading-4">
                  {clean(module.title)}
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-normal text-[#777] dark:text-[#999]">
                  {module.topics.length}
                  <ChevronDown
                    className={`size-3.5 transition-transform motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </span>
              </button>
            </h2>
            <div
              id={panelId}
              className={
                isOpen
                  ? "ml-2 mt-1 space-y-1 border-l border-black/[0.09] pl-1.5 dark:border-white/[0.1]"
                  : "hidden"
              }
            >
              {module.topics.map((topic) => {
                const selected = topic.slug === selectedSlug;
                return (
                  <button
                    key={topic.slug}
                    type="button"
                    onClick={() => onSelect(topic.slug)}
                    className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-[9px] px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50 ${
                      desktop ? "text-[11px]" : "text-[12px]"
                    } ${
                      selected
                        ? "bg-black/[0.06] font-medium text-[#151515] dark:bg-white/[0.08] dark:text-white"
                        : "text-[#606060] hover:bg-black/[0.035] hover:text-[#151515] dark:text-[#a8a8a8] dark:hover:bg-white/[0.05] dark:hover:text-white"
                    }`}
                  >
                    <span className="min-w-0 break-words leading-4">
                      {clean(topic.title)}
                    </span>
                    {completed.includes(topic.slug) && (
                      <Check
                        className="size-3.5 shrink-0"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function TopicByTopic({
  topic,
  mode,
  selectedIndex,
  topics,
  completed,
  saved,
  onSelect,
  onToggleComplete,
  onToggleSaved,
  reduceMotion,
}: {
  topic: SubjectTopic;
  mode: SubjectStudyMode;
  selectedIndex: number;
  topics: SubjectTopic[];
  completed: string[];
  saved: string[];
  onSelect: (slug: string) => void;
  onToggleComplete: (slug: string) => void;
  onToggleSaved: (slug: string) => void;
  reduceMotion: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.article key={`${topic.slug}:${mode}`} initial={reduceMotion ? false : { opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.18 }}>
        <TopicHeader topic={topic} mode={mode} />
        <div className="py-12"><TopicContent topic={topic} mode={mode} /></div>
        <TopicActions topic={topic} completed={completed.includes(topic.slug)} saved={saved.includes(topic.slug)} onToggleComplete={() => onToggleComplete(topic.slug)} onToggleSaved={() => onToggleSaved(topic.slug)} />
        <footer className="mt-7 grid gap-3 border-t border-black/[0.12] pt-6 dark:border-white/[0.13] sm:grid-cols-2">
          <button type="button" disabled={selectedIndex === 0} onClick={() => onSelect(topics[Math.max(0, selectedIndex - 1)].slug)} className="flex min-h-16 items-center gap-3 rounded-[12px] px-3 text-left text-[13px] transition-colors hover:bg-black/[0.035] disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/[0.05]"><ChevronLeft className="size-4" strokeWidth={1.7} aria-hidden="true" /><span><span className="block text-[11px] text-[#616161] dark:text-[#a8a8a8]">Previous</span><span className="mt-1 block font-medium">{clean(topics[Math.max(0, selectedIndex - 1)].title)}</span></span></button>
          <button type="button" disabled={selectedIndex === topics.length - 1} onClick={() => onSelect(topics[Math.min(topics.length - 1, selectedIndex + 1)].slug)} className="flex min-h-16 items-center justify-end gap-3 rounded-[12px] px-3 text-right text-[13px] transition-colors hover:bg-black/[0.035] disabled:cursor-not-allowed disabled:opacity-35 dark:hover:bg-white/[0.05]"><span><span className="block text-[11px] text-[#616161] dark:text-[#a8a8a8]">Next</span><span className="mt-1 block font-medium">{clean(topics[Math.min(topics.length - 1, selectedIndex + 1)].title)}</span></span><ChevronRight className="size-4" strokeWidth={1.7} aria-hidden="true" /></button>
        </footer>
      </motion.article>
    </AnimatePresence>
  );
}

function AllNotes({
  subject,
  mode,
  completed,
  saved,
  onToggleComplete,
  onToggleSaved,
}: {
  subject: SubjectContent;
  mode: SubjectStudyMode;
  completed: string[];
  saved: string[];
  onToggleComplete: (slug: string) => void;
  onToggleSaved: (slug: string) => void;
}) {
  return (
    <div>
      <div className="space-y-24 pb-14 sm:space-y-28">
        {subject.modules.map((module) => (
          <section key={module.title}>
            <header className="mb-12 border-b border-black/[0.12] pb-6 dark:border-white/[0.13]">
              <h2 className="text-[28px] font-semibold tracking-[-0.045em] sm:text-[34px]">{clean(module.title)}</h2>
              <p className="mt-3 text-[14px] leading-6 text-[#606060] dark:text-[#a8a8a8]">{clean(module.description)}</p>
            </header>
            <div className="space-y-14 sm:space-y-16">
              {module.topics.map((topic) => (
                <article id={`all-note-${topic.slug}`} key={topic.slug} className="scroll-mt-52 border-b border-black/[0.1] pb-14 last:border-b-0 last:pb-0 dark:border-white/[0.11] sm:pb-16 [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
                  <TopicHeader topic={topic} mode={mode} compact />
                  <div className="py-10"><TopicContent topic={topic} mode={mode} /></div>
                  <TopicActions topic={topic} completed={completed.includes(topic.slug)} saved={saved.includes(topic.slug)} onToggleComplete={() => onToggleComplete(topic.slug)} onToggleSaved={() => onToggleSaved(topic.slug)} />
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function TopicHeader({ topic, mode, compact = false }: { topic: SubjectTopic; mode: SubjectStudyMode; compact?: boolean }) {
  return (
    <header className="border-b border-black/[0.12] pb-8 dark:border-white/[0.13]">
      <h2 className={`text-balance font-semibold leading-[0.96] tracking-[-0.06em] ${compact ? "text-[clamp(2.25rem,4vw,3.8rem)]" : "text-[clamp(2.7rem,5vw,4.8rem)]"}`}>{clean(topic.title)}</h2>
      <p className="mt-5 max-w-[64ch] text-[16px] leading-8 text-[#505050] dark:text-[#b8b8b8]">{clean(mode === "learn" ? topic.learn.opening : topic.description)}</p>
    </header>
  );
}
