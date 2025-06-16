type Banks = {
  name: string;
  image: string;
};

type Props = {
  selected: string;
  onSelected: (bank: Banks) => void;
};

export default function BanksList({ onSelected, selected }: Props) {
  const banks: Banks[] = [
    { name: "بانک مسکن", image: "maskan.png" },
    { name: "بانک مهر اقتصاد", image: "mehr-eghtesad.png" },
    { name: "بانک ملت", image: "mellat.png" },
    { name: "بانک ملی", image: "melli.png" },
    { name: "موسسه اعتباری نور", image: "noor.png" },
    { name: "بانک پارسیان", image: "parsian.png" },
    { name: "بانک پاسارگاد", image: "pasargad.png" },
    { name: "بانک رفاه", image: "refah.png" },
    { name: "بانک رسالت", image: "resalat.png" },
    { name: "بانک صادرات", image: "saderat.png" },
    { name: "بانک انصار", image: "ansar.png" },
    { name: "بانک اینده", image: "ayande.png" },
    { name: "بانک اقتصاد نوین", image: "eghtesad.png" },
    { name: "بانک گردشگری", image: "gardeshgari.png" },
    { name: "بانک ایران زمین", image: "iranzamin.png" },
    { name: "بانک کشاورزی", image: "keshavarzi.png" },
    { name: "موسسه اعتباری کوثر", image: "kosar.png" },
    { name: "بانک سرمایه", image: "sarmaye.png" },
    { name: "بانک سپه", image: "sepah.png" },
    { name: "بانک شهر", image: "shahr.png" },
    { name: "بانک سینا", image: "sina.png" },
    { name: "بانک تجارت", image: "tejarat.png" },
    { name: "بانک سامان", image: "saman.png" },
    { name: "موسسه اعتباری ثامن", image: "samen.png" },
    { name: "بانک صنعت و معدن", image: "sanat-o-madan.png" },
    { name: "بلو بانک", image: "blu-bank.png" },
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
