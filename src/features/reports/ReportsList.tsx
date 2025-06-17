import ReportCard from "./ReportCard";
import Title from "../../ui/Title";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import ReportFilter from "./ReportFilter";
import { motion } from "framer-motion";

export default function ReportsList() {
  return (
    <div className="flex flex-col gap-4">
      <Title title="گزارشات">
        <button onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      <ReportFilter />
      <div className="flex flex-col gap-4">
        {Array(10)
          .fill({})
          .map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 30,opacity:0 }}
              animate={{ y: 0,opacity:1 }}
              transition={{ duration: (index + 2) / 10 }}
            >
              <ReportCard
                title="تراکنش 1"
                amount={1000000}
                bankName="بانک ملی"
                bank="/images/banks/melli.png"
                datetime={new Date()}
                index={0}
              />
            </motion.div>
          ))}
      </div>
    </div>
  );
}
