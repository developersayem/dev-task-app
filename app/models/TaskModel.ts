import ITask from "@/interfaces/ITask";
import mongoose, { Schema, Model } from "mongoose";

// Define Task Schema
const taskSchema: Schema<ITask> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true, // Ensures every task is linked to a user
    },
    title: {
      type: String,
      required: true,
      trim: true, // Removes leading and trailing spaces
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      enum: ["bug", "feature", "documentation"],
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in progress", "done", "backlog"], // Restrict values
      required: true,
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
      default: "low",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Ensure the model isn't redefined (prevents hot-reload issues)
const taskModel: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default taskModel;
