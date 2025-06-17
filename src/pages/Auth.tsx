import { useEffect, useState, type ReactNode } from "react";
import AuthLanding from "../features/auth/AuthLanding";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";
import useUser from "../features/auth/useUser";
import { useNavigate } from "react-router-dom";
import LoadingRoute from "../routes/LoadingRoute";

export default function Auth() {
  const [step, setStep] = useState(0);
  const { user, isGetUser } = useUser();
  const navigate = useNavigate();

  const renderStep = (): ReactNode => {
    switch (step) {
      case 0:
        return <AuthLanding onStep={() => setStep(1)} />;
        break;

      case 1:
        return <LoginForm onStep={() => setStep(2)} />;
        break;

      case 2:
        return <RegisterForm onStep={setStep} />;
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isGetUser) {
      if (user) {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [isGetUser, user]);

  if (isGetUser) return <LoadingRoute />;

  if (user) return null;

  return renderStep();
}
