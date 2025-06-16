import { Outlet, useLocation } from "react-router-dom";
import Menu from "../ui/Menu";
import { motion } from "framer-motion";

export default function RouteLayout() {
  const location = useLocation();

  const noAnimationRoutes = ["/dashboard/cards"];
  const shouldAnimate = !noAnimationRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  const Wrapper = shouldAnimate ? motion.div : "div";

  return (
    <div
      className={`w-full min-h-[100dvh] bg-primary-2 ${
        !location.pathname.startsWith("/dashboard/cards") && "p-6 !pb-24"
      }`}
    >
      <Wrapper
        key={location.pathname}
        {...(shouldAnimate && {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -10 },
          transition: { duration: 0.3 },
        })}
      >
        <Outlet />
      </Wrapper>
      <Menu />
    </div>
  );
}
