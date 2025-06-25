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
import useCards from "../cards/useCards";
import useCategories from "../../hooks/useCategories";
import { useEffect, useState } from "react";
import Loading from "../../ui/Loading";
import type { TransactionsType } from "./TransactionsType";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const typeOptions = [
  { value: "0", label: "واریز" },
  { value: "1", label: "برداشت" },
];

type FormValues = Omit<TransactionsType, "id">;

import { DateObject } from "react-multi-date-picker";
import { numberWithCommas } from "../../utils/numberWithCommas";
import TextFieldNormal from "../../ui/TextFieldNormal";
import useAddTransaction from "./useAddTransaction";
import { useNavigate } from "react-router-dom";
import type { CardType } from "../cards/CardType";

const schema = z.object({
  title: z
    .string({ required_error: "عنوان تراکنش را وارد کنید" })
    .nonempty("عنوان تراکنش را وارد کنید"),
  description: z.string().optional(),
  amount: z
    .string({ required_error: "مبلغ تراکنش را وارد کنید" })
    .regex(/^[1-9]\d*$/, {
      message: "مبلغ باید فقط شامل اعداد باشد و بزرگتر از صفر باشد",
    })
    .nonempty("مبلغ تراکنش را وارد کنید"),
  date: z.custom<DateObject | null>(
    (val) => val === null || typeof val === "object",
    { message: "تاریخ را وارد کنید" }
  ),
  time: z.custom<DateObject | null>(
    (val) => val === null || typeof val === "object",
    { message: "ساعت را وارد کنید" }
  ),
  cardId: z
    .string({ required_error: "کارت را انتخاب کنید" })
    .nonempty("کارت را انتخاب کنید"),
  categoryId: z
    .string({ required_error: "دسته بندی را انتخاب کنید" })
    .nonempty("دسته بندی را انتخاب کنید"),
  type: z.enum(["0", "1"], {
    message: "نوع تراکنش را انتخاب کنید",
    required_error: "نوع تراکنش را انتخاب کنید",
  }),
});

export default function TransactionsForm() {
  const { transformCards, cards, isLoading: isGetCards } = useCards();
  const { transformCategory, isLoading: isGetCategory } = useCategories();
  const [displayAmount, setDisplayAmount] = useState("");
  const { addNewTransaction, isCreating } = useAddTransaction();
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (values: FormValues) => {
    const currentCard: CardType = cards?.find(
      (t) => t.id === Number(values.cardId)
    );

    if (values.type === "1" && currentCard.inventory < Number(values.amount)) {
      setError("cardId", { message: "موجودی کارت ناکافی است" });
      return;
    }

    addNewTransaction(
      { ...values },
      {
        onSuccess: ({ status }) => {
          if (status === 201) {
            navigate("/dashboard/reports", { replace: true });
          }
        },
      }
    );
  };

  useEffect(() => {
    if (!isGetCards) {
      if (cards && cards.length > 0) {
        setValue("cardId", String(cards.find((c) => c.isDefault)?.id) || "");
      }
    }
  }, [cards, isGetCards]);

  useEffect(() => {
    const subscription = watch((value) => {
      const amount = value.amount || "";
      setDisplayAmount(amount ? numberWithCommas(Number(amount)) : "");
    });
    return () => subscription.unsubscribe();
  }, [watch("amount")]);

  if (isGetCards || isGetCategory) {
    return (
      <div className="w-full h-[calc(100dvh-80px)] flex items-center justify-center">
        <Loading width={45} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh] flex flex-col justify-between pb-24 p-6 gap-6">
      <div>
        <Title title={"افزودن تراکنش جدید"}>
          <button onClick={() => window.history.back()}>
            <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
          </button>
        </Title>

        <div className="w-full flex flex-col gap-4 mt-6">
          <TextField
            placeholder="عنوان تراکنش را وارد کنید"
            name="title"
            register={register}
            errors={errors}
          />
          <RHFSelect
            options={[
              { value: "", label: "بانک مورد نظر را انتخاب کنید" },
              ...transformCards,
            ]}
            name="cardId"
            register={register}
            errors={errors}
          />
          <div className="w-full grid grid-cols-2 gap-4">
            <RHFSelect
              options={[
                { value: "", label: "دسته بندی را انتخاب کنید" },
                ...(transformCategory || []),
              ]}
              name="categoryId"
              register={register}
              errors={errors}
            />
            <RHFSelect
              options={[
                { value: "", label: "نوع تراکنش را انتخاب کنید" },
                ...typeOptions,
              ]}
              name="type"
              register={register}
              errors={errors}
            />
          </div>
          <TextFieldNormal
            placeholder="مبلغ را به تومان وارد کنید"
            name="amount"
            value={displayAmount}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (/^\d*$/.test(raw)) {
                setValue("amount", raw, { shouldValidate: true });
              }
            }}
            error={errors?.amount?.message}
          />

          <div className="w-full grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <DatePicker
                value={watch("date")}
                onChange={(e) => setValue("date", e, { shouldValidate: true })}
                locale={persian_fa}
                calendar={persian}
                maxDate={new DateObject()}
                format={"D MMMM YYYY"}
                calendarPosition="bottom-right"
                containerClassName="w-full"
                inputClass="textField__input"
                placeholder="تاریخ را انتخاب کنید"
              />
              {errors?.date?.message && (
                <div className="text-xs text-red-600 pr-2 pt-2">
                  {errors?.date?.message}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <DatePicker
                disableDayPicker
                value={watch("time")}
                onChange={(e) => setValue("time", e, { shouldValidate: true })}
                format="HH:mm"
                plugins={[<TimePicker format="HH:mm" hideSeconds />]}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                containerClassName="w-full"
                inputClass="textField__input"
                placeholder="ساعت را انتخاب کنید"
              />
              {errors?.time?.message && (
                <div className="text-xs text-red-600 pr-2 pt-2">
                  {errors?.time?.message}
                </div>
              )}
            </div>
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
        <button
          onClick={handleSubmit(submitHandler)}
          className="btn btn--primary gap-2"
          disabled={isCreating}
        >
          {isCreating ? (
            <>
              درحال ثبت
              <Loading color="primary2" />
            </>
          ) : (
            "ثبت"
          )}
        </button>
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
