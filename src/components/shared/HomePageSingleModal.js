import React from "react";
import Slideshow from "../../utils/Slideshow";
import Heading from "../Heading";
import Rating from "./Rating";
import { isInCart } from "../../utils/helpers";
import { CgClose } from "react-icons/cg";
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from "../../slices/appSlices";
import { useDispatch, useSelector } from "react-redux";
import {
	closureVirginWigPricing,
	frontalVirginWigPricing,
	wigTextureType1,
	wigTextureTypeIncreaseValue1,
	wigTextureType2,
	wigTextureTypeIncreaseValue2,
} from "../../constant";
import PaymentOptions from "./PaymentOptions";

const HomePageSingleModal = ({
	singleProducts,
	setSingleCart,
	setSingleproducts,
	similarProductsFrontal,
	similarProductsClosure,
	sales,
}) => {
	const similarProducts = singleProducts[0]?.name
		.toLowerCase()
		.includes("-closure")
		? similarProductsClosure
		: singleProducts[0]?.name.toLowerCase().includes("-frontal")
		? similarProductsFrontal
		: [];

	const similarProductsFiltered = similarProducts.filter(
		(p) => p._id !== singleProducts[0]?._id
	);

	const allSizes = ["14", "16", "18", "20", "22", "24"];
	const cartItems = useSelector(selectCartItems);
	const [error, setError] = React.useState(false);

	const [length, setLength] = React.useState("");
	const [_color, setColor] = React.useState(null);
	const [_hairType, sethairType] = React.useState(null);
	const dispatch = useDispatch();

	const name = singleProducts?.[0] && singleProducts?.[0]?.name;
	const id = singleProducts?.[0] && singleProducts?.[0]?._id;
	const image = singleProducts?.[0] && singleProducts?.[0]?.images[0];
	const color = singleProducts?.[0] && singleProducts?.[0]?.color;
	const description = singleProducts?.[0] && singleProducts?.[0]?.description;
	const width = singleProducts?.[0] && singleProducts?.[0]?.widthlength;

	const _hairColor =
		singleProducts?.[0]?.type.toLowerCase() === "frontal"
			? ["Natural black"]
			: ["Natural black", "Blonde613"];
	const texture = ["Straight", "Bodywave", "Curly", "Wavy"];

	const avesizes = singleProducts?.[0]?.availablelength?.split(", ");
	const sizes = singleProducts?.[0]?.length.split(", ");

	const hairLength = length;
	const hairColor = _color || color;
	const hairTexture = _hairType || singleProducts?.[0]?.texture;

	let cardPrice =
		sales !== 0 && singleProducts?.[0]?.sales
			? singleProducts?.[0]?.price - singleProducts?.[0]?.price * (sales / 100)
			: singleProducts?.[0]?.price;

	let _price;
	let _price2;

	if (length === "14") {
		_price = cardPrice;
	} else if (length === "16") {
		_price = cardPrice + 10;
	} else if (length === "18") {
		_price = cardPrice + 20;
	} else if (length === "20") {
		_price = cardPrice + 30;
	} else if (length === "22") {
		_price = cardPrice + 40;
	} else if (length === "24") {
		_price = cardPrice + 50;
	} else if (length === "26") {
		_price = cardPrice + 60;
	} else if (length === "28") {
		_price = cardPrice + 70;
	} else if (length === "30") {
		_price = cardPrice + 80;
	}

	if (length === "14") {
		_price2 = cardPrice;
	} else if (length === "16") {
		_price2 = cardPrice + 6;
	} else if (length === "18") {
		_price2 = cardPrice + 12;
	} else if (length === "20") {
		_price2 = cardPrice + 18;
	} else if (length === "22") {
		_price2 = cardPrice + 24;
	} else if (length === "24") {
		_price2 = cardPrice + 30;
	} else if (length === "26") {
		_price2 = cardPrice + 36;
	} else if (length === "28") {
		_price2 = cardPrice + 42;
	} else if (length === "30") {
		_price2 = cardPrice + 48;
	}

	const pricePredict = () => {
		if (singleProducts?.[0]?.type.toLowerCase() === "frontal") {
			// for frontal
			if (
				_color?.toLowerCase()?.includes("natural black") &&
				(_hairType?.toLowerCase()?.includes("bodywave") ||
					_hairType?.toLowerCase()?.includes("wavy") ||
					_hairType?.toLowerCase()?.includes("curly"))
			) {
				return (_price2 += 6);
			} else if (
				_color?.toLowerCase()?.includes("natural black") &&
				_hairType?.toLowerCase()?.includes("straight")
			) {
				return _price2;
			}
		} else {
			// for closure
			if (
				_color?.toLowerCase()?.includes("natural black") &&
				(_hairType?.toLowerCase()?.includes("bodywave") ||
					_hairType?.toLowerCase()?.includes("wavy") ||
					_hairType?.toLowerCase()?.includes("curly"))
			) {
				return (_price += 5);
			} else if (
				_color?.toLowerCase()?.includes("natural black") &&
				_hairType?.toLowerCase()?.includes("straight")
			) {
				return _price;
			}

			if (
				_color?.toLowerCase()?.includes("blonde613") &&
				(_hairType?.toLowerCase()?.includes("bodywave") ||
					_hairType?.toLowerCase()?.includes("wavy") ||
					_hairType?.toLowerCase()?.includes("curly"))
			) {
				return (_price += 15);
			} else if (
				_color?.toLowerCase()?.includes("blonde613") &&
				_hairType?.toLowerCase()?.includes("straight")
			) {
				return (_price += 10);
			}
		}
	};

	// Price for virgin wigs
	function wigFuncClosure() {
		let a;
		// eslint-disable-next-line array-callback-return
		closureVirginWigPricing.map((p) => {
			if (length === p?.length) {
				if (singleProducts[0]?.texture) {
					if (
						wigTextureType1.includes(singleProducts[0]?.texture?.toLowerCase())
					) {
						a = p?.price + wigTextureTypeIncreaseValue1;
					} else {
						a = p?.price;
					}
				} else if (singleProducts[0]?.texture) {
					if (
						wigTextureType2.includes(singleProducts[0]?.texture?.toLowerCase())
					) {
						a = p?.price + wigTextureTypeIncreaseValue2;
					} else {
						a = p?.price;
					}
				} else if (
					singleProducts[0]?.texture.toLowerCase().includes("straight")
				) {
					a = p?.price;
				} else {
					a = p?.price;
				}
			}
		});
		return a;
	}

	function wigFuncFrontal() {
		let a;
		// eslint-disable-next-line array-callback-return
		frontalVirginWigPricing.map((p) => {
			if (length === p?.length) {
				if (singleProducts[0]?.texture) {
					if (
						wigTextureType1.includes(singleProducts[0]?.texture?.toLowerCase())
					) {
						a = p?.price + wigTextureTypeIncreaseValue1;
					} else {
						a = p?.price;
					}
				} else if (singleProducts[0]?.texture) {
					if (
						wigTextureType2.includes(singleProducts[0]?.texture?.toLowerCase())
					) {
						a = p?.price + wigTextureTypeIncreaseValue2;
					} else {
						a = p?.price;
					}
				} else if (
					singleProducts[0]?.texture?.toLowerCase().includes("straight")
				) {
					a = p?.price;
				} else {
					a = p?.price;
				}
			}
		});
		return a;
	}

	const vWPrice = singleProducts?.[0]?.name.toLowerCase().includes("-closure")
		? wigFuncClosure()
		: singleProducts?.[0]?.name.toLowerCase().includes("-frontal")
		? wigFuncFrontal()
		: "";
	const f_cPrice = pricePredict();

	const priceFunc = () => {
		if (singleProducts?.[0]?.sales) {
			if (
				singleProducts?.[0]?.type.toLowerCase() === "frontal" ||
				singleProducts?.[0]?.type.toLowerCase() === "closure"
			) {
				return Number(f_cPrice);
			} else {
				return Number(_price);
			}
		} else {
			return Number(price_Nosales);
		}
	};

	const price_Nosales =
		singleProducts?.[0]?.type.toLowerCase().includes("frontal") ||
		singleProducts?.[0]?.type.toLowerCase().includes("closure")
			? f_cPrice
			: singleProducts?.[0]?.type.toLowerCase().includes("virgin wig")
			? vWPrice
			: _price;

	const price = singleProducts?.[0]?.type.includes("virgin wig")
		? vWPrice
		: priceFunc();

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

	const addToCart = () => {
		if (length) {
			dispatch(addToCartItem(singleProduct));
			setTimeout(() => {
				setSingleCart(singleProduct);
			}, 1000);
		} else {
			setError(true);
		}
	};

	const IncreaseItem = () => {
		dispatch(increaseCartItem(singleProduct));
	};

	const desc = [
		{ key: "Brand", value: `Raw ${singleProducts?.[0]?.brand} hair` },
		{
			key: "Hair Texture",
			value:
				singleProducts?.[0]?.type.toLowerCase() === "frontal" ||
				singleProducts?.[0]?.type.toLowerCase() === "closure"
					? texture.join(", ")
					: name,
		},
		{ key: "Hair Color", value: color },
		{
			key: "Hair Length",
			value: `Available from ${avesizes?.[0]}" - ${
				avesizes?.[avesizes.length - 1]
			}" inches`,
		},
		{ key: "Material", value: "100% Human Hair" },
		{
			key: "Cap Size",
			value: "Average Size(Head circumference: 54cm - 58cm",
		},
		{ key: "Can be bleached.dyed", value: "Yes" },
		{
			key: "Return policy",
			value:
				"We accept 10-days no reason return exchange with hair not been used",
		},
		{
			key: "Delivery time",
			value:
				"We usually ship the order within 24 hours after order confirmation, except for weekends and holidays - (order confirmation is within 2 weeks)",
		},
	];

	return (
		<div className="single tw-fixed tw-z-40 tw-overflow-scroll tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-0 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white md:tw-pt-5 ">
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
					{singleProducts?.[0]?.name.toLowerCase() === "frontal" ||
					singleProducts?.[0]?.name.toLowerCase() === "closure" ? (
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
					) : singleProducts?.[0]?.type.toLowerCase().includes("virgin wig") ? (
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
								{allSizes.map(
									// eslint-disable-next-line array-callback-return
									(item) =>
										avesizes?.includes(item) ? (
											<div
												onClick={() => {
													setLength(item);
													setError(false);
												}}
												className={` tw-flex tw-flex-wrap tw-mr-2 tw-p-2 tw-px-3 tw-border-[1px] tw-border-neutral-900 tw-rounded-full tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300 ${
													item === length && "tw-bg-neutral-900 tw-text-white"
												}`}>
												<span>{item}</span>
											</div>
										) : (
											<div
												className={`tw-flex tw-flex-wrap tw-mr-2 tw-p-2 tw-px-3 tw-border-[1px] tw-rounded-full tw-cursor-not-allowed tw-text-neutral-300`}>
												<span>{item}</span>
											</div>
										)
								)}
							</div>
						</div>
					)}
				</div>
				<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900 ">
					{!price_Nosales &&
						(singleProducts?.[0]?.type.toLowerCase() === "frontal" ||
						singleProducts?.[0]?.type.toLowerCase() === "closure" ? (
							<span className="tw-text-xs tw-my-3 tw-text-green-700">
								*** Select color & tetxure to calculate price... ***
							</span>
						) : (
							<span className="tw-text-xs tw-my-3 tw-text-green-700">
								*** Select length to calculate price... ***
							</span>
						))}
					<p className="tw-font-medium tw-text-2xl tw-mb-[10px]">
						Price:{" "}
						{!singleProducts?.[0]?.type.includes("virgin wig") && (
							<span
								className={
									sales !== 0 &&
									singleProducts?.[0]?.sales &&
									"tw-mr-3 tw-line-through tw-text-neutral-400 tw-border-r-[1px] tw-border-neutral-500 tw-pr-3"
								}>
								$
								{sales !== 0 &&
									singleProducts?.[0]?.sales &&
									`${
										price_Nosales
											? price_Nosales +
											  singleProducts?.[0]?.price * (sales / 100)
											: singleProducts?.[0]?.price +
											  singleProducts?.[0]?.price * (sales / 100)
									}${" "}`}
							</span>
						)}
						{singleProducts?.[0]?.type.includes("virgin wig")
							? `$${vWPrice ? vWPrice : "***"}${" "}`
							: price_Nosales
							? price_Nosales
							: " ***"}
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
									{singleProducts?.[0]?.type.toLowerCase() === "frontal" ||
									singleProducts?.[0]?.type.toLowerCase() === "closure"
										? `Please provide color, texture and length for ${singleProducts?.[0]?.name}`
										: `Please provide length for ${singleProducts?.[0]?.name}`}
								</p>
							</div>
						)}
						{isInCart(singleProduct, cartItems) ? (
							<div
								className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:md:tw-text-neutral-900 hover:md:tw-bg-white tw-cursor-pointer tw-ease-in tw-duration-300"
								onClick={cartItems.length !== 0 ? IncreaseItem : null}>
								{singleProducts?.[0]?.type.toLowerCase() === "frontal" ||
								singleProducts?.[0]?.type.toLowerCase() === "closure" ? (
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
								onClick={addToCart}>
								<span>Add to cart</span>
							</div>
						)}
					</div>
					{similarProductsFiltered.length !== 0 && (
						<>
							<div className="tw-mt-5 tw-mb-2">
								<Heading
									children={
										similarProductsFiltered.length > 1
											? "Similar products"
											: "Similar product"
									}
									isBold={false}
								/>
							</div>
							<div className=" tw-flex tw-flex-wrap">
								{similarProductsFiltered.map((product) => (
									<div className="tw-relative tw-mb-5 tw-w-[80px] tw-h-[85px] tw-rounded-md">
										<img
											className="tw-w-full tw-h-full tw-object-cover tw-rounded-md"
											src={product.image}
											alt={product.name}
										/>
										<p className="tw-text-[10px] tw-absolute tw-bottom-0 tw-bg-[rgba(255,255,255,0.8)] tw-text-black tw-text-center tw-w-full tw-rounded-b-md">
											{product.name}
										</p>
									</div>
								))}
							</div>
						</>
					)}

					<div className="tw-my-5 tw-border-t-[1px] tw-border-red-700 tw-py-5 tw-overflow-scroll single tw-h-[70%]">
						<div className="tw-mb-5">
							<Heading children="Product Details" isBold={false} />
						</div>
						<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 md:tw-gap-x-10">
							{desc.map((item, idx) => (
								<div className="tw-flex tw-flex-col tw-mb-2 tw-text-sm tw-capitalize">
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
