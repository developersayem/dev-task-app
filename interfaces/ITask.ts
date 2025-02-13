import mongoose, { Document } from "mongoose";

// Define Task Interface
export default interface ITask extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  label: "bug" | "feature" | "documentation"; // Now optional
  status: "todo" | "in progress" | "done" | "backlog";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}
