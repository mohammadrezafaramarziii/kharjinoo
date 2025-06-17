import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../../services/authService";
import type { User } from "@supabase/supabase-js";

type GetUserResponse = {
  user: User | null;
};
export default function useUser() {
  const { data, isLoading: isGetUser } = useQuery<GetUserResponse>({
    queryKey: ["get-user"],
    queryFn: getUserApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { user } = data || {};

  return { user, isGetUser };
}
