import type React from "react";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Cards from "../pages/Cards";
import Category from "../pages/Category";
import EditProfile from "../pages/EditProfile";
import ChangePassword from "../pages/ChangePassword";

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
];
