import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../services/authService";

export default function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logoutUser, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
  });

  return { logoutUser, isPending };
}
