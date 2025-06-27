import { useState } from "react";
import { PlusIcon } from "./icons/bold";

export default function Accordion({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden bg-white p-4 rounded-2xl">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-primary-1 font-bold cursor-pointer"
      >
        <div className="text-sm flex-1">{title}</div>
        <button>
          <PlusIcon
            className={`${isOpen ? "rotate-45" : "rotate-0"} w-5 h-5 duration-300`}
          />
        </button>
      </div>
      <div
        className={`${
          isOpen ? "max-h-screen mt-4" : "max-h-0"
        } overflow-hidden duration-300 ease-in-out text-xs text-primary-3 leading-6 whitespace-pre-line`}
      >
        {content}
      </div>
    </div>
  );
}
