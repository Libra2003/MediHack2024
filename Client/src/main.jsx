/**
 * Main entry point for the React application.
 *
 * This file sets up the root of the React application and renders it to the DOM.
 * It uses ReactDOM.createRoot to create a root for the application and renders the
 * application within a React.StrictMode component to help identify potential problems.
 *
 * The application is wrapped with BrowserRouter to enable client-side routing,
 * and a custom Provider component to manage global state or context.
 *
 * @file /c:/Users/cigar/Desktop/Coding Projects/Hackatons/MediHack2024/Client/src/main.jsx
 * @module main
 *
 * @requires react
 * @requires react-dom/client
 * @requires react-router-dom
 * @requires ./App.jsx
 * @requires ./provider.jsx
 * @requires ./styles/globals.css
*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { Provider } from "./provider.jsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
