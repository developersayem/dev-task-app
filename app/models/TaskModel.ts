import mongoose, { Schema, Document, Model } from "mongoose";

// Define Task Interface
interface ITask extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  status: "todo" | "in progress" | "done" | "backlog";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

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
