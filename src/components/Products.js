import React from "react";
import Card from "./Card";
import Add2CartPopup from "./shared/Add2CartPopup";
import DealsCard from "./shared/DealsCard";
import ContactForm from "./shared/ContactForm";
import { DEALSOPTIONLENGTHARRAY } from "../constant";
import HomePageSingleModal from "./shared/HomePageSingleModal";

function Products({ allProducts, sales }) {
  const [toggleHeight, setToggleHeight] = React.useState(true);
  const [singleProduct, setSingleproduct] = React.useState(null);
  const [singleCart, setSingleCart] = React.useState(null);
  const scrollToTop = function scrollToTop() {
    window.scrollTo(0, 0);
  };

  return (
    <div className="tw-mt-[20px] md:tw-mt-[10px] tw-relative tw-flex tw-flex-col tw-items-center ">
      <div className="tw-fixed tw-top-0 tw-right-0 md:tw-top-[-100px] md:tw-right-[-20px] tw-z-50">
        <Add2CartPopup
          singleCart={singleCart}
          setSingleCart={setSingleCart}
          setSingleproduct={setSingleproduct}
          quantity="1"
        />
      </div>
      {allProducts ? (
        <div
          className={`tw-grid tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-w-full ${
            !sales && "tw-pt-[8px]"
          } md:tw-w-[100%] tw-gap-3`}>
          {allProducts?.map((product) => {
            return (
              <div
                key={product?._id}
                className="tw-justify-center tw-items-center tw-flex tw-flex-row tw-snap-center">
                <Card
                  sales={sales}
                  key={product?._id}
                  product={product}
                  setSingleproduct={setSingleproduct}
                  scrollToTop={scrollToTop}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="tw-text-neutral-500">Loading data...</div>
      )}
      <DealsCard
        lengthArray={DEALSOPTIONLENGTHARRAY}
        brand="Indian, Virgin, Vietnamese"
      />
      <div className="tw-border-b-[1px] tw-border-neutral-800 tw-w-full md:tw-inline tw-hidden">
        <div className="tw-bg-neutral-900 tw-mt-5 md:tw-w-[50%] tw-w-full tw-mx-auto">
          <ContactForm
            textColor="tw-text-white"
            isCancelBtn={false}
            toggleHeight={toggleHeight}
            setToggleHeight={setToggleHeight}
            isFormBtn={true}
          />
        </div>
      </div>

      {singleProduct && (
        <HomePageSingleModal
          singleProduct={singleProduct}
          setSingleproduct={setSingleproduct}
          sales={sales}
          setSingleCart={setSingleCart}
        />
      )}
    </div>
  );
}

export default Products;
