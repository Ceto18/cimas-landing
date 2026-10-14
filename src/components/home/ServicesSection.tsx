import Image from 'next/image'

import { ArrowUpRight } from 'lucide-react'

import { services } from '@/data/services'

export function ServicesSection() {
  return (
    <section
      className="section services"
      id="servicios"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span />
              Servicios
            </p>

            <h2>
              Del plano a la <strong>realidad.</strong>
            </h2>
          </div>

          <p className="section-note">
            Soluciones integrales para construir, conservar y mejorar.
          </p>
        </div>

        <div className="service-grid">
          {services.map((service) => (
            <article
              className="service-card"
              key={service.number}
            >
              <div className="service-image">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <span>{service.number}</span>
              </div>

              <div className="service-body">
                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <a
                  href="#contacto"
                  aria-label={`Consultar por ${service.title}`}
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}