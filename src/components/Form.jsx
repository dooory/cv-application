// Form inputs:
// - General Info: Name, Email, Phone number
// - Job experience: position, company name, time spent employed, responsbilities
// - Educational experience: School name, title of study, and date of study

import FormSection from "./FormSection";

export default function Form({ formSchema, updateCV }) {
  return (
    <section className="cv-builder">
      <h1>Builder</h1>
      <div className="cv-form">
        <form action="" id="builder-form">
          {formSchema.map((section) => (
            <FormSection
              key={section.id}
              legend={section.legend}
              inputs={section.fields}
              updateCV={(fieldId, newValue) =>
                updateCV(section.id, fieldId, newValue)
              }
            ></FormSection>
          ))}
        </form>
      </div>
    </section>
  );
}
