import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import Card from "../components/Card2";
import { selectCartItems } from "../slices/appSlices";
import { useSelector } from "react-redux";
import Add2CartPopup from "../components/shared/Add2CartPopup";
import SingleProductModal from "../components/shared/SingleProductModal";
import Reviews from "../components/shared/Reviews";
import SearchInput from "../components/shared/SearchInput";
import Heading from "../components/Heading";
import SearchDropDown from "../components/shared/SearchDropDown";
import useFetchHook from "../utils/useFetchHook";
import {
  returnDecsriptionObject,
  returnObjectProperty,
} from "../utils/returnObjectProperty";
import { DEFAULT, HIGH_LOW, LOW_HIGH, PRODUCT } from "../constant";
import FilterComponent from "../components/shared/FilterComponent";
import { roundTo2Dec } from "../utils/roundTo2Dec";

function IndianBundles() {
  const [hairBundles, setHairBundles] = React.useState([]);
  const [hairBundlesByPriceLow2High, setHairBundlesByPriceLow2High] =
    React.useState([]);
  const [close, setClose] = React.useState(false);
  const [searchFiltered, setSearchFiltered] = React.useState([]);
  const [searchError, setSearchError] = React.useState(false);
  const [searchControl, setSearchControl] = React.useState(false);
  const [singleProduct, setSingleproduct] = React.useState(null);
  const [singleCart, setSingleCart] = React.useState(null);
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [length, setLength] = React.useState("14");
  const [optionFilter, setOptionFilter] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [priceRangeFilter, setPriceRangeFilter] = React.useState({
    min: "",
    max: "",
  });

  const cartItems = useSelector(selectCartItems);

  // Getting products from db
  const url1 = `${process.env.REACT_APP_BASE_ROUTE}/${PRODUCT}`;
  const productsRes = useFetchHook(url1, PRODUCT, false, false, true);
  const fetchProducts = useCallback(async () => {
    setHairBundles(productsRes);
  }, [productsRes]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
    setShow(true);
  }, [fetchProducts]);

  const scrollToTop = function scrollToTop() {
    window.scrollTo(0, 0);
  };

  // Adding to cart items
  const { name, id, image, color, description, avesizes, salespercent } =
    returnObjectProperty(singleProduct?.[0]);
  const hairLength = length;
  const hairColor = color;
  const hairTexture = singleProduct?.[0] && singleProduct?.[0]?.name;
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
    hairTexture,
    salespercent,
  };
  const desc = returnDecsriptionObject(
    singleProduct,
    "",
    name,
    color,
    avesizes
  );
  const filterOption = [DEFAULT, LOW_HIGH, HIGH_LOW];

  const handleOnChange = (e) => {
    setOptionFilter(e.target.value);

    if ([DEFAULT, ""].includes(e.target.value))
      setHairBundlesByPriceLow2High(
        hairBundles.sort((a, b) => a.name.localeCompare(b.name))
      );
    if (e.target.value) {
      // eslint-disable-next-line array-callback-return
      if (e.target.value === LOW_HIGH) {
        setHairBundlesByPriceLow2High(
          hairBundles.sort((a, b) =>
            a.price[a?.length.split(", ")?.[0] || a?.length] >
            b.price[a?.length.split(", ")?.[0] || a?.length]
              ? 1
              : a.price[a?.length.split(", ")?.[0] || a?.length] <
                b.price[a?.length.split(", ")?.[0] || a?.length]
              ? -1
              : 0
          )
        );
      } else if (e.target.value === HIGH_LOW) {
        setHairBundlesByPriceLow2High(
          hairBundles.sort((a, b) =>
            a.price[a?.length.split(", ")?.[0] || a?.length] <
            b.price[a?.length.split(", ")?.[0] || a?.length]
              ? 1
              : a.price[a?.length.split(", ")?.[0] || a?.length] >
                b.price[a?.length.split(", ")?.[0] || a?.length]
              ? -1
              : 0
          )
        );
      }
    }
  };
  const handleOnChangePrice = (e) => {
    setPriceRangeFilter({
      ...priceRangeFilter,
      [e.target.name]: +e.target.value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if ([priceRangeFilter?.min, priceRangeFilter?.max].every((p) => p === 0))
      return;
    if (
      (priceRangeFilter?.min === 0 || priceRangeFilter?.min) &&
      priceRangeFilter?.max
    ) {
      const array = [];
      // eslint-disable-next-line array-callback-return
      hairBundles.filter((product) => {
        if (
          product?.price[
            product?.length?.split(", ")?.[0] || product?.length
          ] >= priceRangeFilter?.min &&
          product?.price[
            product?.length?.split(", ")?.[0] || product?.length
          ] <= priceRangeFilter?.max
        ) {
          array.push(product);
        }
      });
      setHairBundlesByPriceLow2High(array);
      setPriceRangeFilter({ min: "", max: "" });
    }
  };

  const handleReset = () => {
    setPriceRangeFilter({
      min: "",
      max: "",
    });
    setHairBundlesByPriceLow2High(
      hairBundles.sort((a, b) => a.name.localeCompare(b.name))
    );
  };
  const BundlesByPriceLow2High =
    hairBundlesByPriceLow2High.length > 0
      ? hairBundlesByPriceLow2High
      : hairBundles;
  return (
    <div className="home">
      <Helmet>
        <title>Indian-Hair-Bundles</title>
      </Helmet>
      <Layout>
        <div className="tw-pb-10 tw-pt-[110px] md:tw-pt-20 tw-h-full tw-relative  tw-flex tw-flex-col tw-items-center tw-mx-auto tw-bg-[rgba(255,255,255,0.1)]">
          {show && hairBundles && (
            <>
              <div className="tw-fixed tw-z-50 tw-top-0 md:tw-top-[-95px] tw-right-0 md:tw-right-[-30px]">
                <Add2CartPopup
                  singleCart={singleCart}
                  setSingleCart={setSingleCart}
                  quantity="1"
                />
              </div>
              <div className="tw-pt-[30px] md:tw-pt-[40px]">
                <div
                  className={`${
                    searchControl && "tw-w-[100%] lg:tw-w-[40%]"
                  } "tw-top-[60px] md:tw-top-[30px]"
									} tw-flex tw-flex-col content tw-fixed tw-left-[-9px] md:tw-left-[77px] tw-z-10 tw-ease-in tw-duration-300 2xl:tw-ml-10 tw-mt-[20px]`}>
                  <SearchInput
                    allProducts={hairBundles && hairBundles}
                    searchControl={searchControl}
                    close={close}
                    setFiltered={setSearchFiltered}
                    setSearchControl={setSearchControl}
                    setClose={setClose}
                    setSearchError={setSearchError}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                  />

                  {searchError && (
                    <div className="tw-bg-white tw-text-black tw-ml-[1px] tw-w-[79.7%] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
                      <p className="tw-text-[13px] md:tw-text-[14px] tw-text-red-700 tw-p-3 tw-pl-5">
                        No Result Found !
                      </p>
                    </div>
                  )}
                  {searchFiltered?.length !== 0 && inputValue && (
                    <SearchDropDown filtered={searchFiltered} />
                  )}
                </div>
                <FilterComponent
                  handleOnChange={handleOnChange}
                  optionFilter={optionFilter}
                  filterOption={filterOption}
                  handleFormSubmit={handleFormSubmit}
                  handleOnChangePrice={handleOnChangePrice}
                  priceRangeFilter={priceRangeFilter}
                  handleReset={handleReset}
                />
              </div>

              <div className="tw-w-full md:tw-w-[90%] tw-pt-8 tw-text-center md:tw-text-left tw-pb-3 tw-mt-[30px] tw-border-t-[1px] tw-border-neutral-600">
                <Heading
                  children="All Indian Bundles"
                  isWhite={true}
                  size5={true}
                  // isBold={true}
                />
              </div>
              <div className="tw-w-full tw-px-2">
                <div className="tw-grid tw-grid-cols-2 lg:tw-flex lg:tw-flex-wrap tw-items-center tw-justify-center tw-gap-2 md:tw-gap-5">
                  {BundlesByPriceLow2High.map((item) => (
                    <div key={item._id}>
                      <Card
                        key={item._id}
                        product={item}
                        setSingleproduct={setSingleproduct}
                        setSingleCart={setSingleCart}
                        scrollToTop={scrollToTop}
                      />
                    </div>
                  ))}
                </div>
                <Reviews category="hair-bundles" color="white" />
              </div>
            </>
          )}
          {!show && (
            <div className="tw-rounded-full progress">
              <div className="inner"></div>
            </div>
          )}

          {singleProduct && (
            <SingleProductModal
              category={singleProduct?.[0]?.name}
              singleProduct={singleProduct}
              setSingleproduct={setSingleproduct}
              setSingleCart={setSingleCart}
              desc={desc}
              avesizes={avesizes}
              setLength={setLength}
              setError={setError}
              error={error}
              _singleProduct={_singleProduct}
              cartItems={cartItems}
              price={price}
              length={length}
              color={color}
            />
          )}
        </div>
      </Layout>
    </div>
  );
}

export default IndianBundles;
