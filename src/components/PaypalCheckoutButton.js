import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { DISCOUNT_PERCENTAGE } from "../constant";
import { useGlobalContext } from "../context/useContextHook";

export default function PayplaCheckoutButton({
	price,
	tax,
	shipCost,
	cartItems,
	setRedirect,
	setPageCancel,
	shipMethod,
	discountPrice,
	itemCount,
}) {
	const { fetchSalesPercentage } = useGlobalContext();
	React.useEffect(() => {
		localStorage.removeItem("payload");
	}, []);
	const [order_id, setOrder_id] = React.useState(null);

	return (
		<div id="paypal-button-container" className=" tw-drop-shadow-lg">
			<PayPalButtons
				style={{
					color: "silver",
					label: "checkout",
					shape: "pill",
					// tagline: false,
					// layout: "horizontal",
				}}
				// Order is created on the server and the order id is returned
				createOrder={(data, actions) => {
					return fetch("/.netlify/functions/create-order", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							priceCost: discountPrice ? discountPrice : price,
							discountPrice,
							taxCost: tax,
							shipCost: shipCost,
							cartItems: cartItems,
							shipMethod: shipMethod,
							discountPercentage: fetchSalesPercentage() && DISCOUNT_PERCENTAGE,
							itemCount,
						}),
					})
						.then((response) => {
							if (response.ok) return response.json();
							return response.json().then((json) => Promise.reject(json));
						})
						.then(({ id }) => {
							setOrder_id(id);
							localStorage.setItem("payload", id);
							console.log(id);
							return id;
						})
						.catch((e) => {
							console.log(e.error);
						});
				}}
				// Finalize the transaction on the server after payer approval
				onApprove={function (data, actions) {
					const orderId = localStorage.getItem("payload");
					if (order_id || orderId) {
						return actions.order
							.capture()
							.then((details) => {
								console.log(details);
								const tansactionId =
									details.purchase_units[0].payments.captures[0].id;

								if (tansactionId) {
									const paypalShippingAddress =
										details.purchase_units[0].shipping.address;

									const customerName =
										details.purchase_units[0].shipping.name.full_name;

									localStorage.setItem(
										"addressFromPaypal",
										JSON.stringify(paypalShippingAddress)
									);

									localStorage.setItem("paymentName", customerName);

									setRedirect(true);
								}
							})
							.catch((e) => {
								console.log(e.error);
							});
					} else {
						console.log("Order id not found!");
					}
				}}
				onCancel={() => {
					setPageCancel(true);
				}}
			/>
		</div>
	);
}
