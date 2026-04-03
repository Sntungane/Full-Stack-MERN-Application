import { createContext, useEffect, useState } from "react";

// Create AuthContext to share authentication state across the app
export const AuthContext = createContext();

// AuthProvider component that wraps the app and provides auth state
export const AuthProvider = ({ children }) => {
  // State to store logged-in user data (null if not logged in)
  const [user, setUser] = useState(null);
  // State to track if auth is still being initialized from localStorage
  const [authLoading, setAuthLoading] = useState(true);

  // Check if user data exists in localStorage when component mounts
  useEffect(() => {
    // Retrieve stored user data from browser storage
    const storedUser = localStorage.getItem("user");

    // If user data exists, parse and set it to state
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Mark auth initialization as complete
    setAuthLoading(false);
  }, []);

  // Function to log in user - saves user data to localStorage and state
  const login = (userData) => {
    // Store user data in browser's localStorage for persistence across page refreshes
    localStorage.setItem("user", JSON.stringify(userData));
    // Update user state to trigger re-renders in components using AuthContext
    setUser(userData);
  };

  // Function to log out user - removes user data from localStorage and state
  const logout = () => {
    // Remove user data from browser storage
    localStorage.removeItem("user");
    // Clear user state (set to null)
    setUser(null);
  };

  // Provide auth state and functions to all child components via context
  return (
    <AuthContext.Provider value={{ user, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};