require('dotenv').config()
const { StatusCodes } = require('http-status-codes')

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

// domain/.netlify/functions/create-payment-intent
exports.handler = async function (event, context) {
	if (event.body) {
		const { payment_method, email } = JSON.parse(event.body)

		try {
			// create customer
			const customer = await stripe.customers.create({
				payment_method: payment_method,
				email: email,
				invoice_settings: {
					default_payment_method: payment_method,
				},
			})

			const subscription = await stripe.subscriptions.create({
				customer: customer.id,
				items: [{ plan: 'price_1KdRi7LTIkVkSAcp451zK8HR' }],
				expand: ['latest_invoice.payment_intent'],
			})
			const status = subscription.latest_invoice.payment_intent.status
			const client_secret =
				subscription.latest_invoice.payment_intent.client_secret

			console.log(status)
			return {
				statusCode: 200,
				body: JSON.stringify({
					client_secret: client_secret,
					status: status,
				}),
			}
		} catch (error) {
			return {
				statusCodes: 500,
				body: JSON.stringify({ msg: error.message }),
			}
		}
	}
	return { statusCode: 200, body: 'Please Create Payment Intent' }
}
