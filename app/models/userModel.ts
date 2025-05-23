import mongoose, { Schema } from "mongoose";
import Joi, { CustomHelpers } from "joi";
import IUser from "@/interfaces/IUser";

// User Schema
const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    bio:{
      type: String,
      minlength: 3,
      required: false
    },
    dob: {
      type: Date,
      required: false,
    },
    image: {
      name: { type: String, required: false },
      file: { type: String, required: false }, // Base64 or URL
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    verificationCode: {
      type: String,
      default:"",
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tasks",
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

// User Validator Function
const userValidator = (data: IUser) => {
  const userJoiSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required()
      .custom((value: string, helpers: CustomHelpers) => {
        const regex = /^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+(com|net)$/i;
        if (!regex.test(value)) {
          return helpers.error("any.invalid", {
            message: "Only .com and .net domains are allowed",
          });
        }
        return value;
      }),
    bio: Joi.string().min(3).optional().allow(null, ""), // ✅ Optional `boi`
    dob: Joi.date().optional().allow(null, ""), // ✅ Optional `dob`
    password: Joi.string().min(6).required(),
    image: Joi.object({
      name: Joi.string().optional().allow(null, ""), // ✅ Optional `image.name`
      file: Joi.string().optional().allow(null, ""), // ✅ Optional `image.file`
    }).optional(), // ✅ Entire `image` object is optional
    verificationCode: Joi.string().optional().allow(""),
  }).messages({
    "string.email": "Make sure your email is correct",
  });

  const { error } = userJoiSchema.validate(data);
  return error;
};


// Check if the model is already defined
const UserModel =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// Export Model and Validator
export { UserModel, userValidator };
