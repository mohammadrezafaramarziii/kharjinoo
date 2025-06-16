type Props = {
  onStep: () => void;
};

export default function AuthLanding({ onStep }: Props) {
  return (
    <div className="w-full h-[100dvh] bg-white p-6">
      <div className="w-full h-full flex flex-col justify-between ">
        <div className="w-full flex flex-col flex-1 justify-center gap-18">
          <div>
            <img src="/images/loginPic2.png" alt="" />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="text-sm text-primary-4">خرجینو، مدیریت خرجینو</p>
            <h1 className="text-xl font-alibaba text-primary-1 font-bold">
              مدیریت مخارج با اپلیکیشن خرجینو
            </h1>
            <p className="text-sm text-primary-3">
              با نصب اپلیکیشن، به راحتی در هر زمان و هر مکان به کیف پول، خرید و
              فروش ارز دیجیتال،
            </p>
          </div>
        </div>
        <button onClick={onStep} className="w-full btn btn--primary">
          بزن بریم
        </button>
      </div>
    </div>
  );
}
