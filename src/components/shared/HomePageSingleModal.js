import React from "react";
import Slideshow from "../../utils/Slideshow";
import Heading from "../Heading";
import Rating from "./Rating";
import { isInCart } from "../../utils/helpers";
import { CgClose } from "react-icons/cg";
import { selectCartItems } from "../../slices/appSlices";
import { useDispatch, useSelector } from "react-redux";
import {
  FRONTAL,
  STRAIGHT,
  BODYWAVE,
  CURLY,
  WAVY,
  CLOSURE,
} from "../../constant";
import PaymentOptions from "./PaymentOptions";
import {
  returnDecsriptionObject,
  returnObjectProperty,
} from "../../utils/returnObjectProperty";
import { addToCart } from "../../utils/putToCartFunc";
import { roundTo2Dec } from "../../utils/roundTo2Dec";

const HomePageSingleModal = ({
  singleProduct,
  setSingleCart,
  setSingleproduct,
  sales,
}) => {
  const cartItems = useSelector(selectCartItems);
  const [error, setError] = React.useState(false);

  const [length, setLength] = React.useState("");
  const [_color, setColor] = React.useState("");
  const [_hairType, sethairType] = React.useState("");
  const dispatch = useDispatch();
  const {
    name,
    id,
    image,
    color,
    description,
    width,
    avesizes,
    _hairTexture,
    salespercent,
  } = returnObjectProperty(singleProduct?.[0]);
  const texture = [STRAIGHT, BODYWAVE, CURLY, WAVY];
  const hairLength = length;
  const hairColor = _color || color;
  const hairTexture = _hairType || _hairTexture;
  const productPrice = singleProduct?.[0]?.price[+length];
  const price = salespercent
    ? roundTo2Dec(productPrice - productPrice * (salespercent / 100))
    : productPrice;

  const _singleProduct = {
    name,
    id,
    image,
    hairColor,
    price,
    hairLength,
    description,
    width,
    hairTexture,
    salespercent,
  };

  return (
    <div className="single tw-fixed tw-z-40 tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-0 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white md:tw-pt-5 ">
      <div className="general-scrollbar-hide md:tw-mx-auto tw-w-[100%] md:tw-w-[90%] tw-h-full tw-flex md:tw-flex-row tw-flex-col tw-overflow-scroll">
        <div className="tw-relative tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
          <Slideshow
            images={singleProduct?.[0]?.images}
            iconSize={25}
            video={singleProduct?.[0]?.video}
          />
          <div className="tw-w-[90%] tw-mx-auto md:tw-w-[100%]">
            <p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
              {singleProduct?.[0]?.name}
            </p>
            <div className="tw-flex tw-items-center tw-mb-5">
              <span className="tw-mr-2">Review: </span>
              <Rating isNum={true} color2="[#bba371]" />
            </div>
            <p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
              Description: {singleProduct?.[0]?.description}
            </p>
          </div>
          <div className="tw-flex tw-flex-col tw-ml-5 tw-mt-5 md:tw-ml-0 tw-border-y-[1px] tw-py-3">
            <div className="tw-flex tw-flex-wrap tw-gap-2">
              {avesizes.map(
                // eslint-disable-next-line array-callback-return
                (item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setLength(item);
                      setError(false);
                    }}
                    className={` tw-flex tw-flex-wrap tw-mr-2 tw-p-2 tw-px-3 tw-border-[1px] tw-border-neutral-900 tw-rounded-full tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300 ${
                      item &&
                      length &&
                      item === length &&
                      "tw-bg-neutral-900 tw-text-white"
                    }`}>
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900 ">
          <div className="tw-flex tw-items-start tw-w-[70%] lg:tw-w-[45%] tw-mb-[10px]">
            <p className="tw-font-medium tw-text-2xl">
              Price:
              <span className="">${price || "***"}</span>
            </p>
            {salespercent > 0 && (
              <span className="tw-ml-5 tw-text-[9px] tw-bg-red-700 tw-text-white tw-px-3 tw-rounded-full tw-pt-[1px]">
                Discounted!
              </span>
            )}
          </div>
          <div className="tw-text-sm tw-font-light tw-text-neutral-500 tw-italic">
            <div>
              Color:{" "}
              <span>
                {_color
                  ? _color
                  : singleProduct?.[0]?.color
                  ? singleProduct?.[0]?.color
                  : "***"}
              </span>
            </div>
            {singleProduct?.[0]?.texture && (
              <div>
                Texture:{" "}
                <span>{_hairType || singleProduct?.[0]?.texture || "***"}</span>
              </div>
            )}
            <div>
              Length: <span>{length}" inches</span>
            </div>
          </div>

          {salespercent > 0 && (
            <p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-my-1 tw-text-red-600">
              Sales: {`${salespercent}%`}{" "}
              <span className="tw-text-xs">
                off of ${productPrice || "***"}
              </span>
            </p>
          )}
          <PaymentOptions price={price} />
          <div className="tw-mt-5">
            {error && (
              <div>
                <p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
                  {singleProduct?.[0]?.type
                    .toLowerCase()
                    .includes(FRONTAL || CLOSURE)
                    ? `Please provide color, texture and length for ${singleProduct?.[0]?.name}`
                    : `Please provide length for ${singleProduct?.[0]?.name}`}
                </p>
              </div>
            )}
            {isInCart(_singleProduct, cartItems) ? (
              <div
                className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:md:tw-text-neutral-900 hover:md:tw-bg-white tw-cursor-pointer tw-ease-in tw-duration-300"
                onClick={
                  cartItems.length !== 0
                    ? () =>
                        length
                          ? addToCart(
                              price,
                              dispatch,
                              _singleProduct,
                              setSingleCart,
                              setError,
                              true
                            )
                          : setError(true)
                    : null
                }>
                <span>Add more</span>
              </div>
            ) : (
              <div
                className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:md:tw-text-neutral-900 hover:md:tw-bg-white tw-cursor-pointer tw-ease-in tw-duration-300"
                onClick={() =>
                  length
                    ? addToCart(
                        price,
                        dispatch,
                        _singleProduct,
                        setSingleCart,
                        setError
                      )
                    : setError(true)
                }>
                <span>Add to cart</span>
              </div>
            )}
          </div>

          <div className="tw-my-5 tw-border-t-[1px] tw-border-red-700 tw-py-5 tw-overflow-scroll single tw-h-[70%]">
            <div className="tw-mb-5">
              <Heading children="Product Details" isBold={false} />
            </div>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 md:tw-gap-x-10">
              {returnDecsriptionObject(
                singleProduct,
                texture,
                name,
                color,
                avesizes
              )?.map((item, idx) => (
                <div
                  key={idx}
                  className="tw-flex tw-flex-col tw-mb-2 tw-text-sm tw-capitalize">
                  <span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
                    {item.key}:{" "}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
            {singleProduct?.[0]?.maintenance && (
              <div className="tw-mt-5 tw-mb-2">
                <Heading children="Maintenance" isBold={false} />
              </div>
            )}
            {singleProduct?.[0]?.maintenance?.map((item, idx) => (
              <li
                key={idx}
                className="tw-text-sm tw-italic tw-text-neutral-500 tw-font-light tw-mb-2">
                {item}
              </li>
            ))}
          </div>

          <div className="tw-fixed tw-top-3 tw-z-40 tw-right-3">
            <div
              onClick={() => {
                setSingleproduct(null);
                setColor("");
                sethairType("");
                setLength("");
              }}
              className="tw-text-2xl tw-text-white tw-bg-neutral-900 tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-absolute tw-top-[20px] tw-right-[20px] tw-ease-in tw-duration-300 tw-cursor-pointer hover:md:tw-bg-white hover:md:tw-text-neutral-900">
              <CgClose />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageSingleModal;
