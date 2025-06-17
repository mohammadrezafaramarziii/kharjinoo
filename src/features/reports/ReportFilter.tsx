import { useState } from "react";
import { FilterIcon, SearchIcon } from "../../ui/icons/action";
import { LeftIcon } from "../../ui/icons/arrow";
import Modal from "../../ui/Modal";
import BanksList from "../cards/BanksList";
import Select from "../../ui/Select";
import RadioButton from "../../ui/RadioButton";

const categories = [
  { label: "یک دسته بندی را انتخاب کنید", value: "" },
  { label: "باشگاه", value: "باشگاه" },
  { label: "فروشاگه", value: "فروشاگه" },
  { label: "حمل و نقل", value: "حمل و نقل" },
  { label: "غذا", value: "غذا" },
];

type SortByTransactions = "all" | "income" | "expense";
const sortByTransactions = [
  { label: "همه", value: "all" },
  { label: "واریز", value: "income" },
  { label: "برداشت", value: "expense" },
];

export default function ReportFilter() {
  const [isSelectCard, setIsSelectCard] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<SortByTransactions>("all");

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex items-center gap-4 bg-white p-3 rounded-xl">
        <button
          onClick={() => setIsOpenFilter(true)}
          className="btn btn--sm btn--secondary"
        >
          <FilterIcon className="w-5 h-5" />
        </button>
        <Modal isOpen={isOpenFilter} onClose={() => setIsOpenFilter(false)}>
          <Filters onClose={() => setIsOpenFilter(false)} />
        </Modal>
        <button
          onClick={() => setIsSelectCard(true)}
          className="flex-1 justify-between btn btn--secondary btn--sm"
        >
          <div>
            <LeftIcon className="w-5 h-5 -rotate-90 text-primary-3" />
          </div>
          <div className="flex items-center gap-4">
            <p>1924 **** **** 3525</p>
            <div className="aspect-square w-5 flex items-center justify-center overflow-hidden">
              <img
                src={"/images/banks/sarmaye.png"}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </button>
      </div>
     
      <div className="w-full flex items-center gap-2">
        {sortByTransactions.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              setSelectedTransaction(item.value as SortByTransactions)
            }
            className={`${
              selectedTransaction === item.value
                ? "bg-primary-1/25 text-primary-1 border-transparent"
                : "text-primary-4  border-primary-3/10"
            } duration-200 border rounded-full py-1.5 px-4 text-sm`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Filters({ onClose }: { onClose: () => void }) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Select options={categories} label="دسته بندی" />
      <div className="w-full grid grid-cols-2 gap-4 items-end">
        <Select options={[{ value: "", label: "تاریخ از" }]} label="تاریخ" />
        <Select options={[{ value: "", label: "تاریخ تا" }]} />
      </div>
      <button onClick={onClose} className="btn btn--primary w-full">
        تایید
      </button>
    </div>
  );
}
