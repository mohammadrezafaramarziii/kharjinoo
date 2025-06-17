import { useForm } from "react-hook-form";
import TextField from "../../ui/TextField";
import TextArea from "../../ui/TextArea";
import RHFSelect from "../../ui/RHFSelect";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import Title from "../../ui/Title";
import { ArrowLeftIcon } from "../../ui/icons/arrow";

export default function TransactionsForm() {
  const { register } = useForm();

  return (
    <div className="w-full min-h-[100dvh] flex flex-col justify-between pb-24 p-6 gap-6">
      <div>
        <Title title="افزودن تراکنش جدید">
          <button onClick={() => window.history.back()}>
            <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
          </button>
        </Title>

        <div className="w-full flex flex-col gap-4 mt-6">
          <TextField
            placeholder="عنوان تراکنش را وارد کنید"
            name="title"
            register={register}
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <RHFSelect
              options={[{ value: "", label: "بانک مورد نظر را انتخاب کنید" }]}
              name="bank"
              register={register}
            />
            <RHFSelect
              options={[{ value: "", label: "دسته بندی را انتخاب کنید" }]}
              name="category"
              register={register}
            />
          </div>
          <TextField
            placeholder="مبلغ را به تومان وارد کنید"
            name="amount"
            register={register}
            type="number"
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <DatePicker
              // value={dateTimeFormik.values.date}
              onChange={(e) => {}}
              locale={persian_fa}
              calendar={persian}
              maxDate={new Date()}
              format={"D MMMM YYYY"}
              calendarPosition="bottom-right"
              containerClassName="w-full"
              inputClass="textField__input"
              placeholder="تاریخ را انتخاب کنید"
            />
            <DatePicker
              disableDayPicker
              //   value={dateTimeFormik.values.time}
              onChange={(e) => {}}
              format="HH:mm"
              plugins={[<TimePicker format="HH:mm" hideSeconds />]}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              containerClassName="w-full"
              inputClass="textField__input"
              placeholder="ساعت را انتخاب کنید"
            />
          </div>
          <TextArea
            placeholder="شرح تراکنش را بنویسید..."
            name="description"
            register={register}
            rows={6}
          />
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-2">
        <button className="btn btn--primary">ثبت</button>
        <button
          onClick={() => window.history.back()}
          className="btn btn--secondary !bg-white"
        >
          لغو
        </button>
      </div>
    </div>
  );
}
