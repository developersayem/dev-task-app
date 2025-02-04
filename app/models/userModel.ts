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
    password: {
      type: String,
      required: true,
      minlength: 6,
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
    password: Joi.string().min(6).required(),
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
