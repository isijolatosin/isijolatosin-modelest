import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import { isInCart } from '../utils/helpers'

function Card({
	product,
	setSingleproducts,
	setSingleCart,
	scrollToTop,
	sales,
}) {
	const [clickedID, setClickedID] = React.useState('')
	// const [ID, setID] = React.useState('')
	const cartItems = useSelector(selectCartItems)
	const [error, setError] = React.useState(false)
	const dispatch = useDispatch()
	const [bundles, setBundles] = React.useState({
		widthlength: product.type.toLowerCase() === 'frontal' ? '13x4' : '5x4',
		length: null,
		color: 'Natural black',
		hairType: 'Straight',
	})
	const lengthArr = product.availablelength.split(',')
	const colorArr = product?.availablecolor?.split(', ')
	const widthlength = product?.widthlength?.split(', ')
	const hairType = ['Straight', 'Bodywave', 'Wavy', 'Curly']

	function handleMouseIn(event) {
		setClickedID(event.target.id)
	}

	const handleOnChange = (e) => {
		setBundles({ ...bundles, [e.target.name]: e.target.value })
		setError(false)
	}

	async function handleViewImage(event) {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const result = products.filter(
				(product) => product._id === event.target.id
			)
			setSingleproducts(result)
		} catch (error) {
			console.log(error)
		}
		scrollToTop()
	}

	let cardPrice1 = product.price
	let salesAmount1 = Number(product.price - product.price * (sales / 100))

	//  Actual price1
	if (bundles.length === '14') {
		cardPrice1 = product.price
	} else if (bundles.length === '16') {
		cardPrice1 = product.price + 10
	} else if (bundles.length === '18') {
		cardPrice1 = product.price + 20
	} else if (bundles.length === '20') {
		cardPrice1 = product.price + 30
	} else if (bundles.length === '22') {
		cardPrice1 = product.price + 40
	}
	// Sales Price1
	if (bundles.length === '14') {
		salesAmount1 = product.price - product.price * (sales / 100)
	} else if (bundles.length === '16') {
		salesAmount1 = salesAmount1 + 10
	} else if (bundles.length === '18') {
		salesAmount1 = salesAmount1 + 20
	} else if (bundles.length === '20') {
		salesAmount1 = salesAmount1 + 30
	} else if (bundles.length === '22') {
		salesAmount1 = salesAmount1 + 40
	}

	let cardPrice2 = product.price
	let salesAmount2 = Number(product.price - product.price * (sales / 100))
	// Actual Price2
	if (bundles.length === '14') {
		cardPrice2 = product.price
	} else if (bundles.length === '16') {
		cardPrice2 = product.price + 6
	} else if (bundles.length === '18') {
		cardPrice2 = product.price + 12
	} else if (bundles.length === '20') {
		cardPrice2 = product.price + 18
	} else if (bundles.length === '22') {
		cardPrice2 = product.price + 24
	}
	// Sales Price2
	if (bundles.length === '14') {
		salesAmount2 = Number(product.price - product.price * (sales / 100))
	} else if (bundles.length === '16') {
		salesAmount2 = salesAmount2 + 6
	} else if (bundles.length === '18') {
		salesAmount2 = salesAmount2 + 12
	} else if (bundles.length === '20') {
		salesAmount2 = salesAmount2 + 18
	} else if (bundles.length === '22') {
		salesAmount2 = salesAmount2 + 24
	}

	// Adding to cart items
	const { name, _id, image, description } = product
	const pricePredict = () => {
		if (product.type.toLowerCase() === 'frontal') {
			if (
				bundles.color.includes('Natural black') &&
				(bundles.hairType.includes('Bodywave') ||
					bundles.hairType.includes('Wavy') ||
					bundles.hairType.includes('Curly'))
			) {
				cardPrice2 += 10
				salesAmount2 += 10
			} else if (
				bundles.color.includes('Natural black') &&
				bundles.hairType.includes('Straight')
			) {
				if (sales !== 0) {
					return salesAmount2
				} else {
					return cardPrice2
				}
			}
		} else {
			if (
				bundles.color.includes('Natural black') &&
				(bundles.hairType.includes('Bodywave') ||
					bundles.hairType.includes('Wavy') ||
					bundles.hairType.includes('Curly'))
			) {
				if (sales !== 0) {
					return (salesAmount1 += 5)
				} else {
					return (cardPrice1 += 5)
				}
			} else if (
				bundles.color.includes('Natural black') &&
				bundles.hairType.includes('Straight')
			) {
				if (sales !== 0) {
					return salesAmount1
				} else {
					return cardPrice1
				}
			}

			if (
				bundles.color.includes('Blonde613') &&
				(bundles.hairType.includes('Bodywave') ||
					bundles.hairType.includes('Wavy') ||
					bundles.hairType.includes('Curly'))
			) {
				if (sales !== 0) {
					return (salesAmount1 += 15)
				} else {
					return (cardPrice1 += 15)
				}
			} else if (
				bundles.color.includes('Blonde613') &&
				bundles.hairType.includes('Straight')
			) {
				if (sales !== 0) {
					return (salesAmount1 += 10)
				} else {
					return (cardPrice1 += 10)
				}
			}
		}
	}
	const price = pricePredict()
	const hairLength = bundles.length
	const hairColor = bundles.color

	const singleProduct = {
		name,
		id: _id,
		image,
		price,
		hairLength,
		hairColor,
		description,
	}

	const addToCart = () => {
		if (bundles?.length) {
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
		setTimeout(() => {
			setSingleCart(singleProduct)
		}, 1000)
	}

	return (
		<div
			onMouseOver={handleMouseIn}
			onMouseOut={() => setClickedID('')}
			className="tw-w-[100%] tw-h-[300px] lg:tw-h-[400px] tw-mb-2 md:tw-mx-1 md:tw-w-[300px] tw-shadow-lg tw-relative tw-rounded-sm">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product.image}
				alt={product._id}
				className="tw-w-full tw-h-[70%] lg:tw-h-[75%] tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
			/>
			{product?.sales && sales !== 0 && (
				<span className="tw-absolute tw-top-0 tw-left-0 tw-bg-gray-600 tw-text-white tw-rounded-tl-sm tw-rounded-br-sm tw-text-xs tw-p-[2px] tw-font-light">
					on sales
				</span>
			)}
			{clickedID === product._id && (
				<div className="tw-absolute tw-top-0 tw-right-0 tw-bg-neutral-300 tw-rounded-tr-lg tw-rounded-bl-lg tw-text-xs tw-p-2">
					<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
						View Image
					</span>
				</div>
			)}
			<div className="tw-bg-white tw-text-neutral-800 tw-px-2 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-lg">
				<div className="tw-pt-2 tw-flex tw-justify-between tw-w-full tw-text-[14px]">
					<p className="tw-font-bold">{product.name}</p>
					<div className="tw-pb-2 tw-flex tw-flex-col">
						{sales !== 0 && product.sales && (
							<span className="tw-mr-2 tw-font-semibold">
								$
								{product.type.toLowerCase() === 'frontal'
									? salesAmount2.toFixed(2)
									: salesAmount1.toFixed(2)}{' '}
								USD
							</span>
						)}
						<span
							className={
								sales !== 0 && product.sales
									? 'tw-line-through tw-font-light tw-text-[11px]'
									: 'tw-font-semibold'
							}>
							$
							{product.type.toLowerCase() === 'frontal'
								? cardPrice2.toFixed(2)
								: cardPrice1.toFixed(2)}{' '}
							USD
						</span>
					</div>
				</div>
				<div className="tw-flex tw-items-center tw-justify-between tw-w-full">
					<select
						className="tw-flex-[0.5] tw-text-neutral-900 tw-mt-1 tw-block tw-w-full tw-mr-2 tw-px-1 tw-py-1 tw-border tw-border-neutral-900 tw-rounded-full tw-text-xs tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-neutral-900 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0"
						onChange={handleOnChange}
						id="length"
						value={bundles.length}
						name="length">
						{lengthArr.map((len, idx) => (
							<option key={idx}>{len}</option>
						))}
					</select>
					<select
						className="tw-flex-[0.5] tw-text-neutral-900 tw-mt-1 tw-block tw-w-full tw-px-1 tw-py-1 tw-border tw-border-neutral-900 tw-rounded-full tw-text-xs tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-neutral-900 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0"
						onChange={handleOnChange}
						id="widthlength"
						value={bundles.widthlength}
						name="widthlength">
						{widthlength.map((len, idx) => (
							<option key={idx}>{len}</option>
						))}
					</select>
				</div>
				<div className="tw-flex tw-items-center tw-justify-between tw-w-full">
					<select
						className="tw-text-neutral-900 tw-mt-1 tw-mr-2 tw-block tw-w-full tw-px-1 tw-py-1 tw-border tw-border-neutral-900 tw-rounded-full tw-text-xs tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-neutral-900 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0 tw-mb-3"
						onChange={handleOnChange}
						id="color"
						value={bundles.color}
						name="color">
						{colorArr.map((colo, idx) => (
							<option key={idx}>{colo}</option>
						))}
					</select>
					<select
						className="tw-text-neutral-900 tw-mt-1 tw-block tw-w-full tw-px-1 tw-py-1 tw-border tw-border-neutral-900 tw-rounded-full tw-text-xs tw-shadow-sm tw-placeholder-neutral-900 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-neutral-900 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-500 invalid:tw-text-red-600 focus:invalid:tw-border-red-500 focus:invalid:tw-ring-red-500 tw-outline-0 tw-mb-3"
						onChange={handleOnChange}
						id="hairType"
						value={bundles.hairType}
						name="hairType">
						{hairType.map((type, idx) => (
							<option key={idx}>{type}</option>
						))}
					</select>
				</div>
				{isInCart(singleProduct, cartItems) ? (
					<div
						className="tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-full tw-bg-neutral-900 tw-px-3 tw-py-[5px] tw-items-center tw-justify-center tw-max-w-[100%] tw-mx-auto tw-text-neutral-50 hover:tw-cursor-pointer hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mb-2 hover:md:tw-text-neutral-900 hover:md:tw-bg-white "
						onClick={cartItems.length !== 0 ? IncreaseItem : null}>
						<div className="tw-flex tw-flex-row tw-items-center">
							<span className="tw-mr-3">Add More</span>
						</div>
					</div>
				) : (
					<div
						className="tw-text-xs tw-font-light tw-flex tw-flex-row tw-rounded-full tw-bg-neutral-900 tw-px-3 tw-py-[5px] tw-items-center tw-justify-center tw-max-w-[100%] tw-mx-auto tw-text-neutral-50 hover:tw-cursor-pointer hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mb-2 hover:md:tw-text-neutral-900 hover:md:tw-bg-white "
						onClick={addToCart}>
						<div className="tw-flex tw-flex-row tw-items-center">
							<span className="tw-mr-3">Add to cart</span>
						</div>
					</div>
				)}
				{error && (
					<div>
						<p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
							Please provide length ...
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default Card
