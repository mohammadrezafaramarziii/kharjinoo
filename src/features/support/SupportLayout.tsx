import Title from "../../ui/Title";
import { ArrowLeftIcon } from "../../ui/icons/arrow";
import FAQList from "./FAQList";

export default function SupportLayout() {
  return (
    <div className="space-y-6">
      <Title title="پشتیبانی">
        <button onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      <FAQList />
    </div>
  );
}
