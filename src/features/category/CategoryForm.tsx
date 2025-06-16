import TextArea from "../../ui/TextArea";
import TextField from "../../ui/TextField";
import { useForm } from "react-hook-form";

type Props = {
  onClose: () => void;
};

export default function CategoryForm({ onClose }: Props) {
  const { register, reset } = useForm();

  const closeHandler = () => {
    onClose();
    reset();
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
      <TextField
        name="name"
        register={register}
        placeholder="نام دسته بندی را وارد کنید"
      />
      <TextArea
        name="description"
        register={register}
        placeholder="توضیحات دسته بندی را وارد کنید"
        rows={6}
      />
      <div className="w-full grid grid-cols-2 gap-4">
        <button className="btn btn--primary w-full">ثبت</button>
        <button
          onClick={closeHandler}
          className="btn btn--secondary !bg-white w-full"
        >
          لغو
        </button>
      </div>
    </form>
  );
}
