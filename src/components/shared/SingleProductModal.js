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

const SingleProductModal = ({
	price,
	singleProducts,
	setSingleproducts,
	setSingleCart,
	desc,
	sizes,
	setLength,
	setError,
	error,
	singleProduct,
	cartItems,
	length,
	color,
}) => {
	const dispatch = useDispatch();
	const _hairColor = singleProducts?.[0]?.availablecolor?.split(", ");
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
		<div>
			{singleProducts && (
				<div className="single tw-fixed tw-z-40 tw-overflow-scroll tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-[0px] md:tw-pt-16 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white">
					<div className="md:tw-w-[95%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
						<div className="tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
							<Slideshow images={singleProducts?.[0].images} iconSize={25} />
							<div className="tw-w-[90%] tw-mx-auto">
								<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
									{singleProducts?.[0].name}
								</p>
								<div className="tw-flex tw-items-center tw-mb-5">
									<span className="tw-mr-2">Review: </span>
									<Rating isNum={true} />
								</div>
								<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
									Description: {singleProducts?.[0].description}
								</p>
							</div>
							{_hairColor && (
								<div className="tw-flex tw-flex-col tw-border-b-[1px] tw-border-neutral-300 tw-pb-5 tw-mt-5 tw-w-[90%] tw-mx-auto">
									<div className="tw-flex tw-flex-wrap">
										{_hairColor?.map((colr, idx) => (
											<span
												onClick={() => {
													setError(false);
												}}
												className={`${
													color === colr
														? "tw-bg-neutral-900 tw-text-white"
														: "tw-bg-neutral-200 tw-text-neutral-900"
												} tw-flex tw-flex-wrap tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
												key={idx}>
												<span>{colr}</span>
											</span>
										))}
									</div>
								</div>
							)}
							<div className="tw-flex tw-flex-col tw-mb-2 tw-border-y-[1px] tw-py-3 tw-w-[90%] tw-mx-auto">
								<div className="tw-flex tw-flex-wrap tw-gap-2">
									{sizes?.map((size) => (
										<span
											onClick={() => {
												setLength(+size);
												setError(false);
											}}
											className={`tw-flex tw-flex-wrap ${
												length === size
													? "tw-bg-neutral-900 tw-text-white"
													: "tw-bg-white tw-text-neutral-900"
											} tw-rounded-full tw-mr-2 tw-border-[1px] tw-border-neutral-900 tw-p-2 tw-px-3 tw-text-[14px] hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
											key={size}>
											{size}
										</span>
									))}
								</div>
							</div>
						</div>
						<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900">
							<div className="tw-flex tw-flex-col">
								{[FRONTAL, CLOSURE].includes(
									singleProducts?.[0]?.type.toLowerCase()
								) ? (
									<span className="tw-mt-2 tw-text-xs tw-text-green-700">
										Select color and / or length to calculate sales price...
									</span>
								) : (
									<span className="tw-mt-2 tw-text-xs tw-text-green-700">
										Select length to calculate sales price...
									</span>
								)}
								<p className="tw-font-medium tw-text-xl tw-my-[10px]">
									Price: ${price ? price : " ***"}{" "}
									<span className="tw-text-[12px] tw-font-light">USD</span>
								</p>
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
												singleProducts?.[0]?.type.toLowerCase()
											)
												? `Please provide color and length for ${singleProducts?.[0].name}`
												: `Please provide length for ${singleProducts?.[0].name}`}
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
								{singleProducts?.[0]?.maintenance && (
									<div className="tw-mt-10 tw-mb-2">
										<Heading children="Maintenance" isBold={false} />
									</div>
								)}
								{singleProducts?.[0]?.maintenance?.map((item, idx) => (
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
										setSingleproducts(null);
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
