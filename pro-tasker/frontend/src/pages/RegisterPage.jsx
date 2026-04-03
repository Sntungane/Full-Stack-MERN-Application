import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/api";

// RegisterPage component for user account creation
function RegisterPage() {
  // State for storing form input values (name, email, password)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  // State for storing error messages
  const [error, setError] = useState("");
  // State for storing success messages
  const [success, setSuccess] = useState("");

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Handle input field changes and update form state
  const handleChange = (e) => {
    // Update the specific field that changed
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error and success messages when user starts typing
    setError("");
    setSuccess("");
  };

  // Handle form submission for user registration
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    try {
      // Call the registerUser API with form data
      await registerUser(formData);
      // Show success message
      setSuccess("Registration successful. Please log in.");
      // Redirect to login page after 1 second
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      // Display error message from server or generic error message
      setError(error.response?.data?.message || "Registration failed");
    }
  };
// Render the registration form with input fields and messages
  return (
    <div className="auth-wrapper">
      <center>
        <h2>Register</h2>
      </center>

      {error && <div className="message error">{error}</div>}
      {success && <div className="message success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

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
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <p className="helper-text">
        Already Power Puff? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
