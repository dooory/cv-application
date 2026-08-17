// Form inputs:
// - General Info: Name, Email, Phone number
// - Job experience: position, company name, time spent employed, responsbilities
// - Educational experience: School name, title of study, and date of study

import FormSection from "./FormSection";

export default function Form({ formSchema }) {
  return (
    <div className="cv-form">
      <form action="" id="builder-form">
        {formSchema.map((section) => (
          <FormSection
            key={section.id}
            legend={section.legend}
            inputs={section.fields}
          ></FormSection>
        ))}
      </form>
    </div>
  );
}
