import React from 'react'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaOpencart } from 'react-icons/fa'
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

	return (
		<>
			<Helmet>
				<title>Checkout</title>
			</Helmet>
			<Layout>
				<div className="tw-bg-gray-300 tw-py-[100px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center ">
					<div className="tw-flex tw-flex-row tw-items-center tw-mb-5">
						<FaOpencart className="tw-text-2xl tw-text-violet-500" />
						<h2 className="tw-text-2xl tw-ml-2 tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
							Cart
						</h2>
					</div>
					{cartItems.length === 0 ? (
						<>
							<div className="tw-mb-5">Your Cart is Empty</div>
							<Button handleFunc={() => navigate('/')}>Shop now</Button>
						</>
					) : (
						<div className="tw-flex tw-flex-col tw-w-full tw-px-5 md:tw-flex-row lg:tw-w-[80%] tw-justify-center">
							<div className="tw-w-full lg:tw-w-[80%]">
								{cartItems.map((item) => (
									<CartItems product={item} key={item.id} />
								))}
							</div>
							<div className="tw-w-full md:tw-ml-5 xl:tw-ml-5 lg:tw-w-[40%]">
								<Total itemCount={itemCount} total={total} />
							</div>
						</div>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Cart
