import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FaOpencart, FaHandPointRight } from 'react-icons/fa'
import Layout from '../components/shared/Layout'
import CartItemsCheckout from '../components/CartItemsCheckout'
import {
	selectCartItems,
	selectItemCount,
	selectTotal,
} from '../slices/appSlices'
import StripeCheckout from '../components/checkout/stripe-checkout'
import Button from '../components/shared/Button'
import { UserContext } from '../context/user-context'
import {
	MdKeyboardArrowRight,
	MdOutlineKeyboardArrowDown,
	MdOutlineKeyboardArrowUp,
} from 'react-icons/md'
import { BsFillQuestionCircleFill } from 'react-icons/bs'

const logo = require('../assets/logo2.png')

const Cart = () => {
	const { user } = useContext(UserContext)
	const itemCount = useSelector(selectItemCount)
	const total = useSelector(selectTotal)
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()
	const [sales, setSales] = React.useState(false)
	const [redirect, setRedirect] = React.useState(false)
	const [showSum, setShowSum] = React.useState(false)
	const [pageCancel, setPageCancel] = React.useState(false)
	const discountPrice = Number(localStorage.getItem('discountPrice'))
	const database = getDatabase()
	const [showLoad, setShowLoad] = React.useState(false)
	const [showInfo, setShowInfo] = React.useState(false)

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (redirect) {
		setTimeout(function () {
			setRedirect(false)

			navigate('/success')
		}, 5000)
	}
	if (pageCancel) {
		setTimeout(function () {
			setPageCancel(false)

			navigate('/canceled')
		}, 5000)
	}
	if (showLoad) {
		setTimeout(function () {
			setShowLoad(false)
		}, 5000)
	}

	return (
		<>
			<Helmet>
				<title>Checkout</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? 'tw-pt-[120px] tw-bg-neutral-200 md:tw-pt-[90px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative'
							: 'tw-bg-neutral-200 tw-pt-[90px] md:tw-pt-[60px] tw-pb-[20px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative'
					}>
					{cartItems.length === 0 ? (
						<div className="tw-flex tw-items-center">
							<div className="tw-mr-5 tw-font-light tw-text-white">
								Your Cart is Empty
							</div>
							<FaHandPointRight className="tw-text-white tw-mr-5 tw-text-2xl" />
							<Button handleFunc={() => navigate('/')}>Shop now</Button>
						</div>
					) : (
						<div className="tw-w-full tw-h-[100%] md:tw-px-10 bg-blur3">
							<div className="tw-flex tw-h-full tw-flex-col md:tw-flex-row te-items-center">
								<div className="tw-w-full lg:tw-inline tw-hidden lg:tw-w-[30%] tw-bg-neutral-300 tw-p-1 md:tw-px-5 md:tw-pt-10">
									{cartItems.map((item) => (
										<CartItemsCheckout product={item} key={item.id} />
									))}

									<div className="tw-relative">
										<div className="tw-border-b-[1px] tw-border-[#b59248] tw-py-5 tw-text-neutral-700">
											<div className="tw-flex tw-items-center tw-justify-between tw-text-sm">
												<div>
													<span>Subtotal</span>
													{discountPrice && (
														<span className="tw-text-xs tw-text-neutral-500 tw-ml-2">
															(discount add)
														</span>
													)}
												</div>
												{showLoad ? (
													<div className="circular-loader-small"></div>
												) : (
													<span className="tw-text-[16px]">
														${discountPrice ? discountPrice : total}
													</span>
												)}
											</div>
											<div className="tw-flex tw-items-center tw-justify-between tw-text-sm">
												<div className="tw-relative tw-flex tw-items-center">
													<span>Shipping</span>
													<BsFillQuestionCircleFill
														size={17}
														onMouseOver={() => setShowInfo(true)}
														onMouseLeave={() => setShowInfo(false)}
														className="tw-text-neutral-700 tw-mx-1 hover:tw-cursor-pointer"
													/>
													{showInfo && (
														<div className="tw-absolute tw-w-[170px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-50px] tw-left-[84px]">
															<span>
																Check shipping policy in the footer below
															</span>
														</div>
													)}
												</div>
												<span>Calculated at next step</span>
											</div>
										</div>
										<div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-pt-5">
											<span className="tw-text-[16px]">Total</span>
											<div className="tw-flex tw-items-center">
												<span className="tw-text-[12px] tw-mr-2 tw-text-neutral-700">
													USD
												</span>
												{showLoad ? (
													<div className="circular-loader-small"></div>
												) : (
													<span className="tw-text-[20px]">
														${discountPrice ? discountPrice : total}
													</span>
												)}
											</div>
										</div>
									</div>
								</div>
								<div className="tw-w-full lg:tw-w-[70%] tw-px-3 md:tw-pr-0 md:tw-pl-5">
									<div className="tw-w-[200px] tw-mx-auto tw-mt-[-20px]">
										<img src={logo} alt="" />
									</div>
									<div className="tw-text-neutral-400 tw-flex tw-items-center tw-border-t-[1px] tw-border-b-[1px] tw-border-neutral-800 tw-py-3 lg:tw-mt-[-40px] tw-justify-center tw-font-light tw-text-xs tw-mt-[-30px]">
										<Link
											to={`/user-cart/${user?.displayName}`}
											className="tw-flex tw-items-center tw-mr-2">
											<span className="tw-mr-2 tw-text-[#bba371]">Cart</span>
											<MdKeyboardArrowRight size={23} />
										</Link>
										<Link
											to={`/checkout/${user?.displayName}`}
											className="tw-flex tw-items-center tw-mr-2">
											<span
												className={`${
													window.location.pathname.includes('checkout')
														? 'tw-text-white tw-font-bold'
														: 'tw-text-neutral-400'
												} tw-mr-2`}>
												Information
											</span>
											<MdKeyboardArrowRight size={23} />
										</Link>
										<Link to={`/payment/${user?.displayName}`}>
											<span
												className={`${
													window.location.pathname.includes('payment')
														? 'tw-text-white tw-font-bold'
														: 'tw-text-neutral-400'
												}`}>
												Payment
											</span>
										</Link>
									</div>
									<div className="tw-block lg:tw-hidden tw-text-[#bba371] tw-mb-5 tw-border-t-[1px] tw-border-neutral-800 tw-pt-5">
										<div className="tw-flex tw-items-center">
											<FaOpencart className="tw-mr-2" size={25} />
											<span>{showSum ? 'Hide' : 'Show'} order summary </span>
											{showSum ? (
												<MdOutlineKeyboardArrowUp
													size={25}
													onClick={() => setShowSum(false)}
												/>
											) : (
												<MdOutlineKeyboardArrowDown
													size={25}
													onClick={() => setShowSum(true)}
												/>
											)}
										</div>
									</div>

									<div
										className={`${
											showSum ? `tw-opacity-1 tw-py-5` : 'tw-h-0 tw-opacity-0'
										} tw-ease-in tw-duration-300 lg:tw-hidden tw-block tw-w-full lg:tw-w-[30%] tw-p-1 md:tw-px-10 md:tw-py-5 tw-bg-[#bba371] `}>
										{cartItems.map((item) => (
											<CartItemsCheckout product={item} key={item.id} />
										))}
										<div className="tw-relative">
											<div className="tw-border-t-[1px] tw-border-b-[1px] tw-border-[#b59248] tw-py-5 tw-text-neutral-700 tw-px-3">
												<div className="tw-flex tw-items-center tw-justify-between tw-text-sm">
													<div>
														<span>Subtotal</span>
														{discountPrice && (
															<span className="tw-text-xs tw-text-neutral-500 tw-ml-2">
																(discount add)
															</span>
														)}
													</div>
													{showLoad ? (
														<div className="circular-loader-small"></div>
													) : (
														<span className="tw-text-[16px]">
															${discountPrice ? discountPrice : total}
														</span>
													)}
												</div>
												<div className="tw-flex tw-items-center tw-justify-between tw-text-sm ">
													<div className="tw-relative tw-flex tw-items-center">
														<span>Shipping</span>
														<BsFillQuestionCircleFill
															size={15}
															onMouseOver={() => setShowInfo(true)}
															onMouseLeave={() => setShowInfo(false)}
															className="tw-text-neutral-700 tw-mx-1 hover:tw-cursor-pointer"
														/>
														{showInfo && (
															<div className="tw-absolute tw-w-[170px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-50px] tw-left-[84px]">
																<span>
																	Check shipping policy in the footer below
																</span>
															</div>
														)}
													</div>
													<span>Calculated at next step</span>
												</div>
											</div>
											<div className="tw-flex tw-items-center tw-justify-between tw-text-sm tw-pt-5 tw-px-3">
												<span className="tw-text-[16px]">Total</span>
												<div className="tw-flex tw-items-center">
													<span className="tw-text-[12px] tw-mr-2 tw-text-neutral-700">
														USD
													</span>
													{showLoad ? (
														<div className="circular-loader-small"></div>
													) : (
														<span className="tw-text-[20px]">
															${discountPrice ? discountPrice : total}
														</span>
													)}
												</div>
											</div>
										</div>
									</div>
									<div className="tw-w-full">
										<StripeCheckout
											itemCount={itemCount}
											total={discountPrice ? discountPrice : total}
											setRedirect={setRedirect}
											setPageCancel={setPageCancel}
											discountPrice={discountPrice}
											sales={sales}
										/>
									</div>
								</div>
							</div>
						</div>
					)}
					<div
						className={`${
							redirect || pageCancel
								? 'tw-opacity-1 tw-inline tw-ease-in tw-duration-300'
								: 'tw-opacity-0 tw-hidden tw-ease-in tw-duration-300'
						} tw-bg-[rgba(0,0,0,0.9)] tw-flex tw-flex-col tw-items-center tw-justify-center tw-fixed tw-top-[35%] tw-z-50 tw-ease-in tw-duration-300 tw-w-[70%] tw-h-[40%] md:tw-w-[20%] md:tw-h-[20%]`}>
						<div className="circular-loader"></div>
						<div>
							<span className="tw-text-white tw-italic tw-tracking-widest tw-text-xs tw-font-light">
								{redirect ? (
									<div className="tw-mt-2">
										<span className="tw-text-center tw-text-white tw-italic tw-tracking-widest tw-text-xs tw-font-light">
											<p className="">Transaction Successfull.</p>
											<p>Redirecting...</p>
										</span>
									</div>
								) : pageCancel ? (
									<div className="tw-mt-2">
										<span className="tw-text-center tw-text-white tw-italic tw-tracking-widest tw-text-xs tw-font-light">
											<p className="">Transaction Canceled.</p>
											<p>Redirecting...</p>
										</span>
									</div>
								) : (
									''
								)}
							</span>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Cart
