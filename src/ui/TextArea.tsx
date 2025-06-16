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
} & ComponentProps<"textarea">;

export default function TextArea<TFormValues extends FieldValues>({
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
      <textarea
        {...rest}
        {...register(name, validationSchema)}
        autoComplete="off"
        className={`textField__input resize-none ${error && "!border-red-600"}`}
      />
      {error && <div className="text-sm text-red-600 pr-2">{error}</div>}
    </div>
  );
}
