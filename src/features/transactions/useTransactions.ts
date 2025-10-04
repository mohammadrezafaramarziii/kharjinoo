import { useQuery } from "@tanstack/react-query";
import { getTransactionsApi } from "../../services/transactionsService";
import useUser from "../auth/useUser";

export default function useTransition() {
  const { user } = useUser();
  const { data: transactionsData, isLoading } = useQuery({
    queryKey: ["get-transactions"],
    queryFn: () => getTransactionsApi({ userId: user.id }),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const transactions =
    transactionsData &&
    transactionsData.sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  return { transactions, isLoading };
}
