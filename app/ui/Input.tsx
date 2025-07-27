type InputProps = {
  value: string;
  onChange: (value: string, error?: string) => void;
  placeholder: string;
  maxLength: number;
  minLength: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  onlyNumbers?: boolean;
  type?: "text" | "month";
};

export default function Input({
  value,
  onChange,
  placeholder,
  maxLength,
  minLength,
  inputMode,
  pattern,
  onlyNumbers = false,
  type = "text",
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (onlyNumbers) {
      val = val.replace(/[^0-9]/g, "");
    }

    // NOTE: very basic error checking without using 3rd party libraries
    const hasMaxLengthError = maxLength && val.length > maxLength;
    const hasMinLengthError = minLength && val.length < minLength;
    const hasError = hasMaxLengthError || hasMinLengthError;

    const message =
      minLength === maxLength
        ? `Enter a valid value (max ${maxLength} characters)`
        : `Enter a valid value (between ${minLength} and ${maxLength} characters)`;

    const errorMessage = hasError ? message : "";

    onChange(val, errorMessage);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      value={value}
      onChange={handleChange}
      minLength={minLength}
      maxLength={maxLength}
      inputMode={inputMode}
      pattern={pattern}
    />
  );
}
