import fetch from 'node-fetch'

require('dotenv').config()

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const APP_SECRET = process.env.PAYPAL_CLIENT_SECRET
const base = 'https://api-m.paypal.com'
// const base = process.env.BASE_URL || 'https://api-m.paypal.com'

let price

// create a new order
export async function handler(event, context) {
	const data = JSON.parse(event.body)
	const totalFromRedux = data.cartItems.reduce(
		(total, prod) => total + prod.price * prod.quantity,
		0
	)

	const discountedPrice = data.discountPercentage
		? totalFromRedux - totalFromRedux * (data.discountPercentage / 100)
		: totalFromRedux

	if (discountedPrice === data.total / 100) {
		data.shipMethod === 'ship'
			? (price = (data.total + data.tax + data.ship) / 100)
			: (price = (data.total + data.tax) / 100)

		const order = await createOrder()

		return {
			statusCode: 200,
			body: JSON.stringify({ id: order.id }),
		}
	}
}

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
	return handleResponse(response)
}

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
	const jsonData = await handleResponse(response)
	return jsonData.access_token
}

async function handleResponse(response) {
	if (response.status === 200 || response.status === 201) {
		return response.json()
	}

	const errorMessage = await response.text()
	throw new Error(errorMessage)
}
