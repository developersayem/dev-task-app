import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../../v1/utils/mongodb";
import taskModel from "../../../models/TaskModel";

// Handle POST request for create a new task
export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure database connection

    const { title, description, status, priority, user } = await req.json();

    const newTask = await taskModel.create({
      user,
      title,
      description,
      status,
      priority,
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}

// Handle unsupported methods (Optional)
export function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
}
