import { useState } from "react";
import { FilterIcon, SearchIcon } from "../../ui/icons/action";
import { LeftIcon } from "../../ui/icons/arrow";
import Modal from "../../ui/Modal";
import BanksList from "../cards/BanksList";
import Select from "../../ui/Select";
import RadioButton from "../../ui/RadioButton";
import useCategories from "../../hooks/useCategories";
import type { Filters } from "./FilterType";
import useCards from "../cards/useCards";
import type { CardType } from "../cards/CardType";
import Loading from "../../ui/Loading";
import { CheckCircleIcon } from "../../ui/icons/bold";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const sortByTransactions = [
  { label: "همه", value: "all" },
  { label: "واریز", value: "0" },
  { label: "برداشت", value: "1" },
];

type Props = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const INITIAL_FILTERS: Filters = {
  type: "all",
  category: 0,
  card: 0,
  fromDate: null,
  toDate: null,
};

export default function ReportFilter({ filters, setFilters }: Props) {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  const handlerChangeFilter = <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex items-center gap-4 bg-white p-3 rounded-xl">
        <button
          onClick={() => setIsOpenFilter(true)}
          className="btn btn--sm btn--secondary relative"
        >
          <FilterIcon className="w-5 h-5" />
          {filters.fromDate || filters.toDate || filters.category ? (
            <div className="w-2 h-2 rounded-full bg-red-500 absolute -top-0.5 -right-0.5"></div>
          ) : null}
        </button>
        <CardFilter
          selectedCard={filters.card}
          handleChangeFilter={handlerChangeFilter}
        />
      </div>

      <div className="w-full flex items-center gap-2">
        {sortByTransactions.map((item, index) => (
          <button
            key={index}
            onClick={() =>
              handlerChangeFilter("type", item.value as Filters["type"])
            }
            className={`${
              filters.type === item.value
                ? "bg-primary-1/25 text-primary-1 border-transparent"
                : "text-primary-4  border-primary-3/10"
            } duration-200 border rounded-full py-1.5 px-4 text-sm`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <Modal isOpen={isOpenFilter} onClose={() => setIsOpenFilter(false)}>
        <Filters
          onClose={() => setIsOpenFilter(false)}
          handleChangeFilter={handlerChangeFilter}
          filters={filters}
          resetFilter={setFilters}
        />
      </Modal>
    </div>
  );
}

function Filters({
  onClose,
  handleChangeFilter,
  filters,
  resetFilter,
}: {
  onClose: () => void;
  filters: Filters;
  handleChangeFilter: <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ) => void;
  resetFilter: (filters: Filters) => void;
}) {
  const { transformCategory, isLoading } = useCategories();

  return (
    <div className="w-full flex flex-col gap-4">
      <Select
        options={[
          { value: "", label: "دسته بندی" },
          ...(transformCategory || []),
        ]}
        label="دسته بندی"
        value={filters.category || ""}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleChangeFilter(
            "category",
            Number(e.target.value) as Filters["category"]
          )
        }
      />
      <div className="w-full grid grid-cols-2 gap-4 items-end">
        <DatePicker
          value={filters.fromDate}
          onChange={(e) =>
            handleChangeFilter("fromDate", e as Filters["fromDate"])
          }
          locale={persian_fa}
          calendar={persian}
          format={"D MMMM YYYY"}
          calendarPosition="bottom-right"
          containerClassName="w-full"
          inputClass="textField__input"
          placeholder="تاریخ از..."
        />
        <DatePicker
          value={filters.toDate}
          onChange={(e) => handleChangeFilter("toDate", e as Filters["toDate"])}
          locale={persian_fa}
          calendar={persian}
          format={"D MMMM YYYY"}
          minDate={new Date(filters.fromDate as Date)}
          calendarPosition="bottom-right"
          containerClassName="w-full"
          inputClass="textField__input"
          placeholder="تاریخ تا..."
        />
      </div>
      <div className="w-full flex items-center gap-4">
        <button onClick={onClose} className="btn btn--primary w-full">
          تایید
        </button>
        {filters.fromDate || filters.toDate || filters.category ? (
          <button
            onClick={() => resetFilter(INITIAL_FILTERS)}
            className="btn btn--outline__primary w-full"
          >
            حذف فیلتر ها
          </button>
        ) : null}
      </div>
    </div>
  );
}

function CardFilter({
  selectedCard,
  handleChangeFilter,
}: {
  selectedCard: Filters["card"];
  handleChangeFilter: <K extends keyof Filters>(
    key: K,
    value: Filters[K]
  ) => void;
}) {
  const { cards, isLoading } = useCards();
  const [isOpenCards, setIsOpenCards] = useState(false);
  const activeCard: CardType = cards?.find((c) => c.id === selectedCard);

  return (
    <>
      <button
        onClick={() => setIsOpenCards(true)}
        className="flex-1 justify-between btn btn--secondary btn--sm"
      >
        <div>
          <LeftIcon className="w-5 h-5 -rotate-90 text-primary-3" />
        </div>
        {selectedCard ? (
          <div className="flex items-center gap-4">
            <p>{activeCard.bankNumber}</p>
            <div className="aspect-square w-5 flex items-center justify-center overflow-hidden">
              <img
                src={`/images/banks/${activeCard.image}`}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        ) : (
          "همه کارت ها"
        )}
      </button>
      <Modal isOpen={isOpenCards} onClose={() => setIsOpenCards(false)}>
        {isLoading ? (
          <div className="w-full py-10 flex items-center justify-center">
            <Loading width={35} />
          </div>
        ) : (
          <div>
            <div className="w-full grid grid-cols-1 gap-4 mb-6">
              <div
                onClick={() => handleChangeFilter("card", 0)}
                className={`flex min-h-[60px] items-center justify-between gap-2 rounded-lg p-3 cursor-pointer ${
                  selectedCard === 0 ? "bg-primary-1/10" : "bg-white"
                }`}
              >
                <div className="flex items-center gap-2 flex-1">
                  <div className="text-xs text-primary-3 font-bold">
                    همه کارت ها
                  </div>
                </div>
                <div>
                  {selectedCard === 0 && (
                    <CheckCircleIcon className="w-5 h-5 text-primary-1" />
                  )}
                </div>
              </div>
              {cards?.map((card: CardType & { id: number }) => (
                <div
                  key={card.id}
                  onClick={() => handleChangeFilter("card", card.id)}
                  className={`flex items-center justify-between gap-2 rounded-lg p-3 cursor-pointer ${
                    selectedCard === card.id ? "bg-primary-1/10" : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div className="aspect-square w-9 flex items-center justify-center overflow-hidden">
                      <img
                        src={`/images/banks/${card.image}`}
                        alt=""
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="text-xs text-primary-3 font-bold">
                      {card.name}
                    </div>
                  </div>
                  <div>
                    {selectedCard === card.id && (
                      <CheckCircleIcon className="w-5 h-5 text-primary-1" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsOpenCards(false)}
              className="btn btn--primary w-full"
            >
              تایید
            </button>
          </div>
        )}
      </Modal>
    </>
  );
}
