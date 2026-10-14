import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

import { HeroSection } from '@/components/home/HeroSection'
import { CertificationStrip } from '@/components/home/CertificationStrip'
import { AboutSection } from '@/components/home/AboutSection'
import { ServicesSection } from '@/components/home/ServicesSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { CertificationsSection } from '@/components/home/CertificationsSection'
import { ContactSection } from '@/components/home/ContactSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection>
        <Navbar />
      </HeroSection>

      <CertificationStrip />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <CertificationsSection />
      <ContactSection />

      <Footer />
    </main>
  )
}