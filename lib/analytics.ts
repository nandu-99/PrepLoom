"use client";

import { sendGAEvent } from "@next/third-parties/google";

export type AnalyticsEventName =
  | "navigation_click"
  | "subject_select"
  | "topic_view"
  | "study_mode_change"
  | "reading_layout_change"
  | "topic_complete"
  | "topic_save"
  | "search"
  | "content_scroll"
  | "content_engaged";

type AnalyticsValue = string | number | boolean;

export type AnalyticsParameters = Record<string, AnalyticsValue | undefined>;

export function trackEvent(
  eventName: AnalyticsEventName,
  parameters: AnalyticsParameters = {},
) {
  const cleanParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined),
  );

  sendGAEvent("event", eventName, cleanParameters);

  if (process.env.NODE_ENV === "development") {
    console.debug("[PrepLoom Analytics]", eventName, cleanParameters);
  }
}
