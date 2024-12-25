/**
 * App component that sets up the routing for the application.
 *
 * This component uses `react-router-dom` to define the routes for the application.
 * It currently has a single route that renders the `IndexPage` component at the root path ("/").
 *
 * @component
*/
import { Route, Routes } from "react-router-dom";

import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import PrivateRoute from "./routes/route";

import HowToPerformCPRPage from "./pages/tracks/how-to-perform-cpr";

import CPR from "./pages/modules/how-to-perform-cpr/CPR";
import RecoveryPosition from "./pages/modules/how-to-perform-cpr/RecoveryPosition";

function App() {
  return (
    <Routes>
      <Route index element={<IndexPage />} path="/" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<PrivateRoute/>}>
        <Route element={<DashboardPage />} path="/dashboard" />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route element={<HowToPerformCPRPage />} path="/how-to-perform-cpr" />
      </Route>
      <Route element={<PrivateRoute/>}>
        <Route element={<CPR />} path="/how-to-perform-cpr/CPR" />
        <Route element={<RecoveryPosition />} path="/how-to-perform-cpr/RecoveryPosition" />
      </Route>
    </Routes>
  );
}

export default App;
