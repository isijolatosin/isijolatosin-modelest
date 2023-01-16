import React from "react";
import Slideshow from "../../utils/Slideshow";
import Heading from "../Heading";
import Rating from "./Rating";
import { isInCart } from "../../utils/helpers";
import { CgClose } from "react-icons/cg";
import { selectCartItems } from "../../slices/appSlices";
import { useDispatch, useSelector } from "react-redux";
import {
	ALLSIZES,
	FRONTAL,
	STRAIGHT,
	BODYWAVE,
	CURLY,
	WAVY,
	CLOSURE,
	VIRGINWIG,
} from "../../constant";
import PaymentOptions from "./PaymentOptions";
import {
	returnDecsriptionObject,
	returnObjectProperty,
} from "../../utils/returnObjectProperty";
import { addToCart } from "../../utils/putToCartFunc";

const HomePageSingleModal = ({
	singleProducts,
	setSingleCart,
	setSingleproducts,
	sales,
}) => {
	const cartItems = useSelector(selectCartItems);
	const [error, setError] = React.useState(false);

	const [length, setLength] = React.useState("");
	const [_color, setColor] = React.useState("");
	const [_hairType, sethairType] = React.useState("");
	const dispatch = useDispatch();

	const {
		name,
		id,
		image,
		color,
		description,
		width,
		_hairColor,
		avesizes,
		sizes,
		_hairTexture,
	} = returnObjectProperty(singleProducts);
	const texture = [STRAIGHT, BODYWAVE, CURLY, WAVY];
	const hairLength = length;
	const hairColor = _color || color;
	const hairTexture = _hairType || _hairTexture;
	const price = singleProducts?.[0]?.price[+length];

	const singleProduct = {
		name,
		id,
		image,
		hairColor,
		price,
		hairLength,
		description,
		width,
		hairTexture,
	};
	return (
		<div className="single tw-fixed tw-z-40 tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-0 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white md:tw-pt-5 ">
			<div className="general-scrollbar-hide md:tw-mx-auto tw-w-[100%] md:tw-w-[90%] tw-h-full tw-flex md:tw-flex-row tw-flex-col tw-overflow-scroll">
				<div className="tw-relative tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
					<Slideshow
						images={singleProducts?.[0]?.images}
						iconSize={25}
						video={singleProducts[0]?.video}
					/>
					<div className="tw-w-[90%] tw-mx-auto md:tw-w-[100%]">
						<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
							{singleProducts?.[0]?.name}
						</p>
						<div className="tw-flex tw-items-center tw-mb-5">
							<span className="tw-mr-2">Review: </span>
							<Rating isNum={true} color2="[#bba371]" />
						</div>
						<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
							Description: {singleProducts?.[0]?.description}
						</p>
					</div>
					{singleProducts?.[0]?.name.toLowerCase() === FRONTAL ||
					singleProducts?.[0]?.name.toLowerCase() === CLOSURE ? (
						<div className="tw-ml-5  md:tw-ml-0 tw-mt-5">
							<div className="tw-flex tw-flex-col tw-border-y-[1px] tw-py-3">
								<div className="tw-flex tw-flex-wrap tw-gap-2">
									{avesizes?.map((size, idx) => (
										<span
											onClick={() => {
												setLength(size);
												setError(false);
											}}
											className={`tw-flex tw-flex-wrap ${
												length === size
													? "tw-bg-neutral-900 tw-text-white"
													: "tw-bg-white tw-text-neutral-900"
											} tw-rounded-full tw-mr-2 tw-border-[1px] tw-border-neutral-900 tw-p-2 tw-px-3 tw-text-[14px] hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
											key={idx}>
											{size}
										</span>
									))}
								</div>
							</div>
							<div className="tw-flex tw-flex-col tw-border-b-[1px] tw-py-3">
								<div className="tw-flex tw-flex-wrap">
									{_hairColor.map((colr, idx) => (
										<span
											onClick={() => {
												setColor(colr);
												setError(false);
											}}
											className={`${
												_color === colr
													? "tw-bg-neutral-900 tw-text-white"
													: "tw-bg-neutral-200 tw-text-neutral-900"
											} tw-flex tw-flex-wrap tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
											key={idx}>
											<span>{colr}</span>
										</span>
									))}
								</div>
							</div>
							<div className="tw-flex tw-flex-col tw-border-b-[1px] tw-py-3">
								<div className="tw-flex tw-flex-wrap">
									{texture.map((tex, idx) => (
										<span
											onClick={() => {
												sethairType(tex);
											}}
											className={`${
												_hairType === tex
													? "tw-bg-neutral-900 tw-text-white"
													: "tw-bg-neutral-200 tw-text-neutral-900"
											} tw-flex tw-flex-wrap tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
											key={idx}>
											<span>{tex}</span>
										</span>
									))}
								</div>
							</div>
						</div>
					) : singleProducts?.[0]?.type.toLowerCase().includes(VIRGINWIG) ? (
						<div className="tw-ml-5 md:tw-ml-0 tw-mt-5">
							<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
								<div className="tw-flex tw-flex-wrap tw-border-y-[1px] tw-py-3 tw-gap-2">
									{avesizes.map((size, idx) => (
										<span
											onClick={() => {
												if (sizes.includes(size)) {
													setLength(size);
													setError(false);
												}
											}}
											className={`tw-flex tw-flex-wrap ${
												length === size
													? "tw-bg-neutral-900 tw-text-white"
													: "tw-bg-white"
											} ${
												sizes.includes(size)
													? "tw-border-neutral-900 tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white"
													: "tw-cursor-not-allowed tw-border-neutral-200 tw-text-neutral-300"
											} tw-rounded-full tw-mr-2 tw-border-[1px] tw-p-2 tw-px-3 tw-text-[14px] tw-ease-in tw-duration-300`}
											key={idx}>
											{size}
										</span>
									))}
								</div>
							</div>
						</div>
					) : (
						<div className="tw-flex tw-flex-col tw-ml-5 tw-mt-5 md:tw-ml-0 tw-border-y-[1px] tw-py-3">
							<div className="tw-flex tw-flex-wrap tw-gap-2">
								{ALLSIZES.map(
									// eslint-disable-next-line array-callback-return
									(item) =>
										avesizes?.includes(item?.value) ? (
											<div
												key={item?.id}
												onClick={() => {
													setLength(item?.value);
													setError(false);
												}}
												className={` tw-flex tw-flex-wrap tw-mr-2 tw-p-2 tw-px-3 tw-border-[1px] tw-border-neutral-900 tw-rounded-full tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300 ${
													item?.value &&
													length &&
													item?.value === length &&
													"tw-bg-neutral-900 tw-text-white"
												}`}>
												<span>{item?.value}</span>
											</div>
										) : (
											<div
												key={item?.id}
												className="tw-flex tw-flex-wrap tw-mr-2 tw-p-2 tw-px-3 tw-border-[1px] tw-rounded-full tw-cursor-not-allowed tw-text-neutral-300">
												<span>{item?.value}</span>
											</div>
										)
								)}
							</div>
						</div>
					)}
				</div>
				<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900 ">
					{singleProducts?.[0]?.type.toLowerCase() === FRONTAL ||
					singleProducts?.[0]?.type.toLowerCase() === CLOSURE ? (
						<span className="tw-text-xs tw-my-3 tw-text-green-700">
							*** Select color & tetxure to calculate price... ***
						</span>
					) : (
						<span className="tw-text-xs tw-my-3 tw-text-green-700">
							*** Select length to calculate price... ***
						</span>
					)}
					<p className="tw-font-medium tw-text-2xl tw-mb-[10px]">
						Price:
						<span className="">${price}</span>
					</p>
					<div className="tw-text-sm tw-font-light tw-text-neutral-500 tw-italic">
						<div>
							Color:{" "}
							<span>
								{_color
									? _color
									: singleProducts?.[0]?.color
									? singleProducts?.[0]?.color
									: "***"}
							</span>
						</div>
						<div>
							Texture:{" "}
							<span>{_hairType || singleProducts?.[0]?.texture || "***"}</span>
						</div>
						<div>
							Length: <span>{length}" inches</span>
						</div>
					</div>

					{singleProducts?.[0]?.sales && (
						<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-my-1 tw-text-red-600">
							Sales: {sales && `${sales}%`}{" "}
							<span className="tw-text-xs">OFF</span>
						</p>
					)}
					<PaymentOptions price={price} />
					<div className="tw-mt-5">
						{error && (
							<div>
								<p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
									{singleProducts?.[0]?.type.toLowerCase() === FRONTAL ||
									singleProducts?.[0]?.type.toLowerCase() === CLOSURE
										? `Please provide color, texture and length for ${singleProducts?.[0]?.name}`
										: `Please provide length for ${singleProducts?.[0]?.name}`}
								</p>
							</div>
						)}
						{isInCart(singleProduct, cartItems) ? (
							<div
								className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:md:tw-text-neutral-900 hover:md:tw-bg-white tw-cursor-pointer tw-ease-in tw-duration-300"
								onClick={
									cartItems.length !== 0
										? () =>
												addToCart(
													price,
													length,
													dispatch,
													singleProduct,
													setSingleCart,
													setError,
													true
												)
										: null
								}>
								{singleProducts?.[0]?.type.toLowerCase() === FRONTAL ||
								singleProducts?.[0]?.type.toLowerCase() === CLOSURE ? (
									<span>
										Add more of {_hairType} {_color} - {length}"
									</span>
								) : (
									<span>
										Add more of {singleProducts?.[0]?.name} - {length}"
									</span>
								)}
							</div>
						) : (
							<div
								className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:md:tw-text-neutral-900 hover:md:tw-bg-white tw-cursor-pointer tw-ease-in tw-duration-300"
								onClick={() =>
									addToCart(
										price,
										length,
										dispatch,
										singleProduct,
										setSingleCart,
										setError
									)
								}>
								<span>Add to cart</span>
							</div>
						)}
					</div>

					<div className="tw-my-5 tw-border-t-[1px] tw-border-red-700 tw-py-5 tw-overflow-scroll single tw-h-[70%]">
						<div className="tw-mb-5">
							<Heading children="Product Details" isBold={false} />
						</div>
						<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 md:tw-gap-x-10">
							{returnDecsriptionObject(
								singleProducts,
								texture,
								name,
								color,
								avesizes
							)?.map((item, idx) => (
								<div
									key={idx}
									className="tw-flex tw-flex-col tw-mb-2 tw-text-sm tw-capitalize">
									<span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
										{item.key}:{" "}
									</span>
									<span>{item.value}</span>
								</div>
							))}
						</div>
						{singleProducts?.[0]?.maintenance && (
							<div className="tw-mt-5 tw-mb-2">
								<Heading children="Maintenance" isBold={false} />
							</div>
						)}
						{singleProducts?.[0]?.maintenance?.map((item, idx) => (
							<li
								key={idx}
								className="tw-text-sm tw-italic tw-text-neutral-500 tw-font-light tw-mb-2">
								{item}
							</li>
						))}
					</div>

					<div className="tw-fixed tw-top-3 tw-z-40 tw-right-3">
						<div
							onClick={() => {
								setSingleproducts(null);
								setColor(null);
								sethairType(null);
								setLength("");
							}}
							className="tw-text-2xl tw-text-white tw-bg-neutral-900 tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-absolute tw-top-[20px] tw-right-[20px] tw-ease-in tw-duration-300 tw-cursor-pointer hover:md:tw-bg-white hover:md:tw-text-neutral-900">
							<CgClose />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePageSingleModal;
