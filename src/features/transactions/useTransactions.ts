import { useQuery } from "@tanstack/react-query";
import { getTransactionsApi } from "../../services/transactionsService";
import useUser from "../auth/useUser";

export default function useTransition() {
  const { user } = useUser();
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["get-transactions"],
    queryFn: () => getTransactionsApi({ userId: user.id }),
    retry: false,
    refetchOnWindowFocus: true,
  });

  return { transactions, isLoading };
}
