import React from "react";
import CtaButton from "./CtaButton";

const ContactForm = ({ textColor }) => {
  const [showWhatsapp, setShowWhatsapp] = React.useState(false);
  return (
    <>
      <p
        className={`tw-relative tw-text-center tw-leading-5 tw-text-xs md:tw-text-sm tw-my-3 tw-mb-5 tw-font-bold tw-w-[100%] tw-mx-auto ${textColor}`}>
        <span className="tw-text-red-800 tw-text-lg">Hey!</span> You got
        questions for modelEst ? <br />
        You can send us a message on whatsapp
      </p>
      <p
        className="tw-text-center tw-font-light tw-text-green-500 tw-w-[100%] tw-mx-auto tw-text-xs tw-mb-2 tw-cursor-pointer"
        onClick={() => setShowWhatsapp(!showWhatsapp)}>
        {showWhatsapp
          ? "Hide whatsapp button"
          : "Chat with us on whatsapp. CLICK ME"}
      </p>
      {showWhatsapp && (
        <div className="tw-mb-3">
          <CtaButton text="Send a message via whatsapp!" whatsapp={true} />
        </div>
      )}
    </>
  );
};

export default ContactForm;
