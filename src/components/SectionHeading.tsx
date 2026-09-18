import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

type Props = {
  kicker: string
  children: ReactNode
  lead?: ReactNode
  /** Which ground this sits on; picks the contrast-safe kicker colour. */
  tone?: 'light' | 'dark'
  align?: 'center' | 'left'
}

export default function SectionHeading({
  kicker,
  children,
  lead,
  tone = 'light',
  align = 'center',
}: Props) {
  const dark = tone === 'dark'
  return (
    <div className={`${styles.wrap} ${align === 'left' ? styles.left : ''}`}>
      <p className={`${styles.kicker} ${dark ? styles.onDark : styles.onLight}`}>{kicker}</p>
      <h2 className={`${styles.heading} ${dark ? styles.headingOnDark : ''}`}>{children}</h2>
      {lead && (
        <p className={`${styles.lead} ${dark ? styles.leadOnDark : styles.leadOnLight}`}>{lead}</p>
      )}
    </div>
  )
}
