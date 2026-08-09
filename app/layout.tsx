import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Inter } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const _manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' })
const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Nazar — India\'s Consumer Opportunity Radar',
  description:
    'AI-powered consumer opportunity discovery platform for India. Analyze consumer signals, discover emerging patterns, and find actionable opportunities for brand builders.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fafaf9',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_manrope.variable} ${_inter.variable} bg-background`}>
      <body className="antialiased font-sans">
        <TooltipProvider delay={200}>{children}</TooltipProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
