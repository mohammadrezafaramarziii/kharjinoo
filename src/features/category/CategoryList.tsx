import { AddCategoryIcon, EditIcon, TrashIcon } from "../../ui/icons/outline";
import Title from "../../ui/Title";
import { MenuDotsIcon } from "../../ui/icons/bold";
import Modal from "../../ui/Modal";
import { useState } from "react";
import { motion } from "framer-motion";
import CategoryForm from "./CategoryForm";

type Category = {
  name: string;
  description: string;
};

export default function CategoryList() {
  const [isAdd, setIsAdd] = useState(false);

  const categories: Category[] = [
    {
      name: "باشگاه",
      description: "بشگاه هتس ککیلسککلسسصث قث",
    },
    {
      name: "باشگاه",
      description: "بشگاه هتس ککیلسککلسسصث قث",
    },
  ];

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
      <div className="w-full flex flex-col gap-4 mt-6">
        {categories.map((category, index) => (
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
    </div>
  );
}

function CategoryItem({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex items-center justify-between bg-white rounded-xl p-3">
      <div className="flex flex-col gap-2 ">
        <span className="text-sm text-primary-3 font-bold">
          {category.name}
        </span>
        <span className="text-xs text-primary-4">{category.description}</span>
      </div>
      <button onClick={() => setIsOpen(true)}>
        <MenuDotsIcon className="w-5 h-5 text-primary-3 rotate-90" />
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="w-full flex flex-col gap-6">
          <button className="flex items-center gap-4">
            <EditIcon className="w-6 h-6 text-primary-1" />
            <span className="text-sm text-primary-1">ویرایش</span>
          </button>
          <button className="flex items-center gap-4">
            <TrashIcon className="w-6 h-6 text-red-500" />
            <span className="text-sm text-red-500">حذف</span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
