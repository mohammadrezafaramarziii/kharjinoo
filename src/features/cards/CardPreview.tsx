import { accountNumberCommas } from "../../utils/accountNumberCommas";
import { motion } from "framer-motion";
import type { CardType } from "./CardType";
import { TrashIcon } from "../../ui/icons/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCardApi } from "../../services/cardsService";
import Loading from "../../ui/Loading";
import { ToastError, ToastSuccess } from "../../ui/Toast";
import useUser from "../auth/useUser";
import useChangeDefault from "./useChangeDefault";
import { numberWithCommas } from "../../utils/numberWithCommas";
import translateErrorMsg from "../../utils/translateErrorMsg";

type Props = {
  card: CardType & { id: number };
};
export default function CardPreview({ card }: Props) {
  const { mutate: mutateDelete, isPending } = useMutation({
    mutationFn: deleteCardApi,
  });
  const queryClient = useQueryClient();
  const { user } = useUser();
  const { changeDefaultCard, isChanging } = useChangeDefault();

  const deleteHandler = () => {
    mutateDelete(
      { id: card.id },
      {
        onSuccess: ({ status, error }) => {
          if (status === 204) {
            ToastSuccess("کارت حذف شد");
            queryClient.invalidateQueries({ queryKey: ["get-cards"] });
          } else {
            ToastError(translateErrorMsg(error?.message as string));
          }
        },
      }
    );
  };

  const changeDefaultHandler = () => {
    if (!card?.isDefault) {
      changeDefaultCard({ cardId: card.id, userId: user.id });
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mt-6">
        <button
          onClick={changeDefaultHandler}
          className={`${
            card?.isDefault ? "btn--secondary" : "btn--outline__secondary"
          } duration-200 btn btn--sm rounded-full`}
        >
          {card?.isDefault ? "کارت پیش فرض" : "تنظیم به‌عنوان پیش‌فرض"}
        </button>
        <button
          disabled={isPending}
          onClick={deleteHandler}
          className={`btn--secondary btn btn--sm rounded-full`}
        >
          {isPending ? (
            <Loading />
          ) : (
            <TrashIcon className="w-5 h-5 text-red-500" />
          )}
        </button>
      </div>

      <div className="w-full mt-4 relative z-20 bg-slate-900/40 shadow-xl p-5 rounded-3xl overflow-hidden">
        <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/shape1.svg')] blur bg-cover bg-center"></div>
        <div className="relative z-10 w-full flex flex-col gap-7">
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex items-center gap-2">
              <div className="aspect-square w-12 flex items-center justify-center overflow-hidden">
                <img
                  src={`/images/banks/${card?.image}`}
                  alt={card?.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="text-primary-2 text-sm">{card?.name || ""}</div>
            </div>
            <img src={"/images/cardShetab.png"} alt="" className="w-10" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-xs text-white">شماره کارت</div>
            <div className="w-full flex flex-row-reverse items-center justify-end gap-3 text-xl text-white font-semibold">
              {accountNumberCommas(Number(card?.bankNumber))
                .split("\u2000")
                .map((item, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: (index + 2) / 10 }}
                  >
                    {item}
                  </motion.span>
                ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            {card.inventory > 0 ? (
              <div className="text-primary-2">
                موجودی: {numberWithCommas(card?.inventory)}{" "}
                <span className="text-xs">تومان</span>
              </div>
            ) : (
              <div className="text-red-600">عدم موجودی کافی</div>
            )}
            <div className="text-sm text-primary-2/70">
              انقضا: {card?.expireMonth} / {card?.expireYear}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
