
import Image from "next/image";

import {
  ArrowUpRight,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { SITE_CONFIG } from "@/constants/site";

import type {
  Certification,
} from "@/types/certification.types";

import type {
  SocialNetworkProfile,
} from "@/types/social-network.types";

const footerLinks = [
  {
    label: "Nosotros",
    href: "/#nosotros",
  },
  {
    label: "Servicios",
    href: "/#servicios",
  },
  {
    label: "Proyectos",
    href: "/proyectos",
  },
  {
    label: "Certificaciones",
    href: "/#certificaciones",
  },
];

interface FooterProps {
  certifications: Certification[];
  socialNetworks?: SocialNetworkProfile[];
}

const normalizeName = (name: string) =>
  name.trim().toLowerCase();

const isExternalUrl = (value: string) =>
  /^https?:\/\//i.test(value);

const getDisplayText = (
  profile: SocialNetworkProfile
) =>
  profile.label?.trim() ||
  profile.nickname?.trim() ||
  profile.social_network_name;

const getSocialHref = (
  profile: SocialNetworkProfile
): string | null => {
  const value = profile.url?.trim();

  if (!value) {
    return null;
  }

  if (isExternalUrl(value)) {
    return value;
  }

  if (/^(mailto:|tel:)/i.test(value)) {
    return value;
  }

  const name = normalizeName(
    profile.social_network_name
  );

  if (name === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? `mailto:${value}`
      : null;
  }

  if (name === "whatsapp") {
    if (!/^\+?[\d\s()-]+$/.test(value)) {
      return null;
    }

    const phone = value.replace(/\D/g, "");

    return phone
      ? `https://wa.me/${phone}`
      : null;
  }

  if (
    name === "telefono" ||
    name === "teléfono"
  ) {
    return /^\+?[\d\s()-]+$/.test(value)
      ? `tel:${value.replace(/[^\d+]/g, "")}`
      : null;
  }

  return null;
};

function FooterSocialIcon({
  profile,
  size = 16,
}: {
  profile: SocialNetworkProfile;
  size?: number;
}) {
  if (profile.social_network_icon) {
    return (
      <Image
        src={profile.social_network_icon}
        alt=""
        width={size}
        height={size}
        unoptimized
        className="shrink-0 object-contain"
      />
    );
  }

  const name = normalizeName(
    profile.social_network_name
  );

  switch (name) {
    case "email":
      return <Mail size={size} />;

    case "whatsapp":
    case "telefono":
    case "teléfono":
      return <Phone size={size} />;

    case "direccion":
    case "dirección":
      return <MapPin size={size} />;

    case "ruc":
      return <FileText size={size} />;

    default:
      return <Globe size={size} />;
  }
}

export function Footer({
  certifications,
  socialNetworks = [],
}: FooterProps) {
  const getProfile = (name: string) =>
    socialNetworks.find(
      (profile) =>
        normalizeName(
          profile.social_network_name
        ) === name
    );

  const emailProfile = getProfile("email");

  const whatsappProfile = getProfile("whatsapp");

  const phoneProfile =
    getProfile("teléfono") ??
    getProfile("telefono");

  const addressProfile =
    getProfile("dirección") ??
    getProfile("direccion");

  const rucProfile = getProfile("ruc");

  const contactProfiles = [
    emailProfile,
    whatsappProfile,
    phoneProfile,
  ].filter(
    (profile): profile is SocialNetworkProfile =>
      profile !== undefined
  );

  const otherProfiles = socialNetworks.filter(
    (profile) =>
      ![
        "email",
        "whatsapp",
        "telefono",
        "teléfono",
        "direccion",
        "dirección",
        "ruc",
      ].includes(
        normalizeName(profile.social_network_name)
      )
  );

  return (
    <footer className="footer">
      <div className="container footer-top">
        {/* MARCA */}
        <div className="footer-brand-column">
          <a
            href="/"
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
            href="/contacto#formulario"
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
            {contactProfiles.map((profile, index) => {
              const href = getSocialHref(profile);

              if (!href) {
                return (
                  <div
                    key={`${profile.social_network_name}-${index}`}
                  >
                    <FooterSocialIcon profile={profile} />

                    <span>
                      {getDisplayText(profile)}
                    </span>
                  </div>
                );
              }

              const external = isExternalUrl(href);

              return (
                <a
                  key={`${profile.social_network_name}-${index}`}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={
                    external
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  <FooterSocialIcon profile={profile} />

                  <span>
                    {getDisplayText(profile)}
                  </span>
                </a>
              );
            })}

            {addressProfile && (
              <div>
                <FooterSocialIcon
                  profile={addressProfile}
                />

                <span>
                  {getDisplayText(addressProfile)}
                </span>
              </div>
            )}
          </div>

          {/* OTRAS REDES SOCIALES */}
          {otherProfiles.length > 0 && (
            <div className="mt-6">
              <p className="footer-heading">
                Síguenos
              </p>

              <div className="flex flex-wrap gap-3">
                {otherProfiles.map((profile, index) => {
                  const href = getSocialHref(profile);

                  if (!href) {
                    return null;
                  }

                  const external = isExternalUrl(href);

                  return (
                    <a
                      key={`${profile.social_network_name}-${index}`}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={
                        external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      title={getDisplayText(profile)}
                      aria-label={`Visitar ${profile.social_network_name}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
                    >
                      <FooterSocialIcon
                        profile={profile}
                        size={21}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* CERTIFICACIONES */}
        <div className="footer-column">
          <p className="footer-heading">
            Compromiso
          </p>

          {certifications.length > 0 ? (
            <div className="footer-standards">
              {certifications.map(
                (certification, index) => (
                  <a
                    key={`${certification.name}-${certification.area}-${index}`}
                    href="/#certificaciones"
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

          {rucProfile && (
            <p className="footer-ruc">
              RUC {rucProfile.nickname}
            </p>
          )}
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
