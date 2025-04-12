import dbConnect from "@/app/api/v1/utils/mongodb";
import taskModel from "@/app/models/TaskModel";
import { NextRequest, NextResponse } from "next/server";


// Handle GET request to fetch tasks by user ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string, projectId: string }> }
) {
  try {
    await dbConnect(); // Ensure database connection

    const userId = (await params).userId;
    const projectId = (await params).projectId;
    const tasks = await taskModel.find({ user: userId, project: projectId });; // Fetch tasks by userId and projectId
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}
