import { SignIn } from '@clerk/nextjs'

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function SignInPage() {
  if (!publishableKey) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-md rounded border bg-white p-6">
          <h1 className="text-2xl font-semibold">Sign-in unavailable</h1>
          <p className="mt-2 text-sm text-gray-600">
            Clerk is not configured in this environment yet. Add the Clerk publishable key to enable sign-in.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </div>
  )
}