import React, { useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Layout from "@/components/Layout";
import { contextApi } from "@/context/contextApi";
import Product from "@/models/productModel";
import db from "@/util/db";

const ProductPage = ({ product }) => {
  const { state, dispatch } = useContext(contextApi);
  const { push } = useRouter();
  if (!product) return "Page in NOT Found!!!";
  const { title, price, cat, count, image, description, _id: id } = product;

  const addHandler = () => {
    const itemQuantity = state.cart.cartItmes.find((item) => item.id === id)?.quantity;
    if (itemQuantity == count) {
      alert("this Product Not found in Stock");
      return;
    }

    dispatch({ type: "ADD_ITEM", payload: id });
    push("/cart");
  };

  return (
    <Layout title={title}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start gap-2  m-4 text-black bg-white rounded-xl p-10">
        <div className="d-flex justify-center items-center">
          <Image src={image} width={340} className="rounded-md" height={340} alt="" />
        </div>
        <div className="flex flex-col justify-start items-center md:items-start gap-2">
          <div className="text-lg">
            <h2>{title}</h2>
            <p>{cat}</p>
            <p>{description}</p>
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <p>Price:</p>
              <span>{price}$</span>
            </div>
            <div className="mb-2 flex justify-between">
              <p>Status:</p>
              <span>{count > 0 ? "Available" : "Unavailbe"}</span>
            </div>
            <button onClick={addHandler} className="rounded transition-all ease-in duration-300  hover:bg-slate-950 py-2 px-4 bg-gray-700 text-white text-center">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connection();
  const product = await Product.findOne({ slug }).lean();

  return {
    props: { product: product ? db.convertToObj(product) : null },
  };
}

export async function getStaticPaths() {
  await db.connection();
  let products = await Product.find().lean();
  products = products.map(db.convertToObj);
  const params = products.map((item) => ({ params: { slug: item.slug } }));
  return {
    paths: [...params],
    fallback: true,
  };
}
