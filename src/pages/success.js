import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCartItem, selectCartItems } from '../slices/appSlices'
import { db } from '../firebase'
import Layout from '../components/shared/Layout'
import { UserContext } from '../context/user-context'
import Button from '../components/shared/Button'
import { AUTHORIZED_ID } from '../constant'

const Success = () => {
	const { user } = useContext(UserContext)

	const { displayName } = user
	const dispatch = useDispatch()
	const cartItems = useSelector(selectCartItems)
	const userAddress = localStorage.getItem('address')
	const [sales, setSales] = React.useState(false)

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
	}, [])

	React.useEffect(() => {
		user?.email &&
			cartItems.length !== 0 &&
			// eslint-disable-next-line array-callback-return
			cartItems.map((item) => {
				// shopping path
				db.collection('users')
					.doc(`${user?.email}/`)
					.collection('shoppings')
					.add({
						id: item.id,
						title: item.name,
						description: item.description,
						quantity: item.quantity,
						price: item.price,
						address: userAddress,
						customer: user?.displayName,
						email: user?.email,
						color: item?.hairColor,
					})
					.then(() => {
						// console.log(`SUCCESSFULL`)
					})
					.catch((error) => console.log('Error' + error.message))

				// admin path
				db.collection('admin')
					.doc(`${AUTHORIZED_ID.id_one}/`)
					.collection('all-purchased')
					.add({
						id: item.id,
						title: item.name,
						description: item.description,
						quantity: item.quantity,
						price: item.price,
						address: userAddress,
						customer: user?.displayName,
						email: user?.email,
						color: item?.hairColor,
					})
					.then(() => {
						console.log(`SUCCESSFULL`)
					})
					.catch((error) => console.log('Error' + error.message))
			})

		setTimeout(() => {
			dispatch(clearCartItem())
		}, 500)
	})

	return (
		<>
			<Helmet>
				<title>Success</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? 'tw-pt-[230px] tw-bg-neutral-200 lg:tw-mt-[100px] tw-flex tw-flex-col tw-items-center'
							: 'tw-pt-[150px] tw-bg-neutral-200 lg:tw-mt-[100px] tw-flex tw-flex-col tw-items-center'
					}>
					<h1 className="tw-text-md tw-text-neutral-600 tw-uppercase tw-mb-1">{`Hey ${displayName}`}</h1>
					<h1 className="tw-text-xl tw-uppercase">
						Thank you for your purchase
					</h1>
					<div className="tw-mt-10 tw-text-neutral-600 tw-font-light tw-text-center">
						<span>
							We are currently processing your order and will send you a
							confirmation email shortly
						</span>
					</div>
					<Link className="tw-my-10 " to="/">
						<Button>Continue Shopping</Button>
					</Link>
				</div>
			</Layout>
		</>
	)
}

export default Success
