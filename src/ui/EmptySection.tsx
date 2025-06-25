import { type ComponentProps, type ReactNode } from "react";

type Props = {
  icon: ReactNode;
  text: string;
  btn: ComponentProps<"button">;
  btnText: string;
};

export default function EmptySection({ icon, text, btn, btnText }: Props) {
  return (
    <div className="w-full h-[calc(100dvh-76px-80px)] flex items-center justify-center flex-col gap-4">
      <span className="text-primary-3/30">{icon}</span>
      <p className="text-sm text-primary-4">{text}</p>
      <button {...btn} className={"btn btn--outline__primary btn--sm"}>
        {btnText}
      </button>
    </div>
  );
}
