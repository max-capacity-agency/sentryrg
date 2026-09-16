'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PHONE_DISPLAY, PHONE_HREF, BRAND, EMAIL } from '@/lib/site'
import { SERVICES, servicePath } from '@/lib/nav'
import styles from './SiteFooter.module.css'

type Props = {
  /** Contact page already has its own form; pass true to drop this one. */
  hideForm?: boolean
}

const SERVICE_OPTIONS = [
  'Roof replacement',
  'Roof repair',
  'Free roof inspection',
  'Storm or hail damage',
  'Gutter installation',
  'Emergency tarping',
  'Commercial or multi-family',
  'Something else',
]

const CLAIM_OPTIONS = ['Not sure yet', 'Yes, filing a claim', 'No, paying out of pocket']

/*
 * Contact block.
 *
 * CLAUDE.md forbids substituting a form for a call CTA, but explicitly
 * allows contact blocks styled as such, which this is. Every CTA around it
 * remains a tel: link.
 *
 * Submission opens the visitor's mail client via mailto:, which is what the
 * prototype does. That is fragile — it depends on a configured mail client
 * and a lead is lost silently if the visitor never hits send. Now that the
 * estimator is out of scope this is the only lead capture on the site, so
 * it should move to a real form post before launch. Netlify Forms would
 * cover it without a backend.
 */
function ContactForm() {
  const [sent, setSent] = useState(false)
  const name = useRef<HTMLInputElement>(null)
  const phone = useRef<HTMLInputElement>(null)
  const email = useRef<HTMLInputElement>(null)
  const address = useRef<HTMLInputElement>(null)
  const service = useRef<HTMLSelectElement>(null)
  const claim = useRef<HTMLSelectElement>(null)
  const notes = useRef<HTMLTextAreaElement>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const v = (r: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>) =>
      r.current ? r.current.value.trim() : ''

    const body = [
      `Name: ${v(name)}`,
      `Phone: ${v(phone)}`,
      `Email: ${v(email)}`,
      `Property address: ${v(address)}`,
      `Service needed: ${v(service)}`,
      `Insurance claim: ${v(claim)}`,
      '',
      'Details:',
      v(notes),
    ].join('\n')

    const subject =
      `Website enquiry — ${v(service) || 'Roofing project'}` +
      (v(address) ? ` — ${v(address)}` : '')

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  if (sent) {
    return (
      <div className={styles.sent}>
        <p className={styles.sentTitle}>✓ Your email is ready to send</p>
        <p className={styles.sentBody}>
          Hit send in the window that just opened and it lands with JJ. If nothing opened, call{' '}
          <a href={PHONE_HREF} className={styles.inlinePhone}>
            {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Name</span>
          <input ref={name} className={styles.input} placeholder="First and last name" autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Phone</span>
          <input ref={phone} type="tel" className={styles.input} placeholder="(210) 000-0000" autoComplete="tel" />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Email</span>
          <input ref={email} type="email" className={styles.input} placeholder="you@email.com" autoComplete="email" />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Property address</span>
          <input
            ref={address}
            className={styles.input}
            placeholder="Street and city"
            autoComplete="street-address"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>What do you need?</span>
          <select ref={service} className={styles.select} defaultValue={SERVICE_OPTIONS[0]}>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Insurance claim?</span>
          <select ref={claim} className={styles.select} defaultValue={CLAIM_OPTIONS[0]}>
            {CLAIM_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className={`${styles.field} ${styles.fieldWide}`}>
          <span className={styles.fieldLabel}>Anything we should know?</span>
          <textarea
            ref={notes}
            rows={3}
            className={styles.textarea}
            placeholder="Age of the roof, active leaks, storm date — whatever is useful"
          />
        </label>
      </div>
      <div className={styles.submitRow}>
        <button type="submit" className={styles.cta}>
          <span>Send to {BRAND}</span>
        </button>
        <span className={styles.submitNote}>Goes straight to JJ. No call center, no spam.</span>
      </div>
    </form>
  )
}

export default function SiteFooter({ hideForm = false }: Props) {
  const year = new Date().getFullYear()

  return (
    <>
      <section className={styles.contact}>
        <div className={styles.contactGlow} />
        {!hideForm && (
          <div className={styles.contactInner}>
            <p className={styles.kicker}>Start Your Project</p>
            <h2 className={styles.contactHeading}>
              Tell us about your <em>roof</em>
            </h2>
            <p className={styles.contactLead}>
              A few details and we will come out for a free inspection. Prefer to talk it through?
              Call{' '}
              <a href={PHONE_HREF} className={styles.inlinePhone}>
                {PHONE_DISPLAY}
              </a>
              .
            </p>
            <ContactForm />
          </div>
        )}
        <div className={styles.social}>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Instagram"
          >
            IG
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialLink} ${styles.socialSerif}`}
            aria-label="Facebook"
          >
            f
          </a>
          <a
            href="https://google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialLink} ${styles.socialSerif}`}
            aria-label="Google reviews"
          >
            G
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.columns}>
            <div className={styles.colBrand}>
              <Image
                src="/assets/logo-light.webp"
                alt={BRAND}
                width={704}
                height={758}
                className={styles.footerLogo}
              />
              <p className={styles.blurb}>
                Veteran owned, fully insured and IKO ROOFPRO Craftsman Premier certified. Fixed
                written proposals and a lifetime workmanship warranty.
              </p>
            </div>

            <div className={styles.colServices}>
              <p className={styles.colHeading}>Services</p>
              <div className={styles.colLinks}>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={servicePath(s.slug)} className={styles.colLink}>
                    {s.shortLabel ?? s.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.colCompany}>
              <p className={styles.colHeading}>Company</p>
              <div className={styles.colLinks}>
                <Link href="/about" className={styles.colLink}>
                  About
                </Link>
                <Link href="/our-work" className={styles.colLink}>
                  Our Work
                </Link>
                <Link href="/process" className={styles.colLink}>
                  Process
                </Link>
                <Link href="/journal" className={styles.colLink}>
                  Journal
                </Link>
                <Link href="/#materials" className={styles.colLink}>
                  What We Install
                </Link>
                <Link href="/contact" className={styles.colLink}>
                  Contact
                </Link>
              </div>
            </div>

            <div className={styles.colContact}>
              <p className={styles.colHeading}>Contact</p>
              <div className={styles.colLinks}>
                <a href={PHONE_HREF} className={styles.footerPhone}>
                  {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${EMAIL}`} className={styles.colLink}>
                  {EMAIL}
                </a>
                <span className={styles.colMeta}>
                  Serving San Antonio, the I-35 corridor
                  <br />
                  and the Texas Hill Country
                </span>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <span>Veteran Owned &amp; Operated · Fully Insured</span>
            <span>
              Website design &amp; build by{' '}
              <a
                href="https://maxcapacityagency.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.bottomLink}
              >
                Max Capacity Agency
              </a>
            </span>
            <span>© {year} {BRAND}</span>
          </div>
        </div>
      </footer>

      {/* Sticky call bar below 840px, with a spacer so it never covers content. */}
      <div className={styles.callBarSpacer} />
      <a href={PHONE_HREF} className={styles.callBar}>
        <span className={styles.callBarIcon} aria-hidden="true">
          ✆
        </span>{' '}
        Call Now · Complimentary Inspection
      </a>
    </>
  )
}
