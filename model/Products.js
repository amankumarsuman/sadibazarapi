import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  product_id: { type: String, unique: true },
  name: String,
  price: Number,
  number: Number,
  vendor: String,
  category: String,
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/lqcm8z8qwhi42efm2lue",
  },
  availabe: {
    type: Boolean,
    default: true,
  },
});

const Products = mongoose.model("Products", productSchema);
export default Products;
