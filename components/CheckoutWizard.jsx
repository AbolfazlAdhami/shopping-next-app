import React, { useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import Input from "@/components/input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { contextApi } from "@/context/contextApi";
import Cookies from "js-cookie";
function CheckoutWizard() {
  const title = ["User Data", "Address", "Payment Method", "Place Order"];
  const [activeStep, setActiveStep] = useState(0);
  const { state, dispatch } = useContext(contextApi);
  const { cart } = state;
  const { shippingData } = cart;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(state);
    if (session?.user) setActiveStep(1);
    if (!session) push("/login");
  }, [session]);

  function stepHandler(action) {
    let step = activeStep;
    switch (action) {
      case "next":
        setActiveStep(step + 1);
        break;
      case "perv":
        setActiveStep(step - 1);
      default:
        break;
    }
  }

  const onSubmit = (data) => {
    const payload = { ...data };
    dispatch({ type: "SAVE_SHIPPING_DATA", payload });
    Cookies.set("cart", JSON.stringify({ ...cart, shippingData }));
    // push("/payment");
    console.log(state);
  };

  const FormHandler = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Input value={session?.user ? session.user?.name : ""} id={"name"} regester={register("name", { required: session?.user?.name ? false : true })} label={"name"} type={"text"} />
            <Input value={session?.user ? session.user?.email : ""} id={"email"} label={"email"} regester={register("email", { required: session?.user?.email ? false : true })} type={"text"} />
          </>
        );
      case 1:
        return (
          <>
            <Input id={"country"} regester={register("countery", { required: true })} label={"Country"} type={"text"} />
            <Input id={"city"} label={"City"} regester={register("city", { required: true })} type={"text"} />
            <Input id={"street"} label={"Street"} regester={register("street", { required: true })} type={"text"} />
            <Input id={"postal"} label={"Postal Code"} regester={register("postal", { required: true })} type={"text"} />
          </>
        );
      default:
        break;
    }
  };

  return (
    <div className="mb-5 flex flex-wrap">
      {title.map((item, index) => (
        <div className={`flex-1 border-b-2 py-2 text-center ${index <= activeStep ? "border-blue-600 text-blue-600" : "border-gray-400 text-gray-400"}`} key={index}>
          {item}
        </div>
      ))}
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col py-2 gap-5 my-4">
        <FormHandler />
        <div className={`mt-8 w-full flex items-center ${activeStep > 0 ? "justify-between" : "justify-end"}`}>
          {activeStep > 0 ? (
            <button type="button" onClick={() => stepHandler("perv")} className="px-4 py-2 hover:bg-slate-500 transition-all duration-150 ease-linear bg-slate-800 text-white text-lg rounded">
              Pervios
            </button>
          ) : null}
          {activeStep < 3 ? (
            <button type="button" onClick={() => stepHandler("next")} className="px-4 py-2 hover:bg-slate-500 transition-all duration-150 ease-linear bg-slate-800 text-white text-lg rounded">
              {" "}
              Next
            </button>
          ) : (
            <button type="submit" className="px-4 py-2 hover:bg-slate-500 transition-all duration-150 ease-linear bg-slate-800 text-white text-lg rounded">
              {" "}
              Checkout
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CheckoutWizard;
