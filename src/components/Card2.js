import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../slices/appSlices";
import { isInCart } from "../utils/helpers";
import { addToCart } from "../utils/putToCartFunc";
import { PRODUCT } from "../constant";
import useFetchHook from "../utils/useFetchHook";
import { roundTo2Dec } from "../utils/roundTo2Dec";

function Card({ product, setSingleproduct, setSingleCart, scrollToTop }) {
  const cartItems = useSelector(selectCartItems);
  const [error, setError] = React.useState(false);
  const [screenWidth, updateScreenWidth] = React.useState(0);
  const dispatch = useDispatch();
  const [bundles, setBundles] = React.useState({
    length: "",
    quantity: "",
  });

  React.useEffect(() => {
    function updateWindowWidth() {
      updateScreenWidth(window.innerWidth);
    }

    window.onload = updateWindowWidth;

    window.addEventListener("resize", updateWindowWidth);

    return () => {
      window.removeEventListener("resize", updateWindowWidth);
    };
  }, []);

  const lengthArr = product.availablelength.split(",");

  const type = PRODUCT;
  const url = `${process.env.REACT_APP_BASE_ROUTE}/${PRODUCT}`;
  const fetchProductsRes = useFetchHook(url, type);
  const handleViewImage = useCallback(
    (event) => {
      try {
        const result = fetchProductsRes.filter(
          (product) => product._id === event.target.id
        );
        setSingleproduct(result);
        scrollToTop();
      } catch (error) {
        console.log(error);
      }
    },
    [fetchProductsRes, scrollToTop, setSingleproduct]
  );

  // Adding to cart items
  const { name, _id, images, color, description } = product;
  const productPrice = product?.price[+bundles?.length];
  const price = product?.salespercent
    ? roundTo2Dec(productPrice - productPrice * (product?.salespercent / 100))
    : productPrice;
  const hairLength = bundles.length;
  const hairColor = color;
  const image = images[0];
  const singleProduct = {
    name,
    id: _id,
    image: image,
    hairColor,
    price,
    hairLength,
    description,
  };

  const handleOnChange = (e) => {
    setBundles({ ...bundles, [e.target.name]: e.target.value });
    setError(false);
  };

  return (
    <div className="tw-w-[100%] tw-mx-auto tw-h-[300px] lg:tw-h-[400px] tw-mb-2 md:tw-mx-1 md:tw-w-[300px] tw-shadow-lg tw-relative tw-rounded-sm">
      <img
        onClick={handleViewImage}
        id={product._id}
        src={product.images[0]}
        alt={product._id}
        className=" tw-w-full tw-h-[70%] lg:tw-h-[75%] tw-object-cover tw-rounded-sm tw-cursor-pointer"
      />
      <div className="tw-bg-white tw-h-fit tw-pb-1 tw-text-neutral-800 tw-px-2 tw-w-full tw-relative tw-z-5 tw-bottom-0 tw-rounded-b-lg">
        <div className="tw-pt-2 tw-flex tw-justify-between tw-w-full tw-text-[12px] md:tw-text-[14px] tw-mx-auto">
          <p className="tw-font-bold">{product.name}</p>
          <div className="tw-pb-2 tw-flex tw-flex-col tw-items-end">
            {+product?.salespercent > 0 && (
              <span className="tw-top-0 tw-right-0 tw-text-[9px] tw-bg-red-700 tw-text-white tw-px-3 tw-rounded-full tw-pt-[1px]">
                Discounted!
              </span>
            )}
            <span className="tw-font-semibold">
              ${price ? price : "***"} USD
            </span>
          </div>
        </div>
        <div className="tw-flex tw-items-center tw-justify-between">
          <select
            className="tw-flex-[0.2] tw-h-[28px] tw-text-neutral-900 tw-block tw-w-full tw-mr-1 tw-pl-2 md:tw-px-5 tw-border-none tw-rounded-full tw-text-xs tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-ring-0 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0"
            onChange={handleOnChange}
            id="length"
            value={bundles.length}
            name="length"
            placeholder="Length">
            <option value="">...</option>
            {lengthArr.map((len, idx) => (
              <option key={idx}>{len}</option>
            ))}
          </select>
          {isInCart(singleProduct, cartItems) ? (
            <div
              className="tw-text-center tw-flex-[0.8] tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-full tw-bg-neutral-900 tw-px-1 tw-py-[6px] tw-items-center tw-justify-center tw-max-w-[110px] tw-text-neutral-50 hover:tw-cursor-pointer hover:md:tw-text-neutral-900 hover:md:tw-bg-white hover:tw-text-neutral-400 tw-ease-in tw-duration-500"
              onClick={
                cartItems.length !== 0
                  ? () =>
                      addToCart(
                        price,
                        bundles?.length,
                        dispatch,
                        singleProduct,
                        setSingleCart,
                        setError,
                        true
                      )
                  : null
              }>
              <span className="">
                {screenWidth > 410 ? "Add More" : "More"}
              </span>
            </div>
          ) : (
            <div
              className="tw-flex-[0.8] tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-full tw-bg-neutral-900 tw-px-1 tw-py-[6px] tw-items-center tw-justify-center tw-max-w-[110px] tw-text-neutral-50 tw-cursor-pointer hover:md:tw-text-neutral-900 hover:md:tw-bg-white tw-ease-in tw-duration-500"
              onClick={() =>
                addToCart(
                  price,
                  bundles?.length,
                  dispatch,
                  singleProduct,
                  setSingleCart,
                  setError
                )
              }>
              <span className="">
                {screenWidth > 410 ? "Add to cart" : "Add"}
              </span>
            </div>
          )}
        </div>
        {error && (
          <div>
            <p className="tw-text-center tw-absolute tw-w-full tw-bottom-[5px] md:tw-bottom-[10px] tw-text-red-600 tw-text-xs">
              Please provide length ...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
