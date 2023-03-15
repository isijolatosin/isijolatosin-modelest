import React from "react";
import { useGlobalContext } from "../../context/useContextHook";
import { priceObjectArray } from "../../constant";

const PriceInput = () => {
  const { priceObject, setPriceObject } = useGlobalContext();

  return (
    <div className="tw-w-[90%] lg:tw-w-[80%] xl:tw-w-[60%] 2xl:tw-w-[50%] tw-border-b-[1px] tw-border-neutral-100 tw-mb-5">
      <p className="tw-mb-3 tw-text-neutral-500">Prices</p>
      <div className="tw-flex tw-flex-row tw-flex-wrap ">
        {priceObjectArray.map((item) => (
          <div
            key={item}
            className="tw-px-1 tw-flex tw-flex-col tw-items-center">
            <p className="tw-w-[90px] tw-text-center tw-bg-violet-300 tw-text-white tw-text-[10px] tw-font-light">
              {item} inches
            </p>
            <input
              value={priceObject[item] ? priceObject[item] : ""}
              type="text"
              onChange={(e) =>
                setPriceObject({
                  ...priceObject,
                  [item]: +e.target.value,
                })
              }
              placeholder="Price"
              className="tw-rounded-b tw-block tw-mx-auto tw-w-[90px] tw-py-1 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceInput;
