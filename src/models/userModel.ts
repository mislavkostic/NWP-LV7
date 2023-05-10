import mongoose from "mongoose";
import Helpers from "../utils/helpers";
import isEmail from "validator/lib/isEmail";

interface UserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserDocument extends UserInput, mongoose.Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Minimum password length is 6 characters"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: UserDocument, next) {
  const hashedPass = await Helpers.hashPassword(this.password);
  this.password = hashedPass;
  next();
});

const userModel = mongoose.model<UserDocument>("user", userSchema);

export { userModel, UserInput, UserDocument };
