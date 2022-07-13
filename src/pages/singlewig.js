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

const DealPage = () => {
	const [singleWig, setSingleWig] = React.useState([])
	const [singleCart, setSingleCart] = React.useState(null)
	const [error, setError] = React.useState(false)
	const [imageArray, setImageArray] = React.useState([])
	const [_quantity, setQuantity] = React.useState(1)
	const [_length, setLength] = React.useState(null)
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const category = window.location.pathname.split('/').filter((x) => x)?.[0]
	const wigId = window.location.pathname
		.split('/')
		.filter((x) => x)?.[1]
		.split('-')?.[1]
	const lengthArray = [
		'14inch',
		'16inch',
		'18inch',
		'20inch',
		'22inch',
		'24inch',
	]

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
					image1: item?.image1,
					image2: item?.image2,
					image3: item?.image3,
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

	const wigProduct = {
		name,
		id,
		image,
		price,
		description,
		hairTexture,
		hairLength,
		quantity,
	}

	const addToCart = () => {
		if (quantity && _length) {
			dispatch(addToCartItem(wigProduct))
		} else {
			setError(true)
		}
		setTimeout(() => {
			_length && setSingleCart(wigProduct)
		}, 1000)
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(wigProduct))
		setTimeout(() => {
			setSingleCart(wigProduct)
		}, 1000)
	}

	return (
		<>
			<Helmet>
				<title>{`${name}-Hair-Bundle-Deals`}</title>
			</Helmet>
			<Layout>
				<div className="tw-w-full tw-bg-neutral-100 tw-flex tw-flex-col tw-items-center">
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
							<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2">
								{lengthArray.map((item) => (
									<div
										onClick={() => {
											item === '16inch' && setLength(item)
											item === '16inch' && setError(false)
										}}
										className={`tw-text-center hover:tw-cursor-pointer hover:tw-bg-neutral-900 tw-text-white tw-bg-neutral-400 tw-px-5 tw-py-2 tw-ease-in tw-duration-300 tw-rounded-sm tw-max-w-[300px] ${
											item !== '16inch' && 'tw-line-through'
										}`}>
										<span>{item}</span>
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
							<span className="tw-text-sm">
								or 4 interest-free payments of ${price / 4} with{' '}
								<span className="tw-text-blue-500">Stripe payment</span>
							</span>
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

export default DealPage
