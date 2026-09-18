import Image from 'next/image'
import SectionHeading from './SectionHeading'
import styles from './WhatWeInstall.module.css'

export default function WhatWeInstall() {
  return (
    <section id="materials" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <SectionHeading
            kicker="Materials"
            lead="Most insurance claims replace like for like, so what you have is usually what you get. We fit both, and we will tell you which one your policy actually owes you."
          >
            What we <em>install</em>
          </SectionHeading>
        </div>

        <div className={styles.grid}>
          <article className={styles.card}>
            <Image
              src="/assets/svc-replacement-photo.webp"
              alt="Architectural shingle roof"
              width={1254}
              height={1254}
              className={styles.photo}
              sizes="(max-width: 760px) 100vw, 560px"
            />
            <div className={styles.body}>
              <p className={styles.kicker}>Asphalt shingle</p>
              <h3 className={styles.title}>IKO architectural shingle</h3>
              <p className={styles.text}>
                Our shingle of choice: family-owned, manufactured in North America, and specified
                for Texas wind and hail. Nine out of ten homes we re-roof are shingle, and the
                profile and color are matched to what came off.
              </p>
              <div className={styles.foot}>
                <Image
                  src="/assets/iko-roofpro-badge.webp"
                  alt="IKO ROOFPRO Craftsman Premier"
                  width={734}
                  height={716}
                  className={styles.badge}
                />
                <a
                  href="https://www.iko.com/na/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  Explore IKO shingles ↗
                </a>
              </div>
            </div>
          </article>

          <article className={styles.card}>
            <Image
              src="/assets/svc-commercial-photo.webp"
              alt="Standing-seam metal roof"
              width={1254}
              height={1254}
              className={styles.photo}
              sizes="(max-width: 760px) 100vw, 560px"
            />
            <div className={styles.body}>
              <p className={styles.kicker}>Metal</p>
              <h3 className={styles.title}>Standing seam and metal panel</h3>
              <p className={styles.text}>
                Concealed-fastener standing seam and exposed-fastener panel, formed to your
                roofline. It costs more up front and lasts a great deal longer, which is why so
                much of the Hill Country is under it.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
