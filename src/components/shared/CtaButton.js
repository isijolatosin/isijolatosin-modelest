import React from "react";
import { SiWhatsapp } from "react-icons/si";

const CtaButton = (props) => {
	return (
		<a
			href={`https://wa.me/${process.env.REACT_APP_MODELNO}`}
			target="_blank"
			rel="noopener noreferrer"
			className={`tw-flex tw-flex-row tw-mx-auto tw-items-center tw-justify-center tw-text-white tw-bg-green-500 tw-rounded-lg tw-p-2 tw-font-light tw-text-sm `}>
			{props?.text && <span className="tw-mr-2">{props?.text}</span>}
			<SiWhatsapp size={props?.isIcon ? 25 : 18} />
		</a>
	);
};

export default CtaButton;
