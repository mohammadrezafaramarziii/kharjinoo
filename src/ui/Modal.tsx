import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  return createPortal(
    <>
      {isOpen && (
        <motion.div
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full sm:max-w-sm m-auto inset-0 fixed top-0 right-0 z-50 bg-primary-3/30"
        />
      )}
      <div
        className={`${
          isOpen ? "translate-y-0" : "translate-y-full"
        } duration-300 ease-in-out w-full h-auto sm:max-w-sm translate-x-1/2 fixed bottom-0 right-1/2 z-[60] bg-primary-2 rounded-t-2xl p-6`}
      >
        <div onClick={onClose} className="w-full flex justify-center pb-6">
          <div className="w-7 h-1 bg-primary-4 rounded-full"></div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">{children}</div>
      </div>
    </>,
    document.body
  );
}
