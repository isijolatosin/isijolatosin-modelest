import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import Card from "../components/Card2";
import { selectCartItems } from "../slices/appSlices";
import { useSelector } from "react-redux";
import Add2CartPopup from "../components/shared/Add2CartPopup";
import SingleProductModal from "../components/shared/SingleProductModal";
import Reviews from "../components/shared/Reviews";
import {
	returnDecsriptionObject,
	returnObjectProperty,
} from "../utils/returnObjectProperty";
import useFetchHook from "../utils/useFetchHook";
import { roundTo2Dec } from "../utils/roundTo2Dec";

function IndianBundles() {
	const [hairBundles, setHairBundles] = React.useState([]);
	const [singleProduct, setSingleproduct] = React.useState(null);
	const [singleCart, setSingleCart] = React.useState(null);
	const [error, setError] = React.useState(false);
	const [length, setLength] = React.useState("14");
	const cartItems = useSelector(selectCartItems);

	const url1 = `${process.env.REACT_APP_BASE_ROUTE}/products`;
	const indianRes = useFetchHook(url1, "products", true);
	const fetchProducts = useCallback(async () => {
		const filtered = indianRes.filter((hr) => !hr.with);
		setHairBundles(filtered);
	}, [indianRes]);

	React.useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0);
	};

	// Adding to cart items
	const { name, id, image, color, description, size, avesizes, salespercent } =
		returnObjectProperty(singleProduct?.[0]);
	const hairLength = length;
	const hairColor = color;
	const hairTexture = singleProduct?.[0] && singleProduct?.[0]?.name;
	const productPrice = singleProduct?.[0]?.price[+length];
	const price = salespercent
		? roundTo2Dec(productPrice - productPrice * (salespercent / 100))
		: productPrice;

	const _singleProduct = {
		name,
		id,
		image,
		hairColor,
		price,
		hairLength,
		description,
		hairTexture,
		salespercent,
	};

	const desc = returnDecsriptionObject(
		singleProduct,
		"",
		name,
		color,
		avesizes
	);

	return (
		<div className="home">
			<Helmet>
				<title>Indian-Hair-Bundles</title>
			</Helmet>
			<Layout>
				<div className="tw-pb-10 tw-pt-[110px] md:tw-pt-20 tw-h-full tw-relative  tw-flex tw-flex-col tw-items-center tw-mx-auto tw-bg-[rgba(255,255,255,0.1)]">
					<div className="tw-fixed tw-z-50 tw-top-0 md:tw-top-[-95px] tw-right-0 md:tw-right-[-30px]">
						<Add2CartPopup
							singleCart={singleCart}
							setSingleCart={setSingleCart}
							quantity="1"
						/>
					</div>
					{hairBundles?.length ? (
						<div className="tw-w-full tw-px-2">
							<div className="tw-grid tw-grid-cols-2 lg:tw-flex lg:tw-flex-wrap tw-items-center tw-justify-center tw-gap-2 md:tw-gap-5">
								{hairBundles?.map((item) => (
									<div key={item._id}>
										<Card
											product={item}
											setSingleproduct={setSingleproduct}
											setSingleCart={setSingleCart}
											scrollToTop={scrollToTop}
										/>
									</div>
								))}
							</div>
							<Reviews category="hair-bundles" color="white" />
						</div>
					) : (
						<div className="tw-rounded-full progress">
							<div className="inner"></div>
						</div>
					)}

					{singleProduct && (
						<SingleProductModal
							category={singleProduct?.[0]?.name}
							singleProduct={singleProduct}
							setSingleproduct={setSingleproduct}
							desc={desc}
							size={size}
							avesizes={avesizes}
							setLength={setLength}
							setError={setError}
							error={error}
							_singleProduct={_singleProduct}
							setSingleCart={setSingleCart}
							cartItems={cartItems}
							price={price}
							length={length}
							color={color}
						/>
					)}
				</div>
			</Layout>
		</div>
	);
}

export default IndianBundles;
