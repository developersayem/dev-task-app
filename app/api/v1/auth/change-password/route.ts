import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "../../utils/mongodb";
import { UserModel } from "@/app/models/userModel";
import { transporter } from "../../utils/mailer";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email,verificationCode, oldPassword, newPassword } = await req.json();
  console.log(email,verificationCode,oldPassword, newPassword);
// if email, oldPassword and newPassword are not provided
  if (!email || !oldPassword || !newPassword) {
    return NextResponse.json(
      { message: "Old password, new password and confirm password are required" },
      { status: 400 }
    );
  }

  try {
    // Check if user exists
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
// Check if old password is correct
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: "Old password is incorrect" },
        { status: 400 }
      );
    }
// Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword, verificationCode: "", } }
    );
    // send notification email after user email update to user old email
    await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Your Password Has Been Successfully Updated",
          text: `Dear ${user.firstName},\n\nYour password has been successfully updated. If you did not make this change, please contact us at ${process.env.EMAIL_USER}.`,
        });
// Return success response
    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { message: "Database error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
