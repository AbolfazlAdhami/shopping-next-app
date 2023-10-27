import React, { useContext, useEffect, useState } from "react";
import { contextApi } from "@/context/contextApi";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";

import db from "@/util/db";
import Product from "@/models/productModel";
import { toast } from "react-toastify";

function CartPage({ productsList }) {
  const { state, dispatch } = useContext(contextApi);
  let totalPrice = 0;
  const { cart } = state;
  const { push } = useRouter();
  const addHandler = (product) => {
    const itemQuantity = state.cart.cartItmes.find((item) => item.id === product.id)?.quantity;
    if (itemQuantity == product) {
      alert("this Product Not found in Stock");
      return;
    }

    dispatch({ type: "ADD_ITEM", payload: product.id });
    toast.success("Product Added to Cart.");
  };

  return (
    <Layout title={"Cart Shopping"}>
      <h1 className="mb-2 text-2xl ">Shopping Cart</h1>
      {cart.cartItmes.length === 0 ? (
        <div>Cart is Empty</div>
      ) : (
        <div className="grid mb-10 md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-4 text-left">Item</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Quantity</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItmes.map((item) => {
                  let productDetails = productsList.find((product) => product.id == item.id);
                  totalPrice += productDetails.price * item.quantity;
                  return (
                    <tr key={productDetails.id} className="py-2 border-b">
                      <td className="py-2">
                        <span className="flex gap-2 items-center">
                          <Image src={productDetails.image} alt="" width={25} height={25} className="rounded" />
                          {productDetails.title}
                        </span>
                      </td>
                      <td className="py-2 text-center">{productDetails.price} $</td>
                      <td className="py-2 text-center">{item.quantity}</td>
                      <td className="py-2 flex justify-evenly items-center">
                        <button className="px-4 py-2 transition-all ease-linear duration-75 text-center rounded bg-green-400 hover:bg-green-800" onClick={() => addHandler(item)}>
                          Add
                        </button>
                        <button onClick={() => dispatch({ type: "REMOVE_ID", payload: item.id })} className="px-4 py-2 transition-all ease-linear duration-75 text-center rounded  bg-red-600 hover:bg-red-800 text-white">
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="p-5 flex flex-col">
            <div className="pb-5">Total Price: {totalPrice}$</div>
            <button className="px-4 py-2 hover:bg-slate-500 transition-all duration-150 ease-linear bg-slate-800 text-white text-lg rounded" onClick={() => push("login?redirect=/shipping")}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartPage), { ssr: true });

export async function getServerSideProps() {
  await db.connection();
  const products = await Product.find().lean();
  const productsList = products.map(db.convertToObj);

  return { props: { productsList } };
}
