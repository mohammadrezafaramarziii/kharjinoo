import type { ComponentProps } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type InputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  label?: string;
  register: UseFormRegister<TFormValues>;
  validationSchema?: RegisterOptions<TFormValues, Path<TFormValues>>;
  errors?: FieldErrors<TFormValues>;
} & ComponentProps<"input">;

export default function TextField<TFormValues extends FieldValues>({
  label,
  errors,
  register,
  validationSchema,
  name,
  ...rest
}: InputProps<TFormValues>) {
  const error = errors?.[name]?.message as string | undefined;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="font-bold text-xs text-primary-3 pr-2 mb-2">
          {label}
        </label>
      )}
      <input
        {...rest}
        {...register(name, validationSchema)}
        autoComplete="off"
        className={`textField__input ${error && "!border-red-600"}`}
      />
      {error && <div className="text-xs text-red-600 pr-2 pt-2">{error}</div>}
    </div>
  );
}
