import '../styles/globals.css'
import React from 'react'
import Link from 'next/link'
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google'
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { hasClerkConfig } from '../lib/clerk-config'

const headingFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' })
const bodyFont = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600', '700'] })

export const metadata = {
  title: 'Warehouse Ops Platform',
  description: 'Guided workflows and training for warehouse operations',
  icons: {
    icon: '/images/41baf219-2083-4480-8963-24aafd2c881a.png',
    shortcut: '/images/41baf219-2083-4480-8963-24aafd2c881a.png',
    apple: '/images/41baf219-2083-4480-8963-24aafd2c881a.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const useClerk = hasClerkConfig()

  const headerContent = useClerk ? (
    <>
      <Show when="signed-out">
        <SignInButton />
        <SignUpButton />
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </>
  ) : (
    <span className="text-slate-400">Authentication unavailable in this environment</span>
  )

  const body = (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="brand-mark" aria-label="FlowForge home">
            <span className="brand-mark__icon">F</span>
            <span>FlowForge</span>
          </Link>
          <nav className="site-nav" aria-label="Primary navigation">
            <Link href="/workflows">Workflows</Link>
            <Link href="/training">Training</Link>
            <Link href="/dashboard">Operations</Link>
          </nav>
          <div className="site-header__actions">
            {headerContent}
          </div>
        </div>
      </header>
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">{children}</div>
      </main>
    </>
  )

  if (!useClerk) {
    return (
      <html lang="en">
        <body className={`${headingFont.variable} ${bodyFont.variable} font-[var(--font-body)] antialiased`}>
          {body}
        </body>
      </html>
    )
  }

  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-[var(--font-body)] antialiased`}>
        <ClerkProvider>
          {body}
        </ClerkProvider>
      </body>
    </html>
  )
}
