import '../styles/globals.css'
import React from 'react'
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

const headingFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' })
const bodyFont = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600', '700'] })

export const metadata = {
  title: 'Warehouse Ops Platform',
  description: 'Guided workflows and training for warehouse operations'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-[var(--font-body)] antialiased`}>
        <ClerkProvider>
          <header className="flex items-center justify-end gap-3 border-b border-white/10 px-6 py-4 text-sm text-slate-200">
            <Show when="signed-out">
              <SignInButton />
              <SignUpButton />
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </header>
          <main className="min-h-screen">
            <div className="max-w-6xl mx-auto p-6">{children}</div>
          </main>
        </ClerkProvider>
      </body>
    </html>
  )
}
