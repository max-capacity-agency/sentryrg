'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import styles from './BeforeAfter.module.css'

type Props = {
  beforeSrc: string
  afterSrc: string
  beforeAlt: string
  afterAlt: string
  /** CSS height for the frame; the prototype varies it per placement. */
  height: string
  /** Starting handle position, 0-100. */
  initial?: number
  priority?: boolean
  children?: React.ReactNode
}

const STEP = 4

export default function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  height,
  initial = 50,
  priority = false,
  children,
}: Props) {
  const [pct, setPct] = useState(initial)
  const [dragging, setDragging] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const setFromClientX = useCallback((clientX: number) => {
    const rect = wrapRef.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPct(Math.max(0, Math.min(100, next)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    setDragging(true)
    setFromClientX(e.clientX)

    const move = (ev: PointerEvent) => setFromClientX(ev.clientX)
    const up = () => {
      setDragging(false)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
  }

  /* The prototype is pointer-only. Arrow keys make it reachable without one. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPct((p) => Math.max(0, p - STEP))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPct((p) => Math.min(100, p + STEP))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setPct(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setPct(100)
    }
  }

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${dragging ? styles.dragging : ''}`}
      style={{ height }}
    >
      <Image
        src={afterSrc}
        alt={afterAlt}
        fill
        draggable={false}
        className={styles.image}
        priority={priority}
        sizes="(max-width: 900px) 100vw, 1180px"
      />
      <div className={styles.beforeLayer} style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}>
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          fill
          draggable={false}
          className={styles.image}
          sizes="(max-width: 900px) 100vw, 1180px"
        />
      </div>

      <span className={`${styles.tag} ${styles.tagBefore}`}>Before</span>
      <span className={`${styles.tag} ${styles.tagAfter}`}>After</span>

      {children}

      <button
        type="button"
        className={styles.handle}
        style={{ left: `calc(${pct}% - 3px)` }}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        role="slider"
        aria-label="Reveal the before photo"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-valuetext={`${Math.round(pct)}% before`}
      >
        <span className={styles.knob} aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="15" y1="18" x2="9" y2="12" />
            <line x1="9" y1="6" x2="15" y2="12" />
          </svg>
        </span>
      </button>
    </div>
  )
}
