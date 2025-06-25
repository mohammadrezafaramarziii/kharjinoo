import { useState } from "react";
import useCategories from "../../hooks/useCategories";
import RadioButton from "../../ui/RadioButton";
import type { TransactionsType } from "./TransactionsType";
import Loading from "../../ui/Loading";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryTransactionApi } from "../../services/transactionsService";
import { ToastSuccess } from "../../ui/Toast";
import useUser from "../auth/useUser";
import type { CardType } from "../cards/CardType";
import type { CategoryType } from "../category/CategoryType";

type Props = {
  report: Omit<TransactionsType, "date" | "time"> & {
    cards: CardType;
    category: CategoryType;
  };
  onClose: () => void;
};
export default function EditCategoryForm({ onClose, report }: Props) {
  const [selected, setSelected] = useState<string>(report.categoryId);
  const { categories, isLoading } = useCategories();
  const { mutate: mutateUpdate, isPending } = useMutation({
    mutationFn: updateCategoryTransactionApi,
  });
  const queryClient = useQueryClient();
  const { user } = useUser();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutateUpdate(
      { categoryId: selected, id: report.id, userId: user.id },
      {
        onSuccess: ({ status }) => {
          if (status === 200) {
            ToastSuccess("دسته بندی تراکنش ویرایش شد");
            queryClient.invalidateQueries({
              queryKey: ["get-transaction-by-id", report.id],
            });
            onClose();
          }
        },
      }
    );
  };

  if (isLoading)
    return (
      <div className="w-full py-10 flex items-center justify-center">
        <Loading width={35} />
      </div>
    );

  return (
    <form onSubmit={submitHandler}>
      <div className="w-full flex flex-col gap-2 mb-6">
        {categories?.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-3 cursor-pointer">
            <RadioButton
              checked={selected === item.id}
              id={item.id}
              name="category"
              label={item.name}
              onChange={() => setSelected(item.id)}
              value={item.id}
            />
          </div>
        ))}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="btn btn--primary w-full"
      >
        {isPending ? (
          <>
            درحال انجام...
            <Loading color="primary2" />
          </>
        ) : (
          "ویرایش دسته بندی"
        )}
      </button>
    </form>
  );
}
