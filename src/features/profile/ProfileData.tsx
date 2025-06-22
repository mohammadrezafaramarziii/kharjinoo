import {
  toLocalLongDate,
  toLocalShortTime,
} from "../../utils/toLocalPersianDateTime";
import useUser from "../auth/useUser";

export default function ProfileData() {
  const { user, isGetUser } = useUser();
  const { avatarUrl, name, email } = user || {};

  return (
    <div className="w-full mt-6 p-6 rounded-3xl overflow-hidden relative bg-gradient-to-br from-primary-1 to-primary-3 ">
      <div
        className={`w-full flex flex-col items-center gap-6 relative z-30 duration-200 ${
          isGetUser ? "opacity-50 blur-md" : ""
        }`}
      >
        {avatarUrl ? (
          <div>
            <img
              src={avatarUrl}
              alt={name}
              className="w-16 h-16 rounded-full outline-2 outline-primary-2 bg-primary-2 outline-offset-4"
            />
          </div>
        ) : (
          <div className="w-16 h-16 flex items-center justify-center text-primary-1 font-black text-2xl rounded-full outline-2 outline-primary-2 bg-primary-2 outline-offset-4">
            <span>{name && name.slice(0, 1)}</span>
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          <h1 className="font-bold text-lg text-white">{name || "---"}</h1>
          <span className="inline-block text-primary-2 text-xs">
            {email || "---"}
          </span>
          <span className="inline-block text-primary-2/50 text-xs">
            عضویت در:{" "}
            {user?.created_at ? toLocalLongDate(new Date(user.created_at)) : ""}
          </span>
          <span className="inline-block text-primary-2/50 text-xs">
            آخرین ورود در:{" "}
            {user?.last_sign_in_at
              ? `${toLocalLongDate(
                  new Date(user.last_sign_in_at)
                )} - ${toLocalShortTime(new Date(user.last_sign_in_at))}`
              : ""}
          </span>
        </div>
      </div>
      <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/shape1.svg')] blur-sm bg-cover bg-center"></div>
    </div>
  );
}
