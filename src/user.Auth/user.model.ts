import mongoose, { Document, Model, Schema } from "mongoose";
import { decode, encode } from "../lib/hashing";

export interface UserInterface extends Document {
  userName: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePasswords(enterPasswords: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre<UserInterface>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await encode(this.password);
  } catch (error) {
    next(error as Error);
  }
});

UserSchema.methods.comparePasswords = async function (
  enteredPassword: string
): Promise<boolean> {
  return await decode(enteredPassword, this.password);
};

const User: Model<UserInterface> = mongoose.model<UserInterface>(
  "User",
  UserSchema
);
export default User;
