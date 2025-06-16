import React from "react";
import {
  toLocalShortDate,
  toLocalShortTime,
} from "../../utils/toLocalPersianDateTime";
import { numberWithCommas } from "../../utils/numberWithCommas";

type Props = {
  title: string;
  datetime: Date;
  bank: string;
  bankName: string;
  amount: number;
};

export default function TransactionItem({
  amount,
  bank,
  bankName,
  datetime,
  title,
}: Props) {
  return (
    <div className="w-full bg-white border border-primary-1/15 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 p-2 rounded-xl bg-primary-1/15 flex items-center justify-center">
          <img src={bank} alt={bankName} className="w-full" />
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-primary-3 font-bold text-sm">{title}</h4>
          <div className="flex items-center gap-3">
            <span className="text-xs text-primary-4">
              {toLocalShortDate(datetime)} - {toLocalShortTime(datetime)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 text-primary-3 font-bold">
        <span>{numberWithCommas(amount)}</span>
        <span className="text-xs text-primary-4 font-normal">تومان</span>
      </div>
    </div>
  );
}
