import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

// Import the task routes to nest them under projects
import taskRoutes from "./taskRoutes.js";

const router = express.Router();

// Mount task routes as a nested route under /:projectId/tasks
// This allows tasks to be accessed via /api/projects/:projectId/tasks
router.use("/:projectId/tasks", taskRoutes);


// Define routes for the root path:
// POST / - Create a new project (protected by authentication)
// GET / - Retrieve all projects (protected by authentication)
router.route("/").post(protect, createProject).get(protect, getProjects);

// Define routes for a specific project by ID:
// GET /:id - Retrieve a specific project (protected by authentication)
// PUT /:id - Update a project (protected by authentication)
// DELETE /:id - Delete a project (protected by authentication)
router
  .route("/:id")
  .get(protect, getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
