import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import { CgClose } from 'react-icons/cg'
import Card from '../components/Card4'
import axios from 'axios'
import { GrCheckmark } from 'react-icons/gr'
import {
	addToCartItem,
	increaseCartItem,
	selectCartItems,
	selectItemCount,
} from '../slices/appSlices'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/user-context'
import { isInCart } from '../utils/helpers'

function ClosureFrontal() {
	const itemCount = useSelector(selectItemCount)
	const { user } = useContext(UserContext)
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
	const navigate = useNavigate()
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

	function handleCheckout() {
		navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
		setTimeout(() => {
			setTimeout(function () {
				window.scrollTo(0, window.innerHeight)
			}, 500)
		}, 500)
	}

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
	const hairLength = singleProducts?.[0]?.length
	const hairColor = color

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
		if (typeof price === 'number') {
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
					{singleCart && (
						<div className="tw-absolute bg-blur2 tw-border tw-border-neutral-300 tw-p-10 tw-w-[350px] tw-top-[130px] md:tw-top-[95px] tw-z-10 tw-right-0 md:tw-right-[40px]">
							<div className="tw-flex tw-items-center">
								<GrCheckmark />
								<span className="tw-text-xs tw-ml-2 tw-text-neutral-700">
									Item added to your cart
								</span>
							</div>
							<div className="tw-flex tw-flex-row tw-mb-10 tw-mt-7">
								<img
									id={singleCart._id}
									src={singleCart.image}
									alt={singleCart._id}
									className=" tw-w-[80px] tw-h-[120px] tw-mr-3 tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
								/>
								<div className="tw-flex tw-flex-col tw-text-sm">
									<span>{singleCart.name}</span>
									<span>Length - {singleCart.hairLength}"</span>
								</div>
							</div>
							<div
								onClick={() =>
									navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
								}
								className="tw-border tw-border-black tw-py-2 tw-bg-white tw-text-center tw-mb-3">
								<button>View cart ({itemCount})</button>
							</div>
							<div
								onClick={handleCheckout}
								className="tw-bg-black tw-text-white tw-py-2 tw-text-center">
								<button>Check out</button>
							</div>
							<div
								onClick={() => setSingleCart(null)}
								size={25}
								className="tw-text-center tw-mt-2 tw-border-b tw-pb-1 hover:tw-cursor-pointer">
								<span>Continue shopping</span>
							</div>
							<div className="tw-absolute tw-top-10 tw-right-5 hover:tw-cursor-pointer">
								<CgClose onClick={() => setSingleCart(null)} size={25} />
							</div>
						</div>
					)}
					{show && closureFrontal && (
						<div className="tw-flex tw-flex-wrap tw-items-center tw-justify-center tw-w-full tw-px-2 tw-gap-2 md:tw-gap-5">
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

					{singleProducts && (
						<div className="single tw-absolute tw-z-30 tw-overflow-scroll tw-w-[100%] tw-h-[100%] tw-right-0 tw-left-0 tw-top-0 md:tw-top-[95px] md:tw-pt-5 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white">
							<div className="md:tw-w-[80%] xl:tw-w-[70%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
								<div className="tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
									<img
										id={singleProducts?.[0]._id}
										src={singleProducts?.[0].image}
										alt={singleProducts?.[0]._id}
										className="tw-max-w-[70%] tw-object-contain tw-object-top md:tw-mr-10"
									/>
								</div>
								<div className="tw-max-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900 ">
									<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] bg-blur tw-leading-6">
										{singleProducts?.[0].name}
									</p>
									<p className="tw-font-medium tw-text-sm tw-mb-[1px] bg-blur tw-mt-0">
										Description: {singleProducts?.[0].description}
									</p>
									<p className="tw-font-medium tw-text-md tw-mb-[1px] bg-blur tw-my-1">
										Price: $
										{sales
											? singleProducts?.[0].price -
											  singleProducts?.[0].price * 0.15
											: singleProducts?.[0].price}{' '}
										USD
									</p>
									<p className="tw-font-medium tw-text-sm tw-mb-[1px] bg-blur tw-my-1 tw-text-red-600">
										Sales: {sales && '15%'}
									</p>
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
									<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
										<div className="tw-flex tw-flex-wrap">
											{_hairColor.map((colr, idx) => (
												<span
													onClick={() => {
														setColor(colr)
													}}
													className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-xs tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
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
													className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-xs tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
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
													className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-xs tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
													key={idx}>
													{size}inch
												</span>
											))}
										</div>
									</div>
									{error && (
										<div>
											<p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
												Please provide the requirement{' '}
												{singleProducts?.[0].name}
											</p>
										</div>
									)}
									<div className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300  ">
										{isInCart(singleProduct, cartItems) ? (
											<span
												onClick={cartItems.length !== 0 ? IncreaseItem : null}>
												Add more
											</span>
										) : (
											<span onClick={addToCart}>Add to cart</span>
										)}
									</div>
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
			</Layout>
		</>
	)
}

export default ClosureFrontal
