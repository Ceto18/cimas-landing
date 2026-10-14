import type { ReactNode } from 'react'

import { ArrowUpRight } from 'lucide-react'

interface HeroSectionProps {
  children?: ReactNode
}

export function HeroSection({ children }: HeroSectionProps) {
  return (
    <section className="hero" id="inicio">
      {children}

      <div
        className="hero-media"
        role="img"
        aria-label="Imagen referencial de una obra de ingeniería"
      >
        <div className="hero-overlay" />
      </div>

      <div className="hero-content container">
        <div className="hero-copy">
          <p className="eyebrow light">
            <span />
            CIMA&apos;S & INGENIEROS E.I.R.L.
          </p>

          <h1>
            Ingeniería que <em>construye</em> confianza.
          </h1>

          <p className="hero-text">
            Diseñamos y ejecutamos soluciones para transformar retos complejos
            en infraestructura que perdura.
          </p>

          <div className="hero-actions">
            <a
              className="button button-light"
              href="#servicios"
            >
              Conoce nuestros servicios
              <ArrowUpRight size={17} />
            </a>

            <a
              className="text-link light"
              href="#nosotros"
            >
              Quiénes somos
            </a>
          </div>
        </div>

        <div className="hero-note">
          <span>01</span>

          <p>
            Construcción
            <br />
            con propósito
          </p>
        </div>
      </div>

      <div className="hero-footer container">
        <span>Huaraz · Áncash · Perú</span>

        <a href="#nosotros">
          Explora nuestra experiencia ↓
        </a>
      </div>
    </section>
  )
}