export function AboutSection() {
  return (
    <section
      className="section intro"
      id="nosotros"
    >
      <div className="container intro-grid">
        <div>
          <p className="eyebrow">
            <span />
            Quiénes somos
          </p>

          <h2>
            Capacidad técnica.
            <br />
            <strong>Compromiso humano.</strong>
          </h2>
        </div>

        <div className="intro-body">
          <p>
            Somos una empresa peruana dedicada a la ingeniería, construcción y
            consultoría. Integramos experiencia, planificación y control para
            entregar resultados seguros, eficientes y sostenibles.
          </p>

          <p>
            Trabajamos cerca de nuestros clientes, entendiendo cada necesidad y
            acompañando el proyecto desde la idea hasta la puesta en operación.
          </p>

          <div className="mission-grid">
            <div>
              <span>Misión</span>

              <p>
                Brindar soluciones de ingeniería con excelencia,
                responsabilidad y valor para nuestros clientes y comunidades.
              </p>
            </div>

            <div>
              <span>Visión</span>

              <p>
                Ser referentes en la transformación responsable de la
                infraestructura del Perú.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}