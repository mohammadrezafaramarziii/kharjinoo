import Title from "../../ui/Title";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import TextField from "../../ui/TextField";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { changePasswordApi, loginApi } from "../../services/authService";
import useUser from "../auth/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastSuccess } from "../../ui/Toast";
import Loading from "../../ui/Loading";

interface FormValues {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
}

const passwordSchema = z
  .string({ required_error: "رمز عبور را وارد کنید" })
  .min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
  .refine((val) => /\d/.test(val), {
    message: "رمز عبور باید شامل حداقل یک عدد باشد",
  })
  .refine((val) => /[a-zA-Z]/.test(val), {
    message: "رمز عبور باید شامل حداقل یک حرف انگلیسی باشد",
  })
  .refine((val) => /[!@#$%^&*]/.test(val), {
    message: "رمز عبور باید شامل حداقل یک (!@#$%^&*) باشد",
  });

const schema = z
  .object({
    password: z.string().nonempty({ message: "رمز عبور فعلی را وارد کنید" }),
    newPassword: passwordSchema,
    confirmNewPassword: z.string({
      required_error: "تکرار رمز عبور را وارد کنید",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "تکرار رمز عبور مطابقت ندارد",
    path: ["confirmNewPassword"],
  });

export default function ChangePasswordForm() {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const { mutate: checkCurrentPass, isPending: isChecking } = useMutation({
    mutationFn: loginApi,
  });
  const { mutate: changePassword, isPending: isChanging } = useMutation({
    mutationFn: changePasswordApi,
  });

  const submitChangePassword = (values: FormValues) => {
    checkCurrentPass(
      { email: user.email, password: values.password },
      {
        onSuccess: ({ error }) => {
          if (error) {
            setError("password", { message: "رمز عبور فعلی نادرست است" });
          } else {
            changePassword(
              { newPassword: values.newPassword },
              {
                onSuccess: ({ user }) => {
                  if (user) {
                    ToastSuccess("انجام شد");
                    reset();
                  }
                },
              }
            );
          }
        },
      }
    );
  };

  return (
    <div className="w-full p-6 min-h-[100dvh] flex flex-col gap-4 justify-between">
      <div>
        <Title title="تغییر رمز عبور">
          <button onClick={() => window.history.back()}>
            <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
          </button>
        </Title>
        <div className="w-full flex flex-col gap-4.5 mt-6">
          <TextField
            placeholder="رمز عبور فعلی خود را وارد کنید"
            name="password"
            register={register}
            errors={errors}
            type="password"
          />
          <TextField
            placeholder="رمز عبور جدید را وارد نمایید"
            name="newPassword"
            register={register}
            errors={errors}
            type="password"
          />
          <TextField
            placeholder="تکرار رمز عبور جدید را وارد نمایید"
            name="confirmNewPassword"
            register={register}
            errors={errors}
            type="password"
          />
        </div>
      </div>
      <div className="w-full space-y-4">
        <button
          onClick={handleSubmit(submitChangePassword)}
          type="submit"
          disabled={isChanging || isChecking}
          className="w-full btn btn--primary"
        >
          {isChanging || isChecking ? (
            <>
              درحال انجام...
              <Loading color="primary2" />
            </>
          ) : (
            "ثبت تغییرات"
          )}
        </button>
      </div>
    </div>
  );
}
