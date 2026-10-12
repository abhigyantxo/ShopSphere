import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, default: "" },
  description: { type: String, default: "" },
  stock: { type: Number, default: 10 },
});

export default mongoose.model("Product", productSchema);