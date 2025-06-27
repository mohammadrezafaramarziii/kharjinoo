import { ArrowLeftIcon } from "../../ui/icons/arrow";
import Title from "../../ui/Title";
import ReportBarChart from "./ReportBarChart";

export default function ChartsLayout() {
  return (
    <div>
      <Title title="نمودار">
        <button onClick={() => window.history.back()}>
          <ArrowLeftIcon className="w-6 h-6 text-primary-3" />
        </button>
      </Title>
      <ReportBarChart />
    </div>
  );
}
