import { Link } from "react-router-dom";
import { ChartIcon } from "../../ui/icons/outline";
import UserData from "../../ui/UserData";
import LatestTransactions from "./LatestTransactions";

export default function DashboardLayout() {
  return (
    <div>
      <div className="w-full">
        <UserData name="محمدرضا فرامرزی" email="mf575583@gmail.com" />
      </div>
      <div className="w-full flex flex-col gap-6 my-6 relative bg-gradient-to-br from-primary-1 to-primary-3 p-6 rounded-3xl overflow-hidden">
        <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/shape1.svg')] blur-sm bg-cover bg-center"></div>
        <div className="w-full flex items-start relative z-30">
          <Link to="reports" className="btn--sm btn btn--secondary">
            <ChartIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="relative z-30">
          <div className="w-full flex items-center justify-center gap-2 text-white text-3xl font-black">
            250,000
            <span className="text-sm font-normal">تومان</span>
          </div>
        </div>
        <button className="w-full btn btn--primary relative z-30">
          افزودن تراکنش جدید
        </button>
      </div>
      <LatestTransactions />
    </div>
  );
}
