import { CheckCircle2 } from 'lucide-react'

import { certifications } from '@/data/certifications'

export function CertificationStrip() {
  return (
    <section className="cert-strip">
      <div className="container cert-strip-inner">
        <span className="strip-label">
          Certificaciones que nos respaldan
        </span>

        {certifications.map((certification) => (
          <a
            href="#certificaciones"
            key={certification.code}
          >
            <CheckCircle2 size={15} />

            {certification.code}
          </a>
        ))}
      </div>
    </section>
  )
}