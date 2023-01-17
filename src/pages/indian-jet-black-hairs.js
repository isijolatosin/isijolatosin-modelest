import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import Card from "../components/Card3";
import { selectCartItems } from "../slices/appSlices";
import { useSelector } from "react-redux";
import Add2CartPopup from "../components/shared/Add2CartPopup";
import SingleProductModal from "../components/shared/SingleProductModal";
import Reviews from "../components/shared/Reviews";
import { returnDecsriptionObject } from "../utils/returnObjectProperty";
import useFetchHook from "../utils/useFetchHook";

function IndianJetBlackHair() {
	const [singleProducts, setSingleproducts] = React.useState(null);
	const [jetBlackHair, setJetBlackHair] = React.useState([]);
	const [error, setError] = React.useState(false);
	const [length, setLength] = React.useState("14");
	const cartItems = useSelector(selectCartItems);
	const [singleCart, setSingleCart] = React.useState(null);

	// Getting products from db
	const url1 = `${process.env.REACT_APP_BASE_ROUTE}/products`;
	const productsRes = useFetchHook(url1, "products", false, true);
	const fetchProducts = useCallback(async () => {
		setJetBlackHair(productsRes);
	}, [productsRes]);

	React.useEffect(() => {
		fetchProducts();
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
	const price = singleProducts?.[0]?.price[+length];
	const hairLength = length;
	const hairColor = color;
	const hairTexture = singleProducts?.[0] && singleProducts?.[0]?.name;

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
	return (
		<div className="home">
			<Helmet>
				<title>Indian-Hair-Jet-Black&Blonde</title>
			</Helmet>
			<Layout>
				<div className="tw-pb-10 tw-pt-[110px] md:tw-pt-20 tw-h-full tw-relative tw-flex tw-flex-col tw-items-center tw-mx-auto tw-bg-[rgba(255,255,255,0.1)]">
					<div className="tw-fixed tw-z-50 tw-top-0 md:tw-top-[-95px] tw-right-0 md:tw-right-[-30px]">
						<Add2CartPopup
							singleCart={singleCart}
							setSingleCart={setSingleCart}
							quantity="1"
						/>
					</div>
					{jetBlackHair ? (
						<div className="tw-w-full tw-px-2">
							<div className="tw-grid tw-grid-cols-2 lg:tw-flex lg:tw-flex-wrap tw-items-center tw-justify-center tw-gap-2 md:tw-gap-5">
								{jetBlackHair.map((item) => (
									<div key={item._id}>
										<Card
											key={item._id}
											product={item}
											setSingleproducts={setSingleproducts}
											setSingleCart={setSingleCart}
											scrollToTop={scrollToTop}
										/>
									</div>
								))}
							</div>
							<Reviews category="jet-black-&-blonde-hair" color="white" />
						</div>
					) : (
						<div className="tw-rounded-full progress">
							<div className="inner"></div>
						</div>
					)}
					{singleProducts && (
						<SingleProductModal
							category={singleProducts?.[0]?.name}
							singleProducts={singleProducts}
							setSingleproducts={setSingleproducts}
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

export default IndianJetBlackHair;
