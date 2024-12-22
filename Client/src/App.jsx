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

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
    </Routes>
  );
}

export default App;
