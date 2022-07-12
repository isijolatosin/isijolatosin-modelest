import React from 'react'
import { CgClose } from 'react-icons/cg'
import { isInCart } from '../../utils/helpers'
import Slideshow from '../../utils/Slideshow'
import Heading from '../Heading'
import Rating from './Rating'

const SingleProductModal = ({
	price,
	singleProducts,
	setSingleproducts,
	sales,
	desc,
	sizes,
	setLength,
	setError,
	error,
	singleProduct,
	cartItems,
	IncreaseItem,
	addToCart,
	_hairColor,
	texture,
	sethairType,
	setColor,
	length,
	color,
	hairType,
}) => {
	return (
		<div>
			{singleProducts && (
				<div className="single tw-fixed tw-z-30 tw-overflow-scroll tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-[0px] md:tw-pt-10 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white">
					<div className="md:tw-w-[80%] xl:tw-w-[70%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
						<div className="tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
							<Slideshow images={singleProducts?.[0]} />
							<div className="tw-w-[90%] tw-mx-auto md:tw-w-[100%]">
								<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
									{singleProducts?.[0].name}
								</p>
								<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
									Description: {singleProducts?.[0].description}
								</p>
							</div>
							{_hairColor && (
								<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5 tw-mt-5">
									<div className="tw-flex tw-flex-wrap">
										{_hairColor.map((colr, idx) => (
											<span
												onClick={() => {
													setColor(colr)
													setError(false)
												}}
												className={`${
													color === colr
														? 'tw-bg-neutral-900 tw-text-white'
														: 'tw-bg-neutral-200 tw-text-neutral-900'
												} tw-flex tw-flex-wrap tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
												key={idx}>
												<span>{colr}</span>
											</span>
										))}
									</div>
								</div>
							)}
							{texture && (
								<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
									<div className="tw-flex tw-flex-wrap">
										{texture.map((tex, idx) => (
											<span
												onClick={() => {
													sethairType(tex)
												}}
												className={`${
													hairType === tex
														? 'tw-bg-neutral-900 tw-text-white'
														: 'tw-bg-neutral-200 tw-text-neutral-900'
												} tw-flex tw-flex-wrap tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
												key={idx}>
												<span>{tex}</span>
											</span>
										))}
									</div>
								</div>
							)}
							<div className="tw-flex tw-flex-col tw-mb-5 tw-ml-5 md:tw-ml-0 tw-mt-5">
								<div className="tw-flex tw-flex-wrap">
									{sizes.map((size, idx) => (
										<span
											onClick={() => {
												setLength(size)
												setError(false)
											}}
											className={`${
												length === size
													? 'tw-bg-neutral-900 tw-text-white'
													: 'tw-bg-neutral-200 tw-text-neutral-900'
											} tw-flex tw-flex-wrap tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-text-[14px] tw-py-1 tw-px-2 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
											key={idx}>
											{size}inch
										</span>
									))}
								</div>
							</div>
						</div>
						<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900">
							<div className="tw-flex tw-flex-col">
								{singleProducts?.[0]?.sales &&
									(singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
									singleProducts?.[0]?.type.toLowerCase() === 'closure' ? (
										<span className="tw-mt-2 tw-text-xs tw-text-green-700">
											Select color, tetxure & length to calculate sales price...
										</span>
									) : (
										<span className="tw-mt-2 tw-text-xs tw-text-green-700">
											Select length to calculate sales price...
										</span>
									))}
								<p className="tw-font-medium tw-text-xl tw-my-[10px]">
									Price:{' '}
									<span
										className={
											sales !== 0 &&
											singleProducts?.[0]?.sales &&
											'tw-mr-3 tw-line-through tw-text-neutral-400 tw-border-r-[1px] tw-border-neutral-500 tw-pr-3'
										}>
										{sales !== 0 &&
											singleProducts?.[0]?.sales &&
											`$${
												price
													? price + singleProducts?.[0].price * (sales / 100)
													: singleProducts?.[0].price
											}${' '}
										USD${' '}`}
									</span>
									${price ? price : ' ***'} USD
								</p>
								<div className="tw-text-sm tw-font-light">
									<div>
										Color: <span>{color ? color : '***'}</span>
									</div>
									<div>
										Texture: <span>{hairType ? hairType : '***'}</span>
									</div>
									<div>
										Length: <span>{length}" inches</span>
									</div>
								</div>
								<div className="tw-flex tw-items-center">
									<span className="tw-mr-2">Review: </span>
									<Rating isNum={true} />
								</div>
							</div>
							{singleProducts?.[0]?.sales && (
								<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-my-1 tw-text-red-600">
									Sales: {sales && `${sales}%`}{' '}
									<span className="tw-text-xs">OFF</span>
								</p>
							)}
							<div className="tw-my-5 tw-border-t-[1px] tw-border-red-700 tw-py-5 tw-overflow-scroll single tw-h-[70%]">
								<div className="tw-mb-5">
									<Heading children="Product Details" isBold={false} />
								</div>
								<div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 md:tw-gap-x-10">
									{desc.map((item, idx) => (
										<div className="tw-capitalize tw-flex tw-flex-col tw-mb-2 tw-text-sm">
											<span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
												{item.key}:{' '}
											</span>
											<span>{item.value}</span>
										</div>
									))}
								</div>
								{singleProducts?.[0]?.maintenance && (
									<div className="tw-mt-10 tw-mb-2">
										<Heading children="Maintenance" isBold={false} />
									</div>
								)}
								{singleProducts?.[0]?.maintenance?.map((item, idx) => (
									<li
										key={idx}
										className="tw-text-sm tw-italic tw-text-neutral-500 tw-font-light tw-mb-2 ">
										{item}
									</li>
								))}
							</div>

							{error && (
								<div>
									<p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
										{singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
										singleProducts?.[0]?.type.toLowerCase() === 'closure'
											? `Please provide color, texture and length for ${singleProducts?.[0].name}`
											: `Please provide length for ${singleProducts?.[0].name}`}
									</p>
								</div>
							)}
							{isInCart(singleProduct, cartItems) ? (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 tw-mb-40"
									onClick={cartItems.length !== 0 ? IncreaseItem : null}>
									<span>
										Add more of {singleProducts?.[0].name} {color} {hairType} -{' '}
										{length}"
									</span>
								</div>
							) : (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 tw-mb-40"
									onClick={addToCart}>
									<span>Add to cart</span>
								</div>
							)}
							<div
								onClick={() => {
									setSingleproducts(null)
									setColor(null)
									sethairType(null)
									setLength('14')
								}}
								className="tw-text-2xl tw-text-white tw-bg-neutral-900 tw-w-10 tw-h-10 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-absolute tw-top-[20px] tw-right-[20px] tw-ease-in tw-duration-300 hover:tw-cursor-pointer hover:tw-bg-white hover:tw-text-neutral-900">
								<CgClose />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default SingleProductModal
