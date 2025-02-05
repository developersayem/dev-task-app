import { z } from "zod";
import { Types } from "mongoose";

// Define the task schema using zod
export const taskSchema = z.object({
  _id: z.string(),
  user: z.instanceof(Types.ObjectId),
  title: z.string(),
  description: z.string(),
  status: z.enum(["todo", "in progress", "done", "backlog"]),
  label: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Task = z.infer<typeof taskSchema>;
