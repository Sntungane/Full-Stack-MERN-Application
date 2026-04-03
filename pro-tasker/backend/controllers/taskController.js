import Task from "../models/Task.js";
import Project from "../models/Project.js";

// CREATE TASK (Creates a new task for a specific project)
export const createTask = async (req, res) => {
    // Find the project by ID from the URL parameters
  const project = await Project.findById(req.params.projectId);

    // Check if project exists and verify the current user is the project owner
  if (!project || project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }
    // Create a new task with the request body data and link it to the project
  const task = await Task.create({
    ...req.body,
    project: req.params.projectId,
  });
  // Return the created task with 201 (Created) status
  res.status(201).json(task);
};

// GET TASKS (gets tasks for a specific project)
export const getTasks = async (req, res) => {
  const project = await Project.findById(req.params.projectId);
    // Check if project exists and verify the current user is the project owner
  if (!project || project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }
    // Find all tasks that belong to this project
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

// UPDATE TASK
export const updateTask = async (req, res) => {
    // Find the task by ID from the URL parameters
  const task = await Task.findById(req.params.taskId);
 // Return 404 if task doesn't exist
  if (!task) return res.status(404).json({ message: "Task not found" });
  // Find the project that owns this task
  const project = await Project.findById(task.project);
    // Verify the current user is the project owner (and can modify the task)
  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }
   // Update the task with new data from the request body 
  Object.assign(task, req.body);
  // Save the updated task to the database
  const updated = await task.save();

  res.json(updated);
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  // Find the task by ID from the URL parameters
  const task = await Task.findById(req.params.taskId);

  // Return 404 if task doesn't exist
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  // Find the project that owns this task
  const project = await Project.findById(task.project);

  // Check if project exists and verify the current user is the project owner
  if (!project || project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }
  // Delete the task from the database
  await task.deleteOne();
  res.json({ message: "Task deleted" });
};
