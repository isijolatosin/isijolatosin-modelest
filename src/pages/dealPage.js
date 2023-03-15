import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import Slideshow from "../utils/Slideshow";
import RatingFix from "../components/shared/RatingFix";
import { isInCart } from "../utils/helpers";
import {
  addToCartItem,
  increaseCartItem,
  selectCartItems,
} from "../slices/appSlices";
import Reviews from "../components/shared/Reviews";
import Add2CartPopup from "../components/shared/Add2CartPopup";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../components/Heading";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import PaymentOptions from "../components/shared/PaymentOptions";
import { PRODUCT } from "../constant";
import useFetchHook from "../utils/useFetchHook";
import {
  returnDecsriptionObject,
  returnObjectProperty,
} from "../utils/returnObjectProperty";

const DealPage = () => {
  const [singleDeal, setSingleDeal] = React.useState([]);
  const [singleCart, setSingleCart] = React.useState(null);
  const [error, setError] = React.useState(false);
  const [length, setLength] = React.useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  // Getting products from db
  let { dealInfo } = useParams();
  const productId = dealInfo.split("&")[1];
  const category = dealInfo.split("-")[0];
  const url1 = `${process.env.REACT_APP_BASE_ROUTE}/${PRODUCT}`;
  const productsRes = useFetchHook(url1, PRODUCT);
  const fetchProducts = useCallback(async () => {
    try {
      const filterSingleDeal = productsRes?.filter(
        (product) => product?._id === productId
      );
      setSingleDeal(filterSingleDeal);
    } catch (error) {
      console.log(error);
    }
  }, [productsRes, productId]);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Adding to cart items
  const {
    name,
    id,
    image,
    avesizes,
    _singleprice,
    description,
    hairTexture,
    _hairLength,
  } = returnObjectProperty(singleDeal?.[0]);
  const quantity = 1;
  const price = _singleprice;
  const lengthArray = [_hairLength];
  const hairLength = length;
  const dealsProduct = {
    name,
    id,
    image,
    price,
    description,
    hairTexture,
    hairLength,
    quantity,
  };
  const desc = returnDecsriptionObject(
    singleDeal?.[0],
    "",
    singleDeal?.[0]?.name,
    singleDeal?.[0]?.color
  );

  let timeOut;
  const addToCart = () => {
    clearTimeout(timeOut);
    if (length) {
      dispatch(addToCartItem(dealsProduct));
      timeOut = setTimeout(() => {
        setSingleCart(dealsProduct);
      }, 1000);
    } else {
      setError(true);
    }
  };

  const IncreaseItem = () => {
    if (length) {
      dispatch(increaseCartItem(dealsProduct));
      timeOut = setTimeout(() => {
        setSingleCart(dealsProduct);
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${name}-Hair-Bundle-Deals`}</title>
      </Helmet>
      <Layout>
        <div className="tw-pt-0 tw-w-full tw-bg-white tw-flex tw-flex-col tw-items-center">
          <div className="tw-fixed tw-z-20 tw-top-0 md:tw-top-[-95px] tw-right-0">
            <Add2CartPopup
              singleCart={singleCart}
              setSingleCart={setSingleCart}
              quantity={1}
            />
          </div>
          <div className="tw-pt-[70px] xl:tw-w-[80%] tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5">
            <div className="tw-fixed tw-z-10 tw-right-5 md:tw-right-20 tw-top-[170px]">
              <div className="tw-text-neutral-900  tw-mb-3">
                <Link to="/indian-bundles-deals">
                  <BsFillArrowLeftCircleFill
                    size={35}
                    className="hover:md:tw-text-neutral-50 hover:tw-drop-shadow-lg tw-ease-in tw-duration-300"
                  />{" "}
                </Link>
              </div>
            </div>
            <div className="">
              <Slideshow images={singleDeal?.[0]?.images} iconSize={25} />
            </div>
            <div className="tw-px-5">
              <h1 className="tw-text-xl md:tw-text-3xl tw-uppercase">{name}</h1>
              <div className="tw-mb-5">
                <RatingFix isReview={true} size={20} color="black" />
              </div>
              <span>Bundles</span>
              <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2">
                {avesizes?.map(
                  // eslint-disable-next-line array-callback-return
                  (item, idx) =>
                    lengthArray?.includes(item) ? (
                      <div
                        key={idx}
                        onClick={() => {
                          setLength(item);
                          setError(false);
                        }}
                        className={`tw-text-center tw-mr-2 tw-mb-2 tw-p-2 tw-border-[1px] tw-border-neutral-900 tw-rounded-full tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300 ${
                          item === length && "tw-bg-neutral-900 tw-text-white"
                        }`}>
                        <span>{item} - inches</span>
                      </div>
                    ) : (
                      <div
                        className={`tw-text-center tw-mr-2 tw-mb-2 tw-p-2 tw-border-[1px] tw-rounded-full tw-cursor-not-allowed tw-text-neutral-300`}>
                        <span>{item} - inches</span>
                      </div>
                    )
                )}
              </div>
              <div className="tw-mb-1">
                <span className="tw-text-3xl">${_singleprice}</span>
              </div>
              <PaymentOptions price={_singleprice} />
              {error && (
                <div>
                  <p className="tw-text-left tw-mb-2 tw-mt-5 tw-text-red-600 tw-text-xs">
                    Please provide length for your order
                  </p>
                </div>
              )}
              {isInCart(singleDeal?.[0], cartItems) ? (
                <div
                  className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[50%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
                    !error && "tw-mt-5"
                  }`}
                  onClick={cartItems.length !== 0 ? IncreaseItem : null}>
                  <span>Add more</span>
                </div>
              ) : (
                <div
                  className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[50%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
                    !error && "tw-mt-5"
                  }`}
                  onClick={addToCart}>
                  <span>Add to cart</span>
                </div>
              )}
              <div className="tw-mt-10">
                <Heading children="Product details" />
              </div>
              <div className="tw-grid tw-mt-5 tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3 md:tw-gap-x-10">
                {desc.map((item, idx) => (
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
              <div className="tw-mt-10">
                <Heading children="Maintenance" />
              </div>
              <div className="tw-grid tw-mt-5 tw-grid-cols-1 md:tw-grid-cols-2 md:tw-gap-x-10">
                {singleDeal?.[0]?.maintenance?.map((item, idx) => (
                  <li
                    key={idx}
                    className="tw-text-sm tw-italic tw-text-neutral-500 tw-font-light tw-mb-2">
                    {item}
                  </li>
                ))}
              </div>
            </div>
          </div>

          <Reviews category={category} />
        </div>
      </Layout>
    </>
  );
};

export default DealPage;
