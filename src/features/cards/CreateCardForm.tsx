import { Controller, useForm } from "react-hook-form";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import TextField from "../../ui/TextField";
import Title from "../../ui/Title";
import AccountNumberField from "../../ui/AccountNumberField";
import Modal from "../../ui/Modal";
import { useState } from "react";
import BanksList from "./BanksList";
import type { CardType } from "./CardType";
import useCreateCard from "./useCreateCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loading from "../../ui/Loading";
import translateErrorMsg from "../../utils/translateErrorMsg";
import TextFieldNormal from "../../ui/TextFieldNormal";
import { numberWithCommas } from "../../utils/numberWithCommas";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type CardFormValuesType = Omit<CardType, "isDefault">;

const schema = z.object({
  bName: z.string({ required_error: "بانک خود را انتخاب کنید" }),
  name: z
    .string({ required_error: "نام بانک خود را وارد کنید" })
    .nonempty({ message: "نام بانک خود را وارد کنید" }),
  inventory: z
    .number({
      required_error: "موجودی کارت خود را وارد کنید",
    })
    .min(1, "عدد وارد شده باید بزرگتر از صفر باشد"),
  englishName: z.string().optional(),
  image: z.string().optional(),
  bankNumber: z
    .string({ required_error: "شماره کارت را وارد کنید" })
    .regex(/^[1-9]\d{15}$/, {
      message: "شماره کارت باید ۱۶ رقم عددی باشد و با صفر شروع نشود",
    }),
  expireMonth: z
    .string({ required_error: "ماه انقضا را وارد کنید" })
    .regex(/^(0[1-9]|1[0-2])$/, "ماه باید بین 01 تا 12 باشد"),

  expireYear: z
    .string({ required_error: "سال انقضا را وارد کنید" })
    .regex(/^\d{2}$/, "سال را به صورت دو رقمی وارد کنید"),
});

export default function CreateCardForm({ isOpen, onClose }: Props) {
  const [isSelectCard, setIsSelectCard] = useState(false);
  const { createCard, isCreating } = useCreateCard();

  const {
    register,
    setValue,
    setError,
    watch,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CardFormValuesType>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (values: CardFormValuesType) => {
    createCard(
      { ...values },
      {
        onSuccess: ({ error, status }) => {
          if (status === 201) {
            onClose();
            reset();
          } else {
            setError("bankNumber", {
              message: translateErrorMsg(error?.message as string),
            });
          }
        },
      }
    );
  };

  const closeHandler = () => {
    onClose();
    reset();
  };

  return (
    <div
      className={`${
        isOpen ? "translate-x-0 visible" : "translate-x-full invisible"
      } duration-300 ease-in-out w-full flex flex-col justify-between gap-4 overflow-y-auto sm:max-w-sm m-auto inset-0 h-full fixed top-0 right-0 bg-primary-2 z-50 p-6`}
    >
      <div>
        <Title title="افزودن کارت جدید">
          <button onClick={closeHandler}>
            <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
          </button>
        </Title>
        <div className="pt-6 flex flex-col gap-4">
          <div>
            <div
              onClick={() => setIsSelectCard(true)}
              className={`${
                errors?.bName?.message && "border-red-600"
              } textField__input cursor-pointer`}
            >
              {watch("bName") ? (
                <div className="flex items-center gap-2 ">
                  <div className="aspect-square w-9 flex items-center justify-center overflow-hidden">
                    <img
                      src={`/images/banks/${watch("image")}`}
                      alt=""
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>{watch("bName")}</div>
                </div>
              ) : (
                <span className="text-primary-4">بانک خود را انتخاب کنید</span>
              )}
            </div>
            {errors?.bName?.message && (
              <div className="text-xs text-red-600 pr-2 pt-2">
                {errors?.bName?.message}
              </div>
            )}
          </div>
          <TextField
            register={register}
            name="name"
            placeholder="نام بانک خود را وارد کنید"
            errors={errors}
          />
          <TextFieldNormal
            type="number"
            placeholder="موجودی فعلی کارت خود را وارد کنید(تومان)"
            {...register("inventory", { valueAsNumber: true })}
            error={errors.inventory?.message}
          />
          {!isNaN(watch("inventory")) && !errors.inventory?.message && (
            <span className="text-primary-1 font-medium">
              موجودی:{numberWithCommas(watch("inventory"))} تومان
            </span>
          )}
          <Modal isOpen={isSelectCard} onClose={() => setIsSelectCard(false)}>
            <BanksList
              onSelected={(e) => {
                setValue("name", e.name, { shouldValidate: true });
                setValue("bName", e.name, { shouldValidate: true });
                setValue("image", e.image, { shouldValidate: true });
                setValue("englishName", e.englishName, {
                  shouldValidate: true,
                });
                setIsSelectCard(false);
              }}
              selected={watch("image")!}
            />
          </Modal>
          <Controller
            name="bankNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <AccountNumberField
                accountNumValue={field.value}
                onAccountNumValue={field.onChange}
                errors={errors.bankNumber?.message}
              />
            )}
          />
          <div>
            <label className="font-bold text-xs text-primary-3 pr-2 mb-2">
              تاریخ انقضا کارت
            </label>
            <div className="w-full grid grid-cols-2 items-start gap-2">
              <TextField
                register={register}
                name="expireMonth"
                placeholder="ماه"
                errors={errors}
              />
              <TextField
                register={register}
                name="expireYear"
                placeholder="سال"
                errors={errors}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <button
          onClick={handleSubmit(submitHandler)}
          className="btn btn--primary w-full gap-2"
          disabled={isCreating}
        >
          {isCreating ? (
            <>
              در حال ثبت...
              <Loading color="primary2" />
            </>
          ) : (
            "ثبت"
          )}
        </button>
        <button
          onClick={closeHandler}
          className="btn btn--secondary !bg-white w-full"
        >
          لغو
        </button>
      </div>
    </div>
  );
}
