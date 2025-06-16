import type { CardType } from "./CardType";

type Props = {
  expireMonth: string;
  expireYear: string;
  accountNum: string;
} & Omit<CardType, "eName" | "expired">;

export default function CardPreviewForm({
  accountNumber,
  accountNum,
  expireMonth,
  expireYear,
  image,
  name,
}: Props) {
  const accountNumParts = accountNum?.padEnd(16, "*").match(/.{1,4}/g) || [
    "****",
    "****",
    "****",
    "****",
  ];
  console.log(accountNumParts);

  return (
    <div className="w-full mt-4 relative bg-primary-1/90 p-6 rounded-3xl overflow-hidden">
      <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/shape1.svg')] blur-sm bg-cover bg-bottom"></div>

      <div className="relative z-10 w-full flex flex-col gap-7">
        <div className="w-full flex items-center justify-between">
          <div className="text-primary-2 text-sm">{name}</div>
          <div className="aspect-square w-12 flex items-center justify-center overflow-hidden">
            {image && (
              <img
                src={`/images/banks/${image}`}
                alt=""
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>
        <div dir="ltr" className="w-full flex items-center justify-between text-xl text-white font-bold">
          {accountNumParts.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
        <div className="text-xs text-white/70">
          انقضا: {expireYear}
          {expireMonth && expireYear && "/"}
          {expireMonth}
        </div>
      </div>
    </div>
  );
}
