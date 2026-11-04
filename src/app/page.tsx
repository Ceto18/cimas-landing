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
import { getSocialNetworkProfiles } from "@/services/social-networks.service";

export const instant = false;

export default async function HomePage() {
  const [
    homeResponse,
    companyResponse,
    servicesResponse,
    projectsResponse,
    certificationsResponse,
    socialNetworksResponse,
  ] = await Promise.all([
    getHome(),
    getCompany(),
    getServices(),
    getProjects(1, 4),
    getCertifications(),
    getSocialNetworkProfiles(),
  ]);

  const home = homeResponse.data;

  const company = companyResponse.data;

  const services = servicesResponse.data.data;

  const projects = projectsResponse.data.data;

  const certifications = certificationsResponse.data.data;

  const socialNetworks = socialNetworksResponse.data;

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

        <ContactSection
          socialNetworks={socialNetworks}
        />

        <Footer
          certifications={certifications}
        />
      </main>
    </>
  );
}