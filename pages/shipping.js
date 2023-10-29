import React from "react";
import Layout from "@/components/Layout";
import CheckoutWizard from "@/components/CheckoutWizard";

function ShippingPage() {
  return (
    <Layout title={"Checkout"}>
      <div className="">
        <CheckoutWizard />
      </div>
    </Layout>
  );
}
ShippingPage.auth = true;
export default ShippingPage;
