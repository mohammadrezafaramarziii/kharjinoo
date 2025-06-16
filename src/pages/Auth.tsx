import { useState, type ReactNode } from "react";
import AuthLanding from "../features/auth/AuthLanding";
import LoginForm from "../features/auth/LoginForm";
import RegisterForm from "../features/auth/RegisterForm";

export default function Auth() {
  const [step, setStep] = useState(0);

  const renderStep = (): ReactNode => {
    switch (step) {
      case 0:
        return <AuthLanding onStep={() => setStep(1)} />;
        break;

      case 1:
        return <LoginForm onStep={() => setStep(2)} />;
        break;

      case 2:
        return <RegisterForm onStep={() => setStep(1)} />;
        break;
      default:
        break;
    }
  };

  return renderStep();
}
