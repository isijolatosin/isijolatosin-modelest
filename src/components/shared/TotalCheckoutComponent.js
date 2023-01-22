import React from "react";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const TotalCheckoutComponent = ({
	error,
	showLoad,
	discountPrice,
	total,
	setShowInfo,
	showInfo,
}) => {
	return (
		<div className="tw-relative">
			<div
				className={`${
					error ? "tw-border-t-[1px]" : "tw-border-t-0"
				} tw-border-b-[1px] tw-border-[#b59248] tw-py-5 tw-text-neutral-700 tw-text-[12px] tw-font-light`}>
				<div className="tw-flex tw-items-center tw-justify-between">
					<span>Subtotal</span>
					{showLoad ? (
						<div className="circular-loader-small"></div>
					) : (
						<span>${discountPrice ? discountPrice : total}</span>
					)}
				</div>
				<div className="tw-flex tw-items-center tw-justify-between ">
					<div className="tw-relative tw-flex tw-items-center">
						<span>Shipping</span>
						<BsFillQuestionCircleFill
							size={17}
							onMouseOver={() => setShowInfo(true)}
							onMouseLeave={() => setShowInfo(false)}
							className="tw-text-neutral-700 tw-mx-1 hover:tw-cursor-pointer"
						/>
						{showInfo && (
							<div className="tw-absolute tw-w-[170px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-50px] tw-left-[74px] tw-font-light tw-flex tw-items-top">
								<span className="tw-text-left">
									Review shipping policy in help tab
								</span>
							</div>
						)}
					</div>
					<span>Calculated at next step</span>
				</div>
			</div>
			<div className="tw-flex tw-items-center tw-justify-between tw-font-light tw-pt-5">
				<span className="tw-text-[16px]">Total</span>
				<div className="tw-flex tw-items-center">
					<span className="tw-text-[12px] tw-mr-2 tw-text-neutral-700">
						USD
					</span>
					{showLoad ? (
						<div className="circular-loader-small"></div>
					) : (
						<span className="tw-text-[20px]">
							${discountPrice ? discountPrice : total}
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default TotalCheckoutComponent;
