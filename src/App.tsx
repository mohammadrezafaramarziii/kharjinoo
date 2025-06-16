import { Route, Routes } from "react-router-dom";
import { pageRoutes } from "./routes/routesConfig";
import Auth from "./pages/Auth";
import RouteLayout from "./routes/RouteLayout";

function App() {
  return (
    <div className="w-full bg-white font-sans sm:max-w-sm mx-auto">
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route path="/dashboard" element={<RouteLayout />}>
          {pageRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
