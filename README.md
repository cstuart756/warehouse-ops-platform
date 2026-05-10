# Warehouse Ops Platform — Starter

This repository is a starter scaffold for a guided warehouse workflows + training platform.

What is included:
- Next.js (App Router) TypeScript scaffold
- Tailwind CSS setup
- Prisma schema and seed script
- Simple API route: `/api/workflows`
- Demo workflow seed

Quick start (PowerShell):

```powershell
cd warehouse-ops-platform
npm install
# For local demo we use SQLite by default (no external DB required).
# To use Postgres, set DATABASE_URL in .env.local before running migrations.
npx prisma generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Deploy to Vercel and set `DATABASE_URL` in environment variables.

Next steps:
- Add authentication (Clerk / NextAuth)
- Build admin UI to create workflows and steps
- Implement training/player UI and validation types
