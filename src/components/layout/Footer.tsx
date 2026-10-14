import Image from 'next/image'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

import { SITE_CONFIG } from '@/constants/site'

const footerLinks = [
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Certificaciones', href: '#certificaciones' },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-top">
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

          <a className="footer-cta" href="#contacto">
            Conversemos sobre tu proyecto
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Navegación</p>

          <nav className="footer-links" aria-label="Navegación del footer">
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Contacto</p>

          <div className="footer-contact-list">
            <a href={`mailto:${SITE_CONFIG.email}`}>
              <Mail size={16} />
              <span>{SITE_CONFIG.email}</span>
            </a>

            <a href={`tel:${SITE_CONFIG.phone}`}>
              <Phone size={16} />
              <span>{SITE_CONFIG.phoneLabel}</span>
            </a>

            <div>
              <MapPin size={16} />

              <span>
                {SITE_CONFIG.address.street}
                <br />
                {SITE_CONFIG.address.city}, {SITE_CONFIG.address.region}
              </span>
            </div>
          </div>
        </div>

        <div className="footer-column">
          <p className="footer-heading">Compromiso</p>

          <div className="footer-standards">
            <span>ISO 9001</span>
            <span>ISO 14001</span>
            <span>ISO 45001</span>
            <span>ISO 37001</span>
          </div>

          <p className="footer-ruc">
            RUC {SITE_CONFIG.ruc}
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © 2026 {SITE_CONFIG.name}
        </span>

        <span>
          Ingeniería con propósito.
        </span>
      </div>
    </footer>
  )
}