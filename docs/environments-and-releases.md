# Staging and Production Operations

This document is the source of truth for PrepLoom environments, deployments, environment variables, feature flags, releases, and rollbacks.

## Architecture

The private GitHub repository is connected to two independent Vercel projects.

| Environment | Git branch | Vercel project     | Stable domain                         | Vercel deployment type |
| ----------- | ---------- | ------------------ | ------------------------------------- | ---------------------- |
| Staging     | `staging`  | `preploom-staging` | `https://preploom-staging.vercel.app` | Production             |
| Production  | `main`     | `preploom`         | `https://preploom.vercel.app`         | Production             |

The staging site is not a Vercel Preview environment. It is the Production deployment of the separate `preploom-staging` project.

Other Git branches can still create Vercel Preview deployments because Preview deployments are enabled on both projects. Consequently, a push to `staging` can appear in the `preploom` project as a Preview deployment while simultaneously becoming a Production deployment in `preploom-staging`. That Preview deployment does not replace `preploom.vercel.app`.

## Permanent branches

### `staging`

- Integration and manual QA branch
- Automatically updates `preploom-staging.vercel.app`
- Must remain available permanently
- Normally receives pull requests from feature, fix, and chore branches

### `main`

- Production branch
- Automatically updates `preploom.vercel.app`
- Receives changes after staging verification
- Should not receive ordinary direct pushes

## Standard branch flow

```text
staging
  └── feature/example
        └── PR into staging
              └── staging deployment and manual QA
                    └── PR from staging into main
                          └── production deployment and verification
```

Pull requests are a working convention rather than an enforced rule because protected branches for private repositories are not part of the selected GitHub Free setup.

Temporary branches may remain after merging, but they should not be reused for unrelated work.

## Vercel configuration

### Staging project

```text
Project: preploom-staging
Production branch: staging
Production domain: preploom-staging.vercel.app
```

### Production project

```text
Project: preploom
Production branch: main
Production domain: preploom.vercel.app
```

Vercel project IDs, organization IDs, and deployment tokens are not stored in GitHub. Deployments are performed by the Vercel GitHub integration configured through the Vercel dashboard.

## Environment variables

Configure variables independently in each Vercel project under **Settings → Environment Variables**.

### Staging Production variables

```env
APP_ENV=staging
NEXT_PUBLIC_SITE_URL=https://preploom-staging.vercel.app
FEATURE_QUIZZES=true
ENABLE_STAGING_ANALYTICS=false
```

### Production variables

```env
APP_ENV=production
NEXT_PUBLIC_SITE_URL=https://preploom.vercel.app
FEATURE_QUIZZES=false
```

### Local variables

Copy `.env.example` to `.env.local`:

```env
APP_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
FEATURE_QUIZZES=false
ENABLE_STAGING_ANALYTICS=false
```

### Validation rules

- `APP_ENV` accepts only `development`, `staging`, or `production`.
- `FEATURE_QUIZZES` and `ENABLE_STAGING_ANALYTICS` accept only `true` or
  `false`.
- Missing values use safe development defaults.
- Server-only secrets must never use the `NEXT_PUBLIC_` prefix.
- Environment files and credentials must not be committed.

Changes to these variables require a redeployment because the current application reads them during the Next.js build and rendering lifecycle.

## Feature flags

Typed environment variables are parsed in `lib/env.ts`. Server-only flags are exposed through `lib/feature-flags.ts`.

### Quiz rollout

| Environment   | `FEATURE_QUIZZES` | Behavior                 |
| ------------- | ----------------- | ------------------------ |
| Local default | `false`           | Coming Soon page         |
| Staging       | `true`            | Quiz is available for QA |
| Production    | `false`           | Quiz remains unavailable |

The quiz flag controls direct page behavior and sitemap availability. A disabled feature must not rely only on hiding a navigation link.

To release quizzes in production:

1. Verify the enabled quiz on staging.
2. Ensure the same code has reached `main`.
3. Change `FEATURE_QUIZZES` to `true` in the production Vercel project.
4. Redeploy the current production commit.
5. Verify the quiz directly in production.
6. Remove the flag after the rollout is stable and the fallback is no longer needed.

## Search-engine and analytics behavior

### Staging, local, and unspecified environments

- Page metadata uses `noindex, nofollow`.
- `robots.txt` disallows all crawlers.
- `sitemap.xml` contains an empty URL set.
- Google site verification is omitted.
- Google Analytics is not loaded by default.

### Production

- Pages allow indexing and following.
- `robots.txt` allows crawling and links to the production sitemap.
- The sitemap contains available production routes.
- Google verification is enabled.
- Google Analytics is loaded.

### Temporary staging Analytics validation

To validate Analytics with Tag Assistant without enabling production indexing
behavior:

1. Keep `APP_ENV=staging` in the `preploom-staging` project.
2. Set `ENABLE_STAGING_ANALYTICS=true` for the staging project's Production
   environment.
3. Redeploy staging and complete the Tag Assistant and GA4 DebugView checks.
4. Set `ENABLE_STAGING_ANALYTICS=false` (or remove it) and redeploy after QA.

