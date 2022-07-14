import React from 'react'
import { Helmet } from 'react-helmet'
import { getDatabase, ref, onValue } from 'firebase/database'
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
	const database = getDatabase()
	const [bundleDealsPercentage, setBundleDealsPercentage] = React.useState(12)
	const [deals, setDeals] = React.useState([])
	const [singleCart, setSingleCart] = React.useState(null)
	const [error, setError] = React.useState(false)
	const [dealsImage, setDealsImage] = React.useState([])
	const [dealPrice, setDealPrice] = React.useState(null)
	const [_quantity, setQuantity] = React.useState(1)
	const [_length, setLength] = React.useState(null)
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const category = window.location.pathname
		.split('/')
		.filter((x) => x)
		?.[window.location.pathname.split('/').filter((x) => x).length - 1].split(
			'-'
		)?.[
		window.location.pathname
			.split('/')
			.filter((x) => x)
			?.[window.location.pathname.split('/').filter((x) => x).length - 1].split(
				'-'
			).length - 1
	]

	React.useEffect(() => {
		const starCountRef = ref(database, 'bundle deals')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setBundleDealsPercentage(data?.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const lengthArray = [
		'14inch, 16inch, & 18inch',
		'16inch, 18inch, & 20inch',
		'18inch, 20inch, & 22inch',
		'20inch, 22inch, & 24inch',
	]
	const frntlClsr = window.location.pathname
		.split('-')
		?.[window.location.pathname.split('-').length - 1].split('&')?.[
		(window.location.pathname
			.split('-')
			?.[window.location.pathname.split('-').length - 1].split('&')).length - 1
	]

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const filtered = []
			let price = 0
			// eslint-disable-next-line array-callback-return
			products.filter((product) => {
				if (window.location.pathname.includes('bodywave')) {
					if (product.name.toLowerCase() === 'body wave') {
						filtered.push(product)
						// eslint-disable-next-line array-callback-return
						filtered.map((product) => {
							const length18 = product?.price + 20
							const length20 = product?.price + 30
							const length22 = product?.price + 40
							price += length18 + length20 + length22
						})
					}
				}
				if (window.location.pathname.includes('naturalcurly')) {
					if (product.name.toLowerCase() === 'natural curly') {
						filtered.push(product)
						// eslint-disable-next-line array-callback-return
						filtered.map((product) => {
							const length18 = product?.price + 20
							const length20 = product?.price + 30
							const length22 = product?.price + 40
							price += length18 + length20 + length22
						})
					}
				}
				if (window.location.pathname.includes('frontal')) {
					if (product.type.toLowerCase() === 'frontal') {
						filtered.push(product)
						price += product?.price + 20
					}
				} else if (window.location.pathname.includes('closure')) {
					if (product.type.toLowerCase() === 'closure') {
						filtered.push(product)
						price += product?.price + 20
					}
				}
				const discnt = Number(
					(price * (bundleDealsPercentage / 100)).toFixed(2)
				)
				setDealPrice((price - discnt).toFixed(2))
			})

			setDeals(filtered.sort((a, b) => a.name.localeCompare(b.name)))
			const imgs = []
			filtered
				.sort((a, b) => a.name.localeCompare(b.name))
				// eslint-disable-next-line array-callback-return
				.map((deal) => {
					const imgObj = [
						{
							image: deal?.image,
							image2: deal?.image2 && deal?.image2,
						},
					]
					imgs.push(...imgObj)
				})
			const imgSpread = []
			// eslint-disable-next-line array-callback-return
			imgs.map((item) => {
				imgSpread.push(item.image)
				imgSpread.push(item.image2)
			})
			const rever = imgSpread.filter((x) => x).reverse()
			setDealsImage(rever)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Adding to cart items
	const name =
		deals[0]?.name.toLowerCase().includes('frontal') ||
		deals?.[0]?.name.toLowerCase().includes('closure')
			? deals[1]?.name
			: deals[0]?.name
	const id =
		deals[0]?.name.toLowerCase().includes('frontal') ||
		deals?.[0]?.name.toLowerCase().includes('closure')
			? deals?.[1]?._id
			: deals?.[0]?._id
	const image =
		deals[0]?.name.toLowerCase().includes('frontal') ||
		deals?.[0]?.name.toLowerCase().includes('closure')
			? deals?.[1]?.image
			: deals?.[0]?.image
	const description =
		deals[0]?.name.toLowerCase().includes('frontal') ||
		deals?.[0]?.name.toLowerCase().includes('closure')
			? deals?.[1]?.description
			: deals?.[0]?.description
	const price = dealPrice
	const hairLength = _length
	const hairTexture =
		deals[0]?.name.toLowerCase().includes('frontal') ||
		deals?.[0]?.name.toLowerCase().includes('closure')
			? deals?.[1]?.name
			: deals?.[0]?.name
	const quantity = Number(_quantity)

	const dealsProduct = {
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
			dispatch(addToCartItem(dealsProduct))
		} else {
			setError(true)
		}
		setTimeout(() => {
			_length && setSingleCart(dealsProduct)
		}, 1000)
	}

	const IncreaseItem = () => {
		dispatch(increaseCartItem(dealsProduct))
		setTimeout(() => {
			setSingleCart(dealsProduct)
		}, 1000)
	}

	return (
		<>
			<Helmet>
				<title>{`${name}-Hair-Bundle-Deals`}</title>
			</Helmet>
			<Layout sales={bundleDealsPercentage}>
				<div className="tw-w-full tw-bg-white tw-flex tw-flex-col tw-items-center">
					<div className="tw-fixed tw-z-20 tw-top-0 md:tw-top-[-95px] tw-right-0">
						<Add2CartPopup
							singleCart={singleCart}
							setSingleCart={setSingleCart}
						/>
					</div>
					<div className="tw-pt-[70px] xl:tw-w-[80%] tw-px-5 tw-grid md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5">
						<div className="">
							<Slideshow images={dealsImage} iconSize={40} />
						</div>
						<div className="">
							<h1 className="tw-text-xl md:tw-text-3xl tw-uppercase">
								{name} & {frntlClsr} - 3 Bundle Deal
							</h1>
							<div className="tw-mb-5">
								<RatingFix isReview={true} size={20} color="black" />
							</div>
							<span>Bundles</span>
							<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-2">
								{lengthArray.map((item) => (
									<div
										onClick={() => {
											item === '18inch, 20inch, & 22inch' && setLength(item)
											item === '18inch, 20inch, & 22inch' && setError(false)
										}}
										className={`tw-text-center hover:tw-cursor-pointer hover:tw-bg-neutral-900 tw-text-white tw-bg-neutral-400 tw-px-5 tw-py-2 tw-ease-in tw-duration-300 tw-rounded-sm tw-max-w-[300px] ${
											item !== '18inch, 20inch, & 22inch' && 'tw-line-through'
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
									${(dealPrice * _quantity).toFixed(2)}
								</span>
							</div>
							<span className="tw-text-sm">
								or 4 interest-free payments of ${dealPrice / 4} with{' '}
								<span className="tw-text-blue-500">Stripe payment</span>
							</span>
							{error && (
								<div>
									<p className="tw-text-left tw-mb-2 tw-mt-5 tw-text-red-600 tw-text-xs">
										Please provide length and quantity for your order
									</p>
								</div>
							)}
							{isInCart(dealsProduct, cartItems) ? (
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
