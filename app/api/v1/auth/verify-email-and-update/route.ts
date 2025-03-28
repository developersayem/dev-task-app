import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import { UserModel } from "@/app/models/userModel";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email,newEmail, verificationCode } = await req.json();
  console.log(email,newEmail, verificationCode);

  if (!email || !verificationCode) {
    return NextResponse.json(
      { message: "Email and verification code are required" },
      { status: 400 }
    );
  }

  try {
    // Check if user exists and fetch the stored verification code
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check if the provided verification code matches the stored one
    if (user.verificationCode !== verificationCode) {
      return NextResponse.json(
        { message: "Invalid verification code" },
        { status: 400 }
      );
    }

    // If the verification code matches, update the user's email and reset verification code
    await UserModel.updateOne(
      { email },
      {
        $set: {
          email: newEmail,
          verificationCode: "",
        },
      }
    );

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { message: "Server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}

