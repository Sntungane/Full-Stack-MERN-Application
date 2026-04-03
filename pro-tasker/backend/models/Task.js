import mongoose from "mongoose";

// Define the Task schema with fields and validation rules
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
            // Only allow these three status values
      enum: ["To Do", "In Progress", "Done"],
            // Default status when a new task is created
      default: "To Do",
    },
        // Reference to the parent Project document
    project: {
      type: mongoose.Schema.Types.ObjectId,
            // Links to the "Project" model
      ref: "Project",
            // A task must belong to a project
      required: true,
    },
  },
    // Add createdAt and updatedAt timestamps automatically, disable version key
  { timestamps: true, versionKey: false },
);
// Create and export the Task model based on the schema
export default mongoose.model("Task", taskSchema);
