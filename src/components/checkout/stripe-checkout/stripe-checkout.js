import React, { useContext } from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import { fetchFromAPI } from '../../../utils/helpers'
import { clearCartItem, selectCartItems } from '../../../slices/appSlices'
import { useSelector, useDispatch } from 'react-redux'
import { UserContext } from '../../../context/user-context'
import { SHIPPING_COST, CURRENCY, TAX_PERCENT } from '../../../constant'
import { MdOutlineError } from 'react-icons/md'

const StripeCheckout = () => {
	const stripe = useStripe()
	const cartItems = useSelector(selectCartItems)
	const [email, setEmail] = React.useState('')
	const [errorMessage, setErrorMessage] = React.useState('')
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
	const canImage = require('../../../assets/can-image.jpeg')
	const usaImage = require('../../../assets/usa-image.jpeg')
	const lonImage = require('../../../assets/lon-image.jpeg')
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

	// Proceed function
	const StripeRedirectToCheckout = async (e) => {
		e.preventDefault()
		if (allowproceed) {
			const line_items = []
			// eslint-disable-next-line array-callback-return
			cartItems.map((item) => {
				const taxCal = item.price * TAX_PERCENT
				const price = Math.floor((item.price + taxCal) * 100)
				console.log(price)
				const description = item.description
				line_items.push({
					price_data: {
						currency: CURRENCY,
						product_data: {
							name: `${item.name} - (Estimated GST/HST: 6%)`,
							description: description,
						},
						unit_amount: price,
					},
					quantity: 1,
				})
			})

			// shipping options
			const shipping_options = [
				{
					shipping_rate_data: {
						type: 'fixed_amount',
						fixed_amount: {
							amount: shippingCost.cost * 100,
							currency: CURRENCY,
						},
						display_name: 'Paid Delivery',
						// Delivers in exactly 1 business day
						delivery_estimate: {
							minimum: {
								unit: 'business_day',
								value: 5,
							},
							maximum: {
								unit: 'business_day',
								value: 7,
							},
						},
					},
				},
			]

			const response = await fetchFromAPI('create-checkout-session', {
				body: {
					line_items,
					shipping_options,
					customer_email: user ? user?.email || user?.user?.email : email,
				},
			})
			const { sessionId, error } = response

			if (error && !sessionId) {
				setErrorMessage(error)
			}
			await stripe?.redirectToCheckout({
				sessionId: sessionId,
			})
		}
	}

	return (
		<form onSubmit={StripeRedirectToCheckout}>
			<div className="tw-bg-neutral-200 tw-p-2 tw-rounded-md tw-text-slate-600 tw-my-1 tw-font-light">
				<div className="ship-head">
					<p>Shipping - Cost</p>
				</div>
				<div className="">
					<ul>
						<li className="tw-flex tw-flex-row tw-items-center">
							<img
								className="tw-h-[12px] tw-mr-1"
								src={usaImage}
								alt="usa-flag"
							/>
							usa - ${SHIPPING_COST.usa}
						</li>
						<li className="tw-flex tw-flex-row tw-items-center">
							<img
								className="tw-h-[12px] tw-mr-1"
								src={canImage}
								alt="canada-flag"
							/>
							canada - ${SHIPPING_COST.canada}
						</li>
						<li className="tw-flex tw-flex-row tw-items-center">
							<img
								className="tw-h-[12px] tw-mr-1"
								src={lonImage}
								alt="london-flag"
							/>
							london - ${SHIPPING_COST.london}
						</li>
					</ul>
				</div>
			</div>
			<div className="tw-flex tw-flex-col">
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
				<span
					onClick={handleSubmitAddress}
					className="tw-items-center tw-bg-gray-300 tw-flex tw-flex-col tw-py-1 tw-rounded-md tw-text-sm hover:tw-cursor-pointer hover:tw-text-gray-300 hover:tw-bg-gray-50">
					SUBMIT ADDRESS
				</span>
			</div>
			{email.substr(email.length - 3) === 'com' && (
				<div className="email-verify">
					<span>Please verify you have the correct email and address</span>
				</div>
			)}
			{error && email.length < 1 && (
				<div className="user-email-input-error">
					<span>Hey! You have missing credentials!</span>
				</div>
			)}
			<div className="total-button tw-text-sm">
				<button
					onClick={() => !allowproceed && setError(true)}
					className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500 hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mr-5 tw-border-r-2 tw-pr-5"
					type="submit">
					PROCEED
				</button>

				<span
					onClick={() => dispatch(clearCartItem())}
					className="hover:tw-text-neutral-400 hover:tw-cursor-pointer tw-ease-in tw-duration-500">
					CLEAR CART
				</span>
			</div>
			{errorMessage && (
				<div className="checkout-error">
					<MdOutlineError size={20} />
					<span className="tw-ml-2">{errorMessage}</span>
				</div>
			)}
		</form>
	)
}

export default StripeCheckout
