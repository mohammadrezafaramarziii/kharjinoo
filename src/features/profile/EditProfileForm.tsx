import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import TextField from "../../ui/TextField";
import Title from "../../ui/Title";
import { CameraIcon } from "../../ui/icons/bold";
import useUser from "../auth/useUser";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateAvatarApi,
  updateProfileApi,
  uploadAvatarApi,
} from "../../services/authService";
import { supabase } from "../../lib/supabaseClient";
import Loading from "../../ui/Loading";
import { ToastSuccess } from "../../ui/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormValuesType {
  name?: string;
  userId?: string;
  phoneNumber: string;
}

const schema = z.object({
  name: z.string().optional(),
  userId: z.string().optional(),
  phoneNumber: z
    .string({ required_error: "شماره موبایل را وارد کنید" })
    .regex(/^09\d{9}$/, "شماره موبایل وارد شده نادرست است"),
});

export default function EditProfileForm() {
  const { user } = useUser();
  const { name, phoneNumber, email, avatarUrl } = user || {};
  const [newAvatar, setNewAvatar] = useState<File>();
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: updateProfileApi,
  });
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>({
    defaultValues: {
      userId: user?.id,
      name,
      phoneNumber,
    },
    resolver: zodResolver(schema),
  });

  const updateHandler = async (values: FormValuesType) => {
    if (!newAvatar) {
      updateProfile(
        { ...values },
        {
          onSuccess: ({ status }) => {
            if (status === 204) {
              queryClient.invalidateQueries({ queryKey: ["get-user"] });
              ToastSuccess("انجام شد");
            }
          },
        }
      );
      return;
    }

    const ext = newAvatar?.name?.split(".").pop();
    const fileName = `${user?.id}.${ext}`;

    let resultAvatar = null;
    if (avatarUrl) {
      resultAvatar = await updateAvatarApi({
        fileName,
        avatarFile: newAvatar,
      });
    } else {
      resultAvatar = await uploadAvatarApi({
        fileName,
        avatarFile: newAvatar,
      });
    }

    if (resultAvatar) {
      const { data: getPublicUrl } = supabase.storage
        .from("avatars")
        .getPublicUrl(resultAvatar.path);

      if (getPublicUrl) {
        updateProfile(
          { ...values, avatarUrl: `${getPublicUrl.publicUrl}?v=${Date.now()}` },
          {
            onSuccess: ({ status }) => {
              if (status === 204) {
                queryClient.invalidateQueries({ queryKey: ["get-user"] });
                ToastSuccess("انجام شد");
              }
            },
          }
        );
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(updateHandler)}
      className="w-full p-6 min-h-[100dvh] flex flex-col gap-4 justify-between"
    >
      <div>
        <Title title="ویرایش حساب کاربری">
          <button type="button" onClick={() => window.history.back()}>
            <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
          </button>
        </Title>
        <div className="w-full flex flex-col gap-4.5 mt-6">
          <input
            type="file"
            name="avatarUrl"
            id="avatarUrl"
            hidden
            accept="image/png image/jpeg image/jpg"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const files = e.target.files;
              if (files && files?.length > 0) {
                setNewAvatar(files[0]);
              }
            }}
          />
          {avatarUrl || newAvatar ? (
            <div className="relative w-18 h-18 rounded-full overflow-hidden">
              <img
                src={newAvatar ? URL.createObjectURL(newAvatar) : avatarUrl}
                alt={name}
                className="w-full h-full object-contain object-center"
              />
              <label
                htmlFor="avatarUrl"
                className="w-full cursor-pointer absolute bottom-0 right-0 flex items-center justify-center bg-primary-3/60 py-1"
              >
                <CameraIcon className="w-5 h-5 text-primary-2" />
              </label>
            </div>
          ) : (
            <div className="w-18 h-18 relative flex items-center justify-center overflow-hidden bg-primary-1 font-black text-2xl rounded-full outline-2 outline-primary-2 text-primary-2 outline-offset-4">
              <span>{name && name.slice(0, 1)}</span>
              <label
                htmlFor="avatarUrl"
                className="w-full cursor-pointer absolute bottom-0 right-0 flex items-center justify-center bg-primary-3/60 py-1"
              >
                <CameraIcon className="w-5 h-5 text-primary-2" />
              </label>
            </div>
          )}
          <TextField
            placeholder="نام و نام خانوادگی خود را وارد کنید"
            name="name"
            register={register}
          />
          {/* <TextField
            placeholder="ایمیل خود را وارد نمایید"
            name="email"
            register={register}
          /> */}
          <TextField
            placeholder="شماره موبایل خود را وارد نمایید"
            name="phoneNumber"
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="w-full space-y-4">
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full btn btn--primary"
        >
          {isUpdating ? (
            <>
              درحال انجام...
              <Loading color="primary2" />
            </>
          ) : (
            "ثبت تغییرات"
          )}
        </button>
      </div>
    </form>
  );
}
