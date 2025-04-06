import mongoose, { Document } from "mongoose";

// Define Task Interface
export default interface IProject extends Document {
  user: mongoose.Schema.Types.ObjectId;
  tasks: mongoose.Schema.Types.ObjectId[];
  name: string;
  status: "todo" | "in progress" | "done" | "backlog"| "cancelled";
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
