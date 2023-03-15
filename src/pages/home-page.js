import React, { useCallback } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import Products from "../components/Products";
import SearchInput from "../components/shared/SearchInput";
import { getDatabase } from "firebase/database";
import PictureSlide from "../components/shared/PictureSlide";
import CtaButton from "../components/shared/CtaButton";
import useFetchHook from "../utils/useFetchHook";
import useFetchDBHook from "../utils/useFetchDBHook";
import SearchDropDown from "../components/shared/SearchDropDown";
import { CLOUDINARY, PRODUCT } from "../constant";

function HomePage() {
  const [searchControl, setSearchControl] = React.useState(false);
  const [close, setClose] = React.useState(false);
  const [toBottom, setToBottom] = React.useState(false);
  const [chat, setChat] = React.useState(true);
  const [searchError, setSearchError] = React.useState(false);
  const [allWigsCloudinaryImg, setAllWigsCloudinaryImg] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [showWhatsapp, setShowWhatsapp] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [allProducts, setAllproducts] = React.useState([]);
  const database = getDatabase();
  const type = "sales";
  let salesType;
  salesType = useFetchDBHook(database, type);

  // Getting products from db
  const url1 = `${process.env.REACT_APP_BASE_ROUTE}/${PRODUCT}`;
  const productsRes = useFetchHook(url1, PRODUCT);
  const fetchProducts = useCallback(() => {
    const filteredHair = productsRes?.filter((item) => !item?.with);
    setAllproducts(filteredHair);
  }, [productsRes]);

  // Getting slide imgaes from cloudinary
  const url2 = process.env.REACT_APP_CLOUDINARY_WIGS;
  const resources = useFetchHook(url2, CLOUDINARY);
  const fetchCloudinaryImages = useCallback(async () => {
    setAllWigsCloudinaryImg(resources);
  }, [resources]);

  React.useEffect(() => {
    fetchProducts();
    fetchCloudinaryImages();
  }, [fetchProducts, fetchCloudinaryImages]);

  window.onscroll = function (ev) {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - (window.innerHeight + window.scrollY)
    ) {
      setToBottom(true);
      setChat(false);
    } else {
      setToBottom(false);
      setChat(true);
    }
  };

  return (
    <div className="relative home ">
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Layout>
        <div
          className={
            allProducts?.length > 0 &&
            allProducts.every((product) => product?.sales)
              ? `tw-flex tw-flex-col tw-items-center ${
                  allProducts?.length === 0 ? "tw-pt-[60px]" : "tw-pt-[120px]"
                } tw-pb-10 md:tw-py-[50px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
              : ` tw-flex tw-flex-col tw-items-center ${
                  allProducts?.length === 0 && "tw-pt-[230px]"
                } ${
                  salesType > 0
                    ? "md:tw-pt-[75px] tw-pt-[95px]"
                    : "md:tw-pt-[35px] tw-pt-[50px]"
                } md:tw-pb-[50px] lg:tw-w-[100%] lg:tw-mx-auto tw-bg-[rgba(255,255,255,0.1)] tw-relative`
          }>
          <div
            onClick={() => window.scrollTo(0, 0)}
            className={`${
              toBottom ? "tw-inline" : "tw-hidden"
            } tw-fixed tw-bottom-[25px] tw-right-[10px] tw-bg-[rgba(0,0,0,0.85)] tw-text-[#bba371] tw-p-2 tw-rounded-[30px] tw-z-20 tw-cursor-pointer hover:md:tw-bg-white hover:md:tw-text-neutral-900 tw-shadow-lg tw-shadow-[rgba(255,255,255,0.3)] tw-ease-in tw-duration-300 `}>
            <MdOutlineKeyboardArrowUp size={33} />
          </div>
          <div
            className={`md:tw-hidden tw-fixed tw-bottom-0 tw-z-20 tw-w-[100%] ${
              !chat && "tw-hidden"
            }`}>
            <div className="tw-flex tw-flex-row tw-justify-center tw-text-center tw-w-[100%] tw-h-[70px]">
              <p
                className="tw-font-light tw-text-green-500 tw-text-sm tw-bg-neutral-800 tw-border-t-[1px] tw-border-green-900 tw-w-full tw-flex tw-items-center tw-justify-center"
                onClick={() => setShowWhatsapp(!showWhatsapp)}>
                {showWhatsapp
                  ? "Hide whatsapp button"
                  : "Message us on whatsapp. CLICK ME"}
              </p>
              {showWhatsapp && (
                <div>
                  <CtaButton isIcon={true} />
                </div>
              )}
            </div>
          </div>
          <div
            className={`${searchControl && "tw-w-[100%] lg:tw-w-[40%]"} ${
              salesType
                ? "tw-top-[101px] md:tw-top-[76px]"
                : "tw-top-[56px] md:tw-top-[24px]"
            } tw-flex tw-flex-col content tw-fixed tw-left-[-16px] md:tw-left-[-16px] tw-z-10 tw-ease-in tw-duration-300 2xl:tw-ml-10 tw-mt-[20px]`}>
            <SearchInput
              allProducts={allProducts && allProducts}
              searchControl={searchControl}
              close={close}
              setFiltered={setFiltered}
              setSearchControl={setSearchControl}
              setClose={setClose}
              setSearchError={setSearchError}
              inputValue={inputValue}
              setInputValue={setInputValue}
            />
            {searchError && (
              <div className="tw-bg-white tw-text-black  tw-w-[80%] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
                <p className="tw-text-[13px] md:tw-text-[14px] tw-text-red-700 tw-p-3 tw-pl-5">
                  No Result Found !
                </p>
              </div>
            )}
            {filtered?.length !== 0 && inputValue && (
              <SearchDropDown filtered={filtered} />
            )}
          </div>
          {allProducts?.length > 0 ? (
            <div className="tw-bg-neutral-900 tw-w-[100%]">
              <div className="tw-mb-6 tw-mt-[80px] tw-w-full tw-px-3 ">
                <div className="tw-relative">
                  {allWigsCloudinaryImg && (
                    <div className="tw-w-full tw-flex tw-items-center">
                      <PictureSlide images={allWigsCloudinaryImg} />
                    </div>
                  )}
                  <div className="tw-absolute tw-text-white tw-bottom-[10%] md:tw-bottom-[20%] tw-text-center tw-w-full font_cursive tw-text-2xl md:tw-text-6xl tw-z-1">
                    <p className="tw-font-light tw-text-[rgba(215,191,137,0.7)] md:tw-text-[rgba(215,191,137,0.2)]">
                      Your pleasure, our luxury...
                    </p>
                  </div>
                </div>
                <Products
                  sales={salesType}
                  allProducts={allProducts && allProducts}
                />
              </div>
            </div>
          ) : (
            <div className="tw-pt-[50px] tw-flex tw-justify-center">
              <div className="tw-rounded-full progress">
                <div className="inner"></div>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default HomePage;
