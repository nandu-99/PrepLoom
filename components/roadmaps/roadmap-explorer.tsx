"use client";

import { ArrowRight, Braces, Code2, Database } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

type Roadmap = {
  id: string;
  name: string;
  label: string;
  description: string;
  icon: LucideIcon;
  stages: Array<{
    title: string;
    description: string;
    topics: string;
  }>;
};

const roadmaps: Roadmap[] = [
  {
    id: "frontend",
    name: "Frontend",
    label: "For frontend roles",
    description:
      "Learn frontend development from HTML to production-ready Next.js.",
    icon: Code2,
    stages: [
      {
        title: "HTML",
        description:
          "Learn how to structure accessible and searchable web pages.",
        topics:
          "Document structure, semantic HTML, forms and validation, tables, images, audio, video, accessibility, SEO metadata",
      },
      {
        title: "CSS",
        description:
          "Build responsive layouts and understand how browser styling works.",
        topics:
          "Selectors, cascade, specificity, inheritance, box model, units, positioning, Flexbox, Grid, responsive design, transitions, animations, custom properties",
      },
      {
        title: "Git and Vercel deployment",
        description:
          "Track your work and publish frontend applications confidently.",
        topics:
          "Git basics, commits, branches, merging, pull requests, GitHub, environment variables, preview deployments, production deployments",
      },
      {
        title: "JavaScript",
        description:
          "Learn the language and browser APIs used in everyday frontend work.",
        topics:
          "Variables, data types, operators, functions, arrays, objects, DOM, events, modules, error handling, fetch, promises, async and await",
      },
      {
        title: "Tailwind CSS",
        description:
          "Use a utility-first CSS framework to build consistent interfaces.",
        topics:
          "Utility classes, responsive variants, state variants, layout, spacing, typography, colors, theme configuration, reusable component patterns",
      },
      {
        title: "Advanced JavaScript",
        description:
          "Understand the language behavior behind complex applications.",
        topics:
          "Scope, closures, hoisting, prototypes, this, event loop, microtasks, advanced promises, iterators, generators, memory, performance",
      },
      {
        title: "React",
        description:
          "Learn a component framework for building interactive applications.",
        topics:
          "Components, JSX, props, state, hooks, forms, routing, data fetching, context, performance, testing",
      },
      {
        title: "TypeScript and Next.js",
        description: "Add type safety and learn a production React framework.",
        topics:
          "Types, interfaces, unions, generics, narrowing, App Router, layouts, routing, Server Components, Client Components, data fetching, caching, route handlers, metadata",
      },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    label: "For backend roles",
    description:
      "Learn backend development from APIs and databases to scalable production systems.",
    icon: Database,
    stages: [
      {
        title: "Language and runtime foundations",
        description:
          "Build confidence in one backend language and its runtime.",
        topics:
          "Language syntax, data types, functions, OOP, modules, package management, error handling, asynchronous programming, memory basics, debugging, clean code",
      },
      {
        title: "APIs and networks",
        description: "Understand how clients and backend services communicate.",
        topics:
          "HTTP, HTTPS, request methods, status codes, headers, cookies, CORS, REST, API versioning, validation, pagination, DNS, TCP/IP, WebSockets",
      },
      {
        title: "Databases",
        description: "Store, query, and evolve application data safely.",
        topics:
          "Relational modelling, SQL, joins, normalization, indexes, transactions, ACID, NoSQL, schema design, ORMs, migrations, connection pooling",
      },
      {
        title: "Authentication and security",
        description: "Protect users, application data, and public endpoints.",
        topics:
          "Password hashing, sessions, cookies, JWT, OAuth, authorization, role-based access, input validation, SQL injection, XSS, CSRF, secrets, rate limiting",
      },
      {
        title: "Caching and asynchronous work",
        description:
          "Improve response times and move heavy work off request paths.",
        topics:
          "Caching strategies, Redis, cache invalidation, background jobs, message queues, pub-sub, retries, idempotency, scheduled jobs, event-driven systems",
      },
      {
        title: "Systems and scale",
        description: "Design services that remain reliable as usage grows.",
        topics:
          "Load balancing, horizontal scaling, replication, partitioning, consistency, CAP theorem, service boundaries, fault tolerance, availability, system design trade-offs",
      },
      {
        title: "Testing, observability, and deployment",
        description:
          "Prepare backend services for production and ongoing maintenance.",
        topics:
          "Unit testing, integration testing, API testing, logging, metrics, tracing, health checks, Docker, environment variables, CI/CD, cloud deployment, monitoring",
      },
    ],
  },
  {
    id: "dsa",
    name: "DSA Practice",
    label: "For coding rounds",
    description:
      "Practise core data structures and finish with a no-hints mixed round.",
    icon: Braces,
    stages: [
      {
        title: "Arrays, strings, and complexity",
        description:
          "Build the foundation for analysing and solving common problems.",
        topics: "Arrays, strings, time complexity, space complexity",
      },
      {
        title: "Recursion, binary search, and sorting",
        description:
          "Learn core techniques for dividing and ordering problem spaces.",
        topics: "Recursion, binary search, sorting",
      },
      {
        title: "Linked lists, stacks, and queues",
        description: "Learn pointer movement and ordered data processing.",
        topics: "Linked lists, stacks, queues",
      },
      {
        title: "Trees",
        description: "Understand hierarchical data and recursive traversal.",
        topics: "Tree traversal, binary search trees, tree height",
      },
      {
        title: "Graphs",
        description: "Traverse connected data and identify cycles.",
        topics: "BFS, DFS, cycle detection",
      },
      {
        title: "Hashing and window patterns",
        description: "Recognise efficient patterns for arrays and strings.",
        topics: "Hashing, sliding window, two pointers",
      },
      {
        title: "Dynamic programming",
        description: "Solve optimization problems using reusable subproblems.",
        topics:
          "Knapsack, longest common subsequence, longest increasing subsequence",
      },
      {
        title: "No-hints practice",
        description:
          "Solve a mixed problem without being told which pattern to use.",
        topics: "Any topic, no hints",
      },
    ],
  },
];

export function RoadmapExplorer() {
  const [activeId, setActiveId] = useState(roadmaps[0].id);
  const reduceMotion = useReducedMotion();
  const activeRoadmap =
    roadmaps.find((roadmap) => roadmap.id === activeId) ?? roadmaps[0];
  const ActiveIcon = activeRoadmap.icon;

  return (
    <div className="grid overflow-hidden rounded-[20px] border border-black/[0.1] bg-black/[0.025] dark:border-white/[0.11] dark:bg-white/[0.025] lg:grid-cols-[360px_minmax(0,1fr)]">
      <div className="border-b border-black/[0.09] bg-[#ededeb]/55 p-3 dark:border-white/[0.1] dark:bg-[#121212] lg:border-b-0 lg:border-r lg:p-4">
        <div className="px-3 pb-4 pt-3">
          <p className="text-[12px] font-medium">Choose your goal</p>
          <p className="mt-1 text-[12px] leading-5 text-[#606060] dark:text-[#a8a8a8]">
            You can change paths at any time.
          </p>
        </div>

        <div className="grid gap-1.5" role="tablist" aria-label="Roadmaps">
          {roadmaps.map((roadmap) => {
            const Icon = roadmap.icon;
            const active = roadmap.id === activeRoadmap.id;

            return (
              <button
                key={roadmap.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="selected-roadmap"
                onClick={() => setActiveId(roadmap.id)}
                className={`group grid min-h-[82px] w-full grid-cols-[40px_1fr_auto] items-center gap-3 rounded-[12px] px-3 py-3 text-left transition-[background-color,color,transform] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:focus-visible:ring-white/50 ${
                  active
                    ? "bg-[#f7f7f5] text-[#151515] shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:bg-[#202020] dark:text-[#f3f3f1]"
                    : "text-[#606060] hover:bg-black/[0.035] hover:text-[#151515] dark:text-[#a8a8a8] dark:hover:bg-white/[0.045] dark:hover:text-white"
                }`}
              >
                <span className="grid size-10 place-items-center rounded-[10px] border border-black/[0.09] bg-black/[0.02] dark:border-white/[0.1] dark:bg-white/[0.035]">
                  <Icon
                    className="size-[18px]"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium">
                    {roadmap.name}
                  </span>
                  <span className="mt-1 block text-[11px] text-[#777] dark:text-[#858585]">
                    {roadmap.label}
                  </span>
                </span>
                <ArrowRight
                  className={`size-4 transition-transform ${
                    active
                      ? "translate-x-0"
                      : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="selected-roadmap"
        role="tabpanel"
        className="min-w-0 bg-[#f7f7f5] p-5 dark:bg-[#0a0a0a] sm:p-8 lg:p-11"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeRoadmap.id}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -5 }}
            transition={{
              duration: reduceMotion ? 0 : 0.22,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="border-b border-black/[0.09] pb-8 dark:border-white/[0.1]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-[10px] border border-black/[0.1] dark:border-white/[0.11]">
                    <ActiveIcon
                      className="size-[18px]"
                      strokeWidth={1.55}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[12px] text-[#606060] dark:text-[#a8a8a8]">
                    {activeRoadmap.label}
                  </span>
                </div>
                <h2 className="mt-6 text-balance text-[clamp(2.1rem,4vw,3.7rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
                  {activeRoadmap.name}
                </h2>
                <p className="mt-4 max-w-[58ch] text-[14px] leading-7 text-[#555] dark:text-[#b3b3b3]">
                  {activeRoadmap.description}
                </p>
              </div>
            </div>

            <ol className="mt-8">
              {activeRoadmap.stages.map((stage, index) => (
                <li
                  key={stage.title}
                  className="group relative grid grid-cols-[34px_minmax(0,1fr)] gap-4 pb-9 last:pb-0 sm:grid-cols-[42px_minmax(0,1fr)] sm:gap-6 sm:pb-10"
                >
                  {index < activeRoadmap.stages.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-[16.5px] top-9 w-px bg-black/[0.12] dark:bg-white/[0.14] sm:left-[20.5px] sm:top-11"
                    />
                  )}
                  <span className="relative grid size-[34px] place-items-center rounded-[9px] border border-black/[0.12] bg-[#f7f7f5] text-[11px] font-medium text-[#606060] dark:border-white/[0.14] dark:bg-[#0a0a0a] dark:text-[#a8a8a8] sm:size-[42px] sm:rounded-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 pt-1 sm:pt-1.5">
                    <h3 className="text-[16px] font-medium tracking-[-0.02em] sm:text-[17px]">
                      {stage.title}
                    </h3>
                    <p className="mt-1.5 max-w-[55ch] text-[12px] leading-6 text-[#606060] dark:text-[#a8a8a8] sm:text-[13px]">
                      {stage.description}
                    </p>
                    <div className="mt-4 border-l-2 border-black/[0.14] pl-4 dark:border-white/[0.16]">
                      <p className="text-[11px] font-medium text-[#505050] dark:text-[#b8b8b8]">
                        Know these before moving on
                      </p>
                      <p className="mt-1.5 max-w-[78ch] text-[12px] leading-6 text-[#777] dark:text-[#999] sm:text-[13px]">
                        {stage.topics}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
