import Image from 'next/image'

import { projects } from '@/data/projects'

export function ProjectsSection() {
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
              Proyectos con impacto <em>real.</em>
            </h2>
          </div>

          <p className="section-note light-note">
            Una muestra de la experiencia que ponemos al servicio de cada
            desafío.
          </p>
        </div>

        <div className="project-grid">
          <article className="project-feature">
            <div className="project-photo">
              <Image
                src="https://images.unsplash.com/photo-1517089535815-8f9f7c3b8f4f?auto=format&fit=crop&w=1600&q=85"
                alt="Proyecto de infraestructura"
                fill
                sizes="(max-width: 900px) 100vw, 60vw"
              />
            </div>

            <div className="project-caption">
              <span>Infraestructura</span>

              <h3>Obras que conectan comunidades</h3>

              <p>
                Puentes, vías y espacios públicos pensados para durar.
              </p>
            </div>
          </article>

          <div className="project-list">
            {projects.map((project) => (
              <article key={project.number}>
                <span>{project.number}</span>

                <h3>{project.title}</h3>

                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}