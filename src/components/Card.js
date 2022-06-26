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
			className="tw-w-[100%] tw-h-[300px] md:tw-w-[300px] tw-shadow-lg md:tw-h-[300px] tw-relative tw-rounded-lg">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product?.image}
				alt={product._id}
				className=" tw-w-[400px] tw-h-full tw-object-cover hover:tw-cursor-pointer tw-rounded-lg"
			/>
			{clickedID === product._id && (
				<div className="tw-absolute tw-top-0 tw-right-0 tw-bg-neutral-300 tw-rounded-tr-sm tw-rounded-bl-sm tw-text-xs tw-p-2">
					<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
						Quick view
					</span>
				</div>
			)}
			<div className="bg-blur tw-text-neutral-800 tw-px-2 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-lg">
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
						<p className="tw-text-[14px] tw-font-bold">{product.name}</p>
						<p className="tw-pt-2 tw-border-t-[1px] tw-border-neutral-700 tw-text-xs tw-text-neutral-900 tw-mb-3">
							{truncate(product.description)}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
