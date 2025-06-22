import { AddCategoryIcon, EditIcon, TrashIcon } from "../../ui/icons/outline";
import Title from "../../ui/Title";
import { MenuDotsIcon } from "../../ui/icons/bold";
import Modal from "../../ui/Modal";
import { useState } from "react";
import { motion } from "framer-motion";
import CategoryForm from "./CategoryForm";
import useCategories from "../../hooks/useCategories";
import type { CategoryEditType, CategoryType } from "./CategoryType";
import Loading from "../../ui/Loading";
import useDeleteCategory from "./useDeleteCategory";

export default function CategoryList() {
  const [isAdd, setIsAdd] = useState(false);
  const { categories, isLoading } = useCategories();

  const sortedCategories = categories?.sort((b, a) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div>
      <Title title="دسته بندی ها">
        <button onClick={() => setIsAdd(true)}>
          <AddCategoryIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      <Modal isOpen={isAdd} onClose={() => setIsAdd(false)}>
        <CategoryForm onClose={() => setIsAdd(false)} />
      </Modal>
      {isLoading ? (
        <div className="w-full h-[70dvh] flex items-center justify-center">
          <Loading width={45} />
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 mt-6">
          {sortedCategories?.map((category, index) => (
            <motion.div
              key={index}
              initial={{ x: 56 }}
              animate={{ x: 0 }}
              transition={{ duration: (index + 2) / 10 }}
            >
              <CategoryItem category={category} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryItem({ category }: { category: CategoryType }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { deleteCategory, isDeleting } = useDeleteCategory();
  const handleEdit = () => {
    setIsEdit(true);
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsDelete(true);
    setIsOpen(false);
  };

  const deleteHandler = () => {
    deleteCategory(
      { id: category.id },
      {
        onSuccess: ({ status }) => {
          if (status === 204) {
            setIsDelete(false);
          }
        },
      }
    );
  };

  return (
    <div className="w-full flex items-center justify-between bg-white rounded-xl p-3">
      <div className="flex flex-col gap-2 ">
        <span className="text-sm text-primary-3 font-bold">
          {category.name}
        </span>
        <span className="text-xs text-primary-4">
          {category.description || "بدون توضیحات"}
        </span>
      </div>
      <button onClick={() => setIsOpen(true)}>
        <MenuDotsIcon className="w-5 h-5 text-primary-3 rotate-90" />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full flex flex-col gap-6">
          <button onClick={handleEdit} className="flex items-center gap-4">
            <EditIcon className="w-6 h-6 text-primary-1" />
            <span className="text-sm text-primary-1">ویرایش</span>
          </button>
          <button onClick={handleDelete} className="flex items-center gap-4">
            <TrashIcon className="w-6 h-6 text-red-500" />
            <span className="text-sm text-red-500">حذف</span>
          </button>
        </div>
      </Modal>
      <Modal isOpen={isEdit} onClose={() => setIsEdit(false)}>
        <CategoryForm
          onClose={() => setIsEdit(false)}
          editData={category as CategoryEditType}
        />
      </Modal>
      <Modal isOpen={isDelete} onClose={() => setIsDelete(false)}>
        <div>
          <p className="mb-6 text-red-500">
            از حذف دسته بندی "{category.name}" مطمئن هستید؟
          </p>
          <div className="w-full grid grid-cols-2 gap-4">
            <button
              onClick={deleteHandler}
              disabled={isDeleting}
              className="btn btn--outline__danger w-full"
            >
              {isDeleting ? <Loading color="danger" /> : "حذف"}
            </button>
            <button
              onClick={() => setIsDelete(false)}
              type="button"
              className="btn btn--primary w-full"
            >
              لغو
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
