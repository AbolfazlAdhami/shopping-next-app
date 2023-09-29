import { useSession } from "next-auth/react";
import React, { useEffect, useReducer } from "react";
import Input from "@/components/input";

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case value:
      break;

    default:
      break;
  }
};

function CheckoutWizard({ activeStep = 0 }) {
  const title = ["User Login", "Address", "Payment Method", "Place Order"];
  const { data: session } = useSession();
  const address = {
    city: "",
    country: "",
    street: "",
    zip_code: "",
  };
  const shippingData = {
    user: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
    },
    address,
  };
  useEffect(() => {
    if (session?.user) {
      shippingData.user.name = session?.user.name;
      shippingData.user.email = session?.user.email;
    }
  }, [session, shippingData, activeStep]);
  const [state, dispatch] = useReducer(reducer, shippingData);

  const handedSubmit = () => {};

  const FormHandler = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Input
              id={"name"}
              label={"name"}
              type={"text"}
              value={shippingData.user.name}
            />
            <Input
              id={"email"}
              label={"email"}
              type={"text"}
              value={shippingData.user.email}
            />
          </>
        );

      default:
        break;
    }
  };

  return (
    <div className="mb-5 flex flex-wrap">
      {title.map((item, index) => (
        <div
          className={`flex-1 border-b-2 py-2 text-center ${
            index <= activeStep
              ? "border-blue-600 text-blue-600"
              : "border-gray-400 text-gray-400"
          }`}
          key={index}
        >
          {item}
        </div>
      ))}
      <div className="w-full flex flex-col gap-5 my-4">
        <FormHandler />
      </div>
    </div>
  );
}

export default CheckoutWizard;
