import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/Hero'
import WhyUs from '@/components/WhyUs'
import StatsBar from '@/components/StatsBar'
import MaterialsBand from '@/components/MaterialsBand'
import Welcome from '@/components/Welcome'
import OurWork from '@/components/OurWork'

/* Sections in the prototype's DOM order. */
export default function Home() {
  return (
    <>
      <SiteNav current="home" transparentUntilScroll />
      <Hero />
      <WhyUs />
      <StatsBar />
      <MaterialsBand />
      <Welcome />
      <OurWork />
      <SiteFooter />
    </>
  )
}
