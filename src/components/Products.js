import React from 'react'
import Slideshow from '../utils/Slideshow'
import Card from './Card'
import About from './About'
import { isInCart } from '../utils/helpers'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import { useDispatch, useSelector } from 'react-redux'
import Add2CartPopup from './shared/Add2CartPopup'
import Rating from './shared/Rating'
import Heading from './Heading'
import { CgClose } from 'react-icons/cg'

function Products({ allProducts, sales }) {
	const [singleProducts, setSingleproducts] = React.useState(null)
	const [singleCart, setSingleCart] = React.useState(null)
	const [error, setError] = React.useState(false)
	const [length, setLength] = React.useState('14')
	const [_color, setColor] = React.useState(null)
	const [_hairType, sethairType] = React.useState(null)
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)

	const _hairColor =
		singleProducts?.[0]?.type.toLowerCase() === 'frontal'
			? ['Natural black']
			: ['Natural black', 'Blonde613']
	const texture = ['Straight', 'Bodywave', 'Curly', 'Wavy']

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}

	const sizes = singleProducts?.[0].availablelength.split(', ')

	let cardPrice =
		sales !== 0 && singleProducts?.[0]?.sales
			? singleProducts?.[0]?.price - singleProducts?.[0]?.price * (sales / 100)
			: singleProducts?.[0]?.price

	let _price
	let _price2

	if (length === '14') {
		_price = cardPrice
	} else if (length === '16') {
		_price = cardPrice + 10
	} else if (length === '18') {
		_price = cardPrice + 20
	} else if (length === '20') {
		_price = cardPrice + 30
	} else if (length === '22') {
		_price = cardPrice + 40
	} else if (length === '24') {
		_price = cardPrice + 50
	} else if (length === '26') {
		_price = cardPrice + 60
	} else if (length === '28') {
		_price = cardPrice + 70
	} else if (length === '30') {
		_price = cardPrice + 80
	}

	if (length === '14') {
		_price2 = cardPrice
	} else if (length === '16') {
		_price2 = cardPrice + 10
	} else if (length === '18') {
		_price2 = cardPrice + 20
	} else if (length === '20') {
		_price2 = cardPrice + 30
	} else if (length === '22') {
		_price2 = cardPrice + 40
	} else if (length === '24') {
		_price2 = cardPrice + 50
	} else if (length === '26') {
		_price2 = cardPrice + 60
	} else if (length === '28') {
		_price2 = cardPrice + 70
	} else if (length === '30') {
		_price2 = cardPrice + 80
	}

	const pricePredict = () => {
		if (singleProducts?.[0]?.type.toLowerCase() === 'Frontal') {
			if (
				_color?.includes('Natural black') &&
				(_hairType?.includes('Bodywave') ||
					_hairType?.includes('Wavy') ||
					_hairType?.includes('Curly'))
			) {
				return (_price2 += 10)
			} else if (
				_color?.includes('Natural black') &&
				_hairType?.includes('Straight')
			) {
				return _price2
			}
		} else {
			if (
				_color?.includes('Natural black') &&
				(_hairType?.includes('Bodywave') ||
					_hairType?.includes('Wavy') ||
					_hairType?.includes('Curly'))
			) {
				return (_price2 += 5)
			} else if (
				_color?.includes('Natural black') &&
				_hairType?.includes('Straight')
			) {
				return _price2
			}

			if (
				_color?.includes('Blonde613') &&
				(_hairType?.includes('Bodywave') ||
					_hairType?.includes('Wavy') ||
					_hairType?.includes('Curly'))
			) {
				return (_price2 += 15)
			} else if (
				_color?.includes('Blonde613') &&
				_hairType?.includes('Straight')
			) {
				return (_price2 += 10)
			}
		}
	}

	const f_cPrice = pricePredict()

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name
	const id = singleProducts?.[0] && singleProducts?.[0]?._id
	const image = singleProducts?.[0] && singleProducts?.[0]?.image
	const color = singleProducts?.[0] && singleProducts?.[0]?.color
	const description = singleProducts?.[0] && singleProducts?.[0]?.description
	const width = singleProducts?.[0] && singleProducts?.[0]?.widthlength
	const price_Nosales =
		singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
		singleProducts?.[0]?.type.toLowerCase() === 'closure'
			? f_cPrice
			: _price
	const hairLength = length
	const hairColor = _color || color
	const hairTexture = _hairType && _hairType
	const priceFunc = () => {
		if (singleProducts?.[0]?.sales) {
			if (
				singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
				singleProducts?.[0]?.type.toLowerCase() === 'closure'
			) {
				return Number(f_cPrice)
			} else {
				return Number(_price)
			}
		} else {
			return Number(price_Nosales)
		}
	}
	console.log(price_Nosales)
	const price = priceFunc()

	const singleProduct = {
		name,
		id,
		image,
		hairColor,
		price,
		hairLength,
		description,
		width,
		hairTexture,
	}

	const addToCart = () => {
		if (length) {
			dispatch(addToCartItem(singleProduct))
			setTimeout(() => {
				setSingleCart(singleProduct)
			}, 1000)
		} else {
			setError(true)
		}
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(singleProduct))
	}

	const desc = [
		{
			key: 'Hair Texture',
			value:
				singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
				singleProducts?.[0]?.type.toLowerCase() === 'closure'
					? texture.join(', ')
					: name,
		},
		{ key: 'Hair Color', value: color },
		{
			key: 'Hair Length',
			value: `Available from ${sizes?.[0]}" - ${
				sizes?.[sizes.length - 1]
			}" inches`,
		},
		{ key: 'Material', value: '100% Human Hair' },
		{ key: 'Density', value: '150% - 200%' },
		{ key: 'Cap Size', value: 'Average Size(Head circumference: 54cm - 58cm' },
		{ key: 'Can be bleached.dyed', value: 'Yes' },
		{
			key: 'Delivery time',
			value:
				'We usually ship the order within 24 hours after order confirmation, except for weekends and holidays - (order confirmation is within 2 weeks)',
		},
		{
			key: 'Return policy',
			value:
				'We accept 10-days no reason return exchange with hair not been used',
		},
	]

	return (
		<div className="tw-pt-10 tw-relative tw-flex tw-flex-col tw-items-center ">
			<div className="tw-fixed tw-top-0 tw-right-0 md:tw-top-[-100px] md:tw-right-[-20px] tw-z-40">
				<Add2CartPopup singleCart={singleCart} setSingleCart={setSingleCart} />
			</div>
			{allProducts ? (
				<div
					className={`tw-grid tw-grid-cols-2 tw-w-full tw-px-2 ${
						!sales && 'tw-pt-[20px]'
					} md:tw-w-[100%] md:tw-grid-cols-4 lg:tw-grid-cols-5 2xl:tw-grid-cols-6 3xl:tw-grid-cols-7 tw-gap-2 md:tw-gap-5 `}>
					{allProducts.map((product) => {
						return (
							<div
								key={product._id}
								className="tw-justify-center tw-items-center tw-flex tw-flex-row">
								<Card
									sales={sales}
									key={product._id}
									product={product}
									setSingleproducts={setSingleproducts}
									scrollToTop={scrollToTop}
								/>
							</div>
						)
					})}
				</div>
			) : (
				<div className="tw-text-neutral-500">Loading data...</div>
			)}
			<div className="tw-mx-auto tw-w-full bg-blur tw-py-10 tw-mt-10">
				<div className="tw-w-[100%] md:tw-w-[95%] tw-mx-auto">
					<About />
				</div>
			</div>
			{singleProducts && (
				<div className="single tw-fixed tw-z-30 tw-overflow-scroll tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-[0px] md:tw-pt-10 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white">
					<div className="md:tw-w-[80%] xl:tw-w-[70%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
						<div className="tw-relative tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
							<Slideshow images={singleProducts?.[0]} />
							{singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
							singleProducts?.[0]?.type.toLowerCase() === 'closure' ? (
								<div className="tw-ml-5  md:tw-ml-0 tw-mt-20">
									<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
										<div className="tw-flex tw-flex-wrap">
											{_hairColor.map((colr, idx) => (
												<span
													onClick={() => {
														setColor(colr)
														setError(false)
													}}
													className={`${
														_color === colr
															? 'tw-bg-neutral-900 tw-text-white'
															: 'tw-bg-neutral-200 tw-text-neutral-900'
													} tw-flex tw-flex-wrap tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
													key={idx}>
													<span>{colr}</span>
												</span>
											))}
										</div>
									</div>
									<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
										<div className="tw-flex tw-flex-wrap">
											{texture.map((tex, idx) => (
												<span
													onClick={() => {
														sethairType(tex)
													}}
													className={`${
														_hairType === tex
															? 'tw-bg-neutral-900 tw-text-white'
															: 'tw-bg-neutral-200 tw-text-neutral-900'
													} tw-flex tw-flex-wrap tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
													key={idx}>
													<span>{tex}</span>
												</span>
											))}
										</div>
									</div>
									<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
										<div className="tw-flex tw-flex-wrap">
											{sizes.map((size, idx) => (
												<span
													onClick={() => {
														setLength(size)
													}}
													className={`tw-flex tw-flex-wrap ${
														length === size
															? 'tw-bg-neutral-900 tw-text-white'
															: 'tw-bg-neutral-200 tw-text-neutral-900'
													} tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-p-3 tw-text-[16px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
													key={idx}>
													{size}inch
												</span>
											))}
										</div>
									</div>
								</div>
							) : (
								<div className="tw-flex tw-flex-col tw-ml-5 tw-mt-20 md:tw-ml-0">
									<div className="tw-flex tw-flex-wrap">
										{sizes.map((size, idx) => (
											<span
												onClick={() => {
													setLength(size)
													setError(false)
												}}
												className={`tw-flex tw-flex-wrap ${
													length === size
														? 'tw-bg-neutral-900 tw-text-white'
														: 'tw-bg-neutral-200 tw-text-neutral-900'
												} tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-p-3 tw-text-[16px] hover:tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300`}
												key={idx}>
												{size}inch
											</span>
										))}
									</div>
								</div>
							)}
						</div>
						<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900 tw-mt-10 md:tw-mt-0">
							<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
								{singleProducts?.[0].name}
							</p>
							<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
								Description: {singleProducts?.[0].description}
							</p>
							{!price_Nosales &&
								(singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
								singleProducts?.[0]?.type.toLowerCase() === 'closure' ? (
									<span className="tw-mt-2 tw-text-xs tw-text-green-700">
										***Select color & tetxure to calculate sales price...***
									</span>
								) : (
									<span className="tw-mt-2 tw-text-xs tw-text-green-700">
										***Select length to calculate sales price...***
									</span>
								))}
							<p className="tw-font-medium tw-text-xl tw-my-[10px]">
								Price:{' '}
								<span
									className={
										sales !== 0 &&
										singleProducts?.[0].sales &&
										'tw-mr-3 tw-line-through tw-text-neutral-400 tw-border-r-[1px] tw-border-neutral-500 tw-pr-3'
									}>
									{sales !== 0 &&
										singleProducts?.[0].sales &&
										`$${
											price_Nosales
												? price_Nosales +
												  singleProducts?.[0].price * (sales / 100)
												: singleProducts?.[0].price +
												  singleProducts?.[0].price * (sales / 100)
										}${' '}
										USD${' '}`}
								</span>
								${price_Nosales ? price_Nosales : ' ***'} USD
							</p>
							<div className="tw-text-sm tw-font-light">
								<div>
									Color: <span>{_color ? _color : '***'}</span>
								</div>
								<div>
									Texture: <span>{_hairType ? _hairType : '***'}</span>
								</div>
								<div>
									Length: <span>{length}" inches</span>
								</div>
							</div>
							<div className="tw-flex tw-items-center">
								<span className="tw-mr-2">Review: </span>
								<Rating isNum={true} />
							</div>
							{singleProducts?.[0]?.sales && (
								<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-my-1 tw-text-red-600">
									Sales: {sales && `${sales}%`}{' '}
									<span className="tw-text-xs">OFF</span>
								</p>
							)}
							<div className="tw-my-5 tw-border-t-[1px] tw-border-b-[1px] tw-border-red-700 tw-py-5">
								<div className="tw-mb-5">
									<Heading children="Product Details" isBold={false} />
								</div>
								{desc.map((item, idx) => (
									<div className="tw-flex tw-flex-col tw-mb-2 tw-text-sm">
										<span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
											{item.key}:{' '}
										</span>
										<span>{item.value}</span>
									</div>
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
									{singleProducts?.[0].type.toLowerCase() === 'frontal' ||
									singleProducts?.[0].type.toLowerCase() === 'closure' ? (
										<span>
											Add more of {_hairType} {_color} - {length}"
										</span>
									) : (
										<span>
											Add more of {singleProducts?.[0].name} - {length}"
										</span>
									)}
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

export default Products
