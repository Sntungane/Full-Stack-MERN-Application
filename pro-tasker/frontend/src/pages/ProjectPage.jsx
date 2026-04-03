import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getProjectById,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";

// Main component for displaying a single project and managing its tasks
function ProjectPage() {
  // Extract project ID from URL parameters
  const { id } = useParams();
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // State management for project data, tasks, loading, and error handling
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  // State for the task creation form
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  // Fetch project and tasks data when component mounts or ID changes
  useEffect(() => {
    fetchProjectData();
  }, [id]);

  // Async function to fetch project details and associated tasks from API
  const fetchProjectData = async () => {
    try {
      const projectData = await getProjectById(id);
      const taskData = await getTasks(id);
      setProject(projectData);
      setTasks(taskData);
    } catch (error) {
      // Navigate back to dashboard if data fetch fails
      setError("Failed to load project");
      navigate("/");
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

  // Handle task creation form submission
  const handleCreateTask = async (e) => {
    e.preventDefault();

    // Validate that task title is not empty
    if (!formData.title.trim()) {
      return setError("Task title is required");
    }

    try {
      // Send new task to API
      const newTask = await createTask(id, formData);
      // Add newly created task to local state
      setTasks([...tasks, newTask]);
      // Reset form fields after successful creation
      setFormData({
        title: "",
        description: "",
        status: "To Do",
      });
      setError("");
    } catch (error) {
      setError("Failed to create task");
    }
  };

  // Cycle task status through
  const handleStatusChange = async (task) => {
    let newStatus = "To Do";

    if (task.status === "To Do") newStatus = "In Progress";
    else if (task.status === "In Progress") newStatus = "Done";

    try {
      // Send updated task to API
      const updatedTask = await updateTask(id, task._id, {
        ...task,
        status: newStatus,
      });

      // Update task in local state with new status
      setTasks(tasks.map((t) => (t._id === task._id ? updatedTask : t)));
    } catch (error) {
      setError("Failed to update task");
    }
  };

  // Delete a task by ID
  const handleDeleteTask = async (taskId) => {
    try {
      // Send delete request to API
      await deleteTask(id, taskId);
      // Remove deleted task from local state
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  // Return CSS class name based on task status for styling
  const getStatusClass = (status) => {
    if (status === "To Do") return "status todo";
    if (status === "In Progress") return "status progress";
    return "status done";
  };

  // Show loading message while fetching data
  if (loading) {
    return <div className="container"><p>Loading project...</p></div>;
  }

  return (
    <div className="container">
      <Link to="/">Back to Dashboard</Link>

      <h1 className="page-title" style={{ marginTop: "16px" }}>
        {project?.name}
      </h1>
      <p className="page-subtitle">
        {project?.description || "No description provided."}
      </p>

      {error && <div className="message error">{error}</div>}

      <div className="card">
        <h2 style={{ marginBottom: "16px" }}>Create Task</h2>
        <form onSubmit={handleCreateTask}>
          <div className="form-group">
            <label>Task Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter task title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Enter task description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
  <label>Status</label>

  <div style={{ position: "relative" }}>
    <button
      type="button"
      onClick={() => setShowStatusMenu(!showStatusMenu)}
      style={{
        width: "100%",
        textAlign: "left",
        background: "white",
        color: "#1f2937",
        border: "1px solid #e5e7eb",
        padding: "12px 14px",
        borderRadius: "10px",
      }}
    >
      {formData.status}
    </button>

    {showStatusMenu && (
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: 0,
          width: "100%",
          background: "white",
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          marginTop: "6px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          zIndex: 20,
          overflow: "hidden",
        }}
      >
        {["To Do", "In Progress", "Done"].map((status) => (
          <div
            key={status}
            onClick={() => {
              setFormData({ ...formData, status });
              setShowStatusMenu(false);
            }}
            style={{
              padding: "12px 14px",
              cursor: "pointer",
              background: formData.status === status ? "#fce7f3" : "white",
            }}
          >
            {status}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

          <button type="submit">Create Task</button>
        </form>
      </div>

      <h2 style={{ margin: "24px 0 16px" }}>Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks yet. Create your first task above.</p>
      ) : (
        tasks.map((task) => (
          <div className="card" key={task._id}>
            <span className={getStatusClass(task.status)}>{task.status}</span>
            <h3>{task.title}</h3>
            <p>{task.description || "No description provided."}</p>

            <div className="actions">
              <button onClick={() => handleStatusChange(task)}>
                Change Status
              </button>
              <button onClick={() => handleDeleteTask(task._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectPage;