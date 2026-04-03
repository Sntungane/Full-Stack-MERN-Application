import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";


// Create a React root and render the application
ReactDOM.createRoot(document.getElementById("root")).render(
// Wrap the App component with AuthProvider to provide authentication context to the entire app
  <AuthProvider>
    <App />
  </AuthProvider>
);