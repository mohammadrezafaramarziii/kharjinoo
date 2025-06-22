import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategoryApi } from "../../services/categoryService";
import useUser from "../auth/useUser";
import type { CategoryFormValuesType } from "./CategoryType";
import { ToastSuccess } from "../../ui/Toast";

export default function useCreateCategory() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: (restData: CategoryFormValuesType) =>
      createCategoryApi({ userId: user.id, ...restData }),
    onSuccess: ({ status }) => {
      if (status === 201) {
        ToastSuccess("دسته بندی جدید اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      }
    },
  });

  return { createCategory, isCreating };
}
