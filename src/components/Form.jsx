function FormInput({ value, label, type, name, handleChange }) {
  return (
    <div className="form-input">
      <label>
        {label}
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          autoComplete="off"
        ></input>
      </label>
    </div>
  );
}

function FormSubsection({ data, updateField }) {
  const fields = Object.values(data);
  console.log(fields);

  return (
    <div className="form-subsection">
      {fields.map((field) => (
        <FormInput
          value={field.value}
          label={field.label}
          type={field.type}
          key={field.id}
          name={field.id}
          handleChange={(e) => updateField(field.id, e.target.value)}
        ></FormInput>
      ))}
    </div>
  );
}

function FormSection({ legend, data, repeatable, addSubsection, updateField }) {
  const subsections = data && data.subsections;

  return (
    <fieldset className="form-section">
      <legend>{legend}</legend>

      {subsections &&
        subsections.map((subsection, index) => {
          return (
            <FormSubsection
              key={index}
              data={subsection}
              updateField={(fieldId, value) =>
                updateField(index, fieldId, value)
              }
            ></FormSubsection>
          );
        })}

      {repeatable ? (
        <button type="button" onClick={addSubsection}>
          Add {legend}
        </button>
      ) : null}
    </fieldset>
  );
}

export default function Form({ cv, schema, addSubsection, updateFormField }) {
  return (
    <section className="cv-builder">
      <h2>Builder</h2>
      <div className="cv-form">
        <form action="" id="builder-form">
          {schema.map((section) => {
            return (
              <FormSection
                legend={section.legend}
                data={cv[section.id]}
                repeatable={section.repeatable}
                schema={section.template}
                updateField={(subsectionId, fieldId, value) =>
                  updateFormField(section.id, subsectionId, fieldId, value)
                }
                addSubsection={() => addSubsection(section.id)}
                key={section.id}
              ></FormSection>
            );
          })}
        </form>
      </div>
    </section>
  );
}
