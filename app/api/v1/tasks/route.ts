import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../v1/utils/mongodb";
import taskModel from "../../../models/TaskModel";
import ITask from "@/interfaces/ITask";
export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure database connection

    const body = await req.json();

    const { title, description, status, priority, user, label } = body;

    // Validate label
    if (!["bug", "feature", "documentation"].includes(label)) {
      throw new Error("Invalid label value");
    }

    const newTask: ITask = await taskModel.create({
      user: user._id, // Store only the user ID
      title,
      description,
      status,
      priority,
      label,
    });
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}
