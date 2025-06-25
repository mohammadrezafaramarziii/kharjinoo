import type { ReactNode } from "react";
import CountUp from "react-countup";

type VariantField = { bg: string; text: string; outline: string };

type Variant = {
  blue: VariantField;
  green: VariantField;
  orange: VariantField;
  red: VariantField;
};

type Props = {
  variant: "blue" | "green" | "orange" | "red";
  icon: ReactNode;
  label: string;
  value: number;
  valueTxt: string;
  separator?: "," | " ";
};

const variants: Variant = {
  blue: {
    bg: "bg-primary-1",
    text: "text-primary-1",
    outline: "border-primary-1/50",
  },
  green: {
    bg: "bg-green-500",
    text: "text-green-500",
    outline: "border-green-500/50",
  },
  orange: {
    bg: "bg-orange-500",
    text: "text-orange-500",
    outline: "border-orange-500/50",
  },
  red: {
    bg: "bg-red-500",
    text: "text-red-500",
    outline: "border-red-500/50",
  },
};

export default function States({
  variant = "blue",
  icon,
  label,
  value,
  valueTxt,
  separator = " ",
}: Props) {
  return (
    <div className={`w-full p-6 rounded-3xl relative ${variants[variant].bg}`}>
      <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/shape1.svg')] opacity-50 bg-cover"></div>

      <div
        className={`w-12 h-12 bg-primary-2 !border-3 ${variants[variant].outline} ${variants[variant].text} rounded-full flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="pt-6">
        <div className="text-white text-sm pb-1">{label}</div>
        <div className="text-xs text-primary-2/80">
          {value ? (
            <CountUp end={value} duration={3} separator={separator} />
          ) : (
            0
          )}{" "}
          {valueTxt}
        </div>
      </div>
    </div>
  );
}
