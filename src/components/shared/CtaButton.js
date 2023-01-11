import React from "react";
import { SiWhatsapp } from "react-icons/si";

const CtaButton = (props) => {
	return (
		<a
			href={`https://wa.me/${process.env.REACT_APP_MODELNO}`}
			target="_blank"
			rel="noopener noreferrer"
			className="tw-flex tw-flex-row tw-mx-auto tw-items-center tw-justify-center tw-text-white tw-bg-green-500 tw-rounded-lg tw-py-[4px] tw-px-1 tw-mt-1 tw-font-light tw-text-sm md:tw-max-w-[70%] lg:tw-max-w-[50%]">
			{props?.text && <span>{props?.text}</span>}
			<SiWhatsapp
				size={20}
				className={`${!window.navigator.userAgentData.mobile ? "tw-ml-2" : ""}`}
			/>
		</a>
	);
};

export default CtaButton;
