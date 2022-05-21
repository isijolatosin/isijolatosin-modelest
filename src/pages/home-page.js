import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'

function HomePage() {
	const [sales, setSales] = React.useState(false)
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
		setSales(localStorage.getItem('isSales'))
		setTimeout(() => {
			setHideRegionSet(false)
		}, 10000)
	}, [])

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, document.body.scrollHeight)
	}

	return (
		<div className="tw-bg-neutral-200 relative">
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? `tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 ? 'tw-mt-[150px]' : 'tw-mt-[70px]'
							  } tw-pt-[70px] md:tw-py-[70px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
							: `tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 ? 'tw-pt-[180px]' : 'tw-pt-[100px]'
							  } md:tw-py-[70px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
					}>
					{allProducts.length !== 0 ? (
						<div className="tw-flex tw-flex-col tw-items-center">
							{hideRegionSet && (
								<div className="tw-flex tw-flex-col tw-items-center">
									<span className="tw-mb-2 tw-text-sm">
										Set your Country/Region below
									</span>
									<div
										onClick={scrollToTop}
										className="arrows-wrapper tw-rounded-lg tw-bg-gradient-to-r tw-from-neutral-200 tw-via-neutral-500 tw-to-neutral-400 hover:tw-cursor-pointer">
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
