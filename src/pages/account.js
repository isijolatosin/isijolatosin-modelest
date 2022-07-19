import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import Heading from '../components/Heading'
import Layout from '../components/shared/Layout'
import { UserContext } from '../context/user-context'
import { db } from '../firebase'

function Account() {
	const [isLoading, setIsLoading] = React.useState(true)
	const { user } = useContext(UserContext)
	const [cartHist, setCartHist] = React.useState([])
	if (isLoading) {
		setTimeout(() => {
			setIsLoading(false)
		}, 5000)
	}

	React.useEffect(() => {
		// getting address and details for shipping
		user &&
			db
				.collection('purchased')
				.doc(`${user?.email}/`)
				.collection('shoppings')
				.orderBy('timestamp', 'asc')
				.onSnapshot((snapshot) => {
					const results = snapshot.docs.map((doc) => ({
						data: doc.data(),
					}))

					if (results) {
						let data = []
						for (const result of results) {
							data.push({
								// address: result?.data.address,
								color: result?.data.color,
								// customer: result?.data.customer,
								description: result?.data.description,
								// email: result?.data.email,
								id: result?.data.id,
								length: result?.data.length,
								orderNo: result?.data.orderNo,
								price: result?.data.price,
								quantity: result?.data.quantity,
								timestamp: new Date(result?.data.timestamp).toDateString(),
								title: result?.data.title,
								image: result?.data?.image,
							})
						}

						setTimeout(() => {
							setCartHist(data)
						}, 3000)
					}
				})
	}, [user])

	return (
		<>
			<Helmet>
				<title>Account</title>
			</Helmet>
			<Layout>
				<div className="tw-py-[110px] md:tw-py-[100px] tw-px-5 tw-bg-gray-300 tw-flex tw-flex-col tw-items-center">
					<div className="tw-w-full lg:tw-w-[95%]">
						<div className="tw-bg-neutral-50 tw-p-2 tw-rounded-sm tw-mb-1">
							<h1 className="tw-font-light tw-text-xs">
								<strong>Account Name:</strong> {user?.displayName}
							</h1>
							<h1 className="tw-font-light tw-text-xs">
								<strong>Account Email:</strong> {user?.email}
							</h1>
							<h1 className="tw-font-light tw-text-xs">
								<strong>Customer since:</strong>{' '}
								{new Date(user?.createdAt?.seconds * 1000).toLocaleString()}
							</h1>
						</div>
						<div className="tw-bg-neutral-50 tw-p-2 tw-rounded-sm tw-w-[100%]">
							<Heading children="Cart History" isBold={true} />

							<div className="tw-w-[100%]">
								{cartHist?.length === 0 ? (
									isLoading ? (
										<div className="tw-my-2">
											<div className="tw-rounded-full progress tw-w-[30%]">
												<div className="inner"></div>
											</div>
										</div>
									) : (
										<span className="tw-text-red-700 tw-text-sm">
											Data not Found...
										</span>
									)
								) : (
									<div className="tw-grid tw-grid-cols-1 tw-gap-x-3 lg:tw-grid-cols-2 2xl:tw-grid-cols-3 ">
										{cartHist?.map((item) => (
											<div className="tw-bg-neutral-200 tw-font-light tw-text-xs tw-text-neutral-900 tw-mb-3 tw-rounded-lg">
												<div className="tw-flex tw-w-full tw-h-[150px] tw-flex-row tw-items-center tw-justify-between ">
													<div
														key={item?.id}
														className="tw-flex tw-flex-col tw-w-[70%] tw-p-3 tw-mt-5">
														<span>
															<strong>Length: </strong>
															{item?.length}
														</span>
														<span>
															<strong>Quantity: </strong>
															{item?.quantity}
														</span>
														<span>
															<strong>Price: $</strong>
															{item?.price * item?.quantity}
														</span>
														<span>
															<strong>Color: </strong>
															{item?.color}
														</span>
														<span>
															<strong>Name: </strong>
															{item?.title}
														</span>
														<span>
															<strong>Order No: </strong>
															{item?.orderNo}
														</span>
														<span>
															<strong>Time of purchase: </strong>
															{item?.timestamp}
														</span>
													</div>
													<img
														src={item?.image}
														alt={item?.title}
														loading="lazy"
														className=" tw-rounded-lg tw-w-[30%] md:tw-w-[20%] tw-h-[90%] tw-m-3 tw-object-cover"
													/>
												</div>
												<div className="tw-m-3 tw-border-t-[1px] tw-border-neutral-400 tw-text-xs tw- tw-py-3">
													<span>
														<strong>Description: </strong> {item?.description}
													</span>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Account
