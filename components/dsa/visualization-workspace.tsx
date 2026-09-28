"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { SideDrawer } from "@/components/ui/side-drawer";
import { dsaVisualizationGroups } from "@/lib/dsa-visualizations";

const iconButton =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-neutral-600 hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2 dark:text-neutral-400 dark:hover:bg-white/10";

export function VisualizationWorkspace({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const current = dsaVisualizationGroups
    .flatMap((group) => group.lessons)
    .find((lesson) => lesson.href === pathname);

  function lessonNavigation(onNavigate?: () => void) {
    return (
      <nav aria-label="Visualization lessons" className="space-y-6">
        {dsaVisualizationGroups.map((group) => (
          <div key={group.title}>
            <h2 className="mb-2 px-3 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              {group.title}
            </h2>
            <ul className="space-y-1">
              {group.lessons.map((lesson) => {
                const active = pathname === lesson.href;
                return (
                  <li key={lesson.href}>
                    <Link
                      href={lesson.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 ${active ? "bg-neutral-200/70 font-medium text-neutral-950 dark:bg-neutral-800 dark:text-white" : "text-neutral-600 hover:bg-black/5 dark:text-neutral-400 dark:hover:bg-white/5"}`}
                    >
                      <BookOpen size={16} aria-hidden="true" />
                      {lesson.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-[1600px] items-start">
      <aside
        id="visualization-sidebar"
        aria-label="Visualization sidebar"
        className={`sticky top-[68px] hidden h-[calc(100dvh-68px)] shrink-0 overflow-y-auto border-r border-black/10 py-4 dark:border-white/10 lg:block ${collapsed ? "w-14 px-2" : "w-[220px] px-3"}`}
      >
        <div
          className={`mb-5 flex items-center ${collapsed ? "justify-center" : "justify-between pl-3"}`}
        >
          {!collapsed && (
            <span className="text-sm font-semibold tracking-tight">
              Visualizations
            </span>
          )}
          <button
            type="button"
            className={iconButton}
            aria-label={
              collapsed ? "Expand lesson sidebar" : "Collapse lesson sidebar"
            }
            aria-expanded={!collapsed}
            aria-controls="visualization-sidebar"
            onClick={() => setCollapsed(!collapsed)}
            title={
              collapsed ? "Expand lesson sidebar" : "Collapse lesson sidebar"
            }
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>
        {!collapsed && (
          <>
            <Link
              href="/dsa"
              className="mb-7 flex min-h-9 items-center gap-2 rounded-lg px-3 text-xs text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
            >
              <ArrowLeft size={14} />
              Back to DSA
            </Link>
            {lessonNavigation()}
          </>
        )}
      </aside>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-2 dark:border-white/10 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={drawerOpen}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-2 text-sm font-medium hover:bg-black/5 focus-visible:outline-2 dark:hover:bg-white/10"
          >
            <PanelLeftOpen size={17} />
            Browse algorithms
          </button>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {current?.title}
          </span>
        </div>
        <main
          id="visualizer-main"
          className="mx-auto w-full max-w-[1240px] px-4 py-4 sm:px-6 lg:px-7"
        >
          {children}
        </main>
      </div>

      <SideDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        title="Visualizations"
        description="Choose an algorithm to learn step by step."
      >
        <Link
          href="/dsa"
          onClick={() => setDrawerOpen(false)}
          className="mb-6 inline-flex min-h-10 items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400"
        >
          <ArrowLeft size={16} />
          Back to DSA
        </Link>
        {lessonNavigation(() => setDrawerOpen(false))}
      </SideDrawer>
    </div>
  );
}
