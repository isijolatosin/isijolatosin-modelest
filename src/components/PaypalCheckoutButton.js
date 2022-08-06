import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { DISCOUNT_PERCENTAGE } from '../constant'

export default function PayplaCheckoutButton({
	shippingFee,
	totalPrice,
	tax,
	cartItems,
	setRedirect,
	setPageCancel,
	shipMethod,
	discountPrice,
	sales,
}) {
	React.useEffect(() => {
		localStorage.removeItem('payload')
	}, [])
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
							discountPercentage: discountPrice && DISCOUNT_PERCENTAGE,
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
					const orderId = localStorage.getItem('payload')
					return fetch('/.netlify/functions/create-pay', {
						method: 'post',
						body: JSON.stringify({
							id: orderId,
						}),
					})
						.then((response) => {
							if (response.ok) return response.json()
							return response.json().then((json) => Promise.reject(json))
						})
						.then(({ response }) => {
							const tansactionId =
								response.purchase_units[0].payments.captures[0].id

							if (tansactionId) {
								const paypalShippingAddress =
									response.purchase_units[0].shipping.address

								const customerName =
									response.purchase_units[0].shipping.name.full_name

								localStorage.setItem(
									'addressFromPaypal',
									JSON.stringify(paypalShippingAddress)
								)

								localStorage.setItem('paymentName', customerName)

								setRedirect(true)
							}
						})
						.catch((e) => {
							console.log(e.error)
						})
				}}
				onCancel={() => {
					setPageCancel(true)
				}}
			/>
		</div>
	)
}
