import mongoose from "mongoose";
import validator from "validator";
const { Schema } = mongoose;
const schema = new Schema(
  {
    sku: {
      type: String,
      required: [true, "SKU required"],
      unique: true,
    },
    category: { type: Schema.ObjectId, ref: "category" },
    title: {
      type: String,
      required: [true, "Title required"],
    },
    price: {
      type: Number,
      required: [true, "Price required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock required"],
    },
    photo: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", schema);
export default Product
