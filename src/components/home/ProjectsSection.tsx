import Image from "next/image";
import Link from "next/link";

import type {
  Project,
} from "@/types/project.types";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({
  projects,
}: ProjectsSectionProps) {
  const visibleProjects =
    projects.slice(0, 4);

  if (visibleProjects.length === 0) {
    return (
      <section
        className="projects section"
        id="proyectos"
      >
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow light">
                <span />
                Experiencia
              </p>

              <h2>
                Proyectos con impacto{" "}
                <em>real.</em>
              </h2>
            </div>

            <p className="section-note light-note">
              Una muestra de la experiencia que ponemos al servicio de cada
              desafío.
            </p>
          </div>

          <div className="project-empty">
            <p>
              Actualmente no hay proyectos disponibles.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const [
    featuredProject,
    ...otherProjects
  ] = visibleProjects;

  const featuredImage =
    featuredProject.photos?.[0]?.file_url ??
    null;

  return (
    <section
      className="projects section"
      id="proyectos"
    >
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow light">
              <span />
              Experiencia
            </p>

            <h2>
              Proyectos con impacto{" "}
              <em>real.</em>
            </h2>
          </div>

          <p className="section-note light-note">
            Una muestra de la experiencia que ponemos al servicio de cada
            desafío.
          </p>
        </div>

        <div className="project-grid">
          {/* PROYECTO DESTACADO */}
          <article className="project-feature">
            <div className="project-photo">
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt={featuredProject.title}
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-800 text-sm text-white/60">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="project-caption">
              <span>
                {featuredProject
                  .type_project
                  ?.name ??
                  "Proyecto"}
              </span>

              <h3>
                {
                  featuredProject.title
                }
              </h3>

              <p>
                {
                  featuredProject.description
                }
              </p>
            </div>
          </article>

          {/* LISTADO DE PROYECTOS */}
          <div className="project-list">
            {otherProjects.map(
              (
                project,
                index
              ) => (
                <article
                  key={`${project.title}-${project.year}-${index}`}
                >
                  <span>
                    {String(
                      index + 2
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <h3>
                    {
                      project.title
                    }
                  </h3>

                  <p>
                    {
                      project.description
                    }
                  </p>
                </article>
              )
            )}
          </div>
        </div>

        {/* VER MÁS */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/proyectos"
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-medium text-white transition duration-300 hover:border-white/60 hover:bg-white/10"
          >
            Ver más proyectos
          </Link>
        </div>
      </div>
    </section>
  );
}