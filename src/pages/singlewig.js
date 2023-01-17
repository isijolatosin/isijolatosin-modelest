import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import axios from "axios";
import Slideshow from "../utils/Slideshow";
import RatingFix from "../components/shared/RatingFix";
import { isInCart } from "../utils/helpers";
import { selectCartItems } from "../slices/appSlices";
import Reviews from "../components/shared/Reviews";
import Add2CartPopup from "../components/shared/Add2CartPopup";
import { useDispatch, useSelector } from "react-redux";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import PaymentOptions from "../components/shared/PaymentOptions";
import { returnDecsriptionObject } from "../utils/returnObjectProperty";
import { addToCart } from "../utils/putToCartFunc";

const SingleWig = () => {
	const navigate = useNavigate();
	const [singleWig, setSingleWig] = React.useState([]);
	const [singleCart, setSingleCart] = React.useState(null);
	const [error, setError] = React.useState(false);
	const [_length, setLength] = React.useState(null);
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const category = window.location.pathname.split("/").filter((x) => x)?.[0];
	const wigId = window.location.pathname
		.split("/")
		.filter((x) => x)?.[1]
		.split("-")?.[1];

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);
			const filtered = products.filter((product) => product._id === wigId);

			setSingleWig(filtered.sort((a, b) => a.name.localeCompare(b.name)));
		} catch (error) {
			console.log(error);
		}
	}
	React.useEffect(() => {
		fetchProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Adding to cart items
	const name = singleWig[0]?.name;
	const id = singleWig[0]?._id;
	const image = singleWig[0]?.images[0];
	const description = singleWig[0]?.description;
	const hairLength = _length;
	const hairTexture = singleWig[0]?.texture;
	const price = +singleWig[0]?.price[_length];
	const avLengths =
		singleWig[0]?.availablelength.length > 3
			? singleWig[0]?.availablelength.split(", ")
			: [singleWig[0]?.availablelength];
	const lengths =
		singleWig[0]?.length.length > 3
			? singleWig[0]?.length.split(", ")
			: [String(singleWig[0]?.length)];

	const lengthArray = [...lengths];
	const allSizes = [...avLengths];
	const hairColor = singleWig[0]?.color;
	const quantity = 1;
	const wigProduct = {
		name,
		id,
		image,
		price,
		description,
		hairTexture,
		hairLength,
		quantity,
		hairColor,
	};
	const aLength =
		singleWig[0]?.availablelength.length > 2
			? singleWig[0]?.availablelength.split(", ")
			: singleWig[0]?.availablelength;

	const desc = returnDecsriptionObject(
		singleWig,
		"",
		name,
		singleWig[0]?.color,
		aLength
	);

	const handleAdd = (increase) => {
		if (price && _length) {
			addToCart(
				price,
				_length,
				dispatch,
				wigProduct,
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
		<>
			<Helmet>
				<title>{`${name}-Hair-Bundle-Deals`}</title>
			</Helmet>
			<Layout>
				<div className="tw-pt-0 tw-w-full tw-bg-white tw-flex tw-flex-col tw-items-center tw-relative">
					<div className="tw-fixed tw-z-20 tw-top-0 md:tw-top-[-95px] tw-right-0">
						<Add2CartPopup
							singleCart={singleCart}
							setSingleCart={setSingleCart}
							quantity={quantity}
						/>
					</div>
					<div className="tw-mt-[70px] tw-w-full md:tw-w-[95%] tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5">
						<div>
							<div className="tw-fixed tw-z-10 tw-right-5 md:tw-right-20 tw-top-[120px]">
								<div className="tw-text-neutral-900  tw-mb-3">
									<div
										onClick={() => navigate(-1)}
										className="tw-cursor-pointer">
										<BsFillArrowLeftCircleFill
											size={35}
											className="hover:md:tw-text-neutral-50 hover:tw-drop-shadow-lg tw-ease-in tw-duration-300"
										/>{" "}
									</div>
								</div>
							</div>
							<div className="">
								<Slideshow
									images={singleWig[0]?.images}
									// images={imageArray}
									iconSize={25}
									video={singleWig[0]?.video}
								/>
							</div>
							<div className="tw-w-[90%] xl:tw-w-[80%] tw-mx-auto">
								<div className="tw-w-[100%] tw-mx-auto">
									<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
										{singleWig?.[0]?.name}
									</p>
									<div className="tw-mb-5">
										<RatingFix isReview={true} size={20} color2="[#bba371]" />
									</div>
									<p className="tw-font-medium tw-text-sm tw-mb-8 tw-mt-0">
										Description: {singleWig?.[0]?.description}
									</p>
								</div>

								<div className="tw-flex tw-flex-wrap tw-gap-x-1 tw-gap-y-3 tw-border-y-[1px] tw-py-3">
									{allSizes.map(
										// eslint-disable-next-line array-callback-return
										(item) =>
											lengthArray.includes(item) ? (
												<div
													onClick={() => {
														setLength(item);
														setError(false);
													}}
													className={` tw-flex tw-flex-wrap tw-mr-2 tw-p-2 tw-px-3 tw-border-[1px] tw-border-neutral-900 tw-rounded-full tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300 ${
														item === _length &&
														"tw-bg-neutral-900 tw-text-white"
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
								<div className="tw-inline-block md:tw-hidden">
									{!price && (
										<span className="tw-text-xs tw-text-green-700">
											*** Select length to calculate price... ***
										</span>
									)}
									<div className="tw-mb-1">
										<span className="tw-text-3xl">${price || "***"}</span>
										<span className="tw-text-[12px] tw-font-light"> USD</span>
									</div>
									<div className="tw-text-sm tw-font-light tw-text-neutral-500 tw-italic tw-my-3">
										<div>
											Color: <span>{singleWig?.[0]?.color}</span>
										</div>
										<div>
											Texture: <span>{singleWig?.[0]?.texture || "***"}</span>
										</div>
										<div>
											Length: <span>{_length}" inches</span>
										</div>
									</div>
									<PaymentOptions price={price} />
									{error && (
										<div>
											<p className="tw-text-left tw-mb-2 tw-mt-5 tw-text-red-600 tw-text-xs">
												Please provide length for your order
											</p>
										</div>
									)}
									{isInCart(wigProduct, cartItems) ? (
										<div
											className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
												!error && "tw-mt-5"
											}`}
											onClick={
												cartItems.length !== 0 ? () => handleAdd(true) : null
											}>
											<span>Add more</span>
										</div>
									) : (
										<div
											className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
												!error && "tw-mt-5"
											}`}
											onClick={handleAdd}>
											<span>Add to cart</span>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="tw-w-[90%] tw-mx-auto">
							<div className="tw-grid tw-mt-5 tw-grid-cols-1 md:tw-grid-cols-2 md:tw-gap-x-10">
								{desc.map((item, idx) => (
									<div className="tw-flex tw-flex-col tw-mb-2 tw-text-sm tw-capitalize">
										<span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
											{item.key}:{" "}
										</span>
										<span>{item.value}</span>
									</div>
								))}
							</div>
							{singleWig?.[0]?.maintenance && (
								<div className="tw-mt-10 tw-mb-2">
									<Heading children="Maintenance" isBold={false} />
								</div>
							)}
							<div>
								{singleWig?.[0]?.maintenance?.map((item, idx) => (
									<li
										key={idx}
										className="tw-text-sm tw-italic tw-text-neutral-500 tw-font-light tw-mb-2">
										{item}
									</li>
								))}
							</div>
							<div className="tw-hidden md:tw-inline-block">
								{!price && (
									<span className="tw-text-xs tw-text-green-700">
										*** Select length to calculate price... ***
									</span>
								)}
								<div className="tw-mb-1">
									<span className="tw-text-3xl">${price || "***"}</span>
									<span className="tw-text-[12px] tw-font-light"> USD</span>
								</div>
								<div className="tw-text-xs tw-text-neutral-500 tw-italic tw-font-light tw-my-3">
									<div>
										Color: <span>{singleWig?.[0]?.color}</span>
									</div>
									<div>
										Texture: <span>{singleWig?.[0]?.texture || "***"}</span>
									</div>
									<div>
										Length: <span>{_length}" inches</span>
									</div>
								</div>
								<PaymentOptions price={price} />
								{error && (
									<div>
										<p className="tw-text-left tw-mb-2 tw-mt-5 tw-text-red-600 tw-text-xs">
											Please provide length and quantity for your order
										</p>
									</div>
								)}
								{isInCart(wigProduct, cartItems) ? (
									<div
										className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[50%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
											!error && "tw-mt-5"
										}`}
										onClick={
											cartItems.length !== 0
												? () =>
														addToCart(
															price,
															_length,
															dispatch,
															wigProduct,
															setSingleCart,
															setError,
															true
														)
												: null
										}>
										<span>Add more</span>
									</div>
								) : (
									<div
										className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[50%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
											!error && "tw-mt-5"
										}`}
										onClick={() =>
											addToCart(
												price,
												_length,
												dispatch,
												wigProduct,
												setSingleCart,
												setError
											)
										}>
										<span>Add to cart</span>
									</div>
								)}
							</div>
						</div>
					</div>
					<Reviews category={category} />
				</div>
			</Layout>
		</>
	);
};

export default SingleWig;
