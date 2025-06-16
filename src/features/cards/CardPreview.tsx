import { accountNumberCommas } from "../../utils/accountNumberCommas";
import { motion } from "framer-motion";

export default function CardPreview() {
  return (
    <div className="w-full mt-4 relative bg-primary-3/50 p-6 rounded-3xl overflow-hidden">
      <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/shape1.svg')] blur-sm bg-cover bg-bottom"></div>

      <div className="relative z-10 w-full flex flex-col gap-7">
        <div className="w-full flex items-center justify-between">
          <div className="text-primary-2 text-sm">بلو بانک</div>
          <div className="w-12">
            <img
              src="/images/blu-bank.png"
              alt=""
              className="w-full bg-center bg-contain"
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-between text-xl text-white font-bold">
          {accountNumberCommas(1233567833331234)
            .split("\u2000")
            .map((item, index) => (
              <motion.span
                key={index}
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: (index + 2) / 10}}
              >
                {item}
              </motion.span>
            ))}
        </div>
        <div className="text-xs text-white/70">انقضا: 12/06</div>
      </div>
    </div>
  );
}
