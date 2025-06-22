import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCategoryApi } from "../../services/categoryService";
import { ToastError, ToastSuccess } from "../../ui/Toast";
import useUser from "../auth/useUser";
import translateErrorMsg from "../../utils/translateErrorMsg";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: (data: { id: number }) =>
      deleteCategoryApi({ userId: user.id, ...data }),
    onSuccess: ({ status, error }) => {
      if (status === 204) {
        ToastSuccess("دسته بندی حذف شد");
        queryClient.invalidateQueries({ queryKey: ["get-categories"] });
      } else {
        ToastError(translateErrorMsg(error?.message as string));
      }
    },
  });

  return { deleteCategory, isDeleting };
}
