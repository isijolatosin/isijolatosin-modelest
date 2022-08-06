import fetch from 'node-fetch'

require('dotenv').config()

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID
const APP_SECRET = process.env.PAYPAL_CLIENT_SECRET
const base = process.env.BASE_URL

// create a payment
export async function handler(event, context) {
	const data = JSON.parse(event.body)
	const response = await capturePayment(data.id)

	return {
		statusCode: 200,
		body: JSON.stringify({ response: response }),
	}
}

// use the orders api to capture payment for an order
async function capturePayment(orderId) {
	const accessToken = await generateAccessToken()
	const url = `${base}/v2/checkout/orders/${orderId}/capture`
	const response = await fetch(url, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
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
