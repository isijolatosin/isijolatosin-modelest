import React from 'react'
import { db } from '../../firebase'
import { isInCart } from '../../utils/helpers'
import Slideshow from '../../utils/Slideshow'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLike, setLike } from '../../slices/appSlices'

const SingleProductModal = ({
	category,
	singleProducts,
	setSingleproducts,
	sales,
	desc,
	sizes,
	setLength,
	setError,
	error,
	singleProduct,
	cartItems,
	IncreaseItem,
	addToCart,
	_hairColor,
	texture,
	sethairType,
	setColor,
}) => {
	const dispatch = useDispatch()
	const isLike = useSelector(selectIsLike)
	const [noOfLikes, setNoOfLikes] = React.useState(false)
	const [count, setCount] = React.useState(0)

	React.useEffect(() => {
		db.collection('admin')
			.doc('likes')
			.collection(category)
			.onSnapshot((snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					data: doc.data(),
				}))
				if (results.length > 1) setNoOfLikes(Number(results[1]?.data?.no))
				if (results.length === 1) setNoOfLikes(Number(results[0]?.data?.no))
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleLike = () => {
		dispatch(setLike(singleProducts?.[0]?.name))

		db.collection('admin')
			.doc('likes')
			.collection(category)
			.orderBy('date', 'asc')
			.onSnapshot((snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					data: doc.data(),
				}))
				console.log(results)
				if (results.length > 1) setCount(Number(results[1]?.data?.no))
				if (results.length === 1) setCount(Number(results[0]?.data?.no))
			})
		count >= 0 &&
			db
				.collection('admin')
				.doc('likes')
				.collection(category)
				.add({
					no: count + 1,
					date: new Date(),
				})

		db.collection('admin')
			.doc('likes')
			.collection(category)
			.onSnapshot((snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					data: doc.data(),
				}))
				if (results.length > 1) setNoOfLikes(Number(results[1]?.data?.no))
				if (results.length === 1) setNoOfLikes(Number(results[0]?.data?.no))
			})
	}

	// 	const handleDislike = () => {
	// 		dispatch(setDislike(singleProducts?.[0]?.name))
	//
	// 		db.collection('admin')
	// 			.doc('likes')
	// 			.collection(category)
	// 			.orderBy('date', 'asc')
	// 			.onSnapshot((snapshot) => {
	// 				const results = snapshot.docs.map((doc) => ({
	// 					data: doc.data(),
	// 				}))
	// 				console.log(results)
	// 				if (results.length > 1) setCount(Number(results[1]?.data?.no) - 1)
	// 				if (results.length === 1) setCount(Number(results[0]?.data?.no) - 1)
	// 			})
	// 		count >= 1 &&
	// 			db
	// 				.collection('admin')
	// 				.doc('likes')
	// 				.collection(category)
	// 				.add({
	// 					no: count - 1,
	// 					date: new Date(),
	// 				})
	//
	// 		db.collection('admin')
	// 			.doc('likes')
	// 			.collection(category)
	// 			.onSnapshot((snapshot) => {
	// 				const results = snapshot.docs.map((doc) => ({
	// 					data: doc.data(),
	// 				}))
	// 				if (results.length > 1) setNoOfLikes(Number(results[1]?.data?.no))
	// 				if (results.length === 1) setNoOfLikes(Number(results[0]?.data?.no))
	// 			})
	// 	}
	// 	console.log(count)

	return (
		<div>
			{singleProducts && (
				<div className="single tw-absolute tw-z-30 tw-w-[100%] tw-h-[140%] md:tw-h-[100vh] tw-right-0 tw-left-0 tw-top-0 tw-bottom-0 md:tw-top-[95px] md:tw-pt-20 tw-flex tw-flex-col tw-items-start tw-justify-center tw-bg-white">
					<div className="md:tw-w-[80%] xl:tw-w-[70%] md:tw-mx-auto tw-w-[100%] tw-h-full tw-flex md:tw-flex-row tw-flex-col">
						<div className="tw-w-[100%] md:tw-h-[500px] md:tw-w-[50%] tw-mx-auto md:tw-mr-10">
							<Slideshow images={singleProducts?.[0]} />
						</div>
						<div className="tw-w-[90%] md:tw-w-[50%] tw-mx-auto tw-text-neutral-900 tw-mt-5 md:tw-mt-0">
							<p className="tw-text-2xl tw-font-200 tw-tracking-tight tw-mb-[5px] tw-leading-6">
								{singleProducts?.[0].name}
							</p>
							<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-mt-0">
								Description: {singleProducts?.[0].description}
							</p>
							<div className="tw-flex tw-flex-row tw-items-center tw-justify-between">
								<p className="tw-font-medium tw-text-xl tw-my-[10px]">
									Price:{' '}
									{singleProducts?.[0]?.sales &&
										`$${
											singleProducts?.[0].price -
											singleProducts?.[0].price * 0.15
										}${' '}
										USD${' '}`}
									<span
										className={
											singleProducts?.[0]?.sales &&
											'tw-ml-2 tw-line-through tw-text-neutral-400 tw-border-l-[1px] tw-border-neutral-500 tw-pl-3'
										}>
										${singleProducts?.[0].price} USD
									</span>
								</p>
								<div className="tw-flex tw-flex-row tw-items-center ">
									<span className="tw-text-xs">
										likes {noOfLikes > 0 ? noOfLikes : '0'}{' '}
									</span>
									{isLike.includes(singleProducts?.[0]?.name) ? (
										<BsHeartFill
											// onClick={handleDislike}
											className="tw-ml-2 hover:tw-cursor-pointer tw-text-red-600"
										/>
									) : (
										<BsHeart
											onClick={handleLike}
											className="tw-ml-2 hover:tw-cursor-pointer"
										/>
									)}
								</div>
							</div>
							{singleProducts?.[0]?.sales && (
								<p className="tw-font-medium tw-text-sm tw-mb-[1px] tw-my-1 tw-text-red-600">
									Sales: {sales && '15%'}
								</p>
							)}
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
							{_hairColor && (
								<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
									<div className="tw-flex tw-flex-wrap">
										{_hairColor.map((colr, idx) => (
											<span
												onClick={() => {
													setColor(colr)
												}}
												className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
												key={idx}>
												<span>{colr}</span>
											</span>
										))}
									</div>
								</div>
							)}
							{texture && (
								<div className="tw-flex tw-flex-col tw-mb-5 tw-border-b-[1px] tw-pb-5">
									<div className="tw-flex tw-flex-wrap">
										{texture.map((tex, idx) => (
											<span
												onClick={() => {
													sethairType(tex)
												}}
												className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-border-[1px] tw-border-neutral-100 tw-px-5 tw-py-1 tw-text-[14px] tw-text-neutral-900 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
												key={idx}>
												<span>{tex}</span>
											</span>
										))}
									</div>
								</div>
							)}
							<div className="tw-flex tw-flex-col tw-mb-5">
								<div className="tw-flex tw-flex-wrap">
									{sizes.map((size, idx) => (
										<span
											onClick={() => {
												setLength(size)
												setError(false)
											}}
											className="tw-flex tw-flex-wrap tw-bg-neutral-200 tw-rounded-md tw-mr-2 tw-mb-2 tw-border-[1px] tw-border-neutral-100 tw-px-2 tw-text-[16px] tw-text-neutral-900 tw-p-5 hover:tw-cursor-pointer hover:tw-bg-neutral-300 tw-ease-in tw-duration-300"
											key={idx}>
											{size}inch
										</span>
									))}
								</div>
							</div>
							{error && (
								<div>
									<p className="tw-text-center tw-mb-2 tw-text-red-600 tw-text-xs">
										Please provide length for {singleProducts?.[0].name}
									</p>
								</div>
							)}
							{isInCart(singleProduct, cartItems) ? (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300"
									onClick={cartItems.length !== 0 ? IncreaseItem : null}>
									<span>Add more</span>
								</div>
							) : (
								<div
									className="tw-text-white tw-text-sm tw-font-light tw-max-w-[100%] tw-mx-auto tw-text-center tw-py-2 tw-border tw-border-neutral-300 tw-rounded-md tw-bg-neutral-800 hover:tw-cursor-pointer hover:tw-opacity-50 tw-ease-in tw-duration-300"
									onClick={addToCart}>
									<span>Add to cart</span>
								</div>
							)}
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
	)
}

export default SingleProductModal
