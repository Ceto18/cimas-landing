import { AboutSection } from "@/components/home/AboutSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { CertificationStrip } from "@/components/home/CertificationStrip";
import { ContactSection } from "@/components/home/ContactSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";

import { getCompany } from "@/services/company.service";
import { getCertifications } from "@/services/certifications.service";
import { getHome } from "@/services/home.service";
import { getProjects } from "@/services/projects.service";
import { getServices } from "@/services/services.service";

export const instant = false;

export default async function HomePage() {
  const [
    homeResponse,
    companyResponse,
    servicesResponse,
    projectsResponse,
    certificationsResponse,
  ] = await Promise.all([
    getHome(),
    getCompany(),
    getServices(),
    getProjects(),
    getCertifications(),
  ]);

  const home = homeResponse.data;
  const company = companyResponse.data;
  const services = servicesResponse.data.data;
  const projects = projectsResponse.data.data;
  const certifications =
    certificationsResponse.data.data;

  return (
    <>
      <OrganizationJsonLd />

      <main>
        <HeroSection data={home}>
          <Navbar />
        </HeroSection>

        <CertificationStrip
          certifications={certifications}
        />

        <AboutSection data={company} />

        <ServicesSection
          services={services}
        />

        <ProjectsSection
          projects={projects}
        />

        <CertificationsSection
          certifications={certifications}
        />

        <ContactSection />

        <Footer
          certifications={certifications}
        />
      </main>
    </>
  );
}