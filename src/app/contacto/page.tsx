
import type { Metadata } from "next";

import { ContactPage } from "@/components/contact/ContactPage";
import { Footer } from "@/components/layout/Footer";

import { getSocialNetworkProfiles } from "@/services/social-networks.service";
import { getCertifications } from "@/services/certifications.service";
import { getProjectTypes } from "@/services/projects.service";

export const instant = false;

export const metadata: Metadata = {
  title: "Contacto | CIMAS Ingenieros",
  description:
    "Contáctanos para solicitar asesoría técnica, ejecución de obras, supervisión de proyectos y soluciones de ingeniería.",
};

export default async function ContactRoute() {
  const [
    socialNetworksResponse,
    certificationsResponse,
    projectTypesResponse,
  ] = await Promise.all([
    getSocialNetworkProfiles(),
    getCertifications(),
    getProjectTypes(),
  ]);

  const socialNetworks = socialNetworksResponse.data;

  const certifications =
    certificationsResponse.data.data;

  const projectTypes = projectTypesResponse.data;

  return (
    <>
      <ContactPage
        socialNetworks={socialNetworks}
        projectTypes={projectTypes}
      />

      <Footer
        certifications={certifications}
        socialNetworks={socialNetworks}
      />
    </>
  );
}
