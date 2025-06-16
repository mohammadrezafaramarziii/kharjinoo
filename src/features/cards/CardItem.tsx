import { accountNumberCommas } from "../../utils/accountNumberCommas";
import type { CardType } from "./CardType";

export default function CardItem({
  accountNumber,
  eName,
  image,
  name,
  expired,
}: CardType) {
  return (
    <div className="w-full flex items-center gap-3">
      <div>
        <img src={image} alt={name} className="w-7" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-primary-3 font-bold">{name}</div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1.5 text-xs text-primary-4">
            {accountNumberCommas(accountNumber)
              .split("\u2000")
              .map((item, index) => (
                <span key={index}>
                  {index === 1 || index === 2 ? "****" : item}
                </span>
              ))}
          </div>
          <div className="text-xs text-primary-4">
            {expired}
          </div>
        </div>
      </div>
    </div>
  );
}
