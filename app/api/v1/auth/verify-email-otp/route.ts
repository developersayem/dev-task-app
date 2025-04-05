import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import { UserModel } from "@/app/models/userModel";

export async function POST(req: NextRequest) {
  await dbConnect();
  
  const { email, otp } = await req.json();

  try {
    const user = await UserModel.findOne({ email });

    if (!user || user.verificationCode !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    return NextResponse.json({success:true ,message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

