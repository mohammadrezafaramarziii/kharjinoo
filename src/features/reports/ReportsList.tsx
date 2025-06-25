import ReportCard from "./ReportCard";
import Title from "../../ui/Title";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import ReportFilter from "./ReportFilter";
import { motion } from "framer-motion";
import useTransition from "../transactions/useTransactions";
import Loading from "../../ui/Loading";
import { useState } from "react";
import type { Filters } from "./FilterType";

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

  console.log(filters);

  return (
    <div className="flex flex-col gap-4">
      <Title title="گزارشات">
        <button onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      {!isLoading ? (
        <>
          <ReportFilter filters={filters} setFilters={setFilters} />
          <div className="flex flex-col gap-4">
            {transactions?.map((item, index) => (
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
        </>
      ) : (
        <div className="w-full h-[calc(100dvh-96px-24px-28px-16px)] flex items-center justify-center">
          <Loading width={45} />
        </div>
      )}
    </div>
  );
}
