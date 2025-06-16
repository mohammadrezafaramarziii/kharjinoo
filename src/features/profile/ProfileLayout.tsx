import Title from "../../ui/Title";
import { LogoutIcon } from "../../ui/icons/action";
import ProfileData from "./ProfileData";
import ProfileMenu from "./ProfileMenu";

export default function ProfileLayout() {
  return (
    <div>
      <Title title="پروفایل">
        <button>
          <LogoutIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      <ProfileData />
      <ProfileMenu />
    </div>
  );
}
