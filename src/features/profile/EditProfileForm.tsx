import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import TextField from "../../ui/TextField";
import Title from "../../ui/Title";
import { CameraIcon } from "../../ui/icons/bold";

export default function EditProfileForm() {
  const { register } = useForm();

  return (
    <div className="w-full p-6 min-h-[100dvh] flex flex-col gap-4 justify-between">
      <div>
        <Title title="ویرایش حساب کاربری">
          <button onClick={() => window.history.back()}>
            <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
          </button>
        </Title>
        <div className="w-full flex flex-col gap-4.5 mt-6">
          {/* {avatar ? (
            <div>
              <img src={avatar} alt={name} className="w-11 h-11 rounded-full" />
            </div>
          ) : ( */}
          <div className="w-18 h-18 relative flex items-center justify-center overflow-hidden bg-primary-1 font-black text-2xl rounded-full outline-2 outline-primary-2 text-primary-2 outline-offset-4">
            <span>م</span>
            <div className="w-full absolute bottom-0 right-0 flex items-center justify-center bg-primary-3/60 py-1">
              <CameraIcon className="w-5 h-5 text-primary-2" />
            </div>
          </div>
          {/* )} */}
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
