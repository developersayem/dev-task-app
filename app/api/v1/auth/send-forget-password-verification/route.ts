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
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { verificationCode: verificationToken } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to update verification code" }, { status: 500 });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Forgot Password Verification",
      html: `
        <p>Dear ${user.firstName || user.lastName || user.email},</p>
        <p>
          You have requested to reset your password. We've sent you this email to verify your identity.
          Please enter the verification code below in the provided field to reset your password.
        </p>
        <p>Your verification code is: <strong>${verificationToken}</strong></p>
        <p>If you didn't request this email, please disregard it.</p>
        <p>Thank you for using our service.</p>
      `,
    });

    return NextResponse.json({ message: "Verification email sent" }, { status: 200 });
  } catch (error) {
    console.error("Error sending verification email:", error);
    return NextResponse.json({ message: "Server error", error: (error as Error).message }, { status: 500 });
  }
}

