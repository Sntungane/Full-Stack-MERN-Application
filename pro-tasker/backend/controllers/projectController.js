import Project from "../models/Project.js";

// CREATE (Creates a new project for the authenticated user)
export const createProject = async (req, res) => {
  try {
    // Extract name and description from the request body
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Project name is required" });
    }
    // Create a new project with the provided data and set the owner to the current user
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

// GET ALL - (Retrieves all projects owned by the authenticated user)
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    return res.json(projects);
  } catch (error) {
    // Return 500 error if something goes wrong
    return res.status(500).json({ message: error.message });
  }
};

// GET ONE(Retrieves a specific project by ID)
export const getProjectById = async (req, res) => {
  try {
     // Find the project by ID from the URL parameters
    const project = await Project.findById(req.params.id);
    // Return 404 if project doesn't exist
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Verify the current user is the project owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    return res.json(project);
  } catch (error) {
    // Return 500 error if something goes wrong
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE (Updates an existing project by ID)
export const updateProject = async (req, res) => {
  try {
    // Find the project by ID from the URL parameters
    const project = await Project.findById(req.params.id);
    // Return 404 if project doesn't exist
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Verify the current user is the project owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    // Update name and description, keeping existing values if not provided
    project.name = req.body.name || project.name;
    project.description = req.body.description || project.description;

    // Save the updated project to the database
    const updatedProject = await project.save();
    return res.json(updatedProject);
  } catch (error) {
        // Return 500 error if something goes wrong
    return res.status(500).json({ message: error.message });
  }
};

// DELETE
export const deleteProject = async (req, res) => {
  try {
    // Find the project by ID from the URL parameters
    const project = await Project.findById(req.params.id);
    // Return 404 if project doesn't exist
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Verify the current user is the project owner
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }
    // Delete the project from the database
    await project.deleteOne();
    return res.json({ message: "Project removed" });
  } catch (error) {
        // Return 500 error if something goes wrong
    return res.status(500).json({ message: error.message });
  }
};
