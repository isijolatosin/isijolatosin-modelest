/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaHandPointRight } from "react-icons/fa";
import Layout from "../components/shared/Layout";
import CartItemsCheckout from "../components/CartItemsCheckout";
import { selectCartItems, selectTotal } from "../slices/appSlices";
import Total from "../components/Total";
import Button from "../components/shared/Button";
import { UserContext } from "../context/user-context";
import Heading from "../components/Heading";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { db } from "../firebase";
import { AUTHORIZED_ID } from "../constant";
import OrderSum from "../components/shared/OrderSum";
import useFetchDBHook from "../utils/useFetchDBHook";
import { useGlobalContext } from "../context/useContextHook";
import { useCallback } from "react";
import DiscountInputComponent from "../components/shared/DiscountInputComponent";
import ShippingOptionComponent from "../components/shared/ShippingOptionComponent";
import TotalCheckoutComponent from "../components/shared/TotalCheckoutComponent";
import Tabs from "../components/shared/Tabs";

const logo = require("../assets/logo2.png");

const Cart = () => {
  const { user } = useContext(UserContext);
  const total = useSelector(selectTotal);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const [redirect, setRedirect] = React.useState(false);
  const [pageCancel, setPageCancel] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [discount, setDiscount] = React.useState("");
  const [discountPrice, setDiscountPrice] = React.useState("");
  const [sales, setSales] = React.useState("");
  const [shippingMethod, setShippingMethod] = React.useState("");
  const [warn, setWarn] = React.useState(false);
  const [showLoad, setShowLoad] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  const [pickupNote, setPickupNote] = React.useState(false);
  const [resultArry, setResultArray] = React.useState([]);
  const [code, setCode] = React.useState("");
  const userPostalAddress = localStorage.getItem("address");

  const generateCode = () => {
    const genCode = `ModelEst${Math.random().toString(18).slice(2)}`;
    setCode(genCode);
    db.collection("admin")
      .doc(`${AUTHORIZED_ID.id_one}/`)
      .collection("discount-code")
      .add({
        code: genCode,
      })
      .then(() => {
        console.log(`SUCCESSFULLY ADDED CODE`);
      })
      .catch((error) => console.log("Error " + error.message));
  };
  const type = "checkout";
  const discountRes = useFetchDBHook(db, type);
  const discountCode = useCallback(() => {
    return discountRes;
  }, [discountRes]);

  const { fetchSalesPercentage } = useGlobalContext();

  React.useEffect(() => {
    localStorage.removeItem("discountPrice");
    localStorage.removeItem("ship");
    localStorage.removeItem("address");
    localStorage.removeItem("altEmail");
    localStorage.removeItem("shippingCost");
    localStorage.removeItem("payload");
    localStorage.removeItem("finalPriceToPayObject");
    localStorage.removeItem("finalPriceToPay");
    localStorage.removeItem("order no");
    localStorage.removeItem("username");
    localStorage.removeItem("payMethod");
    localStorage.removeItem("country");
    localStorage.removeItem("referral");
    localStorage.removeItem("phone");

    setSales(fetchSalesPercentage());
    setResultArray(discountCode());
  }, [fetchSalesPercentage]);

  let myTimeout;
  clearTimeout(myTimeout);
  if (redirect) {
    myTimeout = setTimeout(function () {
      setRedirect(false);

      navigate("/success");
    }, 5000);
  }
  if (pageCancel) {
    myTimeout = setTimeout(function () {
      setPageCancel(false);

      navigate("/canceled");
    }, 5000);
  }
  if (showLoad) {
    myTimeout = setTimeout(function () {
      setShowLoad(false);
    }, 5000);
  }
  const handleDisount = (e) => {
    setDiscount(e.target.value);
  };

  const handleApply = () => {
    if (error) {
      myTimeout = setTimeout(function () {
        setError(false);
      }, 5000);
    }
    if (code) {
      myTimeout = setTimeout(function () {
        setCode("");
      }, 3000);
    }
    if (resultArry.includes(discount)) {
      const salesPrice = total * (sales / 100);
      setDiscountPrice(total - salesPrice);

      localStorage.setItem("discountPrice", total - salesPrice);
      setShowLoad(true);

      setDiscount("");

      db.collection("admin")
        .doc(`${AUTHORIZED_ID.id_one}/`)
        .collection("discount-code")
        .onSnapshot((snapshot) => {
          snapshot.docs.map(
            // eslint-disable-next-line array-callback-return
            (doc) => {
              if (doc.data().code === discount) {
                db.collection("admin")
                  .doc(`${AUTHORIZED_ID.id_one}/`)
                  .collection("discount-code")
                  .doc(doc.id)
                  .delete();
              }
            }
          );
        });
    } else {
      setError(true);
    }
  };

  const handleShipMethod = (method, event) => {
    if (event) {
      setShippingMethod(method);
      localStorage.setItem("ship", method);
      setWarn(false);
    } else {
      setShippingMethod("");
      localStorage.removeItem("ship", "");
      setWarn(true);
    }
  };
  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <Layout>
        <div className="tw-bg-neutral-200 tw-pt-[90px] md:tw-pt-[60px] tw-pb-[20px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative">
          {cartItems.length === 0 ? (
            <div className="tw-flex tw-items-center">
              <div className="tw-mr-5 tw-font-light tw-text-white">
                Your Cart is Empty
              </div>
              <FaHandPointRight className="tw-text-white tw-mr-5 tw-text-2xl" />
              <Button handleFunc={() => navigate("/")}>Shop now</Button>
            </div>
          ) : (
            <div className="tw-w-full tw-h-[100%] md:tw-pr-5 bg-blur3">
              <div className="tw-flex tw-h-full tw-flex-col md:tw-flex-row">
                <div className="tw-w-full lg:tw-inline tw-hidden lg:tw-w-[30%] tw-bg-neutral-300 tw-p-1 md:tw-p-5">
                  {cartItems.map((item) => (
                    <CartItemsCheckout product={item} key={item.id} />
                  ))}
                  <DiscountInputComponent
                    discount={discount}
                    handleDisount={handleDisount}
                    error={error}
                    sales={sales}
                    handleApply={handleApply}
                    code={code}
                    generateCode={generateCode}
                  />
                  <TotalCheckoutComponent
                    error={error}
                    showLoad={showLoad}
                    discountPrice={discountPrice}
                    total={total}
                    setShowInfo={setShowInfo}
                    showInfo={showInfo}
                  />
                </div>
                <div className="tw-w-full lg:tw-w-[70%] tw-px-3 md:tw-pr-0 md:tw-pl-5">
                  <div className="tw-w-[200px] tw-mx-auto tw-mt-[-20px]">
                    <img src={logo} alt="" />
                  </div>
                  <Tabs user={user} userPostalAddress={userPostalAddress} />
                  <OrderSum
                    showLoad={showLoad}
                    cartItems={cartItems}
                    discount={discount}
                    handleDisount={handleDisount}
                    error={error}
                    handleApply={handleApply}
                    generateCode={generateCode}
                    code={code}
                    discountPrice={discountPrice}
                    total={total}
                    setShowInfo={setShowInfo}
                    showInfo={showInfo}
                    sales={sales}
                  />

                  <div className="tw-mt-5 tw-mb-2 tw-flex tw-items-center tw-justify-between">
                    <Heading
                      children="Delivery method"
                      isWhite={true}
                      size5={true}
                    />
                    {warn && (
                      <span className="tw-text-red-500 tw-ml-5 tw-text-sm tw-mr-2">
                        Choose a shipping / delivery method
                      </span>
                    )}
                  </div>
                  <ShippingOptionComponent
                    handleShipMethod={handleShipMethod}
                    warn={warn}
                  />
                  <div className="tw-text-xs tw-mb-2 tw-flex tw-items-center tw-relative">
                    <Heading
                      children="Shipping Address"
                      isWhite={true}
                      size5={true}
                    />
                    {shippingMethod === "pick up" && (
                      <>
                        <BsFillQuestionCircleFill
                          size={20}
                          onMouseOver={() => setPickupNote(true)}
                          onMouseLeave={() => setPickupNote(false)}
                          className="tw-text-white tw-mx-3 hover:tw-cursor-pointer"
                        />
                        {pickupNote && (
                          <div className="tw-absolute tw-max-w-[200px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-45px] tw-left-[185px] tw-border-[1px] tw-border-[#bba371]">
                            <span>
                              Shipping information maybe needed to complete
                              order
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <div className="tw-w-full">
                    <Total shippingMethod={shippingMethod} setWarn={setWarn} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Cart;
