import { Outlet, useLocation } from "react-router-dom";
import Menu from "../ui/Menu";
import { motion } from "framer-motion";

export default function RouteLayout() {
  const location = useLocation();

  const noAnimationRoutes = ["/dashboard/cards"];
  const limitMenuList = [
    "/dashboard/profile/edit",
    "/dashboard/profile/change-password",
  ];
  const paddingLimited = [
    "/dashboard/cards",
    "/dashboard/profile/edit",
    "/dashboard/profile/change-password",
    "/dashboard/add-transactions",
    "/dashboard/transaction-detail",
  ];

  const shouldAnimate = !noAnimationRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
  const showMenu = limitMenuList.some((route) =>
    location.pathname.startsWith(route)
  );
  const paddingEnabled = paddingLimited.some((route) =>
    location.pathname.startsWith(route)
  );

  const Wrapper = shouldAnimate ? motion.div : "div";

  return (
    <div
      className={`w-full min-h-[100dvh] bg-primary-2 ${
        !paddingEnabled && "p-6 !pb-24"
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
      {!showMenu && <Menu />}
    </div>
  );
}
