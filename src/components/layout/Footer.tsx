import Image from "next/image";

import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { SITE_CONFIG } from "@/constants/site";

import type {
  Certification,
} from "@/types/certification.types";

const footerLinks = [
  {
    label: "Nosotros",
    href: "#nosotros",
  },
  {
    label: "Servicios",
    href: "#servicios",
  },
  {
    label: "Proyectos",
    href: "#proyectos",
  },
  {
    label: "Certificaciones",
    href: "#certificaciones",
  },
];

interface FooterProps {
  certifications: Certification[];
}

export function Footer({
  certifications,
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="container footer-top">
        {/* MARCA */}
        <div className="footer-brand-column">
          <a
            href="#inicio"
            aria-label="Volver al inicio"
            className="footer-brand"
          >
            <Image
              src={SITE_CONFIG.logo.negative}
              alt={SITE_CONFIG.shortName}
              width={220}
              height={80}
              className="footer-logo"
            />
          </a>

          <p className="footer-description">
            Ingeniería, construcción y consultoría con capacidad técnica,
            responsabilidad y compromiso con cada proyecto.
          </p>

          <a
            className="footer-cta"
            href="#contacto"
          >
            Conversemos sobre tu proyecto

            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* NAVEGACIÓN */}
        <div className="footer-column">
          <p className="footer-heading">
            Navegación
          </p>

          <nav
            className="footer-links"
            aria-label="Navegación del footer"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* CONTACTO */}
        <div className="footer-column">
          <p className="footer-heading">
            Contacto
          </p>

          <div className="footer-contact-list">
            <a
              href={`mailto:${SITE_CONFIG.email}`}
            >
              <Mail size={16} />

              <span>
                {SITE_CONFIG.email}
              </span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone}`}
            >
              <Phone size={16} />

              <span>
                {SITE_CONFIG.phoneLabel}
              </span>
            </a>

            <div>
              <MapPin size={16} />

              <span>
                {SITE_CONFIG.address.street}

                <br />

                {SITE_CONFIG.address.city},{" "}
                {SITE_CONFIG.address.region}
              </span>
            </div>
          </div>
        </div>

        {/* CERTIFICACIONES */}
        <div className="footer-column">
          <p className="footer-heading">
            Compromiso
          </p>

          {certifications.length > 0 ? (
            <div className="footer-standards">
              {certifications.map(
                (certification) => (
                  <a
                    key={`${certification.name}-${certification.area}`}
                    href="#certificaciones"
                  >
                    {certification.name}
                  </a>
                )
              )}
            </div>
          ) : (
            <p className="footer-ruc">
              Certificaciones en actualización
            </p>
          )}

          <p className="footer-ruc">
            RUC {SITE_CONFIG.ruc}
          </p>
        </div>
      </div>

      {/* PARTE INFERIOR */}
      <div className="container footer-bottom">
        <span>
          © 2026 {SITE_CONFIG.name}
        </span>

        <span>
          Ingeniería con propósito.
        </span>
      </div>
    </footer>
  );
}