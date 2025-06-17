import { ArrowLeftIcon } from "../../ui/icons/arrow";
import { EditIcon, TrashIcon } from "../../ui/icons/outline";
import Title from "../../ui/Title";
import {
  toLocalShortDate,
  toLocalShortTime,
} from "../../utils/toLocalPersianDateTime";

export default function ReportDetailsById() {
  return (
    <div>
      <Title title="جزئیات تراکنش">
        <button onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      <div className="w-full mt-10">
        <div className="flex flex-col items-center">
          <div className="aspect-square w-16 flex items-center justify-center overflow-hidden">
            <img
              src={"/images/banks/blu-bank.png"}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <p className="text-sm text-primary-4">1234 2412 2515 5511</p>
          <h1 className="text-primary-3 font-bold mt-2 mb-1">تراکنش</h1>

          <p className="text-sm text-primary-4">
            {toLocalShortDate(new Date())} - {toLocalShortTime(new Date())}
          </p>
          <div className="flex items-center border border-primary-3/10 rounded-full mt-2">
            <button className="py-1.5 px-2.5 border-l border-l-primary-3/10">
              <EditIcon className="w-5 h-5 text-primary-1" />
            </button>
            <button className="py-1.5 px-2.5">
              <TrashIcon className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full pt-7">
        <div className="text-sm text-primary-3 font-bold pb-2">شرح:</div>
        <p className="text-sm text-primary-3/70 leading-6">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
          درصد گذشته حال و آینده
        </p>
      </div>
    </div>
  );
}
