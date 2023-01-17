import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import Card from "../components/Card4";
import axios from "axios";
import { selectCartItems } from "../slices/appSlices";
import { useSelector } from "react-redux";
import Add2CartPopup from "../components/shared/Add2CartPopup";
import SingleProductModal from "../components/shared/SingleProductModal";
import Reviews from "../components/shared/Reviews";
import { returnDecsriptionObject } from "../utils/returnObjectProperty";

function ClosureFrontal() {
	const [singleProducts, setSingleproducts] = React.useState(null);
	const [closureFrontal, setClosureFrontal] = React.useState([]);
	const [show, setShow] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [length, setLength] = React.useState("14");
	const [_color, setColor] = React.useState(null);
	const [singleCart, setSingleCart] = React.useState(null);
	const cartItems = useSelector(selectCartItems);

	const fetchProducts = useCallback(async () => {
		try {
			const {
				data: { products },
			} = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);
			const filtered = products.filter(
				(product) =>
					product.type.toLowerCase() === "closure" ||
					product.type.toLowerCase() === "frontal"
			);
			setClosureFrontal(filtered.sort((a, b) => a.name.localeCompare(b.name)));
		} catch (error) {
			console.log(error);
		}
	}, []);

	React.useEffect(() => {
		fetchProducts();
		setShow(true);
	}, [fetchProducts]);

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0);
	};
	const sizes = singleProducts?.[0].availablelength?.split(", ");

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name;
	const id = singleProducts?.[0] && singleProducts?.[0]?._id;
	const image = singleProducts?.[0] && singleProducts?.[0]?.images[0];
	const color = singleProducts?.[0] && singleProducts?.[0]?.color;
	const description = singleProducts?.[0] && singleProducts?.[0]?.description;
	const hairLength = length;
	const hairColor = _color;
	const quantity = 1;
	const price =
		singleProducts?.[0] &&
		singleProducts?.[0]?.price[singleProducts?.[0]?.length];

	const singleProduct = {
		name,
		id,
		image,
		hairColor,
		price,
		hairLength,
		description,
		quantity,
	};
	const desc = returnDecsriptionObject(singleProducts, "", name, color, sizes);

	return (
		<div className="home">
			<Helmet>
				<title>Indian-Hair-Closure&Frontal</title>
			</Helmet>
			<Layout>
				<div className="tw-pb-10 tw-pt-[110px] md:tw-pt-20 tw-h-full tw-relative tw-bg-[rgba(255,255,255,0.1)] tw-flex tw-flex-col tw-items-center tw-mx-auto ">
					<div className="tw-fixed tw-z-50 tw-top-0 md:tw-top-[-95px] tw-right-0 md:tw-right-[-30px]">
						<Add2CartPopup
							singleCart={singleCart}
							setSingleCart={setSingleCart}
							quantity
						/>
					</div>
					{show && closureFrontal && (
						<div className="tw-w-full tw-px-2">
							<div className="tw-grid tw-grid-cols-2 lg:tw-flex lg:tw-flex-wrap tw-items-center tw-justify-center tw-gap-2 md:tw-gap-5">
								{closureFrontal.map((item) => (
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
							<Reviews category="closure-frontal" color="white" />
						</div>
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
							desc={desc}
							sizes={sizes}
							setLength={setLength}
							setError={setError}
							error={error}
							singleProduct={singleProduct}
							cartItems={cartItems}
							setColor={setColor}
							price={price}
							length={length}
							color={_color}
							setSingleCart={setSingleCart}
						/>
					)}
				</div>
			</Layout>
		</div>
	);
}

export default ClosureFrontal;
