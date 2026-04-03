// Import axios for making HTTP requests
import axios from "axios";
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Create an axios instance with the base URL for all API requests
const API = axios.create({
  baseURL:    BASE_URL + "/api" 
});

// Interceptor that runs before every API request
API.interceptors.request.use((config) => {
  // Retrieve the stored user data from localStorage
  const storedUser = localStorage.getItem("user");

  // If user data exists, parse it and add the JWT token to request headers
  if (storedUser) {
    const user = JSON.parse(storedUser);

    // If the user has a token, add it to the Authorization header
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }

  // Return the updated config to proceed with the request
  return config;
});

// AUTH ENDPOINTS

// Register a new user account
export const registerUser = async (formData) => {
  const response = await API.post("/auth/register", formData);
  return response.data;
};

// Login an existing user
export const loginUser = async (formData) => {
  const response = await API.post("/auth/login", formData);
  return response.data;
};

// PROJECT ENDPOINTS

// Get all projects for the authenticated user
export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

// Get a specific project by ID
export const getProjectById = async (id) => {
  const response = await API.get(`/projects/${id}`);
  return response.data;
};

// Create a new project
export const createProject = async (projectData) => {
  const response = await API.post("/projects", projectData);
  return response.data;
};

// Update an existing project
export const updateProject = async (id, projectData) => {
  const response = await API.put(`/projects/${id}`, projectData);
  return response.data;
};

// Delete a project
export const deleteProject = async (id) => {
  const response = await API.delete(`/projects/${id}`);
  return response.data;
};

// TASK ENDPOINTS

// Get all tasks for a specific project
export const getTasks = async (projectId) => {
  const response = await API.get(`/projects/${projectId}/tasks`);
  return response.data;
};

// Create a new task in a project
export const createTask = async (projectId, taskData) => {
  const response = await API.post(`/projects/${projectId}/tasks`, taskData);
  return response.data;
};

// Update an existing task
export const updateTask = async (projectId, taskId, taskData) => {
  const response = await API.put(
    `/projects/${projectId}/tasks/${taskId}`,
    taskData
  );
  return response.data;
};

// Delete a task
export const deleteTask = async (projectId, taskId) => {
  const response = await API.delete(`/projects/${projectId}/tasks/${taskId}`);
  return response.data;
};

export default API;