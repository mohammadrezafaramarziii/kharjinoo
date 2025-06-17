import { useNavigate } from "react-router-dom";
import useUser from "../features/auth/useUser";
import { useEffect } from "react";

export default function Error() {
  const navigate = useNavigate();
  const { isGetUser, user } = useUser();

  useEffect(() => {
    if (!isGetUser) {
      if (user) {
        // navigate("/dashboard");
      }
    }
  }, [isGetUser, user]);

  if (isGetUser || user) return null;

  return (
    <div className="w-full h-[100dvh] bg-white p-6">
      <div className="w-full h-full flex flex-col justify-between ">
        <div className="w-full flex flex-col flex-1 justify-center">
          <div>
            <img
              src="/images/error.png"
              alt="error"
              className="w-[250px] mx-auto"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <h1 className="text-xl font-alibaba text-red-500 font-bold">
              خطا در ارتباط با سرور
            </h1>
            <p className="text-red-500 leading-6">
              متأسفانه اتصال به سرور با مشکل مواجه شده است.
              <br />
              لطفاً اتصال اینترنت خود را بررسی کنید و در صورت نیاز
              <span className="font-bold"> فیلترشکن </span> خود را روشن کنید.
            </p>
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full btn btn--primary"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );
}
