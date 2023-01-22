import React from "react";

const SuccessRedirect = ({ redirect, succeeded, pageCancel }) => {
	return (
		<div
			className={`${
				redirect || succeeded || pageCancel
					? "tw-opacity-1 tw-inline tw-ease-in tw-duration-300"
					: "tw-opacity-0 tw-hidden tw-ease-in tw-duration-300"
			} tw-bg-[rgba(255,255,255,0.9)] tw-flex tw-flex-col tw-items-center tw-justify-center tw-fixed tw-top-[35%] md:tw-top-[15%] tw-z-50 tw-ease-in tw-duration-300 tw-w-[100%] tw-h-[40%] md:tw-w-[70%] md:tw-h-[60%]`}>
			<div className="circular-loader-payment"></div>
			<div>
				<span className="tw-text-green-700 tw-text-md">
					{redirect || succeeded ? (
						<div className="tw-mt-2">
							<span className="tw-text-center">
								<p className="">Transaction Successfull.</p>
								<p className="tw-italic tw-text-[10px] tw-tracking-wide">
									Redirecting...
								</p>
							</span>
						</div>
					) : pageCancel ? (
						<div className="tw-mt-2">
							<span className="tw-text-center">
								<p className="tw-font-bold">Transaction Canceled.</p>
								<p className="tw-italic tw-text-[10px] tw-tracking-wide">
									Redirecting...
								</p>
							</span>
						</div>
					) : (
						""
					)}
				</span>
			</div>
		</div>
	);
};

export default SuccessRedirect;
