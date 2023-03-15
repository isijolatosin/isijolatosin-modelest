import React from "react";
import { Link } from "react-router-dom";

const SearchDropDown = ({ filtered }) => {
  return (
    <div className="tw-bg-white tw-text-black  tw-w-[80%] tw-overflow-y-scroll tw-max-h-[400px] md:tw-max-h-[600px] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
      {filtered?.map((item, idx) => (
        <Link to={item?.route} key={idx}>
          <div className="tw-flex tw-items-center tw-p-3 tw-border-b-[1px] tw-w-[100%] tw-mx-auto hover:tw-bg-[rgba(215,191,137,0.3)] tw-ease-in tw-duration-300">
            <div className="tw-mr-3">
              <img
                src={item?.image}
                alt={item?.name}
                className="tw-object-cover tw-w-[40px] tw-h-[40px] tw-rounded-full"
              />
            </div>
            <div>
              <p className="tw-text-[13px] md:tw-text-[14px]">{item?.name}</p>
              <p className="tw-text-[13px] md:tw-text-[14px]">
                <span className="tw-text-xs tw-font-light">Starting from</span>{" "}
                ${item?.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
      <Link to="/all-bundles">
        <div className="tw-pr-5 tw-py-3 tw-border-b-[1px] tw-w-[90%] tw-mx-auto">
          <span className="tw-text-[13px] md:tw-text-[14px] tw-text-[#bba371] hover:tw-text-black tw-ease-in tw-duration-300">
            View all bundles
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SearchDropDown;
