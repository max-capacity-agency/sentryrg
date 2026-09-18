'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { PHONE_HREF } from '@/lib/site'
import cta from '@/styles/cta.module.css'
import styles from './Hero.module.css'

/*
 * Homepage video hero.
 *
 * The headline cycles a gold word every 2.8s with a 340ms fade, matching
 * the prototype's rotIdx/rotOn timers. Motion is suppressed under
 * prefers-reduced-motion, where the first word simply stays put.
 */
const ROTATING_WORDS = ['Most Trusted', 'Top Rated', 'Most Competent']
const ROTATE_MS = 2800
const FADE_MS = 340

const TRUST = [
  'Fully Insured',
  'Veteran Owned & Operated',
  'Free Inspections',
  '25 Years in the Trade',
]

/* Google wordmark, per-letter brand colours as in the prototype. */
const GOOGLE_LETTERS: [string, string][] = [
  ['G', '#4285f4'],
  ['o', '#ea4335'],
  ['o', '#fbbc05'],
  ['g', '#4285f4'],
  ['l', '#34a853'],
  ['e', '#ea4335'],
]

export default function Hero() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let fade: ReturnType<typeof setTimeout>
    const tick = setInterval(() => {
      setVisible(false)
      fade = setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_WORDS.length)
        setVisible(true)
      }, FADE_MS)
    }, ROTATE_MS)

    return () => {
      clearInterval(tick)
      clearTimeout(fade)
    }
  }, [])

  return (
    <header id="top" className={styles.hero}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/hero-poster.webp"
        aria-hidden="true"
      >
        {/* VP9 first: browsers that support it get the smaller file. */}
        <source src="/assets/hero-video-2.webm" type="video/webm" />
        <source src="/assets/hero-video-2.mp4" type="video/mp4" />
      </video>
      <div className={styles.scrim} />

      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.google} aria-label="Google">
            {GOOGLE_LETTERS.map(([ch, color], i) => (
              <span key={i} style={{ color }} aria-hidden="true">
                {ch}
              </span>
            ))}
          </span>
          <span className={styles.badgeRule} />
          <span className={styles.badgeScore}>4.9</span>
          <span className={styles.badgeStars} aria-hidden="true">
            ★★★★★
          </span>
          <span className={styles.badgeCount}>187 reviews</span>
        </div>

        <p className={styles.kicker}>
          Premium Roofing · Serving San Antonio &amp; Surrounding Areas
        </p>

        <h1 className={styles.title}>
          San Antonio&apos;s{' '}
          <em className={`${styles.rotator} ${visible ? '' : styles.rotatorOut}`}>
            {ROTATING_WORDS[index]}
          </em>{' '}
          Roofing Company
        </h1>

        <p className={styles.lead}>
          Most roofing projects run over budget and past deadline. Yours won&apos;t: a written
          fixed proposal within 48 hours, employed craftsmen, and a 25-year workmanship
          guarantee.
        </p>

        <div className={styles.actions}>
          <a href={PHONE_HREF} className={`${cta.pill} ${styles.ctaPrimary}`}>
            <span>Get a Free Estimate</span>
          </a>
          <Link href="/our-work" className={`${cta.outline} ${styles.ctaSecondary}`}>
            See Our Work
          </Link>
        </div>

        <div className={styles.trust}>
          {TRUST.map((item) => (
            <span key={item}>
              <span className={styles.tick} aria-hidden="true">
                ✓
              </span>{' '}
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}
