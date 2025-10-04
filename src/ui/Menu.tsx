import type React from "react";
import {
  CardIcon,
  CategoryIcon,
  DocumentIcon,
  HomeIcon,
  PlusIcon,
} from "./icons/outline";
import {
  HomeIcon as HomeDuotoneIcon,
  DocumentIcon as DocumentDuontoneIcon,
  CardIcon as CardduotoneIcon,
  CategoryIcon as CategoryDuontoneIcon,
  PlusIcon as PlusDuontoneIcon,
} from "./icons/bold-duotone";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

type Menu = {
  label: string;
  link: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
};

export default function Menu() {
  const menu: Menu[] = [
    {
      label: "خانه",
      link: "/dashboard",
      icon: <HomeIcon className="w-6 h-6" />,
      activeIcon: <HomeDuotoneIcon className="w-6 h-6" />,
    },
    {
      label: "کارت ها",
      link: "/dashboard/cards",
      icon: <CardIcon className="w-6 h-6" />,
      activeIcon: <CardduotoneIcon className="w-6 h-6" />,
    },
    {
      label: "تراکنش جدید",
      link: "/dashboard/add-transactions",
      icon: <PlusIcon className="w-6 h-6" />,
      activeIcon: <PlusDuontoneIcon className="w-6 h-6" />,
    },
    {
      label: "دسته بندی",
      link: "/dashboard/category",
      icon: <CategoryIcon className="w-6 h-6" />,
      activeIcon: <CategoryDuontoneIcon className="w-6 h-6" />,
    },
    {
      label: "گزارشات",
      link: "/dashboard/reports",
      icon: <DocumentIcon className="w-6 h-6" />,
      activeIcon: <DocumentDuontoneIcon className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-full sm:max-w-sm p-4 fixed bottom-0 right-0 z-50 sm:right-1/2 sm:translate-x-1/2 bg-white shadow-[0_-7px_15px_-3px_rgba(0,0,0,0.1)]">
      <ul className="w-full grid grid-cols-5 gap-2">
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            label={item.label}
            link={item.link}
            icon={item.icon}
            activeIcon={item.activeIcon}
          />
        ))}
      </ul>
    </div>
  );
}

function MenuItem({ activeIcon, icon, label, link }: Menu) {
  const { pathname } = useLocation();
  const isActive = pathname === link;

  return (
    <li className={"relative"}>
      <div className="w-full absolute -top-4 right-0 flex justify-center">
        <div
          className={`${
            isActive ? "h-1" : "h-0"
          } w-3 bg-primary-1 rounded-b-full duration-150`}
        ></div>
      </div>
      <Link to={link} className="flex flex-col items-center gap-2">
        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.1 }}
              className="text-primary-1"
            >
              {activeIcon}
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.1 }}
              className="text-primary-4"
            >
              {icon}
            </motion.div>
          )}
        </AnimatePresence>
        <span
          className={`${
            isActive ? "text-primary-3 font-bold" : "text-primary-4"
          } text-xs`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}
