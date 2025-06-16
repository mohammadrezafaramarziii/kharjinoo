import React from "react";
import type { CardType } from "./CardType";
import CardItem from "./CardItem";
import { motion } from "framer-motion";

export default function CardsList() {
  const cardsList: CardType[] = [
    {
      accountNumber: 1233567833331234,
      eName: "tejarat",
      image: "tejarat.png",
      name: "بانک تجارت",
      expired: "12/05",
    },
    {
      accountNumber: 1233567833331234,
      eName: "pasargad",
      image: "pasargad.png",
      name: "بانک پاسارگاد",
      expired: "12/05",
    },
    {
      accountNumber: 1233567833331234,
      eName: "resalat",
      image: "resalat.png",
      name: "بانک رسالت",
      expired: "12/05",
    },
    {
      accountNumber: 1233567833331234,
      eName: "sarmaye",
      image: "sarmaye.png",
      name: "بانک سرمایه",
      expired: "12/05",
    },
  ];
  return (
    <div className="w-full flex-1 bg-primary-2 rounded-t-2xl p-6 !mb-20 max-h-full flex flex-col gap-6 overflow-y-auto">
      {cardsList.map((card, index) => (
        <motion.div
          key={index}
          initial={{ x: 56 }}
          animate={{ x: 0 }}
          transition={{ duration: (index + 2) / 10 }}
        >
          <CardItem
            accountNumber={card.accountNumber}
            eName={card.eName}
            image={`/images/banks/${card.image}`}
            name={card.name}
            expired={card.expired}
          />
        </motion.div>
      ))}
    </div>
  );
}
