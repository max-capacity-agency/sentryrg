import Image from 'next/image'
import styles from './MaterialsBand.module.css'

const CLAIMS = [
  'IKO ROOFPRO Craftsman Premier certified',
  'Written workmanship guarantee',
  'Free inspection and documentation',
]

export default function MaterialsBand() {
  return (
    <section className={styles.section} aria-label="Materials and certifications">
      <div className={styles.inner}>
        <div className={styles.badgeGroup}>
          <span className={styles.prefix}>We build with</span>
          <a
            href="https://www.iko.com/na/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badgeLink}
          >
            <Image
              src="/assets/iko-roofpro-badge.webp"
              alt="IKO ROOFPRO Craftsman Premier"
              width={734}
              height={716}
              className={styles.badge}
            />
          </a>
        </div>

        <div className={styles.claims}>
          {CLAIMS.map((c) => (
            <span key={c}>{c}</span>
          ))}
        </div>

        <a href="#materials" className={styles.more}>
          What we install →
        </a>
      </div>
    </section>
  )
}
