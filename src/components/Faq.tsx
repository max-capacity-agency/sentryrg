'use client'

import { useId, useState } from 'react'
import Image from 'next/image'
import SectionHeading from './SectionHeading'
import styles from './Faq.module.css'

type Item = { q: string; a: string }

/*
 * Client-approved copy from the prototype.
 *
 * One question is deliberately NOT shipped: "Do you offer financing?"
 * Its answer in both Homepage.dc.html and Process.dc.html is the literal
 * placeholder "[PENDING — JJ to confirm whether financing is offered and
 * through whom.]". Rendering that on a live client site would be worse
 * than omitting the question. Restore it here once JJ answers.
 */
const ITEMS: Item[] = [
  {
    q: 'What does a new roof cost in San Antonio?',
    a: 'Most full replacements here land between $14,000 and $34,000 depending on size, pitch, and material — slate and copper run higher. Your free inspection comes with a written, itemized proposal that is fixed to the dollar.',
  },
  {
    q: 'Do you handle insurance and storm claims?',
    a: 'Yes. We photograph and document the damage, meet your adjuster on site, and prepare a scope that matches what your policy owes you. You deal with one foreman, not a claims maze.',
  },
  {
    q: 'How long does a replacement take?',
    a: 'Most homes take two to four days on the roof. Your proposal includes a written schedule, and your foreman confirms timing before the first pallet arrives.',
  },
  {
    q: 'How disruptive is the work?',
    a: 'It is a construction site for a few days — we will not pretend otherwise. But work runs daytime hours only, landscaping is protected, and the crew performs a full cleanup every evening, not just at the end.',
  },
  {
    q: 'What does the workmanship warranty cover?',
    a: 'Every seam, flashing and fastener we touch, for the lifetime of the work, in writing. We also come back for a courtesy inspection every year.',
  },
  {
    q: 'Do you use subcontractors?',
    a: 'Your job is run by our own foreman and JJ is on the roof himself every day of it — you always know who is on your property and who is accountable for the work.',
  },
  {
    q: 'What does the complimentary inspection involve?',
    a: 'We walk the roof, photograph everything, and hand you written findings within 48 hours — whether or not any work is needed. No pressure, no sales script.',
  },
]

export default function Faq() {
  /* One open at a time, as the prototype does. */
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.aside}>
          <SectionHeading kicker="FAQ" align="left">
            Common Questions
          </SectionHeading>
          <p className={styles.blurb}>
            Still wondering about something? Ask us directly — a real person, not a call center,
            replies within one business day.
          </p>
          <Image
            src="/assets/faq-photo.webp"
            alt="A Sentry Roofing estimator talking with a homeowner at the front door"
            width={1254}
            height={1254}
            className={styles.photo}
            sizes="(max-width: 760px) 100vw, 420px"
          />
        </div>

        <div className={styles.list}>
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            const panelId = `${baseId}-panel-${i}`
            const triggerId = `${baseId}-trigger-${i}`
            return (
              <div key={item.q} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    id={triggerId}
                    className={styles.trigger}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className={styles.marker} aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  className={styles.panel}
                  hidden={!isOpen}
                >
                  <p className={styles.answer}>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
