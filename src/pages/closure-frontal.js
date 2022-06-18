import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
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

function ClosureFrontal() {
	const [singleProducts, setSingleproducts] = React.useState(null)
	const [closureFrontal, setClosureFrontal] = React.useState([])
	const [show, setShow] = React.useState(false)
	const [error, setError] = React.useState(false)
	const [sales, setSales] = React.useState(false)
	const [length, setLength] = React.useState(null)
	const [_color, setColor] = React.useState(null)
	const [_hairType, sethairType] = React.useState(null)
	const [singleCart, setSingleCart] = React.useState(null)
	const cartItems = useSelector(selectCartItems)
	const dispatch = useDispatch()

	const _hairColor =
		singleProducts?.[0]?.type.toLowerCase() === 'frontal'
			? ['Natural black']
			: ['Natural black', 'Blonde613']
	const texture = ['straight', 'Bodywave', 'Curly', 'Wavy']

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
	}

	const price =
		// checking for frontal
		singleProducts?.[0]?.type.toLowerCase() === 'frontal'
			? _color?.includes('Blonde613')
				? singleProducts?.[0]?.sales
					? (_price += 10)
					: (_price += 10)
				: singleProducts?.[0]?.sales
				? _hairType?.includes('Bodywave') ||
				  _hairType?.includes('Wavy') ||
				  _hairType?.includes('Curly')
					? (_price += 5)
					: _price
				: _price
			: // checking for closure
			_color?.includes('Natural black') &&
			  (_hairType?.includes('Bodywave') ||
					_hairType?.includes('Wavy') ||
					_hairType?.includes('Curly'))
			? ((_price += 5), singleProducts?.[0]?.sales && (_price += 5))
			: _color?.includes('Natural black') && _hairType?.includes('Straight')
			? singleProducts?.[0]?.sales && _price
			: _color?.includes('Blonde613') &&
			  (_hairType?.includes('Bodywave') || _hairType?.includes('Wavy'))
			? singleProducts?.[0]?.sales && (_price += 15)
			: (_price += 10)

	// Adding to cart items
	const name = singleProducts?.[0] && singleProducts?.[0]?.name
	const id = singleProducts?.[0] && singleProducts?.[0]?._id
	const image = singleProducts?.[0] && singleProducts?.[0]?.image
	const color = singleProducts?.[0] && singleProducts?.[0]?.color
	const description = singleProducts?.[0] && singleProducts?.[0]?.description
	const hairLength = length
	const hairColor = _color

	const singleProduct = {
		name,
		id,
		image,
		hairColor,
		price,
		hairLength,
		description,
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
	]

	return (
		<>
			<Helmet>
				<title>Closure & Frontal</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? `${
									closureFrontal.length === 0 && !show
										? 'tw-pt-[230px] home'
										: 'tw-pt-[160px] home'
							  } tw-pb-10 md:tw-pt-[150px] tw-h-full tw-relative tw-bg-neutral-200 tw-flex tw-flex-col tw-items-center tw-mx-auto`
							: 'tw-pb-10 md:tw-pt-24 tw-pt-32 tw-h-full tw-relative tw-bg-neutral-200 tw-flex tw-flex-col tw-items-center tw-mx-auto'
					}>
					<Add2CartPopup
						singleCart={singleCart}
						setSingleCart={setSingleCart}
					/>
					{show && closureFrontal && (
						<div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-w-[90%] md:tw-w-full tw-px-2 tw-gap-2 md:tw-gap-5">
							{closureFrontal.map((item) => (
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
						_hairColor={_hairColor}
						texture={texture}
						sethairType={sethairType}
						setColor={setColor}
					/>
				</div>
			</Layout>
		</>
	)
}

export default ClosureFrontal
