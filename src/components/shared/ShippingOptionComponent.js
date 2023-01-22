import React from "react";
import { MdOutlineLocalShipping } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";

const ShippingOptionComponent = ({ handleShipMethod, warn }) => {
	return (
		<div className="tw-bg-white tw-rounded-lg tw-mb-5">
			<div className="tw-py-3 tw-px-5 tw-flex tw-items-center tw-border-b-[1px] tw-border-neutral-300">
				<label className="radio-container tw-mr-2 tw-mt-[-10px]">
					<input
						onClick={(e) => handleShipMethod("ship", e.target.checked)}
						type="radio"
						name="radio"
						// checked
					/>
					<span
						className={`checkmark-radio ${
							warn && "tw-border-red-500 tw-border-[1px]"
						}`}></span>
				</label>

				<div
					className={`tw-flex tw-items-center ${
						warn ? "tw-text-red-500" : "tw-text-[#bba371]"
					}`}>
					<MdOutlineLocalShipping size={25} />
					<span className="tw-text-[16px] tw-m-3">Ship</span>
				</div>
			</div>
			<div className="tw-py-3 tw-px-5 tw-flex tw-items-center">
				<label className="radio-container tw-mr-2 tw-mt-[-10px]">
					<input
						onClick={(e) => handleShipMethod("pick up", e.target.checked)}
						type="radio"
						name="radio"
					/>
					<span
						className={`checkmark-radio ${
							warn && "tw-border-red-500 tw-border-[1px]"
						}`}></span>
				</label>
				<div
					className={`tw-flex tw-items-center ${
						warn ? "tw-text-red-500" : "tw-text-[#bba371]"
					}`}>
					<SiHomeassistantcommunitystore size={20} />
					<span className="tw-text-[16px] tw-m-3">Pick up</span>
				</div>
			</div>
		</div>
	);
};

export default ShippingOptionComponent;
