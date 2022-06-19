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

function Products({ allProducts }) {
	const [singleProducts, setSingleproducts] = React.useState(null)
	const [singleCart, setSingleCart] = React.useState(null)
	const [error, setError] = React.useState(false)
	const [sales, setSales] = React.useState(false)
	const [length, setLength] = React.useState(null)
	const [_color, setColor] = React.useState(null)
	const [_hairType, sethairType] = React.useState(null)
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)

	const _hairColor =
		singleProducts?.[0]?.type.toLowerCase() === 'frontal'
			? ['Natural black']
			: ['Natural black', 'Blonde613']
	const texture = ['straight', 'Bodywave', 'Curly', 'Wavy']

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
	}, [])

	const sizes = singleProducts?.[0].availablelength.split(', ')

	React.useEffect(() => {
		if (allProducts.every((product) => product.sales)) {
			localStorage.setItem('isSales', true)
		} else {
			localStorage.removeItem('isSales', '')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	let cardPrice = sales
		? singleProducts?.[0]?.price - singleProducts?.[0]?.price * 0.15
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

	const f_cPrice =
		// checking for frontal
		singleProducts?.[0]?.type.toLowerCase() === 'frontal'
			? _color?.includes('Blonde613')
				? singleProducts?.[0]?.sales
					? (_price2 += 10)
					: (_price2 += 10)
				: singleProducts?.[0]?.sales
				? _hairType?.includes('Bodywave') ||
				  _hairType?.includes('Wavy') ||
				  _hairType?.includes('Curly')
					? (_price2 += 5)
					: _price2
				: _price2
			: // checking for closure
			_color?.includes('Natural black') &&
			  (_hairType?.includes('Bodywave') ||
					_hairType?.includes('Wavy') ||
					_hairType?.includes('Curly'))
			? ((_price2 += 5), singleProducts?.[0]?.sales && (_price2 += 5))
			: _color?.includes('Natural black') && _hairType?.includes('Straight')
			? singleProducts?.[0]?.sales && _price2
			: _color?.includes('Blonde613') &&
			  (_hairType?.includes('Bodywave') || _hairType?.includes('Wavy'))
			? singleProducts?.[0]?.sales && (_price2 += 15)
			: (_price2 += 10)

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name
	const id = singleProducts?.[0] && singleProducts?.[0]?._id
	const image = singleProducts?.[0] && singleProducts?.[0]?.image
	const color = singleProducts?.[0] && singleProducts?.[0]?.color
	const description = singleProducts?.[0] && singleProducts?.[0]?.description
	const width = singleProducts?.[0] && singleProducts?.[0]?.widthlength
	const price =
		singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
		singleProducts?.[0]?.type.toLowerCase() === 'closure'
			? f_cPrice
			: _price
	const hairLength = length
	const hairColor = _color || color
	const hairTexture = _hairType && _hairType

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
		{ key: 'Hair Texture', value: name },
		{ key: 'Hair Color', value: color },
		{
			key: 'Hair Length',
			value: `Available from ${sizes?.[0]}" - ${
				sizes?.[sizes.length - 1]
			}" inches`,
		},
	]

	return (
		<div className="tw-pt-10 tw-relative tw-flex tw-flex-col tw-items-center ">
			<div className="tw-absolute tw-top-[-100px] tw-right-0">
				<Add2CartPopup singleCart={singleCart} setSingleCart={setSingleCart} />
			</div>
			{allProducts ? (
				<div className="tw-grid tw-grid-cols-2 tw-w-full tw-px-2 md:tw-w-[90%] md:tw-grid-cols-4 lg:tw-grid-cols-5 2xl:tw-grid-cols-6 3xl:tw-grid-cols-7 tw-gap-2 md:tw-gap-5 ">
					{allProducts.map((product) => {
						return (
							<div
								key={product._id}
								className="tw-justify-center tw-items-center tw-flex tw-flex-row">
								<Card
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
				<div className="single tw-absolute tw-z-30 tw-overflow-scroll tw-w-[100%] tw-shadow-lg tw-border-neutral-800 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-[-97px] md:tw-top-[-3px] md:tw-pt-20 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white">
					<div className="md:tw-w-[80%] xl:tw-w-[70%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
						<div className="tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
							<Slideshow images={singleProducts?.[0]} />
						</div>
						<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900 tw-mt-5 md:tw-mt-0">
							<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
								{singleProducts?.[0].name}
							</p>
							<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
								Description: {singleProducts?.[0].description}
							</p>
							<p className="tw-font-medium tw-text-xl tw-my-[10px]">
								Price:{' '}
								{singleProducts?.[0]?.sales &&
									`$${
										singleProducts?.[0].price - singleProducts?.[0].price * 0.15
									}${' '}
										USD${' '}`}
								<span
									className={
										singleProducts?.[0]?.sales &&
										'tw-ml-2 tw-line-through tw-text-neutral-400 tw-border-l-[1px] tw-border-neutral-500 tw-pl-3'
									}>
									${singleProducts?.[0].price} USD
								</span>
							</p>
							{singleProducts?.[0]?.sales && (
								<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-my-1 tw-text-red-600">
									Sales: {sales && '15%'}
								</p>
							)}
							<div className="tw-my-5 tw-border-t-[1px] tw-border-b-[1px] tw-border-red-700 tw-py-5">
								{desc.map((item, idx) => (
									<div className="tw-flex tw-flex-col tw-mb-2 tw-text-sm">
										<span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
											{item.key}:{' '}
										</span>
										<span>{item.value}</span>
									</div>
								))}
							</div>
							{singleProducts?.[0]?.type.toLowerCase() === 'frontal' ||
							singleProducts?.[0]?.type.toLowerCase() === 'closure' ? (
								<div>
									<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
										<div className="tw-flex tw-flex-wrap">
											{_hairColor.map((colr, idx) => (
												<span
													onClick={() => {
														setColor(colr)
													}}
													className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
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
													className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
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
													className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[16px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
													key={idx}>
													{size}inch
												</span>
											))}
										</div>
									</div>
								</div>
							) : (
								<div className="tw-flex tw-flex-col tw-mb-5">
									<div className="tw-flex tw-flex-wrap">
										{sizes.map((size, idx) => (
											<span
												onClick={() => {
													setLength(size)
													setError(false)
												}}
												className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-px-2 tw-text-[16px] tw-text-neutral-900 tw-p-5 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
												key={idx}>
												{size}inch
											</span>
										))}
									</div>
								</div>
							)}

							{error && (
								<div>
									<p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
										Please provide length for {singleProducts?.[0].name}
									</p>
								</div>
							)}

							{isInCart(singleProduct, cartItems) ? (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300"
									onClick={cartItems.length !== 0 ? IncreaseItem : null}>
									<span>Add more</span>
								</div>
							) : (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300"
									onClick={addToCart}>
									<span>Add to cart</span>
								</div>
							)}

							<div
								onClick={() => setSingleproducts(null)}
								className="tw-text-black tw-text-sm tw-font-normal tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-mt-5 tw-mb-20 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-300 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300  ">
								<span>Close</span>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Products
