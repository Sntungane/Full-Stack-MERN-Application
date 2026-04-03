import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/api";

function LoginPage() {
  // State for form inputs (email and password)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // State for displaying error messages
  const [error, setError] = useState("");

  // Get login function from AuthContext to update global auth state
  const { login } = useContext(AuthContext);
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // Handle input field changes and clear any previous errors
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error message when user starts typing
    setError("");
  };

  // Handle form submission for user login
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    try {
      // Send login credentials to API and get user data back
      const data = await loginUser(formData);
      // Update global auth context with user data (stores token, user info)
      login(data);
      // Redirect to dashboard after successful login
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="auth-wrapper">
      <center>
      <h2>Login</h2>
      </center>

      {error && <div className="message error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            //value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p className="helper-text">
        Not a Power Puff yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default LoginPage;