import React from "react";
import { CgClose } from "react-icons/cg";
import { isInCart } from "../../utils/helpers";
import Slideshow from "../../utils/Slideshow";
import Heading from "../Heading";
import PaymentOptions from "./PaymentOptions";
import Rating from "./Rating";
import { addToCart } from "../../utils/putToCartFunc";
import { useDispatch } from "react-redux";
import { CLOSURE, FRONTAL } from "../../constant";
import { returnObjectProperty } from "../../utils/returnObjectProperty";
import { roundTo2Dec } from "../../utils/roundTo2Dec";

const SingleProductModal = ({
	price: _price,
	singleProduct,
	setSingleproduct,
	setSingleCart,
	desc,
	// avesizes,
	setLength,
	setError,
	error,
	_singleProduct,
	cartItems,
	length,
	// color,
}) => {
	const { name, color, description, avesizes, salespercent } =
		returnObjectProperty(singleProduct?.[0]);
	const price = +salespercent
		? roundTo2Dec(_price - _price * (salespercent / 100))
		: _price;
	const dispatch = useDispatch();
	const handleAdd = (increase) => {
		if (price && length && color) {
			addToCart(
				price,
				length,
				dispatch,
				_singleProduct,
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
		<div>
			{singleProduct && (
				<div className="single tw-fixed tw-z-40 tw-overflow-scroll tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-[0px] md:tw-pt-16 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white">
					<div className="md:tw-w-[95%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
						<div className="tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
							<Slideshow images={singleProduct?.[0].images} iconSize={25} />
							<div className="tw-w-[90%] tw-mx-auto">
								<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
									{name}
								</p>
								<div className="tw-flex tw-items-center tw-mb-5">
									<span className="tw-mr-2">Review: </span>
									<Rating isNum={true} />
								</div>
								<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
									Description: {description}
								</p>
							</div>
							<div className="tw-flex tw-flex-col tw-mb-2 tw-border-y-[1px] tw-py-3 tw-w-[90%] tw-mx-auto">
								<div className="tw-flex tw-flex-wrap tw-gap-2">
									{avesizes?.map((item, idx) => (
										<div
											key={idx}
											onClick={() => {
												setLength(item);
												setError(false);
											}}
											className={` tw-flex tw-flex-wrap tw-mr-2 tw-p-2 tw-px-3 tw-border-[1px] tw-border-neutral-900 tw-rounded-full tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300 ${
												item &&
												length &&
												item === length &&
												"tw-bg-neutral-900 tw-text-white"
											}`}>
											<span>{item}</span>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900">
							<div className="tw-flex tw-flex-col">
								<div className="tw-flex tw-items-start tw-w-[70%] lg:tw-w-[45%] tw-mb-[10px]">
									<p className="tw-font-medium tw-text-xl tw-my-[10px]">
										Price: ${price ? price : " ***"}{" "}
										<span className="tw-text-[12px] tw-font-light">USD</span>
									</p>
									{salespercent > 0 && (
										<span className="tw-ml-5 tw-text-[9px] tw-mt-1 tw-bg-red-700 tw-text-white tw-px-3 tw-rounded-full tw-pt-[1px]">
											Discounted!
										</span>
									)}
								</div>
								<div className="tw-text-sm tw-font-light">
									<div>
										Color: <span>{color ? color : "***"}</span>
									</div>
									<div>
										Length: <span>{length}" inches</span>
									</div>
								</div>
							</div>
							<PaymentOptions price={price} />
							<div>
								{error && (
									<div>
										<p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
											{[FRONTAL, CLOSURE].includes(
												singleProduct?.[0]?.type.toLowerCase()
											)
												? `Please provide color and length for ${name}`
												: `Please provide length for ${name}`}
										</p>
									</div>
								)}
								{isInCart(singleProduct, cartItems) ? (
									<div
										className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300"
										onClick={
											cartItems.length !== 0 ? () => handleAdd(true) : null
										}>
										<span>Add more</span>
									</div>
								) : (
									<div
										className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300"
										onClick={handleAdd}>
										<span>Add to cart</span>
									</div>
								)}
							</div>
							<div className="tw-my-5 tw-border-t-[1px] tw-border-red-700 tw-py-5 tw-overflow-scroll single tw-h-[70%]">
								<div className="tw-mb-5">
									<Heading children="Product Details" isBold={false} />
								</div>
								<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 md:tw-gap-x-10">
									{desc?.map((item, idx) => (
										<div
											key={idx}
											className="tw-capitalize tw-flex tw-flex-col tw-mb-2 tw-text-sm">
											<span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
												{item.key}:{" "}
											</span>
											<span>{item.value}</span>
										</div>
									))}
								</div>
								{singleProduct?.[0]?.maintenance && (
									<div className="tw-mt-10 tw-mb-2">
										<Heading children="Maintenance" isBold={false} />
									</div>
								)}
								{singleProduct?.[0]?.maintenance?.map((item, idx) => (
									<li
										key={idx}
										className="tw-text-sm tw-italic tw-text-neutral-500 tw-font-light tw-mb-2 ">
										{item}
									</li>
								))}
							</div>

							<div className="tw-fixed tw-top-3 tw-z-40 tw-right-3">
								<div
									onClick={() => {
										setSingleproduct(null);
										setLength("14");
									}}
									className="tw-text-2xl tw-text-white tw-bg-neutral-900 tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-absolute tw-top-[20px] tw-right-[20px] tw-ease-in tw-duration-300 tw-cursor-pointer hover:md:tw-bg-white hover:md:tw-text-neutral-900">
									<CgClose />
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default SingleProductModal;
