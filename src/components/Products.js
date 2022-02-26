import React from 'react'
import axios from 'axios'
import Card from './Card'
import { CgClose } from 'react-icons/cg'
import About from './About'
// import Search from './Search'

function Products() {
	const [allProducts, setAllproducts] = React.useState([])
	const [singleProducts, setSingleproducts] = React.useState(null)
	// const [search, setSearch] = React.useState('')
	// const [filterData, setFilterData] = React.useState([])

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			console.log(products)
			setAllproducts(products.sort((a, b) => a.name.localeCompare(b.name)))
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

	return (
		<div className="tw-pb-10 tw-pt-10 tw-relative tw-flex tw-flex-col tw-items-center ">
			{singleProducts ? (
				<div className="tw-absolute tw-z-10 tw-h-[100vh] tw-w-[100%] tw-right-0 tw-left-0 tw-top-0 tw-flex tw-flex-row tw-items-center tw-justify-center bg-blur2">
					<div className="tw-w-[600px] tw-h-[600px]">
						<img
							id={singleProducts?.[0]._id}
							src={singleProducts?.[0].image}
							alt={singleProducts?.[0]._id}
							className="tw-w-full tw-h-full tw-mt-[-50px] tw-object-contain"
						/>
						<div className="tw-absolute tw-bottom-[30%]">
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
			) : (
				<>
					<div className="tw-flex tw-flex-col tw-items-center tw-w-full md:tw-w-[90%] md:tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 2xl:tw-grid-cols-4 3xl:tw-grid-cols-5 tw-gap-5 ">
						{allProducts.map((product) => (
							<div
								key={product._id}
								className="tw-justify-center tw-items-center tw-flex tw-flex-row">
								<Card
									key={product._id}
									product={product}
									setSingleproducts={setSingleproducts}
								/>
							</div>
						))}
					</div>
					<div className="tw-mx-auto lg:tw-w-4/5 xl:tw-w-full tw-bg-neutral-50 tw-py-10 tw-mt-10">
						<About />
					</div>
				</>
			)}
		</div>
	)
}

export default Products
