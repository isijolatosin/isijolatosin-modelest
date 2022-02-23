import React from 'react'
import axios from 'axios'

function Card({ product, setSingleproducts }) {
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
	}

	return (
		<div
			onMouseOver={handleMouseIn}
			onMouseOut={() => setClickedID('')}
			className="tw-w-[90%] tw-h-[420px] md:tw-w-[300px] tw-shadow-lg md:tw-h-[300px] tw-relative tw-rounded-lg">
			<img
				onClick={handleViewImage}
				id={product._id}
				src={product?.image}
				alt={product._id}
				className=" tw-w-[400px] tw-h-full tw-object-cover tw-rounded-lg hover:tw-cursor-pointer"
			/>
			{clickedID === product._id && (
				<div className="tw-absolute tw-top-0 tw-right-0 tw-bg-neutral-300 tw-rounded-tr-lg tw-rounded-bl-lg tw-text-xs tw-p-2">
					<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
						View Image
					</span>
				</div>
			)}
			<div className="bg-blur tw-text-neutral-800 tw-pl-5 tw-w-full tw-absolute tw-z-5 tw-bottom-0 tw-rounded-b-lg">
				<div className="tw-flex tw-flex-row tw-justify-between">
					<div className="tw-pt-2">
						<p className=" tw-text-sm">{product.name}</p>
						<p className=" tw-text-xs tw-text-neutral-600 tw-mb-3">
							{product.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Card
