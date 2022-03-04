import React, { useContext } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import { GoAlert } from 'react-icons/go'
import { SiMastercard } from 'react-icons/si'
import { RiVisaLine } from 'react-icons/ri'
import { clearCartItem, selectCartItems } from '../../slices/appSlices'
import { useSelector, useDispatch } from 'react-redux'
import { UserContext } from '../../context/user-context'
import { SHIPPING_COST, TAX_PERCENT } from '../../constant'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CheckoutForm = ({ total, itemCount }) => {
	const navigate = useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const cartItems = useSelector(selectCartItems)
	const [email, setEmail] = React.useState('')
	const [succeeded, setSucceeded] = React.useState(false)
	const [_error, set_Error] = React.useState(null)
	const [processing, setProcessing] = React.useState('')
	const [disabled, setDisabled] = React.useState(true)
	const [clientSecret, setClientSecret] = React.useState('')
	const [allowproceed, setAllowProceed] = React.useState(false) //CHANGE BACK TO FALSE
	const [address, setAddress] = React.useState({
		street: '',
		city: '',
		province: '',
		postalcode: '',
		country: '',
	})
	const [shippingCost, setShippingCost] = React.useState({
		country: '',
		cost: '',
	})
	const [error, setError] = React.useState(false)
	const dispatch = useDispatch()
	const { user } = useContext(UserContext)
	const inputOnchangeHandler = (e) => {
		setAddress({ ...address, [e.target.name]: e.target.value })
	}

	// Submit address
	const handleSubmitAddress = () => {
		const shippingAd = `${address.street}, ${address.city}. ${address.province}. ${address.postalcode}. ${address.country}`

		if (!user || !email) {
			setError(true)
		}
		if (
			(user &&
				address?.street &&
				address?.city &&
				address?.province &&
				address?.postalcode &&
				address?.country) ||
			(email &&
				address?.street &&
				address?.city &&
				address?.province &&
				address?.postalcode &&
				address?.country)
		) {
			localStorage.setItem('address', shippingAd)
			// dispatch(setShippingObject(shippingAd))
			setAllowProceed(true)
			setAddress({
				street: '',
				city: '',
				province: '',
				postalcode: '',
				country: '',
			})
			// setEmail("")
			setError(false)
		}
		Object.keys(SHIPPING_COST).filter(
			(cntry) =>
				cntry.toLowerCase() === address.country.toLowerCase() &&
				setShippingCost({
					country: cntry,
					cost: SHIPPING_COST[cntry],
				})
		)
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

	const shipping_fee = Math.floor(shippingCost.cost * 100)
	const taxCal = total * TAX_PERCENT
	const price = Math.floor((total + taxCal) * 100)
	const total_amount = price

	const createPaymentIntent = async () => {
		try {
			const { data } = await axios.post(
				'/.netlify/functions/create-payment-intent',
				JSON.stringify({ cartItems, shipping_fee, total_amount })
			)

			setClientSecret(data.clientSecret.split("'")?.[0])
		} catch (error) {
			set_Error(error?.response?.data ? 'Please contact modelEst Admin...' : '')
		}
	}

	React.useEffect(() => {
		createPaymentIntent()
		// eslint-disable-next-line
	}, [])

	const handleChange = async (event) => {
		setDisabled(event.empty)
		set_Error(event.error ? event.error.message : '')
	}

	const handleSubmit = async (ev) => {
		ev.preventDefault()
		setProcessing(true)

		const payload = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
			},
		})

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
			setTimeout(() => {
				navigate('/success')
			}, 5000)
		}
	}

	return (
		<div>
			<div className="tw-flex tw-flex-col tw-max-w-[100%] lg:tw-max-w-[70%] tw-mx-auto tw-mt-5">
				{!user && (
					<input
						type="email"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="Email"
						value={email}
						className={
							error && !email
								? 'user-email-input input-error'
								: 'user-email-input'
						}
					/>
				)}
				<input
					name="street"
					type="text"
					value={address.street}
					onChange={inputOnchangeHandler}
					placeholder="Address"
					className={
						error && !address.street
							? 'user-email-input input-error'
							: 'user-email-input'
					}
				/>
				<input
					name="city"
					type="text"
					value={address.city}
					onChange={inputOnchangeHandler}
					placeholder="City"
					className={
						error && !address.city
							? 'user-email-input input-error'
							: 'user-email-input'
					}
				/>
				<input
					name="province"
					type="text"
					value={address.province}
					onChange={inputOnchangeHandler}
					placeholder="Province"
					className={
						error && !address.province
							? 'user-email-input input-error'
							: 'user-email-input'
					}
				/>
				<input
					name="postalcode"
					type="text"
					value={address.postalcode}
					onChange={inputOnchangeHandler}
					placeholder="Postal Code"
					className={
						error && !address.postalcode
							? 'user-email-input input-error'
							: 'user-email-input'
					}
				/>
				<input
					name="country"
					type="text"
					value={address.country}
					onChange={inputOnchangeHandler}
					placeholder="Country"
					className={
						error && !address.country
							? 'user-email-input input-error'
							: 'user-email-input'
					}
				/>
			</div>
			{email.substr(email.length - 3) === 'com' && (
				<div className="email-verify">
					<span>Please verify you have the correct email and address</span>
				</div>
			)}
			{error && email.length < 1 && (
				<div className="user-email-input-error tw-text-center">
					<span>Hey! You have missing credentials!</span>
				</div>
			)}
			<div className="total-button tw-text-sm tw-mx-auto tw-flex tw-flex-row tw-items-center">
				<button
					disabled={allowproceed}
					onClick={handleSubmitAddress}
					className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500 hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mr-5 tw-border-r-2 tw-pr-5"
					type="submit">
					PROCEED
				</button>

				<span
					onClick={() => dispatch(clearCartItem())}
					className="hover:tw-text-neutral-400 hover:tw-cursor-pointer tw-ease-in tw-duration-500 tw-min-w-[100px]">
					CLEAR CART
				</span>
			</div>
			{allowproceed && (
				<div>
					{succeeded ? (
						<article className="tw-text-center tw-mt-5">
							<h4>Thank you. Your payment was successful!</h4>
							<h4 className="tw-text-xs tw-text-green-700 tw-my-4">
								Redirecting to {succeeded ? 'success' : 'canceled'} page...
							</h4>
						</article>
					) : (
						<article className="tw-flex tw-items-center tw-justify-between tw-text-center tw-text-xs tw-p-1 tw-mt-5 tw-max-w-[95%] tw-mx-auto tw-rounded-sm tw-text-neutral-500">
							<span className="tw-mt-3 tw-underline">
								Hello, {user && user?.displayName}, your total is CA$
								{((total_amount + shipping_fee) / 100).toFixed(2)} + tax
							</span>
						</article>
					)}
				</div>
			)}
			<form
				className={
					allowproceed
						? 'tw-block tw-ease-in tw-duration-300 tw-w-full'
						: 'tw-hidden tw-ease-in tw-duration-300'
				}
				id="payment-form"
				onSubmit={handleSubmit}>
				<div className="tw-flex tw-max-w-[95%] tw-mb-1 tw-items-center tw-mx-auto tw-justify-end tw-mr-6">
					<SiMastercard size={20} className="tw-text-yellow-500 tw-mr-3" />
					<RiVisaLine size={30} className="tw-mr-3 tw-text-blue-900" />
					<div className="tw-relative tw-flex tw-items-center">
						<RiVisaLine size={30} className="tw-text-blue-800" />
						<span className="tw-absolute tw-bottom-[0px] tw-right-[1px] tw-text-[7px] tw-italic">
							DEBIT
						</span>
					</div>
				</div>
				<CardElement
					id="card-element"
					options={cardStyle}
					onChange={handleChange}
					className="tw-w-[95%] tw-mx-auto tw-border-[1px] tw-border-b-0 tw-p-3 tw-rounded-t-[4px] "
				/>
				<button
					className="tw-bg-neutral-800 tw-w-[95%] tw-flex tw-mx-auto tw-justify-center tw-py-2 tw-rounded-b-md"
					disabled={processing || disabled || succeeded}
					id="submit">
					<span
						className={
							processing || disabled || succeeded
								? 'tw-text-neutral-50 tw-font-light'
								: 'tw-text-orange-500 tw-font-light'
						}>
						{processing ? (
							<div className="spinner" id="spinner"></div>
						) : (
							'Pay now'
						)}
					</span>
				</button>
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