The flag is ignored outside the staging application environment. Staging uses
the existing GA4 measurement ID while enabled, so identify test traffic by the
`preploom-staging.vercel.app` hostname. The flag changes only Analytics loading;
staging metadata, robots, sitemap, and Google verification remain non-production.

`noindex` and `robots.txt` discourage discovery but do not restrict access. The staging domain is currently publicly reachable. If access restriction becomes necessary, use application-level staging authentication or a paid platform protection option.

## GitHub Actions

The `Quality` workflow runs on pull requests and pushes targeting `staging` or `main`.

```text
npm ci
  → Prettier check for changed files
  → ESLint
  → TypeScript
  → Next.js production build
```

Operational details:

- Node.js is read from `.nvmrc`.
- npm downloads are cached.
- Older runs are cancelled when a newer commit arrives for the same ref.
- Workflow permissions are read-only.
- The job has a 15-minute timeout.
- CI does not deploy and does not receive Vercel secrets.
- Prettier currently checks changed files to avoid a single unrelated formatting rewrite across legacy content.

Vercel deployments and GitHub Actions run independently. Therefore, merge only after the pull-request Quality check succeeds. A direct push can cause Vercel to deploy while the push workflow is still running.

## Regular release procedure

### 1. Start work

Create a branch from the latest `staging`:

```bash
git fetch origin
git switch staging
git pull --ff-only origin staging
git switch -c feature/short-description
```

### 2. Validate locally

```bash
npm ci
npm run lint
npm run typecheck
npm run build
```

Format changed files before pushing:

```bash
npx prettier --write path/to/changed-file.ts
```

### 3. Merge into staging

1. Push the feature branch.
2. Open a pull request with `staging` as the base.
3. Wait for GitHub Actions and Vercel checks.
4. Merge the pull request.
5. Confirm the stable staging project deploys from the `staging` branch.

### 4. Verify staging

Check at least:

- Homepage and navigation
- Search
- Changed subject or interview-question pages
- Responsive layouts
- Light and dark themes
- Direct feature-flagged routes
- `robots.txt`
- `sitemap.xml`
- Contact and feedback behavior when relevant

### 5. Promote to production

1. Open a pull request with `main` as the base and `staging` as the compare branch.
2. Review the complete release diff.
3. Wait for the Quality and Vercel checks.
4. Merge into `main`.
5. Confirm the `preploom` Vercel project creates a Production deployment from `main`.

### 6. Verify production

Check:

```text
https://preploom.vercel.app
https://preploom.vercel.app/robots.txt
https://preploom.vercel.app/sitemap.xml
```

Also confirm:

- The production deployment is marked Production.
- Production pages are indexable.
- Only intended features are enabled.
- The GitHub Actions push workflow passes on `main`.

## Hotfix procedure

Urgent production fixes start from `main`:

```text
main → hotfix/short-description → PR into main → production verification
```

After production is fixed, synchronize the change back into staging:

```text
main → PR or merge into staging
```

This prevents a future staging release from reverting the hotfix.

## Rollback procedure

### Staging rollback

1. Open the `preploom-staging` project in Vercel.
2. Select the last known-good Production deployment.
3. Use Vercel's rollback action.
4. Revert or fix the corresponding `staging` commit.

### Production rollback

1. Open the `preploom` project in Vercel.
2. Roll back to the last known-good Production deployment.
3. Revert or fix the corresponding `main` commit.
4. Synchronize the correction back into `staging`.

If an incident is isolated behind a feature flag, disable the production flag and redeploy before preparing the permanent code correction.

## Environment verification matrix

| Check             | Staging expectation           | Production expectation |
| ----------------- | ----------------------------- | ---------------------- |
| Stable branch     | `staging`                     | `main`                 |
| Stable domain     | `preploom-staging.vercel.app` | `preploom.vercel.app`  |
| `APP_ENV`         | `staging`                     | `production`           |
| Quiz flag         | Enabled                       | Disabled until release |
| Robots            | `Disallow: /`                 | `Allow: /`             |
| Sitemap           | Empty                         | Production routes      |
| Metadata indexing | Disabled                      | Enabled                |
| Google Analytics  | Disabled                      | Enabled                |
| Public access     | Currently public              | Public                 |

## Operational log

### 2026-08-14 — Separate environments established

- Kept the GitHub repository private.
- Created permanent `staging` and `main` branches.
- Connected the repository to separate `preploom-staging` and `preploom` Vercel projects.
- Configured `staging` and `main` as the projects' respective Production branches.
- Kept Vercel Preview deployments enabled.

### 2026-08-14 — Typed flags and environment isolation

- Added typed parsing for `APP_ENV` and `FEATURE_QUIZZES`.
- Enabled quizzes in staging while keeping them disabled in production.
- Disabled indexing, sitemaps, verification, and analytics outside production.

### 2026-08-14 — CI quality checks

- Added GitHub Actions checks for npm installation, changed-file formatting, ESLint, TypeScript, and production builds.
- Standardized CI on Node.js 22.
- Kept deployment credentials out of GitHub Actions.
