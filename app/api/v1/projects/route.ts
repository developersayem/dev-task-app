import { NextRequest, NextResponse } from "next/server";

import dbConnect from "../utils/mongodb";
import IProject from "@/interfaces/IProject";
import projectModel from "@/app/models/ProjectModel";
export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure database connection

    const body = await req.json();

    const { name, description, status, user } = body;


    const newProject: IProject = await projectModel.create({
      user: user._id, // Store only the user ID
      name,
      description,
      status,
      tasks: [],
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { message: "Database error", error },
      { status: 500 }
    );
  }
}
