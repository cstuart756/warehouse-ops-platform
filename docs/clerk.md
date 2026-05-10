# Clerk Authentication Setup

This project includes a Clerk integration scaffold. Follow these steps to enable authentication locally and in Vercel.

1. Create a Clerk account at https://clerk.com and create a new application.

2. In your Clerk dashboard, copy these values:
   - `NEXT_PUBLIC_CLERK_FRONTEND_API` (frontend API key)
   - `CLERK_SECRET_KEY` (server secret)

3. Locally, create a `.env.local` file in the project root and add:

```
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_FRONTEND_API="your_frontend_api"
CLERK_SECRET_KEY="your_clerk_secret"
```

4. Install dependencies:

```powershell
npm install
```

5. Start the dev server:

```powershell
npm run dev
```

6. Visit `/dashboard` — the middleware will require sign-in. Use the Clerk-hosted sign-in flow.

7. For Vercel deployment, add the same environment variables in the Vercel project settings.

Notes:
- The middleware protects `/dashboard`, `/workflows`, and `/api/*` paths. Adjust `middleware.ts` matcher as needed.
- If you prefer NextAuth instead of Clerk, ask and I will convert the scaffold.
