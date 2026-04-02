import Project from "../models/Project.js";

// CREATE
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ALL
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    return res.json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET ONE
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    return res.json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;

    const updatedProject = await project.save();
    return res.json(updatedProject);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await project.deleteOne();
    return res.json({ message: "Project removed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
