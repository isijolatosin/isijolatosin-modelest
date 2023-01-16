import React from "react";
import axios from "axios";
import truncate from "../utils/truncate";

function Card({ product, setSingleproducts, scrollToTop, sales }) {
	async function handleViewImage(event) {
		try {
			const {
				data: { products },
			} = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);
			const result = products.filter(
				(product) => product?._id === event.target.id
			);
			setSingleproducts(result);
		} catch (error) {
			console.log(error);
		}
		scrollToTop();
	}

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
							{sales !== 0 && product?.sales ? (
								<>
									<span className="tw-text-neutral-500 tw-line-through">
										${product?.price}.00 USD
									</span>
									<span className="tw-mr-2 tw-font-bold">
										${product?.price - product?.price * (sales / 100)} USD
									</span>
								</>
							) : (
								<span className="tw-font-bold">${product?.price}.00 USD</span>
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
