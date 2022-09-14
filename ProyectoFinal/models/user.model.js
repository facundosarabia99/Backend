import mongoose from "mongoose";
import validator from "validator";

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: [validator.isEmail, "Please provide a valid email address"],
      required: [true, "Email required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minlength: 6,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    address: {
      type: String,
    },
    age: {
      type: Number,
    },
    phone: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", Schema);
export default User
