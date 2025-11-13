import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Full-Stack Mini Project',
  description: 'Role-based authentication application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

