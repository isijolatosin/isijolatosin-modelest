import React from "react";
import { SiWhatsapp } from "react-icons/si";

const CtaButton = (props) => {
	return (
		<a
			href={`https://wa.me/${process.env.REACT_APP_MODELNO}`}
			target="_blank"
			rel="noopener noreferrer"
			className="tw-flex tw-flex-row tw-mx-auto tw-items-center tw-justify-center tw-text-white tw-bg-green-500 tw-rounded-lg tw-py-[4px] tw-font-light tw-text-sm tw-w-[60%]">
			{props?.text && <span className="tw-mr-2">{props?.text}</span>}
			<SiWhatsapp size={25} />
		</a>
	);
};

export default CtaButton;
