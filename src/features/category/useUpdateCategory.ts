import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryApi } from "../../services/categoryService";
import type { CategoryType } from "./CategoryType";
import { ToastSuccess } from "../../ui/Toast";
import useUser from "../auth/useUser";

export default function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: updateCategory, isPending: isUpdating } = useMutation({
    mutationFn: (restData: CategoryType) =>
      updateCategoryApi({ userId: user.id, ...restData }),
    onSuccess: ({ status }) => {
      if (status === 200) {
        ToastSuccess("دسته بندی ویرایش شد");
        queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      }
    },
  });

  return { updateCategory, isUpdating };
}
