import type { ComponentProps } from "react";

type SelectProps = {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
} & ComponentProps<"select">;

export default function Select({
  label,
  error,
  options,
  ...rest
}: SelectProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="font-bold text-xs text-primary-3 pr-2 mb-2">
          {label}
        </label>
      )}
      <select
        {...rest}
        className={`textField__input ${error && "!border-red-600"}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="text-sm text-red-600 pr-2">{error}</div>}
    </div>
  );
}
