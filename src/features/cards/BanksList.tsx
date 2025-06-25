import type { CardType } from "./CardType";

type Bank = Pick<CardType, "name" | "image" | "englishName">;

type Props = {
  selected: string;
  onSelected: (bank: Bank) => void;
};

export default function BanksList({ onSelected, selected }: Props) {
  const banks: Bank[] = [
    { name: "بانک مسکن", image: "maskan.png", englishName: "Maskan Bank" },
    { name: "بانک مهر اقتصاد", image: "mehr-eghtesad.png", englishName: "Mehr Eghtesad Bank" },
    { name: "بانک ملت", image: "mellat.png", englishName: "Mellat Bank" },
    { name: "بانک ملی", image: "melli.png", englishName: "Melli Bank" },
    { name: "موسسه اعتباری نور", image: "noor.png", englishName: "Noor Credit Institution" },
    { name: "بانک پارسیان", image: "parsian.png", englishName: "Parsian Bank" },
    { name: "بانک پاسارگاد", image: "pasargad.png", englishName: "Pasargad Bank" },
    { name: "بانک رفاه", image: "refah.png", englishName: "Refah Bank" },
    { name: "بانک رسالت", image: "resalat.png", englishName: "Resalat Bank" },
    { name: "بانک صادرات", image: "saderat.png", englishName: "Saderat Bank" },
    { name: "بانک انصار", image: "ansar.png", englishName: "Ansar Bank" },
    { name: "بانک اینده", image: "ayande.png", englishName: "Ayande Bank" },
    { name: "بانک اقتصاد نوین", image: "eghtesad.png", englishName: "Eghtesad Novin Bank" },
    { name: "بانک گردشگری", image: "gardeshgari.png", englishName: "Gardeshgari Bank" },
    { name: "بانک ایران زمین", image: "iranzamin.png", englishName: "Iranzamin Bank" },
    { name: "بانک کشاورزی", image: "keshavarzi.png",englishName:"Keshavarzi Bank" },
    { name: "موسسه اعتباری کوثر", image: "kosar.png",englishName:"Kosar Credit Institution" },
    { name: "بانک سرمایه", image: "sarmaye.png",englishName:"Sarmaye Bank" },
    { name: "بانک سپه", image: "sepah.png" ,englishName:"Sepah Bank" },
    { name: "بانک شهر", image: "shahr.png",englishName:"Shahr Bank" },
    { name: "بانک سینا", image: "sina.png",englishName:"Sina Bank" },
    { name: "بانک تجارت", image: "tejarat.png",englishName:"Tejarat Bank" },
    { name: "بانک سامان", image: "saman.png",englishName:"Saman Bank" },
    { name: "موسسه اعتباری ثامن", image: "samen.png",englishName:"Samen Credit Institution" },
    { name: "بانک صنعت و معدن", image: "sanat-o-madan.png",englishName:"Sanat o Madan Bank" },
    { name: "بلو بانک", image: "blu-bank.png",englishName:"Blu Bank" },
  ];

  return (
    <div className="w-full grid grid-cols-1 gap-4">
      {banks.map((bank, index) => (
        <div
          key={index}
          onClick={() => onSelected(bank)}
          className={`flex items-center gap-2 rounded-lg p-3 cursor-pointer ${
            selected === bank.image ? "bg-primary-1/10" : "bg-white"
          }`}
        >
          <div className="aspect-square w-9 flex items-center justify-center overflow-hidden">
            <img
              src={`/images/banks/${bank.image}`}
              alt=""
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="text-xs text-primary-3 font-bold">{bank.name}</div>
        </div>
      ))}
    </div>
  );
}
