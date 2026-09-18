import SiteNav from '@/components/SiteNav'
import SiteFooter from '@/components/SiteFooter'
import Hero from '@/components/Hero'
import WhyUs from '@/components/WhyUs'
import StatsBar from '@/components/StatsBar'
import MaterialsBand from '@/components/MaterialsBand'
import Welcome from '@/components/Welcome'
import OurWork from '@/components/OurWork'
import Services from '@/components/Services'
import Testimonials from '@/components/Testimonials'
import Process from '@/components/Process'
import WhatWeInstall from '@/components/WhatWeInstall'
import Faq from '@/components/Faq'

/*
 * Sections in the prototype's DOM order. The Gallery coverflow sits
 * between Services and Testimonials and is still to come.
 */
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
      <Services />
      <Testimonials />
      <Process />
      <WhatWeInstall />
      <Faq />
      <SiteFooter photo />
    </>
  )
}
