import axios from "axios";
import React from "react";
import Button from "./shared/Button";
import inputData from "../inputList.json";

const InventoryUpdateForm = ({ singleProduct, setSingleProduct }) => {
	const [postError, setPostError] = React.useState("");

	const handleInputUpdate = (e) => {
		setSingleProduct({
			...singleProduct,
			[e.target.name]:
				e.target.value === "on"
					? true
					: e.target.name === "salespercent"
					? +e.target.value
					: e.target.value,
		});
	};

	async function updateSingleProduct(e) {
		e.preventDefault();
		const id = singleProduct?.id;
		try {
			const product = {
				name: singleProduct.name,
				brand: singleProduct.brand,
				density: singleProduct.density,
				texture: singleProduct.texture,
				capsize: singleProduct.capsize,
				type: singleProduct.type,
				color: singleProduct.color,
				availablecolor: singleProduct.availablecolor,
				price: singleProduct.priceObj,
				video: singleProduct.video,
				length: singleProduct.length,
				availablelength: singleProduct.availablelength,
				dealLength: singleProduct.dealLength,
				description: singleProduct.description,
				instock: singleProduct.instock,
				salespercent: singleProduct.salespercent,
			};
			if (
				[
					product.name,
					product.brand,
					product.type,
					product.color,
					product.length,
					product.description,
				].includes("" || null)
			) {
				return setPostError("Missing Credentials");
			}
			await axios.patch(
				`${process.env.REACT_APP_BASE_ROUTE}/products/${id}`,
				product
			);
			setPostError("");
		} catch (error) {
			setPostError(error.message ? "Please check your input fields" : "");
			console.log(error);
		}
		setSingleProduct({});
		window.location.reload();
	}

	return (
		<div className="tw-w-[100%]">
			<span className=" tw-text-xl tw-text-neutral-800 tw-flex tw-flex-col tw-items-center tw-mt-10">
				Edit Product
			</span>
			<span className="tw-text-neutral-500 tw-text-xs tw-flex tw-flex-col tw-items-center tw-mb-5 tw-mt-2">{`ProductID: ${singleProduct.id}`}</span>
			<span className="tw-flex tw-flex-col tw-items-center tw-mb-5 tw-mt-2 tw-capitalize tw-text-xs tw-text-red-800">
				Please ensure to edit all field for better performance
			</span>
			<form onSubmit={updateSingleProduct}>
				<div className="tw-flex tw-flex-col tw-items-center">
					<div className="lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-2">
						{inputData.map((data) => (
							<input
								key={data.id}
								type={data.type}
								name={singleProduct[data.name]}
								id={data.id}
								value={singleProduct[data.name]}
								onChange={handleInputUpdate}
								placeholder={data.placeholder}
								className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
						))}
					</div>
					<textarea
						value={singleProduct?.description}
						name="description"
						onChange={handleInputUpdate}
						rows={5}
						cols={50}
						placeholder="Description..."
						className="tw-rounded tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
					/>
					<div className="tw-flex tw-items-center tw-justify-between lg:tw-w-[40%] tw-mx-auto tw-w-[90%]">
						<div className="tw-rounded tw-flex tw-justify-center tw-items-center tw-flex-row tw-shadow-xl tw-pl-2 tw-bg-white tw-w-[300px]">
							<label className="tw-w-[60%] tw-text-xs tw-text-neutral-400 tw-font-thin">
								Sales Percent
							</label>
							<input
								id="salespercent"
								name="salespercent"
								type="number"
								onChange={handleInputUpdate}
								placeholder="%"
								value={singleProduct?.salespercent || 0}
								className="tw-w-[40%] tw-text-xs tw-text-neutral-400 tw-h-full tw-bg-neutral-200 tw-border-none focus:tw-ring-0 tw-border-0 placeholder:tw-text-neutral-400 placeholder:tw-text-xs placeholder:tw-font-light"
							/>
						</div>
						<div className="tw-rounded tw-flex tw-flex-row tw-items-center tw-shadow-xl tw-p-2">
							<label className="tw-mr-3 tw-text-xs tw-text-neutral-400 tw-font-thin">
								Instock
							</label>
							<input
								type="checkbox"
								name="instock"
								checked={singleProduct.instock}
								className={
									singleProduct.instock
										? "tw-ml-2 tw-rounded-full tw-bg-violet-400"
										: "tw-ml-2 tw-rounded-full tw-bg-none tw-border-violet-200"
								}
								onChange={handleInputUpdate}
							/>
						</div>
					</div>
					{postError && (
						<span className="tw-text-xs tw-text-red-700">{`Error: ${postError}`}</span>
					)}
					<div className="tw-my-10">
						<Button type="submit">Update Inventory</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default InventoryUpdateForm;
