export default function Input({
  label,
  placeholder,
  name,
  type,
  autoComplete,
  handleChange,
}) {
  return (
    <div className="input-container">
      <label>
        {label}
        <input
          placeholder={placeholder}
          type={type}
          name={name}
          autoComplete={autoComplete}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
