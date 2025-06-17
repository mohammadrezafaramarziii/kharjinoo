import { useForm } from "react-hook-form";
import TextField from "../../ui/TextField";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { createProfileApi, signUpApi } from "../../services/authService";
import Loading from "../../ui/Loading";
import { ToastError, ToastSuccess } from "../../ui/Toast";
import translateErrorMsg from "../../utils/translateErrorMsg";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type Props = {
  onStep: (step: number) => void;
};

interface RegisterFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("نام و نام خانوادگی را وارد کنید"),
  email: Yup.string()
    .email("ایمیل وارد شده نادرست است")
    .required("ایمیل را وارد کنید"),
  phoneNumber: Yup.string()
    .matches(/^09\d{9}$/, "شماره موبایل وارد شده نادرست است")
    .required("شماره موبایل را وارد کنید"),
  password: Yup.string()
    .min(8, "رمز عبور باید حداقل 6 کاراکتر باشد")
    .matches(/^(?=.*\d).{1,}$/, "رمز عبور باید شامل حداقل یک عدد باشد")
    .matches(
      /^(?=.*[a-zA-Z]).{1,}$/,
      "رمز عبور باید شامل حداقل یک حرف انگلیسی باشد"
    )
    .matches(
      /^(?=.*[!@#$%^&*]).{1,}$/,
      "رمز عبور باید شامل حداقل یک (!@#$%^&*) باشد"
    )
    .required("رمز عبور را وارد کنید"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "تکرار رمز عبور مطابقت ندارد")
    .required("تکرار رمز عبور را وارد کنید"),
});

export default function RegisterForm({ onStep }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const { mutate: mutateSignUp, isPending } = useMutation({
    mutationFn: signUpApi,
  });
  const { mutate: mutateProfile, isPending: isPendingProfile } = useMutation({
    mutationFn: createProfileApi,
  });

  const navigate = useNavigate();

  const onSignup = (values: RegisterFormValues): void => {
    mutateSignUp(
      { ...values},
      {
        onSuccess: ({ data, error }) => {
          if (error) {
            ToastError(translateErrorMsg(error.message));
          } else {
            if (data.user) {
              mutateProfile(
                {
                  id: data.user.id,
                  name: values.name,
                  phoneNumber: values.phoneNumber,
                },
                {
                  onSuccess(status) {
                    if (status === 201) {
                      ToastSuccess("ثبت نام با موفقیت انجام شد!");
                      navigate("/dashboard");
                    } else {
                      ToastError("خطا در ثبت اطلاعات پروفایل.");
                    }
                  },
                }
              );
            }
          }
        },
        onError: (err) => {},
      }
    );
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onSubmit={handleSubmit(onSignup)}
      className="w-full bg-primary-2 min-h-screen flex flex-col gap-6 p-6"
    >
      <div className="h-[202px]">
        <motion.img
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          src="/images/loginPic.png"
          alt=""
          className="w-[270px] mx-auto"
        ></motion.img>
      </div>
      <div className="w-full flex flex-col gap-4.5">
        <div className="w-full flex flex-col items-start gap-2">
          <span className="text-primary-1 !font-alibaba font-bold text-lg">
            ثبت نام در اپلیکیشن
          </span>
          <p className="text-xs text-primary-4">
            جهت ثبت نام، اطلاعات زیر را تکمیل کنید..
          </p>
        </div>
        <div className="w-full flex flex-col gap-4.5">
          <TextField
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            name="name"
            register={register}
            errors={errors}
          />
          <TextField
            placeholder="ایمیل خود را وارد نمایید"
            name="email"
            register={register}
            errors={errors}
          />
          <TextField
            placeholder="شماره موبایل خود را وارد نمایید"
            name="phoneNumber"
            register={register}
            errors={errors}
          />
          <TextField
            placeholder="رمز عبور خود را وارد نمایید"
            name="password"
            register={register}
            errors={errors}
          />
          <TextField
            placeholder="تکرار رمز عبور خود را وارد نمایید"
            name="confirmPassword"
            register={register}
            errors={errors}
          />
        </div>
        <div className="w-full space-y-4 pb-10">
          <button
            type="submit"
            className="w-full btn btn--primary gap-2"
            disabled={isPending || isPendingProfile}
          >
            {isPending || isPendingProfile ? (
              <>
                درحال انجام...
                <Loading color="primary2" />
              </>
            ) : (
              "ثبت نام"
            )}
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            className="w-full text-center text-sm text-primary-1"
          >
            قبلاً ثبت‌نام کرده‌اید؟ وارد شوید
          </button>
        </div>
      </div>
    </motion.form>
  );
}
