import { Product } from "@/models/productModel";
import db from "@/util/db";
import { products } from "@/data/product";

export default async function handler(req, res) {
  await db.connection();
  await Product.deleteMany();
  await Product.insertMany(products);
  res.send({ message: "Product is Send" });
}
