import React, { useCallback } from "react";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEditNote } from "react-icons/md";
import useFetchHook from "../utils/useFetchHook";
import { PRODUCT, SINGLE_PRODUCT, CLOSURE } from "../constant";

function InventoryCard({ product, fetchProducts, setSingleProduct }) {
	async function deleteSingleProduct() {
		const id = product._id;
		try {
			await axios.delete(`${process.env.REACT_APP_BASE_ROUTE}/products/${id}`);
		} catch (error) {
			console.log(error);
		}

		fetchProducts();
	}

	const type = SINGLE_PRODUCT;
	const id = product._id;
	const url = `${process.env.REACT_APP_BASE_ROUTE}/${PRODUCT}/${id}`;
	const fetchSingleProductsRes = useFetchHook(url, type);
	const fetchSingle = useCallback(() => {
		return fetchSingleProductsRes;
	}, [fetchSingleProductsRes]);

	async function getSingleProduct() {
		try {
			const product = fetchSingle();
			setSingleProduct({
				id: product._id,
				name: product.name,
				brand: product.brand,
				density: product.density,
				texture: product.texture,
				capsize: product.capsize,
				priceObj: product.price,
				price:
					product.price[+product.length] ||
					product.price[+product.length.split(", ")[0]],
				video: product.video,
				description: product.description,
				instock: product.instock,
				type: product.type,
				color: product.color,
				availablecolor: product.availablecolor,
				dealLength: product.dealLength,
				length: product.length,
				availablelength: product.availablelength,
				salespercent: product.salespercent,
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="tw-flex tw-flex-row tw-bg-neutral-100 tw-p-3">
			<div className="tw-mr-1 tw-w-[20%]">
				<img
					alt=""
					loading="lazy"
					src={product.images[0]}
					className="tw-w-[100px] tw-h-[100px] tw-object-cover tw-rounded tw-mr-5"
				/>
			</div>
			<div className="tw-flex tw-flex-row tw-w-[80%]">
				<div className="tw-flex tw-flex-col tw-mr-5 tw-text-xs tw-font-light tw-w-[85%]">
					<div className="tw-relative">
						<span className="tw-w-[100%]">{`Name: ${product.name}`}</span>
						{product.with ? (
							<span className="tw-absolute tw-bg-red-700 tw-top-[-5px] tw-right-[-15px] tw-w-[20px] tw-h-[20px] tw-font-bold tw-justify-center tw-flex tw-items-center tw-text-xs tw-text-white tw-rounded-full">
								{product.with.toLowerCase() === CLOSURE ? "C" : "F"}
							</span>
						) : (
							<></>
						)}
					</div>
					<span className="tw-w-[100%]">{`Color: ${product.color}`}</span>
					<span className="tw-w-[100%]">{`Brand: ${product.brand}`}</span>
					{product?.availablecolor && (
						<span className="tw-w-[100%]">{`Available Color: ${product.availablecolor}`}</span>
					)}
					<span className="tw-w-[100%]">{`Price: $${
						product?.price[product?.length] ||
						product?.price[product?.length?.split(", ")[0]]
					}`}</span>
					<span className="tw-w-[100%]">{`Length: ${product.length}"`}</span>
					{product.availablelength && (
						<span className="tw-w-[100%]">{`Available Length: ${product.availablelength}"`}</span>
					)}
					{product.dealLength && (
						<span className="tw-w-[100%]">{`Deal length: ${product.dealLength}`}</span>
					)}
					<span className="tw-text-red-800">
						{product.salespercent && `${product.salespercent}% onsale`}
					</span>
				</div>
				<div className="tw-flex tw-flex-col tw-justify-between tw-w-[15%] tw-border-l tw-border-neutral-300 tw-pl-[10px] lg:tw-pl-2 xl:tw-pl-[2px]">
					<MdDeleteOutline
						onClick={deleteSingleProduct}
						size={30}
						className="tw-p-[4px] tw-text-neutral-800 hover:tw-text-neutral-300 hover:tw-cursor-pointer hover:tw-border-red-800 hover:tw-border hover:tw-rounded-full tw-ease-in tw-duration-300 tw-mb-3"
					/>
					<MdOutlineEditNote
						onClick={getSingleProduct}
						size={30}
						className="tw-p-[4px] tw-text-neutral-800 hover:tw-text-neutral-300 hover:tw-cursor-pointer hover:tw-border-neutral-800 hover:tw-border hover:tw-rounded-full tw-ease-in tw-duration-300"
					/>
				</div>
			</div>
		</div>
	);
}

export default InventoryCard;
