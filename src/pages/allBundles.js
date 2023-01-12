import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Layout from "../components/shared/Layout";
import Card from "../components/Card2";
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from "../slices/appSlices";
import { useDispatch, useSelector } from "react-redux";
import Add2CartPopup from "../components/shared/Add2CartPopup";
import SingleProductModal from "../components/shared/SingleProductModal";
import Reviews from "../components/shared/Reviews";
import SearchInput from "../components/shared/SearchInput";
import { Link } from "react-router-dom";
import { RiSendPlaneFill } from "react-icons/ri";
import Heading from "../components/Heading";
import { fetchSalesPercentage } from "../utils/salesPercentageNumber";

function IndianBundles() {
	const [hairBundles, setHairBundles] = React.useState([]);
	const [hairBundlesByPriceLow2High, setHairBundlesByPriceLow2High] =
		React.useState([]);
	const [searchFiltered, setSearchFiltered] = React.useState([]);
	const [searchError, setSearchError] = React.useState(false);
	const [searchControl, setSearchControl] = React.useState(false);
	const [singleProducts, setSingleproducts] = React.useState(null);
	const [singleCart, setSingleCart] = React.useState(null);
	const [show, setShow] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [sales, setSales] = React.useState(null);
	const [length, setLength] = React.useState("14");
	const [priceFilter, setPriceFilter] = React.useState("");
	const [priceRangeFilter, setPriceRangeFilter] = React.useState({
		from: "",
		to: "",
	});
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);

			const filtered = products.filter((product) =>
				product.type.toLowerCase().includes("hair bundles")
			);
			setHairBundles(filtered.sort((a, b) => a.name.localeCompare(b.name)));
		} catch (error) {
			console.log(error);
		}
	}

	React.useEffect(() => {
		setSales(fetchSalesPercentage());

		window.scrollTo(0, 0);
		fetchProducts();
		setShow(true);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0);
	};
	const sizes = singleProducts?.[0].availablelength.split(", ");

	let cardPrice =
		sales !== 0 && singleProducts?.[0]?.sales
			? singleProducts?.[0]?.price - singleProducts?.[0]?.price * (sales / 100)
			: singleProducts?.[0]?.price;

	let _price;

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

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name;
	const id = singleProducts?.[0] && singleProducts?.[0]?._id;
	const image = singleProducts?.[0] && singleProducts?.[0]?.images[0];
	const color = singleProducts?.[0] && singleProducts?.[0]?.color;
	const description = singleProducts?.[0] && singleProducts?.[0]?.description;
	const hairLength = length;
	const hairColor = color;
	const hairTexture = singleProducts?.[0] && singleProducts?.[0]?.name;
	const price = Number(_price);

	const singleProduct = {
		name,
		id,
		image,
		hairColor,
		price,
		hairLength,
		description,
		hairTexture,
	};

	let myTimeOut;
	const addToCart = () => {
		clearTimeout(myTimeOut);
		if (length) {
			dispatch(addToCartItem(singleProduct));
			myTimeOut = setTimeout(() => {
				setSingleCart(singleProduct);
			}, 1000);
		} else {
			setError(true);
		}
	};

	const IncreaseItem = () => {
		clearTimeout(myTimeOut);
		if (length) {
			dispatch(increaseCartItem(singleProduct));
			myTimeOut = setTimeout(() => {
				setSingleCart(singleProduct);
			}, 1000);
		} else {
			setError(true);
		}
	};

	const desc = [
		{ key: "Brand", value: `raw ${singleProducts?.[0]?.brand} hair` },
		{ key: "Hair Texture", value: name },
		{ key: "Hair Color", value: color },
		{
			key: "Hair Length",
			value: `Available from ${sizes?.[0]}" - ${
				sizes?.[sizes.length - 1]
			}" inches`,
		},
		{ key: "Material", value: "100% Human Hair" },
		{ key: "Density", value: "150% - 200%" },
		{ key: "Cap Size", value: "Average Size(Head circumference: 54cm - 58cm" },
		{ key: "Can be bleached dyed", value: "Yes" },
		{
			key: "Delivery time",
			value:
				"We usually ship the order within 24 hours after order confirmation, except for weekends and holidays - (order confirmation is within 2 weeks)",
		},
		{
			key: "Return policy",
			value:
				"We accept 10-days no reason return exchange with hair not been used",
		},
	];
	const priceList = [
		"Select Sort Direction",
		"price from low - high",
		"price from high - low",
	];

	const handleOnChange = (e) => {
		setPriceFilter(e.target.value);

		if (e.target.value === "" || e.target.value === "Select Sort Direction")
			setHairBundlesByPriceLow2High(
				hairBundles.sort((a, b) => a.name.localeCompare(b.name))
			);
		if (e.target.value) {
			// eslint-disable-next-line array-callback-return
			if (e.target.value === "price from low - high") {
				setHairBundlesByPriceLow2High(
					hairBundles.sort((a, b) => a.price - b.price)
				);
			} else if (e.target.value === "price from high - low") {
				const reversed = hairBundles
					.sort((a, b) => a.price - b.price)
					.reverse();
				setHairBundlesByPriceLow2High(reversed);
			}
		}
	};
	const handleOnChangePrice = (e) => {
		setPriceRangeFilter({
			...priceRangeFilter,
			[e.target.name]: Number(e.target.value),
		});
	};
	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (priceRangeFilter?.from === 0 && priceRangeFilter?.to === 0) return;
		if (priceRangeFilter?.from && priceRangeFilter?.to) {
			const array = [];
			// eslint-disable-next-line array-callback-return
			hairBundles.filter((product) => {
				if (
					product?.price >= priceRangeFilter?.from &&
					product?.price <= priceRangeFilter?.to
				) {
					array.push(product);
				}
			});
			setHairBundlesByPriceLow2High(array);
		}
	};

	const handleReset = () => {
		setPriceRangeFilter({
			from: "",
			to: "",
		});
		setHairBundlesByPriceLow2High(
			hairBundles.sort((a, b) => a.name.localeCompare(b.name))
		);
	};

	const BundlesByPriceLow2High =
		hairBundlesByPriceLow2High.length > 0
			? hairBundlesByPriceLow2High
			: hairBundles;

	return (
		<div className="home">
			<Helmet>
				<title>Indian-Hair-Bundles</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? `${
									hairBundles.length === 0 && !show
										? "tw-pt-[230px]"
										: "tw-pt-[155px]"
							  } tw-pb-10 md:tw-pt-[120px] tw-h-full tw-relative tw-flex tw-flex-col tw-items-center tw-mx-auto tw-bg-[rgba(255,255,255,0.1)]`
							: "tw-pb-10 tw-pt-[110px] md:tw-pt-20 tw-h-full tw-relative  tw-flex tw-flex-col tw-items-center tw-mx-auto tw-bg-[rgba(255,255,255,0.1)]"
					}>
					{show && hairBundles && (
						<>
							<div className="tw-fixed tw-z-50 tw-top-0 md:tw-top-[-95px] tw-right-0 md:tw-right-[-30px]">
								<Add2CartPopup
									singleCart={singleCart}
									setSingleCart={setSingleCart}
									quantity="1"
								/>
							</div>
							<div className="tw-pt-[30px] md:tw-pt-[40px]">
								<div
									className={`${searchControl && "tw-w-[100%] lg:tw-w-[40%]"} ${
										sales
											? "tw-top-[105px] md:tw-top-[80px]"
											: "tw-top-[60px] md:tw-top-[30px]"
									} tw-flex tw-flex-col content tw-fixed tw-left-[-9px] md:tw-left-[77px] tw-z-10 tw-ease-in tw-duration-300 2xl:tw-ml-10 tw-mt-[20px]`}>
									<SearchInput
										allProducts={hairBundles}
										searchControl={searchControl}
										setFiltered={setSearchFiltered}
										setSearchControl={setSearchControl}
										setSearchError={setSearchError}
									/>

									{searchError && (
										<div className="tw-bg-white tw-text-black tw-ml-[1px] tw-w-[79.7%] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
											<p className="tw-text-[13px] md:tw-text-[14px] tw-text-red-700 tw-p-3 tw-pl-5">
												No Result Found !
											</p>
										</div>
									)}
									{searchFiltered?.length !== 0 && !searchError && (
										<div className="tw-bg-white tw-text-black tw-ml-[1px] tw-w-[79.7%] tw-overflow-y-scroll tw-max-h-[400px] md:tw-max-h-[600px] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
											{searchFiltered.map((item) => (
												<Link to={item?.route} key={item?._id}>
													<div className="tw-flex tw-items-center tw-p-3 tw-border-b-[1px] tw-w-[100%] tw-mx-auto hover:tw-bg-[rgba(215,191,137,0.3)] tw-ease-in tw-duration-300">
														<div className="tw-mr-3">
															<img
																src={item?.image}
																alt={item?.name}
																className="tw-object-cover tw-w-[40px] tw-h-[40px] tw-rounded-full"
															/>
														</div>
														<div>
															<p className="tw-text-[13px] md:tw-text-[14px]">
																{item?.name}
															</p>
															<p className="tw-text-[13px] md:tw-text-[14px]">
																<span className="tw-text-xs tw-font-light">
																	Starting from
																</span>{" "}
																${item?.price}
															</p>
														</div>
													</div>
												</Link>
											))}
											<Link to="/all-bundles">
												<div className="tw-pr-5 tw-py-3 tw-border-b-[1px] tw-w-[90%] tw-mx-auto">
													<span className="tw-text-[13px] md:tw-text-[14px] tw-text-[#bba371] hover:tw-text-black tw-ease-in tw-duration-300">
														View all bundles
													</span>
												</div>
											</Link>
										</div>
									)}
								</div>
								<div className=" tw-flex tw-items-top tw-text-neutral-400">
									<div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center">
										<div className="tw-flex tw-flex-row tw-items-center tw-mb-1 md:tw-mb-0">
											<span className="tw-tracking-wider tw-font-light tw-text-sm tw-mr-2">
												Price:
											</span>
											<select
												className="tw-bg-transparent tw-w-[190px] tw-max-w-[220px] tw-block tw-mr-5 tw-pl-2 md:tw-px-2 tw-py-1 tw-border-[1px] tw-border-[#bba371] tw-rounded-[3px] tw-text-white tw-text-sm tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-none focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0"
												onChange={handleOnChange}
												id="from - to"
												value={priceFilter}
												name="from - to">
												{priceList.map((price, idx) => (
													<option key={idx}>{price}</option>
												))}
											</select>
										</div>
										<div className="tw-flex tw-flex-row tw-items-center tw-mt-3 md:tw-mt-0">
											<span className="tw-tracking-wider tw-font-light tw-text-sm tw-mr-2">
												Range:
											</span>
											<form
												onSubmit={handleFormSubmit}
												className="tw-flex tw-flex-row tw-items-center">
												<input
													className="tw-bg-transparent tw-w-[75px] tw-max-w-[110px] tw-block tw-mr-1 md:tw-px-2 tw-py-1 tw-border-[1px] tw-border-[#bba371] tw-rounded-[3px] tw-text-white tw-text-sm tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-none focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0 placeholder:tw-text-white placeholder:tw-mr-2"
													type="number"
													onChange={handleOnChangePrice}
													id="from"
													value={priceRangeFilter?.from}
													name="from"
													placeholder="From"
												/>
												<input
													className="tw-bg-transparent tw-w-[60px] tw-max-w-[100px] tw-block tw-mr-5 md:tw-px-2 tw-py-1 tw-border-[1px] tw-border-[#bba371] tw-rounded-[3px] tw-text-white tw-text-sm tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-none focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0 placeholder:tw-text-white placeholder:tw-mr-2"
													type="number"
													onChange={handleOnChangePrice}
													id="to"
													value={priceRangeFilter?.to}
													name="to"
													placeholder="To"
												/>
												<button
													type="submit"
													className="tw-border-[1px] tw-border-[#bba371] tw-p-1 tw-rounded-full tw-text-[#bba371] tw-text-xl hover:md:tw-border-neutral-700 tw-ease-in tw-duration-300">
													<RiSendPlaneFill />
												</button>
												<button
													className="tw-ml-10 tw-text-xs tw-text-[#bba371] hover:md:tw-text-neutral-600 tw-ease-in tw-duration-300"
													onClick={handleReset}>
													<p>Reset All</p>
												</button>
											</form>
										</div>
									</div>
								</div>
							</div>

							<div className="tw-w-full md:tw-w-[90%] tw-pt-5 tw-text-center md:tw-text-left tw-pb-3 tw-mt-[30px] tw-border-t-[1px] tw-border-neutral-600">
								<Heading
									children="All Indian Bundles"
									isWhite={true}
									size5={true}
									// isBold={true}
								/>
							</div>
							<div className="tw-w-full tw-px-2">
								<div className="tw-grid tw-grid-cols-2 lg:tw-flex lg:tw-flex-wrap tw-items-center tw-justify-center tw-gap-2 md:tw-gap-5">
									{BundlesByPriceLow2High.map((item) => (
										<div key={item._id}>
											<Card
												sales={sales}
												key={item._id}
												product={item}
												setSingleproducts={setSingleproducts}
												setSingleCart={setSingleCart}
												scrollToTop={scrollToTop}
											/>
										</div>
									))}
								</div>
								<Reviews category="hair-bundles" color="white" />
							</div>
						</>
					)}
					{!show && (
						<div className="tw-rounded-full progress">
							<div className="inner"></div>
						</div>
					)}

					{singleProducts && (
						<SingleProductModal
							category={singleProducts?.[0]?.name}
							singleProducts={singleProducts}
							setSingleproducts={setSingleproducts}
							sales={sales}
							desc={desc}
							sizes={sizes}
							setLength={setLength}
							setError={setError}
							error={error}
							singleProduct={singleProduct}
							cartItems={cartItems}
							IncreaseItem={IncreaseItem}
							addToCart={addToCart}
							price={_price}
							length={length}
						/>
					)}
				</div>
			</Layout>
		</div>
	);
}

export default IndianBundles;
