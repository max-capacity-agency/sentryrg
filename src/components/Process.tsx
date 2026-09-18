'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import SectionHeading from './SectionHeading'
import styles from './Process.module.css'

/*
 * NOTE: the prototype defines FOUR steps, not five.
 * REBUILD.md describes a "five-step process" and the asset set ships
 * proc-1 through proc-5, but Homepage.dc.html only renders steps 1-4 and
 * Process.dc.html agrees. Built to the prototype; flagged for the client.
 */
const STEPS = [
  {
    title: 'Free Inspection',
    body: 'We walk the roof, photograph everything, and hand you written findings. No cost and no obligation.',
    image: '/assets/proc-1.webp',
    alt: 'Material options laid out for a homeowner',
  },
  {
    title: 'Written Fixed Proposal',
    body: 'An itemized, fixed-price proposal in writing. On an insurance claim we build the scope to match what your policy owes you.',
    image: '/assets/proc-2.webp',
    alt: 'Consultation walk-through with a homeowner',
  },
  {
    title: 'Schedule the Work',
    body: 'Pick a window that suits your household. Your foreman confirms the schedule in writing before the first pallet arrives.',
    image: '/assets/proc-3.webp',
    alt: 'Scheduling the job',
  },
  {
    title: 'Perform the Work',
    body: 'The crew arrives and the roof goes on — a dedicated foreman, photos to your phone every day, and a magnet-rolled yard before we leave.',
    image: '/assets/proc-4.webp',
    alt: 'The crew at work on a roof',
  },
]

const ADVANCE_MS = 5000

export default function Process() {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setActive((i) => (i + 1) % STEPS.length), ADVANCE_MS)
    return () => clearInterval(t)
  }, [auto])

  const step = STEPS[active]

  return (
    <section id="process" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <SectionHeading kicker="The Process" align="left">
            From inspection to <em>done</em>
          </SectionHeading>
        </div>

        <div className={styles.stage}>
          <div className={styles.copy}>
            <p className={styles.stepLabel}>Step {active + 1}</p>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </div>
          <Image
            key={step.image}
            src={step.image}
            alt={step.alt}
            width={1254}
            height={1254}
            className={styles.photo}
            sizes="(max-width: 760px) 100vw, 480px"
          />
        </div>

        <div className={styles.steps}>
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={`${styles.step} ${i === active ? styles.stepActive : ''}`}
              aria-current={i === active}
              onClick={() => {
                setActive(i)
                /* A deliberate choice stops the carousel moving under them. */
                setAuto(false)
              }}
            >
              Step {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
