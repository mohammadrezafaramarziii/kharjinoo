import { useForm } from "react-hook-form";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import TextField from "../../ui/TextField";
import Title from "../../ui/Title";
import AccountNumberField from "../../ui/AccountNumberField";
import Modal from "../../ui/Modal";
import { useState } from "react";
import BanksList from "./BanksList";
import CardPreviewForm from "./CardPreviewForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateCardForm({ isOpen, onClose }: Props) {
  const { register, setValue, watch, reset } = useForm();
  const [isSelectCard, setIsSelectCard] = useState(false);

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
        <CardPreviewForm
          accountNumber={Number(watch("accountNumber")) || 0}
          accountNum={watch("accountNumber")}
          expireMonth={watch("expireMonth")}
          expireYear={watch("expireYear")}
          image={watch("image")}
          name={watch("name")}
        />
        <div className="pt-6 flex flex-col gap-4">
          <div
            onClick={() => setIsSelectCard(true)}
            className="textField__input"
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
          <TextField
            register={register}
            name="name"
            placeholder="نام بانک خود را وارد کنید"
          />
          <Modal isOpen={isSelectCard} onClose={() => setIsSelectCard(false)}>
            <BanksList
              onSelected={(e) => {
                setValue("name", e.name);
                setValue("bName", e.name);
                setValue("image", e.image);
                setIsSelectCard(false);
              }}
              selected={watch("image")}
            />
          </Modal>
          <AccountNumberField
            accountNumValue={watch("accountNumber")}
            onAccountNumValue={setValue}
          />
          <div className="w-full grid grid-cols-2 items-end gap-2">
            <TextField
              label="تاریخ انقضا کارت"
              register={register}
              name="expireMonth"
              placeholder="ماه"
              type="number"
            />
            <TextField
              register={register}
              name="expireYear"
              placeholder="سال"
              type="number"
            />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
        <button className="btn btn--primary w-full">ثبت</button>
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
