import {
  toLocalShortDate,
  toLocalShortTime,
} from "../../utils/toLocalPersianDateTime";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { CategoryIcon } from "../../ui/icons/bold-duotone";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  datetime: Date;
  bank: string;
  bankName: string;
  amount: number;
  index: number;
};

export default function ReportCard({
  amount,
  bank,
  bankName,
  datetime,
  title,
  index,
}: Props) {
  return (
    <Link
      to={"/dashboard/reports/1"}
      className={`w-full bg-white border border-primary-1/10 rounded-2xl p-4 flex items-start justify-between`}
    >
      <div className="flex items-start gap-2">
        <div className="flex flex-col gap-1.5">
          <h4 className="text-primary-3 font-bold text-sm">{title}</h4>
          <p className="text-xs text-primary-4">خرید از فروشگاه انجام دادم</p>
          <div className="flex items-center gap-1">
            <CategoryIcon className="w-4 h-4 text-primary-1/70" />
            <p className="text-xs text-primary-4">باشگاه</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="aspect-square w-5 flex items-center justify-center overflow-hidden">
              <img
                src={bank}
                alt={bankName}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <p className="text-xs text-primary-4">1234-****-****-2512</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <div
          className={`${
            index % 2 === 0 ? "text-red-600" : "text-green-500"
          } flex items-center gap-1 font-bold text-sm`}
        >
          <span>{numberWithCommas(amount)}</span>
          <span className="text-xs text-primary-4 font-normal">تومان</span>
        </div>
        <div className="flex flex-col gap-px items-end">
          <span className="text-xs text-primary-4">
            {toLocalShortDate(datetime)}
          </span>
          <span className="text-xs text-primary-4">
            {toLocalShortTime(datetime)}
          </span>
        </div>
      </div>
    </Link>
  );
}
