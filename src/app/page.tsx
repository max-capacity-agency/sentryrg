import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'

/*
 * Homepage shell. The nav sits transparent over the video hero and turns
 * solid navy past 40px of scroll, so it gets transparentUntilScroll.
 * The 15 hero sections land here next.
 */
export default function Home() {
  return (
    <>
      <SiteNav current="home" transparentUntilScroll />
      <main
        style={{
          paddingTop: 'calc(var(--nav-h) + var(--section-y))',
          paddingBottom: 'var(--section-y)',
          paddingLeft: 'var(--gutter)',
          paddingRight: 'var(--gutter)',
          maxWidth: 'var(--maxw)',
          margin: '0 auto',
        }}
      >
        <h1>
          Nav and footer <em>live</em>.
        </h1>
        <p style={{ marginTop: 24, fontSize: 'var(--lead-size)' }}>
          Homepage sections port next, top to bottom against the prototype.
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
