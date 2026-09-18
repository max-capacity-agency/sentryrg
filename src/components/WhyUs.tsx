import SectionHeading from './SectionHeading'
import styles from './WhyUs.module.css'

/* Client-approved copy, lifted verbatim from the prototype. */
const ROWS: [string, string][] = [
  [
    '25 years in the trade — 20 of them as an insurance adjuster',
    'Salesmen who have never written a claim',
  ],
  ['An itemized fixed-price proposal, in writing', 'A number on the back of a business card'],
  ['The owner on the roof, every day of the job', 'A rep you meet once and never see again'],
  ['100+ photos per job — before, during and after', 'A verbal promise that it was done right'],
  [
    'IKO materials, written guarantee, magnet-rolled cleanup',
    'Vague promises and nails left in your driveway',
  ],
  ['A lifetime warranty on the work', 'A warranty that runs out before the roof does'],
  ['A courtesy follow-up inspection every year', 'Gone the day the check clears'],
]

export default function WhyUs() {
  return (
    <section id="why" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading kicker="Why Us">
          The difference, <em>itemized</em>
        </SectionHeading>

        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.headUs}>Sentry Roofing</div>
            <div className={styles.headThem}>The Typical Roofer</div>
          </div>
          {ROWS.map(([us, them]) => (
            <div className={styles.row} key={us}>
              <div className={`${styles.cell} ${styles.us}`}>
                <span className={styles.tickUs} aria-hidden="true">
                  ✓
                </span>
                <span>{us}</span>
              </div>
              <div className={`${styles.cell} ${styles.them}`}>
                <span className={styles.tickThem} aria-hidden="true">
                  ✗
                </span>
                <span>{them}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
