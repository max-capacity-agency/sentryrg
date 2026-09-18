'use client'

import { useState } from 'react'
import BeforeAfter from './BeforeAfter'
import styles from './OurWork.module.css'

type Project = {
  label: string
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  meta: string
  title: string
}

const PROJECTS: Project[] = [
  {
    label: 'Example 1',
    before: '/assets/proj1-before.webp',
    after: '/assets/proj1-after.webp',
    beforeAlt: 'Worn tile roof before replacement',
    afterAlt: 'Finished designer tile roof',
    meta: 'Full Replacement · San Antonio, TX',
    title: 'Worn tile to solar-ready designer tile',
  },
  {
    label: 'Example 2',
    before: '/assets/proj2-before.webp',
    after: '/assets/proj2-after.webp',
    beforeAlt: 'Weathered metal panels before replacement',
    afterAlt: 'Finished standing seam roof',
    meta: 'Full Replacement · New Braunfels, TX',
    title: 'Weathered panels to coated standing seam',
  },
  {
    label: 'Example 3',
    before: '/assets/proj3-before.webp',
    after: '/assets/proj3-after.webp',
    beforeAlt: 'Rusted metal roof before restoration',
    afterAlt: 'Finished charcoal standing seam roof',
    meta: 'Storm Restoration · Boerne, TX',
    title: 'Rusted metal to charcoal standing seam',
  },
]

export default function OurWork() {
  const [active, setActive] = useState(0)
  const project = PROJECTS[active]

  return (
    <section id="work" className={styles.section}>
      <div className={styles.inner}>
        {/* Featured transformation, full width */}
        <BeforeAfter
          beforeSrc="/assets/welcome-before.webp"
          afterSrc="/assets/welcome-after.webp"
          beforeAlt="Owner viewing the worn roof, before"
          afterAlt="Owner viewing the finished roof"
          height="clamp(547px, 80.6vh, 950px)"
        >
          <p className={styles.featuredHeadline}>
            This experience could be <em className="gold">yours</em>
          </p>
          <div className={styles.quoteCard}>
            <div className={styles.quoteStars} aria-hidden="true">
              ★★★★★
            </div>
            <p className={styles.quoteText}>
              &ldquo;From the first walkthrough to the final cleanup, they were a genuine pleasure
              to work with — tidy, punctual, and proud of the result.&rdquo;
            </p>
            <div className={styles.quoteWho}>
              <div className={styles.avatar} aria-hidden="true">
                M
              </div>
              <div>
                <div className={styles.quoteName}>Margaret C.</div>
                <div className={styles.quoteMeta}>Full Replacement · San Antonio</div>
              </div>
            </div>
          </div>
        </BeforeAfter>

        {/* Tabbed project sliders */}
        <div className={styles.projects}>
          <div className={styles.tabsCol}>
            <p className={styles.tabsKicker}>Before &amp; After</p>
            <h3 className={styles.tabsHeading}>Drag to compare</h3>
            <p className={styles.tabsBlurb}>
              Pick a project and pull the handle across. Same roofline, same angle, before and
              after.
            </p>
            <div className={styles.tabs} role="tablist" aria-label="Project examples">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.label}
                  type="button"
                  role="tab"
                  id={`work-tab-${i}`}
                  aria-selected={i === active}
                  aria-controls="work-panel"
                  className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
                  onClick={() => setActive(i)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={styles.panelCol}
            id="work-panel"
            role="tabpanel"
            aria-labelledby={`work-tab-${active}`}
          >
            {/*
              Keyed so switching tabs remounts the slider and its handle
              resets to centre, rather than inheriting the previous drag.
            */}
            <BeforeAfter
              key={project.label}
              beforeSrc={project.before}
              afterSrc={project.after}
              beforeAlt={project.beforeAlt}
              afterAlt={project.afterAlt}
              height="clamp(320px, 42vw, 520px)"
            />
            <div className={styles.caption}>
              <p className={styles.captionMeta}>{project.meta}</p>
              <h3 className={styles.captionTitle}>{project.title}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
