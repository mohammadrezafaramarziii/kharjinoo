import type { ComponentProps } from "react";

type InputProps = {
  label?: string;
  error?: string;
} & ComponentProps<"input">;

export default function TextFieldNormal({ label, error, ...rest }: InputProps) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="font-bold text-xs text-primary-3 pr-2 mb-2">
          {label}
        </label>
      )}
      <input
        {...rest}
        autoComplete="off"
        className={`textField__input ${error && "!border-red-600"}`}
      />
      {error && <div className="text-xs text-red-600 pr-2 pt-2">{error}</div>}
    </div>
  );
}
