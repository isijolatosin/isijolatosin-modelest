import React from 'react'
import axios from 'axios'
import { FaOpencart } from 'react-icons/fa'
import { BsFillCartPlusFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import { isInCart } from '../utils/helpers'

function Card({ product, setSingleproducts }) {
	const [clickedID, setClickedID] = React.useState('')
	// const [ID, setID] = React.useState('')
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()
	const [bundles, setBundles] = React.useState({
		length: '',
		color: '',
	})

	function handleMouseIn(event) {
		setClickedID(event.target.id)
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
	}

	const length = [
		{ id: '1', name: 'Length' },
		{ id: 'len1', name: '14-inches' },
		{ id: 'len2', name: '16-inches' },
		{ id: 'len3', name: '18-inches' },
		{ id: 'len4', name: '20-inches' },
		{ id: 'len5', name: '22-inches' },
		{ id: 'len6', name: '24-inches' },
		{ id: 'len7', name: '26-inches' },
		{ id: 'len8', name: '28-inches' },
		{ id: 'len9', name: '30-inches' },
	]

	const color = [
		{ id: '1', name: 'Color' },
		{ id: 'colo1', name: 'Natural Black' },
		{ id: 'colo2', name: 'Blonde613' },
	]

	let cardPrice1 = product.price
	if (bundles.length === '14-inches') {
		cardPrice1 = product.price
	} else if (bundles.length === '16-inches') {
		cardPrice1 = 160
	} else if (bundles.length === '18-inches') {
		cardPrice1 = 170
	} else if (bundles.length === '20-inches') {
		cardPrice1 = 180
	} else if (bundles.length === '22-inches') {
		cardPrice1 = 190
	} else if (bundles.length === '24-inches') {
		cardPrice1 = 200
	} else if (bundles.length === '26-inches') {
		cardPrice1 = 210
	} else if (bundles.length === '28-inches') {
		cardPrice1 = 220
	} else if (bundles.length === '30-inches') {
		cardPrice1 = 230
	}
	let cardPrice2 = product.price
	if (bundles.length === '14-inches') {
		cardPrice2 = product.price
	} else if (bundles.length === '16-inches') {
		cardPrice2 = 220
	} else if (bundles.length === '18-inches') {
		cardPrice2 = 230
	} else if (bundles.length === '20-inches') {
		cardPrice2 = 240
	} else if (bundles.length === '22-inches') {
		cardPrice2 = 250
	} else if (bundles.length === '24-inches') {
		cardPrice2 = 260
	} else if (bundles.length === '26-inches') {
		cardPrice2 = 270
	} else if (bundles.length === '28-inches') {
		cardPrice2 = 280
	} else if (bundles.length === '30-inches') {
		cardPrice2 = 290
	}

	// Adding to cart items
	const { name, _id, image, description } = product
	const price =
		product.type.toLowerCase() === 'frontal'
			? bundles.color === 'Blonde613'
				? (cardPrice2 += 20)
				: cardPrice2
			: bundles.color === 'Blonde613'
			? (cardPrice1 += 20)
			: cardPrice1

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
		dispatch(addToCartItem(singleProduct))
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(singleProduct))
	}

	const handleOnChange = (e) => {
		setBundles({ ...bundles, [e.target.name]: e.target.value })
	}

	return (
		<div
			onMouseOver={handleMouseIn}
			onMouseOut={() => setClickedID('')}
			className="tw-w-[90%] tw-h-[600px] tw-mb-2 md:tw-mx-1 md:tw-w-[300px] tw-shadow-lg tw-relative tw-rounded-lg">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product.image}
				alt={product._id}
				className=" tw-w-full tw-h-full tw-object-cover tw-rounded-lg hover:tw-cursor-pointer"
			/>
			{clickedID === product._id && (
				<div className="tw-absolute tw-top-0 tw-right-0 tw-bg-neutral-300 tw-rounded-tr-lg tw-rounded-bl-lg tw-text-xs tw-p-2">
					<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
						View Image
					</span>
				</div>
			)}
			<div className="bg-blur tw-text-neutral-800 tw-pl-5 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-lg">
				<div className="tw-flex tw-flex-row tw-justify-between">
					<div className="tw-pt-2">
						<p className=" tw-text-sm">{product.name}</p>
						<p className=" tw-text-xs tw-text-neutral-600">
							{product.description}
						</p>
						<div className="tw-pb-2">
							<span>
								$
								{product.type.toLowerCase() === 'frontal'
									? cardPrice2
									: cardPrice1}
							</span>
						</div>
					</div>
				</div>
				<div className="tw-mr-5">
					<select
						className="tw-text-gray-500 tw-mt-1 tw-block tw-w-full tw-mr-5 tw-px-3 tw-py-2 tw-border tw-border-gray-100 tw-rounded-md tw-text-xs tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-noneinvalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-3"
						onChange={handleOnChange}
						id="length"
						value={bundles.length}
						name="length">
						{length.map((len) => (
							<option key={len.id}>{len.name}</option>
						))}
					</select>
					<select
						className="tw-text-gray-500 tw-mt-1 tw-block tw-w-full tw-mr-5 tw-px-3 tw-py-2 tw-border tw-border-gray-100 tw-rounded-md tw-text-xs tw-shadow-sm tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-noneinvalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-3"
						onChange={handleOnChange}
						id="color"
						value={bundles.color}
						name="color">
						{color.map((colo) => (
							<option key={colo.id}>{colo.name}</option>
						))}
					</select>
				</div>
				<div className="tw-text-sm tw-flex tw-flex-row tw-rounded-md tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500 tw-px-4 tw-py-2 tw-items-center tw-justify-center tw-w-[150px] tw-mx-auto tw-text-neutral-50 hover:tw-cursor-pointer hover:tw-text-neutral-400 tw-ease-in tw-duration-500 tw-mb-5">
					{isInCart(singleProduct, cartItems) ? (
						<div
							className="tw-flex tw-flex-row tw-items-center"
							onClick={cartItems.length !== 0 && IncreaseItem}>
							<span className="tw-mr-3">Add More</span>
							<BsFillCartPlusFill />
						</div>
					) : (
						<div
							className="tw-flex tw-flex-row tw-items-center"
							onClick={bundles.length !== '' && addToCart}>
							<span className="tw-mr-3">Add to cart</span>
							<FaOpencart />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Card
