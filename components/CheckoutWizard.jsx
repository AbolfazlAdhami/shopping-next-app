import React, { useEffect, useState, useContext } from "react";
import { useSession } from "next-auth/react";
import Input from "@/components/input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { contextApi } from "@/context/contextApi";
import Cookies from "js-cookie";
import { RadioGroup } from "@headlessui/react";

function CheckoutWizard() {
  const title = ["User Data", "Address", "Payment Method", "Place Order"];
  const [activeStep, setActiveStep] = useState(0);
  const paymentMethod = ["Geteway", "Offline Payment"];
  const [selected, setSelected] = useState(paymentMethod[0]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { push } = useRouter();
  const { data: session } = useSession();

  // Read Data from contextApi
  const { state, dispatch } = useContext(contextApi);
  const { cart } = state;
  const { shippingData } = cart;

  // Render Cycle
  useEffect(() => {
    console.log(state, session);
    setValue("name", shippingData?.name || session?.user?.name);
    setValue("email", shippingData?.email || session?.user?.email);
    setValue("countery", shippingData?.countery);
    setValue("city", shippingData?.city);
    setValue("street", shippingData?.street);
    setValue("postal", shippingData?.postal);
    setSelected(shippingData.payment);
  }, []);
  // Render Cycle

  // Form Submit
  const onSubmit = (data) => {
    const payload = { ...data, payment: selected };
    dispatch({ type: "SAVE_SHIPPING_DATA", payload });
    Cookies.set("cart", JSON.stringify({ ...cart, shippingData }));

    console.log(state, selected);
  };

  const FormHandler = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Input id={"name"} regester={register("name", { required: true })} label={"name"} type={"text"} />
            <Input id={"email"} label={"email"} regester={register("email", { required: true })} type={"text"} />
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
      case 2:
        return (
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Payment Method:</RadioGroup.Label>
            <h2 className="text-slate-100 my-2">Payment Method:</h2>
            <div className="space-y-2">
              {paymentMethod.map((item) => (
                <RadioGroup.Option
                  key={item}
                  value={item}
                  className={({ active, checked }) =>
                    `${active ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300" : ""}
                  ${checked ? "bg-slate-800 text-white" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center">
                          <div className="text-sm">
                            <RadioGroup.Label as="p" className={`font-medium  ${checked ? "text-white" : "text-gray-900"}`}>
                              {item}
                            </RadioGroup.Label>
                          </div>
                        </div>
                        {checked && (
                          <div className="shrink-0 text-white">
                            <CheckIcon className="h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
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
            <button type="button" onClick={() => setActiveStep(activeStep - 1)} className="px-4 py-2 hover:bg-slate-500 transition-all duration-150 ease-linear bg-slate-800 text-white text-lg rounded">
              Pervios
            </button>
          ) : null}
          {activeStep < 3 ? (
            <button type="button" onClick={() => setActiveStep(activeStep + 1)} className="px-4 py-2 hover:bg-slate-500 transition-all duration-150 ease-linear bg-slate-800 text-white text-lg rounded">
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

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path d="M7 13l3 3 7-7" stroke="#fff" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default CheckoutWizard;
