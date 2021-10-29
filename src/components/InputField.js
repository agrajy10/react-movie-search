export default function InputField({
  label,
  type,
  id,
  name,
  value,
  handleChange,
}) {
  return (
    <>
      <label className="block font-semibold mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        required
        id={id}
        className="w-full h-12 mb-5 rounded text-primary-color transition-colors border border-gray-300 bg-form-field-bg px-4 py-2 placeholder-gray-600 outline-none focus:bg-white focus:border-primary-color"
        type={type}
        name={name ? name : id}
        value={value}
        onChange={handleChange}
      />
    </>
  );
}
