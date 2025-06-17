import Title from "../../ui/Title";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import ProfileData from "./ProfileData";
import ProfileMenu from "./ProfileMenu";

export default function ProfileLayout() {
  return (
    <div>
      <Title title="پروفایل">
        <button onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      <ProfileData />
      <ProfileMenu />
    </div>
  );
}
