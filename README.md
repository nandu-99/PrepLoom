# PrepLoom

PrepLoom is a technical interview-preparation platform with structured computer science notes, interview questions, quizzes, roadmaps, and curated learning resources.

## Environments

PrepLoom uses two permanent Git branches and two separate Vercel projects.

| Environment | Git branch | URL                                                                |
| ----------- | ---------- | ------------------------------------------------------------------ |
| Staging     | `staging`  | [preploom-staging.vercel.app](https://preploom-staging.vercel.app) |
| Production  | `main`     | [preploom.vercel.app](https://preploom.vercel.app)                 |

Both are Production deployments inside their respective Vercel projects. Preview deployments remain enabled for other branches.

See [Staging and Production Operations](docs/environments-and-releases.md) for the complete architecture, environment variables, release process, verification checklist, and rollback procedure.

## Main features

- Structured notes for core and advanced computer science subjects
- Categorized technical and behavioral interview questions
- Topic search across the learning catalog
- Quizzes controlled through typed feature flags
- Study roadmaps and web-development resources
- Responsive light and dark themes
- Contact and feedback flows
- DSA sheets

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Vercel
- GitHub Actions
- ESLint and Prettier

## Local development

### Requirements

- Node.js 22, defined in `.nvmrc`
- npm

### Setup

```bash
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Local defaults:

```env
APP_ENV=development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
FEATURE_QUIZZES=false
ENABLE_STAGING_ANALYTICS=false
```

Never commit `.env.local` or real credentials.

## Commands

| Command                | Purpose                               |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start the local development server    |
| `npm run build`        | Create a production build             |
| `npm run start`        | Serve a production build              |
| `npm run lint`         | Run ESLint                            |
| `npm run typecheck`    | Run TypeScript without emitting files |
| `npm run format`       | Format the repository with Prettier   |
| `npm run format:check` | Check repository formatting           |

## Development workflow

Regular changes follow this path:

```text
feature branch → pull request into staging → manual staging QA
               → pull request into main → production verification
```

- Create regular feature branches from the latest `staging`.
- Merge and test changes on the stable staging URL first.
- Promote tested changes to `main` through a release pull request.
- Create urgent hotfixes from `main`, then synchronize the fix back into `staging`.
- Pull requests are a repository convention; they are not technically enforced on the private GitHub Free repository.

## Quality checks

GitHub Actions runs for pull requests and pushes targeting `staging` or `main`:

1. Install exact dependencies with `npm ci`.
2. Check changed files with Prettier.
3. Run ESLint.
4. Run TypeScript checks.
5. Create a Next.js production build.

The workflow does not deploy and does not contain Vercel IDs or tokens. Vercel deploys through its GitHub integration.

## Feature flags

Server-side feature flags are read from typed environment configuration in `lib/env.ts` and exposed through `lib/feature-flags.ts`.

Current flag:

```env
FEATURE_QUIZZES=false
```

Boolean flags accept only `true` or `false`. Invalid values fail the build. Changing a Vercel environment variable requires redeploying that project.

## Repository layout

```text
app/          Routes, layouts, metadata, and route handlers
components/   Shared and feature-specific UI
content/      Interview questions, quizzes, and subject content
docs/         Operational and content-maintenance documentation
lib/          Environment, feature, subject, and shared utilities
public/       Static assets and subject illustrations
scripts/      Repository utilities
```

## Operational documentation

- [Staging and Production Operations](docs/environments-and-releases.md)
- [Content Cleanup Log](docs/content-cleanup-log.md)
