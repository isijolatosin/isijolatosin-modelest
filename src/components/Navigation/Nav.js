import React from "react";
// import { getDatabase, ref, onValue } from "firebase/database";
import ImageComponent from "./ImageComponent";
import LinksComponent from "./LinksComponent";
import NavIcons from "./NavIcons";

function Nav({
  setShowContactForm,
  setShowTerms,
  setShowShippingReturns,
  setPrivacyReturns,
  showContactForm,
}) {
  return (
    <div>
      <div className="tw-flex tw-h-[60px] tw-w-[95%] lg:tw-w-[100%] xl:tw-w-[85%] 2xl:tw-w-[80%] tw-grow tw-flex-row tw-items-center tw-justify-between tw-my-0 tw-mx-auto">
        <div className="tw-flex-[0.4] md:tw-flex-[0.2]">
          <ImageComponent />
        </div>
        <div className="tw-hidden tw-flex-[0.6] md:tw-inline">
          <LinksComponent
            setShowContactForm={setShowContactForm}
            setShowTerms={setShowTerms}
            setShowShippingReturns={setShowShippingReturns}
            setPrivacyReturns={setPrivacyReturns}
            showContactForm={showContactForm}
          />
        </div>
        <div className="tw-flex-[0.4] md:tw-flex-[0.2]">
          <NavIcons />
        </div>
      </div>
      <div className="tw-in-line tw-px-3 md:tw-hidden tw-flex-0.8 tw-bg-[rgba(59,59,59,0.2)] tw-drop-shadow-lg tw tw-py-2 tw-text-white">
        <LinksComponent
          setShowContactForm={setShowContactForm}
          setShowTerms={setShowTerms}
          setShowShippingReturns={setShowShippingReturns}
          setPrivacyReturns={setPrivacyReturns}
        />
      </div>
    </div>
  );
}

export default Nav;
