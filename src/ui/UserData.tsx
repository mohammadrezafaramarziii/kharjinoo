import { SettingsIcon } from "./icons/action";
import { Link } from "react-router-dom";

type Props = {
  name: string;
  email: string;
  avatar?: string;
};

export default function UserData({ name, email, avatar }: Props) {
  return (
    <div className="w-full flex items-center justify-between">
      <Link to="profile" className="flex items-center gap-2">
        {avatar ? (
          <div>
            <img src={avatar} alt={name} className="w-11 h-11 rounded-full" />
          </div>
        ) : (
          <div className="w-11 h-11 flex items-center justify-center bg-primary-1 font-black text-xl rounded-full outline-2 outline-primary-2 text-primary-2 outline-offset-4">
            <span>م</span>
          </div>
        )}

        <div className="flex flex-col gap-1">
          <h1 className="text-primary-1 text-sm font-bold">{name}</h1>
          <span className="text-xs text-primary-4">{email}</span>
        </div>
      </Link>
      <div>
        <Link to="settings" className="btn btn--primary btn--sm !rounded-full">
          <SettingsIcon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
