import Task from "../models/Task.js";
import Project from "../models/Project.js";

// CREATE TASK
export const createTask = async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project || project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const task = await Task.create({
    ...req.body,
    project: req.params.projectId,
  });

  res.status(201).json(task);
};

// GET TASKS
export const getTasks = async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project || project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task) return res.status(404).json({ message: "Task not found" });

  const project = await Project.findById(task.project);

  if (project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  Object.assign(task, req.body);
  const updated = await task.save();

  res.json(updated);
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const project = await Project.findById(task.project);

  if (!project || project.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};
