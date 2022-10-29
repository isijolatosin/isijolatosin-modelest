/* eslint-disable no-unused-expressions */
// const fetch = require("node-fetch");
require("dotenv").config();
const paypal = require("@paypal/checkout-server-sdk");

// const base = process.env.BASE_URL || "https://api-m.paypal.com";

const Environment =
	process.env.NODE_ENV === "production"
		? paypal.core.LiveEnvironment
		: paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
	new Environment(
		process.env.PAYPAL_CLIENT_ID,
		process.env.PAYPAL_CLIENT_SECRET
	)
);

// create a new order
let price;
exports.handler = async function (event, context) {
	const data = JSON.parse(event.body);
	const {
		priceCost,
		taxCost,
		shipCost,
		cartItems,
		shipMethod,
		discountPrice,
		discountPercentage,
	} = data;
	const totalFromRedux = cartItems.reduce(
		(total, prod) => total + prod.price * prod.quantity,
		0
	);
	const discountedPrice =
		discountPrice &&
		discountPercentage &&
		totalFromRedux - totalFromRedux * (discountPercentage / 100);

	if (discountedPrice === priceCost || totalFromRedux === priceCost) {
		shipMethod === "ship"
			? (price = priceCost + taxCost + shipCost)
			: (price = priceCost + taxCost);

		const request = new paypal.orders.OrdersCreateRequest();
		request.prefer("return=representation");
		request.requestBody({
			intent: "CAPTURE",
			purchase_units: [
				{
					amount: {
						currency_code: "USD",
						value: Math.floor(price),
						breakdown: {
							item_total: {
								currency_code: "USD",
								value: Math.floor(price),
							},
						},
					},
					items: cartItems.map((item) => {
						let itemPrice;
						shipMethod === "ship"
							? (itemPrice = item.price + taxCost + shipCost)
							: (itemPrice = item.price + taxCost);

						return {
							name: item?.name,
							unit_amount: {
								currency_code: "USD",
								value: Math.floor(itemPrice),
							},
							quantity: item.quantity,
						};
					}),
				},
			],
		});
		try {
			const order = await paypalClient.execute(request);
			return {
				statusCode: 200,
				body: JSON.stringify({ id: order.result.id }),
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ msg: error.message }),
			};
		}
	}
};
