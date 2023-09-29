import React from "react";
import Layout from "@/components/Layout";
import ProductsItem from "@/components/ProductsItem";
import Product from "@/models/productModel";
import db from "@/util/db";

export default function Home({ products }) {
  return (
    <Layout title={"Next"}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
        {products.map((item, index) => (
          <ProductsItem key={index} item={item} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  await db.connection();
  const products = await Product.find().lean();

  return {
    props: { products: products.map(db.convertToObj) },
  };
}
