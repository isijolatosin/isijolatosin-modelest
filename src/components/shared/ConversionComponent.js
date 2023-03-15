import React from "react";
import Heading from "../Heading";
import { FiSend } from "react-icons/fi";

const ConversionComponent = ({
  country,
  currencyCode,
  exchangeRate,
  estimatedTotalPriceOtherCurrency,
  referral,
  setReferral,
  error,
  handleReferral,
}) => {
  return (
    <div className="tw-border-t-[1px] tw-flex tw-flex-row lg:tw-flex-col tw-justify-between lg:tw-border-y-[1px] tw-border-[#b59248] tw-p-3  tw-w-full">
      {!country.includes("united states") && (
        <div className="tw-flex-[0'5] tw-mb-5">
          <Heading
            children="Conversion"
            isLight={true}
            size1={true}
            isBold={true}
          />
          <div className="tw-flex tw-items-center tw-text-neutral-600 tw-font-thin tw-mt-[-3px]">
            <p className="tw-text-[10px] tw-mr-2">Rate: </p>
            <p className="tw-text-[10px]">{`${currencyCode} ${exchangeRate}`}</p>
          </div>
          <div className="tw-flex tw-items-center tw-text-neutral-600 tw-font-thin tw-mt-[-5px]">
            <span className="tw-text-[10px] tw-mr-2">Amount: </span>
            <span className="tw-text-[10px]">
              {`${currencyCode} ${estimatedTotalPriceOtherCurrency}`}
            </span>
          </div>
        </div>
      )}
      <div className="tw-flex-[0'5] tw-w-fit">
        <p className="tw-text-xs">Enter referral code</p>
        <div className="tw-flex tw-items-center">
          <input
            name="referral"
            type="text"
            value={referral}
            onChange={(e) => setReferral(e.target.value)}
            placeholder="referral code"
            className={`${
              error && referral === ""
                ? "tw-border-red-700 tw-border-[1px]"
                : "tw-border-[1px] tw-border-[#bba371]"
            } tw-text-sm tw-font-light tw-bg-transparent tw-py-1 placeholder:tw-text-xs focus:tw-ring-0`}
          />
          <button
            onClick={handleReferral}
            className="tw-text-[#bba371] tw-pl-2">
            <FiSend size={20} />
          </button>
        </div>
        {error && (
          <div className="tw-text-red-700">
            <p className="tw-text-xs">Please enter your referral code!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversionComponent;
