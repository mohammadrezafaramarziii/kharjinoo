import { Link, useParams } from "react-router-dom";
import { ArrowLeftIcon, LeftIcon } from "../../ui/icons/arrow";
import { EditIcon, TrashIcon } from "../../ui/icons/outline";
import Title from "../../ui/Title";
import { toLocalShortDate } from "../../utils/toLocalPersianDateTime";
import useReportById from "./useReportById";
import Loading from "../../ui/Loading";
import { accountNumberCommas } from "../../utils/accountNumberCommas";
import type { TransactionsType } from "../transactions/TransactionsType";
import type { CardType } from "../cards/CardType";
import type { CategoryType } from "../category/CategoryType";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { MinusIcon, PlusIcon } from "../../ui/icons/bold";
import { CardIcon, CategoryIcon } from "../../ui/icons/bold-duotone";
import Modal from "../../ui/Modal";
import { useState } from "react";
import EditCategoryForm from "../transactions/EditCategoryForm";
import useDeleteTransaction from "../transactions/useDeleteTransaction";
import { motion } from "framer-motion";

export default function ReportDetailsById() {
  const { id } = useParams();
  const { reportData, isLoading } = useReportById(Number(id));
  const report: Omit<TransactionsType, "date" | "time"> & {
    cards: CardType;
    category: CategoryType;
    time: string;
    date: Date;
  } = reportData;
  const [isEdit, setIsEdit] = useState(false);
  const { deleteTransaction, isDeleting } = useDeleteTransaction();

  const deleteHandler = () => {
    deleteTransaction({ id: report.id });
  };

  if (isLoading)
    return (
      <div className="w-full h-[100dvh] flex items-center justify-center">
        <Loading width={45} />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-full min-h-[100dvh] flex flex-col justify-between  pb-24">
        <div className="w-full">
          <div
            className={
              "w-full bg-primary-1/5 pb-14 flex flex-col items-center justify-center rounded-b-[100px]"
            }
          >
            <div className="w-full p-6">
              <Title classNameTitle="!text-sm" title="جزئیات تراکنش">
                <button onClick={() => window.history.back()}>
                  <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
                </button>
              </Title>
            </div>
            <div
              className={`text-3xl font-bold flex items-center gap-1 mt-6 ${
                report.type === "0" ? "text-green-600" : "text-red-600"
              }`}
            >
              {numberWithCommas(Number(report.amount))}{" "}
              <span className="text-sm font-normal">تومان</span>
              {report.type === "0" && (
                <PlusIcon className="w-6 h-6 text-green-600" />
              )}
              {report.type === "1" && (
                <MinusIcon className="w-6 h-6 text-red-600" />
              )}
            </div>

            <h2 className="text-primary-3">{report.title}</h2>
          </div>

          <div>
            <div className="w-full flex justify-center -mt-8">
              <div className="aspect-square w-16 p-3 bg-white shadow-lg flex items-center justify-center overflow-hidden rounded-full">
                <img
                  src={`/images/banks/${report.cards.image}`}
                  alt=""
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            <div className="flex items-center w-full justify-center gap-4 mt-7">
              <div
                onClick={() => setIsEdit(true)}
                className="flex items-center gap-2 cursor-pointer px-2 py-1.5 text-xs text-primary-1 bg-primary-1/5 rounded-full"
              >
                <CategoryIcon className="w-4 h-4" />
                <span>{report.category.name}</span>
                <LeftIcon className="w-4 h-4 text-primary-4 -rotate-90" />
              </div>
              <Modal isOpen={isEdit} onClose={() => setIsEdit(false)}>
                <EditCategoryForm
                  report={report}
                  onClose={() => setIsEdit(false)}
                />
              </Modal>
              <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-primary-3 bg-primary-3/5 rounded-full">
                <CardIcon className="w-4 h-4" />
                <span>{report.cards.name}</span>
              </div>
            </div>
          </div>

          <div className="w-ful p-3 mt-6">
            <div className="w-full bg-primary-1/5 rounded-xl p-4">
              <div className="text-primary-3 text-sm font-medium pb-3">شرح</div>
              <p className="text-xs text-primary-3/70">
                {report.description || "بدون توضیحات"}
              </p>
            </div>

            <div className="mt-6 px-2 flex flex-col gap-4">
              <div className="w-full flex items-center justify-between text-sm border-b border-b-primary-4/30 pb-4">
                <span className="text-primary-3/50">تاریخ و زمان</span>
                <span className="text-primary-3 font-medium">
                  {`${toLocalShortDate(report.date)} - ${report.time
                    .split(":")
                    .slice(0, 2)
                    .join(":")}`}
                </span>
              </div>
              <div className="w-full flex items-center justify-between text-sm">
                <span className="text-primary-3/50">شماره کارت</span>
                <span dir="ltr" className="text-primary-3 font-medium">
                  {accountNumberCommas(Number(report.cards.bankNumber))}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <button
            disabled={isDeleting}
            onClick={deleteHandler}
            className="btn btn--danger !w-full mt-8"
          >
            {isDeleting ? (
              <>
                در حال حذف...
                <Loading color="primary2" />
              </>
            ) : (
              "حذف تراکنش"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
