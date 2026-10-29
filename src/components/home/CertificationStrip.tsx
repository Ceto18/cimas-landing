import { CheckCircle2 } from "lucide-react";

import type { Certification } from "@/types/certification.types";

interface CertificationStripProps {
  certifications: Certification[];
}

export function CertificationStrip({
  certifications,
}: CertificationStripProps) {
  if (certifications.length === 0) {
    return null;
  }

  return (
    <section className="cert-strip">
      <div className="container cert-strip-inner">
        <span className="strip-label">
          Certificaciones que nos respaldan
        </span>

        {certifications.map((certification) => (
          <a
            href="#certificaciones"
            key={`${certification.name}-${certification.area}`}
          >
            <CheckCircle2 size={15} />

            {certification.name}
          </a>
        ))}
      </div>
    </section>
  );
}