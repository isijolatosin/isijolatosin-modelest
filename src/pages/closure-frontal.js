import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import { CgClose } from 'react-icons/cg'
import Card from '../components/Card4'
import axios from 'axios'

function ClosureFrontal() {
	const [singleProducts, setSingleproducts] = React.useState(null)
	const [closureFrontal, setClosureFrontal] = React.useState([])
	const [show, setShow] = React.useState(false)
	const [sales, setSales] = React.useState(false)

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
	}, [])

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			const filtered = products.filter(
				(product) =>
					product.type.toLowerCase() === 'closure' ||
					product.type.toLowerCase() === 'frontal'
			)
			setClosureFrontal(filtered.sort((a, b) => a.name.localeCompare(b.name)))
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
		setTimeout(() => {
			setShow(true)
		}, 2000)
	}, [])

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}
	const sizes = singleProducts?.[0].availablelength.split(', ')

	return (
		<>
			<Helmet>
				<title>Closure & Frontal</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? 'tw-pt-[170px] tw-flex tw-flex-col tw-pb-10 md:tw-pt-[150px] tw-h-full tw-relative tw-bg-neutral-200 tw-items-center '
							: 'tw-flex tw-flex-col tw-pb-10 md:tw-pt-24 tw-pt-32 tw-h-full tw-relative tw-bg-neutral-200 tw-items-center '
					}>
					{show && closureFrontal && (
						<div className="tw-grid tw-grid-cols-2 tw-w-full tw-px-2 md:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 xl:tw-w-[85%] 2xl:tw-w-[70%] tw-gap-2 md:tw-gap-5">
							{closureFrontal.map((item) => (
								<div
									key={item._id}
									className="tw-justify-center tw-items-center tw-flex tw-flex-row">
									<Card
										key={item._id}
										product={item}
										setSingleproducts={setSingleproducts}
										scrollToTop={scrollToTop}
									/>
								</div>
							))}
						</div>
					)}
					{!show && (
						<div className="tw-text-neutral-800 tw-font-light tw-text-sm">
							Loading products...
						</div>
					)}

					{singleProducts && (
						<div className="tw-absolute tw-z-10 tw-h-[100vh] tw-w-[100%] tw-right-0 tw-left-0 tw-top-[60px] tw-flex tw-flex-row tw-items-start tw-justify-center bg-blur3">
							<div className="tw-w-[600px] tw-h-[600px]">
								<img
									id={singleProducts?.[0]._id}
									src={singleProducts?.[0].image}
									alt={singleProducts?.[0]._id}
									className="tw-w-[90%] tw-mt-10 tw-mx-auto md:tw-w-[100%] tw-h-full tw-object-cover tw-mb-1"
								/>
								<div className="tw-max-w-[90%] tw-mx-auto">
									<p className="tw-text-xs tw-font-200 tw-tracking-tight tw-text-neutral-900 tw-mb-[1px] bg-blur tw-px-2 tw-leading-6 lg:tw-mt-[150px]">
										{singleProducts?.[0].name}
									</p>
									<p className="tw-font-medium tw-text-slate-900 tw-text-xs tw-mb-[1px] bg-blur tw-px-2 tw-mt-0">
										{singleProducts?.[0].description}
									</p>
									<div className="tw-flex tw-flex-col">
										<p className="tw-font-medium tw-text-white tw-text-xs tw-mt-2 tw-mr-2">
											Length
										</p>
										<div>
											{sizes.map((size, idx) => (
												<span
													className="bg-blur tw-text-slate-900 tw-rounded-full tw-mr-2 tw-border-[1px] tw-border-neutral-600 tw-px-2 tw-text-xs"
													key={idx}>
													{size}
												</span>
											))}
										</div>
									</div>
								</div>
								<CgClose
									onClick={() => setSingleproducts(null)}
									className="tw-absolute tw-top-[40px] tw-right-10 tw-w-10 tw-h-10 tw-p-3 tw-bg-gray-100 tw-rounded-full hover:tw-cursor-pointer"
								/>
							</div>
						</div>
					)}
				</div>
			</Layout>
		</>
	)
}

export default ClosureFrontal
