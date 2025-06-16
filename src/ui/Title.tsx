import React from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
  classNameTitle?: string;
};

export default function Title({ title, children, classNameTitle }: Props) {
  return (
    <div className="w-full flex items-center justify-between">
      <h4 className={`${classNameTitle} text-primary-3 font-bold font-alibaba text-lg`}>{title}</h4>
      {children}
    </div>
  );
}
