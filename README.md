<div align="center">
  <h1>FlowForge</h1>
  <p><strong>Guide every shift. Train every operator.</strong></p>
  <p>A commercial-grade warehouse operations and training platform designed to digitise workflows, eliminate errors, and accelerate staff onboarding.</p>

  [![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Prisma](https://img.shields.io/badge/Prisma-4.15-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-316192?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
  [![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square)](https://clerk.com/)
  [![Deploy](https://img.shields.io/badge/Deploy-Heroku%20(EU)-430098?style=flat-square&logo=heroku)](https://www.heroku.com/)

  **[Live Demo](https://warehouse-ops-platform-eu-120c7c0e63c3.herokuapp.com)** • **[Report a Bug](https://github.com/cstuart756/warehouse-ops-platform/issues)** • **[Request a Feature](https://github.com/cstuart756/warehouse-ops-platform/issues)**
</div>

---

## 📖 Overview

Warehouses lose millions annually due to inefficient training, human error, and undocumented processes. FlowForge solves this by providing an "idiot-proof," step-by-step operational execution system.

This platform allows administrators to build digital playbooks for any warehouse operation (from Goods-In to Dispatch). Workers are guided through each step with strict safety warnings, completion checklists, and interactive assessments, ensuring 100% compliance and zero guesswork.

### The Complete Training Catalogue
FlowForge ships with a fully authored, production-ready 8-module training curriculum:
1. **SAFE-IND-001** — Warehouse Safety Induction (6 steps)
2. **GIN-REC-001** — Receive and Inspect a Delivery (8 steps)
3. **INV-PUT-001** — Put-Away Stock (6 steps)
4. **OUT-PICK-001** — Pick a Customer Order (8 steps)
5. **OUT-PACK-001** — Pack and Verify an Order (8 steps)
6. **OUT-DSP-001** — Dispatch Carrier Collection (6 steps)
7. **INV-CYC-001** — Cycle Count an Inventory Location (6 steps)
8. **INV-DMG-001** — Damaged Stock and Quarantine (6 steps)

*Total: 54 detailed steps, 29 assessment questions, and a built-in AI video integration pipeline.*

---

## ✨ Key Features

- **Step-by-Step Training Player:** A distraction-free, dark-themed UI that guides workers through each step. Includes critical safety warnings (red banners) and tick-box completion checks.
- **Relational Database Architecture:** A robust Prisma schema that handles `Workflows` → `Steps` → `AssessmentQuestions`, ensuring data integrity with cascading deletes.
- **Secure Authentication & Roles:** Integrated with Clerk for secure, enterprise-grade authentication. Middleware protects sensitive routes (`/dashboard`, `/admin`), ensuring only authorised personnel can access the backend.
- **Automated CI/CD:** Fully automated GitHub Actions pipeline that runs builds on every push and automatically deploys to Heroku (EU region) upon merging to `main`.
- **Idempotent Seeding System:** A modular seeding architecture (`prisma/seed/`) that allows developers to safely wipe and re-seed the database with the full training catalogue during development.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS
- **Backend:** Next.js Server Actions, REST API Routes
- **Database:** PostgreSQL (hosted on AWS EU-West-1), Prisma ORM
- **Authentication:** Clerk (Middleware & Role-based Access)
- **DevOps:** GitHub Actions (CI/CD), Heroku (PaaS)

### Database Schema (Simplified)
```prisma
model Workflow {
  id                  String   @id @default(cuid())
  code                String   @unique // e.g., SAFE-IND-001
  title               String
  department          String
  difficulty          Difficulty @default(BEGINNER)
  steps               Step[]
  assessmentQuestions AssessmentQuestion[]
}

model Step {
  id                        String   @id @default(cuid())
  title                     String
  objective                 String?
  content                   String
  warnings                  String[]
  completionChecks          String[]
  requiresSupervisorSignOff Boolean  @default(false)
  workflow                  Workflow @relation(fields: [workflowId], references: [id], onDelete: Cascade)
}
🚀 Getting Started (Local Development)
Prerequisites

    Node.js (v20.x)

    PostgreSQL database (local or cloud-hosted)

    Clerk account (for auth keys)

Installation

    Clone the repository:
    bash

    git clone https://github.com/cstuart756/warehouse-ops-platform.git
    cd warehouse-ops-platform

    Install dependencies:
    bash

    npm install

    Set up environment variables:
    Create a .env file in the root directory and add the following:
    env

    DATABASE_URL="postgresql://user:password@host:port/database"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
    CLERK_SECRET_KEY=sk_test_your_key
    SUPER_ADMIN_EMAILS="your-email@example.com"

    Initialize the database and seed the training catalogue:
    bash

    npx prisma migrate deploy
    npx prisma generate
    npm run prisma:seed

    Start the development server:
    bash

    npm run dev

    Open http://localhost:3000 to view the application.

🌍 Deployment & Infrastructure

This project is configured for automatic deployment to Heroku (EU Region) via GitHub Actions.

    CI (Continuous Integration): The .github/workflows/ci.yml file runs npm ci, npx prisma generate, and npm run build on every pull request to ensure no broken code is merged.

    CD (Continuous Deployment): The .github/workflows/heroku-deploy.yml file automatically deploys the application to Heroku upon a successful merge to main.

    Port Binding: The start script in package.json is explicitly configured to bind to Heroku's dynamic $PORT environment variable (next start -p $PORT), ensuring compatibility with Heroku's routing layer.

🗺️ Roadmap (Future Development)

    □

    Progress Tracking: Wire the "Complete Training" button to save user progress to the database, allowing managers to view completion rates.
    □

    Multi-Tenancy (SaaS): Isolate data by organisation, allowing multiple warehouses to use the platform concurrently.
    □

    Stripe Billing: Implement subscription tiers (Free / Pro / Enterprise).
    □

    AI Video Integration: Automatically embed AI-generated (HeyGen/ComfyUI) video walkthroughs into the training player.

👤 Author

Stuart Carey

    GitHub: @cstuart756

    LinkedIn: [Add your LinkedIn URL here]

📄 License

This project is licensed under the MIT License - see the LICENSE file for details.