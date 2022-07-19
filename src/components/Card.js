import React from 'react'
import axios from 'axios'
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
			className="tw-h-[300px] tw-w-[300px] tw-shadow-lg md:tw-h-[350px] tw-relative tw-rounded-lg">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product?.image}
				alt={product._id}
				className=" tw-w-full tw-h-[70%] tw-object-cover hover:tw-cursor-pointer tw-rounded-t-lg"
			/>
			<div className="tw-absolute tw-top-0 tw-text-center tw-rounded-t-lg tw-bg-neutral-900 tw-text-[#bba371] tw-font-bold tw-w-full tw-text-[9px] tw-uppercase tw-tracking-widest">
				<span>Raw {product?.brand}</span>
			</div>
			{clickedID === product._id && (
				<div className="tw-absolute tw-top-0 tw-right-0 tw-bg-neutral-300 tw-rounded-tr-sm tw-rounded-bl-sm tw-text-xs tw-p-2">
					<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
						Quick view
					</span>
				</div>
			)}
			<div className="tw-bg-neutral-900 tw-h-[30%] tw-text-neutral-50 tw-px-2 tw-w-full tw-rounded-b-lg">
				<div className="tw-relative tw-flex tw-flex-row tw-justify-between">
					<div className="tw-pt-2 tw-w-full">
						<p className="tw-text-[14px] tw-font-bold">{product.name}</p>
						<div className="tw-w-full tw-flex tw-flex-row tw-justify-between tw-items-center  tw-text-neutral-50 tw-py-1 tw-text-xs">
							{sales !== 0 && product?.sales ? (
								<>
									<span className="tw-text-neutral-500 tw-line-through">
										${product?.price}.00 USD
									</span>
									<span className="tw-mr-2 tw-font-bold">
										${product?.price - product?.price * (sales / 100)} USD
									</span>
								</>
							) : (
								<span className="tw-font-bold">${product?.price}.00 USD</span>
							)}
						</div>
						<p className="tw-pt-2 tw-border-t-[1px] tw-border-neutral-700 tw-text-[10px] tw-text-neutral-50 tw-mb-3 tw-leading-none">
							{truncate(product.description, 10)}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
