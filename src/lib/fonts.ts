import localFont from 'next/font/local'
import { Plus_Jakarta_Sans } from 'next/font/google'

/*
 * Headings. Open Sauce One, SIL OFL 1.1.
 * Self-hosted from public/fonts (see public/fonts/OFL.txt).
 *
 * The design prototype loaded this from db.onlinewebfonts.com, which
 * redistributes without licence. Do not reintroduce that source.
 * Upstream: https://github.com/marcologous/Open-Sauce-Fonts
 */
export const openSauce = localFont({
  src: [
    { path: '../../public/fonts/OpenSauceOne-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/OpenSauceOne-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-open-sauce',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})

/* Body, UI, kickers. */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
})
