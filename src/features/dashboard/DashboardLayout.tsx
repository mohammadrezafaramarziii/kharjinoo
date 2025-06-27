import { Link } from "react-router-dom";
import { ChartIcon } from "../../ui/icons/outline";
import UserData from "../../ui/UserData";
import useTransition from "../transactions/useTransactions";
import CountUp from "react-countup";
import useCards from "../cards/useCards";
import States from "./State";
import {
  CardIcon,
  CashOutIcon,
  DocumentIcon,
  WalletIcon,
} from "../../ui/icons/bold-duotone";

export default function DashboardLayout() {
  const { transactions, isLoading } = useTransition();
  const { cards, isLoading: isGetCards } = useCards();
  const expenseTotal =
    !isLoading &&
    transactions
      ?.filter((t) => t.type === "1")
      .reduce((sum, t) => sum + Number(t.amount), 0);

  const incomeTotal =
    !isLoading &&
    transactions
      ?.filter((t) => t.type === "0")
      .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalInventoryCards =
    !isGetCards && cards?.reduce((sum, c) => sum + c.inventory, 0);

  const incomeThisMonth = transactions
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

  const expenseThisMonth = transactions
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

  return (
    <div>
      <div className="w-full">
        <UserData />
      </div>
      <div className="w-full flex flex-col gap-6 my-6 relative bg-gradient-to-br from-primary-1 to-primary-3 p-6 rounded-3xl overflow-hidden">
        <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/shape1.svg')] blur-sm bg-cover bg-center"></div>

        <div className="w-full flex items-start relative z-30">
          <Link to="charts" className="btn--sm btn btn--secondary">
            <ChartIcon className="w-5 h-5" />
          </Link>
        </div>

        <div className="relative z-30 text-center text-white">
          <div className="text-3xl font-black">
            {isLoading ? (
              "0"
            ) : (
              <CountUp
                end={incomeTotal - expenseTotal}
                duration={3}
                separator=","
              />
            )}
          </div>
          {totalInventoryCards > 0 && (
            <div className="text-sm mt-1 font-light">
              از مجموع{" "}
              {isGetCards ? (
                "0"
              ) : (
                <CountUp end={totalInventoryCards} duration={3} separator="," />
              )}{" "}
              تومان موجودی کارت‌ها
            </div>
          )}
        </div>

        <Link
          to={"add-transactions"}
          className="w-full btn btn--primary relative z-30"
        >
          افزودن تراکنش جدید
        </Link>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <States
          icon={<DocumentIcon className="w-7 h-7" />}
          label="تعداد تراکنش ها"
          value={transactions?.length || 0}
          valueTxt="تراکنش"
          variant="blue"
        />
        <States
          icon={<CardIcon className="w-7 h-7" />}
          label="تعداد کارت ها"
          value={cards?.length || 0}
          valueTxt="کارت"
          variant="orange"
        />
        <States
          icon={<WalletIcon className="w-7 h-7" />}
          label="مجموع واریز ماه"
          value={incomeThisMonth || 0}
          valueTxt="تومان"
          variant="green"
          separator=","
        />
        <States
          icon={<CashOutIcon className="w-7 h-7" />}
          label="مجموع برداشت ماه"
          value={expenseThisMonth || 0}
          valueTxt="تومان"
          variant="red"
          separator=","
        />
      </div>
    </div>
  );
}
