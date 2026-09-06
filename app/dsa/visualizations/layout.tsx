import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { VisualizationWorkspace } from "@/components/dsa/visualization-workspace";

export default function VisualizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-[100dvh] bg-[#f7f7f5] font-[family-name:var(--font-geist-sans)] text-[#151515] dark:bg-[#0a0a0a] dark:text-[#f3f3f1]">
      <a
        href="#visualizer-main"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-neutral-800 px-4 py-2 text-white focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <VisualizationWorkspace>{children}</VisualizationWorkspace>
      <SiteFooter />
    </div>
  );
}
