import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import Card from "../components/Card2";
import { selectCartItems } from "../slices/appSlices";
import { useSelector } from "react-redux";
import Add2CartPopup from "../components/shared/Add2CartPopup";
import SingleProductModal from "../components/shared/SingleProductModal";
import Reviews from "../components/shared/Reviews";
import SearchInput from "../components/shared/SearchInput";
import { RiSendPlaneFill } from "react-icons/ri";
import Heading from "../components/Heading";
import { fetchSalesPercentage } from "../utils/salesPercentageNumber";
import SearchDropDown from "../components/shared/SearchDropDown";
import useFetchHook from "../utils/useFetchHook";
import { returnDecsriptionObject } from "../utils/returnObjectProperty";

function IndianBundles() {
	const [hairBundles, setHairBundles] = React.useState([]);
	const [hairBundlesByPriceLow2High, setHairBundlesByPriceLow2High] =
		React.useState([]);
	const [close, setClose] = React.useState(false);
	const [searchFiltered, setSearchFiltered] = React.useState([]);
	const [searchError, setSearchError] = React.useState(false);
	const [searchControl, setSearchControl] = React.useState(false);
	const [singleProducts, setSingleproducts] = React.useState(null);
	const [singleCart, setSingleCart] = React.useState(null);
	const [show, setShow] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [sales, setSales] = React.useState(null);
	const [length, setLength] = React.useState(14);
	const [priceFilter, setPriceFilter] = React.useState("");
	const [inputValue, setInputValue] = React.useState("");
	const [priceRangeFilter, setPriceRangeFilter] = React.useState({
		from: "",
		to: "",
	});
	const cartItems = useSelector(selectCartItems);

	// Getting products from db
	const url1 = `${process.env.REACT_APP_BASE_ROUTE}/products`;
	const productsRes = useFetchHook(url1, "products", false, false, true);
	const fetchProducts = useCallback(async () => {
		setHairBundles(productsRes);
	}, [productsRes]);

	React.useEffect(() => {
		setSales(fetchSalesPercentage());

		window.scrollTo(0, 0);
		fetchProducts();
		setShow(true);
	}, [fetchProducts]);

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0);
	};
	const sizes = singleProducts?.[0].availablelength.split(", ");

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name;
	const id = singleProducts?.[0] && singleProducts?.[0]?._id;
	const image = singleProducts?.[0] && singleProducts?.[0]?.images[0];
	const color = singleProducts?.[0] && singleProducts?.[0]?.color;
	const description = singleProducts?.[0] && singleProducts?.[0]?.description;
	const hairLength = length;
	const hairColor = color;
	const hairTexture = singleProducts?.[0] && singleProducts?.[0]?.name;
	const price = singleProducts?.[0]?.price[length];

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

	const desc = returnDecsriptionObject(singleProducts, "", name, color, sizes);
	const priceList = [
		"Default Sort Direction",
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
					hairBundles.sort(
						(a, b) =>
							a.price[a?.length.split(", ")?.[0] || a?.length] -
							b.price[a?.length.split(", ")?.[0] || a?.length]
					)
				);
			} else if (e.target.value === "price from high - low") {
				const reversed = hairBundles
					.sort(
						(a, b) =>
							a.price[a?.length.split(", ")?.[0] || a?.length] -
							b.price[a?.length.split(", ")?.[0] || a?.length]
					)
					.reverse();
				setHairBundlesByPriceLow2High(reversed);
			}
		}
	};
	const handleOnChangePrice = (e) => {
		setPriceRangeFilter({
			...priceRangeFilter,
			[e.target.name]: +e.target.value,
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
					product?.price[
						product?.length?.split(", ")?.[0] || product?.length
					] >= priceRangeFilter?.from &&
					product?.price[
						product?.length?.split(", ")?.[0] || product?.length
					] <= priceRangeFilter?.to
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
				<div className="tw-pb-10 tw-pt-[110px] md:tw-pt-20 tw-h-full tw-relative  tw-flex tw-flex-col tw-items-center tw-mx-auto tw-bg-[rgba(255,255,255,0.1)]">
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
									className={`${
										searchControl && "tw-w-[100%] lg:tw-w-[40%]"
									} "tw-top-[60px] md:tw-top-[30px]"
									} tw-flex tw-flex-col content tw-fixed tw-left-[-9px] md:tw-left-[77px] tw-z-10 tw-ease-in tw-duration-300 2xl:tw-ml-10 tw-mt-[20px]`}>
									<SearchInput
										allProducts={hairBundles && hairBundles}
										searchControl={searchControl}
										close={close}
										setFiltered={setSearchFiltered}
										setSearchControl={setSearchControl}
										setClose={setClose}
										setSearchError={setSearchError}
										inputValue={inputValue}
										setInputValue={setInputValue}
									/>

									{searchError && (
										<div className="tw-bg-white tw-text-black tw-ml-[1px] tw-w-[79.7%] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
											<p className="tw-text-[13px] md:tw-text-[14px] tw-text-red-700 tw-p-3 tw-pl-5">
												No Result Found !
											</p>
										</div>
									)}
									{searchFiltered?.length !== 0 && inputValue && (
										<SearchDropDown filtered={searchFiltered} />
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

							<div className="tw-w-full md:tw-w-[90%] tw-pt-8 tw-text-center md:tw-text-left tw-pb-3 tw-mt-[30px] tw-border-t-[1px] tw-border-neutral-600">
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
							setSingleCart={setSingleCart}
							desc={desc}
							sizes={sizes}
							setLength={setLength}
							setError={setError}
							error={error}
							singleProduct={singleProduct}
							cartItems={cartItems}
							price={price}
							length={length}
						/>
					)}
				</div>
			</Layout>
		</div>
	);
}

export default IndianBundles;
