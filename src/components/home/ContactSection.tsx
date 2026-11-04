import Image from "next/image";

import {
  ArrowUpRight,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import type {
  SocialNetworkProfile,
} from "@/types/social-network.types";

interface ContactSectionProps {
  socialNetworks?: SocialNetworkProfile[];
}

const normalizeName = (name: string) =>
  name.trim().toLowerCase();

const isExternalUrl = (url: string) =>
  /^https?:\/\//i.test(url);

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

  if (name === "telefono" || name === "teléfono") {
    return /^\+?[\d\s()-]+$/.test(value)
      ? `tel:${value.replace(/[^\d+]/g, "")}`
      : null;
  }

  return null;
};

function SocialIcon({
  profile,
  size = 18,
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

    case "dirección":
    case "direccion":
      return <MapPin size={size} />;

    case "ruc":
      return <FileText size={size} />;

    default:
      return <Globe size={size} />;
  }
}

export function ContactSection({
  socialNetworks = [],
}: ContactSectionProps) {
  const getProfile = (name: string) =>
    socialNetworks.find(
      (profile) =>
        normalizeName(profile.social_network_name) ===
        name
    );

  const emailProfile = getProfile("email");
  const whatsappProfile = getProfile("whatsapp");
  const addressProfile =
    getProfile("dirección") ??
    getProfile("direccion");
  const rucProfile = getProfile("ruc");

  const primaryProfiles = [
    emailProfile,
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
        "dirección",
        "direccion",
        "ruc",
      ].includes(
        normalizeName(profile.social_network_name)
      )
  );

  const contactHref =
    (emailProfile && getSocialHref(emailProfile)) ||
    (whatsappProfile && getSocialHref(whatsappProfile)) ||
    null;

  return (
    <section
      className="contact section"
      id="contacto"
    >
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">
            <span />
            Hablemos
          </p>

          <h2>
            Construyamos algo
            <br />
            <strong>que perdure.</strong>
          </h2>

          <p className="contact-copy">
            Cuéntanos sobre tu proyecto.
            Estamos listos para escucharte y
            encontrar la mejor solución.
          </p>
        </div>

        <div className="contact-card">
          <p>Contacto directo</p>

          {primaryProfiles.map((profile, index) => {
            const href = getSocialHref(profile);

            if (!href) {
              return (
                <div
                  key={`${profile.social_network_name}-${index}`}
                  className="address"
                >
                  <SocialIcon profile={profile} />

                  <span className="break-all">
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
                <SocialIcon profile={profile} />

                <span className="break-all">
                  {getDisplayText(profile)}
                </span>
              </a>
            );
          })}

          {addressProfile && (
            <div className="address">
              <SocialIcon profile={addressProfile} />

              <p>{getDisplayText(addressProfile)}</p>
            </div>
          )}

          {rucProfile && (
            <div className="address">
              <SocialIcon profile={rucProfile} />

              <p>
                RUC {getDisplayText(rucProfile)}
              </p>
            </div>
          )}

          {additionalProfiles.length > 0 && (
            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="mb-4 text-xs font-medium uppercase tracking-wider">
                Síguenos en nuestras redes
              </p>

              <div className="flex flex-wrap gap-3">
                {additionalProfiles.map((profile, index) => {
                  const href = getSocialHref(profile);

                  if (!href) {
                    return null;
                  }

                  return (
                    <a
                      key={`${profile.social_network_name}-${index}`}
                      href={href}
                      target={
                        isExternalUrl(href)
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        isExternalUrl(href)
                          ? "noopener noreferrer"
                          : undefined
                      }
                      title={getDisplayText(profile)}
                      aria-label={`Visitar ${profile.social_network_name}`}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/15"
                    >
                      <SocialIcon
                        profile={profile}
                        size={22}
                      />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {contactHref && (
            <a
              className="button button-dark"
              href={contactHref}
              target={
                isExternalUrl(contactHref)
                  ? "_blank"
                  : undefined
              }
              rel={
                isExternalUrl(contactHref)
                  ? "noopener noreferrer"
                  : undefined
              }
            >
              Escríbenos

              <ArrowUpRight size={17} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}