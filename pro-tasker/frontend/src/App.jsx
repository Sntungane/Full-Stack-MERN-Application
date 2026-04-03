import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectPage from "./pages/ProjectPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Main App component that defines all application routes
function App() {
  return (
    // Router wraps all routes to enable navigation
    <Router>
      <Routes>
        {/* Home route - Dashboard page protected by authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        {/* Login route - Public page for user authentication */}
        <Route path="/login" element={<LoginPage />} />
        {/* Register route - Public page for creating new accounts */}
        <Route path="/register" element={<RegisterPage />} />
        {/* Project detail route - Protected page for viewing a specific project */}
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// Export the App component as the default export
export default App;