import type { CardType } from "../features/cards/CardType";
import { supabase } from "../lib/supabaseClient";

const TABLE_NAME = "cards";

export async function getCardsApi({ userId }: { userId: string }) {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .then(({ data }) => data);
}

export async function createCardApi({
  name,
  bName,
  englishName,
  bankNumber,
  expireMonth,
  expireYear,
  image,
  inventory,
  userId,
}: { userId: string } & Omit<CardType, "isDefault">) {
  return await supabase
    .from(TABLE_NAME)
    .insert([
      {
        name,
        bName,
        englishName,
        bankNumber,
        expireMonth,
        expireYear,
        image,
        inventory,
        isDefault: false,
      },
    ])
    .eq("user_id", userId)
    .select();
}

export async function deleteCardApi({ id }: { id: number }) {
  return await supabase.from(TABLE_NAME).delete().eq("id", id);
}

export async function updateInventoryApi({
  id,
  inventory,
}: {
  id: number;
  inventory: number;
}) {
  return await supabase
    .from("cards")
    .update({ inventory })
    .eq("id", id)
    .select();
}

export async function changeDefaultCardApi({
  cardId,
  userId,
}: {
  cardId: number;
  userId: string;
}) {
  await supabase
    .from(TABLE_NAME)
    .update({ isDefault: false })
    .eq("user_id", userId);

  return await supabase
    .from(TABLE_NAME)
    .update({ isDefault: true })
    .eq("id", cardId)
    .select()
    .single();
}
