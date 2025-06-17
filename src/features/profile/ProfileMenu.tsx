import React, { useState } from "react";
import { LeftIcon } from "../../ui/icons/arrow";
import { PasswordIcon, UserInfoIcon } from "../../ui/icons/outline";
import { Link } from "react-router-dom";
import { LogoutIcon } from "../../ui/icons/action";
import useLogout from "../auth/useLogout";
import Modal from "../../ui/Modal";

type ProfileMenuType = {
  label: string;
  link: string;
  icon: React.ReactNode;
  description: string;
};

export default function ProfileMenu() {
  const { logoutUser } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const menus: ProfileMenuType[] = [
    {
      label: "ویرایش حساب کاربری",
      link: "edit",
      icon: <UserInfoIcon className="w-7 h-7" />,
      description: "ویرایش اطلاعات حساب کاربری شما",
    },
    {
      label: "تغییر رمز عبور",
      link: "change-password",
      icon: <PasswordIcon className="w-7 h-7" />,
      description: "تغییر رمز ورود شما به برنامه",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-5 mt-8">
      {menus.map((item, index) => (
        <ProfileMenuItem
          key={index}
          label={item.label}
          link={item.link}
          icon={item.icon}
          description={item.description}
        />
      ))}
      <button
        type="button"
        className="w-full flex items-center justify-between text-red-500 text-sm"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500 text-primary-2 flex items-center justify-center">
            <LogoutIcon className="w-7 h-7" />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span>خروج از حساب کاربری</span>
            <span className="text-xs text-red-500/60">
              خروج از حساب بدون تغییر یا حذف اطلاعات شما
            </span>
          </div>
        </div>
        <LeftIcon className="w-6 h-6 text-primary-4" />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <p className="mb-6 text-primary-3">
            آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
          </p>
          <div className="flex justify-end">
            <button
              type="button"
              className="btn btn--secondary !bg-white ml-2"
              onClick={() => setIsOpen(false)}
            >
              انصراف
            </button>
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => logoutUser()}
            >
              خروج
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ProfileMenuItem({ label, link, icon, description }: ProfileMenuType) {
  return (
    <Link
      to={link}
      className="w-full flex items-center justify-between text-primary-3 text-sm"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-1 text-primary-2 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <span>{label}</span>
          <span className="text-xs text-primary-4">{description}</span>
        </div>
      </div>
      <LeftIcon className="w-6 h-6 text-primary-4" />
    </Link>
  );
}
