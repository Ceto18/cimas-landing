import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

import { SITE_CONFIG } from '@/constants/site'

export function ContactSection() {
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
            Cuéntanos sobre tu proyecto. Estamos listos para escucharte y
            encontrar la mejor solución.
          </p>
        </div>

        <div className="contact-card">
          <p>Contacto directo</p>

          <a href={`mailto:${SITE_CONFIG.email}`}>
            <Mail size={18} />

            {SITE_CONFIG.email}
          </a>

          <a href={`tel:${SITE_CONFIG.phone}`}>
            <Phone size={18} />

            {SITE_CONFIG.phoneLabel}
          </a>

          <div className="address">
            <MapPin size={18} />

            <p>
              {SITE_CONFIG.address.street}
              <br />

              {SITE_CONFIG.address.city}, {SITE_CONFIG.address.region},{' '}
              {SITE_CONFIG.address.country}
              <br />

              RUC {SITE_CONFIG.ruc}
            </p>
          </div>

          <a
            className="button button-dark"
            href={`mailto:${SITE_CONFIG.email}`}
          >
            Escríbenos

            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}