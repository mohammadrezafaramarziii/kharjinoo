import { useState, type ComponentProps } from "react";
import type {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { EyeCloseIcon, EyeOpenIcon } from "./icons/bold";

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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col">
      {label && (
        <label className="font-bold text-xs text-primary-3 pr-2 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...rest}
          {...register(name, validationSchema)}
          type={
            rest.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : rest.type
          }
          autoComplete="off"
          className={`textField__input ${error && "!border-red-600"}`}
        />
        {rest.type === "password" && (
          <button
            onClick={() => setShowPassword(!showPassword)}
            type="button"
            className="absolute top-1/2 -translate-y-1/2 left-4 text-primary-4"
          >
            {showPassword ? (
              <EyeOpenIcon className="w-6 h-6" />
            ) : (
              <EyeCloseIcon className="w-6 h-6" />
            )}
          </button>
        )}
      </div>
      {error && <div className="text-xs text-red-600 pr-2 pt-2">{error}</div>}
    </div>
  );
}
