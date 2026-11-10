
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

interface ContactInfoProps {
  socialNetworks: SocialNetworkProfile[];
}

const normalize = (value: string) =>
  value.trim().toLowerCase();

function getProfileHref(
  profile: SocialNetworkProfile
): string | null {
  const name = normalize(profile.social_network_name);
  const url = profile.url?.trim() ?? "";
  const nickname = profile.nickname?.trim() ?? "";

  if (/^https?:\/\//i.test(url)) return url;
  if (/^(mailto:|tel:)/i.test(url)) return url;

  if (name === "email") {
    const email = url || nickname;

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? `mailto:${email}`
      : null;
  }

  if (name === "whatsapp") {
    const value = url || nickname;

    if (!/^\+?[\d\s()-]+$/.test(value)) return null;

    return `https://wa.me/${value.replace(/\D/g, "")}`;
  }

  if (name === "teléfono" || name === "telefono") {
    const value = url || nickname;

    if (!/^\+?[\d\s()-]+$/.test(value)) return null;

    return `tel:${value.replace(/[^\d+]/g, "")}`;
  }

  return null;
}

export function ContactInfo({
  socialNetworks,
}: ContactInfoProps) {
  const findProfile = (...names: string[]) =>
    socialNetworks.find((item) =>
      names.includes(normalize(item.social_network_name))
    );

  const address = findProfile("dirección", "direccion");
  const ruc = findProfile("ruc");
  const email = findProfile("email");
  const phone = findProfile("teléfono", "telefono");
  const whatsapp = findProfile("whatsapp");

  const whatsappHref = whatsapp
    ? getProfileHref(whatsapp)
    : null;

  const contactItems = [
    {
      profile: address,
      title: "Oficina principal",
      Icon: MapPin,
      href: null,
    },
    {
      profile: phone,
      title: "Teléfono",
      Icon: Phone,
      href: phone ? getProfileHref(phone) : null,
    },
    {
      profile: email,
      title: "Correo electrónico",
      Icon: Mail,
      href: email ? getProfileHref(email) : null,
    },
    {
      profile: whatsapp,
      title: "WhatsApp",
      Icon: MessageCircle,
      href: whatsappHref,
    },
    {
      profile: ruc,
      title: "Registro empresarial · RUC",
      Icon: FileText,
      href: null,
    },
  ].filter(
    (item) => item.profile !== undefined
  );

  const otherNetworks = socialNetworks.filter(
    (profile) =>
      ![
        "dirección",
        "direccion",
        "ruc",
        "email",
        "teléfono",
        "telefono",
        "whatsapp",
      ].includes(normalize(profile.social_network_name)) &&
      !!profile.url &&
      /^https?:\/\//i.test(profile.url)
  );

  return (
    <div className="w-full lg:pr-6">
      {/* IDENTIDAD */}
      <div className="mb-9">
        <div className="mb-5 flex items-center gap-3">
          <span className="h-px w-8 bg-[#d98542]" />

          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#b9763e]">
            Contacto directo
          </span>
        </div>

        <h3 className="max-w-md text-[30px] font-normal leading-[1.17] tracking-[-0.035em] text-[#0d2948] md:text-[36px]">
          Estamos cerca de
          <br className="hidden sm:block" /> tu próximo
          <span className="font-medium text-[#3477a8]">
            {" "}desafío.
          </span>
        </h3>

        <p className="mt-5 max-w-md text-[14px] leading-7 text-[#697a8e]">
          Cuéntanos qué necesitas. Nuestro equipo está
          disponible para conocer tu proyecto y ayudarte
          a encontrar la solución técnica más adecuada.
        </p>
      </div>

      {/* CONTACTOS */}
      <div className="border-t border-[#d9e2eb]">
        {contactItems.map(
          ({ profile, title, Icon, href }) => {
            if (!profile) return null;

            const displayText =
              profile.label?.trim() ||
              profile.nickname;

            const external =
              !!href && /^https?:\/\//i.test(href);

            return (
              <div
                key={`${profile.social_network_name}-${profile.nickname}`}
                className="group flex items-start gap-4 border-b border-[#d9e2eb] py-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#dae4ec] bg-white text-[#245679] transition-colors group-hover:border-[#bfd2e0] group-hover:bg-[#edf4f9]">
                  <Icon size={19} strokeWidth={1.7} />
                </div>

                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8291a2]">
                    {title}
                  </p>

                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={
                        external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-start gap-2 break-all text-[14px] font-medium leading-6 text-[#193c5b] transition-colors hover:text-[#c97a38]"
                    >
                      {displayText}

                      <ArrowUpRight
                        size={15}
                        className="mt-1 shrink-0 opacity-50"
                      />
                    </a>
                  ) : (
                    <p className="text-[14px] font-medium leading-6 text-[#193c5b]">
                      {displayText}
                    </p>
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* OTRAS REDES */}
      {otherNetworks.length > 0 && (
        <div className="mt-8">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8291a2]">
            Encuéntranos también en
          </p>

          <div className="flex flex-wrap gap-3">
            {otherNetworks.map((profile, index) => (
              <a
                key={`${profile.social_network_name}-${index}`}
                href={profile.url!}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#d9e2eb] bg-white px-4 py-2.5 text-xs font-medium text-[#294b68] transition-colors hover:border-[#8aafc9] hover:bg-[#eef4f8]"
              >
                <Globe2 size={15} />
                {profile.social_network_name}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* LLAMADO A LA ACCIÓN */}
      {whatsappHref && (
        <div className="mt-9 border-l-[3px] border-[#d98542] bg-[#eaf0f5] px-5 py-5">
          <p className="text-sm font-semibold text-[#0d2948]">
            ¿Prefieres conversar directamente?
          </p>

          <p className="mt-1.5 text-xs leading-6 text-[#66788b]">
            También puedes comunicarte con nosotros
            mediante nuestro canal de WhatsApp.
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#245679] transition-colors hover:text-[#c97a38]"
          >
            Conversar por WhatsApp
            <ArrowUpRight size={15} />
          </a>
        </div>
      )}
    </div>
  );
}
