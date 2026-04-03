import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

// Create a router instance with mergeParams enabled to access parent route parameters
const router = express.Router({ mergeParams: true });

// Define routes for the root path:
// POST / - Create a new task (protected by authentication)
// GET / - Retrieve all tasks (protected by authentication)
router.route("/").post(protect, createTask).get(protect, getTasks);

// Define routes for a specific task by ID:
// PUT /:taskId - Update a task (protected by authentication)
// DELETE /:taskId - Delete a task (protected by authentication)
router.route("/:taskId").put(protect, updateTask).delete(protect, deleteTask);
// Export
export default router;
