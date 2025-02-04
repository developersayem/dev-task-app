import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import taskModel from "../../../../models/TaskModel";

// Handle GET request to fetch tasks by user ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    await dbConnect(); // Ensure database connection

    const { params } = context; // Wait for params before accessing
    const { id } = params; // Access the id from params

    const tasks = await taskModel.find({ user: id }); // Filter tasks by userId

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}
