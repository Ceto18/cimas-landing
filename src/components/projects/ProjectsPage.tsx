import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  Navbar,
} from "@/components/layout/Navbar";

import type {
  Project,
} from "@/types/project.types";

interface ProjectsPageProps {
  projects: Project[];
  currentPage: number;
  lastPage: number;
  total: number;
}

export function ProjectsPage({
  projects,
  currentPage,
  lastPage,
  total,
}: ProjectsPageProps) {
  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      {/* HERO */}
      <section className="relative bg-[#0b294b] text-white">
        <Navbar />

        <div className="container pb-24 pt-44 md:pb-28 md:pt-52">
          <div className="max-w-3xl">
            <p className="eyebrow light">
              <span />
              Experiencia
            </p>

            <h1 className="mt-6 max-w-3xl text-5xl font-normal leading-[1.02] tracking-[-0.045em] text-white md:text-7xl">
              Proyectos que
              <br />
              reflejan nuestra
              <br />

              <strong className="font-normal text-[#5da5dc]">
                experiencia.
              </strong>
            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-white/65 md:text-base">
              Conoce algunos de los proyectos desarrollados por CIMAS &
              Ingenieros para entidades públicas y privadas.
            </p>
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">
                <span />
                Nuestros proyectos
              </p>

              <h2 className="mt-5 text-4xl font-normal tracking-[-0.04em] text-[#0d2948] md:text-5xl">
                Experiencia en cada obra.
              </h2>
            </div>

            <p className="text-sm text-[#617084]">
              {total}{" "}
              {total === 1
                ? "proyecto registrado"
                : "proyectos registrados"}
            </p>
          </div>

          {projects.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {projects.map(
                (
                  project,
                  index
                ) => {
                  const image =
                    project.photos?.[0]
                      ?.file_url ??
                    null;

                  return (
                    <article
                      key={`${project.title}-${project.year}-${index}`}
                      className="group overflow-hidden rounded-[22px] bg-white shadow-[0_12px_40px_rgba(13,41,72,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(13,41,72,0.12)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8edf2]">
                        {image ? (
                          <Image
                            src={
                              image
                            }
                            alt={
                              project.title
                            }
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">
                            Sin imagen
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#07182b]/50 via-transparent to-transparent" />

                        <span className="absolute bottom-5 left-5 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#174d7c]">
                          {project
                            .type_project
                            ?.name ??
                            "Proyecto"}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="mb-4 flex items-start justify-between gap-5 text-xs text-[#718096]">
                          <span className="shrink-0">
                            {project.year}
                          </span>

                          <span className="text-right">
                            {
                              project.institution
                            }
                          </span>
                        </div>

                        <h3 className="text-xl font-medium leading-snug tracking-[-0.02em] text-[#0d2948]">
                          {
                            project.title
                          }
                        </h3>

                        <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#68778a]">
                          {
                            project.description
                          }
                        </p>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center">
              <p className="text-gray-500">
                Actualmente no hay proyectos disponibles.
              </p>
            </div>
          )}

          {/* PAGINACIÓN */}
          {lastPage > 1 && (
            <div className="mt-14 flex items-center justify-center gap-2">
              {currentPage >
                1 && (
                <Link
                  href={`/proyectos?page=${
                    currentPage - 1
                  }`}
                  aria-label="Página anterior"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0d2948]/15 text-[#0d2948] transition hover:border-[#0d2948]/30 hover:bg-[#0d2948]/5"
                >
                  <ArrowLeft
                    size={17}
                  />
                </Link>
              )}

              {Array.from(
                {
                  length:
                    lastPage,
                },
                (_, index) =>
                  index + 1
              ).map(
                (page) => (
                  <Link
                    key={
                      page
                    }
                    href={`/proyectos?page=${page}`}
                    className={`flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-medium transition ${
                      page ===
                      currentPage
                        ? "bg-[#0d2948] text-white"
                        : "border border-[#0d2948]/15 text-[#0d2948] hover:border-[#0d2948]/30 hover:bg-[#0d2948]/5"
                    }`}
                  >
                    {
                      page
                    }
                  </Link>
                )
              )}

              {currentPage <
                lastPage && (
                <Link
                  href={`/proyectos?page=${
                    currentPage + 1
                  }`}
                  aria-label="Página siguiente"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#0d2948]/15 text-[#0d2948] transition hover:border-[#0d2948]/30 hover:bg-[#0d2948]/5"
                >
                  <ArrowRight
                    size={17}
                  />
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}