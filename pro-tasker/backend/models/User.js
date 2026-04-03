import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the User schema with fields and validation rules
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

// Middleware that runs before saving a user document
// Hashes the password if it has been modified
userSchema.pre("save", async function (next) {
    // Skip hashing if password hasn't been changed
  if (!this.isModified("password")) return next();

  // Generate a salt with 10 rounds for bcrypt hashing
  const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
  this.password = await bcrypt.hash(this.password, salt);
});

// Custom method to compare an entered password with the stored hashed password
// Returns true if passwords match, false otherwise
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model based on the schema
export default mongoose.model("User", userSchema);
