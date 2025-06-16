import { Link } from "react-router-dom";
import { ArrowLeftIcon, LeftIcon } from "../../ui/icons/arrow";
import Title from "../../ui/Title";
import { CalendarIcon, SupportIcon } from "../../ui/icons/outline";

type SettingMenu = {
  label: string;
  link: string;
  icon: React.ReactNode;
  description: string;
};

export default function SettingsLayout() {
  const menus: SettingMenu[] = [
    {
      label: "نمایش تاریخ",
      link: "edit",
      icon: <CalendarIcon className="w-7 h-7" />,
      description: "ویرایش فرمت تاریخ ها",
    },
    {
      label: "پشتیبانی",
      link: "edit",
      icon: <SupportIcon className="w-7 h-7" />,
      description: "پشتیبانی و سوالات متداول",
    },
    {
      label: "درباره خرجینو",
      link: "edit",
      icon: <SupportIcon className="w-7 h-7" />,
      description: "درباره ما، راه های ارتباطی",
    },
  ];

  return (
    <div>
      <Title title="تنظیمات">
        <button onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      <div className="w-full flex flex-col gap-5 mt-8">
        {menus.map((item, index) => (
          <SettingMenuItem
            key={index}
            label={item.label}
            link={item.link}
            icon={item.icon}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

function SettingMenuItem({ label, link, icon, description }: SettingMenu) {
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
