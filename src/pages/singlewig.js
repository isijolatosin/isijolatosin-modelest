import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import axios from 'axios'
import Slideshow from '../utils/Slideshow'
import RatingFix from '../components/shared/RatingFix'
import { isInCart } from '../utils/helpers'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import Reviews from '../components/shared/Reviews'
import Add2CartPopup from '../components/shared/Add2CartPopup'
import { useDispatch, useSelector } from 'react-redux'
import { getDatabase, ref, onValue } from 'firebase/database'

const paypal = require('../../src/assets/paypal.png')
const stripe = require('../../src/assets/stripe.png')

const SingleWig = () => {
	const [singleWig, setSingleWig] = React.useState([])
	const [singleCart, setSingleCart] = React.useState(null)
	const [error, setError] = React.useState(false)
	const [imageArray, setImageArray] = React.useState([])
	const [_quantity, setQuantity] = React.useState(1)
	const [_length, setLength] = React.useState(null)
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const category = window.location.pathname.split('/').filter((x) => x)?.[0]
	const database = getDatabase()
	const [sales, setSales] = React.useState(null)
	const wigId = window.location.pathname
		.split('/')
		.filter((x) => x)?.[1]
		.split('-')?.[1]

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const filtered = products.filter((product) => product._id === wigId)

			setSingleWig(filtered.sort((a, b) => a.name.localeCompare(b.name)))

			const imgArray = []
			// eslint-disable-next-line array-callback-return
			filtered.map((item) => {
				const obj = {
					image: item?.image,
					image1: item?.image2,
					image2: item?.image3,
					image3: item?.image4,
				}
				imgArray.push(obj)
				setImageArray(obj)
			})
		} catch (error) {
			console.log(error)
		}
	}
	React.useEffect(() => {
		fetchProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Adding to cart items
	const name = singleWig[0]?.name

	const id = singleWig[0]?._id
	const image = imageArray?.image
	const description = singleWig[0]?.description
	const price = singleWig[0]?.price
	const hairLength = _length
	const hairTexture = singleWig[0]?.texture
	const quantity = Number(_quantity)
	const avLengths =
		singleWig[0]?.availablelength.length > 3
			? singleWig[0]?.availablelength.split(', ')
			: [singleWig[0]?.availablelength]
	const lengths =
		singleWig[0]?.length.length > 3
			? singleWig[0]?.availablelength.split(', ')
			: [String(singleWig[0]?.length)]

	const lengthArray = [...lengths]
	const allSizes = [...avLengths]

	const hairColor = singleWig[0]?.color

	const wigProduct = {
		name,
		id,
		image,
		price,
		description,
		hairTexture,
		hairLength,
		quantity,
		hairColor,
	}

	const addToCart = () => {
		if (quantity && _length) {
			dispatch(addToCartItem(wigProduct))
			setTimeout(() => {
				setSingleCart(wigProduct)
			}, 1000)
		} else {
			setError(true)
		}
	}

	const IncreaseItem = () => {
		if (quantity && _length) {
			dispatch(increaseCartItem(wigProduct))
			setTimeout(() => {
				setSingleCart(wigProduct)
			}, 1000)
		} else {
			setError(true)
		}
	}
	const aLength =
		singleWig[0]?.availablelength.length > 2
			? singleWig[0]?.availablelength.split(', ')
			: singleWig[0]?.availablelength

	const desc = [
		{ key: 'Brand', value: `Raw ${singleWig[0]?.brand} hair` },
		{
			key: 'Hair Texture',
			value: singleWig[0]?.texture,
		},
		{ key: 'Hair Color', value: singleWig[0]?.color },
		{ key: 'Material', value: '100% Human Hair' },
		{ key: 'Density', value: `${singleWig[0]?.density}%` },
		{
			key: 'Hair Length',
			value: Array.isArray(aLength)
				? `Available from ${aLength?.[0]}" - ${
						aLength?.[aLength.length - 1]
				  }" inches`
				: `Available length is ${aLength}" inches`,
		},
		{
			key: 'Cap Size',
			value:
				singleWig[0]?.capsize || 'Average Size(Head circumference: 54cm - 58cm',
		},
		{
			key: 'Return policy',
			value:
				'We accept 10-days no reason return exchange with hair not been used',
		},
		{
			key: 'Delivery time',
			value:
				'We usually ship the order within 24 hours after order confirmation, except for weekends and holidays - (order confirmation is within 2 weeks)',
		},
		{ key: 'Can be bleached.dyed', value: 'Yes' },
	]

	return (
		<>
			<Helmet>
				<title>{`${name}-Hair-Bundle-Deals`}</title>
			</Helmet>
			<Layout>
				<div
					className={`${
						sales ? 'tw-pt-[70px] md:tw-pt-[50px]' : 'tw-pt-0'
					} tw-w-full tw-bg-neutral-100 tw-flex tw-flex-col tw-items-center`}>
					<div className="tw-fixed tw-z-20 tw-top-0 md:tw-top-[-95px] tw-right-0">
						<Add2CartPopup
							singleCart={singleCart}
							setSingleCart={setSingleCart}
							quantity={_quantity}
						/>
					</div>
					<div className="tw-pt-[70px] xl:tw-w-[80%] tw-px-5 tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5">
						<div className="">
							<Slideshow images={imageArray} iconSize={40} />
						</div>
						<div className="">
							<h1 className="tw-text-xl md:tw-text-3xl tw-uppercase">{name}</h1>
							<div className="tw-mb-5">
								<RatingFix isReview={true} size={20} color="black" />
							</div>
							<span>Bundles</span>
							<div className="tw-flex tw-flex-wrap">
								{allSizes.map(
									// eslint-disable-next-line array-callback-return
									(item) =>
										lengthArray.includes(item) ? (
											<div
												onClick={() => {
													setLength(item)
													setError(false)
												}}
												className={` tw-flex tw-flex-wrap tw-mr-2 tw-mb-2 tw-p-2 tw-px-3 tw-border-[1px] tw-border-neutral-900 tw-rounded-full tw-cursor-pointer hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300 ${
													item === _length && 'tw-bg-neutral-900 tw-text-white'
												}`}>
												<span>{item}</span>
											</div>
										) : (
											<div
												className={`tw-flex tw-flex-wrap tw-mr-2 tw-mb-2 tw-p-2 tw-px-3 tw-border-[1px] tw-rounded-full tw-cursor-not-allowed tw-text-neutral-300`}>
												<span>{item}</span>
											</div>
										)
								)}
							</div>
							<div className="tw-grid tw-mt-5 tw-grid-cols-1 md:tw-grid-cols-2 md:tw-gap-x-10">
								{desc.map((item, idx) => (
									<div className="tw-flex tw-flex-col tw-mb-2 tw-text-sm tw-capitalize">
										<span className="tw-uppercase tw-text-xs tw-text-red-600 tw-font-bold">
											{item.key}:{' '}
										</span>
										<span>{item.value}</span>
									</div>
								))}
							</div>
							<div className="tw-flex tw-items-center">
								<span className="tw-mr-2">Quantity: </span>
								<div>
									<input
										type="number"
										name="quantity"
										id="quantity"
										value={_quantity}
										onChange={(e) => setQuantity(e.target.value)}
										placeholder="Quantity"
										className="tw-mt-5 tw-block tw-w-[50px] tw-px-3 tw-py-2 tw-border tw-border-neutral-100 tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
									/>
								</div>
							</div>
							<div className="tw-mb-1">
								<span className="tw-text-3xl">
									${price * Number(_quantity)}:00
								</span>
							</div>
							<p className="tw-text-xs tw-flex tw-items-center tw-text-neutral-600">
								Pay in 4 interest-free payments of ${price / 4} with{' '}
								<img
									src={stripe}
									alt="paypal"
									className="tw-w-[45px] tw-ml-[2px]"
								/>
							</p>
							<p className="tw-text-xs tw-flex tw-items-center tw-text-neutral-600">
								or 4 interest-free payment of ${price / 4} with{' '}
								<img
									src={paypal}
									alt="paypal"
									className="tw-w-[45px] tw-mx-1"
								/>
							</p>
							<p className="tw-text-xs tw-text-blue-700">
								Available @ checkout
							</p>
							{error && (
								<div>
									<p className="tw-text-left tw-mb-2 tw-mt-5 tw-text-red-600 tw-text-xs">
										Please provide length and quantity for your order
									</p>
								</div>
							)}
							{isInCart(wigProduct, cartItems) ? (
								<div
									className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[50%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
										!error && 'tw-mt-5'
									}`}
									onClick={cartItems.length !== 0 ? IncreaseItem : null}>
									<span>Add more</span>
								</div>
							) : (
								<div
									className={`tw-text-white tw-text-sm tw-font-light tw-max-w-[50%] tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-text-neutral-900 hover:tw-bg-white hover:tw-cursor-pointer tw-ease-in tw-duration-300 ${
										!error && 'tw-mt-5'
									}`}
									onClick={addToCart}>
									<span>Add to cart</span>
								</div>
							)}
						</div>
					</div>
					<Reviews category={category} />
				</div>
			</Layout>
		</>
	)
}

export default SingleWig
