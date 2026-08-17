import Input from "./Input";

export default function FormSection({ legend, inputs }) {
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
        ></Input>
      ))}
    </fieldset>
  );
}
