import type { TransactionsType } from "../features/transactions/TransactionsType";
import { supabase } from "../lib/supabaseClient";
import toEnglishNumber from "../utils/toEnglishNumber";

const TABLE_NAME = "transactions";

export async function getTransactionsApi({ userId }: { userId: string }) {
  return await supabase
    .from(TABLE_NAME)
    .select(
      `
    *,
    cards (id, name, bankNumber, image),
    category (id, name)
  `
    )
    .eq("user_id", userId)
    .then(({ data }) => data);
}

export async function getTransactionByIdApi({
  transactionId,
}: {
  transactionId: number;
}) {
  return await supabase
    .from(TABLE_NAME)
    .select(
      `
    *,
    cards (id, name, bankNumber, image),
    category (id, name)
  `
    )
    .eq("id", transactionId)
    .then(({ data }) => data);
}

export async function addTransactionApi({
  title,
  description,
  amount,
  cardId,
  categoryId,
  date,
  time,
  type,
  userId,
}: Omit<TransactionsType, "id"> & {
  userId: string;
}) {
  const formatedDate = date?.toDate().toISOString();
  const formatedTime = toEnglishNumber(time?.format("HH:mm") as string);

  return await supabase
    .from(TABLE_NAME)
    .insert([
      {
        title,
        description,
        amount,
        cardId,
        categoryId,
        date: formatedDate,
        time: formatedTime,
        type,
        user_id: userId,
      },
    ])
    .select(
      `
    *,
    cards (id, name, inventory),
    category (id, name)
  `
    );
}

export async function updateCategoryTransactionApi({
  categoryId,
  id,
  userId,
}: {
  categoryId: string;
  id: number;
  userId: string;
}) {
  return await supabase
    .from(TABLE_NAME)
    .update({ categoryId: categoryId })
    .eq("id", id)
    .eq("user_id", userId)
    .select();
}

export async function deleteTransactionsApi({
  id,
  userId,
}: {
  id: number;
  userId: string;
}) {
  return await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", id)
    .eq("user_id", userId)
    .select(
      `
    *,
    cards (id, name, inventory),
    category (id, name)
  `
    );
}
