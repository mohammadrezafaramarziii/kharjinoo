import { accountNumberCommas } from "../../utils/accountNumberCommas";
import type { CardType } from "./CardType";

type Props = {
  card: CardType & { id: number };
  setActive: (card: CardType & { id: number }) => void;
};
export default function CardItem({ card, setActive }: Props) {
  return (
    <div
      onClick={() => setActive(card)}
      className="w-full flex items-center gap-3 cursor-pointer"
    >
      <div>
        <img
          src={`/images/banks/${card.image}`}
          alt={card.name}
          className="w-7"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm text-primary-3 font-bold">{card.name}</div>
        <div className="flex items-center gap-5">
          <div className="flex items-center flex-row-reverse gap-1.5 text-xs text-primary-4">
            {accountNumberCommas(Number(card.bankNumber))
              .split("\u2000")
              .map((item, index) => (
                <span key={index}>
                  {index === 1 || index === 2 ? "****" : item}
                </span>
              ))}
          </div>
          <div className="text-xs text-primary-4">
            {`${card.expireMonth} / ${card.expireYear}`}
          </div>
        </div>
      </div>
    </div>
  );
}
