import ITask from "@/interfaces/ITask";
import mongoose, { Schema, Model } from "mongoose";

const taskSchema: Schema<ITask> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
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
      enum: ["todo", "in progress", "done", "backlog" ,"cancelled"],
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
    timestamps: true,
    versionKey: false,
  }
);

const taskModel: Model<ITask> =
  mongoose.models.Task || mongoose.model<ITask>("Task", taskSchema);

export default taskModel;
