import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { GoAlert } from 'react-icons/go'
import { SiMastercard } from 'react-icons/si'
import { RiVisaLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import { UserContext } from '../../context/user-context'
import PaypalCheckoutButton from '../PaypalCheckoutButton'
import { FaCcStripe } from 'react-icons/fa'
import { selectCartItems } from '../../slices/appSlices'
import { installmentStartPrice } from '../../constant'

const CheckoutForm = ({
	total,
	setRedirect,
	setPageCancel,
	sales,
	discountPrice,
}) => {
	const navigate = useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const cartItems = useSelector(selectCartItems)
	const email = localStorage.getItem('altEmail')
	const shippingCost = JSON.parse(localStorage.getItem('shippingCost'))
	const shipMethod = localStorage.getItem('ship')
	const [succeeded, setSucceeded] = React.useState(false)
	const [paymentPlanWarn, setPaymentPlanWarn] = React.useState(false)
	const [_error, set_Error] = React.useState(null)
	const [processing, setProcessing] = React.useState('')
	const [disabled, setDisabled] = React.useState(true)
	// const [clientSecret, setClientSecret] = React.useState('')
	const { user } = useContext(UserContext)
	const [paywithStripe, setPaywithStripe] = React.useState(false)
	const paymentPlan = [
		{ id: 1, name: '...' },
		{ id: 2, name: 'One-Time' },
		// { id: 3, name: 'Bi-Weekly' },
	]

	const shipping_fee = Math.floor(shippingCost?.cost * 100)
	const taxPercentage =
		Number(total) * Number(process.env.REACT_APP_TAX_PERCENT)
	const tax = Math.floor(taxPercentage * 100)
	const price = Math.floor((Number(total) + taxPercentage) * 100)
	const total_amount = price
	const totalPrice = Math.floor(Number(total) * 100)

	const handlePayWithStripe = () => {
		setPaywithStripe(true)
	}

	const cardStyle = {
		style: {
			base: {
				color: '#32325d',
				fontFamily: 'Arial, sans-serif',
				fontSmoothing: 'antialiased',
				fontSize: '16px',
				'::placeholder': {
					color: '#32325d',
				},
			},
			invalid: {
				color: '#fa755a',
				iconColor: '#fa755a',
			},
		},
	}

	const handleChange = async (event) => {
		setDisabled(event.empty)
		set_Error(event.error ? event.error.message : '')
	}

	const handleSubmit = async (ev) => {
		ev.preventDefault()

		if (!paywithStripe) {
			setPaymentPlanWarn(true)
		}

		// if (total_amount >= installmentStartPrice) {
		if (paywithStripe) {
			// One time payment
			setProcessing(true)

			let clientSecret

			try {
				const { data } = await axios.post(
					'/.netlify/functions/create-payment-intent',
					JSON.stringify({
						cartItems,
						shipping_fee,
						totalPrice,
						tax,
						sales,
						shipMethod,
					})
				)

				clientSecret = data.clientSecret.split("'")?.[0]
			} catch (error) {
				set_Error(
					error?.response?.data ? 'Please contact modelEst Admin...' : ''
				)
			}

			if (clientSecret) {
				const payload = await stripe.confirmCardPayment(clientSecret, {
					payment_method: {
						card: elements.getElement(CardElement),
						billing_details: {
							email: user?.email || email,
						},
					},
				})

				localStorage.setItem('payload', payload?.paymentIntent?.client_secret)

				if (payload.error) {
					set_Error(`Payment failed ${payload.error.message}`)
					setProcessing(false)
					setTimeout(() => {
						navigate('/canceled')
					}, 5000)
				} else {
					set_Error(null)
					setProcessing(false)
					setSucceeded(true)
					payload?.paymentIntent?.client_secret &&
						setTimeout(() => {
							navigate('/success')
						}, 5000)
				}
			}
		}
		// recurring payment
		// 		else if (payPlan.includes('Bi-Weekly')) {
		// 			if (
		// 				total_amount >= installmentStartPrice
		// 				// total_amount >= Number(process.env.REACT_APP_INSTALLMENT_START_PRICE)
		// 			) {
		// 				setProcessing(true)
		// 				const result = await stripe.createPaymentMethod({
		// 					type: 'card',
		// 					card: elements.getElement(CardElement),
		// 					billing_details: {
		// 						email: user?.email || email,
		// 					},
		// 				})
		//
		// 				if (result.error) {
		// 					console.log(result.error)
		// 					set_Error(`Payment failed ${result.error.message}`)
		// 					setProcessing(false)
		// 					setTimeout(() => {
		// 						navigate('/canceled')
		// 					}, 5000)
		// 				} else {
		// 					const res = await axios.post(
		// 						'/.netlify/functions/create-payment-sub',
		// 						JSON.stringify({
		// 							payment_method: result.paymentMethod.id,
		// 							email: user?.email || email,
		// 							balance: totalPrice,
		// 							shippingFee: shipping_fee,
		// 							tax: tax,
		// 							cartItems: cartItems,
		// 							shipMethod: shipMethod,
		// 							sales: sales,
		// 						})
		// 					)
		//
		// 					const { client_secret, status } = res.data
		//
		// 					if (status === 'requires_action') {
		// 						stripe.confirmCardPayment(client_secret).then(function (result) {
		// 							if (result.error) {
		// 								console.log(result.error)
		// 								set_Error(`Payment failed ${result.error.message}`)
		// 								setProcessing(false)
		// 								setTimeout(() => {
		// 									navigate('/canceled')
		// 								}, 5000)
		// 							} else {
		// 								set_Error(null)
		// 								setProcessing(false)
		// 								setSucceeded(true)
		// 								localStorage.setItem('payload', client_secret)
		// 								setTimeout(() => {
		// 									navigate('/success')
		// 								}, 5000)
		// 							}
		// 						})
		// 					} else {
		// 						set_Error(null)
		// 						setProcessing(false)
		// 						setSucceeded(true)
		// 						localStorage.setItem('payload', client_secret)
		// 						setTimeout(() => {
		// 							navigate('/success')
		// 						}, 5000)
		// 					}
		// 				}
		// 			}
		// 		}
		// 		} else {
		// 			if (payPlan.includes('One-Time')) {
		// 				// One time payment
		// 				setProcessing(true)
		//
		// 				let clientSecret
		//
		// 				try {
		// 					const { data } = await axios.post(
		// 						'/.netlify/functions/create-payment-intent',
		// 						JSON.stringify({
		// 							cartItems,
		// 							shipping_fee,
		// 							totalPrice,
		// 							tax,
		// 							sales,
		// 							shipMethod,
		// 						})
		// 					)
		//
		// 					clientSecret = data.clientSecret.split("'")?.[0]
		// 				} catch (error) {
		// 					set_Error(
		// 						error?.response?.data ? 'Please contact modelEst Admin...' : ''
		// 					)
		// 				}
		//
		// 				if (clientSecret) {
		// 					const payload = await stripe.confirmCardPayment(clientSecret, {
		// 						payment_method: {
		// 							card: elements.getElement(CardElement),
		// 							billing_details: {
		// 								email: user?.email || email,
		// 							},
		// 						},
		// 					})
		//
		// 					localStorage.setItem('payload', payload?.paymentIntent?.client_secret)
		//
		// 					if (payload.error) {
		// 						set_Error(`Payment failed ${payload.error.message}`)
		// 						setProcessing(false)
		// 						setTimeout(() => {
		// 							navigate('/canceled')
		// 						}, 5000)
		// 					} else {
		// 						set_Error(null)
		// 						setProcessing(false)
		// 						setSucceeded(true)
		// 						payload?.paymentIntent?.client_secret &&
		// 							setTimeout(() => {
		// 								navigate('/success')
		// 							}, 5000)
		// 					}
		// 				}
		// 			}
		// 		}
	}

	return (
		<div>
			<div className="tw-relative tw-flex tw-flex-col md:tw-flex-row tw-items-top tw-w-[100%] tw-bg-white">
				<div className="tw-flex tw-flex-col tw-items-center md:tw-items-left tw-my-10 tw-w-full md:tw-w-[40%] md:tw-mr-3 tw-mx-auto tw-mt-[20px] md:tw-border-r-[1px] md:tw-border-neutral-500 tw-order-3 md:tw-order-1">
					<div className="tw-flex tw-text-blue-600">
						<FaCcStripe size={55} />
						<div className="tw-text-xs tw-font-light tw-mb-2 tw-italic tw-ml-1 tw-mt-4">
							<span className="tw-font-bold">Pay with stripe</span>
							<br /> Select a payment plan
						</div>
					</div>
					{/* <select
						className="tw-shadow-lg tw-w-[80%] md:tw-max-w-[300px] tw-text-neutral-700 tw-font-light tw-bg-[#efefef] tw-block tw-px-4 tw-py-3 tw-border-blue-500 tw-rounded-[50px] tw-text-xs tw-border-[1px] placeholder:tw-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
						onChange={handlePayWithStripe}
						id="payPlan"
						value={payPlan}
						name="payPlan">
						{paymentPlan.map((plan) => (
							<option key={plan.id}>{plan.name}</option>
						))}
					</select> */}
					<div
						onClick={handlePayWithStripe}
						className="tw-bg-neutral-800 tw-text-white tw-text-xs tw-mt-5 tw-px-10 tw-py-3 tw-rounded-[50px] hover:md:tw-bg-neutral-100 tw-ease-in tw-duration-300 hover:md:tw-text-neutral-900">
						<button>Pay with Stripe</button>
					</div>
				</div>
				<div className="tw-inline md:tw-hidden tw-order-2 tw-absolute tw-top-[54.2%] tw-font-light tw-w-full tw-text-center tw-text-neutral-400">
					<span className="tw-bg-white tw-px-[1px] tw-text-lg">or</span>
				</div>
				<div className="tw-w-full tw-mt-3 md:tw-mt-0 md:tw-w-[50%] tw-order-1 md:tw-order-2 tw-border-b-[1px] md:tw-border-b-0 tw-border-neutral-300 tw-pb-8 md:tw-mb-0 md:tw-pb-0 tw-mb-5 md:tw-mr-8 tw-p-5 md:tw-p-8">
					<div className=" tw-text-center tw-mb-2">
						<span className="tw-text-[12px] tw-font-bold">PAY WITH PAYPAL</span>
					</div>
					<div className="tw-w-full">
						<PaypalCheckoutButton
							shippingFee={shipping_fee}
							totalPrice={totalPrice}
							tax={tax}
							cartItems={cartItems}
							setRedirect={setRedirect}
							setPageCancel={setPageCancel}
							shipMethod={shipMethod}
							discountPrice={discountPrice}
							sales={sales}
						/>
					</div>
				</div>
			</div>
			{paywithStripe && (
				<div className="tw-flex tw-flex-col">
					{succeeded ? (
						<article className="tw-text-center tw-mt-2">
							<h4>Thank you. Your payment was successful!</h4>
							<h4 className="tw-text-xs tw-text-green-700 tw-mb-2">
								Redirecting to {succeeded ? 'success' : 'canceled'} page...
							</h4>
						</article>
					) : (
						<article className="tw-flex tw-justify-between tw-text-[12px] tw-p-1 tw-mt-1 tw-max-w-[100%] tw-text-white">
							<span className="tw-underline tw-flex-[0.4]">
								Hello, {user && user?.displayName}, your total is $
								{((total_amount + shipping_fee) / 100).toFixed(2)} -{' '}
								<span className="tw-text-neutral-400">
									(tax
									{shipMethod === 'pick up' ? '' : ' & shipping'} inclusive)
								</span>
							</span>
							{/* {total_amount <
								Number(process.env.REACT_APP_INSTALLMENT_START_PRICE) && (
								<span className="tw-text-blue-400 tw-flex-[0.4]">
									You are only elligible for one-time payment
								</span>
							)} */}
						</article>
					)}
				</div>
			)}
			<form
				className={
					paywithStripe
						? 'tw-block tw-ease-in tw-duration-300 tw-w-full tw-pt-2 tw-bg-white'
						: 'tw-hidden tw-ease-in tw-duration-300'
				}
				id="payment-form"
				onSubmit={handleSubmit}
				// onSubmit={
				// 	payPlan === '' ||
				// 	payPlan === '...' ||
				// 	(total_amount <
				// 		Number(process.env.REACT_APP_INSTALLMENT_START_PRICE) &&
				// 		payPlan === 'Bi-Weekly')
				// 		? null
				// 		: handleSubmit}
			>
				<div className="tw-flex tw-max-w-[95%] tw-mb-1 tw-items-center tw-mx-auto tw-justify-end tw-mr-4 md:tw-mr-6 lg:tw-mr-5 xl:tw-mr-6">
					<SiMastercard size={20} className="tw-text-yellow-500 tw-mr-3" />
					<RiVisaLine size={30} className="tw-mr-3 tw-text-blue-900" />
					<div className="tw-relative tw-flex tw-items-center tw-mr-5">
						<RiVisaLine size={30} className="tw-text-blue-800" />
						<span className="tw-absolute tw-bottom-[0px] tw-right-[1px] tw-text-[7px] tw-italic">
							DEBIT
						</span>
					</div>
					<SiAmericanexpress size={20} className="tw-text-blue-600 tw-mt-2" />
				</div>
				<CardElement
					id="card-element"
					options={cardStyle}
					onChange={handleChange}
					className="tw-w-[95%] tw-mx-auto tw-border-[1px] tw-border-b-0 tw-p-3 tw-rounded-t-[4px] "
				/>
				<button
					className="tw-bg-neutral-900 tw-w-[95%] tw-flex tw-mx-auto tw-justify-center tw-py-2 tw-rounded-b-md"
					disabled={processing || disabled || succeeded || !paywithStripe}
					id="submit">
					<span
						className={
							processing || disabled || succeeded || paywithStripe
								? 'tw-text-neutral-50 tw-font-light'
								: 'tw-text-orange-500 tw-font-light'
						}>
						{processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
					</span>
				</button>
				{paymentPlanWarn && (
					<span className="tw-text-red-700 tw-text-xs tw-flex tw-items-center tw-justify-center tw-mt-2 tw-capitalize">
						<GoAlert className="tw-mr-2" />
						Please set your payment plan
					</span>
				)}
				{_error && (
					<div
						className="card-error tw-flex tw-items-center tw-justify-center tw-text-xs tw-text-red-700 "
						// className="tw-flex tw-items-center tw-text-red-700 tw-text-xs tw-justify-center tw-mt-5"
						role="alert">
						<GoAlert className="tw-mr-2" />
						{_error}
					</div>
				)}
				<div className="tw-w-[90%] tw-mx-auto tw-pt-1">
					<p className={succeeded ? 'result-message' : 'result-message hidden'}>
						Payment Succeeded,
						{user?.email === 'tisijola7@gmail.com' && (
							<span>
								{' '}
								see the result in your
								<a
									className="tw-text-blue-600"
									href={`https://dashboard.stripe.com/test/payments`}
									target="_blank"
									rel="noreferrer">
									{' '}
									Stripe Dashboard
								</a>
							</span>
						)}{' '}
						Refresh the page to pay again
					</p>
				</div>
			</form>
		</div>
	)
}

export default CheckoutForm
