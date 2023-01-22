import React from "react";
import Heading from "../Heading";
import { BsCreditCard } from "react-icons/bs";
import { RiVisaLine } from "react-icons/ri";
import StripeCheckout from "../checkout/stripe-checkout";

const PaymentForm = ({
	warn,
	handlePayMethod,
	paypal,
	mastercard,
	mastercard2,
	americanExpress,
	placeOrder,
	error,
	showPaypalPayment,
	showCardPayment,
	itemCount,
	discountPrice,
	total,
	setRedirect,
	setSucceeded,
	succeeded,
	setPageCancel,
}) => {
	return (
		<div className="tw-bg-white ">
			<div className="tw-mb-10 tw-border-b-[1px] tw-z-40">
				<div className="tw-mt-5 tw-mb-2 tw-flex tw-items-center tw-justify-between tw-p-3 tw-border-b-[1px]">
					<Heading children="Payment Method" isBlack={true} isLight={true} />
					{warn && (
						<span className="tw-text-red-500 tw-ml-5 tw-text-sm tw-mr-2">
							Choose your payment method
						</span>
					)}
				</div>
				<div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between">
					<div className="tw-w-full md:tw-w-[60%] tw-border-b-[1px] md:tw-border-b-0">
						<div className="tw-px-5 tw-flex tw-items-center tw-border-b-[1px]">
							<label className="radio-container tw-mr-2 tw-mt-[-10px]">
								<input
									onClick={(e) => handlePayMethod("paypal", e.target.checked)}
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
									warn ? "tw-text-red-500" : "tw-text-black"
								}`}>
								<img
									src={paypal}
									alt="paypal"
									className="tw-w-[45px] tw-border-[1px] tw-border-neutral-700 tw-p-2 tw-rounded-[3px]"
								/>
								<span className="tw-text-[12px] tw-m-3 tw-font-light tw-tracking-wider">
									Pay with PayPal
								</span>
							</div>
						</div>
						<div className="tw-px-5 tw-flex tw-items-top">
							<label className="radio-container tw-mr-2 tw-mt-[10px]">
								<input
									onClick={(e) => handlePayMethod("card", e.target.checked)}
									type="radio"
									name="radio"
								/>
								<span
									className={`checkmark-radio ${
										warn && "tw-border-red-500 tw-border-[1px]"
									}`}></span>
							</label>
							<div
								className={`tw-flex tw-items-start ${
									warn ? "tw-text-red-500" : "tw-text-black"
								} tw-flex tw-flex-col`}>
								<div className="tw-flex tw-items-center">
									<BsCreditCard size={35} color="black" />
									<span className="tw-text-[12px] tw-m-3 tw-font-light tw-tracking-wider">
										Credit / Debit Card
									</span>
								</div>
								<div className="tw-flex tw-max-w-[95%] tw-mb-1 tw-items-center tw-mx-auto tw-justify-end tw-mr-4 md:tw-mr-6 lg:tw-mr-5 xl:tw-mr-6 tw-mt-[-8px]">
									<img
										src={mastercard}
										alt="mastercard"
										className="tw-w-[30px] tw-p-2 tw-rounded-[3px]"
									/>
									<img
										src={mastercard2}
										alt="mastercard2"
										className="tw-w-[30px] tw-p-2 tw-rounded-[3px]"
									/>
									<RiVisaLine
										size={25}
										className="tw-mr-2 tw-mt-[-2px] tw-text-blue-900"
									/>
									<div className="tw-relative tw-mt-[-2px] tw-flex tw-items-center tw-mr-2">
										<RiVisaLine size={25} className="tw-text-blue-800" />
										<span className="tw-absolute tw-bottom-[1px] tw-right-[1px] tw-text-[5px] tw-italic">
											DEBIT
										</span>
									</div>
									<img
										src={americanExpress}
										alt="americanExpress"
										className="tw-w-[30px]"
									/>
								</div>
							</div>
						</div>
					</div>
					<div
						onClick={placeOrder}
						className="tw-z-40 tw-flex tw-flex-col tw-items-center tw-w-full tw-my-10 md:tw-my-0 md:tw-w-[40%]">
						<button className="tw-bg-neutral-800 tw-text-white tw-text-xs tw-px-5 tw-py-2 hover:md:tw-bg-neutral-100 hover:md:tw-text-neutral-900 tw-ease-in tw-duration-300 tw-w-[80%] md:tw-w-[50%] tw-mx-auto tw-rounded-[30px]">
							PLACE ORDER
						</button>
						{error && (
							<div className="tw-text-neutral-900">
								<p className="tw-text-[10px]">
									Please enter your referral code in order summary! (optional)
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			{(showPaypalPayment || showCardPayment) && (
				<div className="tw-w-full">
					<StripeCheckout
						itemCount={itemCount}
						total={discountPrice ? discountPrice : total}
						setRedirect={setRedirect}
						setSucceeded={setSucceeded}
						succeeded={succeeded}
						setPageCancel={setPageCancel}
						discountPrice={discountPrice}
						showPaypalPayment={showPaypalPayment}
						showCardPayment={showCardPayment}
					/>
				</div>
			)}
		</div>
	);
};

export default PaymentForm;
