import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import taskRoutes from "./taskRoutes.js";

const router = express.Router();

router.use("/:projectId/tasks", taskRoutes);

router.route("/").post(protect, createProject).get(protect, getProjects);

router
  .route("/:id")
  .get(protect, getProjectById)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
