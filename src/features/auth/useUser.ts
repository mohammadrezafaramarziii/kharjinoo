import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../../services/authService";


export default function useUser() {
  const { data, isLoading: isGetUser } = useQuery({
    queryKey: ["get-user"],
    queryFn: getUserApi,
    retry: false,
    refetchOnWindowFocus: true,
  });
  
  const { user } = data || {};

  return { user, isGetUser };
}
