import '../styles/globals.css'
import React from 'react'
import { Space_Grotesk, IBM_Plex_Sans } from 'next/font/google'
import ClerkProviderClient from '../components/ClerkProviderClient'

const headingFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading' })
const bodyFont = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600', '700'] })

export const metadata = {
  title: 'Warehouse Ops Platform',
  description: 'Guided workflows and training for warehouse operations'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={`${headingFont.variable} ${bodyFont.variable} font-[var(--font-body)] antialiased`}>
        <ClerkProviderClient>
          <main className="min-h-screen">
            <div className="max-w-6xl mx-auto p-6">{children}</div>
          </main>
        </ClerkProviderClient>
      </body>
    </html>
  )
}
