import React from "react";
import CheckoutForm from "./checkout/CheckoutForm";
// import { SHIPPING_COST } from '../constant'

const Total = ({ shippingMethod, setWarn }) => {
  // const canImage = require('../assets/can-image.jpeg')
  // const usaImage = require('../assets/usa-image.jpeg')
  // const lonImage = require('../assets/lon-image.jpeg')

  return (
    <div className="tw-bg-white tw-p-5">
      <CheckoutForm shippingMethod={shippingMethod} setWarn={setWarn} />
    </div>
  );
};

export default Total;
