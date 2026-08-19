import { fieldHasValue, sectionHasValue, subsectionHasValue } from "../utils";

function PreviewField({ label, value }) {
  return (
    <div className="preview-field">
      {label}: {value}
    </div>
  );
}

function PreviewSubsection({ fields }) {
  fields = Object.values(fields);

  return (
    <div className="preview-subsection">
      {fields.map((field) =>
        fieldHasValue(field) ? (
          <PreviewField
            key={field.id}
            label={field.label}
            value={field.value}
          ></PreviewField>
        ) : null,
      )}
    </div>
  );
}

function PreviewSection({ subsections, legend }) {
  return (
    <div className="preview-section">
      <h3>{legend}</h3>

      {subsections.map((fields, index) => {
        if (!subsectionHasValue(fields)) {
          return;
        }

        return (
          <PreviewSubsection fields={fields} key={index}></PreviewSubsection>
        );
      })}
    </div>
  );
}

export default function Preview({ cv }) {
  const sections = Object.values(cv);

  return (
    <section className="cv-preview">
      <h2>Preview</h2>
      <div className="preview">
        {sections.map((section, index) => {
          if (sectionHasValue(section)) {
            return (
              <PreviewSection
                key={index}
                legend={section.legend}
                subsections={section.subsections}
              ></PreviewSection>
            );
          }
        })}
      </div>
    </section>
  );
}
