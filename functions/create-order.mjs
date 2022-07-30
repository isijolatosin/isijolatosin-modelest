import fetch from 'node-fetch'

require('dotenv').config()

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const APP_SECRET = process.env.PAYPAL_CLIENT_SECRET
const base = process.env.BASE_URL

let price

// create a new order
export async function handler(event, context) {
	const data = JSON.parse(event.body)
	const totalFromRedux = data.cartItems.reduce(
		(total, prod) => total + prod.price * prod.quantity,
		0
	)

	if (totalFromRedux === data.total / 100) {
		price = (data.total + data.tax + data.ship) / 100

		const order = await createOrder()
		return {
			statusCode: 200,
			body: JSON.stringify({ id: order.id }),
		}
	}
}

//////////////////////
// PayPal API helpers
//////////////////////

// use the orders api to create an order
async function createOrder() {
	const accessToken = await generateAccessToken()
	const url = `${base}/v2/checkout/orders`
	const response = await fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify({
			intent: 'CAPTURE',
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: price || '100',
					},
				},
			],
		}),
	})
	const data = await response.json()
	return data
}

// use the orders api to capture payment for an order
// async function capturePayment(orderId) {
// 	const accessToken = await generateAccessToken()
// 	const url = `${base}/v2/checkout/orders/${orderId}/capture`
// 	const response = await fetch(url, {
// 		method: 'post',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Authorization: `Bearer ${accessToken}`,
// 		},
// 	})
// 	const data = await response.json()
// 	return data
// }

// generate an access token using client id and app secret
async function generateAccessToken() {
	const auth = Buffer.from(CLIENT_ID + ':' + APP_SECRET).toString('base64')
	const response = await fetch(`${base}/v1/oauth2/token`, {
		method: 'post',
		body: 'grant_type=client_credentials',
		headers: {
			Authorization: `Basic ${auth}`,
		},
	})
	const data = await response.json()
	return data.access_token
}
