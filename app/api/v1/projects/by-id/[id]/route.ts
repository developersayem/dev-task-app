import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../utils/mongodb";
import projectModel from "@/app/models/ProjectModel";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const id = (await params).id;

    const result = await projectModel.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project deleted successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
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

    const result = await projectModel.findOneAndUpdate(
      { _id: id },
      { [property]: value },
      {
        new: true,
      }
    );

    return NextResponse.json(
      { message: "Project updated successfully", result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}
