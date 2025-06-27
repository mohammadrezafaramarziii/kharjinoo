import Loading from "../../ui/Loading";
import { numberWithCommas } from "../../utils/numberWithCommas";
import toEnglishNumber from "../../utils/toEnglishNumber";
import type { TransactionsType } from "../transactions/TransactionsType";
import useTransition from "../transactions/useTransactions";

const daysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();

const getShamsiDay = (date: string | Date): number => {
  const day = new Date(date).toLocaleDateString("fa-IR", { day: "2-digit" });
  return Number(toEnglishNumber(day));
};

export default function ReportBarChart() {
  const { transactions, isLoading } = useTransition();

  const today = new Date();
  const thisMonthTitle = today.toLocaleDateString("fa-IR", { month: "long" });

  const depositByDay: { [key: string]: number } = {};
  const wthdrawalByDay: { [key: string]: number } = {};

  transactions?.forEach(
    (t: Omit<TransactionsType, "date"> & { date: Date }) => {
      if (t.type === "1") return;

      const date = new Date(t.date);
      const shamsiMonth = date.toLocaleDateString("fa-IR", { month: "long" });
      const thisMonth = today.toLocaleDateString("fa-IR", { month: "long" });

      if (shamsiMonth !== thisMonth) return;

      const day = getShamsiDay(t.date);

      depositByDay[day] = (depositByDay[day] || 0) + Number(t.amount);
    }
  );
  transactions?.forEach(
    (t: Omit<TransactionsType, "date"> & { date: Date }) => {
      if (t.type === "0") return;

      const date = new Date(t.date);
      const shamsiMonth = date.toLocaleDateString("fa-IR", { month: "long" });
      const thisMonth = today.toLocaleDateString("fa-IR", { month: "long" });

      if (shamsiMonth !== thisMonth) return;

      const day = getShamsiDay(t.date);

      wthdrawalByDay[day] = (wthdrawalByDay[day] || 0) + Number(t.amount);
    }
  );

  const daysArray = Array.from(
    { length: daysInMonth(today.getFullYear(), today.getMonth()) },
    (_, i) => {
      const day = (i + 1).toString();
      return { label: day, value: day };
    }
  );

  const chartData = daysArray.map((day) => {
    return {
      ...day,
      deposit: depositByDay[day.value] || 0,
      wthdrawal: wthdrawalByDay[day.value] || 0,
    };
  });
  const maxDeposit = Math.max(...chartData.map((d) => d.deposit));
  const maxWthdrawal = Math.max(...chartData.map((d) => d.wthdrawal));

  const depositThisMonth = transactions
    ?.filter((t) => {
      const date = new Date(t.date);
      const now = new Date();

      return (
        t.type === "0" &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const wthdrawalThisMonth = transactions
    ?.filter((t) => {
      const date = new Date(t.date);
      const now = new Date();

      return (
        t.type === "1" &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, t) => sum + Number(t.amount), 0);

  if (isLoading)
    return (
      <div className="w-full h-[calc(100dvh-96px-24px-28px-16px)] flex items-center justify-center">
        <Loading width={45} />
      </div>
    );

  return (
    <>
      <div className="w-full h-auto bg-white rounded-2xl p-6 mt-6">
        <div className="w-full flex items-center justify-between mb-8">
          <h3 className="text-primary-1 font-bold text-sm">
            نمودار واریز {thisMonthTitle} ماه
          </h3>
          <div className="text-xs text-primary-3">
            <span>کل:</span>
            <span>{numberWithCommas(depositThisMonth)} تومان</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full h-auto relative flex items-end justify-between">
            {chartData.map((item, index) =>
              Number(index - 1) % 6 === 0 || item.deposit ? (
                <div className="w-full fex flex-col">
                  <div className="w-full h-[200px] flex flex-col gap-1 justify-end items-center border-b border-b-primary-3/30">
                    {item.deposit > 0 ? (
                      <div className="text-xs text-primary-3 text-center whitespace-nowrap">
                        {numberWithCommas(item.deposit)} ت
                      </div>
                    ) : null}
                    <div
                      className="w-2 bg-green-500 rounded-t-full transition-all duration-700"
                      style={{
                        height:
                          item.deposit === 0
                            ? "0"
                            : `calc(max(${
                                (item.deposit / maxDeposit) * 100
                              }%, 4px))`,
                      }}
                    />
                  </div>
                  <div className="w-full text-xs text-primary-3 text-center pt-2">
                    {item.label}
                  </div>
                </div>
              ) : null
            )}
            <div className="absolute w-full h-full flex flex-col justify-between gap-2 items-center top-0 right-0">
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto bg-white rounded-2xl p-6 mt-6">
        <div className="w-full flex items-center justify-between mb-8">
          <h3 className="text-primary-1 font-bold text-sm">
            نمودار برداشت {thisMonthTitle} ماه
          </h3>
          <div className="text-xs text-primary-3">
            <span>کل:</span>
            <span>{numberWithCommas(wthdrawalThisMonth)} تومان</span>
          </div>
        </div>

        <div className="flex-1">
          <div className="w-full h-auto relative flex items-end justify-between">
            {chartData.map((item, index) =>
              Number(index - 1) % 6 === 0 || item.wthdrawal ? (
                <div className="w-full fex flex-col">
                  <div className="w-full h-[200px] flex flex-col gap-1 justify-end items-center border-b border-b-primary-3/30">
                    {item.wthdrawal > 0 ? (
                      <div className="text-xs text-primary-3 text-center whitespace-nowrap">
                        {numberWithCommas(item.wthdrawal)} ت
                      </div>
                    ) : null}
                    <div
                      className="w-2 bg-red-600 rounded-t-full transition-all duration-700"
                      style={{
                        height:
                          item.wthdrawal === 0
                            ? "0"
                            : `calc(max(${
                                (item.wthdrawal / maxWthdrawal) * 100
                              }%, 4px))`,
                      }}
                    />
                  </div>
                  <div className="w-full text-xs text-primary-3 text-center pt-2">
                    {item.label}
                  </div>
                </div>
              ) : null
            )}
            <div className="absolute w-full h-full flex flex-col justify-between gap-2 items-center top-0 right-0">
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
              <div className="w-full h-px bg-primary-3/5 last:h-0"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
