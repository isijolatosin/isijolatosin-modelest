import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaOpencart, FaHandPointRight } from 'react-icons/fa'
import Layout from '../components/shared/Layout'
import CartItems from '../components/CartItems'
import { selectCartItems, selectTotal } from '../slices/appSlices'
import Button from '../components/shared/Button'
import { UserContext } from '../context/user-context'
import { fetchSalesPercentage } from '../utils/salesPercentageNuumber'

const Cart = () => {
	const { user } = useContext(UserContext)
	const cartItems = useSelector(selectCartItems)
	const total = useSelector(selectTotal)
	const navigate = useNavigate()
	const [sales, setSales] = React.useState(false)
	const [agree, setAgree] = React.useState(false)
	const [warn, setWarn] = React.useState(false)
	const [showInfo, setShowInfo] = React.useState(false)

	React.useEffect(() => {
		setSales(fetchSalesPercentage())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	function handleCheckout() {
		if (!agree) {
			setWarn(true)
		}
		if (agree) {
			navigate(`/checkout/${user?.displayName || 'new-customer'}`)
		}
	}

	return (
		<>
			<Helmet>
				<title>Cart</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? 'tw-pt-[170px] tw-bg-neutral-200 md:tw-pt-[120px] tw-pb-[30px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative'
							: 'tw-bg-neutral-200 tw-pt-[90px] md:tw-pt-[60px] tw-pb-[20px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative'
					}>
					<div className="tw-flex tw-flex-row tw-items-center tw-mb-1">
						<FaOpencart className="tw-text-2xl tw-text-violet-500" />
						<h2 className="tw-text-2xl tw-ml-2 tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
							Cart
						</h2>
					</div>
					{cartItems.length === 0 ? (
						<div className="tw-flex tw-items-center">
							<div className="tw-mr-5 tw-font-light tw-text-white">
								Your Cart is Empty
							</div>
							<FaHandPointRight className="tw-text-white tw-mr-5 tw-text-2xl" />
							<Button handleFunc={() => navigate('/')}>Shop now</Button>
						</div>
					) : (
						<div className="tw-flex tw-flex-col tw-w-full lg:tw-flex-row lg:tw-w-[90%] tw-justify-center tw-items-center lg:tw-items-start">
							<div className="tw-w-full lg:tw-w-[60%]">
								{cartItems.map((item) => (
									<CartItems product={item} key={item.id} />
								))}
							</div>
							<div className="tw-bg-white tw-p-3 tw-w-full md:tw-w-[40%] md:tw-ml-2">
								<p>Subtotal - ${total} USD</p>
								<p className="tw-text-neutral-600 tw-text-sm">
									Tax and shipping cost calculated at checkout
								</p>
								<div className="tw-flex tw-items-center tw-relative tw-mb-5">
									<label className="check-container">
										<input
											onChange={(e) => {
												setAgree(e.target.checked)
												setWarn(false)
											}}
											type="checkbox"
										/>
										<span
											className={`${
												warn && 'tw-border-red-700'
											} checkmark`}></span>
									</label>
									<div className="tw-flex tw-items-center">
										<p
											className={`${
												warn ? 'tw-text-red-600' : 'tw-text-neutral-900'
											} tw-text-sm`}>
											I have read and agreed with{' '}
										</p>
										<div className="tw-relative tw-ml-2 tw-text-xs">
											<button
												className={`${
													warn
														? 'tw-text-red-600 tw-border-b-[1px] tw-border-red-600'
														: 'tw-text-blue-500 tw-border-b-[1px] tw-border-blue-500'
												}`}
												onMouseOver={() => setShowInfo(true)}
												onMouseLeave={() => setShowInfo(false)}>
												Terms and Conditions
											</button>
											{showInfo && (
												<div className="tw-absolute tw-max-w-[150px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-br-none tw-text-white tw-text-center tw-top-[-45px] tw-right-[3px] tw-flex tw-items-top">
													<span className="tw-text-left tw-text-[10px] tw-tracking-wiser tw-font-light">
														Review terms and condition in help tab{' '}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
								<div className="tw-w-[80%] tw-mx-auto tw-flex tw-items-center">
									<button
										onClick={handleCheckout}
										className="tw-bg-black tw-text-white tw-py-2 tw-px-5 tw-text-center tw-text-xs md:tw-text-sm hover:tw-bg-white hover:tw-text-neutral-900 tw-border tw-border-black tw-ease-in tw-duration-300 tw-w-full">
										<button>Proceed to check out</button>
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Cart
