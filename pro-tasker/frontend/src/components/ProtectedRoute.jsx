import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Component that protects routes by checking if user is authenticated
function ProtectedRoute({ children }) {
  // Get user data and loading status from AuthContext
  const { user, authLoading } = useContext(AuthContext);

  // Show loading message while checking localStorage for stored user data
  if (authLoading) {
    return <p>Loading...</p>;
  }

  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the protected page/component
  return children;
}

export default ProtectedRoute;