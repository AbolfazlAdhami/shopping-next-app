import mongoose from "mongoose";

const { Schema } = mongoose;

mongoose.Promise = global.Promise;

const productSchema = new Schema({
  title: { type: String, require: true },
  id: { type: Number, require: false },
  price: { type: Number, require: true },
  slug: { type: String, require: true },
  cat: { type: String, require: false, default: "none" },
  count: { type: Number, require: true },
  image: { type: String, require: true },
  description: { type: String, require: false },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
