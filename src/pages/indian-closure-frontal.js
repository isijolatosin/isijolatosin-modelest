import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import { getDatabase, ref, onValue } from 'firebase/database'
import Card from '../components/Card4'
import axios from 'axios'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
} from '../slices/appSlices'
import { useDispatch, useSelector } from 'react-redux'
import Add2CartPopup from '../components/shared/Add2CartPopup'
import SingleProductModal from '../components/shared/SingleProductModal'
import Reviews from '../components/shared/Reviews'

function ClosureFrontal() {
	const [singleProducts, setSingleproducts] = React.useState(null)
	const [closureFrontal, setClosureFrontal] = React.useState([])
	const [show, setShow] = React.useState(false)
	const [error, setError] = React.useState(false)
	const [sales, setSales] = React.useState(null)
	const [length, setLength] = React.useState('14')
	const [_color, setColor] = React.useState(null)
	const [_hairType, sethairType] = React.useState(null)
	const [singleCart, setSingleCart] = React.useState(null)
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()
	const database = getDatabase()

	const _hairColor =
		singleProducts?.[0]?.type.toLowerCase() === 'frontal'
			? ['Natural black']
			: ['Natural black', 'Blonde613']
	const texture = ['Straight', 'Bodywave', 'Curly', 'Wavy']

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data?.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const filtered = products.filter(
				(product) =>
					product.type.toLowerCase() === 'closure' ||
					product.type.toLowerCase() === 'frontal'
			)
			setClosureFrontal(filtered.sort((a, b) => a.name.localeCompare(b.name)))
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

	let cardPrice =
		sales !== 0 && singleProducts?.[0]?.sales
			? singleProducts?.[0]?.price - singleProducts?.[0]?.price * (sales / 100)
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
	}

	const pricePredict = () => {
		if (singleProducts?.[0]?.type.toLowerCase() === 'Frontal') {
			if (
				_color?.includes('Natural black') &&
				(_hairType?.includes('Bodywave') ||
					_hairType?.includes('Wavy') ||
					_hairType?.includes('Curly'))
			) {
				return (_price += 10)
			} else if (
				_color?.includes('Natural black') &&
				_hairType?.includes('Straight')
			) {
				return _price
			}
		} else {
			if (
				_color?.includes('Natural black') &&
				(_hairType?.includes('Bodywave') ||
					_hairType?.includes('Wavy') ||
					_hairType?.includes('Curly'))
			) {
				return (_price += 5)
			} else if (
				_color?.includes('Natural black') &&
				_hairType?.includes('Straight')
			) {
				return _price
			}

			if (
				_color?.includes('Blonde613') &&
				(_hairType?.includes('Bodywave') ||
					_hairType?.includes('Wavy') ||
					_hairType?.includes('Curly'))
			) {
				return (_price += 15)
			} else if (
				_color?.includes('Blonde613') &&
				_hairType?.includes('Straight')
			) {
				return (_price += 10)
			}
		}
	}
	const price = Number(pricePredict())

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name
	const id = singleProducts?.[0] && singleProducts?.[0]?._id
	const image = singleProducts?.[0] && singleProducts?.[0]?.image
	const color = singleProducts?.[0] && singleProducts?.[0]?.color
	const description = singleProducts?.[0] && singleProducts?.[0]?.description
	const hairLength = length
	const hairColor = _color
	const hairTexture = _hairType && _hairType

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

	const addToCart = () => {
		if (typeof price === 'number' && length) {
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
		<>
			<Helmet>
				<title>Indian-Hair-Closure&Frontal</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? `${
									closureFrontal.length === 0 && !show
										? 'tw-pt-[230px] home'
										: 'tw-pt-[155px] home'
							  } tw-pb-10 md:tw-pt-[120px] tw-h-full tw-relative tw-bg-neutral-200 tw-flex tw-flex-col tw-items-center tw-mx-auto`
							: 'tw-pb-10 tw-pt-[110px] md:tw-pt-20 tw-h-full tw-relative tw-bg-neutral-200 tw-flex tw-flex-col tw-items-center tw-mx-auto home'
					}>
					<div className="tw-fixed tw-z-40 tw-top-0 md:tw-top-[-95px] tw-right-0 md:tw-right-[-30px]">
						<Add2CartPopup
							singleCart={singleCart}
							setSingleCart={setSingleCart}
						/>
					</div>
					{show && closureFrontal && (
						<div className="tw-w-full tw-px-2">
							<div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-gap-2 md:tw-gap-5">
								{closureFrontal.map((item) => (
									<div key={item._id}>
										<Card
											sales={sales}
											key={item._id}
											product={item}
											setSingleproducts={setSingleproducts}
											setSingleCart={setSingleCart}
											scrollToTop={scrollToTop}
										/>
									</div>
								))}
								<Reviews category="closure-frontal" color="white" />
							</div>
						</div>
					)}
					{!show && (
						<div className="tw-rounded-full progress">
							<div className="inner"></div>
						</div>
					)}

					{singleProducts && (
						<SingleProductModal
							category={singleProducts?.[0]?.name}
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
							_hairColor={_hairColor}
							texture={texture}
							sethairType={sethairType}
							setColor={setColor}
							price={price}
							length={length}
							color={_color}
							hairType={_hairType}
						/>
					)}
				</div>
			</Layout>
		</>
	)
}

export default ClosureFrontal
