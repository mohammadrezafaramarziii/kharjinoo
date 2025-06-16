import { useState } from "react";
import { AddCircleIcon, TrashIcon } from "../../ui/icons/outline";
import Title from "../../ui/Title";
import CardPreview from "./CardPreview";
import CardsList from "./CardsList";
import CreateCardForm from "./CreateCardForm";

export default function CardLayout() {
  const [active, setActive] = useState(true);
  const [isAddCard, setIsAddCard] = useState(false);

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-primary-1">
      <div className="w-full p-6">
        <Title title="مدیریت کارت ها" classNameTitle="!text-primary-2">
          <button onClick={() => setIsAddCard(true)}>
            <AddCircleIcon className="w-6 h-6 text-primary-2" />
          </button>
        </Title>
        <CreateCardForm
          isOpen={isAddCard}
          onClose={() => setIsAddCard(false)}
        />

        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setActive(!active)}
            className={`${
              active ? "btn--secondary" : "btn--outline__secondary"
            } duration-200 btn btn--sm rounded-full`}
          >
            {active ? "کارت پیش فرض" : "تنظیم به‌عنوان پیش‌فرض"}
          </button>
          <button className={`btn--secondary btn btn--sm rounded-full`}>
            <TrashIcon className="w-5 h-5 text-red-500" />
          </button>
        </div>
        <CardPreview />
      </div>
      <CardsList />
    </div>
  );
}
