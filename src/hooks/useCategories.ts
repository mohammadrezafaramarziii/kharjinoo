import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "../services/categoryService";
import useUser from "../features/auth/useUser";

export default function useCategories() {
  const { user } = useUser();
  const { data: categories, isLoading } = useQuery({
    queryKey: ["get-categories"],
    queryFn: () => getCategoriesApi(user.id),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const transformCategory = categories?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return { categories, transformCategory, isLoading };
}
