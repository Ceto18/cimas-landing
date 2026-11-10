
import {
  ArrowUpRight,
  FileText,
  Globe2,
  Mail,
  MapPin,
  MessageCircle,
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
  const name = normalizeName(
    profile.social_network_name
  );

  if (value && isExternalUrl(value)) {
    return value;
  }

  if (value && /^(mailto:|tel:)/i.test(value)) {
    return value;
  }

  if (name === "email") {
    const email = value || profile.nickname;

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? `mailto:${email}`
      : null;
  }

  if (name === "whatsapp") {
    const candidate = value || profile.nickname;

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
    const candidate = value || profile.nickname;

    if (!/^\+?[\d\s()-]+$/.test(candidate)) {
      return null;
    }

    return `tel:${candidate.replace(/[^\d+]/g, "")}`;
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

    case "dirección":
    case "direccion":
      return <MapPin {...iconProps} />;

    case "ruc":
      return <FileText {...iconProps} />;

    default:
      return <Globe2 {...iconProps} />;
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

  const phoneProfile =
    getProfile("teléfono") ??
    getProfile("telefono");

  const addressProfile =
    getProfile("dirección") ??
    getProfile("direccion");

  const rucProfile = getProfile("ruc");

  const primaryProfiles = [
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
    (phoneProfile && getSocialHref(phoneProfile)) ||
    null;

  return (
    <section
      className="contact section"
      id="contacto"
    >
      <div className="container contact-grid">
        {/* INFORMACIÓN PRINCIPAL */}
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

        {/* TARJETA DE CONTACTO */}
        <div className="contact-card">
          <p>Contacto directo</p>

          {/* EMAIL, TELÉFONO Y WHATSAPP */}
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
                target={
                  external ? "_blank" : undefined
                }
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

          {/* DIRECCIÓN */}
          {addressProfile && (
            <div className="address">
              <SocialIcon profile={addressProfile} />

              <p>
                {getDisplayText(addressProfile)}
              </p>
            </div>
          )}

          {/* RUC */}
          {rucProfile && (
            <div className="address">
              <SocialIcon profile={rucProfile} />

              <p>
                RUC {rucProfile.nickname}
              </p>
            </div>
          )}

          {/* OTRAS REDES SOCIALES */}
          {additionalProfiles.length > 0 && (
            <div className="mt-6 border-t border-white/15 pt-5">
              <p className="mb-4 text-xs font-medium uppercase tracking-wider">
                Síguenos en nuestras redes
              </p>

              <div className="flex flex-wrap gap-3">
                {additionalProfiles.map(
                  (profile, index) => {
                    const href = getSocialHref(profile);

                    if (!href) {
                      return null;
                    }

                    const external = isExternalUrl(href);

                    return (
                      <a
                        key={`${profile.social_network_name}-${index}`}
                        href={href}
                        target={
                          external ? "_blank" : undefined
                        }
                        rel={
                          external
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
                  }
                )}
              </div>
            </div>
          )}

          {/* BOTÓN DE CONTACTO */}
          <a
            className="button button-dark"
            href="/contacto#formulario"
          >
            Escríbenos

            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
