import type React from "react";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Cards from "../pages/Cards";

type PageRoutes = {
  path: string;
  element: React.ReactNode;
}[];

export const pageRoutes: PageRoutes = [
  { path: "", element: <Dashboard /> },
  { path: "profile", element: <Profile /> },
  { path: "settings", element: <Settings /> },
  { path: "cards", element: <Cards /> },
];
