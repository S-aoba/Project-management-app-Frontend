import { QueryProvider } from '@/providers/query-provider'
import type { Metadata } from 'next'

import localFont from 'next/font/local'

import { Modals } from '@/components/modals'

import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
  preload: false
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
  preload: false
})

export const metadata: Metadata = {
  title: 'Project management app',
  description: 'Project management app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <Modals />
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
