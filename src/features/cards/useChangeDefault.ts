import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastSuccess } from "../../ui/Toast";
import { changeDefaultCardApi } from "../../services/cardsService";

export default function useChangeDefault() {
  const queryClient = useQueryClient();

  const { mutate: changeDefaultCard, isPending: isChanging } = useMutation({
    mutationFn: changeDefaultCardApi,
    onSuccess: ({ status }) => {
      if (status === 200) {
        ToastSuccess("کارت پیش فرض تغییر یافت");
        queryClient.invalidateQueries({ queryKey: ["get-cards"] });
      }
    },
  });

  return { changeDefaultCard, isChanging };
}
