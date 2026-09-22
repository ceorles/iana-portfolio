import { useEffect } from 'react'

import About from '../components/About/About'
import Certifications from '../components/Certifications/Certifications'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'
import Hero from '../components/Hero/Hero'
import Navbar from '../components/Navbar/Navbar'
import Projects from '../components/Projects/Projects'
import Services from '../components/Services/Services'
import Skills from '../components/Skills/Skills'
import { analyticsService } from '../services/analyticsService'

export default function Home() {
  useEffect(() => {
    analyticsService.track('page_view')
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
