import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import { UserModel } from "@/app/models/userModel";
import { transporter } from "../../utils/mailer";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  try {
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { $set: { verificationCode: verificationToken } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to update verification code" }, { status: 500 });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Change Password Verification",
      text: `Your verification code is: ${verificationToken}`,
    });

    return NextResponse.json({ message: "Verification email sent" }, { status: 200 });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json({ message: "Server error", error: (error as Error).message }, { status: 500 });
  }
}

