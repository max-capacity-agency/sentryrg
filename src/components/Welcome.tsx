import Image from 'next/image'
import Link from 'next/link'
import { AREAS, areaPath } from '@/lib/nav'
import styles from './Welcome.module.css'

export default function Welcome() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.cols}>
          <div className={styles.media}>
            <Image
              src="/assets/welcome-jobsite.webp"
              alt="A Sentry Roofing crew mid tear-off on a two-storey home, dump trailer in the driveway"
              width={1254}
              height={1254}
              className={styles.photo}
            />
          </div>

          <div className={styles.copy}>
            <p className={styles.kicker}>Welcome to Sentry Roofing</p>
            <h2 className={styles.heading}>
              Twenty-five years of <em>craft</em> on San Antonio roofs
            </h2>
            <p className={styles.para}>
              JJ has spent twenty-five years in the trade, twenty of them as an insurance
              adjuster before he started roofing. He runs every job himself and is on the roof
              for it — and each one is documented daily, from tear-off to the final magnet sweep.
            </p>
            <p className={`${styles.para} ${styles.paraLast}`}>
              We work slowly enough to do it once and quickly enough to keep a written schedule.
              Proudly serving homeowners across San Antonio and the surrounding county.
            </p>
            <Link href="/about" className={styles.moreLink}>
              More About Us →
            </Link>

            <div className={styles.areas}>
              <p className={styles.areasLabel}>Service Areas</p>
              <div className={styles.chips}>
                {AREAS.map((a) => (
                  <Link key={a.slug} href={areaPath(a.slug)} className={styles.chip}>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
