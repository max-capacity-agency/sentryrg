import styles from './StatsBar.module.css'

const STATS: [string, string][] = [
  ['1,000+', 'Roofs Fixed'],
  ['30+', 'Years Combined Experience'],
  ['10+', 'Certified Roofing Experts'],
]

export default function StatsBar() {
  return (
    <section className={styles.section} aria-label="By the numbers">
      <div className={styles.grid}>
        {STATS.map(([number, label]) => (
          <div className={styles.cell} key={label}>
            <div className={styles.number}>{number}</div>
            <div className={styles.label}>{label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
