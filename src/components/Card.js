import React from 'react'
import axios from 'axios'
import { GrCheckmark } from 'react-icons/gr'
import truncate from '../utils/truncate'

function Card({ product, setSingleproducts, scrollToTop, sales }) {
	const [clickedID, setClickedID] = React.useState('')

	function handleMouseIn(event) {
		setClickedID(event.target.id)
	}

	async function handleViewImage(event) {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const result = products.filter(
				(product) => product._id === event.target.id
			)
			setSingleproducts(result)
		} catch (error) {
			console.log(error)
		}
		scrollToTop()
	}

	return (
		<div
			onMouseOver={handleMouseIn}
			onMouseOut={() => setClickedID('')}
			className="tw-w-[100%] tw-h-[300px] md:tw-w-[300px] tw-shadow-lg md:tw-h-[300px] tw-relative tw-rounded-sm">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product?.image}
				alt={product._id}
				className=" tw-w-[400px] tw-h-full tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
			/>
			{clickedID === product._id && (
				<div className="tw-absolute tw-top-0 tw-right-0 tw-bg-neutral-300 tw-rounded-tr-sm tw-rounded-bl-sm tw-text-xs tw-p-2">
					<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
						Quick view
					</span>
				</div>
			)}
			<div className="bg-blur tw-text-neutral-800 tw-px-2 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-sm">
				<div className="tw-relative tw-flex tw-flex-row tw-justify-between">
					<div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center tw-absolute tw-top-[-24px] tw-right-0 tw-left-0 tw-text-neutral-50 tw-bg-[rgba(0,0,0,0.8)] tw-px-2 tw-py-1 tw-text-xs">
						{sales !== 0 && product?.sales ? (
							<>
								<span className="tw-text-neutral-500 tw-line-through">
									${product?.price}.00 USD
								</span>
								<span className="tw-mr-2">
									${product?.price - product?.price * (sales / 100)} USD
								</span>
							</>
						) : (
							<span>${product?.price}.00 USD</span>
						)}
					</div>
					<div className="tw-pt-2 tw-w-full">
						<div className="tw-flex tw-justify-between tw-w-full">
							<p
								className={
									product.instock
										? 'tw-flex-[0.6] tw-text-xs tw-font-bold'
										: 'tw-text-xs tw-font-bold'
								}>
								{product.name}
							</p>
							{product.instock && (
								<div className="tw-flex-[0.4] tw-justify-center tw-flex tw-h-[20px] tw-bg-neutral-600 tw-pr-2 tw-text-neutral-50 tw-p-[2px]">
									<GrCheckmark />
									<span className="tw-text-[10px] tw-ml-1 tw-font-bold">
										In Stock
									</span>
								</div>
							)}
						</div>
						<p className="tw-mt-4 tw-border-t-[1px] tw-pt-2 tw-border-neutral-700 tw-text-xs tw-text-neutral-900 tw-mb-3">
							{truncate(product.description)}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
