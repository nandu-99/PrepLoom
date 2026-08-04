"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Command } from "cmdk";
import {
  ArrowRight,
  BookOpen,
  Braces,
  Code2,
  Route,
  Search,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchItem = {
  title: string;
  description: string;
  href: string;
  keywords: string[];
  icon: typeof BookOpen;
};

type SearchGroup = {
  label: string;
  items: SearchItem[];
};

const searchGroups: SearchGroup[] = [
  {
    label: "Operating Systems",
    items: [
      {
        title: "Introduction to Operating Systems",
        description: "Operating Systems fundamentals",
        href: "/subjects/operating-systems#workspace",
        keywords: ["os", "introduction", "fundamentals", "kernel"],
        icon: BookOpen,
      },
      {
        title: "Processes and Threads",
        description: "Operating Systems process management",
        href: "/subjects/operating-systems#workspace",
        keywords: ["process", "thread", "pcb", "tcb"],
        icon: BookOpen,
      },
      {
        title: "CPU Scheduling",
        description: "Operating Systems scheduling",
        href: "/subjects/operating-systems#workspace",
        keywords: ["fcfs", "sjf", "round robin", "priority scheduling"],
        icon: BookOpen,
      },
      {
        title: "Deadlocks",
        description: "Operating Systems resource allocation",
        href: "/subjects/operating-systems#workspace",
        keywords: ["deadlock prevention", "deadlock avoidance", "banker algorithm"],
        icon: BookOpen,
      },
      {
        title: "Process Synchronization",
        description: "Operating Systems concurrency",
        href: "/subjects/operating-systems#workspace",
        keywords: ["semaphore", "mutex", "critical section", "race condition"],
        icon: BookOpen,
      },
      {
        title: "Memory Management",
        description: "Operating Systems memory allocation",
        href: "/subjects/operating-systems#workspace",
        keywords: ["memory", "allocation", "fragmentation"],
        icon: BookOpen,
      },
      {
        title: "Paging and Virtual Memory",
        description: "Operating Systems address translation",
        href: "/subjects/operating-systems#workspace",
        keywords: ["paging", "virtual memory", "page table", "tlb"],
        icon: BookOpen,
      },
      {
        title: "Page Replacement",
        description: "Operating Systems replacement algorithms",
        href: "/subjects/operating-systems#workspace",
        keywords: ["fifo", "lru", "optimal", "page fault"],
        icon: BookOpen,
      },
    ],
  },
  {
    label: "WebDev",
    items: [
      {
        title: "Useful websites",
        description: "Documentation, testing tools, design assets, and utilities",
        href: "/webdev?tab=websites",
        keywords: ["webdev", "websites", "tools", "resources"],
        icon: Code2,
      },
      {
        title: "Project ideas",
        description: "Projects grouped by skill, stack, and difficulty",
        href: "/webdev?tab=projects",
        keywords: ["webdev", "projects", "portfolio", "build"],
        icon: Code2,
      },
      {
        title: "Component libraries",
        description: "Reusable interface components and design systems",
        href: "/webdev?tab=libraries",
        keywords: ["webdev", "components", "ui", "libraries"],
        icon: Code2,
      },
      {
        title: "Curated collections",
        description: "Selected setup, deployment, and development guides",
        href: "/webdev?tab=guides",
        keywords: ["webdev", "collections", "guides", "deployment"],
        icon: Code2,
      },
      {
        title: "Skills.md",
        description: "Reusable instructions for Claude and Codex",
        href: "/webdev?tab=skills",
        keywords: ["webdev", "skills", "claude", "codex", "agents"],
        icon: Code2,
      },
    ],
  },
  {
    label: "Interview Questions",
    items: [
      {
        title: "HTML interview questions",
        description: "Practice with visible answers or test your recall",
        href: "/interview-questions/html",
        keywords: ["html", "interview", "questions", "practice", "test"],
        icon: Code2,
      },
      {
        title: "CSS interview questions",
        description: "Review layout, selectors, responsive CSS, and the cascade",
        href: "/interview-questions/css",
        keywords: ["css", "interview", "questions", "layout", "responsive"],
        icon: Code2,
      },
    ],
  },
  {
    label: "DSA",
    items: [
      {
        title: "DSA Preparation",
        description: "Choose a trusted sheet for learning, interviews or revision",
        href: "/dsa",
        keywords: ["algorithms", "data structures", "leetcode", "striver", "sheet"],
        icon: Braces,
      },
    ],
  },
  {
    label: "Roadmaps",
    items: [
      {
        title: "Frontend roadmap",
        description: "Web foundations, JavaScript, React, and UI interviews",
        href: "/roadmaps",
        keywords: ["roadmap", "frontend", "react", "javascript"],
        icon: Route,
      },
      {
        title: "Backend roadmap",
        description: "APIs, databases, systems, and backend interviews",
        href: "/roadmaps",
        keywords: ["roadmap", "backend", "api", "databases"],
        icon: Route,
      },
      {
        title: "DSA Practice roadmap",
        description: "Patterns, problem solving, and structured revision",
        href: "/roadmaps",
        keywords: ["roadmap", "dsa", "algorithms", "practice"],
        icon: Route,
      },
    ],
  },
];

const comingSoonSubjects: SearchItem[] = [
  {
    title: "DBMS",
    description: "Coming soon",
    href: "/subjects/dbms",
    keywords: ["dbms", "database management system", "database systems"],
    icon: BookOpen,
  },
  {
    title: "Computer Networks",
    description: "Coming soon",
    href: "/subjects/computer-networks",
    keywords: ["computer networks", "computer networking", "cn"],
    icon: BookOpen,
  },
  {
    title: "OOP",
    description: "Coming soon",
    href: "/subjects/oop",
    keywords: ["oop", "oops", "object oriented programming"],
    icon: BookOpen,
  },
  {
    title: "DSA Theory",
    description: "Coming soon",
    href: "/subjects/dsa-theory",
    keywords: ["dsa theory"],
    icon: BookOpen,
  },
  {
    title: "System Design",
    description: "Coming soon",
    href: "/subjects/system-design",
    keywords: ["system design"],
    icon: BookOpen,
  },
  {
    title: "Web Fundamentals",
    description: "Coming soon",
    href: "/subjects/web-fundamentals",
    keywords: ["web fundamentals"],
    icon: BookOpen,
  },
];

export function CommandSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const matchedComingSoonSubjects = normalizedQuery
    ? comingSoonSubjects.filter((subject) =>
        subject.keywords.some(
          (keyword) =>
            normalizedQuery === keyword || normalizedQuery.includes(keyword),
        ),
      )
    : [];
  const visibleGroups = matchedComingSoonSubjects.length
    ? [
        ...searchGroups,
        { label: "Subjects coming soon", items: matchedComingSoonSubjects },
      ]
    : searchGroups;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setQuery("");
    onOpenChange(nextOpen);
  };

  const openResult = (href: string) => {
    setQuery("");
    onOpenChange(false);
    router.push(href);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[100] min-h-dvh bg-black/55 backdrop-blur-[3px] transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-[-webkit-touch-callout:none]:absolute" />
        <Dialog.Viewport className="fixed inset-0 z-[101] flex items-start justify-center overflow-y-auto px-3 pb-8 pt-[10vh] sm:px-6 sm:pt-[16vh]">
          <Dialog.Popup
            id="preploom-command-search"
            className="w-full max-w-[600px] overflow-hidden rounded-2xl border border-black/10 bg-white font-[family-name:var(--font-inter)] text-black shadow-[0_30px_100px_rgba(0,0,0,0.3)] transition-[scale,opacity] duration-150 ease-out data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-starting-style:scale-[0.98] data-starting-style:opacity-0 dark:border-white/[0.12] dark:bg-[#080808] dark:text-white"
          >
            <Dialog.Title className="sr-only">Search PrepLoom</Dialog.Title>
            <Dialog.Description className="sr-only">
              Search subjects, topics, interview questions, roadmaps and
              development resources.
            </Dialog.Description>

            <Command
              label="PrepLoom search"
              className="flex min-h-0 flex-col"
            >
              <div className="flex h-14 items-center gap-3 border-b border-black/10 px-4 dark:border-white/10 sm:h-16 sm:px-5">
                <Search
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#7C7C7C]"
                />
                <Command.Input
                  autoFocus
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search subjects, topics, questions..."
                  className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-normal outline-none placeholder:text-[#7C7C7C] sm:text-base"
                />
                <Dialog.Close
                  className="grid size-8 shrink-0 place-items-center rounded-lg text-[#7C7C7C] transition-colors hover:bg-black/[0.06] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/50 dark:hover:bg-white/[0.07] dark:hover:text-white dark:focus-visible:ring-white/60"
                  aria-label="Close search"
                >
                  <X aria-hidden="true" className="size-[18px]" />
                </Dialog.Close>
              </div>

              <Command.List className="max-h-[min(55vh,400px)] overflow-y-auto overscroll-contain p-2 sm:p-3">
                <Command.Empty className="px-5 py-14 text-center">
                  <Search
                    aria-hidden="true"
                    className="mx-auto mb-3 size-6 text-[#7C7C7C]"
                  />
                  <p className="text-sm font-medium">No results found</p>
                  <p className="mt-1 text-xs text-[#7C7C7C]">
                    Try a subject, topic, question, or roadmap.
                  </p>
                </Command.Empty>

                {visibleGroups.map((group) => (
                  <Command.Group
                    key={group.label}
                    heading={group.label}
                    className="mb-2 overflow-hidden text-black last:mb-0 dark:text-white [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-[#7C7C7C]"
                  >
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Command.Item
                          key={`${group.label}:${item.title}`}
                          value={`${item.title} ${item.description}`}
                          keywords={item.keywords}
                          onSelect={() => openResult(item.href)}
                          className="group flex cursor-default select-none items-center gap-3 rounded-xl px-3 py-2.5 outline-none data-[selected=true]:bg-black/[0.07] data-[selected=true]:text-black dark:data-[selected=true]:bg-white/[0.1] dark:data-[selected=true]:text-white"
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-black/10 bg-black/[0.03] text-[#7C7C7C] group-data-[selected=true]:bg-black/[0.05] group-data-[selected=true]:text-black dark:border-white/10 dark:bg-white/[0.04] dark:group-data-[selected=true]:bg-white/[0.08] dark:group-data-[selected=true]:text-white">
                            <Icon aria-hidden="true" className="size-[17px]" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">
                              {item.title}
                            </span>
                            <span className="mt-0.5 block truncate text-xs text-[#7C7C7C] group-data-[selected=true]:text-black/60 dark:group-data-[selected=true]:text-white/60">
                              {item.description}
                            </span>
                          </span>
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4 shrink-0 -translate-x-1 text-[#7C7C7C] opacity-0 transition-[opacity,transform] group-data-[selected=true]:translate-x-0 group-data-[selected=true]:text-current group-data-[selected=true]:opacity-100"
                          />
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                ))}
              </Command.List>

              <div className="hidden h-10 items-center justify-between border-t border-black/10 px-5 text-[11px] text-[#7C7C7C] dark:border-white/10 sm:flex">
                <span>Search across all PrepLoom resources</span>
                <span className="flex items-center gap-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Open</span>
                  <span>Esc Close</span>
                </span>
              </div>
            </Command>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
