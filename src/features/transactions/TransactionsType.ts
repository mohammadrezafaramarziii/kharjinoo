import type { DateObject } from "react-multi-date-picker";

export type TransactionsType = {
  id: number;
  title: string;
  description?: string;
  type: "0" | "1";
  cardId: string;
  categoryId: string;
  amount: string;
  date: DateObject | null;
  time: DateObject | null;
};
