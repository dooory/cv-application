import { useRef, useState } from "react";

function Input(props) {
  const className = "form-input";

  const { type, ...rest } = props;

  if (rest.type !== "textarea") {
    return <input type={type} className={className} {...rest}></input>;
  } else {
    return <textarea className={className} {...rest}></textarea>;
  }
}

function FormInput({
  isEditing,
  value,
  label,
  type,
  name,
  handleChange,
  required,
}) {
  return (
    <div className="form-input-container">
      <label>
        {label}
        {required ? " (*)" : null}
        <Input
          type={type}
          value={value}
          name={name}
          required={required}
          onChange={handleChange}
          disabled={!isEditing}
          autoComplete="off"
        ></Input>
      </label>
    </div>
  );
}

function FormSubsection({
  data,
  updateField,
  isEditing,
  deletable,
  deleteSubsection,
}) {
  const fields = Object.values(data);

  return (
    <div className="form-subsection">
      <div className="fields-container">
        {fields.map((field) => (
          <FormInput
            value={field.value}
            label={field.label}
            type={field.type}
            key={field.id}
            name={field.id}
            required={field.required}
            isEditing={isEditing}
            handleChange={(e) => updateField(field.id, e.target.value)}
          ></FormInput>
        ))}
      </div>

      <div className="subsection-buttons">
        {isEditing && deletable ? (
          <button
            type="button"
            className="remove-subsection-button"
            onClick={deleteSubsection}
          >
            Remove
          </button>
        ) : null}
      </div>
    </div>
  );
}

function InteractButton({ editing, handleEdit, handleSave }) {
  if (editing) {
    return (
      <button type="submit" className="save-button" onClick={handleSave}>
        Save
      </button>
    );
  } else {
    return (
      <button type="button" className="edit-button" onClick={handleEdit}>
        Edit
      </button>
    );
  }
}

function FormSection({
  legend,
  data,
  repeatable,
  addSubsection,
  deleteSubsection,
  saveSection,
  updateField,
}) {
  const subsections = data && data.subsections;

  const [editing, setEditing] = useState(true);
  const formRef = useRef(null);

  return (
    <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <p>Required fields (*)</p>
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
                deletable={index !== 0}
                isEditing={editing}
                deleteSubsection={() => deleteSubsection(index)}
              ></FormSubsection>
            );
          })}

        <div className="buttons-container">
          <InteractButton
            editing={editing}
            handleEdit={() => setEditing(true)}
            handleSave={() => {
              if (!formRef.current.reportValidity()) return;
              setEditing(false);
              saveSection();
            }}
          />

          {repeatable && editing ? (
            <button type="button" onClick={addSubsection}>
              Add {legend}
            </button>
          ) : null}
        </div>
      </fieldset>
    </form>
  );
}

export default function Form({
  cv,
  schema,
  saveSection,
  addSubsection,
  deleteSubsection,
  updateFormField,
}) {
  return (
    <section className="cv-builder">
      <h2>Builder</h2>
      <div className="cv-form" id="builder-form">
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
              saveSection={() => saveSection(section.id)}
              addSubsection={() => addSubsection(section.id)}
              deleteSubsection={(subsectionId) =>
                deleteSubsection(section.id, subsectionId)
              }
              key={section.id}
            ></FormSection>
          );
        })}
      </div>
    </section>
  );
}
