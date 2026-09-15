import type { Metadata } from 'next'
import { openSauce, jakarta } from '@/lib/fonts'
import { BRAND, SITE_URL } from '@/lib/site'
import '@/styles/global.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND} | Roofing in San Antonio & the Texas Hill Country`,
    template: `%s | ${BRAND}`,
  },
  description:
    'Roof replacement, repair, inspections and storm damage claims across San Antonio, New Braunfels, Austin and the Hill Country.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSauce.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  )
}
