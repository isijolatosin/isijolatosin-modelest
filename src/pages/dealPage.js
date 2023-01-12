import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import axios from "axios";
import Slideshow from "../utils/Slideshow";
import RatingFix from "../components/shared/RatingFix";
import { isInCart } from "../utils/helpers";
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from "../slices/appSlices";
import Reviews from "../components/shared/Reviews";
import Add2CartPopup from "../components/shared/Add2CartPopup";
import { useDispatch, useSelector } from "react-redux";
import Heading from "../components/Heading";
import {
	fetchBundlePercentage,
	fetchSalesPercentage,
} from "../utils/salesPercentageNumber";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import PaymentOptions from "../components/shared/PaymentOptions";

const DealPage = () => {
	const [bundleDealsPercentage, setBundleDealsPercentage] = React.useState(12);
	const [deals, setDeals] = React.useState([]);
	const [singleCart, setSingleCart] = React.useState(null);
	const [lengthArray, setLengthArray] = React.useState([]);
	const allSizes = ["14, 16, 18", "16, 18, 20", "18, 20, 22", "20, 22, 24"];
	const [error, setError] = React.useState(false);
	const [dealsImage, setDealsImage] = React.useState([]);
	const [dealPrice, setDealPrice] = React.useState(null);
	const [_quantity, setQuantity] = React.useState(1);
	const [_length, setLength] = React.useState(null);
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	const [sales, setSales] = React.useState(null);
	const category = window.location.pathname
		.split("/")
		.filter((x) => x)
		?.[window.location.pathname.split("/").filter((x) => x).length - 1].split(
			"-"
		)?.[
		window.location.pathname
			.split("/")
			.filter((x) => x)
			?.[window.location.pathname.split("/").filter((x) => x).length - 1].split(
				"-"
			).length - 1
	];
	React.useEffect(() => {
		setSales(fetchSalesPercentage());
		setBundleDealsPercentage(fetchBundlePercentage());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const frntlClsr = window.location.pathname
		.split("-")
		?.[window.location.pathname.split("-").length - 1].split("&")?.[
		(window.location.pathname
			.split("-")
			?.[window.location.pathname.split("-").length - 1].split("&")).length - 1
	];

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);
			const filtered = [];
			let price = 0;
			// eslint-disable-next-line array-callback-return
			products.filter((product) => {
				if (window.location.pathname.includes("bodywave")) {
					if (product.name.toLowerCase() === "body wave") {
						filtered.push(product);
						// eslint-disable-next-line array-callback-return
						filtered.map((product) => {
							price += product?.price * 3 + 20 + 30 + 40;
							if (product?.dealLength.split(" - ").length > 1) {
								setLengthArray(product?.dealLength.split(" - "));
							} else {
								setLengthArray(...product?.dealLength.split(" - "));
							}
						});
					}
				}
				if (window.location.pathname.includes("naturalcurly")) {
					if (product.name.toLowerCase() === "natural curly") {
						filtered.push(product);
						// eslint-disable-next-line array-callback-return
						filtered.map((product) => {
							price += product?.price * 3 + 20 + 30 + 40;
							if (product?.dealLength.split(" - ").length > 1) {
								setLengthArray(product?.dealLength.split(" - "));
							} else {
								setLengthArray(...product?.dealLength.split(" - "));
							}
						});
					}
				}
				if (window.location.pathname.includes("frontal")) {
					if (product.type.toLowerCase() === "frontal") {
						filtered.push(product);
						price += product?.price + 20;
					}
				} else if (window.location.pathname.includes("closure")) {
					if (product.type.toLowerCase() === "closure") {
						filtered.push(product);
						price += product?.price + 10;
					}
				}
				const discnt =
					bundleDealsPercentage &&
					Number((price * (bundleDealsPercentage / 100)).toFixed(2));

				setDealPrice(discnt ? Number((price - discnt).toFixed(2)) : price);
			});

			setDeals(filtered.sort((a, b) => a.name.localeCompare(b.name)));
			const imgs = [];
			filtered
				.sort((a, b) => a.name.localeCompare(b.name))
				// eslint-disable-next-line array-callback-return
				.map((deal) => {
					const imgObj = [
						{
							image: deal?.images[0],
							image2: deal?.images[1],
						},
					];
					imgs.push(...imgObj);
				});
			const imgSpread = [];
			// eslint-disable-next-line array-callback-return
			imgs.map((item) => {
				imgSpread.push(item.image);
				imgSpread.push(item.image2);
			});
			const rever = imgSpread.filter((x) => x).reverse();
			setDealsImage(rever);
		} catch (error) {
			console.log(error);
		}
	}

	React.useEffect(() => {
		fetchProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Adding to cart items
	const name =
		deals[0]?.name.toLowerCase().includes("frontal") ||
		deals?.[0]?.name.toLowerCase().includes("closure")
			? deals[1]?.name
			: deals[0]?.name;
	const id =
		deals[0]?.name.toLowerCase().includes("frontal") ||
		deals?.[0]?.name.toLowerCase().includes("closure")
			? deals?.[1]?._id
			: deals?.[0]?._id;
	const image =
		deals[0]?.name.toLowerCase().includes("frontal") ||
		deals?.[0]?.name.toLowerCase().includes("closure")
			? deals?.[1]?.images[0]
			: deals?.[0]?.images[0];
	const description =
		deals[0]?.name.toLowerCase().includes("frontal") ||
		deals?.[0]?.name.toLowerCase().includes("closure")
			? deals?.[1]?.description
			: deals?.[0]?.description;
	const price = dealPrice;
	const hairLength = _length;
	const hairTexture =
		deals[0]?.name.toLowerCase().includes("frontal") ||
		deals?.[0]?.name.toLowerCase().includes("closure")
			? deals?.[1]?.name
			: deals?.[0]?.name;
	const quantity = Number(_quantity);

	const dealsProduct = {
		name,
		id,
		image,
		price,
		description,
		hairTexture,
		hairLength,
		quantity,
	};

	const desc = [
		{ key: "Brand", value: `Raw ${deals[0]?.brand} hair` },
		{
			key: "Hair Texture",
			value: name,
		},
		{ key: "Hair Color", value: deals[1]?.color },

		{ key: "Material", value: "100% Human Hair" },
		{ key: "Can be bleached.dyed", value: "Yes" },
		{ key: "Density", value: "150% - 200%" },
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

	let timeOut;
	const addToCart = () => {
		clearTimeout(timeOut);
		if (quantity && _length) {
			dispatch(addToCartItem(dealsProduct));
			timeOut = setTimeout(() => {
				setSingleCart(dealsProduct);
			}, 1000);
		} else {
			setError(true);
		}
	};

	const IncreaseItem = () => {
		if (quantity && _length) {
			dispatch(increaseCartItem(dealsProduct));
			timeOut = setTimeout(() => {
				setSingleCart(dealsProduct);
			}, 1000);
		} else {
			setError(true);
		}
	};

	return (
		<>
			<Helmet>
				<title>{`${name}-Hair-Bundle-Deals`}</title>
			</Helmet>
			<Layout sales={bundleDealsPercentage}>
				<div
					className={`${
						sales ? "tw-pt-[55px] md:tw-pt-[50px]" : "tw-pt-0"
					} tw-w-full tw-bg-white tw-flex tw-flex-col tw-items-center`}>
					<div className="tw-fixed tw-z-20 tw-top-0 md:tw-top-[-95px] tw-right-0">
						<Add2CartPopup
							singleCart={singleCart}
							setSingleCart={setSingleCart}
							quantity={_quantity}
						/>
					</div>
					<div className="tw-pt-[70px] xl:tw-w-[80%] tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5">
						<div className="tw-fixed tw-z-10 tw-right-5 md:tw-right-20 tw-top-[170px]">
							<div className="tw-text-neutral-900  tw-mb-3">
								<Link to="/indian-bundles-deals">
									<BsFillArrowLeftCircleFill
										size={35}
										className="hover:md:tw-text-neutral-50 hover:tw-drop-shadow-lg tw-ease-in tw-duration-300"
									/>{" "}
								</Link>
							</div>
						</div>
						<div className="">
							<Slideshow images={dealsImage} iconSize={25} />
						</div>
						<div className="tw-px-5">
							<h1 className="tw-text-xl md:tw-text-3xl tw-uppercase">
								{name} & {frntlClsr} - 3 Bundle Deal
							</h1>
							<div className="tw-mb-5">
								<RatingFix isReview={true} size={20} color="black" />
							</div>
							<span>Bundles</span>
							<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2">
								{allSizes.map(
									// eslint-disable-next-line array-callback-return
									(item) =>
										lengthArray?.includes(item) ? (
											<div
												onClick={() => {
													setLength(item);
													setError(false);
												}}
												className={`tw-text-center tw-mr-2 tw-mb-2 tw-p-2 tw-border-[1px] tw-border-neutral-900 tw-rounded-full tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300 ${
													item === _length && "tw-bg-neutral-900 tw-text-white"
												}`}>
												<span>{item} - inches</span>
											</div>
										) : (
											<div
												className={`tw-text-center tw-mr-2 tw-mb-2 tw-p-2 tw-border-[1px] tw-rounded-full tw-cursor-not-allowed tw-text-neutral-300`}>
												<span>{item} - inches</span>
											</div>
										)
								)}
							</div>

							<div className="tw-flex tw-items-center">
								<span className="tw-mr-2">Quantity: </span>
								<div>
									<input
										type="number"
										name="quantity"
										id="quantity"
										value={_quantity}
										onChange={(e) => setQuantity(e.target.value)}
										placeholder="Quantity"
										className="tw-mt-5 tw-block tw-w-[50px] tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
									/>
								</div>
							</div>
							<div className="tw-mb-1">
								<span className="tw-text-3xl">${dealPrice * _quantity}</span>
							</div>
							<PaymentOptions price={price} />
							{error && (
								<div>
									<p className="tw-text-left tw-mb-2 tw-mt-5 tw-text-red-600 tw-text-xs">
										Please provide length and quantity for your order
									</p>
								</div>
							)}
							{isInCart(dealsProduct, cartItems) ? (
								<div
									className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[50%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
										!error && "tw-mt-5"
									}`}
									onClick={cartItems.length !== 0 ? IncreaseItem : null}>
									<span>Add more</span>
								</div>
							) : (
								<div
									className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[50%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
										!error && "tw-mt-5"
									}`}
									onClick={addToCart}>
									<span>Add to cart</span>
								</div>
							)}
							<div className="tw-mt-10">
								<Heading children="Product details" />
							</div>
							<div className="tw-grid tw-mt-5 tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3 md:tw-gap-x-10">
								{desc.map((item, idx) => (
									<div className="tw-flex tw-flex-col tw-mb-2 tw-text-sm tw-capitalize">
										<span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
											{item.key}:{" "}
										</span>
										<span>{item.value}</span>
									</div>
								))}
							</div>
							<div className="tw-mt-10">
								<Heading children="Maintenance" />
							</div>
							<div className="tw-grid tw-mt-5 tw-grid-cols-1 md:tw-grid-cols-2 md:tw-gap-x-10">
								{deals[0]?.maintenance.map((item, idx) => (
									<li
										key={idx}
										className="tw-text-sm tw-italic tw-text-neutral-500 tw-font-light tw-mb-2">
										{item}
									</li>
								))}
							</div>
						</div>
					</div>

					<Reviews category={category} />
				</div>
			</Layout>
		</>
	);
};

export default DealPage;
