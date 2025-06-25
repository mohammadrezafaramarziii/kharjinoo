import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "../auth/useUser";
import { ToastSuccess } from "../../ui/Toast";
import { deleteTransactionsApi } from "../../services/transactionsService";
import { useNavigate } from "react-router-dom";
import { updateInventoryApi } from "../../services/cardsService";
import type { TransactionsType } from "./TransactionsType";
import type { CardType } from "../cards/CardType";
import type { CategoryType } from "../category/CategoryType";

export default function useDeleteTransaction() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteTransaction, isPending: isDeleting } = useMutation({
    mutationFn: (restData: { id: number }) =>
      deleteTransactionsApi({ userId: user.id, ...restData }),
    onSuccess: ({ status, data }) => {
      if (status === 200 && data && Array.isArray(data) && data.length > 0) {
        const res: TransactionsType & {
          cards: CardType;
          category: CategoryType;
        } = data[0];

        ToastSuccess("تراکنش حذف شد");
        navigate("/dashboard/reports");
        updateInventoryApi({
          id: Number(res.cardId),
          inventory:
            res.type === "0"
              ? res.cards.inventory - Number(res.amount)
              : res.cards.inventory + Number(res.amount),
        });
      }
    },
  });

  return { deleteTransaction, isDeleting };
}
