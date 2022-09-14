import mongoose from "mongoose";
import validator from "validator";

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email required"],
    },
    status: {
      type: String,
      required: [true, "User type required"],
    },
    order_number: {
      type: Number,
    },
    address: {
      type: String,
    },
    items: [
      {
        title: {
          type: String,
          required: [true, "Product title required"],
        },
        description: {
          type: String,
          required: [true, "Product description required"],
        },
        price: {
          type: Number,
          required: [true, "Product price required"],
        },
        qty: {
          type: Number,
          required: [true, "Product quantity required"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", Schema);
export default Order;
