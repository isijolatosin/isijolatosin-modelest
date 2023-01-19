import React from "react";
import { RiSendPlaneFill } from "react-icons/ri";

const FilterComponent = React.memo(
	({
		handleOnChange,
		optionFilter,
		filterOption,
		handleFormSubmit,
		handleOnChangePrice,
		priceRangeFilter,
		handleReset,
	}) => {
		return (
			<div className=" tw-flex tw-items-top tw-text-neutral-400">
				<div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center">
					<div className="tw-flex tw-flex-row tw-items-center tw-mb-1 md:tw-mb-0">
						<span className="tw-tracking-wider tw-font-light tw-text-sm tw-mr-2">
							By Price:
						</span>
						<select
							className="tw-bg-transparent tw-w-[190px] tw-max-w-[220px] tw-block tw-mr-5 tw-pl-2 md:tw-px-2 tw-py-1 tw-border-[1px] tw-border-[#bba371] tw-rounded-[3px] tw-text-white tw-text-sm tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-none focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0"
							onChange={handleOnChange}
							id="from - to"
							value={optionFilter}
							name="from - to">
							{filterOption.map((option, idx) => (
								<option key={idx}>{option}</option>
							))}
						</select>
					</div>
					<div className="tw-flex tw-flex-row tw-items-center tw-mt-3 md:tw-mt-0">
						<span className="tw-tracking-wider tw-font-light tw-text-sm tw-mr-2">
							By Range:
						</span>
						<form
							onSubmit={handleFormSubmit}
							className="tw-flex tw-flex-row tw-items-center">
							<input
								className="tw-bg-transparent tw-w-[75px] tw-max-w-[110px] tw-block tw-mr-1 md:tw-px-2 tw-py-1 tw-border-[1px] tw-border-[#bba371] tw-rounded-[3px] tw-text-white tw-text-sm tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-none focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0 placeholder:tw-text-white placeholder:tw-mr-2"
								type="number"
								onChange={handleOnChangePrice}
								id="min"
								value={priceRangeFilter?.min}
								name="min"
								placeholder="Min"
							/>
							<input
								className="tw-bg-transparent tw-w-[75px] tw-max-w-[100px] tw-block tw-mr-5 md:tw-px-2 tw-py-1 tw-border-[1px] tw-border-[#bba371] tw-rounded-[3px] tw-text-white tw-text-sm tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-none focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0 placeholder:tw-text-white placeholder:tw-mr-2"
								type="number"
								onChange={handleOnChangePrice}
								id="max"
								value={priceRangeFilter?.max}
								name="max"
								placeholder="Max"
							/>
							<button
								type="submit"
								className="tw-border-[1px] tw-border-[#bba371] tw-p-1 tw-rounded-full tw-text-[#bba371] tw-text-xl hover:md:tw-border-neutral-700 tw-ease-in tw-duration-300">
								<RiSendPlaneFill />
							</button>
							<button
								className="tw-ml-10 tw-text-xs tw-text-[#bba371] hover:md:tw-text-neutral-600 tw-ease-in tw-duration-300"
								onClick={handleReset}>
								<p>Reset All</p>
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
);

export default FilterComponent;
