import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/mongodb";
import taskModel from "../../../../../models/TaskModel";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const id = (await params).id;

    const result = await taskModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const id = (await params).id;

    const { property, value } = await req.json();
    console.log({ [property]: value });

    const result = await taskModel.findOneAndUpdate(
      { _id: id },
      { [property]: value },
      {
        new: true,
      }
    );

    return NextResponse.json(
      { message: "Task updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}
