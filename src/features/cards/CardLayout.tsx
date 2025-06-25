import { useEffect, useState } from "react";
import { AddCircleIcon } from "../../ui/icons/outline";
import Title from "../../ui/Title";
import CardPreview from "./CardPreview";
import CreateCardForm from "./CreateCardForm";
import useCards from "./useCards";
import Loading from "../../ui/Loading";
import type { CardType } from "./CardType";
import CardItem from "./CardItem";
import { motion } from "framer-motion";
import { CardIcon } from "../../ui/icons/bold-duotone";
import EmptySection from "../../ui/EmptySection";

export default function CardLayout() {
  const { cards, isLoading } = useCards();
  const [active, setActive] = useState<CardType & { id: number }>();
  const [isAddCard, setIsAddCard] = useState(false);

  const sortedCards = cards?.sort((b, a) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  useEffect(() => {
    if (!isLoading) {
      setActive(
        sortedCards && sortedCards.length > 0
          ? sortedCards.find((c) => c.isDefault) || sortedCards?.[0]
          : sortedCards?.[0]
      );
    }
  }, [cards, isLoading]);

  if (isLoading)
    return (
      <div className="w-full h-[calc(100dvh-80px)] flex items-center justify-center">
        <Loading width={45} />
      </div>
    );

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

        {active && (
          <motion.div key={active?.bankNumber}>
            <CardPreview card={active!} />
          </motion.div>
        )}
      </div>
      <div className="w-full flex-1 bg-primary-2 rounded-t-2xl p-6 !mb-20 max-h-full flex flex-col gap-6 overflow-y-auto">
        {sortedCards && sortedCards?.length > 0 ? (
          sortedCards?.map((card, index) => (
            <motion.div
              key={index}
              initial={{ x: 56 }}
              animate={{ x: 0 }}
              transition={{ duration: (index + 2) / 10 }}
            >
              <CardItem card={card} setActive={setActive} />
            </motion.div>
          ))
        ) : (
          <EmptySection
            text="هنوز کارتی اضافه نکرده اید!"
            btnText="افزودن کارت جدید"
            icon={<CardIcon className="w-16 h-16" />}
            btn={{ onClick: () => setIsAddCard(true) }}
          />
        )}
      </div>
    </div>
  );
}
