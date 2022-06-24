import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'

function HomePage() {
	const [hideRegionSet, setHideRegionSet] = React.useState(true)
	const [allProducts, setAllproducts] = React.useState([])

	async function fetchProducts() {
		try {
			const {
				data: {
					products,
					//  curUser
				},
			} = await axios.get('/api/v1/products')

			if (products.every((product) => product.sales)) {
				localStorage.setItem('isSales', true)
			}
			setTimeout(() => {
				setAllproducts(products.sort((a, b) => a.name.localeCompare(b.name)))
			}, 3000)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

	React.useEffect(() => {
		setTimeout(() => {
			setHideRegionSet(false)
		}, 10000)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, document.body.scrollHeight)
	}

	return (
		<div className="tw-bg-neutral-200 relative home">
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Layout>
				<div
					className={
						allProducts.every((product) => product.sales)
							? `tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 ? 'tw-pt-[230px]' : 'tw-pt-[120px]'
							  } tw-pb-10 md:tw-py-[50px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
							: `tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 ? 'tw-pt-[230px]' : 'tw-pt-[50px]'
							  } md:tw-py-[50px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
					}>
					{allProducts.length !== 0 ? (
						<div className="tw-flex tw-flex-col tw-items-center">
							{hideRegionSet && (
								<div className="tw-relative tw-mt-20 md:tw-mt-10 tw-flex tw-flex-col tw-items-center">
									<span className="tw-mb-2 tw-text-sm tw-text-neutral-50 tw-opacity-[0.4]">
										Set your Country/Region below
									</span>
									<div
										onClick={scrollToTop}
										className="arrows-wrapper tw-rounded-lg tw-absolute tw-top-[-30px] hover:tw-cursor-pointer">
										<span className="arrow"></span>
										<span className="arrow"></span>
										<span className="arrow"></span>
									</div>
								</div>
							)}
							<Products allProducts={allProducts} />
						</div>
					) : (
						<div className="tw-rounded-full progress">
							<div className="inner"></div>
						</div>
					)}
				</div>
			</Layout>
		</div>
	)
}

export default HomePage
