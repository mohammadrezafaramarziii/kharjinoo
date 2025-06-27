import React, { useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isGetUser) {
      if (!user) {
        navigate("/", { replace: true });
      }

      const timeLoad = setTimeout(() => {
        setIsLoading(false);
      }, 1500);

      return () => clearTimeout(timeLoad);
    }
  }, [user, isGetUser]);

  if (isLoading) return <LoadingRoute />;

  if (!user) return null;

  return children;
}
