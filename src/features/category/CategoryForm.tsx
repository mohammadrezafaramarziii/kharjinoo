import TextArea from "../../ui/TextArea";
import TextField from "../../ui/TextField";
import { useForm } from "react-hook-form";
import useCreateCategory from "./useCreateCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type {
  CategoryFormValuesType,
  CategoryType,
} from "./CategoryType";
import Loading from "../../ui/Loading";
import translateErrorMsg from "../../utils/translateErrorMsg";
import useUpdateCategory from "./useUpdateCategory";

type Props = {
  onClose: () => void;
  editData?: CategoryType;
};

const schema = z.object({
  name: z.string({ required_error: "نام دسته بندی را وارد کنید" }),
  description: z.string().optional(),
});

export default function CategoryForm({ onClose, editData }: Props) {
  const isEdit = Boolean(editData);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CategoryFormValuesType>({
    resolver: zodResolver(schema),
    defaultValues: editData,
  });
  const { createCategory, isCreating } = useCreateCategory();
  const { updateCategory, isUpdating } = useUpdateCategory();

  const closeHandler = () => {
    onClose();
    reset();
  };

  const submitHandler = (values: CategoryFormValuesType) => {
    if (isEdit) {
      updateCategory(
        { id: editData!.id, ...values },
        {
          onSuccess({ status, error }) {
            if (status === 200) {
              closeHandler();
            } else {
              setError("name", {
                message: translateErrorMsg(error?.message as string),
              });
            }
          },
        }
      );
    } else {
      createCategory(
        { ...values },
        {
          onSuccess({ status, error }) {
            if (status === 201) {
              closeHandler();
            } else {
              setError("name", {
                message: translateErrorMsg(error?.message as string),
              });
            }
          },
        }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4"
    >
      <TextField
        name="name"
        register={register}
        placeholder="نام دسته بندی را وارد کنید"
        errors={errors}
      />
      <TextArea
        name="description"
        register={register}
        placeholder="توضیحات دسته بندی را وارد کنید"
        rows={6}
      />
      <div className="w-full grid grid-cols-2 gap-4">
        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="btn btn--primary w-full"
        >
          {isCreating || isUpdating ? (
            <Loading color="primary2" />
          ) : isEdit ? (
            "ویرایش"
          ) : (
            "ثبت"
          )}
        </button>
        <button
          onClick={closeHandler}
          type="button"
          className="btn btn--secondary !bg-white w-full"
        >
          لغو
        </button>
      </div>
    </form>
  );
}
