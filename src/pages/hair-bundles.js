import React from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import Layout from '../components/shared/Layout'
import Card from '../components/Card2'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import { useDispatch, useSelector } from 'react-redux'
import Add2CartPopup from '../components/shared/Add2CartPopup'
import SingleProductModal from '../components/shared/SingleProductModal'
import Reviews from '../components/shared/Reviews'

function HairBundles() {
	const [hairBundles, setHairBundles] = React.useState([])
	const [singleProducts, setSingleproducts] = React.useState(null)
	const [singleCart, setSingleCart] = React.useState(null)
	const [show, setShow] = React.useState(false)
	const [error, setError] = React.useState(false)
	const [sales, setSales] = React.useState(false)
	const [length, setLength] = React.useState(null)
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
	}, [])

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const filtered = products.filter(
				(product) =>
					product.color.toLowerCase() === 'natural black' &&
					product.name.toLowerCase() !== 'closure' &&
					product.name.toLowerCase() !== 'frontal'
			)
			setHairBundles(filtered.sort((a, b) => a.name.localeCompare(b.name)))
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		setTimeout(() => {
			fetchProducts()
			setShow(true)
		}, 3000)
	}, [])

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}
	const sizes = singleProducts?.[0].availablelength.split(', ')

	let cardPrice = sales
		? singleProducts?.[0]?.price - singleProducts?.[0]?.price * 0.15
		: singleProducts?.[0]?.price

	let _price

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

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name
	const id = singleProducts?.[0] && singleProducts?.[0]?._id
	const image = singleProducts?.[0] && singleProducts?.[0]?.image
	const color = singleProducts?.[0] && singleProducts?.[0]?.color
	const description = singleProducts?.[0] && singleProducts?.[0]?.description
	const price = _price
	const hairLength = length
	const hairColor = color
	const hairTexture = singleProducts?.[0] && singleProducts?.[0]?.name

	const singleProduct = {
		name,
		id,
		image,
		hairColor,
		price,
		hairLength,
		description,
		hairTexture,
	}
	console.log(singleProduct)
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
		setTimeout(() => {
			setSingleCart(singleProduct)
		}, 1000)
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
		<>
			<Helmet>
				<title>Hair Bundles</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? `${
									hairBundles.length === 0 && !show
										? 'tw-pt-[230px] home'
										: 'tw-pt-[160px] home'
							  } tw-pb-10 md:tw-pt-[150px] tw-h-full tw-relative tw-bg-neutral-200 tw-flex tw-flex-col tw-items-center tw-mx-auto`
							: 'tw-pb-10 md:tw-pt-24 tw-pt-32 tw-h-full tw-relative tw-bg-neutral-200 tw-flex tw-flex-col tw-items-center tw-mx-auto'
					}>
					<Add2CartPopup
						singleCart={singleCart}
						setSingleCart={setSingleCart}
					/>
					{show && hairBundles && (
						<div className="tw-w-full tw-px-2">
							<div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-2 md:tw-gap-5">
								{hairBundles.map((item) => (
									<div key={item._id}>
										<Card
											key={item._id}
											product={item}
											setSingleproducts={setSingleproducts}
											setSingleCart={setSingleCart}
											scrollToTop={scrollToTop}
										/>
									</div>
								))}
							</div>
							<Reviews category="hair-bundles" />
						</div>
					)}
					{!show && (
						<div className="tw-rounded-full progress">
							<div className="inner"></div>
						</div>
					)}

					<SingleProductModal
						singleProducts={singleProducts}
						setSingleproducts={setSingleproducts}
						sales={sales}
						desc={desc}
						sizes={sizes}
						setLength={setLength}
						setError={setError}
						error={error}
						singleProduct={singleProduct}
						cartItems={cartItems}
						IncreaseItem={IncreaseItem}
						addToCart={addToCart}
					/>
				</div>
			</Layout>
		</>
	)
}

export default HairBundles
