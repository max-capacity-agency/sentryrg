import { PHONE_DISPLAY, PHONE_HREF } from '@/lib/site'

export default function Home() {
  return (
    <main style={{ padding: 'var(--section-y) var(--gutter)', maxWidth: 'var(--maxw)', margin: '0 auto' }}>
      <h1>
        Scaffold live. <em>Homepage</em> next.
      </h1>
      <p style={{ marginTop: 24, fontSize: 'var(--lead-size)' }}>
        Tokens, fonts and the Netlify build path are wired. Sections port next.
      </p>
      <p style={{ marginTop: 24 }}>
        <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
      </p>
    </main>
  )
}
