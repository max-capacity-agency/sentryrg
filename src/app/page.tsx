import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/Hero'

export default function Home() {
  return (
    <>
      <SiteNav current="home" transparentUntilScroll />
      <Hero />
      <SiteFooter />
    </>
  )
}
