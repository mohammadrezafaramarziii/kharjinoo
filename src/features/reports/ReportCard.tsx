import { toLocalShortDate } from "../../utils/toLocalPersianDateTime";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { CategoryIcon } from "../../ui/icons/bold-duotone";
import { Link } from "react-router-dom";
import type { TransactionsType } from "../transactions/TransactionsType";
import type { CardType } from "../cards/CardType";
import type { CategoryType } from "../category/CategoryType";
import { accountNumberCommas } from "../../utils/accountNumberCommas";
import { MinusIcon, PlusIcon } from "../../ui/icons/bold";

type Props = {
  report: Omit<TransactionsType, "date" | "time"> & {
    cards: CardType;
    category: CategoryType;
    date: Date;
    time: string;
  };
};

export default function ReportCard({ report }: Props) {
  return (
    <Link
      to={`/dashboard/transaction-detail/${report.id}`}
      className={`w-full bg-white border border-primary-1/10 rounded-2xl p-4 flex items-start justify-between`}
    >
      <div className="flex items-start gap-2">
        <div className="flex flex-col gap-1.5">
          <h4 className="text-primary-3 font-bold text-sm">{report.title}</h4>
          <p className="text-xs text-primary-4">{report.description}</p>
          <div className="flex items-center gap-1">
            <CategoryIcon className="w-4 h-4 text-primary-1/70" />
            <p className="text-xs text-primary-4">{report.category.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="aspect-square w-7 flex items-center justify-center overflow-hidden">
              <img
                src={`/images/banks/${report.cards.image}`}
                alt={report.cards.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex items-center flex-row-reverse gap-1.5 text-xs text-primary-4">
              {accountNumberCommas(Number(report.cards.bankNumber))
                .split("\u2000")
                .map((item, index) => (
                  <span key={index}>
                    {index === 1 || index === 2 ? "****" : item}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <div
          className={`${
            report.type === "1" ? "text-red-600" : "text-green-500"
          } flex items-center gap-1 font-bold text-sm`}
        >
          <span>{numberWithCommas(Number(report.amount))}</span>
          <span className="text-xs text-primary-4 font-normal">تومان</span>
        </div>
        <div className="flex flex-col gap-px items-end">
          <span className="text-xs text-primary-4">
            {toLocalShortDate(report.date)}
          </span>
          <span className="text-xs text-primary-4">
            {report.time.split(":").slice(0, 2).join(":")}
          </span>
          {report.type === "0" && (
            <PlusIcon className="w-4 h-4 text-green-500" />
          )}
          {report.type === "1" && (
            <MinusIcon className="w-4 h-4 text-red-600" />
          )}
        </div>
      </div>
    </Link>
  );
}
