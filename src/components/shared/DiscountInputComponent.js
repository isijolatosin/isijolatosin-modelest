import React from "react";

const DiscountInputComponent = ({
	discount,
	handleDisount,
	error,
	sales,
	handleApply,
	code,
	generateCode,
}) => {
	return (
		<div>
			{!sales && (
				<div className="tw-pt-5">
					<span className="tw-text-[12px] tw-font-light tw-text-red-700">
						All Our Products Are Currently Not On Sales
					</span>
				</div>
			)}
			<div className="tw-w-full tw-flex tw-items-center">
				<input
					name="discount"
					type="text"
					value={discount}
					onChange={handleDisount}
					placeholder="Discount code"
					className={`${
						error && discount === ""
							? "tw-border-red-700 tw-border-[1px]"
							: "tw-border-neutral-400 tw-border-[1px]"
					} tw-text-sm tw-font-light tw-rounded-md tw-w-[70%] tw-py-2 placeholder:tw-text-xs `}
				/>
				<button
					disabled={!sales}
					className="tw-w-[30%] tw-bg-neutral-900 tw-text-white tw-ml-2 tw-py-[11px] tw-text-xs tw-rounded-md"
					onClick={handleApply}>
					Apply
				</button>
			</div>
			{error && (
				<div className="tw-pb-5 tw-pt-2 ">
					<p className="tw-text-[10px] tw-text-red-700 tw-text-center">
						<span className="tw-font-bold tw-text-xs">
							Discount Code Not Valid!
						</span>
						<br />
						<span className="tw-text-neutral-700 tw-font-light tw-tracking-wider">
							Please generate a new code
						</span>
					</p>
					<div className="tw-text-[10px] tw-w-full tw-mx-auto tw-flex tw-items-center tw-justify-center tw-mt-3">
						<button
							disabled={code}
							onClick={generateCode}
							className="tw-bg-neutral-900 tw-text-white tw-p-2 tw-rounded-md hover:md:tw-bg-white hover:md:tw-text-neutral-900 tw-ease-in tw-duration-300">
							Generate code
						</button>
					</div>
					<div>
						<p className="yellow tw-text-neutral-400 tw-font-bold tw-text-xs tw-w-full tw-text-center tw-mt-4">
							{code}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default DiscountInputComponent;
