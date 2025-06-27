import { WalletIcon } from "../ui/icons/outline";
import Loading from "../ui/Loading";
import { motion } from "framer-motion";

export default function LoadingRoute() {
  return (
    <div className="w-full h-[100dvh] bg-primary-2 px-6 py-16">
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div></div>
        <div className="w-full fixed h-full top-0 right-0 text-primary-1 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="w-[115px] h-[115px] pb-1 flex items-center justify-center overflow-hidden outline-4 outline-primary-1/20 bg-primary-1 text-primary-2 rounded-full"
          >
            <motion.div
              initial={{ y: 100, scale: 0.5, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <WalletIcon className="w-14 h-14" />
            </motion.div>
          </motion.div>
        </div>
        <Loading width={54} />
      </div>
    </div>
  );
}
