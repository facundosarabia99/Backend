import mongoose from "mongoose";
import validator from "validator";

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email required"],
    },
    type: {
      type: String,
      required: [true, "User type required"],
    },
    message: {
      type: String,
      required: [true, "Message required"],
    },
  },
  {
    timestamps: true,
  }
);

const Mensaje = mongoose.model("Mensaje", Schema);
export default Mensaje;
