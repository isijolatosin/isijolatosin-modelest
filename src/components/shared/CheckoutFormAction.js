import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UserContext } from "../../context/user-context";
import { selectTotal } from "../../slices/appSlices";
import { roundTo2Dec } from "../../utils/roundTo2Dec";

const CheckoutFormAction = ({ navigate }) => {
  const { user } = useContext(UserContext);
  const total = useSelector(selectTotal);
  const [agree, setAgree] = React.useState(false);
  const [showInfo, setShowInfo] = React.useState(false);
  const [warn, setWarn] = React.useState(false);
  function handleCheckout() {
    if (!agree) {
      setWarn(true);
    }
    if (agree) {
      navigate(`/checkout/${user?.displayName || "new-customer"}`);
    }
  }
  return (
    <div className="tw-bg-white tw-p-3 tw-w-full md:tw-w-[40%] md:tw-ml-2">
      <p>Subtotal - ${roundTo2Dec(total)} USD</p>
      <p className="tw-text-neutral-600 tw-text-sm">
        Tax and shipping cost calculated at checkout
      </p>
      <div className="tw-flex tw-items-center tw-relative tw-mb-5">
        <label className="check-container">
          <input
            id="agreetoterms"
            onChange={(e) => {
              setAgree(e.target.checked);
              setWarn(false);
            }}
            type="checkbox"
          />
          <span className={`${warn && "tw-border-red-700"} checkmark`}></span>
        </label>
        <div className="tw-flex tw-items-center">
          <label
            htmlFor="agreetoterms"
            className={`${
              warn ? "tw-text-red-600" : "tw-text-neutral-900"
            } tw-text-sm`}>
            I have read and agreed with{" "}
          </label>
          <div className="tw-relative tw-ml-2 tw-text-xs">
            <button
              className={`${
                warn
                  ? "tw-text-red-600 tw-border-b-[1px] tw-border-red-600"
                  : "tw-text-blue-500 tw-border-b-[1px] tw-border-blue-500"
              }`}
              onMouseOver={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}>
              Terms and Conditions
            </button>
            {showInfo && (
              <div className="tw-absolute tw-max-w-[150px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-br-none tw-text-white tw-text-center tw-top-[-45px] tw-right-[3px] tw-flex tw-items-top">
                <span className="tw-text-left tw-text-[10px] tw-tracking-wiser tw-font-light">
                  Review terms and condition in help tab{" "}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="tw-w-[80%] tw-mx-auto tw-flex tw-items-center">
        <button
          onClick={handleCheckout}
          className="tw-bg-black tw-text-white tw-py-2 tw-px-5 tw-text-center tw-text-xs md:tw-text-sm hover:tw-bg-white hover:tw-text-neutral-900 tw-border tw-border-black tw-ease-in tw-duration-300 tw-w-full">
          Proceed to check out
        </button>
      </div>
    </div>
  );
};

export default CheckoutFormAction;
