import React from 'react'

const CartItemsCheckout = ({ product, isSuccess }) => {
	const { name, image, price, quantity } = product

	return (
		<div
			className={`tw-flex tw-flex-row tw-rounded-lg tw-w-full lg:tw-border-[1px] lg:tw-border-neutral-200 tw-mb-1 tw-px-2 lg:tw-px-0`}>
			<div className="tw-mr-5">
				<img
					className="tw-w-[100px] tw-h-[50px] tw-object-cover tw-rounded-l-lg tw-shadow-lg"
					src={image}
					alt={name}
				/>
			</div>
			<div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-w-[100%]">
				<div className="tw-text-black lg:tw-text-neutral-600 tw-font-light tw-text-sm">
					<div className="tw-font-bold">
						<h4>{name}</h4>
					</div>
					<p>{`Price: $${price * quantity}`}</p>
				</div>
				<div className="tw-flex tw-flex-row tw-items-center tw-justify-center tw-h-full tw-w-[15%] tw-bg-neutral-200 tw-py-3 tw-px-2 tw-rounded-r-md">
					<div>
						<span className="tw-text-sm">{quantity}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CartItemsCheckout
