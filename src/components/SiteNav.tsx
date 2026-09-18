'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PHONE_DISPLAY, PHONE_HREF, BRAND } from '@/lib/site'
import { SERVICES, AREAS, servicePath, areaPath, type NavKey } from '@/lib/nav'
import cta from '@/styles/cta.module.css'
import styles from './SiteNav.module.css'

type Props = {
  /** Highlights the matching top-level item. */
  current?: NavKey
  /**
   * Homepage only: sit transparent over the video hero and fade to solid
   * navy past 40px of scroll, matching the prototype's .hx-nav behaviour.
   */
  transparentUntilScroll?: boolean
}

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={styles.phoneIcon}
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

/*
 * One dropdown. The prototype opens these on hover only, which leaves them
 * unreachable by keyboard. We keep hover and additionally open on focus
 * within the group, so tabbing to the trigger reveals the items, and close
 * on Escape. The trigger stays a real link to the index page rather than
 * becoming a button, so its destination is preserved.
 */
function Dropdown({
  label,
  href,
  active,
  menuClass,
  items,
}: {
  label: string
  href: string
  active?: boolean
  menuClass: string
  items: { href: string; label: string }[]
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLAnchorElement>(null)
  const menuId = useId()

  const close = useCallback(() => setOpen(false), [])

  // Close when focus leaves the group entirely, not on every child blur.
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape' && open) {
      close()
      triggerRef.current?.focus()
    }
  }

  return (
    <div
      ref={wrapRef}
      className={styles.dropdownWrap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={close}
      onFocus={() => setOpen(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <Link
        ref={triggerRef}
        href={href}
        className={`${styles.link} ${active ? styles.active : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
      >
        {label} ▾
      </Link>
      {open && (
        <ul id={menuId} className={`${styles.menu} ${menuClass}`}>
          {items.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.menuItem} onClick={close}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function SiteNav({ current, transparentUntilScroll = false }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const sheetId = useId()

  useEffect(() => {
    if (!transparentUntilScroll) return
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [transparentUntilScroll])

  // Close the sheet on Escape wherever focus happens to be.
  useEffect(() => {
    if (!sheetOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheetOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sheetOpen])

  // Transparent only while genuinely at the top with the sheet shut.
  const isTransparent = transparentUntilScroll && !scrolled && !sheetOpen

  const navClass = [styles.nav, isTransparent ? styles.transparent : styles.solid]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <nav className={navClass} aria-label="Primary">
        <Link href="/" className={styles.logoLink} aria-label={`${BRAND} home`}>
          <Image
            src="/assets/logo-light.webp"
            alt={BRAND}
            width={704}
            height={758}
            className={styles.logo}
            priority
          />
        </Link>

        <div className={styles.links}>
          <Link href="/" className={`${styles.link} ${current === 'home' ? styles.active : ''}`}>
            Home
          </Link>

          <Dropdown
            label="Services"
            href="/services"
            active={current === 'services'}
            menuClass={styles.menuServices}
            items={SERVICES.map((s) => ({ href: servicePath(s.slug), label: s.label }))}
          />

          <Dropdown
            label="Service Areas"
            href={areaPath(AREAS[0].slug)}
            active={current === 'areas'}
            menuClass={styles.menuAreas}
            items={AREAS.map((a) => ({ href: areaPath(a.slug), label: a.label }))}
          />

          <Link href="/#why" className={styles.link}>
            Why Choose Us
          </Link>

          <Dropdown
            label="About"
            href="/about"
            /* Process lives under About, so it lights the same item. */
            active={current === 'about' || current === 'process'}
            menuClass={styles.menuAbout}
            items={[
              { href: '/about', label: 'About Us' },
              { href: '/process', label: 'Our Process' },
            ]}
          />

          <Link
            href="/contact"
            className={`${styles.link} ${current === 'contact' ? styles.active : ''}`}
          >
            Contact
          </Link>
        </div>

        <div className={styles.actions}>
          <a href={PHONE_HREF} className={styles.phone}>
            <PhoneIcon />
            <span>{PHONE_DISPLAY}</span>
          </a>
          <a href={PHONE_HREF} className={`${cta.pill} ${styles.cta}`}>
            <span>Get a Free Estimate</span>
          </a>
        </div>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={sheetOpen}
          aria-controls={sheetId}
          onClick={() => setSheetOpen((v) => !v)}
        >
          {sheetOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {sheetOpen && (
        <div id={sheetId} className={styles.sheet}>
          <Link href="/" className={styles.sheetLink} onClick={() => setSheetOpen(false)}>
            Home
          </Link>
          <Link href="/services" className={styles.sheetLink} onClick={() => setSheetOpen(false)}>
            Services
          </Link>
          <Link href="/our-work" className={styles.sheetLink} onClick={() => setSheetOpen(false)}>
            Our Work
          </Link>
          <Link
            href={areaPath(AREAS[0].slug)}
            className={styles.sheetLink}
            onClick={() => setSheetOpen(false)}
          >
            Service Areas
          </Link>
          {/*
           * The prototype listed a single placeholder "Example Area" here.
           * Listing the real areas instead: they are the point of the local
           * SEO strategy and a placeholder would have shipped as-is.
           */}
          {AREAS.map((a) => (
            <Link
              key={a.slug}
              href={areaPath(a.slug)}
              className={`${styles.sheetLink} ${styles.sheetSub}`}
              onClick={() => setSheetOpen(false)}
            >
              {a.label}
            </Link>
          ))}
          <Link href="/#why" className={styles.sheetLink} onClick={() => setSheetOpen(false)}>
            Why Choose Us
          </Link>
          <Link href="/about" className={styles.sheetLink} onClick={() => setSheetOpen(false)}>
            About
          </Link>
          <Link
            href="/process"
            className={`${styles.sheetLink} ${styles.sheetSub}`}
            onClick={() => setSheetOpen(false)}
          >
            Our Process
          </Link>
          <Link href="/journal" className={styles.sheetLink} onClick={() => setSheetOpen(false)}>
            Journal
          </Link>
          <Link href="/contact" className={styles.sheetLink} onClick={() => setSheetOpen(false)}>
            Contact
          </Link>
          <a href={PHONE_HREF} className={`${cta.pill} ${styles.cta} ${styles.sheetCta}`}>
            <span>Get a Free Estimate</span>
          </a>
        </div>
      )}
    </>
  )
}
