import ReportCard from "../reports/ReportCard";

type Props = {};

export default function LatestTransactions({}: Props) {
  return (
    <div className="w-full flex flex-col gap-4">
      {Array(10)
        .fill({})
        .map((item, index) => (
          <ReportCard
            key={index}
            title="قرعه کشی بهمن"
            amount={2300000}
            bankName="blubank"
            datetime={new Date()}
            bank="/images/blu-bank.png"
            index={index}
          />
        ))}
    </div>
  );
}
