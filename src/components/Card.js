import React from "react";
import truncate from "../utils/truncate";
import { useGlobalContext } from "../context/useContextHook";
import { roundTo2Dec } from "../utils/roundTo2Dec";

function Card({ product, setSingleproduct, scrollToTop }) {
	const { fetchProducts } = useGlobalContext();

	async function handleViewImage(event) {
		try {
			const result = fetchProducts().filter(
				(product) => product?._id === event.target.id
			);
			setSingleproduct(result);
		} catch (error) {
			console.log(error);
		}
		scrollToTop();
	}

	const _price =
		product?.price[10] ||
		product?.price[14] ||
		product?.price[16] ||
		product?.price[18] ||
		product?.price[20] ||
		product?.price[22] ||
		product?.price[24] ||
		product?.price[26] ||
		product?.price[28] ||
		product?.price[30];

	const price = product?.salespercent
		? roundTo2Dec(_price - _price * (product?.salespercent / 100))
		: _price;

	return (
		<div className="tw-h-[300px] tw-w-[250px] md:tw-w-[300px] tw-shadow-lg md:tw-h-[350px] tw-relative tw-rounded-lg">
			<img
				onClick={handleViewImage}
				id={product?._id}
				src={product?.images?.[0]}
				alt={product?._id}
				className=" tw-w-full tw-h-[70%] tw-object-cover hover:tw-cursor-pointer tw-rounded-t-lg"
			/>
			<div className="tw-absolute tw-top-0 tw-text-center tw-rounded-t-lg tw-bg-neutral-900 tw-text-[#bba371] tw-font-bold tw-w-full tw-text-[9px] tw-uppercase tw-tracking-widest tw-border-[1px] tw-border-b-0 tw-border-neutral-600">
				<span>Raw {product?.brand}</span>
			</div>
			<div className="tw-bg-white tw-h-[30%] tw-text-neutral-800 tw-px-2 tw-w-full tw-rounded-b-lg">
				<div className="tw-relative tw-flex tw-flex-row tw-justify-between">
					<div className="tw-pt-2 tw-w-full">
						<p className="tw-text-[14px] tw-font-bold">{product?.name}</p>
						<div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center  tw-text-neutral-900 tw-py-1 tw-text-xs">
							<span className="tw-font-bold">
								<span className="tw-text-[10px] tw-font-light">From</span> $
								{price} USD
							</span>
							{+product?.salespercent > 0 && (
								<span className="tw-top-0 tw-right-0 tw-text-[9px] tw-bg-red-700 tw-text-white tw-px-3 tw-rounded-full tw-pt-[1px]">
									Discounted!
								</span>
							)}
						</div>
						<p className="tw-pt-2 tw-border-t-[1px] tw-border-neutral-700 tw-text-[10px] tw-text-neutral-900 tw-mb-3 tw-leading-none">
							{truncate(product?.description, 10)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Card;
