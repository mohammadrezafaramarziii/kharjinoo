import { accountNumberCommas } from "../../utils/accountNumberCommas";
import { motion } from "framer-motion";

export default function CardPreview() {
  return (
    <div className="w-full mt-4 relative z-20 bg-slate-900/40 shadow-xl p-5 rounded-3xl overflow-hidden">
      <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/shape1.svg')] blur bg-cover bg-center"></div>
      <div className="relative z-10 w-full flex flex-col gap-7">
        <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-center gap-2">
            <div className="aspect-square w-12 flex items-center justify-center overflow-hidden">
              <img
                src={"/images/banks/blu-bank.png"}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="text-primary-2 text-sm">بلو بانک</div>
          </div>
          <img src={"/images/cardShetab.png"} alt="" className="w-10" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xs text-white">شماره کارت</div>
          <div className="w-full flex items-center gap-3 text-xl text-white font-semibold">
            {accountNumberCommas(1233567833331234)
              .split("\u2000")
              .map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: (index + 2) / 10 }}
                >
                  {item}
                </motion.span>
              ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm text-primary-2">محمدرضا فرامرزی</div>
          <div className="text-sm text-primary-2/70">انقضا: 12/06</div>
        </div>
      </div>
    </div>
  );
}
