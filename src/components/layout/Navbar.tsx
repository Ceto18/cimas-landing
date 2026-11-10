"use client";

import Image from "next/image";

import {
  ArrowUpRight,
  Menu,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  SITE_CONFIG,
} from "@/constants/site";

export function Navbar() {
  const pathname = usePathname();

  const getHomeSectionHref = (
    section: string
  ) => {
    if (pathname === "/") {
      return `#${section}`;
    }

    return `/#${section}`;
  };

  const navigation = [
    {
      label: "Nosotros",
      href: getHomeSectionHref("nosotros"),
    },
    {
      label: "Servicios",
      href: getHomeSectionHref("servicios"),
    },
    {
      label: "Proyectos",
      href: "/proyectos",
    },
    {
      label: "Certificaciones",
      href: getHomeSectionHref("certificaciones"),
    },
  ];

  return (
    <nav
      className="nav nav-fixed container"
      aria-label="Navegación principal"
    >
      {/* LOGO */}
      <a
        href="/"
        aria-label="Ir al inicio"
      >
        <Image
          src={SITE_CONFIG.logo.negative}
          alt={SITE_CONFIG.shortName}
          width={210}
          height={70}
          className="brand-logo"
          priority
        />
      </a>

      {/* NAVEGACIÓN */}
      <div className="nav-links">
        {navigation.map((item) => (
          <a
            key={item.label}
            href={item.href}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* CTA: FORMULARIO DE CONTACTO */}
      <a
        className="nav-cta"
        href="/contacto#formulario"
      >
        Hablemos

        <ArrowUpRight size={16} />
      </a>

      {/* MENÚ MÓVIL */}
      <button
        className="menu-button"
        type="button"
        aria-label="Abrir menú de navegación"
      >
        <Menu size={22} />
      </button>
    </nav>
  );
}