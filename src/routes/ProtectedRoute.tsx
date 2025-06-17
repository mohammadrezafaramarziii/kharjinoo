import React, { useEffect } from "react";
import useUser from "../features/auth/useUser";
import { useNavigate } from "react-router-dom";
import LoadingRoute from "./LoadingRoute";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isGetUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isGetUser) {
      if (!user) {
        navigate("/", { replace: true });
      }
    }
  }, [user, isGetUser]);

  if (isGetUser) return <LoadingRoute />;

  if (!user) return null;

  return children;
}
