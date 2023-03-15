import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../slices/appSlices";
import { isInCart } from "../utils/helpers";
import { addToCart } from "../utils/putToCartFunc";
import { roundTo2Dec } from "../utils/roundTo2Dec";

function Card({
  product,
  setSingleproduct,
  setSingleCart,
  scrollToTop,
  sales,
}) {
  const cartItems = useSelector(selectCartItems);
  const [error, setError] = React.useState(false);
  const [length, setLength] = React.useState(0);
  const dispatch = useDispatch();
  const lengthArr = product.availablelength?.split(",");

  async function handleViewImage(event) {
    try {
      const {
        data: { products },
      } = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);
      const result = products.filter(
        (product) => product._id === event.target.id
      );
      setSingleproduct(result);
    } catch (error) {
      console.log(error);
    }
    scrollToTop();
  }

  // Adding to cart items
  const { name, _id, images, description, color, salespercent } = product;
  const productPrice = product?.price[+length];
  const price = product?.salespercent
    ? roundTo2Dec(productPrice - productPrice * (product?.salespercent / 100))
    : productPrice;
  const image = images[0];
  const hairLength = length;
  const hairColor = color;

  const singleProduct = {
    name,
    id: _id,
    image,
    price,
    hairLength,
    hairColor,
    description,
  };

  const handleAdd = (increase) => {
    if (price && length) {
      addToCart(
        price,
        length,
        dispatch,
        singleProduct,
        setSingleCart,
        setError,
        increase && increase
      );
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="tw-w-[100%] tw-h-[300px] lg:tw-h-[400px] tw-mb-2 md:tw-mx-1 md:tw-w-[300px] tw-shadow-lg tw-relative tw-rounded-sm">
      <img
        onClick={handleViewImage}
        id={product._id}
        src={product.images[0]}
        alt={product._id}
        className="tw-w-full tw-h-[70%] lg:tw-h-[75%] tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
      />
      <div className="tw-bg-white tw-text-neutral-800 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-[10px]">
        <div className="tw-pt-2  tw-px-2 tw-flex tw-justify-between tw-w-full tw-text-[14px] tw-border-b-[1px] tw-border-neutral-300 tw-mb-2">
          <p className="tw-font-bold tw-text-xs md:tw-text-[14px]">
            {product.name}
          </p>
          <div className="tw-pb-1 tw-flex tw-flex-col">
            {+salespercent > 0 && (
              <span className="tw-top-0 tw-right-0 tw-text-[9px] tw-bg-red-700 tw-text-white tw-px-3 tw-rounded-full tw-pt-[1px]">
                Discounted!
              </span>
            )}
            <span className="tw-font-semibold tw-text-xs md:tw-text-[14px]">
              ${price ? price : "***"} USD
            </span>
          </div>
        </div>
        <div className=" tw-px-2 tw-flex tw-flex-row tw-items-center tw-border-b-[1px] tw-border-neutral-300 tw-pb-2 tw-my-2">
          {lengthArr.map((len, idx) => (
            <div
              onClick={() => setLength(+len)}
              key={idx}
              className={`md:tw-cursor-pointer md:hover:tw-bg-neutral-800 md:hover:tw-text-white tw-duration-300 tw-ease-in tw-w-[30px] tw-mr-3 tw-h-[30px] tw-flex tw-items-center tw-justify-center tw-border-[1px] ${
                length === +len
                  ? "tw-bg-neutral-800 tw-text-white"
                  : "tw-border-neutral-400 tw-text-neutral-600"
              } tw-text-[12px] md:tw-text-sm tw-rounded-full`}>
              <span>{len}</span>
            </div>
          ))}
        </div>
        {isInCart(singleProduct, cartItems) ? (
          <div
            className=" tw-mx-2 tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-full tw-bg-neutral-900 tw-px-3 tw-py-[5px] tw-items-center tw-justify-center tw-max-w-[70%] tw-text-neutral-50 hover:tw-cursor-pointer hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mb-2 hover:md:tw-text-neutral-900 hover:md:tw-bg-white "
            onClick={cartItems.length !== 0 ? () => handleAdd(true) : null}>
            <div className="tw-flex tw-flex-row tw-items-center">
              <span className="tw-mr-3">Add More</span>
            </div>
          </div>
        ) : (
          <div
            className=" tw-mx-2 tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-full tw-bg-neutral-900 tw-px-3 tw-py-[5px] tw-items-center tw-justify-center tw-max-w-[70%] tw-text-neutral-50 hover:tw-cursor-pointer hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mb-2 hover:md:tw-text-neutral-900 hover:md:tw-bg-white "
            onClick={handleAdd}>
            <div className="tw-flex tw-flex-row tw-items-center">
              <span className="tw-mr-3">Add to cart</span>
            </div>
          </div>
        )}
        {error && (
          <div className="tw-bg-red-800 tw- tw-w-[100%] tw-rounded-b-[9px]">
            <p className="tw-text-center tw-text-white tw-text-xs">
              Please provide length and color
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
