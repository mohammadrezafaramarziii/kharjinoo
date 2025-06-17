import { Route, Routes } from "react-router-dom";
import { pageRoutes } from "./routes/routesConfig";
import Auth from "./pages/Auth";
import RouteLayout from "./routes/RouteLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Error from "./pages/Error";
import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-left" />
      <div className="w-full bg-white font-sans sm:max-w-sm mx-auto">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/error" element={<Error />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RouteLayout />
              </ProtectedRoute>
            }
          >
            {pageRoutes.map(({ path, element }, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
