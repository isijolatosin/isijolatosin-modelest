import React from "react";
import Button from "./shared/Button";
import PriceInput from "./shared/PriceInput";
import { AiFillStar } from "react-icons/ai";

const InventoryForm = ({
	handleSubmit,
	inputTypes,
	handleformDataChange,
	formData,
	setSalesPercent,
	salesPercent,
	isInstock,
	toggleInstock,
	toggleIsFeatured,
	isFeatured,
	postError,
	buttonText,
	uploadMultipleFile,
	categories,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<div className="tw-flex tw-flex-col tw-items-center tw-w-[100%] tw-mx-auto">
				<div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-3 tw-ml-3 md:tw-ml-0 ">
					{categories?.map((category) => (
						<div
							key={category?.id}
							className="tw-bg-violet-50 tw-rounded-md tw-px-5 tw-py-2 tw-mr-3 tw-mb-2">
							<p className="tw-text-violet-700 tw-text-xs">{category?.name}</p>
							<p className="tw-text-violet-400 tw-font-thin tw-text-xs">
								{category?.id}
							</p>
						</div>
					))}
				</div>
				<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-2 tw-w-[90%] lg:tw-w-[80%] xl:tw-w-[60%] 2xl:tw-w-[50%]">
					{inputTypes.map((inputType) => (
						<div key={inputType.id} className="tw-relative">
							<input
								type={inputType.type}
								name={inputType.name}
								id={inputType.id}
								value={inputType.value}
								onChange={handleformDataChange}
								placeholder={inputType.placeholder}
								className="tw-rounded tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							{inputType.isRequired && (
								<AiFillStar className="tw-absolute tw-left-2 tw-top-2 tw-text-red-800 tw-text-[8px]" />
							)}
						</div>
					))}
					<div className="tw-rounded tw-flex tw-flex-row tw-items-center tw-shadow-xl tw-mb-5 tw-mt-1 tw-pl-3 tw-bg-white">
						<label className="tw-flex-[0.3] tw-text-xs tw-text-neutral-400 tw-font-thin">
							Multiple Image
						</label>
						<input
							type="file"
							multiple
							onChange={uploadMultipleFile}
							className="tw-block tw-flex-[0.7] tw-text-sm tw-text-gray-500 file:tw-mr-4 file:tw-py-1 file:tw-px-4 file:tw-rounded file:tw-border-0 file:tw-text-sm file:tw-bg-gray-200 file:tw-text-violet-700 hover:file:tw-bg-violet-100 tw-ease-in tw-duration-300"
						/>
					</div>
				</div>
				<PriceInput />
				<div className="tw-flex tw-flex-col tw-w-[90%] lg:tw-w-[80%] xl:tw-w-[60%] 2xl:tw-w-[50%]">
					<textarea
						value={formData?.description}
						name="description"
						onChange={handleformDataChange}
						rows={5}
						cols={50}
						placeholder="Description..."
						className="tw-rounded tw-mt-1 tw-block tw-mx-auto tw-w-full tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-1 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light tw-flex-[0.7]"
					/>
					<div className="tw-flex-[0.3] tw-grid tw-grid-cols-3 tw-gap-2 tw-mb-5">
						<div className="tw-rounded tw-flex tw-justify-center tw-items-center tw-flex-row tw-shadow-xl tw-pl-2 tw-bg-white">
							<label className="tw-w-[60%] tw-text-xs tw-text-neutral-400 tw-font-thin">
								Sales Percent
							</label>
							<input
								id="sales percent"
								name="sales percent"
								type="number"
								placeholder="%"
								value={salesPercent}
								className="tw-w-[40%] tw-h-full tw-bg-neutral-200 tw-border-none focus:tw-ring-0 tw-border-0 placeholder:tw-text-neutral-400 placeholder:tw-text-xs placeholder:tw-font-light"
								onChange={(e) =>
									+e.target.value > 0
										? setSalesPercent(+e.target.value)
										: setSalesPercent(false)
								}
							/>
						</div>
						<div className="tw-rounded tw-flex tw-justify-center tw-items-center tw-flex-row tw-shadow-xl tw-p-2 tw-bg-white">
							<label className="tw-mr-3 tw-text-xs tw-text-neutral-400 tw-font-thin">
								Instock
							</label>
							<input
								type="checkbox"
								checked={isInstock}
								className={`${
									isInstock
										? "tw-ml-2 tw-rounded-full tw-bg-violet-400 "
										: "tw-ml-2 tw-rounded-full tw-bg-neutral-300 tw-border-none}"
								} focus:tw-ring-0 tw-border-0`}
								onChange={toggleInstock}
							/>
						</div>
						<div className="tw-rounded tw-flex tw-justify-center tw-items-center tw-flex-row tw-shadow-xl tw-p-2 tw-bg-white">
							<label className="tw-mr-3 tw-text-xs tw-text-neutral-400 tw-font-thin">
								Featured
							</label>
							<input
								type="checkbox"
								checked={isFeatured}
								className={`${
									isFeatured
										? "tw-ml-2 tw-rounded-full tw-bg-violet-400 "
										: "tw-ml-2 tw-rounded-full tw-bg-neutral-300 tw-border-none}"
								} focus:tw-ring-0 tw-border-0`}
								onChange={toggleIsFeatured}
							/>
						</div>
					</div>
				</div>

				{postError && (
					<span className="tw-text-xs tw-text-red-700 tw-mt-5">{`Error: ${postError}`}</span>
				)}
				<div className="tw-mb-10">
					<Button type="submit">{buttonText}</Button>
				</div>
			</div>
		</form>
	);
};

export default InventoryForm;
