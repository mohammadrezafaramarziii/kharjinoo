import { useMutation, useQueryClient } from "@tanstack/react-query";
import useUser from "../auth/useUser";
import { ToastSuccess } from "../../ui/Toast";
import type { TransactionsType } from "./TransactionsType";
import { addTransactionApi } from "../../services/transactionsService";
import { updateInventoryApi } from "../../services/cardsService";
import type { CardType } from "../cards/CardType";
import type { CategoryType } from "../category/CategoryType";

export default function useAddTransaction() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate: addNewTransaction, isPending: isCreating } = useMutation({
    mutationFn: (restData: Omit<TransactionsType, "id">) =>
      addTransactionApi({ userId: user.id, ...restData }),
    onSuccess: ({ status, data }) => {
      if (status === 201 && data && Array.isArray(data) && data.length > 0) {
        const res: TransactionsType & {
          cards: CardType;
          category: CategoryType;
        } = data[0];

        ToastSuccess("تراکنش جدید اضافه شد");
        queryClient.invalidateQueries({ queryKey: ["get-transactions"] });
        updateInventoryApi({
          id: Number(res.cardId),
          inventory:
            res.type === "0"
              ? res.cards.inventory + Number(res.amount)
              : res.cards.inventory - Number(res.amount),
        });
      }
    },
  });

  return { addNewTransaction, isCreating };
}
