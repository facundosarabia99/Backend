import mongoose from 'mongoose';
const { Schema } = mongoose;
const schema = new Schema({
  products: [
    { 
      product: {type: Schema.ObjectId, ref: "product"},
      qty: {type: Number}
    },
    
  ],
  user: {type: Schema.ObjectId, ref: "user"}
});
const Cart = mongoose.model("Cart", schema);
export default Cart;