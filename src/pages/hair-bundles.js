import React from 'react'
import axios from 'axios'
import { CgClose } from 'react-icons/cg'
import Layout from '../components/shared/Layout'
import Card from '../components/Card2'

function HairBundles() {
	const [hairBundles, setHairBundles] = React.useState([])
	const [singleProducts, setSingleproducts] = React.useState(null)

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const filtered = products.filter(
				(product) => product.color.toLowerCase() === 'natural black'
			)
			setHairBundles(filtered.sort((a, b) => a.name.localeCompare(b.name)))
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

	const length = [
		{ id: '1', name: 'Length' },
		{ id: 'len1', name: '14-inches' },
		{ id: 'len2', name: '16-inches' },
		{ id: 'len3', name: '18-inches' },
		{ id: 'len4', name: '20-inches' },
		{ id: 'len5', name: '22-inches' },
		{ id: 'len6', name: '24-inches' },
		{ id: 'len7', name: '26-inches' },
		{ id: 'len8', name: '28-inches' },
		{ id: 'len9', name: '30-inches' },
	]
	return (
		<Layout>
			<div className="tw-pb-10 md:tw-pt-24 tw-pt-32 tw-h-full tw-relative tw-bg-neutral-800 tw-flex tw-flex-col tw-items-center ">
				<div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-items-center tw-w-full">
					{hairBundles.map((item) => (
						<div key={item._id}>
							<Card
								key={item._id}
								product={item}
								setSingleproducts={setSingleproducts}
								length={length}
							/>
						</div>
					))}
				</div>

				{singleProducts && (
					<div className="tw-absolute tw-z-10 tw-h-[100vh] tw-right-0 tw-left-0 tw-top-0 tw-flex tw-flex-row tw-items-center tw-justify-center bg-blur2">
						<div className="tw-w-[600px] tw-h-[600px]">
							<img
								id={singleProducts?.[0]._id}
								src={singleProducts?.[0].image}
								alt={singleProducts?.[0]._id}
								className="tw-w-full tw-h-full tw-object-contain"
							/>
							<div className="tw-absolute tw-bottom-[25%]">
								<p className="tw-text-md tw-font-200 tw-tracking-tight tw-text-neutral-900 tw-rounded-md tw-mb-[1px] bg-blur tw-px-2 tw-leading-6 lg:tw-mt-[150px]">
									{singleProducts?.[0].name}
								</p>
								<p className="tw-font-medium tw-text-slate-900 tw-text-xs tw-rounded-md tw-mb-[1px] bg-blur tw-px-2 tw-mt-0">
									{singleProducts?.[0].description}
								</p>
							</div>
							<CgClose
								onClick={() => setSingleproducts(null)}
								className="tw-absolute tw-top-20 tw-right-20 tw-w-16 tw-h-16 tw-p-5 tw-bg-gray-100 tw-rounded-full hover:tw-cursor-pointer"
							/>
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default HairBundles
