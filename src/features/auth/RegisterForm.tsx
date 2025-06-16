import { useForm } from "react-hook-form";
import TextField from "../../ui/TextField";
import { motion } from "framer-motion";

type Props = {
  onStep: () => void;
};

export default function RegisterForm({ onStep }: Props) {
  const { register } = useForm();

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onSubmit={(e) => e.preventDefault()}
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
            name="email"
            register={register}
          />
          <TextField
            placeholder="ایمیل خود را وارد نمایید"
            name="email"
            register={register}
          />
          <TextField
            placeholder="شماره موبایل خود را وارد نمایید"
            name="phone"
            register={register}
          />
          <TextField
            placeholder="رمز عبور خود را وارد نمایید"
            name="email"
            register={register}
          />
          <TextField
            placeholder="تکرار رمز عبور خود را وارد نمایید"
            name="email"
            register={register}
          />
        </div>
        <div className="w-full space-y-4 pb-10">
          <button type="submit" className="w-full btn btn--primary">
            ثبت نام
          </button>
          <button
            type="button"
            onClick={onStep}
            className="w-full text-center text-sm text-primary-1"
          >
            قبلاً ثبت‌نام کرده‌اید؟ وارد شوید
          </button>
        </div>
      </div>
    </motion.form>
  );
}
