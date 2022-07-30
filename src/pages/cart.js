import React from 'react'
import { Helmet } from 'react-helmet'
import { getDatabase, ref, onValue } from 'firebase/database'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaOpencart, FaHandPointRight } from 'react-icons/fa'
import Layout from '../components/shared/Layout'
import CartItems from '../components/CartItems'
import {
	selectCartItems,
	selectItemCount,
	selectTotal,
} from '../slices/appSlices'
import Total from '../components/Total'
import Button from '../components/shared/Button'

const Cart = () => {
	const itemCount = useSelector(selectItemCount)
	const total = useSelector(selectTotal)
	const cartItems = useSelector(selectCartItems)
	const navigate = useNavigate()
	const [sales, setSales] = React.useState(false)
	const [redirect, setRedirect] = React.useState(false)
	const [pageCancel, setPageCancel] = React.useState(false)
	const database = getDatabase()

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

	return (
		<>
			<Helmet>
				<title>Checkout</title>
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
							<div className="tw-w-full lg:tw-w-[40%] xl:tw-w-[40%]">
								{cartItems.map((item) => (
									<CartItems product={item} key={item.id} />
								))}
							</div>
							<div className="tw-w-full lg:tw-ml-5 xl:tw-ml-5 lg:tw-w-[60%] xl:tw-w-[60%]">
								<Total
									itemCount={itemCount}
									total={total}
									setRedirect={setRedirect}
									setPageCancel={setPageCancel}
								/>
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
