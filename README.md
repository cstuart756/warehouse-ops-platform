# Warehouse Ops Platform

Guided warehouse workflows and training platform for office-to-floor operations.

## What’s included

- Next.js App Router application with TypeScript
- Clerk authentication with protected task routes
- Prisma schema, migrations, and seed script
- Workflow admin builder and guided training player
- Task execution flow with per-step progress tracking
- GitHub Actions CI plus Heroku deployment workflow

## Local setup

```powershell
cd warehouse-ops-platform
npm install
npx prisma generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

## Environment variables

Copy [.env.example](.env.example) to `.env.local` and fill in the values for local development.

## Heroku deployment

Use the Heroku app name `warehouse-ops-platform-eu`.

Required Heroku config vars:

- `DATABASE_URL`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

Deploys are handled by [.github/workflows/heroku-deploy.yml](.github/workflows/heroku-deploy.yml).

## Suggested next steps

- Connect a Postgres database in an EU region
- Add Heroku config vars and run the first deploy
- Replace demo content with live warehouse training materials
