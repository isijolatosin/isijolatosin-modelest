require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_PRIVATE_KEY)

// domain/.netlify/functions/create-payment-intent
exports.handler = async function (event, context) {
	const daysFromNow = (n) => {
		let d = new Date()
		return Math.floor(d.setDate(d.getDate() + n) / 1000)
	}

	if (event.body) {
		const {
			payment_method,
			email,
			balance,
			shippingFee,
			tax,
			cartItems,
			sales,
			shipMethod,
		} = JSON.parse(event.body)

		const totalCartPrice =
			cartItems.reduce((total, prod) => total + prod.price * prod.quantity, 0) *
			100

		const discountedPrice =
			sales && totalCartPrice - totalCartPrice * (sales / 100)

		if (discountedPrice === balance || totalCartPrice === balance) {
			const noOfInstallment = 4
			const subAmount = Math.floor(
				shipMethod === 'ship'
					? (balance + shippingFee + tax) / noOfInstallment
					: (balance + tax) / noOfInstallment
			)

			try {
				// create customer
				const customer = await stripe.customers.create({
					balance: subAmount,
					payment_method: payment_method,
					email: email,
					invoice_settings: {
						default_payment_method: payment_method,
					},
				})

				const subscription = await stripe.subscriptions.create({
					customer: customer.id,
					cancel_at: new Date(daysFromNow(42) * 1000),
					items: [{ plan: 'price_1KdiVMLTIkVkSAcp6fej2hu8' }],
					expand: ['latest_invoice.payment_intent'],
				})
				const client_secret =
					subscription.latest_invoice.payment_intent.client_secret
				return {
					// statusCode: 200,
					body: JSON.stringify({
						client_secret: client_secret,
					}),
				}
			} catch (error) {
				console.log(error)
				return {
					// statusCodes: 500,
					body: JSON.stringify({ msg: error.message }),
				}
			}
		} else {
			return { statusCode: 500, body: 'Please Create Payment Intent' }
		}
	}
}
