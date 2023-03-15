import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaOpencart, FaHandPointRight } from "react-icons/fa";
import Layout from "../components/shared/Layout";
import CartItemsCheckout from "../components/CartItemsCheckout";
import {
  selectCartItems,
  selectItemCount,
  selectTotal,
} from "../slices/appSlices";
import Button from "../components/shared/Button";
import { UserContext } from "../context/user-context";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { BASE_CURRENCY_CONVERTER_URL } from "../constant";
import { countries } from "../country";
import { useGlobalContext } from "../context/useContextHook";
import ConversionComponent from "../components/shared/ConversionComponent";
import BillingInformationComponent from "../components/shared/BillingInformationComponent";
import Tabs from "../components/shared/Tabs";
import PaymentForm from "../components/shared/PaymentForm";
import SuccessRedirect from "../components/shared/SuccessRedirect";
import { roundTo2Dec } from "../utils/roundTo2Dec";

const logo = require("../assets/logo2.png");
const paypal = require("../assets/paypal.png");
const mastercard = require("../assets/mastercard.png");
const mastercard2 = require("../assets/mastercard2.png");
const americanExpress = require("../assets/american-express.png");

const Cart = () => {
  const { user } = useContext(UserContext);
  const itemCount = useSelector(selectItemCount);
  const total = useSelector(selectTotal);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const [sales, setSales] = React.useState(false);
  const [referral, setReferral] = React.useState("");
  const [error, setError] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [showSum, setShowSum] = React.useState(false);
  const [pageCancel, setPageCancel] = React.useState(false);
  const discountPrice = Number(localStorage.getItem("discountPrice"));
  const userName = localStorage.getItem("username");
  const phone = localStorage.getItem("phone");
  const country = localStorage.getItem("country");
  const orderNo = localStorage.getItem("order no");
  const shippingObj = JSON.parse(localStorage.getItem("shippingCost"));
  const shipMethod = localStorage.getItem("ship");
  const userPostalAddress = localStorage.getItem("address");
  const [showInfo, setShowInfo] = React.useState(false);
  const [selectShippingOption, setSelectShippingOption] = React.useState(false);
  const [showPaypalPayment, setShowPaypalPayment] = React.useState(false);
  const [showCardPayment, setShowCardPayment] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  const [succeeded, setSucceeded] = React.useState(false);
  const [currencyCode, setCurrencyCode] = React.useState("");
  const [
    estimatedTotalPriceOtherCurrency,
    setestimatedTotalPriceOtherCurrency,
  ] = React.useState("");
  const [exchangeRate, setExchangeRate] = React.useState("");

  const shipPrice =
    shipMethod === "ship" ? `USD $${shippingObj.cost}:00` : "PICK UP";
  const taxPrice = discountPrice
    ? roundTo2Dec(discountPrice * +process.env.REACT_APP_TAX_PERCENT)
    : roundTo2Dec(total * +process.env.REACT_APP_TAX_PERCENT);

  let estimatedTotalPrice;
  if (shipMethod === "ship") {
    if (discountPrice) {
      estimatedTotalPrice = roundTo2Dec(
        discountPrice + shippingObj.cost + taxPrice
      );
    } else {
      estimatedTotalPrice = roundTo2Dec(total + shippingObj.cost + taxPrice);
    }
  } else {
    if (discountPrice) {
      estimatedTotalPrice = roundTo2Dec(discountPrice + taxPrice);
    } else {
      estimatedTotalPrice = roundTo2Dec(total + taxPrice);
    }
  }
  const { fetchSalesPercentage } = useGlobalContext();
  React.useEffect(() => {
    setSales(fetchSalesPercentage());

    const myHeaders = new Headers();
    myHeaders.append(
      "apikey",
      process.env.REACT_APP_EXCHANGE_RATE_DATA_API_KEY
    );

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    const countryCurrencyCode = countries.filter(
      (c) => c?.countryName?.toLowerCase() === country?.toLowerCase()
    );

    countryCurrencyCode &&
      setCurrencyCode(countryCurrencyCode?.[0]?.currencyCode.toUpperCase());

    fetch(
      `${BASE_CURRENCY_CONVERTER_URL}to=${countryCurrencyCode?.[0]?.currencyCode.toLowerCase()}&from=usd&amount=${estimatedTotalPrice}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setestimatedTotalPriceOtherCurrency(roundTo2Dec(result?.result));
        setExchangeRate(roundTo2Dec(result?.info?.rate));
      })
      .catch((error) => console.log("error", error));
  }, [country, estimatedTotalPrice, fetchSalesPercentage]);

  let __timeOut;
  clearTimeout(__timeOut);
  if (redirect) {
    __timeOut = setTimeout(function () {
      setRedirect(false);

      navigate("/success");
    }, 5000);
  }
  if (pageCancel) {
    __timeOut = setTimeout(function () {
      setPageCancel(false);

      navigate("/canceled");
    }, 5000);
  }

  const handlePayMethod = (method, event) => {
    if (event) {
      setWarn(false);
      setSelectShippingOption(method);
    }
    if (!localStorage.getItem("referral") && country === "nigeria") {
      setError(true);
    }
  };

  const placeOrder = function () {
    if (error) {
      setError(false);
    }
    if (selectShippingOption) {
      if (selectShippingOption === "paypal") {
        setWarn(false);
        setShowPaypalPayment(true);
        setShowCardPayment(false);
      } else if (selectShippingOption === "card") {
        setWarn(false);
        setShowCardPayment(true);
        setShowPaypalPayment(false);
      }
      localStorage.setItem("payMethod", selectShippingOption);
    } else {
      setWarn(true);
    }
    setSelectShippingOption("");
  };

  const handleReferral = () => {
    localStorage.setItem("referral", referral);
    setReferral("");
    setError(false);
  };

  return (
    <>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <Layout>
        <div
          className={
            sales
              ? "tw-pt-[125px] tw-bg-neutral-200 md:tw-pt-[105px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative"
              : "tw-bg-neutral-200 tw-pt-[90px] md:tw-pt-[60px] tw-pb-[20px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative"
          }>
          {cartItems.length === 0 ? (
            <div className="tw-flex tw-items-center">
              <div className="tw-mr-5 tw-font-light tw-text-white">
                Your Cart is Empty
              </div>
              <FaHandPointRight className="tw-text-white tw-mr-5 tw-text-2xl" />
              <Button handleFunc={() => navigate("/")}>Shop now</Button>
            </div>
          ) : (
            <div className="tw-w-full tw-h-[100%] md:tw-px-10 bg-blur3">
              <div className="tw-flex tw-h-full tw-flex-col md:tw-flex-row te-items-center">
                <div className="tw-w-full lg:tw-inline tw-hidden lg:tw-w-[30%] tw-bg-neutral-300 tw-p-1 md:tw-px-5 md:tw-pt-10">
                  {cartItems.map((item) => (
                    <CartItemsCheckout product={item} key={item.id} />
                  ))}
                  <div className="tw-relative">
                    <BillingInformationComponent
                      userName={userName}
                      phone={phone}
                      userPostalAddress={userPostalAddress}
                      orderNo={orderNo}
                      discountPrice={discountPrice}
                      total={total}
                      setShowInfo={setShowInfo}
                      showInfo={showInfo}
                      shipPrice={shipPrice}
                      taxPrice={taxPrice}
                    />
                    <div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-py-5 tw-px-3">
                      <span className="tw-text-[16px]">Total:</span>
                      <div className="tw-flex tw-flex-col">
                        <div className="tw-flex tw-items-center">
                          <span className="tw-text-[12px] tw-mr-2 tw-text-neutral-700">
                            USD
                          </span>
                          <span className="tw-text-[20px]">
                            ${estimatedTotalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ConversionComponent
                      country={country}
                      currencyCode={currencyCode}
                      exchangeRate={exchangeRate}
                      estimatedTotalPriceOtherCurrency={
                        estimatedTotalPriceOtherCurrency
                      }
                      referral={referral}
                      setReferral={setReferral}
                      error={error}
                      handleReferral={handleReferral}
                    />
                  </div>
                </div>
                <div className="tw-w-full lg:tw-w-[70%] tw-px-3 md:tw-pr-0 md:tw-pl-5">
                  <div className="tw-w-[200px] tw-mx-auto tw-mt-[-20px]">
                    <img src={logo} alt="" />
                  </div>
                  <Tabs
                    user={user}
                    userPostalAddress={userPostalAddress}
                    isPaymentPage={true}
                  />
                  <div
                    className={`tw-block lg:tw-hidden tw-text-[#bba371] tw-border-t-[1px] tw-border-neutral-800 tw-pt-5 ${
                      showSum && "tw-mb-5"
                    }`}>
                    <div className="tw-flex tw-items-center">
                      <FaOpencart className="tw-mr-2" size={25} />
                      <span>{showSum ? "Hide" : "Show"} order summary </span>
                      {showSum ? (
                        <MdOutlineKeyboardArrowUp
                          size={25}
                          onClick={() => setShowSum(false)}
                        />
                      ) : (
                        <MdOutlineKeyboardArrowDown
                          size={25}
                          onClick={() => setShowSum(true)}
                        />
                      )}
                    </div>
                  </div>
                  <div
                    className={`${
                      showSum ? `tw-opacity-1 tw-py-5` : "tw-h-0 tw-opacity-0"
                    } tw-ease-in tw-duration-300 lg:tw-hidden tw-block tw-w-full lg:tw-w-[30%] tw-p-1 md:tw-px-10 md:tw-py-5 tw-bg-[#bba371] `}>
                    {cartItems.map((item) => (
                      <CartItemsCheckout product={item} key={item.id} />
                    ))}
                    <div className="tw-relative">
                      <BillingInformationComponent
                        userName={userName}
                        phone={phone}
                        userPostalAddress={userPostalAddress}
                        orderNo={orderNo}
                        discountPrice={discountPrice}
                        total={total}
                        setShowInfo={setShowInfo}
                        showInfo={showInfo}
                        shipPrice={shipPrice}
                        taxPrice={taxPrice}
                      />
                      <div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-pt-5 tw-px-3 ">
                        <span className="tw-text-[16px]">Total:</span>
                        <div className="tw-flex tw-items-center">
                          <span className="tw-text-[12px] tw-mr-2 tw-text-neutral-700">
                            USD
                          </span>
                          <span className="tw-text-[20px]">
                            ${estimatedTotalPrice}
                          </span>
                        </div>
                      </div>
                      <ConversionComponent
                        country={country}
                        currencyCode={currencyCode}
                        exchangeRate={exchangeRate}
                        estimatedTotalPriceOtherCurrency={
                          estimatedTotalPriceOtherCurrency
                        }
                        referral={referral}
                        setReferral={setReferral}
                        error={error}
                        handleReferral={handleReferral}
                      />
                    </div>
                  </div>
                  <PaymentForm
                    warn={warn}
                    handlePayMethod={handlePayMethod}
                    paypal={paypal}
                    mastercard={mastercard}
                    mastercard2={mastercard2}
                    americanExpress={americanExpress}
                    placeOrder={placeOrder}
                    error={error}
                    showPaypalPayment={showPaypalPayment}
                    showCardPayment={showCardPayment}
                    itemCount={itemCount}
                    discountPrice={discountPrice}
                    total={total}
                    setRedirect={setRedirect}
                    setSucceeded={setSucceeded}
                    succeeded={succeeded}
                    setPageCancel={setPageCancel}
                  />
                </div>
              </div>
            </div>
          )}
          <SuccessRedirect
            redirect={redirect}
            succeeded={succeeded}
            pageCancel={pageCancel}
          />
        </div>
      </Layout>
    </>
  );
};

export default Cart;
