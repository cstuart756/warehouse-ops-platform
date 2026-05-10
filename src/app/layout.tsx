import './styles/globals.css'
import React from 'react'
import ClerkProviderClient from '@/components/ClerkProviderClient'

export const metadata = {
  title: 'Warehouse Ops Platform',
  description: 'Guided workflows and training for warehouse operations'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ClerkProviderClient>
          <main className="min-h-screen">
            <div className="max-w-6xl mx-auto p-6">{children}</div>
          </main>
        </ClerkProviderClient>
      </body>
    </html>
  )
}
