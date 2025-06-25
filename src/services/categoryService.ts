import type {
  CategoryFormValuesType,
  CategoryType,
} from "../features/category/CategoryType";
import { supabase } from "../lib/supabaseClient";

const TABLE_NAME = "category";

export async function getCategoriesApi(userId: string) {
  return await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .then(({ data }) => data);
}

export async function createCategoryApi({
  name,
  description,
  userId,
}: CategoryFormValuesType & { userId: string }) {
  return await supabase
    .from(TABLE_NAME)
    .insert([{ name, description, user_id: userId }])
    .then((data) => data);
}

export async function updateCategoryApi({
  name,
  description,
  id,
  userId,
}: CategoryType & { id: number; userId: string }) {
  return await supabase
    .from(TABLE_NAME)
    .update({ name, description })
    .eq("id", id)
    .eq("user_id", userId)
    .select();
}

export async function deleteCategoryApi({
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
    .eq("user_id", userId);
}
