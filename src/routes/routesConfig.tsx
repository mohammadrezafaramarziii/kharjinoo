import type React from "react";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Cards from "../pages/Cards";
import Category from "../pages/Category";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";
import Transactions from "../pages/Transactions";
import Reports from "../pages/Reports";
import ReportDetails from "../pages/ReportDetails";
import CreateTrasactions from "../pages/CreateTrasactions";

type PageRoutes = {
  path: string;
  element: React.ReactNode;
}[];

export const pageRoutes: PageRoutes = [
  { path: "", element: <Dashboard /> },
  { path: "profile", element: <Profile /> },
  { path: "profile/edit", element: <EditProfile /> },
  { path: "profile/change-password", element: <ChangePassword /> },
  { path: "settings", element: <Settings /> },
  { path: "cards", element: <Cards /> },
  { path: "category", element: <Category /> },
  { path: "reports", element: <Reports /> },
  { path: "reports/:id", element: <ReportDetails /> },
  { path: "add-transactions", element: <CreateTrasactions /> },
];
