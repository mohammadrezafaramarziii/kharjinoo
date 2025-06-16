export default function ProfileData() {
  return (
    <div className="w-full mt-6 p-6 rounded-3xl overflow-hidden relative bg-gradient-to-br from-primary-1 to-primary-3 ">
      <div className="w-full flex flex-col items-center gap-6 relative z-30">
        <div className="w-16 h-16 flex items-center justify-center text-primary-1 font-black text-2xl rounded-full outline-2 outline-primary-2 bg-primary-2 outline-offset-4">
          <span>
            م
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-lg text-white">محمدرضا فرامرزی</h1>
          <span className="inline-block text-primary-2 text-xs">
            mf575583@gmail.com
          </span>
          <span className="inline-block text-primary-2/50 text-xs">
            عضویت در: 25 مهر 1404
          </span>
        </div>
      </div>
      <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/shape1.svg')] blur-sm bg-cover bg-center"></div>
    </div>
  );
}
