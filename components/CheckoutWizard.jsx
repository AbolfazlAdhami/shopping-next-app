import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Input from "@/components/input";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

function CheckoutWizard({ activeStep = 0 }) {
  const title = ["User Data", "Address", "Payment Method", "Place Order"];
  const { push } = useRouter();
  const { data: session } = useSession();

  const [] = useForm();
  const shippingData = {
    user: {
      name: session?.user?.name,
      email: session?.user?.email,
    },
  };
  const handedSubmit = () => {
    if (session?.user) {
      push("/login");
      return;
    }
  };

  const FormHandler = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Input id={"name"} label={"name"} type={"text"} value={shippingData.user.name} />
            <Input id={"email"} label={"email"} type={"text"} value={shippingData.user.email} />
          </>
        );
      case 1:
        return (
          <>
            <h3 className="text-lg text-slate-400 ">Type Your Address</h3>
            <Input id={"country"} label={"Country"} type={"text"} />
            <Input id={"city"} label={"City"} type={"text"} />
            <Input id={"street"} label={"Street"} type={"text"} />
            <Input id={"postal"} label={"Postal Code"} type={"text"} />
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
      <form className="w-full flex flex-col gap-5 my-4">
        <FormHandler />
      </form>
    </div>
  );
}

export default CheckoutWizard;
