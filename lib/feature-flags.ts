import "server-only";

import { env } from "@/lib/env";
import type { ReleaseAvailability } from "@/lib/release-status";

export const featureFlags = Object.freeze({
  quizzes: env.features.quizzes,
});

export const quizAvailability: ReleaseAvailability = featureFlags.quizzes
  ? "available"
  : "coming-soon";
