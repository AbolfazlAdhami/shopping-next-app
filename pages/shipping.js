import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";

function ShippingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session?.user) setActiveStep(1);
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
  return (
    <Layout title={"Checkout"}>
      <div className="">
        <CheckoutWizard activeStep={activeStep} />
        <div className={`mt-8 w-full flex items-center ${activeStep > 0 ? "justify-between" : "justify-end"}`}>
          {activeStep > 0 ? (
            <button onClick={() => stepHandler("perv")} className="px-4 py-2 hover:bg-slate-500 transition-all duration-150 ease-linear bg-slate-800 text-white text-lg rounded">
              Pervios
            </button>
          ) : null}
          {activeStep < 3 ? (
            <button onClick={() => stepHandler("next")} className="px-4 py-2 hover:bg-slate-500 transition-all duration-150 ease-linear bg-slate-800 text-white text-lg rounded">
              {" "}
              Next
            </button>
          ) : (
            <button className="px-4 py-2 hover:bg-slate-500 transition-all duration-150 ease-linear bg-slate-800 text-white text-lg rounded"> Checkout</button>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default ShippingPage;
