import type { Company } from "@/types/company.types";

interface AboutSectionProps {
  data: Company;
}

export function AboutSection({
  data,
}: AboutSectionProps) {
  const orderedValues = [...data.values].sort(
    (a, b) => a.position - b.position
  );

  const highlightedText =
    "Compromiso y experiencia.";

  const titleParts = data.title.includes(
    highlightedText
  )
    ? data.title.split(highlightedText)
    : [data.title];

  const mainTitle =
    titleParts[0]?.trim() ?? data.title;

  const highlightedTitle =
    data.title.includes(highlightedText)
      ? highlightedText
      : null;

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
            {mainTitle}

            {highlightedTitle && (
              <>
                <br />

                <strong>
                  {highlightedTitle}
                </strong>
              </>
            )}
          </h2>

          {orderedValues.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {orderedValues.map((value) => (
                <span
                  key={`${value.position}-${value.name}`}
                  className="rounded-full border border-current px-3 py-1 text-sm"
                >
                  {value.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="intro-body">
          <p>
            {data.description}
          </p>

          <div className="mission-grid">
            <div>
              <span>Misión</span>

              <p>
                {data.mission}
              </p>
            </div>

            <div>
              <span>Visión</span>

              <p>
                {data.vision}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}