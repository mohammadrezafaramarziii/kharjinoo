import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastSuccess } from "../../ui/Toast";
import { createCardApi } from "../../services/cardsService";
import useUser from "../auth/useUser";
import type { CardType } from "./CardType";

export default function useCreateCard() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutate: createCard, isPending: isCreating } = useMutation({
    mutationFn: (restData: Omit<CardType, "isDefault">) =>
      createCardApi({ userId: user.id, ...restData }),
    onSuccess: ({ status }) => {
      if (status === 201) {
        ToastSuccess("کارت جدید اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["get-cards"] });
      }
    },
  });

  return { createCard, isCreating };
}
