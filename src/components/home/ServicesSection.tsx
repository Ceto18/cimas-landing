"use client";

import Image from "next/image";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import {
  useEffect,
  useRef,
} from "react";

import type {
  Service,
} from "@/types/service.types";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({
  services,
}: ServicesSectionProps) {
  const carouselRef =
    useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (
    direction: "left" | "right"
  ) => {
    const carousel =
      carouselRef.current;

    if (!carousel) {
      return;
    }

    const card =
      carousel.querySelector<HTMLElement>(
        "[data-service-card]"
      );

    const cardWidth =
      card?.offsetWidth ?? 380;

    const gap = 24;

    const maxScroll =
      carousel.scrollWidth -
      carousel.clientWidth;

    if (direction === "right") {
      const nextPosition =
        carousel.scrollLeft +
        cardWidth +
        gap;

      if (
        nextPosition >=
        maxScroll - 10
      ) {
        carousel.scrollTo({
          left: 0,
          behavior: "smooth",
        });

        return;
      }
    }

    carousel.scrollBy({
      left:
        direction === "right"
          ? cardWidth + gap
          : -(cardWidth + gap),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (services.length <= 3) {
      return;
    }

    const interval =
      window.setInterval(() => {
        scrollCarousel(
          "right"
        );
      }, 4000);

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, [services.length]);

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
              Del plano a la{" "}
              <strong>
                realidad.
              </strong>
            </h2>
          </div>

          <div className="flex items-end gap-6">
            <p className="section-note">
              Soluciones integrales para construir,
              conservar y mejorar.
            </p>

            {services.length > 3 && (
              <div className="hidden shrink-0 items-center gap-2 lg:flex">
                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel(
                      "left"
                    )
                  }
                  aria-label="Servicio anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0d2d52]/20 text-[#0d2d52] transition hover:bg-[#0d2d52] hover:text-white"
                >
                  <ArrowLeft
                    size={18}
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel(
                      "right"
                    )
                  }
                  aria-label="Siguiente servicio"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0d2d52]/20 text-[#0d2d52] transition hover:bg-[#0d2d52] hover:text-white"
                >
                  <ArrowRight
                    size={18}
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {services.length > 0 ? (
          <>
            <div
              ref={carouselRef}
              className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {services.map(
                (
                  service,
                  index
                ) => (
                  <article
                    key={
                      service.uuid
                    }
                    data-service-card
                    className="service-card w-[88%] shrink-0 snap-start sm:w-[65%] md:w-[48%] lg:w-[31.8%]"
                  >
                    <div className="service-image">
                      {service.image_url ? (
                        <Image
                          src={
                            service.image_url
                          }
                          alt={
                            service.title
                          }
                          fill
                          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 48vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm text-gray-500">
                          Sin imagen
                        </div>
                      )}

                      <span>
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>

                    <div className="service-body">
                      <h3>
                        {
                          service.title
                        }
                      </h3>

                      <p>
                        {
                          service.description
                        }
                      </p>

                      <a
                        href="#contacto"
                        aria-label={`Consultar por ${service.title}`}
                      >
                        <ArrowUpRight
                          size={18}
                        />
                      </a>
                    </div>
                  </article>
                )
              )}
            </div>

            {services.length > 1 && (
              <div className="mt-5 flex items-center justify-end gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel(
                      "left"
                    )
                  }
                  aria-label="Servicio anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0d2d52]/20 text-[#0d2d52]"
                >
                  <ArrowLeft
                    size={18}
                  />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    scrollCarousel(
                      "right"
                    )
                  }
                  aria-label="Siguiente servicio"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0d2d52]/20 text-[#0d2d52]"
                >
                  <ArrowRight
                    size={18}
                  />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="service-empty">
            <p>
              Actualmente no hay servicios disponibles.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}