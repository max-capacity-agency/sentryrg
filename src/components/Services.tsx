import Link from 'next/link'
import Image from 'next/image'
import SectionHeading from './SectionHeading'
import { SERVICES, servicePath } from '@/lib/nav'
import styles from './Services.module.css'

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <SectionHeading kicker="Services" align="left">
            Everything above the <em>gutters</em>
          </SectionHeading>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <Link key={s.slug} href={servicePath(s.slug)} className={styles.card}>
              <Image
                src={s.image}
                alt={s.label}
                width={1254}
                height={1254}
                className={styles.photo}
                sizes="(max-width: 700px) 100vw, 380px"
              />
              <div className={styles.body}>
                <h3 className={styles.title}>{s.label}</h3>
                <p className={styles.line}>{s.line}</p>
              </div>
              <div className={styles.overlay}>
                <h3 className={styles.overlayTitle}>{s.label}</h3>
                <p className={styles.overlayText}>{s.detail}</p>
                <span className={styles.overlayMore}>Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
