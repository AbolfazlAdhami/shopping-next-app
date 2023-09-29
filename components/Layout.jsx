import React, { useContext, useState, useEffect } from "react";
import { contextApi } from "@/context/contextApi";
import Head from "next/head";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu } from "@headlessui/react";
import DropDown from "./Dropdown";
import Cookies from "js-cookie";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Layout({ children, title }) {
  const { state } = useContext(contextApi);
  const { cart } = state;
  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    setCartCount(cart.cartItmes.reduce((acc, cur) => acc + cur.quantity, 0));
  }, [cart]);
  function logoutHandler() {
    Cookies.remove();
    signOut({ callbackUrl: "/login" });
  }
  const { status, data: session } = useSession();
  return (
    <>
      <Head>
        <title>{`${title} - Shopping`}</title>
      </Head>
      <div className="flex w-screen h-screen  flex-col justify-between items-center">
        <header className="w-full p-4  bg-slate-700 mb-5 flex justify-start items-center shadow shadow-zinc-50 ">
          <div className="flex justify-between w-full">
            <Link href="/" className="text-xl font-bold">
              Shopping
            </Link>
            <nav className=" ">
              <Link
                href="/cart"
                className="p-2 text-gray-300 transition-all ease-in text-lg font-medium hover:text-gray-50 relative"
              >
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0  text-center w-4 h-4 rounded-full text-xs bg-slate-950 text-green-400 hover:bg-slate-500">
                    {cartCount}
                  </span>
                )}
                Cart
              </Link>
              {status == "loading" ? (
                "Loading..."
              ) : session?.user ? (
                <Menu className="relative inline-block" as={"div"}>
                  <Menu.Button className={"text-blue-500  text-lg"}>
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items
                    className={
                      "absolute right-0 w-60 rounded p-4 origin-top-right bg-white border-slate-500"
                    }
                  >
                    <Menu.Item>
                      <DropDown
                        className="flex p-2 text-black"
                        href={"/profile"}
                      >
                        Profile
                      </DropDown>
                    </Menu.Item>
                    <Menu.Item>
                      <a
                        className="flex p-2 text-black"
                        href={"#"}
                        onClick={logoutHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link
                  href="/login"
                  className="p-2 text-gray-300 transition-all ease-in text-lg font-medium hover:text-gray-50"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </header>
        <main className="container mx-auto mt-4 px-4">{children}</main>
        <footer className="bg-slate-400 w-full p-4">Footer</footer>
      </div>
      <ToastContainer
        position="bottom-right"
        limit={3}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default Layout;
