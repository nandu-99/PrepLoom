import "server-only";

export type AppEnvironment = "development" | "staging" | "production";

function readAppEnvironment(value: string | undefined): AppEnvironment {
  if (value === undefined || value === "") return "development";

  if (
    value === "development" ||
    value === "staging" ||
    value === "production"
  ) {
    return value;
  }

  throw new Error('APP_ENV must be "development", "staging", or "production".');
}

function readBooleanFlag(
  name: string,
  value: string | undefined,
  defaultValue = false,
) {
  if (value === undefined || value === "") return defaultValue;
  if (value === "true") return true;
  if (value === "false") return false;

  throw new Error(`${name} must be "true" or "false".`);
}

export const env = Object.freeze({
  appEnvironment: readAppEnvironment(process.env.APP_ENV),
  analytics: Object.freeze({
    enableInStaging: readBooleanFlag(
      "ENABLE_STAGING_ANALYTICS",
      process.env.ENABLE_STAGING_ANALYTICS,
    ),
  }),
  features: Object.freeze({
    quizzes: readBooleanFlag("FEATURE_QUIZZES", process.env.FEATURE_QUIZZES),
  }),
});

export const isProductionEnvironment = env.appEnvironment === "production";
export const isAnalyticsEnabled =
  isProductionEnvironment ||
  (env.appEnvironment === "staging" && env.analytics.enableInStaging);
