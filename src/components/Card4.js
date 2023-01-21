import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../slices/appSlices";
import { isInCart } from "../utils/helpers";
import { addToCart } from "../utils/putToCartFunc";

function Card({
	product,
	setSingleproduct,
	setSingleCart,
	scrollToTop,
	sales,
}) {
	const cartItems = useSelector(selectCartItems);
	const [error, setError] = React.useState(false);
	const [length, setLength] = React.useState(0);
	const [color, setColor] = React.useState("");
	const dispatch = useDispatch();
	const lengthArr = product.availablelength?.split(",");
	const colorArr = product?.availablecolor?.split(", ");

	async function handleViewImage(event) {
		try {
			const {
				data: { products },
			} = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);
			const result = products.filter(
				(product) => product._id === event.target.id
			);
			setSingleproduct(result);
		} catch (error) {
			console.log(error);
		}
		scrollToTop();
	}

	// Adding to cart items
	const { name, _id, images, description } = product;
	const price = product?.price[length];
	const image = images[0];
	const hairLength = length;
	const hairColor = color;

	const singleProduct = {
		name,
		id: _id,
		image,
		price,
		hairLength,
		hairColor,
		description,
	};

	const handleAdd = (increase) => {
		if (price && length && color) {
			addToCart(
				price,
				length,
				dispatch,
				singleProduct,
				setSingleCart,
				setError,
				increase && increase
			);
			setError(false);
		} else {
			setError(true);
		}
	};

	return (
		<div className="tw-w-[100%] tw-h-[300px] lg:tw-h-[400px] tw-mb-2 md:tw-mx-1 md:tw-w-[300px] tw-shadow-lg tw-relative tw-rounded-sm">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product.images[0]}
				alt={product._id}
				className="tw-w-full tw-h-[70%] lg:tw-h-[75%] tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
			/>
			{product?.sales && sales !== 0 && (
				<span className="tw-absolute tw-top-0 tw-left-0 tw-bg-gray-600 tw-text-white tw-rounded-tl-sm tw-rounded-br-sm tw-text-xs tw-p-[2px] tw-font-light">
					on sales
				</span>
			)}
			<div className="tw-bg-white tw-text-neutral-800 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-[10px]">
				<div className="tw-pt-2  tw-px-2 tw-flex tw-justify-between tw-w-full tw-text-[14px] tw-border-b-[1px] tw-border-neutral-300 tw-mb-2">
					<p className="tw-font-bold tw-text-xs md:tw-text-[14px]">
						{product.name}
					</p>
					<div className="tw-pb-1 tw-flex tw-flex-col">
						<span className="tw-font-semibold tw-text-xs md:tw-text-[14px]">
							${price ? price : "***"} USD
						</span>
					</div>
				</div>
				<div className=" tw-px-2 tw-flex tw-flex-row tw-items-center tw-border-b-[1px] tw-border-neutral-300 tw-pb-2 tw-my-2">
					{lengthArr.map((len, idx) => (
						<div
							onClick={() => setLength(+len)}
							key={idx}
							className={`md:tw-cursor-pointer md:hover:tw-bg-neutral-800 md:hover:tw-text-white tw-duration-300 tw-ease-in tw-w-[30px] tw-mr-3 tw-h-[30px] tw-flex tw-items-center tw-justify-center tw-border-[1px] ${
								length === +len
									? "tw-bg-neutral-800 tw-text-white"
									: "tw-border-neutral-400 tw-text-neutral-600"
							} tw-text-[12px] md:tw-text-sm tw-rounded-full`}>
							<span>{len}</span>
						</div>
					))}
				</div>
				<div className=" tw-px-2 tw-flex tw-flex-row tw-items-center tw-w-[100%] tw-my-2 tw-border-b-[1px] tw-border-neutral-300 tw-pb-2">
					{colorArr.map((col, idx) => (
						<div
							onClick={() => {
								setColor(col);
								setError(false);
							}}
							key={idx}
							className={`tw-duration-300 tw-ease-in md:hover:tw-bg-neutral-800 md:hover:tw-text-white tw-cursor-pointer tw-px-2 md:tw-px-5 tw-py-1 tw-text-[10px] md:tw-text-xs tw-mr-3 tw-flex tw-items-center tw-justify-center tw-rounded-full  ${
								color === col
									? "tw-bg-neutral-800 tw-text-white"
									: "tw-bg-neutral-300 tw-text-neutral-800"
							}`}>
							<span>{col}</span>
						</div>
					))}
				</div>
				{isInCart(singleProduct, cartItems) ? (
					<div
						className=" tw-mx-2 tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-full tw-bg-neutral-900 tw-px-3 tw-py-[5px] tw-items-center tw-justify-center tw-max-w-[70%] tw-text-neutral-50 hover:tw-cursor-pointer hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mb-2 hover:md:tw-text-neutral-900 hover:md:tw-bg-white "
						onClick={cartItems.length !== 0 ? () => handleAdd(true) : null}>
						<div className="tw-flex tw-flex-row tw-items-center">
							<span className="tw-mr-3">Add More</span>
						</div>
					</div>
				) : (
					<div
						className=" tw-mx-2 tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-full tw-bg-neutral-900 tw-px-3 tw-py-[5px] tw-items-center tw-justify-center tw-max-w-[70%] tw-text-neutral-50 hover:tw-cursor-pointer hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mb-2 hover:md:tw-text-neutral-900 hover:md:tw-bg-white "
						onClick={handleAdd}>
						<div className="tw-flex tw-flex-row tw-items-center">
							<span className="tw-mr-3">Add to cart</span>
						</div>
					</div>
				)}
				{error && (
					<div className="tw-bg-red-800 tw- tw-w-[100%] tw-rounded-b-[9px]">
						<p className="tw-text-center tw-text-white tw-text-xs">
							Please provide length and color
						</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default Card;
