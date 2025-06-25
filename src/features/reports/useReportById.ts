import { useQuery } from "@tanstack/react-query";
import { getTransactionByIdApi } from "../../services/transactionsService";

export default function useReportById(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["get-transaction-by-id", id],
    queryFn: () => getTransactionByIdApi({ transactionId: id }),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const reportData = data && data[0];

  return { reportData, isLoading };
}
