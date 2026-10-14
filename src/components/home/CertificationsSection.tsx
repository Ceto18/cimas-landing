import {
  ArrowUpRight,
  Download,
  ShieldCheck,
} from 'lucide-react'

import { certifications } from '@/data/certifications'

export function CertificationsSection() {
  return (
    <section
      className="section certifications"
      id="certificaciones"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span />
              Estándares
            </p>

            <h2>
              Nuestro compromiso, <strong>respaldado.</strong>
            </h2>
          </div>

          <p className="section-note">
            Sistemas de gestión que ordenan nuestra forma de trabajar.
          </p>
        </div>

        <div className="cert-grid">
          {certifications.map((certification) => (
            <article
              className="cert-card"
              key={certification.code}
            >
              <div className="certificate-preview">
                <ShieldCheck size={30} />

                <span>
                  Certificado original
                  <br />
                  PDF
                </span>
              </div>

              <p className="cert-code">
                {certification.code}
              </p>

              <h3>
                {certification.name}
              </h3>

              {certification.file && (
                <div className="cert-actions">
                  <a
                    href={certification.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver certificado

                    <ArrowUpRight size={15} />
                  </a>

                  <a
                    href={certification.file}
                    download
                  >
                    Descargar PDF

                    <Download size={15} />
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}