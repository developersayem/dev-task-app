import { Document } from "mongoose";
import IImage from "./IImage";

// User Interface
export default interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  dob: Date;
  image: IImage;
  verificationCode: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
