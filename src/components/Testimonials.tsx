import Image from 'next/image'
import SectionHeading from './SectionHeading'
import styles from './Testimonials.module.css'

type Quote = { initial: string; name: string; role: string; text: string }

const QUOTES: Quote[] = [
  { initial: 'M', name: 'Margaret C.', role: 'Full Replacement · Alamo Heights', text: 'The proposal was itemized to the nail. They finished a day early and the yard was cleaner than they found it.' },
  { initial: 'D', name: 'David & Priya R.', role: 'Storm Restoration · Stone Oak', text: 'Daily photos to my phone meant I never once wondered what was happening on my own roof.' },
  { initial: 'T', name: 'Tom B.', role: 'Metal Re-Roof · Terrell Hills', text: 'Three roofers quoted us a number on a business card. Sentry Roofing wrote us a proposal.' },
  { initial: 'S', name: 'Sarah & Michael L.', role: 'Insurance Claim · Helotes', text: 'They met our adjuster on the roof and documented everything. The claim was approved without a single follow-up call.' },
  { initial: 'J', name: 'James O.', role: 'Metal Re-Roof · Schertz', text: 'The foreman was on site every single day. Same face, same standard, start to finish.' },
  { initial: 'E', name: 'Eleanor W.', role: 'Shingle Re-Roof · Shavano Park', text: 'They matched the profile and color on a 1920s home better than I thought possible. Craftsmen, not installers.' },
  { initial: 'R', name: 'Raj & Anita P.', role: 'Gutters & Roof · Boerne', text: 'One firm, one proposal, one guarantee for the roof and the gutters. No finger-pointing between trades.' },
  { initial: 'C', name: 'Caroline H.', role: 'Roof Repair · Leon Valley', text: 'A small leak fixed properly the first time. They photographed the cause, not just the patch.' },
  { initial: 'G', name: 'Greg & Dana M.', role: 'New Construction · Converse', text: 'Coordinated with our builder without us lifting a finger — inspected at every stage and finished ahead of schedule.' },
]

const GoogleMark = () => (
  <svg width="30" height="30" viewBox="0 0 48 48" aria-hidden="true" style={{ flex: '0 0 auto' }}>
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
)

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <Image
        src="/assets/testimonial-bg.webp"
        alt=""
        fill
        aria-hidden="true"
        className={styles.bg}
        sizes="100vw"
      />
      <div className={styles.scrim} />

      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.headCopy}>
            <SectionHeading kicker="Client Stories" tone="dark" align="left">
              What your <em>neighbors</em> say
            </SectionHeading>
          </div>
          <div className={styles.rating}>
            <GoogleMark />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={styles.ratingScore}>4.9</span>
                <span className={styles.ratingStars} aria-hidden="true">
                  ★★★★★
                </span>
              </div>
              <p className={styles.ratingNote}>Based on 312 Google reviews</p>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {QUOTES.map((q) => (
            <figure className={styles.card} key={q.name}>
              <div className={styles.stars} aria-hidden="true">
                ★★★★★
              </div>
              <blockquote className={styles.text}>&ldquo;{q.text}&rdquo;</blockquote>
              <figcaption className={styles.who}>
                <div className={styles.avatar} aria-hidden="true">
                  {q.initial}
                </div>
                <div>
                  <div className={styles.name}>{q.name}</div>
                  <div className={styles.role}>{q.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
