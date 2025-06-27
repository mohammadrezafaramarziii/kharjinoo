import ReportCard from "./ReportCard";
import Title from "../../ui/Title";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import ReportFilter from "./ReportFilter";
import { motion } from "framer-motion";
import useTransition from "../transactions/useTransactions";
import Loading from "../../ui/Loading";
import { useState } from "react";
import type { Filters } from "./FilterType";
import EmptySection from "../../ui/EmptySection";
import { DocumentIcon } from "../../ui/icons/bold-duotone";

const INITIAL_FILTERS: Filters = {
  type: "all",
  category: 0,
  card: 0,
  fromDate: null,
  toDate: null,
};

export default function ReportsList() {
  const { transactions, isLoading } = useTransition();
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);

  const filteredTransactions = (transactions ?? []).filter((item) => {
    const date = new Date(item.date);

    const matchType =
      filters.type === "all" ||
      item.type === (filters.type === "0" ? "0" : "1");

    const matchCategory = filters.category
      ? item.categoryId === filters.category
      : true;

    const matchCard = filters.card ? item.cardId === filters.card : true;

    const matchDate =
      (!filters.fromDate || date >= filters.fromDate) &&
      (!filters.toDate || date <= filters.toDate);

    return matchType && matchCategory && matchCard && matchDate;
  });

  return (
    <div className="flex flex-col gap-4">
      <Title title="گزارشات">
        <button onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      {!isLoading ? (
        transactions && transactions?.length > 0 ? (
          <>
            <ReportFilter filters={filters} setFilters={setFilters} />
            {filteredTransactions.length > 0 ? (
              <div className="flex flex-col gap-4">
                {filteredTransactions?.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: (index + 2) / 10 }}
                  >
                    <ReportCard report={item} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptySection
                text="تراکنشی یافت نشد!"
                icon={<DocumentIcon className="w-16 h-16" />}
                className="!h-[calc(100dvh-76px-80px-112px-24px)]"
              />
            )}
          </>
        ) : (
          <EmptySection
            text="تراکنشی ثبت نکرده اید!"
            icon={<DocumentIcon className="w-16 h-16" />}
            className="!h-[calc(100dvh-76px-80px-24px)]"
          />
        )
      ) : (
        <div className="w-full h-[calc(100dvh-96px-24px-28px-16px)] flex items-center justify-center">
          <Loading width={45} />
        </div>
      )}
    </div>
  );
}
