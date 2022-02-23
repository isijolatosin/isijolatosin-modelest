import React from 'react'
import StripeCheckout from './checkout/stripe-checkout/stripe-checkout'

const Total = ({ itemCount, total }) => {
	return (
		<div className="tw-bg-neutral-50 tw-p-5">
			<div className="tw-bg-neutral-200 tw-p-2 tw-rounded-md tw-text-slate-600">
				<p>Total Items: {itemCount}</p>
				<span>{`Amount to Pay: $${total}`}</span>
			</div>
			<StripeCheckout />
		</div>
	)
}

export default Total
