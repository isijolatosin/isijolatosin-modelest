import React from 'react'
import StripeCheckout from './checkout/stripe-checkout'
// import { SHIPPING_COST } from '../constant'

const Total = ({ itemCount, total, setRedirect, setPageCancel }) => {
	// const canImage = require('../assets/can-image.jpeg')
	// const usaImage = require('../assets/usa-image.jpeg')
	// const lonImage = require('../assets/lon-image.jpeg')

	return (
		<div className="tw-bg-white tw-p-5">
			<StripeCheckout
				total={total}
				itemCount={itemCount}
				setRedirect={setRedirect}
				setPageCancel={setPageCancel}
			/>
		</div>
	)
}

export default Total
