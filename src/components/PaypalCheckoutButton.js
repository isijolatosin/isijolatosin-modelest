import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'

export default function PayplaCheckoutButton({
	shippingFee,
	totalPrice,
	tax,
	cartItems,
	setRedirect,
	setPageCancel,
	shipMethod,
	sales,
}) {
	// React.useEffect(() => {
	// 	if (cartItems) {
	// 		window.paypal
	// 			.Buttons({
	// 				// Order is created on the server and the order id is returned
	// 				createOrder: (data, actions) => {
	// 					return fetch('/.netlify/functions/create-order', {
	// 						method: 'post',
	// 						body: JSON.stringify({
	// 							total: totalPrice,
	// 							tax: tax,
	// 							ship: shippingFee,
	// 							cartItems: cartItems,
	// 						}),
	// 					})
	// 						.then((response) => {
	// 							if (response.ok) return response.json()
	// 							return response.json().then((json) => Promise.reject(json))
	// 						})
	// 						.then(({ id }) => {
	// 							console.log(id)
	// 							return id
	// 						})
	// 						.catch((e) => {
	// 							console.log(e.error)
	// 						})
	// 				},
	//
	// 				// Finalize the transaction on the server after payer approval
	// 				onApprove: function (data, actions) {
	// 					return actions.order.capture().then(function (details) {
	// 						console.log(
	// 							'Transaction completed by ' + details.payer.name.given_name
	// 						)
	// 					})
	// 				},
	// 			})
	// 			.render('#paypal-button-container')
	// 	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [totalPrice])

	return (
		<div id="paypal-button-container" className=" tw-drop-shadow-lg">
			<PayPalButtons
				style={{
					color: 'silver',
					label: 'checkout',
					shape: 'pill',
				}}
				// Order is created on the server and the order id is returned
				createOrder={(data, actions) => {
					return fetch('/.netlify/functions/create-order', {
						method: 'post',
						body: JSON.stringify({
							total: totalPrice,
							tax: tax,
							ship: shippingFee,
							cartItems: cartItems,
							shipMethod: shipMethod,
							discountRate: 15,
						}),
					})
						.then((response) => {
							if (response.ok) return response.json()
							return response.json().then((json) => Promise.reject(json))
						})
						.then(({ id }) => {
							localStorage.setItem('payload', id)
							return id
						})
						.catch((e) => {
							console.log(e.error)
						})
				}}
				// Finalize the transaction on the server after payer approval
				onApprove={function (data, actions) {
					return actions.order.capture().then(function (orderData) {
						const transaction = orderData.purchase_units[0].payments.captures[0]
						const name = orderData.payer.name.given_name
						if (transaction.id) {
							setRedirect(true)
						}
						localStorage.setItem('paymentName', name)
					})
				}}
				onCancel={() => {
					setPageCancel(true)
				}}
			/>
		</div>
	)
}
