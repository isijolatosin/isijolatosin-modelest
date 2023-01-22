import React from "react";
import Heading from "../Heading";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const BillingInformationComponent = ({
	userName,
	phone,
	userPostalAddress,
	orderNo,
	discountPrice,
	total,
	setShowInfo,
	showInfo,
	shipPrice,
	taxPrice,
}) => {
	return (
		<div className="tw-p-3 tw-text-xs tw-font-light tw-border-t-[1px] tw-border-b-[1px] tw-border-[#b59248] tw-mt-3">
			<div className=" tw-border-b-[1px] tw-border-[#b59248] tw-pb-3">
				<div className="tw-w-[65%] tw-capitalize">
					<Heading
						children="Billing Address"
						isLight={true}
						size1={true}
						isBold={true}
					/>
					<p>
						{userName} - {phone}
					</p>
					<p>{userPostalAddress}</p>
				</div>
			</div>
			<div className="tw-py-3">
				<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
					<p>Order Number:</p>
					<p>{orderNo}</p>
				</div>
				<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
					<p>Subtotal:</p>
					<p>USD ${discountPrice ? discountPrice : total}</p>
				</div>
				<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
					<div className="tw-flex tw-items-center tw-relative">
						<p>Shipping fee</p>
						<BsFillQuestionCircleFill
							size={15}
							onMouseOver={() => setShowInfo(true)}
							onMouseLeave={() => setShowInfo(false)}
							className="tw-text-neutral-700 tw-mx-1 hover:tw-cursor-pointer"
						/>
						{showInfo && (
							<div className="tw-absolute tw-w-[170px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-45px] tw-left-[84px]">
								<span>Check shipping policy in help tab</span>
							</div>
						)}
					</div>
					<p>{shipPrice}</p>
				</div>
				<div className="tw-flex tw-justify-between tw-items-center tw-mb-2">
					<p>Taxes included:</p>
					<p>USD ${taxPrice}</p>
				</div>
				<div className="tw-flex tw-justify-between tw-items-center">
					<p>Discount:</p>
					<p>USD ${discountPrice ? total - discountPrice : "0.00"}</p>
				</div>
			</div>
		</div>
	);
};

export default BillingInformationComponent;
