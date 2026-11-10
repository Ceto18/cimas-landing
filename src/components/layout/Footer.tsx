
import Image from "next/image";

import {
  ArrowUpRight,
  FileText,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
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
  {
    label: "Contacto",
    href: "/contacto#formulario",
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
  const name = normalizeName(
    profile.social_network_name
  );

  const value = profile.url?.trim() ?? "";

  const nickname = profile.nickname?.trim() ?? "";

  if (value && isExternalUrl(value)) {
    return value;
  }

  if (value && /^(mailto:|tel:)/i.test(value)) {
    return value;
  }

  if (name === "email") {
    const email = value || nickname;

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? `mailto:${email}`
      : null;
  }

  if (name === "whatsapp") {
    const candidate = value || nickname;

    if (!/^\+?[\d\s()-]+$/.test(candidate)) {
      return null;
    }

    const phone = candidate.replace(/\D/g, "");

    return phone
      ? `https://wa.me/${phone}`
      : null;
  }

  if (
    name === "telefono" ||
    name === "teléfono"
  ) {
    const candidate = value || nickname;

    if (!/^\+?[\d\s()-]+$/.test(candidate)) {
      return null;
    }

    return `tel:${candidate.replace(/[^\d+]/g, "")}`;
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
  const name = normalizeName(
    profile.social_network_name
  );

  const iconProps = {
    size,
    strokeWidth: 1.7,
    className: "shrink-0",
  };

  switch (name) {
    case "email":
      return <Mail {...iconProps} />;

    case "whatsapp":
      return <MessageCircle {...iconProps} />;

    case "telefono":
    case "teléfono":
      return <Phone {...iconProps} />;

    case "direccion":
    case "dirección":
      return <MapPin {...iconProps} />;

    case "ruc":
      return <FileText {...iconProps} />;

    default:
      return <Globe2 {...iconProps} />;
  }
}

export function Footer({
  certifications,
  socialNetworks = [],
}: FooterProps) {
  const getProfile = (name: string) =>
    socialNetworks.find(
      (profile) =>
        normalizeName(profile.social_network_name) === name
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
    phoneProfile,
    whatsappProfile,
  ].filter(
    (profile): profile is SocialNetworkProfile =>
      profile !== undefined
  );

  const additionalProfiles = socialNetworks.filter(
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
            {/* EMAIL, TELÉFONO Y WHATSAPP */}
            {contactProfiles.map((profile, index) => {
              const href = getSocialHref(profile);
              const external = href
                ? isExternalUrl(href)
                : false;

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

            {/* DIRECCIÓN */}
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
          {additionalProfiles.length > 0 && (
            <div className="mt-6">
              <p className="footer-heading">
                Síguenos
              </p>

              <div className="flex flex-wrap gap-3">
                {additionalProfiles.map((profile, index) => {
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

          {/* RUC */}
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
