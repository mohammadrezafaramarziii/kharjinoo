import Title from "../../ui/Title";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import TextField from "../../ui/TextField";
import { useForm } from "react-hook-form";

export default function ChangePasswordForm() {
  const { register } = useForm();

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
            name="email"
            register={register}
          />
          <TextField
            placeholder="رمز عبور جدید را وارد نمایید"
            name="email"
            register={register}
          />
          <TextField
            placeholder="تکرار رمز عبور جدید را وارد نمایید"
            name="phone"
            register={register}
          />
        </div>
      </div>
      <div className="w-full space-y-4">
        <button type="submit" className="w-full btn btn--primary">
          ثبت تغییرات
        </button>
      </div>
    </div>
  );
}
