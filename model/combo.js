import mongoose from "mongoose";
const { Schema } = mongoose;

const ComboProductSchema = new Schema({
  products: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],
  specialPrice: { type: Number, required: true },
  category: { type: String, default: "Combo" },
});

const ComboProduct = mongoose.model("ComboProduct", ComboProductSchema);

export default ComboProduct;
