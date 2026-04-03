import mongoose from "mongoose";

// Define the Project schema with fields and validation rules
const projectSchema = new mongoose.Schema(
  {    
    // Project name - required field
    name: {
      type: String,
      required: true,
    },
        // Project description..optional field
    description: String,
        // Reference to the User who owns this project
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      // Links to the "User" model
      ref: "User",
            // Every project must have an owner
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

// Create and export the Project model based on the schema
export default mongoose.model("Project", projectSchema);
