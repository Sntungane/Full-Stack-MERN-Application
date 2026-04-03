import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getProjects, createProject, deleteProject } from "../services/api";
import { Link, useNavigate } from "react-router-dom";

// import images
import blossom from "../assets/images/blossom.png";
import bubbles from "../assets/images/bubbles.png";
import buttercup from "../assets/images/buttercup.png";

function DashboardPage() {
  // Get user info and logout function from AuthContext
  const { user, logout } = useContext(AuthContext);
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // State for storing list of user's projects
  const [projects, setProjects] = useState([]);
  // State for the project creation form
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  // State to track if projects are still loading from API
  const [loading, setLoading] = useState(true);

  // Array of random profile images to choose from
  const images = [blossom, bubbles, buttercup];
  // State for storing the randomly selected profile image
  const [profileImage, setProfileImage] = useState(null);

  // Fetch projects and set random profile image when component mounts
  useEffect(() => {
    fetchProjects();

    // Pick random Powerpuff character image for profile
    const random = images[Math.floor(Math.random() * images.length)];
    setProfileImage(random);

  }, []);

  // Async function to fetch all projects from API
  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      // Stop loading spinner regardless of success or failure
      setLoading(false);
    }
  };

  // Update form state as user types in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle project creation form submission
  const handleCreateProject = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    try {
      // Send new project data to API
      const newProject = await createProject(formData);
      // Add newly created project to local state
      setProjects([...projects, newProject]);
      // Reset form fields after successful creation
      setFormData({ name: "", description: "" });
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project");
    }
  };

  // Delete a project by ID
  const handleDeleteProject = async (id) => {
    try {
      // Send delete request to API
      await deleteProject(id);
      // Remove deleted project from local state
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project");
    }
  };

  // Handle user logout
  const handleLogout = () => {
    // Clear user data from AuthContext
    logout();
    // Redirect to login page
    navigate("/login");
  };

  // Show loading message while fetching projects
  if (loading) {
    return <p>Loading projects...</p>;
  }

  // Render dashboard with profile header, project form, and project list
  return (
    <div className="container">
      {/* Profile Header - Display random character image and welcome message */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
        {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            style={{
              width: "180px",
              height: "180px",
              border: "3px solid #ec708fff",
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        )}
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          {/* Display logged-in user's name */}
          <p style={{ margin: 1 }}>Welcome Power Puff {user?.name}</p>
        </div>
      </div>

      <hr />

      {/* Create Project Form */}
      <h2>Create New Project</h2>
      <form onSubmit={handleCreateProject}>
        <input
          type="text"
          name="name"
          placeholder="Project name"
          value={formData.name}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Project description"
          value={formData.description}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Create Project</button>
      </form>

      <hr />

      {/* Projects List Section */}
      <h2>Your Projects</h2>

      {/* Show message if no projects exist, otherwise render project cards */}
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        // Render each project as a card with name, description, and action buttons
        projects.map((project) => (
          <div className="card" key={project._id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            <Link to={`/projects/${project._id}`}>View Project</Link>

            <br /><br />

           
            <button onClick={() => handleDeleteProject(project._id)}>
              Delete
            </button>
          </div>
          
        ))
      
      )}
      

      <button onClick={handleLogout}>
        Logout
        </button>
    
    </div>
  );
}

export default DashboardPage;