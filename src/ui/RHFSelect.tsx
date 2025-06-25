import type { ComponentProps } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type SelectProps<TFormValues extends FieldValues> = {
  label?: string;
  name: Path<TFormValues>;
  options: { value: string; label: string }[];
  register: UseFormRegister<TFormValues>;
  validationSchema?: RegisterOptions<TFormValues, Path<TFormValues>>;
  errors?: FieldErrors<TFormValues>;
} & ComponentProps<"select">;

export default function RHFSelect<TFormValues extends FieldValues>({
  label,
  options,
  errors,
  register,
  validationSchema,
  name,
  ...rest
}: SelectProps<TFormValues>) {
  const error = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="font-bold text-xs text-primary-3 pr-2 mb-2">
          {label}
        </label>
      )}
      <select
        {...register(name, validationSchema)}
        {...rest}
        className={`textField__input ${error && "!border-red-600"}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="text-xs text-red-600 pr-2 pt-2">{error}</div>}
    </div>
  );
}
