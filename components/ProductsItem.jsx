import React,{ useContext } from "react";
import Link from "next/link";
import { contextApi } from "@/context/contextApi";
import { toast } from "react-toastify";


function ProductsItem({ item }) {
  const { id, title, price, slug, image,count } = item;
  const { state, dispatch } = useContext(contextApi);
  const addHandler = () => {
    const itemQuantity = state.cart.cartItmes.find(
      (item) => item.id === id
    )?.quantity;
    if (itemQuantity == count) {
      alert("this Product Not found in Stock");
      return;
    }

    dispatch({ type: "ADD_ITEM", payload: id });
    toast.success("Product Added to Cart.")
  };
  return (
    <div className="bg-slate-100 rounded-lg mb-5 block">
      <Link href={`/Product/${slug}`}>
        <img
          src={image}
          alt="product image"
          className="w-full h-80 md:h-40 rounded"
        />
      </Link>
      <div className="flex flex-col items-center justify-center text-black p-3">
        <Link href={`/Product/${slug}`}>
          <h2 className="text-lg">{title}</h2>
        </Link>
        <p className="p-2">{price} USD</p>
        <button
          onClick={addHandler}
          className="px-4 py-2 bg-gray-600 text-white rounded-xl"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default ProductsItem;
