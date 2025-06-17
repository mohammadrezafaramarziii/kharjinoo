import Loading from "../ui/Loading";

export default function LoadingRoute() {
  return (
    <div className="w-full h-[100dvh] bg-white px-6 py-20">
      <div className="w-full h-full flex flex-col justify-between items-center">
        <div className="w-full flex flex-col justify-center">
          <div>
            <img
              src="/images/error.png"
              alt="error"
              className="w-[150px] mx-auto"
            />
          </div>
          <h1 className="text-xl font-alibaba text-primary-1 font-bold">
            خرجینو
          </h1>
        </div>
        <Loading width={40}/>
      </div>
    </div>
  );
}
