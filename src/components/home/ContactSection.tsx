import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { SITE_CONFIG } from "@/constants/site";

export function ContactSection() {
  const {
    email,
    phone,
    phoneLabel,
    address,
    ruc,
  } = SITE_CONFIG;

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
            <strong>
              que perdure.
            </strong>
          </h2>

          <p className="contact-copy">
            Cuéntanos sobre tu proyecto.
            Estamos listos para escucharte y
            encontrar la mejor solución.
          </p>
        </div>

        <div className="contact-card">
          <p>
            Contacto directo
          </p>

          {/* CORREO */}
          <a
            href={`mailto:${email}`}
          >
            <Mail size={18} />

            {email}
          </a>

          {/* TELÉFONO */}
          <a
            href={`tel:${phone}`}
          >
            <Phone size={18} />

            {phoneLabel}
          </a>

          {/* DIRECCIÓN */}
          <div className="address">
            <MapPin size={18} />

            <p>
              {address.street}

              <br />

              {address.city},{" "}
              {address.region},{" "}
              {address.country}

              <br />

              RUC {ruc}
            </p>
          </div>

          {/* BOTÓN */}
          <a
            className="button button-dark"
            href={`mailto:${email}`}
          >
            Escríbenos

            <ArrowUpRight
              size={17}
            />
          </a>
        </div>
      </div>
    </section>
  );
}