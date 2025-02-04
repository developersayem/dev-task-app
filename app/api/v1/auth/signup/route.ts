import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserModel } from "../../../../models/userModel";
import { Document } from "mongoose";
import dbConnect from "../../utils/mongodb";
import IUser from "@/interfaces/IUser";

// Define the POST handler for creating a new user
export async function POST(req: NextRequest) {
  await dbConnect();

  const { firstName, lastName, email, password } = await req.json();

  // Ensure password is provided
  if (!password) {
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 }
    );
  }

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email }).lean<IUser>();
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = (await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })) as IUser & Document;

    // Ensure proper typing by explicitly typing as IUser & Document
    const user = newUser.toObject() as IUser;

    // Convert _id to string explicitly
    return NextResponse.json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
