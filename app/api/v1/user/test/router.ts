import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../utils/mongodb";
import { UserModel } from "@/app/models/userModel";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  image: string;
}

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const id = req.nextUrl.pathname.split("/").pop(); // or use regex for more precision
    const { firstName, lastName, email, bio, image } = await req.json();

    const updateData: IUser = { firstName, lastName, email, bio, image };

    if (image && image.file) {
      updateData.image = image.file;
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        bio: updatedUser.bio,
        image: updatedUser.image,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Database error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
