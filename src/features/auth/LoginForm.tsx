import { useForm } from "react-hook-form";
import TextField from "../../ui/TextField";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../services/authService";
import Loading from "../../ui/Loading";
import { ToastError } from "../../ui/Toast";
import translateErrorMsg from "../../utils/translateErrorMsg";
import { useNavigate } from "react-router-dom";

type Props = {
  onStep: () => void;
};

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("ایمیل وارد شده نادرست است")
    .required("ایمیل را وارد کنید"),
  password: Yup.string().required("رمز عبور را وارد کنید"),
});

export default function LoginForm({ onStep }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema),
  });
  const { mutate: mutateLogin, isPending } = useMutation({
    mutationFn: loginApi,
  });
  const navigate = useNavigate();

  const onSubmit = (values: LoginFormValues) => {
    mutateLogin(values, {
      onSuccess: ({ error }) => {
        if (error) {
          ToastError(translateErrorMsg(error.message));
        } else {
          navigate("/dashboard");
        }
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onSubmit={handleSubmit(onSubmit)}
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
            ورود به اپلیکیشن
          </span>
          <p className="text-xs text-primary-4">
            جهت ورود به اپلیکیشن، ایمیل و رمز عبور خود را وارد کنید.
          </p>
        </div>
        <div className="w-full flex flex-col gap-4.5">
          <TextField
            placeholder="ایمیل خود را وارد نمایید"
            name="email"
            register={register}
            errors={errors}
          />
          <TextField
            placeholder="رمز عبور خود را وارد نمایید"
            name="password"
            register={register}
            errors={errors}
            type="password"
          />
        </div>
        <div className="w-full space-y-4 pb-10">
          <button
            type="submit"
            className="w-full btn btn--primary"
            disabled={isPending}
          >
            {isPending ? (
              <>
                درحال ورود...
                <Loading color="primary2" />
              </>
            ) : (
              "ورود"
            )}
          </button>
          <button
            type="button"
            onClick={onStep}
            className="w-full text-center text-sm text-primary-1"
          >
            حساب کاربری ندارید؟ ثبت‌نام کنید
          </button>
        </div>
      </div>
    </motion.form>
  );
}
