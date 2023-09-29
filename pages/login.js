import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Layout from "@/components/Layout";
import Input from "@/components/input";

import { signIn, useSession } from "next-auth/react";

function Loginpage() {
  const { push, query } = useRouter();
  const { redirect } = query;
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session?.user) {
      push(redirect || "/");
    }
  }, [session, redirect]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      console.log(result);
      if (result.error) {
        console.log("Faild");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"Login"}>
      <div className="w-full h-full flex flex-col justify-center items-center my-3">
        <form
          className="w-full lg:w-1/2  flex flex-col gap-3 justify-between bg-slate-400 p-4 rounded"
          autoComplete="off"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h2 className="my-2 text-lg">Login Form</h2>
          <Input
            regester={register("email", { required: true })}
            id={"email"}
            type={"email"}
            label={"Email"}
          />
          {errors.email && (
            <div className="text-red-800 text-lg">Please Enter a Email</div>
          )}
          <Input
            regester={register("password", {
              required: true,
              minLength: {
                value: 5,
                message: "Password must be at Least 5 Character",
              },
            })}
            id={"password"}
            type={"password"}
            label={"Password"}
          />
          {errors.password && (
            <div className="text-red-800 text-lg">
              {errors.password.message}
            </div>
          )}
          <button
            type="submit"
            className="rounded w-1/2 transition-all ease-in duration-300  hover:bg-slate-950 py-2 px-4 bg-gray-700 text-white text-center"
          >
            Login
          </button>
          <button
            onClick={() => push("/regester")}
            className="rounded w-1/2 transition-all ease-in duration-300  hover:bg-slate-700 py-2 px-4 bg-gray-950 text-white text-center"
          >
            Regester
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Loginpage;
