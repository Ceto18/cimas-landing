import {
  ArrowUpRight,
  BadgeCheck,
  Download,
} from "lucide-react";

import type {
  Certification,
} from "@/types/certification.types";

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({
  certifications,
}: CertificationsSectionProps) {
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
              Nuestro compromiso,{" "}
              <strong>respaldado.</strong>
            </h2>
          </div>

          <p className="section-note">
            Sistemas de gestión que ordenan nuestra forma de trabajar.
          </p>
        </div>

        {certifications.length > 0 ? (
          <div className="cert-grid">
            {certifications.map(
              (
                certification,
                index
              ) => (
                <article
                  className="cert-card group relative flex h-full flex-col overflow-hidden"
                  key={`${certification.name}-${certification.area}-${index}`}
                >
                  {/* CONTENIDO NORMAL */}
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="certificate-preview">
                      <BadgeCheck
                        size={30}
                        strokeWidth={1.7}
                      />

                      <span>
                        Certificado original
                        <br />
                        PDF
                      </span>
                    </div>

                    <p className="cert-code">
                      {
                        certification.area
                      }
                    </p>

                    <h3>
                      {
                        certification.name
                      }
                    </h3>

                    <div className="min-h-[72px]">
                      {certification.description ? (
                        <p className="line-clamp-3">
                          {
                            certification.description
                          }
                        </p>
                      ) : (
                        <p className="text-transparent select-none">
                          Sin descripción disponible.
                        </p>
                      )}
                    </div>

                    {certification.file_url && (
                      <div className="cert-actions mt-auto">
                        <a
                          href={
                            certification.file_url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver certificado

                          <ArrowUpRight
                            size={15}
                          />
                        </a>

                        <a
                          href={
                            certification.file_url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Descargar PDF

                          <Download
                            size={15}
                          />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* HOVER */}
                  {certification.description && (
                    <div className="pointer-events-none absolute inset-0 z-20 flex translate-y-full flex-col justify-between overflow-hidden bg-[linear-gradient(145deg,rgba(8,31,55,0.98),rgba(15,67,105,0.96),rgba(33,122,170,0.94))] p-7 text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                      {/* DECORACIÓN */}
                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

                      <div className="absolute -bottom-12 -left-8 h-28 w-28 rounded-full bg-[#6bb8e8]/20 blur-3xl" />

                      {/* CONTENIDO HOVER */}
                      <div className="relative z-10">
                        <div className="mb-6 flex items-center justify-between">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-md">
                            <BadgeCheck
                              size={22}
                              strokeWidth={1.7}
                            />
                          </div>

                          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur-md">
                            {
                              certification.area
                            }
                          </span>
                        </div>

                        <h3 className="text-xl font-semibold leading-snug tracking-[-0.02em] text-white">
                          {
                            certification.name
                          }
                        </h3>

                        <p className="mt-4 line-clamp-6 text-sm leading-6 text-white/75">
                          {
                            certification.description
                          }
                        </p>
                      </div>

                      {/* PIE HOVER */}
                      <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-5">
                        <span className="text-xs font-medium text-white/55">
                          Información de certificación
                        </span>

                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md">
                          <ArrowUpRight
                            size={15}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              )
            )}
          </div>
        ) : (
          <div className="empty-state">
            <p>
              No hay certificaciones disponibles actualmente.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}