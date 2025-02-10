import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../../utils/mongodb";
import { UserModel } from "@/app/models/userModel";
import IUser from "@/interfaces/IUser";

export async function POST(req: NextRequest) {
  await dbConnect();

  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid or missing JSON body" },
      { status: 400 }
    );
  }

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // Check if user exists
    const user = await UserModel.findOne({ email }).lean<IUser>();
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Return user data instead of token
    return NextResponse.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Enable Edge functions for faster execution
export const config = {
  runtime: "edge",
};
