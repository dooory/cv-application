import Input from "./Input";

export default function FormSection({ legend, inputs, updateCV }) {
  return (
    <fieldset>
      <legend>{legend}</legend>

      {inputs.map((input) => (
        <Input
          key={input.id}
          label={input.label}
          type={input.type}
          name={input.id}
          placeholder={input.placeholder}
          autoComplete={input.autoComplete}
          handleChange={(e) => {
            updateCV(input.id, e.target.value);
          }}
        ></Input>
      ))}
    </fieldset>
  );
}
